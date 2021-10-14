<?php

namespace App\Traits;

use Illuminate\Support\Str;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\Storage;

use App\Models\User;
use App\Models\diary_memories;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;

trait RegisterSecondChoresTrait
{

    /**
     * Creates first mandatory diary_memories on the DB.
     * This diary_memories will be the starter to store all the memories
     */

    public function createInitialsDiaries($userID){

        $diary_memories = new Diary;
        $diary_memories->name = "My memories";
        $diary_memories->user_id = $userID;
        $diary_memories->visibility = "public";


        $diary_replies = new Diary();
        $diary_replies->name = "Replies";
        $diary_replies->user_id = $userID;
        $diary_replies->visibility = "public";

        $diary_memories->save();
        $diary_replies->save();

    }

}

?>