<?php

namespace App\Traits;

use Illuminate\Support\Str;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\Storage;

use App\Models\User;
use App\Models\Diary;
use Illuminate\Support\Facades\Auth;

trait RegisterSecondChoresTrait
{

    /**
     * Creates first mandatory diary on the DB.
     * This diary will be the starter to store all the memories
     */

    public function createFirstDiary($userID){

        $diary = new Diary;
        $diary->name = "My memories";
        $diary->user_id = $userID;
        $diary->visibility = "public";
        $diary->save();

    }

}

?>