<?php

namespace App\Models;

use App\Traits\InteractsWithUuid;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class MetaModel extends Model
{
    use HasFactory, InteractsWithUuid;

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

    public function privacyPolicy()
    {
        return $this->belongsTo(PrivacyPolicy::class, 'id', 'meta_id');
    }
    public function termsCondition()
    {
        return $this->belongsTo(TermsCondition::class,'id', 'meta_id');
    }

    public function disclaimer()
    {
        return $this->belongsTo(DisclaimerModel::class, 'id', 'meta_id');
    }

    public function article()
    {
        return $this->belongsTo(ArticleModel::class);
    }

    public function contact()
    {
        return $this->belongsTo(ContactModel::class, 'id', 'meta_id');
    }

    public function product()
    {
        return $this->belongsTo(HomePageModel::class, 'id', 'meta_id');
    }
}
