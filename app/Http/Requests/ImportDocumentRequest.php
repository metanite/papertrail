<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class ImportDocumentRequest extends FormRequest
{
    public function authorize(): bool
    {
        return $this->user() !== null;
    }

    public function rules(): array
    {
        return [
            'file' => ['required', 'file', 'mimes:txt', 'max:1024'],
        ];
    }

    public function messages(): array
    {
        return [
            'file.mimes' => 'Only .txt files can be imported right now.',
        ];
    }
}
