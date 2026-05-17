<?php

namespace App\Models;

// use Illuminate\Contracts\Auth\MustVerifyEmail;
use Database\Factories\UserFactory;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;

class User extends Authenticatable
{
    /** @use HasFactory<UserFactory> */
    use HasFactory, Notifiable;

    /**
     * The attributes that are mass assignable.
     *
     * @var list<string>
     */
    protected $fillable = [
        'name',
        'email',
        'is_active',
        'can_access_client_dashboard',
        'permissions',
        'password',
    ];

    /**
     * The attributes that should be hidden for serialization.
     *
     * @var list<string>
     */
    protected $hidden = [
        'password',
        'remember_token',
    ];

    /**
     * Get the attributes that should be cast.
     *
     * @return array<string, string>
     */
    protected function casts(): array
    {
        return [
            'email_verified_at' => 'datetime',
            'is_active' => 'boolean',
            'can_access_client_dashboard' => 'boolean',
            'permissions' => 'array',
            'password' => 'hashed',
        ];
    }

    /**
     * @return array<string, string>
     */
    public static function availablePermissions(): array
    {
        return [
            'dashboard.view' => 'Dashboard',
            'messages.manage' => 'Leads / Messages',
            'homepage.manage' => 'Homepage',
            'about.manage' => 'About Page',
            'services.manage' => 'Services & Packages',
            'portfolio.manage' => 'Portfolio',
            'testimonials.manage' => 'Testimonials',
            'faqs.manage' => 'FAQ',
            'clients.manage' => 'MYT Office / Clients',
            'settings.manage' => 'Settings / SEO',
            'users.manage' => 'Users Management',
            'activity-logs.view' => 'Activity Logs',
        ];
    }

    public function canAccessMytOffice(): bool
    {
        return $this->canAccess('clients.manage') || $this->can_access_client_dashboard;
    }

    public function canAccess(string $permission): bool
    {
        return in_array($permission, $this->permissions ?? [], true);
    }
}
