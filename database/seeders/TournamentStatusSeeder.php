<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;

class TournamentStatusSeeder extends Seeder
{
    /**
     * Run the database seeders.
     *
     * @return void
     */
    public function run()
    {
        DB::table('tournament_statuses')->insert([
            [
                'name' => 'Otevřen'
            ],
            [
                'name' => 'Probíhá'
            ],
            [
                'name' => 'Uzavřen'
            ],
        ]);
    }
}