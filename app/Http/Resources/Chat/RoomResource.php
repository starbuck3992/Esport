<?php

namespace App\Http\Resources\Chat;

use Illuminate\Http\Resources\Json\JsonResource;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Storage;

class RoomResource extends JsonResource
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
            'id' => $this->id,
            'name' => $this->when($this->name === null, function () {
                return $this->getOtherUser()->values();
            })[0]['nick'],
            'image' => Storage::url($this->getOtherUser()->values()[0]['avatar']),
            'unreadMessagesCount' => $this->unread_messages_count,
            'latestMessage' => new MessageResource($this->whenLoaded('latestMessage')),
            'users' => RoomUserResource::collection($this->whenLoaded('users'))
        ];
    }

    public function getOtherUser()
    {
        return $this->users->filter(function ($item) {
            return $item->id !== Auth::id();
        });
    }

}
