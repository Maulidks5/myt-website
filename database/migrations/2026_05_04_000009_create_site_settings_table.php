<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('site_settings', function (Blueprint $table) {
            $table->id();
            $table->string('site_name')->default('Mwambao Youth Technology');
            $table->string('site_url')->default('https://myt.co.tz');
            $table->string('email')->default('info@myt.co.tz');
            $table->string('phone')->default('+255 657 963 896');
            $table->string('whatsapp_number')->default('255657963896');
            $table->string('location')->default('Kariakoo, Zanzibar');
            $table->string('maps_url')->nullable();
            $table->string('map_embed_url')->nullable();
            $table->string('facebook_url')->nullable();
            $table->string('twitter_url')->nullable();
            $table->string('instagram_url')->nullable();
            $table->string('linkedin_url')->nullable();
            $table->text('footer_text')->nullable();
            $table->string('default_og_image')->default('/images/mwambao.png');
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('site_settings');
    }
};
