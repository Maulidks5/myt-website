<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class AboutPage extends Model
{
    protected $fillable = [
        'hero_title',
        'hero_subtitle',
        'about_image_url',
        'story_eyebrow',
        'story_title',
        'story_body',
        'story_body_extra',
        'mission_title',
        'mission_text',
        'vision_title',
        'vision_text',
        'values',
    ];

    protected function casts(): array
    {
        return [
            'values' => 'array',
        ];
    }
}
