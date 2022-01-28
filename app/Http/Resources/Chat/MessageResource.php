<?php

namespace App\Http\Resources\Chat;

use Illuminate\Http\Resources\Json\JsonResource;
use Illuminate\Support\Carbon;
use Illuminate\Support\Facades\Auth;

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
            'timestamp' => $this->created_at,
            'self' => $this->when($this->user_id === Auth::id(), 'true'),
        ];
    }
}
