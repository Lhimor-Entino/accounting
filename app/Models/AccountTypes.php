<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class AccountTypes extends Model
{
    //
    use HasFactory;
    protected $fillable = [
        'name',
        'abbr',
        'description'
    ];
    // Define the relationship to AccountSubTypes
    public function accountSubTypes()
    {
        return $this->hasMany(AccountSubTypes::class, 'account_id');
    }
}
