<?php

namespace App\Http\Requests\products;

use Illuminate\Foundation\Http\FormRequest;

class UpdateProductRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'title' => 'required|string',
            'short_description' => 'required|string',
            'price' => 'numeric',
            'sale_price' => 'numeric',
            'is_featured' => 'boolean',
            'is_active' => 'boolean',
            'meta_title' => 'nullable', 
            'meta_description' => 'nullable',
            'meta_keywords' => 'nullable',
            'og_image' => 'nullable|image|mimes:png,jpg,jpeg|max:2040',
            'image_alt' => 'nullable',
            'description' => 'nullable',
            'specification' => 'nullable',
            'additional_info' => 'nullable',
            'product_images' => 'nullable|array',
            'product_images.*' => 'image|mimes:png,jpg,jpeg|max:2040',
            'old_og_image' => 'nullable|string'
        ];
    }
}
