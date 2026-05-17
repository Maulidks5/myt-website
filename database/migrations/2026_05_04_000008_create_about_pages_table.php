<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('about_pages', function (Blueprint $table) {
            $table->id();
            $table->string('hero_title')->default('About MYT');
            $table->text('hero_subtitle');
            $table->string('story_eyebrow')->default('Our Story');
            $table->string('story_title');
            $table->text('story_body');
            $table->text('story_body_extra')->nullable();
            $table->string('mission_title')->default('Our Mission');
            $table->text('mission_text');
            $table->string('vision_title')->default('Our Vision');
            $table->text('vision_text');
            $table->json('values')->nullable();
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('about_pages');
    }
};
