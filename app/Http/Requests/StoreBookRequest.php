<?php
namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreBookRequest extends FormRequest
{
    public function authorize()
    {
        return true;
    }

    public function rules()
    {
        return [
            'title' => 'required|string|max:255',
            'author' => 'required|string|max:255',
            'price' => 'required|numeric|min:0',
            'cover_image' => 'nullable|url',
            'description' => 'nullable|string',
            'isbn' => 'nullable|string|max:255',
        ];
    }
}
