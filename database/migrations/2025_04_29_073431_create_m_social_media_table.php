<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('m_social_media', function (Blueprint $table) {
            $table->uuid('id')->primary();
            $table->text('icon_social_media');
            $table->string('platform');
            $table->string('title');
            $table->text('social_media_link');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('m_social_media');
    }
};
