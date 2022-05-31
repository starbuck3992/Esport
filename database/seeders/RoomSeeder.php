<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;

class RoomSeeder extends Seeder
{
    /**
     * Run the database seeders.
     *
     * @return void
     */
    public function run()
    {
        DB::table('rooms')->insert([
            [
                'id' => 1
            ],
            [
                'id' => 2
            ],
            [
                'id' => 3
            ],
            [
                'id' => 4

            ],
            [
                'id' => 5
            ],
        ]);
    }
}
