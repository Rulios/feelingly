<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\User;
use App\Traits\UUIDS;

class Memory extends Model
{
    use HasFactory;
    use UUIDS;

    public function user(){
        $this->belongsTo(User::class);
    }
/* 
    public $timestamps = true; */
    protected $dates = ['created_at', 'updated_at'];

   



}
