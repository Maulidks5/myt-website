<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class PortfolioProject extends Model
{
    protected $fillable = [
        'marketing_service_id',
        'title',
        'client_name',
        'category',
        'gradient',
        'image_url',
        'project_url',
        'description',
        'challenge',
        'solution',
        'result',
        'is_featured',
        'is_active',
        'sort_order',
    ];

    protected function casts(): array
    {
        return [
            'is_featured' => 'boolean',
            'is_active' => 'boolean',
            'sort_order' => 'integer',
        ];
    }

    public function service(): BelongsTo
    {
        return $this->belongsTo(MarketingService::class, 'marketing_service_id');
    }
}
