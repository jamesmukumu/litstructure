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
        Schema::create('users', function (Blueprint $table) {
            $table->id();
            $table->timestamps();
            $table->string("name")->unique(true)->nullable(false);
            $table->string("email")->unique(true)->nullable(false);
            $table->string("password")->nullable(false);
            $table->string("phonenumber",10)->nullable(false)->unique(true);
            $table->boolean("superAdmin")->default(false)->nullable(true);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('users');
    }
};
