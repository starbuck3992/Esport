<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Resources\UserResource;
use App\Models\User;
use Illuminate\Http\Request;

class UserController extends Controller
{
    public function show($id)
    {
        return new UserResource(User::where('id', $id)->with('providers')->firstorfail());
    }

    public function search(Request $request)
    {

        return UserResource::collection(User::where('nick','LIKE',"%$request->queryParam%")->get());

    }
}
