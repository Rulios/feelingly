<?php

    
use Illuminate\Support\Facades\Route;
use App\Models\User;
use Illuminate\Support\Facades\Auth;

/**
 * Profile Routes
 * 
 * This file includes all the routes and functionalities that the user can access. 
 * Like changing profile pic, changing profile values, viewing a profile, etc. 
 */

//serving a profile
Route::get("/profile/{alias}", function($alias){

    $isOwnProfile = false;

    try{

        if(Auth::check() && Auth::user()->alias == $alias){
            $isOwnProfile = true;
            $user = Auth::user();
        }else{
            $user = User::where("alias", $alias)->first();
        }

        return view("profile", [
            "alias" => $user->alias,
            "name" => $user->name,
            "description" => $user->description,
            "isOwnProfile" => $isOwnProfile,
            "numberOfMemoriesWritten" => 0
        ]);

    }catch(Throwable $e){
        abort(404);
    }

})->name("profile");


Route::get("/profile/{alias}/config", function($alias){

    try{

        $user = Auth::user();

        return view("profile-config", [
            "alias" => $user->alias,
            "name" => $user->name,
            "description" => $user->description
        ]);

    }catch(Throwable $e){
        echo $e;
        //return redirect("/profile/" . $alias);
    }

})->name("profile.config")->middleware("auth");

Route::post("/profile/profile_image/update", function(){
    try{

        

    }catch(Throwable $e){
        echo $e;
    }
})->name("profile.image.update")->middleware("auth");

Route::post("/profile/profile_image/delete", function(){
    try{

        

    }catch(Throwable $e){
        echo $e;
    }
})->name("profile.image.delete")->middleware("auth");








?>