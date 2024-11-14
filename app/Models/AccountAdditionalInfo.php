<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class AccountAdditionalInfo extends Model
{
    //
    protected $table = 'accounts_additional_infos';
    use HasFactory;
    protected $fillable = [
        'field', 'value', 'account_id'
    ];
 
    public function account() {
        return $this->BelongsTo(Accounts::class,'account_id');
    }
}
