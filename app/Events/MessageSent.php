<?php

namespace App\Events;

use App\Http\Resources\Chat\MessageResource;
use App\Http\Resources\UserResource;
use App\Models\User;
use App\Models\Message;
use Illuminate\Broadcasting\Channel;
use Illuminate\Queue\SerializesModels;
use Illuminate\Broadcasting\PrivateChannel;
use Illuminate\Broadcasting\PresenceChannel;
use Illuminate\Foundation\Events\Dispatchable;
use Illuminate\Broadcasting\InteractsWithSockets;
use Illuminate\Contracts\Broadcasting\ShouldBroadcast;

class MessageSent implements ShouldBroadcast
{
    use Dispatchable, InteractsWithSockets, SerializesModels;

    /**
     * User that sent the message
     *
     * @var User
     */
    public $user;

    /**
     * Message details
     *
     * @var Message
     */
    public $message;

    /**
     * Create a new event instance.
     *
     * @return void
     */
    public function __construct(Message $message)
    {
        $this->message = $message;
    }

    /**
     * Get the channels the event should broadcast on.
     *
     * @return Channel|array
     */
    public function broadcastOn()
    {
        return new PrivateChannel('chat.'. $this->message->room_id);
    }

    public function broadcastWith(){
        return (new MessageResource(($this->message)))->resolve();
    }
}
