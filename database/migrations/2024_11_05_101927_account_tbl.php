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
        Schema::create("accounts", function (Blueprint $table) {
            $table->id();
            $table->string('bank_account_code')->nullable();
            $table->string('bank_name')->nullable();
            $table->string('branch')->nullable();
            $table->string('account_name')->nullable();
            $table->string('account_no')->nullable();
            $table->string('currency')->nullable();
            $table->string('name')->nullable();
            $table->string('others_info')->nullable();
            $table->string('capital')->nullable();
            $table->foreignId('account_source_id')->nullable()->constrained('accounts')->onDelete('set null');
            $table->unsignedBigInteger('account_sub_id')->index();
            $table->unsignedBigInteger('num_months_depreciation')->nullable();
            $table->tinyInteger('archive')->default(0); // active 
            $table->timestamps();    
            $table->foreign('account_sub_id')->references('id')->on('account_sub_types')->onDelete('cascade');
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
