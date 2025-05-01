<?php

namespace App\Models;

use App\Traits\HasSlug;
use App\Traits\InteractsWithUuid;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ArticleModel extends Model
{
    use HasFactory, InteractsWithUuid, HasSlug;

    protected $table = 'm_article';
    protected $primaryKey = 'id';
    protected $keyType = 'string';
    public $incrementing = false;

    protected $fillable = [
        'title',
        'summary',
        'content',
        'image_article',
        'author',
        'meta_id',
    ];

    public function meta()
    {
        return $this->hasOne(MetaModel::class, 'id', 'meta_id');
    }
}
