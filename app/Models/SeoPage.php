<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class SeoPage extends Model
{
    protected $fillable = [
        'path',
        'title',
        'description',
        'image',
        'is_indexable',
    ];

    protected function casts(): array
    {
        return [
            'is_indexable' => 'boolean',
        ];
    }
}
