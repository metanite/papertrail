<?php

namespace Database\Seeders;

use App\Models\Document;
use App\Models\User;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class DatabaseSeeder extends Seeder
{
    use WithoutModelEvents;

    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        $owner = User::updateOrCreate(
            ['email' => 'alex@example.com'],
            ['name' => 'Alex Morgan', 'password' => Hash::make('password'), 'email_verified_at' => now()],
        );
        $teammate = User::updateOrCreate(
            ['email' => 'sam@example.com'],
            ['name' => 'Sam Rivera', 'password' => Hash::make('password'), 'email_verified_at' => now()],
        );
        $reviewer = User::updateOrCreate(
            ['email' => 'taylor@example.com'],
            ['name' => 'Taylor Kim', 'password' => Hash::make('password'), 'email_verified_at' => now()],
        );

        $document = Document::firstOrCreate(
            ['owner_id' => $owner->id, 'title' => 'Welcome to Papertrail'],
            [
                'content' => '<h1>Welcome to Papertrail</h1><p>This is a shared workspace for simple, focused documents.</p><ul><li>Try the formatting toolbar.</li><li>Import a plain text file.</li><li>Share this document with Sam.</li></ul>',
            ],
        );

        $document->sharedUsers()->syncWithoutDetaching([
            $teammate->id => ['role' => 'editor'],
            $reviewer->id => ['role' => 'viewer'],
        ]);
    }
}
