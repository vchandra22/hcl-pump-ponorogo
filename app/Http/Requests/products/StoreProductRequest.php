<?php

namespace App\Http\Requests\products;

use Illuminate\Foundation\Http\FormRequest;

class StoreProductRequest extends FormRequest
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
            'slug' => 'required|string',
            'title' => 'required|string',
            'short_description' => 'required|string',
            'price' => 'numeric',
            'sale_price' => 'numeric',
            'is_featured' => 'boolean',
            'is_active' => 'boolean',
            'meta_title' => 'nullable', 
            'meta_description' => 'nullable',
            'meta_keywords' => 'nullable',
            // 'og_image' => 'image|mimes:png,jpg,jpeg|max:2040',
            'alt_image' => 'nullable',
            'description' => 'nullable',
            'specification' => 'nullable',
            'additional_info' => 'nullable',
            'product_images' => 'required|array',
            'product_images.*' => 'image|mimes:png,jpg,jpeg|max:2040'
        ];
    }
    
    public function messages(): array
    {
        return [
            'slug.required' => 'Kolom slug tidak boleh kosong.',
            'title.required' => 'Kolom judul tidak boleh kosong.',
            'short_description.required' => 'Kolom deskripsi tidak boleh kosong.',
            'price.required' => 'Kolom harga tidak boleh kosong.',
            'is_featrured.required' => 'Kolom featured tidak boleh kosong.',
            'in_stock.required' => 'Kolom stok tidak boleh kosong.',
            'meta_id.required' => 'Kolom meta id tidak boleh kosong.' 
        ];
    }
}
