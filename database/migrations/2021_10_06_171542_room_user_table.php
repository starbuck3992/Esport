<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class RoomUserTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('room_user', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->foreignId('room_id')->constrained();
            $table->foreignId('user_id')->constrained();
            $table->boolean('online');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('room_user', function (Blueprint $table) {
            $table->dropForeign(['room_id']);
            $table->dropForeign(['user_id']);
        });
        Schema::dropIfExists('room_user');
    }
}
