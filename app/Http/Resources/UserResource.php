<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;
use Illuminate\Support\Facades\Storage;

class UserResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array
     */
    public function toArray($request)
    {
        return [
            'nick' => $this->nick,
            'email' => $this->email,
            'avatar' => Storage::url($this->avatar->path),
            'providers' => ProviderResource::collection($this->whenLoaded('providers'))
        ];
    }
}
