<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class UpdateDocumentRequest extends FormRequest
{
    public function authorize(): bool
    {
        return $this->user()?->can('update', $this->route('document')) ?? false;
    }

    public function rules(): array
    {
        return [
            'title' => ['required', 'string', 'max:120'],
            'content' => ['required', 'string', 'max:200000'],
        ];
    }
}
