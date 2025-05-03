<?php
namespace App\Repositories\ProductImage;

use App\Models\ProductImage;

class ProductImageRepository implements ProductImageRepositoryInterface {

  public function all()
  {
    return ProductImage::all();
  }
  
  public function findOne(string $id)
  {
    return ProductImage::findOrFail($id);
  }
  
  public function findByProductId(string $product_id)
  {
    return ProductImage::where('product_id', $product_id)->get();
  }
  
  public function create(array $data)
  {
    return ProductImage::create($data);
  }
  
  public function update(string $id, array $data)
  {
    $image = ProductImage::findOrFail($id);
    $image->update($data);
    return $image;
  }
  
  public function delete(string $id)
  {
    return ProductImage::destroy($id);
  }
} 