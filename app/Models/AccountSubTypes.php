<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class AccountSubTypes extends Model
{
    //
    use HasFactory;
    protected $with = ['accountType'];
    protected $fillable = [
        'name',
        'abbr',
        'description',
        'account_id'
    ];
   
    // Define the relationship to AccountType
    public function accountType()
    {
        return $this->belongsTo(AccountTypes::class, 'account_id');
    }

    // Define the relationship to Accounts
    public function accounts()
    {
        return $this->hasMany(Accounts::class, 'account_sub_id');
    }
}
