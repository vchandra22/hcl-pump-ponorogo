<?php
namespace App\Services;

use App\Repositories\ProductImage\ProductImageRepository;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Storage;

class ProductImageService {
  private $product_image_repository;

  function __construct(ProductImageRepository $product_image_repository)
  {
    $this->product_image_repository = $product_image_repository;
  }

  public function getAllProductImages()
  {
    return $this->product_image_repository->all();
  } 
  
  public function createProductImages(
    string $product_id,
    string $image_name,
    string $image_path,
    string $alt_text
  ) 
  {
    DB::beginTransaction();
    try {
      $data = $this->product_image_repository->create([
        'product_id' => $product_id,
        'image_name' => $image_name,
        'image_path' => $image_path,
        'alt_text' => $alt_text
      ]);
      DB::commit();
      return $data;
    } catch(\Exception $err) {
      DB::rollBack();
      throw $err;
    }
  }
  
  public function deleteAllProductImages(string $product_id)
  {
    DB::beginTransaction();
    try {
      $images = $this->product_image_repository->findByProductId($product_id);
      foreach($images as $image) {
        $this->product_image_repository->delete($image->id);
        $filename = 'uploads/'.$image->image_name;
        Storage::disk('public')->delete($filename);
      }
      DB::commit();
      return true;
    } catch(\Exception $err) {
      DB::rollBack();
      throw $err;
    }
  }
  
  public function deleteProductImage(string $id)
  {
    DB::beginTransaction();
    try {
      $image = $this->product_image_repository->findOne($id);
      $filename = 'uploads/' . $image->image_name;
      Storage::disk('public')->delete($filename);
      $this->product_image_repository->delete($id);
      DB::commit();
      return true;
    } catch(\Exception $err) {
      DB::rollBack();
      throw $err;
    }
  }
}