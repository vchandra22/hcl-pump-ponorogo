<?php

namespace App\Models;

use App\Traits\InteractsWithUuid;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class ProductDetail extends Model
{
   use HasFactory, InteractsWithUuid;
   
   protected $table = 'm_product_detail';
   protected $primaryKey = 'id';
   public $incrementing = false;
   protected $keyType = 'string';
   
   protected $fillable = [
    'product_id',
    'description',
    'specification',
    'additional_info'
   ];
   
   public function product() : BelongsTo {
    return $this->belongsTo(Product::class, 'id', 'product_id');
   }
}
