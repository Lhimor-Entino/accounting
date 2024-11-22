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
        Schema::create('ledgers', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('account_id')->index();
            $table->unsignedBigInteger('entry_id')->index();
            $table->unsignedBigInteger('entered_by')->index();

            $table->decimal('debit_amount', 10, 2);
            $table->decimal('credit_amount', 10, 2);
            $table->timestamp('transaction_date')->nullable();
            $table->tinyInteger('archive')->default(0); // active 
            $table->timestamps();

            $table->foreign('entered_by')->references('id')->on('users');
            $table->foreign('account_id')->references('id')->on('accounts')->onDelete('cascade');
            $table->foreign('entry_id')->references('id')->on('entries');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('ledger');
    }
};
