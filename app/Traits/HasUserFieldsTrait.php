<?php

namespace App\Traits;

use Illuminate\Support\Str;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\Storage;

use App\Models\User;
use App\Models\Diary;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;

use App\Rules\EnablesURLEncoding;
use App\Rules\ProjectDateFormat;
use App\Rules\ValidImageURL;

trait HasUserFieldsTrait{

    protected function alias(){
        return ["alias" => ["required", "unique:users", "between:3,30", new EnablesURLEncoding]];
    }

    protected function email(){
        return ["email" => ["required", "unique:users", "email"]];
    }

    protected function name(){
        return ["name" => ["required", "between:1,30"]];
    }

    protected function password(){
        return ["password" => ["required", "confirmed", "min:8"]];
    }

    protected function passwordConfirmation(){
        return ["password_confirmation" => ["required", "same:password"]];
    }

    protected function dateOfBirth(){
        return ["date_of_birth" => ["required", "before:today", "date", new ProjectDateFormat]];
    }

    protected function description(){
        return ["description" => ["between:0,1000"]];
    }

    //uploaded by the user
    protected function profile_image(){
        return ["profile_image" => ["image", "mimes:jpeg,png,jpg,gif,svg", "max:2048"]];
    }

    //given by an oauth provider
    protected function picture(){
        return ["picture" => ["nullable", "url", new ValidImageURL]];
    }

    protected function googleID(){
        return ["id" => ["nullable", "string", "max:255"]];
    }

}


?>