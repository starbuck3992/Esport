<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Support\Facades\Auth;
use Illuminate\Validation\Rule;

class UserUpdateRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     */
    public function authorize()
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array
     */
    public function rules()
    {
        return [
            'nick' => ['required', 'max:64', Rule::unique('users')->ignore(Auth::id())],
            'about' => 'string|max:255',
            'avatar' => 'image|mimes:jpeg,jpg,png',
            'name' => 'string|max:64',
            'surname' => 'string|max:64',
            'playstationProfile' => 'string|max:64',
            'xboxProfile' => 'string|max:64'
        ];
    }

    public function messages()
    {
        return [
            'nick.unique' => 'Uživatel s daným uživatelským jménem již existuje',
            'nick.required' => 'Povinné pole',
            'nick.max' => 'Uživatelské jméno nemůže být delší než 64 znaků',
            'about.string' => 'Nevalidní hodnota',
            'about.max' => 'Maximální počet znaků: 255',
            'name.string' => 'Nevalidní hodnota',
            'name.max' => 'Maximální počet znaků: 255',
            'surname.string' => 'Nevalidní hodnota',
            'surname.max' => 'Maximální počet znaků: 255',
            'playstationProfile.string' => 'Nevalidní hodnota',
            'playstationProfile.max' => 'Maximální počet znaků: 255',
            'xboxProfile.string' => 'Nevalidní hodnota',
            'xboxProfile.max' => 'Maximální počet znaků: 255',
            'avatar.image' => 'Soubor musí být obrázek typu: jpeg, jpg nebo png',
            'avatar.mimes' => 'Soubor musí být obrázek typu: jpeg, jpg nebo png'
        ];
    }
}
