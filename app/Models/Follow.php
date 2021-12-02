<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

/**
 * This model has 4 fields:
 *  id
 *  user_id
 *  followed_user_id
 *  type: specifies the type of the follow which currently can only be "user" 
 *          *as the app progresses, more follow type should be added according to specifications*
 */


class Follow extends Model
{
    use HasFactory;


}
