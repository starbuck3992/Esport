<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;

class TournamentTypeSeeder extends Seeder
{
    /**
     * Run the database seeders.
     *
     * @return void
     */
    public function run()
    {
        DB::table('tournament_types')->insert([
            [
                'name' => 'Vyřazovací',
                'max_players' => '8'
            ],
            [
                'name' => 'Vyřazovací',
                'max_players' => '16'
            ],
            [
                'name' => 'Vyřazovací',
                'max_players' => '32'
            ],
        ]);
    }
}
