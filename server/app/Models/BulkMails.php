<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class BulkMails extends Model
{
    /** @use HasFactory<\Database\Factories\BulkMailsFactory> */
    use HasFactory;
    protected $fillable = ["name","email","phoneNumber","type","users_id"];
}
