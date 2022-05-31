<?php

namespace Database\Seeders;

use App\Models\Message;
use App\Models\MessageUser;
use Illuminate\Database\Seeder;

class MessageSeeder extends Seeder
{
    /**
     * Run the database seeders.
     *
     * @return void
     */
    public function run()
    {
        Message::factory()
            ->has(MessageUser::factory()->count(1), 'recipients')
            ->count(100)->create();
    }
}
