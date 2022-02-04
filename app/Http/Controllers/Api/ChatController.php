<?php

namespace App\Http\Controllers\Api;

use App\Events\MessageSent as MessageSentEvent;
use App\Notifications\MessageSent as MessageSentNotification;
use App\Http\Controllers\Controller;
use App\Http\Resources\Chat\RoomResource;
use App\Http\Resources\Chat\MessageResource;
use App\Http\Resources\UserResource;
use App\Models\Message;
use App\Models\Room;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Notification;
use Symfony\Component\HttpKernel\Event\RequestEvent;
use Throwable;

class ChatController extends Controller
{
    public function messages($roomId)
    {
        return MessageResource::collection(Message::where('room_id', $roomId)->orderBy('created_at', 'DESC')->take(5)->get());
    }

    public function setOnline(Request $request)
    {
        try {

            $user = User::find(Auth::id());

            $user->rooms()->where('online',true)->updateExistingPivot($request->id, [
                'online' => false,
            ]);

            $user->rooms()->updateExistingPivot($request->id, [
                'online' => true,
            ]);

        } catch (Throwable $e) {

            report($e);
            return response()->json(['message' => 'Místnost nenalezena'], 404);

        }
    }

    public function rooms()
    {

        $user = User::find(Auth::id());

        return RoomResource::collection($user->rooms()->where('active', 1)->with(['messages' => function ($query) {

            $query->orderBy('created_at', 'DESC')->take(5);

        }, 'users.avatar', 'users' => function ($query) {

            $query->where('users.id', '!=', Auth::id());

        }
        ])->orderBy('name', 'DESC')->get());
    }

    public function sendMessage(Request $request)
    {
        $user = User::find(Auth::id());

        try {

            $room = $user->rooms()->where('active', 1)->where('rooms.id', $request->id)->firstOrFail();

        } catch (Throwable $e) {

            report($e);
            return response()->json(['message' => 'Místnost nenalezena'], 404);

        }

        DB::beginTransaction();

        try {

            $message = $user->messages()->create([
                'room_id' => $request->id,
                'message' => $request->message
            ]);

            $message->load('user', 'user.avatar');

        } catch (Throwable $e) {

            report($e);
            return response()->json(['message' => 'Došlo k chybě při odesílání zprávy'], 500);

        }

        try {

            broadcast(new MessageSentEvent($message))->toOthers();

            $usersToNotify = $room->users()->where('users.id', '=', $user->id)->get();

            Notification::send($usersToNotify, new MessageSentNotification($message));

        } catch (Throwable $e) {

            DB::rollback();

            report($e);
            return response()->json(['message' => 'Došlo k chybě při odesílání notifikace'], 500);

        }

        DB::commit();

        return response()->json(['message' => 'Zpráva odeslána']);

    }
}
