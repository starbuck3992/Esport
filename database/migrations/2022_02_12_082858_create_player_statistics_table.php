<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreatePlayerStatisticsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('player_statistics', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->constrained();
            $table->foreignId('platform_id')->constrained();
            $table->foreignId('game_id')->constrained();
            $table->integer('wins');
            $table->integer('losses');
            $table->integer('goal_scored');
            $table->integer('goal_received');
            $table->date('period_start');
            $table->date('period_end');
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
        Schema::table('player_statistics', function (Blueprint $table) {
            $table->dropForeign(['user_id']);
            $table->dropForeign(['platform_id']);
            $table->dropForeign(['game_id']);
        });
        Schema::dropIfExists('player_statistics');
    }
}
