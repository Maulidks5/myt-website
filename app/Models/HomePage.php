<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class HomePage extends Model
{
    protected $fillable = [
        'hero_eyebrow',
        'hero_title',
        'hero_subtitle',
        'hero_image_url',
        'hero_card_title',
        'hero_card_text',
        'hero_stats',
        'trust_items',
    ];

    protected function casts(): array
    {
        return [
            'hero_stats' => 'array',
            'trust_items' => 'array',
        ];
    }
}
