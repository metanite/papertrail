<?php

namespace Database\Factories;

use App\Models\Document;
use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

/** @extends Factory<Document> */
class DocumentFactory extends Factory
{
    protected $model = Document::class;

    public function definition(): array
    {
        return [
            'owner_id' => User::factory(),
            'title' => fake()->sentence(3),
            'content' => '<p>'.fake()->sentence().'</p>',
            'content_format' => 'html_v1',
        ];
    }
}
