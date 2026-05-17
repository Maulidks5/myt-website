<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('home_pages', function (Blueprint $table) {
            $table->id();
            $table->string('hero_eyebrow')->default('Digital partner for growing businesses');
            $table->text('hero_title');
            $table->text('hero_subtitle');
            $table->string('hero_image_url')->nullable();
            $table->string('hero_card_title')->default('Website inayofanya kazi');
            $table->text('hero_card_text')->nullable();
            $table->json('hero_stats')->nullable();
            $table->json('trust_items')->nullable();
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('home_pages');
    }
};
