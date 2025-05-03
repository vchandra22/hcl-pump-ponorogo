<?php
namespace App\Services;

use Illuminate\Support\Facades\Storage;

class UploadImageService {
  public function single($image) 
  {
    $image_name = time() . '-' . uniqid() . '-' . $image->getClientOriginalName();
    $path = $image->storeAs('uploads', $image_name, 'public');
    return [
      'path' => Storage::url($path),
      'name' => $image_name
    ];
  }
  
  public function multiple(array $images)
  {
    $uploaded_image = [];

    foreach($images as $image)
    {
      $image_name = time() . '-' . uniqid() . '-' . $image->getClientOriginalName();
      $path = $image->storeAs('uploads', $image_name, 'public');
      $uploaded_image[] = [
        'name' => $image_name,
        'path' => Storage::url($path)
      ];
    }
    
    return $uploaded_image;
  }
}