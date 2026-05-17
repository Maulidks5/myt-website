<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('portfolio_projects', function (Blueprint $table) {
            $table->string('client_name')->nullable()->after('title');
            $table->string('project_url')->nullable()->after('image_url');
            $table->text('challenge')->nullable()->after('description');
            $table->text('solution')->nullable()->after('challenge');
            $table->text('result')->nullable()->after('solution');
        });
    }

    public function down(): void
    {
        Schema::table('portfolio_projects', function (Blueprint $table) {
            $table->dropColumn([
                'client_name',
                'project_url',
                'challenge',
                'solution',
                'result',
            ]);
        });
    }
};
