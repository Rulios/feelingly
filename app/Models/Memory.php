<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\User;

class Memory extends Model
{
    use HasFactory;

    public function user(){
        $this->belongsTo(User::class);
    }



    protected $dates = ['created_at', 'updated_at'];

   



}
