<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use PDO;

class Ledger extends Model
{
    //
    protected $with = ['account', 'ledgerEntry','enteredBy'];
    protected  $fillable = [
        'account_id',
        'entry_id',
        'debit_amount',
        'credit_amount',
        'transaction_date',
        'entered_by'
    ];

    public function enteredBy(){
        return $this->belongsTo(User::class,'entered_by');
    }
    public function account()
    {
        return $this->belongsTo(Accounts::class, 'account_id');
    }
    public function ledgerEntry()
    {
        return $this->belongsTo(Entry::class, 'entry_id');
    }
}
