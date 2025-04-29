<?php

namespace App\Models\Meta;

use App\Models\Homepage\HomepageModel;
use App\Traits\Uuid;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class MetaModel extends Model
{
    use HasFactory, Uuid;

    protected $table = 'm_meta';
    protected $primaryKey = 'id';
    public $incrementing = false;
    protected $keyType = 'string';

    protected $fillable = [
        'meta_title',
        'meta_description',
        'meta_keywords',
        'og_image',
        'image_alt'
    ];

    public function homepage()
    {
        return $this->belongsTo(HomePageModel::class, 'id', 'meta_id');
    }

}
