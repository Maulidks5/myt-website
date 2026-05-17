<?php

use App\Models\MarketingService;
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('portfolio_projects', function (Blueprint $table) {
            $table->foreignId('marketing_service_id')->nullable()->after('id')->constrained()->nullOnDelete();
        });

        if (Schema::hasTable('marketing_services')) {
            $services = MarketingService::all();

            DB::table('portfolio_projects')->orderBy('id')->each(function (object $project) use ($services): void {
                $service = $services->firstWhere('portfolio_category', $project->category) ?? $services->first();

                if ($service) {
                    DB::table('portfolio_projects')->where('id', $project->id)->update([
                        'marketing_service_id' => $service->id,
                    ]);
                }
            });
        }
    }

    public function down(): void
    {
        Schema::table('portfolio_projects', function (Blueprint $table) {
            $table->dropConstrainedForeignId('marketing_service_id');
        });
    }
};
