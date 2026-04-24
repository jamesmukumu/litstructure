<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Clients extends Model
{
    /** @use HasFactory<\Database\Factories\ClientsFactory> */
    use HasFactory;
    protected function casts(){
    return [

    "hasHosting"=>"boolean",
    "domainActive"=>"boolean",
    "domainExpired"=>'boolean',
    'hasSystem'=>"boolean",
    'systemActive'=>'boolean',
    "systemDoneByUs"=>"boolean"
    ];

    }
    protected $fillable = ["name","image","users_id","slug","description","email","phonenumber","contactIndividual","hasHosting","domainName","domainExpiry","domainActive","domainExpired","hasSystem","systemMode","systemActive","systemDoneByUs","systemYearMade","systemRuntime"];
}
