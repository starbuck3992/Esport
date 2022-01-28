<?php

namespace App\Http\Resources\Notifications;

use Illuminate\Http\Resources\Json\JsonResource;
use Illuminate\Support\Carbon;
use Illuminate\Support\Facades\Auth;

class NotificationListResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @param \Illuminate\Http\Request $request
     * @return array
     */
    public function toArray($request)
    {
        return [
            'id'    => $this->id,
            'roomId' => $this->data['roomId'],
            'text' => $this->data['text'],
            'image' => $this->data['image'],
            'timestamp' => $this->data['timestamp']
        ];
    }
}
