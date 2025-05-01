<?php

namespace App\Traits;

use Illuminate\Support\Str;

trait HasSlug
{
    public static function bootHasSlug()
    {
        static::creating(function ($model) {
            if (empty($model->slug)) {
                $model->slug = static::generateUniqueSlug($model);
            }
        });

        static::updating(function ($model) {
            if ($model->isDirty('title')) {
                $model->slug = static::generateUniqueSlug($model);
            }
        });
    }

    protected static function generateUniqueSlug($model)
    {
        $slug = Str::slug($model->title);
        $originalSlug = $slug;
        $i = 1;

        while ($model::where('slug', $slug)->exists()) {
            $slug = $originalSlug . '-' . $i++;
        }

        return $slug;
    }
}
