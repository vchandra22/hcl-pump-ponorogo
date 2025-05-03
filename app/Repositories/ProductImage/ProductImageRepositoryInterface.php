<?php
namespace App\Repositories\ProductImage;

interface ProductImageRepositoryInterface {
  public function all();
  public function findOne(string $id);
  public function findByProductId(string $product_id);
  public function create(array $data);
  public function update(string $id, array $data);
  public function delete(string $id);
}