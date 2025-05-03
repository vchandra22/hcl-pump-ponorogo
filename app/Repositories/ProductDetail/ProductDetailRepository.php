<?php
namespace App\Repositories\ProductDetail;

use App\Models\ProductDetail;

class ProductDetailRepository implements ProductDetailRepositoryInterface {
  public function all()
  {
    return ProductDetail::all();
  }
  
  public function findOne(string $id)
  {
    return ProductDetail::findOrFail($id);
  }
  
  public function findByProductId(string $product_id)
  {
    return ProductDetail::where('product_id', $product_id)->first();
  }

  public function create(array $data)
  {
    return ProductDetail::create($data);
  }
  
  public function update(string $id, array $data)
  {
    $product = ProductDetail::findOrFail($data);
    $product->update($data);
    return $product;
  }
  
  public function delete(string $id)
  {
    return ProductDetail::destroy($id);
  }
}