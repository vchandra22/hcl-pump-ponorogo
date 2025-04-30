<?php

namespace App\Models;

use App\Traits\InteractsWithUuid;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class AboutModel extends Model
{
    use HasFactory, InteractsWithUuid;
    protected $table = 'm_about';
    protected $primaryKey = 'id';
    public $incrementing = false;
    protected $keyType = 'string';

    protected $fillable = [
        'title',
        'description',
        'image_company',
        'meta_id'
    ];

    public function meta()
    {
        return $this->hasOne(MetaModel::class, 'id', 'meta_id');
    }
}
