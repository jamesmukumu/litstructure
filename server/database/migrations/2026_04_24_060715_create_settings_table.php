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
        Schema::create('settings', function (Blueprint $table) {
            $table->id();
            $table->timestamps();
            $table->string('email')->nullable(false);
            $table->string('phoneNumber')->nullable(false);
            $table->string('instagram')->nullable(false);
            $table->string('facebook')->nullable(true);
            $table->string('linkedin')->nullable(false);
            $table->string('logo')->nullable(false);
            $table->foreignId("users_id")->nullable(false)->constrained()->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('settings');
    }
};
