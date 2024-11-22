<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Entry extends Model
{
    //
    protected $with = ['debitAccount','creditAccount','enteredBy'];
    protected $fillable = [
        'description',
        'debit_account_id',
        'debit_amount',
        'credit_account_id',
        'credit_amount',
        'entry_date',
        'reference_no',
        'entered_by'
      
    ];
    public function debitAccount()
    {
        return $this->belongsTo(Accounts::class, 'debit_account_id');
    }
    public function creditAccount()
    {
        return $this->belongsTo(Accounts::class, 'credit_account_id');
    }
    public function enteredBy(){
        return $this->belongsTo(User::class,'entered_by');
    }
    public function ledgerEntries(){
        return $this->hasMany(Ledger::class,'entry_id');
    }
}
