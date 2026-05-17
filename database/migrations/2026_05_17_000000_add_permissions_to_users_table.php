<?php

use App\Models\User;
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('users', function (Blueprint $table) {
            $table->json('permissions')->nullable()->after('can_access_client_dashboard');
        });

        DB::table('users')
            ->where('role', 'super_admin')
            ->update(['permissions' => json_encode(array_keys(User::availablePermissions()))]);

        DB::table('users')
            ->where('can_access_client_dashboard', true)
            ->where('role', '!=', 'super_admin')
            ->update(['permissions' => json_encode(['dashboard.view', 'clients.manage'])]);

        DB::table('users')
            ->where('can_access_client_dashboard', false)
            ->where('role', '!=', 'super_admin')
            ->update(['permissions' => json_encode(['dashboard.view'])]);
    }

    public function down(): void
    {
        Schema::table('users', function (Blueprint $table) {
            $table->dropColumn('permissions');
        });
    }
};
