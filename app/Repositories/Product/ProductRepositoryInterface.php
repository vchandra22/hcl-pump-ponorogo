<?php

namespace App\Repositories\Product;

interface ProductRepositoryInterface {
  public function all();
  public function findOne(string $id);
  public function findBySlug(string $slug);
  public function create(array $product);
  public function update(string $id, array $product);
  public function delete(string $id);
}