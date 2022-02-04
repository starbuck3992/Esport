<?php

use App\Http\Controllers\Api\ChatController;
use App\Http\Controllers\Api\NotificationController;
use App\Http\Controllers\Api\UserController;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Broadcast;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {

    return \Illuminate\Support\Facades\Auth::user();
});

Broadcast::routes(['middleware' => ['auth:sanctum']]);

Route::group(['middleware' => ['auth:sanctum']], function () {
    Route::get('/chat/rooms', [ChatController::class, 'rooms']);
    Route::get('/chat/rooms/{id}/messages', [ChatController::class, 'messages']);
    Route::post('/chat/rooms/{id}/messages', [ChatController::class, 'sendMessage']);
    Route::post('/chat/rooms/{id}/setOnline', [ChatController::class, 'setOnline']);
    Route::get('/notifications', [NotificationController::class, 'notifications']);
    Route::put('/notifications', [NotificationController::class, 'markAsRead']);
});

Route::get('/user/{id}', [UserController::class, 'show']);
Route::post('/users', [UserController::class, 'search']);

    Route::get('/test', function () {
        $user = User::first();
        $user->notify(new App\Notifications\RoomCreated('Hello World'));
    });











//Route::get('/authorize/{provider}/redirect', [\App\Http\Controllers\SocialAuthController::class, 'redirect']);
//Route::get('/authorize/{provider}/login', [\App\Http\Controllers\SocialAuthController::class, 'login']);
//
//Route::get('/authorize/{provider}/redirect', [SocialAuthController::class, 'redirect']);
//Route::get('/authorize/{provider}/login', [SocialAuthController::class, 'login']);
//
//Route::get('login/{provider}', [LoginController::class, 'redirectToProvider']);
//Route::get('login/{provider}/callback', [LoginController::class, 'handleProviderCallback']);
//
//Route::get('login/{provider}', [\App\Http\Controllers\Api\Login2::class, 'redirectToProvider']);
//Route::get('login/{provider}/callback', [\App\Http\Controllers\Api\Login2::class, 'handleProviderCallback']);



