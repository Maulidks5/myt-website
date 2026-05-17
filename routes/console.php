<?php

use Illuminate\Foundation\Inspiring;
use Illuminate\Support\Facades\Artisan;
use App\Models\User;

Artisan::command('inspire', function () {
    $this->comment(Inspiring::quote());
})->purpose('Display an inspiring quote');

Artisan::command('admin:grant-all {email?}', function (?string $email = null) {
    $email ??= env('ADMIN_EMAIL', 'admin@myt.co.tz');

    $user = User::where('email', $email)->first();

    if (! $user) {
        $this->error("No user found for {$email}.");
        return self::FAILURE;
    }

    $user->forceFill([
        'is_active' => true,
        'can_access_client_dashboard' => true,
        'permissions' => array_keys(User::availablePermissions()),
    ])->save();

    $this->info("Granted all admin permissions to {$email}.");
    return self::SUCCESS;
})->purpose('Grant all admin permissions to a user by email');
