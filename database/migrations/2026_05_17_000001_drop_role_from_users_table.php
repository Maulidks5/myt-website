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
        DB::table('users')
            ->where('role', 'super_admin')
            ->update([
                'permissions' => json_encode(array_keys(User::availablePermissions())),
                'can_access_client_dashboard' => true,
            ]);

        Schema::table('users', function (Blueprint $table) {
            $table->dropColumn('role');
        });
    }

    public function down(): void
    {
        Schema::table('users', function (Blueprint $table) {
            $table->string('role')->default('editor')->after('email');
        });

        DB::table('users')
            ->whereJsonContains('permissions', 'users.manage')
            ->update(['role' => 'super_admin']);
    }
};
