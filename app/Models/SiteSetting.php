<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class SiteSetting extends Model
{
    protected $fillable = [
        'site_name',
        'site_url',
        'logo_url',
        'email',
        'phone',
        'whatsapp_number',
        'location',
        'maps_url',
        'map_embed_url',
        'facebook_url',
        'twitter_url',
        'instagram_url',
        'linkedin_url',
        'footer_text',
        'default_og_image',
    ];
}
