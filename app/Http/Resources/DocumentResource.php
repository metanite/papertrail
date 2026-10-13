<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class DocumentResource extends JsonResource
{
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'title' => $this->title,
            'content' => $this->content,
            'owner' => $this->whenLoaded('owner', fn () => $this->owner?->name),
            'owner_id' => $this->owner_id,
            'updated_at' => $this->updated_at?->toIso8601String(),
        ];
    }
}
