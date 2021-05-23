<?php

    
use Illuminate\Support\Facades\Route;
use App\Models\User;
use Illuminate\Support\Facades\Auth;

use App\Http\Controllers\ProfileController;

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



Route::get("/profile/account/config", function(){

    try{

        $user = Auth::user();

        return view("profile-config", [
            "alias" => $user->alias,
            "name" => $user->name,
            "description" => $user->description,
            "email" =>$user->email,
            "email_verified_at" => $user->email_verified_at
        ]);

    }catch(Throwable $e){
        echo $e;
        //return redirect("/profile/" . $alias);
    }

})->name("profile.config")->middleware("auth");

Route::post("/profile/profile_image/update", [ProfileController::class, "imageUpdate"])
    ->name("profile.image.update")
    ->middleware("auth");

Route::post("/profile/profile_image/delete", [ProfileController::class, "imageDelete"])
    ->name("profile.image.delete")
    ->middleware("auth");

Route::post("/profile/account/update", [ProfileController::class, "updateProfileBasic"])
    ->name("profile.update.basic")
    ->middleware("auth");

Route::put("/profile/account/change_password", [ProfileController::class, "changePassword"])
    ->name("profile.change.password")
    ->middleware("auth");

Route::put("/profile/account/change_email", [ProfileController::class, "changeEmail"])
    ->name("profile.change.email")
    ->middleware("auth");


?>