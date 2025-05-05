<?php

namespace App\Services;

use App\Repositories\Product\ProductRepository;
use Illuminate\Support\Facades\DB;

class ProductService
{
  private $product_repository;

  function __construct(ProductRepository $product_repository)
  {
    $this->product_repository = $product_repository;
  }

  public function getAllProducts()
  {
    return $this->product_repository->all();
  }
  
  public function getProductById(string $id)
  {
    return $this->product_repository->findOne($id);
  }
  
  public function getProductBySlug(string $slug)
  {
    return $this->product_repository->findBySlug($slug);
  }

  public function createProduct(
    string $title,
    string $short_description,
    int $price,
    int $sale_price,
    bool $is_featured,
    bool $is_active,
    string $meta_id,
  ) {
    DB::beginTransaction();
    try {
      $product = $this->product_repository->create([
        'title' => $title,
        'short_description' => $short_description,
        'price' => $price,
        'sale_price' => $sale_price,
        'is_featured' => $is_featured,
        'is_active' => $is_active,
        'meta_id' => $meta_id
      ]);
      DB::commit();
      return $product;
    } catch (\Exception $err) {
      DB::rollBack();
      throw $err;
    }
  }
  
  public function updateProduct(
    string $id,
    string $title,
    string $short_description,
    int $price,
    int $sale_price,
    bool $is_featured,
    bool $is_active,
    string $meta_id
)
  {
    DB::beginTransaction();
    try {
      $product = $this->product_repository->update($id, [
        'title' => $title,
        'short_description' => $short_description,
        'price' => $price,
        'sale_price' => $sale_price,
        'is_featured' => $is_featured,
        'is_active' => $is_active,
        'meta_id' => $meta_id
      ]);
      DB::commit();
      return $product;
    } catch(\Exception $err) {
      DB::rollBack();
      throw $err;
    }
  }
  
  public function deleteProduct(string $id) {
    DB::beginTransaction();
    try {
      $this->product_repository->delete($id);
      DB::commit();
      return true;
    } catch(\Exception $err) {
      DB::rollBack();
      throw $err;
    }
  }
}
