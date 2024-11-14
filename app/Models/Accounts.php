<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Accounts extends Model
{

    use HasFactory;
    protected $fillable = [
        'bank_account_code',
        'bank_name',
        'branch',
        'account_name',
        'account_type',
        'account_no',
        'currency',
        'others_info',
        'account_sub_id',
        'name',
        'num_months_depreciation',
        'account_source_id'
    ];
    protected $with = [
        'accountSubType',
        'accountAdditionalInfo',
        'accountPayablesSourceOfFund',
    ];


    // Define the relationship to AccountSubType
    public function accountSubType()
    {
        return $this->belongsTo(AccountSubTypes::class, 'account_sub_id');
    }
    public function accountAdditionalInfo()
    {
        return $this->hasMany(AccountAdditionalInfo::class, 'account_id');
    }

    // Define the self-referencing relationship
    public function accountPayablesSourceOfFund()
    {
        return $this->belongsTo(Accounts::class, 'account_source_id');
    }

    public function accountPayables()
    {
        return $this->hasMany(Accounts::class, 'account_source_id');
    }
}
