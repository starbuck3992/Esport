<?php

namespace App\Notifications;

use App\Http\Resources\Chat\ImageResource;
use App\Models\Image;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Notifications\Messages\BroadcastMessage;
use Illuminate\Notifications\Messages\MailMessage;
use Illuminate\Notifications\Notification;
use Illuminate\Support\Facades\Storage;

class MessageSent extends Notification
{
    use Queueable;

    protected $message;

    /**
     * Create a new notification instance.
     *
     * @return void
     */
    public function __construct($message)
    {
        $this->message = $message;
    }

    /**
     * Get the notification's delivery channels.
     *
     * @param  mixed  $notifiable
     * @return array
     */
    public function via($notifiable)
    {
        return ['database', 'broadcast'];
    }

    /**
     * Get the array representation of the notification.
     *
     * @param  mixed  $notifiable
     * @return array
     */
    public function toArray($notifiable)
    {
        return [
            'roomId' => $this->message->room_id,
            'text' => sprintf('Uživatel %s vám napsal zprávu: %s', $this->message->user->nick, $this->message->message),
            'image' => Storage::url($this->message->user->avatar->path),
            'timestamp' => Now()
        ];

    }

    public function toBroadcast($notifiable)
    {
        return new BroadcastMessage([
            'roomId' => $this->message->room_id,
            'text' => sprintf('Uživatel %s vám napsal zprávu: %s', $this->message->user->nick, $this->message->message),
            'image' => Storage::url($this->message->user->avatar->path),
            'timestamp' => Now()
        ]);

    }
}
