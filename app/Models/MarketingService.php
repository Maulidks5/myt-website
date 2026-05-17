<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class MarketingService extends Model
{
    protected $fillable = [
        'title',
        'description',
        'icon_name',
        'portfolio_category',
        'features',
        'is_featured',
        'is_active',
        'sort_order',
    ];

    protected function casts(): array
    {
        return [
            'features' => 'array',
            'is_featured' => 'boolean',
            'is_active' => 'boolean',
            'sort_order' => 'integer',
        ];
    }

    public function packages(): HasMany
    {
        return $this->hasMany(ServicePackage::class);
    }
}
