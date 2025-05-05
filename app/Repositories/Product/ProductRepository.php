<?php

namespace App\Repositories\Product;

use App\Models\Product;

class ProductRepository implements ProductRepositoryInterface
{
  public function all() 
  {
    return Product::with(['meta', 'productDetail', 'productImages'])->get();
  }

  public function findOne(string $id) 
  {
    return Product::with(['meta', 'productDetail', 'productImages'])->findOrFail($id);
  }
  
  public function findBySlug(string $slug)
  {
    return Product::where('slug', $slug)->with(['meta', 'productDetail', 'productImages'])->first();
  }
    
  public function create(array $product)
  {
    return Product::create($product);
  }

  public function update(string $id, array $product) 
  {
    $data = Product::findOrFail($id);
    $data->update($product);
    return $data;
  }

  public function delete(string $id) 
  {
    return Product::destroy($id);
  }
}
