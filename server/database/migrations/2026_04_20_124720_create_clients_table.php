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
        Schema::create('clients', function (Blueprint $table) {
            $table->id();
            $table->timestamps();
            $table->string("name")->unique(true)->nullable(false);
            $table->string("email")->nullable(false)->unique(true);
            $table->string("phonenumber")->nullable(false)->unique(true);
            $table->string("contactIndividual")->nullable(false);
           

            // Domain part 
            $table->boolean("hasHosting")->nullable(false)->default(false);
            $table->string("domainName")->nullable(true)->unique(true);
            $table->string("domainExpiry")->nullable(true);
            $table->boolean("domainActive")->nullable(true);
            $table->boolean("domainExpired")->nullable(true);

            // system part
            $table->boolean("hasSystem")->nullable(false)->default(true);
            $table->string("systemMode")->nullable(true);
            $table->boolean("systemActive")->nullable(true);
            $table->boolean("systemDoneByUs")->nullable(true);
            $table->string("systemYearMade")->nullable(true);
            $table->string("systemRuntime")->nullable(true);
          
            $table->string("image")->nullable(false);
            $table->foreignId("users_id")->constrained()->onDelete("cascade");
            $table->string("slug")->nullable(false)->unique(true);
            $table->longText("description")->nullable(false);



        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('clients');
    }
};
