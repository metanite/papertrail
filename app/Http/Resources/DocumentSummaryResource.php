<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class DocumentSummaryResource extends JsonResource
{
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'title' => $this->title,
            'updated_at' => $this->updated_at?->toIso8601String(),
            'owner' => $this->whenLoaded('owner', fn () => $this->owner?->name),
            'role' => $this->when(isset($this->pivot), fn () => $this->pivot->role),
        ];
    }
}
