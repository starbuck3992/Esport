<?php

use App\Http\Controllers\Api\ChatController;
use App\Http\Controllers\Api\NotificationController;
use App\Http\Controllers\Api\SocialAuthController;
use App\Http\Controllers\Api\TournamentController;
use App\Http\Controllers\Api\UserController;
use Illuminate\Support\Facades\Broadcast;
use Illuminate\Support\Facades\Route;

Broadcast::routes(['middleware' => ['auth:sanctum']]);

Route::group(['middleware' => ['auth:sanctum']], function () {
    Route::get('/chat/rooms', [ChatController::class, 'rooms']);
    Route::get('/chat/rooms/{id}/messages', [ChatController::class, 'messages']);
    Route::post('/chat/rooms/{id}/messages', [ChatController::class, 'sendMessage']);
    Route::post('/chat/rooms/{id}/setOnline', [ChatController::class, 'setOnline']);
    Route::get('/notifications', [NotificationController::class, 'notifications']);
    Route::put('/notifications', [NotificationController::class, 'markAsRead']);

    Route::get('/users/{id}', [UserController::class, 'show']);
    Route::post('/users/edit', [UserController::class, 'updateInformation']);

    Route::post('/tournaments/register', [TournamentController::class, 'registerParticipant']);

    Route::group(['prefix' => 'admin' , 'middleware' => ['admin']], function () {
        Route::get('/tournaments/create', [TournamentController::class, 'getCreateFormData']);
        Route::post('/tournaments', [TournamentController::class, 'createTournament']);
    });
});

Route::get('/authorize/{provider}/redirect', [SocialAuthController::class, 'redirect']);
Route::get('/authorize/{provider}/login', [SocialAuthController::class, 'login']);

Route::get('/tournaments/{slug}', [TournamentController::class, 'showTournament']);

