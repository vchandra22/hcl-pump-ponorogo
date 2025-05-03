<?php

namespace Database\Seeders;

use App\Models\MetaModel;
use App\Models\Product;
use App\Models\ProductDetail;
use App\Models\ProductImage;
use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Str;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // User::factory(10)->create();

        User::factory()->create([
            'name' => 'Test User',
            'email' => 'test@example.com',
        ]);

        $meta = MetaModel::create([
            'id' => (string) Str::uuid(),
            'meta_title' => 'meta',
            'meta_description' => 'description',
            'meta_keywords' => 'keyword',
            'og_image' => 'image',
            'image_alt' => 'image'
        ]);

        $product = Product::create([
            'id' => (string) Str::uuid(),
            'slug' => 'data-test',
            'title' => 'test',
            'short_description' => 'test',
            'price' => 10000,
            'sale_price' => 0,
            'meta_id' => $meta->id
        ]);

        ProductDetail::create([
            'id' => (string) Str::uuid(),
            'product_id' => $product->id,
            'description' => 'desctiption',
            'specification' => 'specification',
            'additional_info' => 'info'
        ]);

        ProductImage::create([
            'id' => (string) Str::uuid(),
            'product_id' => $product->id,
            'image_name' => 'image',
            'image_path' => '/image/1',
            'alt_text' => 'alt text',
        ]);
    }
}
