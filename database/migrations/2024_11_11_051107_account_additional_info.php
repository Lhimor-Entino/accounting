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
        //
        Schema::create("accounts_additional_infos",function(Blueprint $table) {
            $table->id();
            $table->string('field')->nullable();  
            $table->string('value')->nullable();  
            $table->unsignedBigInteger('account_id')->index();
            $table->tinyInteger('archive')->default(0); // active 
            $table->timestamps();
            
            $table->foreign('account_id')->references('id')->on('accounts')->onDelete('cascade');
        });

    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        //
    }
};
