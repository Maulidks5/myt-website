<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        if (! Schema::hasTable('client_projects')) {
            return;
        }

        DB::table('client_projects')->update([
            'credential_username' => null,
            'credential_password' => null,
            'credential_notes' => null,
        ]);
    }

    public function down(): void
    {
        //
    }
};
