<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;

class RoomUserSeeder extends Seeder
{
    /**
     * Run the database seeders.
     *
     * @return void
     */
    public function run()
    {
        DB::table('room_user')->insert([
            [
                'user_id' => 1,
                'room_id' => 1,
                'online' => false
            ],
            [
                'user_id' => 2,
                'room_id' => 1,
                'online' => false
            ],
            [
                'user_id' => 1,
                'room_id' => 2,
                'online' => false
            ],
            [
                'user_id' => 3,
                'room_id' => 2,
                'online' => false
            ],
            [
                'user_id' => 1,
                'room_id' => 3,
                'online' => false
            ],
            [
                'user_id' => 4,
                'room_id' => 3,
                'online' => false
            ],
            [
                'user_id' => 1,
                'room_id' => 4,
                'online' => false
            ],
            [
                'user_id' => 5,
                'room_id' => 4,
                'online' => false
            ],
            [
                'user_id' => 1,
                'room_id' => 5,
                'online' => false
            ],
            [
                'user_id' => 6,
                'room_id' => 5,
                'online' => false
            ],
        ]);
    }
}
