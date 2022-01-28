<?php

namespace App\Http\Controllers\Api;

use App\Http\Resources\Notifications\NotificationListResource;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Throwable;

class NotificationController extends Controller
{
    public function notifications(Request $request)
    {

        try {

            $user = $request->user();

            return NotificationListResource::collection($user->unreadNotifications()->take(10)->get());

        } catch (Throwable $e) {

            report($e);
            return response()->json(['message' => 'Nastala chyba při získávání notifikací'], 500);

        }

    }

    public function markAsRead(Request $request)
    {

        if ($request->query('id')) {

            $user = $request->user();

            try {

                $user->notifications()->where('id', $request->query('id'))->update(['read_at' => now()]);

                return response()->json(['message' => 'ok']);

            } catch (Throwable $e) {

                report($e);
                return response()->json(['message' => 'Notifikace nenalezena'], 404);

            }

        } else {

            $user = $request->user();
            $user->unreadNotifications()->update(['read_at' => now()]);

            return response()->json(['message' => 'ok']);

        }
    }
}
