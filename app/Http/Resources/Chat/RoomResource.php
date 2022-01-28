<?php

namespace App\Http\Resources\Chat;

use App\Http\Resources\UserResource;
use Illuminate\Http\Resources\Json\JsonResource;
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
                return $this->users[0]->nick;
            }),
            'image' => Storage::url($this->users[0]->avatar->path),
            'messages' => MessageResource::collection($this->whenLoaded('messages'))
        ];
    }
}
