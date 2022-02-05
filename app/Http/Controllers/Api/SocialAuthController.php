<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Resources\LoginResource;
use App\Models\User;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Session;
use Illuminate\Support\Facades\URL;
use Laravel\Socialite\Facades\Socialite;

class SocialAuthController extends Controller
{
    public function redirect($provider)
    {
        Session::put('urlPrevious', URL::previous());

        $url = Socialite::driver($provider)->redirect()->getTargetUrl();

        return response()->json([
            'url' => $url
        ]);
    }

    public function login($provider)
    {
        $socialUser = Socialite::driver($provider)->user();

        $url = Session::get('urlPrevious', url('/'));

        // Link social account
        if (Auth::check()) {
            User::find(Auth::id())->providers()
                ->firstOrCreate([
                    'provider' => $provider,
                    'provider_id' => $socialUser->getId()
                ],
                    ['avatar' => $socialUser->getAvatar()]);
            Session::forget('urlPrevious');
            return (new JsonResponse(['meta' => [
                'url' => $url,
            ]]));
        }

        // Social account exists?
        $user = User::query()
            ->whereHas('providers', function (Builder $query) use ($provider, $socialUser) {
                $query->where([
                    ['provider', $provider],
                    ['provider_id', $socialUser->getId()],
                ]);
            })
            ->first();

        // Login
        if ($user) {

            Session::forget('urlPrevious');
            Auth::login($user, true);

            return (new LoginResource($user))
                ->additional(['meta' => [
                    'url' => $url,
                ]]);
        }

        // Email exists?
        if (User::firstWhere('email', $socialUser->getEmail())) {

            Session::forget('urlPrevious');

            return response()->json(['message' => 'Uživatel s daným emailem již existuje'], 422);

        }

        // Create user
        $userCreated = User::create([
            'nick' => $socialUser->getName(),
            'email' => $socialUser->getEmail(),
            'image_id' => 1
        ]);

        // Create provider
        $userCreated->providers()
            ->create([
                'provider' => $provider,
                'provider_id' => $socialUser->getId(),
                'avatar' => $socialUser->getAvatar()
            ]);

        Session::forget('urlPrevious');
        Auth::login($userCreated, true);

        return (new LoginResource($userCreated))
            ->additional(['meta' => [
                'url' => $url,
            ]]);
    }
}
