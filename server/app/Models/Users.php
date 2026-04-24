<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use Tymon\JWTAuth\Contracts\JWTSubject;

class Users extends Model implements JWTSubject
{
    /** @use HasFactory<\Database\Factories\UsersFactory> */
    use HasFactory;
    // use SoftDeletes;
        public function getJWTIdentifier(){
        return $this->getKey();
    }

    public function getJWTCustomClaims()
    {
        return [];
    }
    public function casts(){
    return [
    "superAdmin"=>"boolean"
    ];
    }
    protected $fillable = ["email","name","superAdmin","phoneNumber","password"];
}
