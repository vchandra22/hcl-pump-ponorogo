<?php

namespace App\Services;

use App\Repositories\Product\ProductRepository;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Str;

class ProductService
{
  private $product_repository;
  private $meta_service;

  function __construct(ProductRepository $product_repository, MetaService $meta_service)
  {
    $this->product_repository = $product_repository;
    $this->meta_service = $meta_service;
  }

  public function getAllProducts()
  {
    return $this->product_repository->all();
  }
  
  public function getProductById(string $id)
  {
    return $this->product_repository->findOne($id);
  }

  public function createProduct(
    string $title,
    string $short_description,
    int $price,
    int $sale_price,
    string $meta_id,
  ) {
    DB::beginTransaction();
    try {
      $product = $this->product_repository->create([
        'slug' => Str::slug($title),
        'title' => $title,
        'short_description' => $short_description,
        'price' => $price,
        'sale_price' => $sale_price,
        'meta_id' => $meta_id
      ]);
      DB::commit();
      return $product;
    } catch (\Exception $err) {
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
