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
use Carbon\Carbon;
use Illuminate\Database\Query\Builder;
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
        return MessageResource::collection(Message::where('room_id', $roomId)->orderBy('created_at', 'desc')->take(10)->get()->reverse());
    }

    public function setOnline(Request $request)
    {
        try {

            $user = User::find(Auth::id());

            Room::find($request->id)->unreadMessages()->update(
                [
                    'read' => true,
                    'read_at' => Carbon::now()
                ]);

            $user->rooms()->where('online', true)->update([
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

        return RoomResource::collection($user->rooms()->with(['latestMessage', 'users' => function ($query) use ($user) {
            $query->where('users.id','!=', Auth::id());
        }])->withCount(['unreadMessages' => function ($query) use ($user) {
            $query->where('read', false)->where('message_user.user_id',$user->id);
        },'messages'])->orderBy('unread_messages_count', 'desc')->orderBy('messages_count', 'desc')->paginate(5));

//        return $user->rooms()->with(['latestMessage', 'users'])->withCount(['unreadMessages' => function ($query) use ($user) {
//            $query->where('read', false)->where('message_user.user_id',$user->id);
//        },'messages'])->orderBy('unread_messages_count', 'desc')->orderBy('messages_count', 'desc')->paginate(5);
    }


    public function sendMessage(Request $request)
    {
        $user = User::find(Auth::id());
        $roomId = $request->id;

        //Check if user can type in the room
        try {

            $room = $user->rooms()->where('rooms.id', $roomId)->firstOrFail();

        } catch (Throwable $e) {

            report($e);
            return response()->json(['message' => 'Nemáte oprávnění psát do místnosti'], 404);

        }

        try {

            $message = $user->messages()->create([
                'room_id' => $roomId,
                'message' => $request->message
            ]);

            //Get message recipients
            $usersToNotify = $room->users()->where('users.id', '!=', $user->id)->get();

            foreach ($usersToNotify as $userToNotify){
                $message->messageRecipients()->attach($userToNotify->id, ['read' => $userToNotify->pivot->online]);
            }

        } catch (Throwable $e) {

            report($e);
            return response()->json(['message' => 'Došlo k chybě při odesílání zprávy'], 500);

        }

        try {

            broadcast(new MessageSentEvent($message))->toOthers();

            //Notification::send($usersToNotify, new MessageSentNotification($message));

        } catch (Throwable $e) {


            report($e);
            return response()->json(['message' => 'Došlo k chybě při odesílání notifikace'], 500);

        }

        return response()->json(['message' => 'Zpráva odeslána']);

    }
}
