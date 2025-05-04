<?php

namespace App\Models;

use App\Traits\InteractsWithUuid;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\HasOne;

class Product extends Model
{
    use HasFactory, InteractsWithUuid;

    protected $table = 'm_product';
    public $incrementing = false;
    protected $primaryKey = 'id';
    protected $keyType = 'string';

    protected $fillable = [
        'slug',
        'title',
        'short_description',
        'price',
        'sale_price',
        'is_featured',
        'is_active',
        'meta_id'
    ];
    
    public function meta() 
    {
        return $this->hasOne(MetaModel::class, 'id', 'meta_id');
    }
    
    public function productDetail() : HasOne 
    {
        return $this->hasOne(ProductDetail::class, 'product_id', 'id');
    }
    
    public function productImages(): HasMany
    {
        return $this->hasMany(ProductImage::class, 'product_id', 'id');
    }
}
