<?php

namespace App\Models;

// use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;

class User extends Authenticatable
{
    /** @use HasFactory<\Database\Factories\UserFactory> */
    use HasFactory, Notifiable;

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
  
    protected $fillable = [
        'name',
        'username',
        'email',
        'password',
        'role',
        'privilege',
        'password',
        'password_expiration_date',
        'activation_effectivity_date',
        'activation_expiration_date',
        'archive',
        'deactivation_reason',
        'deactivation_effectivity_date'
    ];
    protected $with = [
        'accessLevel',
     
    ];

    public function entered(){
        return $this->hasMany(Entry::class,'entered_by');
    }
    public function ledgerkeyer(){
        return $this->hasMany(Ledger::class,'entered_by');
    }
    public function accessLevel() {
        return $this->belongsTo(AccessLevel::class,'privilege');
    }
    /**
     * The attributes that should be hidden for serialization.
     *
     * @var array<int, string>
     */
    protected $hidden = [
        'password',
        'remember_token',
    ];

    /**
     * Get the attributes that should be cast.
     *
     * @return array<string, string>
     */
    protected function casts(): array
    {
        return [
            'email_verified_at' => 'datetime',
            'password' => 'hashed',
        ];
    }
}
