<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;

use Illuminate\Contracts\Auth\CanResetPassword;


class User extends Authenticatable 
implements MustVerifyEmail, CanResetPassword
{
    use HasFactory;
    use Notifiable;
    
    public function diaries(){
        return $this->hasMany(Diary::class);
    }

    public function memories(){
        return $this->hasMany(Memory::class);
    }

    public function followers(){
        return $this->belongsToMany(User::class, 'follows', 'user_id', 'follower_id')
                ->as('followers');
    }

    public function followings(){
        return $this->belongsToMany(User::class, 'follows', 'follower_id', 'user_id')
                ->as('followings');
    }

}
