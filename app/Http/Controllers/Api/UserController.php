<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\UserUpdateRequest;
use App\Http\Resources\LoginResource;
use App\Http\Resources\UserResource;
use App\Models\User;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Storage;
use Throwable;

class UserController extends Controller
{
    public function show($id)
    {
        try {

            return new UserResource(User::where('id', $id)->with('providers')->firstorfail());

        } catch (Throwable $e) {

            DB::rollback();

            report($e);

            return response()->json(['message' => 'Uživatel nenalezen'], 404);

        }
    }

    public function updateInformation(UserUpdateRequest $request)
    {

        DB::beginTransaction();

        try {

            $user = User::find(Auth::id());

            if ($request->file('avatar')) {

                $currentAvatar = $user->avatar;
                if ($currentAvatar !== 'images/avatars/default/user.png') {
                    Storage::delete($currentAvatar);
                }

                $avatar_file = $request->file('avatar');
                $path = $avatar_file->store("images/avatars/$user->id", 'public');

                $user->avatar = $path;

            }

            $user->nick = $request->nick;
            $user->about = $request->about;
            $user->name = $request->name;
            $user->surname = $request->surname;
            $user->playstation_profile = $request->playstationProfile;
            $user->xbox_profile = $request->xboxProfile;
            $user->save();

        } catch (Throwable $e) {

            DB::rollback();

            report($e);

            return response()->json(['message' => 'Nastala chyba při ukládání změn'], 500);

        }

        DB::commit();

        return response()->json([
            'user' => new LoginResource($user),
            'message' => 'Profil byl aktualizován',]);
    }
}
