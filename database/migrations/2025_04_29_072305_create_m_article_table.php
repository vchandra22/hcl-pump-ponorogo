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
        Schema::create('m_article', function (Blueprint $table) {
            $table->uuid('id')->primary();
            $table->string('slug');
            $table->string('title');
            $table->text('summary');
            $table->text('content');
            $table->text('image_article');
            $table->string('author');
            $table->string('meta_id');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('m_article');
    }
};
