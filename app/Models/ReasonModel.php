<?php

namespace App\Models;


use App\Traits\InteractsWithUuid;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class ReasonModel extends Model
{
    use HasFactory, InteractsWithUuid;
    protected $table = 'm_reason';
    protected $primaryKey = 'id';
    public $incrementing = false;
    protected $keyType = 'string';

    protected $fillable = [
        'title',
        'description',
    ];
}
