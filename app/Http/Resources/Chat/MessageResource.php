<?php

namespace App\Http\Resources\Chat;

use Illuminate\Http\Resources\Json\JsonResource;
use Illuminate\Support\Carbon;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Storage;

class MessageResource extends JsonResource
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
            'message' => $this->message,
            'timestamp' => Carbon::parse($this->created_at)->format('d F'),
            'avatar' => $this->when($this->user_id !== Auth::id(), Storage::url($this->user->avatar)),
            'self' => $this->when($this->user_id === Auth::id(), true, false),
        ];
    }
}
