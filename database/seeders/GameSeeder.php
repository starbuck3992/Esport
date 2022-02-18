<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;

class GameSeeder extends Seeder
{
    /**
     * Run the database seeders.
     *
     * @return void
     */
    public function run()
    {
        DB::table('games')->insert([
            [
                'name' => 'FIFA 22',
                'slug' => 'fifa_22'
            ],
            [
                'name' => 'NHL 22',
                'slug' => 'nhl_22'
            ],
            [
                'name' => 'UFC 4',
                'slug' => 'ufc_4'
            ],
        ]);
    }
}
