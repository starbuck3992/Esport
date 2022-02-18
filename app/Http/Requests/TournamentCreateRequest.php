<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Support\Facades\Auth;
use Illuminate\Validation\Rule;

class TournamentCreateRequest extends FormRequest
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
            'name' => ['required', 'max:64', Rule::unique('tournaments')],
            'platform' => 'required|integer',
            'game' => 'required|integer',
            'tournamentType' => 'required|integer',
            'currency' => 'required|integer',
            'information' => 'required|max:512',
            'fee' => 'required|integer',
            'scheduleStart' => 'required|date'
        ];
    }

    public function messages()
    {
        return [
            'name.unique' => 'Turnaj s daným názvem již existuje',
            'name.required' => 'Povinné pole',
            'name.max' => 'Název turnaje nemůže být delší než 64 znaků',
            'platform.required' => 'Povinné pole',
            'platform.integer' => 'Nevalidní hodnota',
            'game.required' => 'Povinné pole',
            'game.integer' => 'Nevalidní hodnota',
            'tournamentType.required' => 'Povinné pole',
            'tournamentType.integer' => 'Nevalidní hodnota',
            'currency.required' => 'Povinné pole',
            'currency.integer' => 'Nevalidní hodnota',
            'information.required' => 'Povinné pole',
            'information.max' => 'Popis turnaje nemůže být delší než 512 znaků',
            'fee.required' => 'Povinné pole',
            'fee.integer' => 'Nevalidní hodnota',
            'scheduleStart.required' => 'Povinné pole',
            'scheduleStart.date' => 'Nevalidní hodnota'
        ];
    }
}
