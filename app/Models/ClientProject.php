<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class ClientProject extends Model
{
    protected $fillable = [
        'client_name',
        'business_name',
        'phone',
        'whatsapp',
        'email',
        'location',
        'service_type',
        'project_name',
        'status',
        'start_date',
        'deadline',
        'total_price',
        'amount_paid',
        'expenses',
        'notes',
        'credential_url',
        'credential_username',
        'credential_password',
        'credential_notes',
    ];

    protected $appends = [
        'balance',
        'profit',
    ];

    protected function casts(): array
    {
        return [
            'start_date' => 'date:Y-m-d',
            'deadline' => 'date:Y-m-d',
            'total_price' => 'decimal:2',
            'amount_paid' => 'decimal:2',
            'expenses' => 'decimal:2',
        ];
    }

    public function getBalanceAttribute(): float
    {
        return max((float) $this->total_price - (float) $this->amount_paid, 0);
    }

    public function getProfitAttribute(): float
    {
        return (float) $this->amount_paid - (float) $this->expenses;
    }
}
