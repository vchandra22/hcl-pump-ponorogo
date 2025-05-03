<?php
namespace App\Services;

use App\Repositories\Meta\MetaRepository;
use Illuminate\Support\Facades\DB;

class MetaService {
  private $meta_repository;
  
  function __construct(MetaRepository $meta_repository)
  {
    $this->meta_repository = $meta_repository;
  }
  
  public function getAllMeta()
  {
    return $this->meta_repository->all();
  }
  
  public function createMeta(
    string $meta_title,
    string $meta_description,
    string $meta_keywords,
    string $og_image,
    string $image_alt
)
  {
    DB::beginTransaction();
    try {
      $meta = $this->meta_repository->create([
        'meta_title' => $meta_title,
        'meta_description' => $meta_description,
        'meta_keywords' => $meta_keywords,
        'og_image' => $og_image,
        'image_alt' => $image_alt
      ]);
      DB::commit();
      return $meta;
    } catch (\Exception $err) {
      DB::rollBack();
      throw $err;
    }
  }
  
  public function updateMeta(string $id, array $data)
  {
    DB::beginTransaction();
    try {
      $data = $this->meta_repository->update($id, $data);
      DB::commit();
      return $data;
    } catch(\Exception $err) {
      DB::rollBack();
      throw $err;
    }
  }
  
  public function deleteMeta(string $id)
  {
    DB::beginTransaction();
    try {
      $data = $this->meta_repository->delete($id);
      DB::commit();
      return $data;
    } catch(\Exception $err) {
      DB::rollBack();
      throw $err;
    }
  }
}