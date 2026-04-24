<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Projects extends Model
{
    /** @use HasFactory<\Database\Factories\ProjectsFactory> */
    use HasFactory;
    protected $fillable = ["name","description","image","users_id","slug","clients_id","inceptionDate","completionDate","documentation","isFinalized","isCompleted"];

    public function client(){
    return $this->belongsTo(Clients::class,"clients_id","id");
    }
}
