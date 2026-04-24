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
        Schema::create('projects', function (Blueprint $table) {
            $table->id();
            $table->timestamps();
            $table->string("name")->nullable(false)->unique(true);
            $table->text("description")->nullable(false);
            $table->string("image")->nullable(false);
            $table->string("slug")->unique(true)->nullable(false);
            $table->foreignId("users_id")->constrained()->onDelete("cascade");
            $table->foreignId("clients_id")->constrained()->onDelete('cascade');
            $table->dateTime("inceptionDate")->nullable(false);
            $table->dateTime("completionDate")->nullable(false);
            $table->boolean("isCompleted")->nullable(false)->default(false);
            $table->boolean("isFinalized")->nullable(false)->default(false);
            $table->string("documentation")->nullable(false);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('projects');
    }
};
