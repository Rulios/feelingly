<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Traits\UUIDS;


class Diary extends Model
{
    use HasFactory;
    use UUIDS;

    public function user(){
        return $this->belongsTo(User::class);
    }
}
