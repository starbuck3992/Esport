<?php

use App\Http\Controllers\Api\RegisteredUserController;
use Illuminate\Support\Facades\Route;
use Laravel\Fortify\Http\Controllers\PasswordResetLinkController;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::post('/register', [RegisteredUserController::class, 'store']);
$limiter = config('fortify.limiters.forgot-password');

Route::post(config('fortify.prefix', 'fortify') . '/forgot-password', [PasswordResetLinkController::class, 'store'])
    ->middleware(['guest', 'throttle:' . $limiter]);

Route::get('/{any}', function () {
    return view('app');
})->where('any', '.*');
