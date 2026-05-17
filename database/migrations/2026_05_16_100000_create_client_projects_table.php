<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('client_projects', function (Blueprint $table) {
            $table->id();
            $table->string('client_name');
            $table->string('business_name')->nullable();
            $table->string('phone')->nullable();
            $table->string('whatsapp')->nullable();
            $table->string('email')->nullable();
            $table->string('location')->nullable();
            $table->string('service_type')->default('Website');
            $table->string('project_name');
            $table->string('status')->default('New');
            $table->date('start_date')->nullable();
            $table->date('deadline')->nullable();
            $table->decimal('total_price', 14, 2)->default(0);
            $table->decimal('amount_paid', 14, 2)->default(0);
            $table->decimal('expenses', 14, 2)->default(0);
            $table->text('notes')->nullable();
            $table->string('credential_url')->nullable();
            $table->text('credential_username')->nullable();
            $table->text('credential_password')->nullable();
            $table->text('credential_notes')->nullable();
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('client_projects');
    }
};
