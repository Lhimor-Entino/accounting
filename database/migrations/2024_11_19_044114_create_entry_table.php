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
        Schema::create('entries', function (Blueprint $table) {
            $table->id();
            $table->string("description");
            $table->unsignedBigInteger('debit_account_id')->index();
            $table->decimal('debit_amount', 10, 2); 
            $table->unsignedBigInteger('credit_account_id')->index();
            $table->unsignedBigInteger('entered_by')->index();
            $table->decimal('credit_amount', 10, 2); 
            $table->string('reference_no'); 
            $table->timestamp('entry_date')->nullable();
            $table->tinyInteger('archive')->default(0); // active 
            $table->timestamps();

            $table->foreign('entered_by')->references('id')->on('users');
            $table->foreign('debit_account_id')->references('id')->on('accounts')->onDelete('cascade');
            $table->foreign('credit_account_id')->references('id')->on('accounts')->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('entry');
    }
};
