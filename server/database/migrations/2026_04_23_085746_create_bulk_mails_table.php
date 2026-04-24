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
        Schema::create('bulk_mails', function (Blueprint $table) {
            $table->id();
            $table->timestamps();
            $table->string("name")->nullable(false)->unique(true);
            $table->string("email")->nullable(false)->unique(true);
            $table->string("phoneNumber",13)->nullable(false)->unique(true);
            $table->enum("type",["client","manager","it technician","hr manager","other"])->nullable(false)->default('client');
            $table->foreignId("users_id")->nullable(false)->constrained()->onDelete("cascade");

        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('bulk_mails');
    }
};
