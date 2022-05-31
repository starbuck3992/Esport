<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;

class UserSeeder extends Seeder
{
    /**
     * Run the database seeders.
     *
     * @return void
     */
    public function run()
    {
        DB::table('users')->insert([
            [
                'avatar' => 'images/avatars/default/user.png',
                'nick' => 'user1',
                'email' => 'user1@esportujeme.cz',
                'password' => Hash::make('esportujeme'),
                'is_admin' => true
            ],
            [
                'avatar' => 'images/avatars/default/user.png',
                'nick' => 'user2',
                'email' => 'user2@esportujeme.cz',
                'password' => Hash::make('esportujeme'),
                'is_admin' => false
            ],
            [
                'avatar' => 'images/avatars/default/user.png',
                'nick' => 'user3',
                'email' => 'user3@esportujeme.cz',
                'password' => Hash::make('esportujeme'),
                'is_admin' => false
            ],
            [
                'avatar' => 'images/avatars/default/user.png',
                'nick' => 'user4',
                'email' => 'user4@esportujeme.cz',
                'password' => Hash::make('esportujeme'),
                'is_admin' => false
            ],
            [
                'avatar' => 'images/avatars/default/user.png',
                'nick' => 'user5',
                'email' => 'user5@esportujeme.cz',
                'password' => Hash::make('esportujeme'),
                'is_admin' => false
            ],
            [
                'avatar' => 'images/avatars/default/user.png',
                'nick' => 'user6',
                'email' => 'user6@esportujeme.cz',
                'password' => Hash::make('esportujeme'),
                'is_admin' => false
            ],
        ]);
    }
}
