<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class ChatSetOnlineRequest extends FormRequest
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
            'roomId' => 'required|numeric'
        ];
    }

    public function messages()
    {
        return [
            'id.required' => 'Povinný parametr',
            'id.numeric' => 'Nevalidní hodnota parametru'
        ];
    }
}