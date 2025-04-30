<?php

namespace App\Models;

use App\Traits\InteractsWithUuid;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Foundation\Testing\Concerns\InteractsWithViews;

class SocialMediaModel extends Model
{
    use HasFactory, InteractsWithUuid;

    protected $table = 'm_social_media';
    protected $primaryKey = 'id';
    public $incrementing = false;
    protected $keyType = 'string';

    protected $fillable = [
        'icon_social_media',
        'platform',
        'title',
        'social_media_link'
    ];
}
