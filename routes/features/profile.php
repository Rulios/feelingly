<?php

    
use Illuminate\Support\Facades\Route;
use App\Models\User;
use App\Models\Memory;
use App\Models\Diary;
use App\Models\Follow;
use Illuminate\Support\Facades\Auth;

use App\Http\Controllers\ProfileController;
use App\Http\Controllers\FollowController;
/**
 * Profile Routes
 * 
 * This file includes all the routes and functionalities that the user can access. 
 * Like changing profile pic, changing profile values, viewing a profile, etc. 
 */

//serving a profiles
Route::get("/profile/{alias}", function($alias){

    try{

        if(Auth::check() && Auth::user()->alias == $alias){
            $user = Auth::user();
        }else{
            $user = User::where("alias", $alias)->first();
        }

        return view("profile", [
            "alias" => $user->alias,
            "name" => $user->name,
            "description" => $user->description,
            "numberOfMemoriesWritten" => count(Memory::where([["user_id", $user->id], ["visibility", "public"]])->get()),
            "numberOfDiaries" =>  count(Diary::where([["user_id", $user->id], ["visibility", "public"]])->get()),
            "isOwnProfile" => Auth::check() && Auth::user()->alias == $alias,
            "t_user_alias" => $user->alias //sets hidden alias on current profile page
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
            "date_of_birth" => $user->date_of_birth,
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






/**FOLLOW FEATURE ROUTES */

Route::post("/profile/actions/follow", [FollowController::class, "followUser"])
    ->name("profile.follow")
    ->middleware("auth");

Route::post("/profile/actions/unfollow", [FollowController::class, "unfollowUser"])
    ->name("profile.unfollow")
    ->middleware("auth");

Route::get("/profile/actions/is_following", [FollowController::class, "isFollowing"])
    ->name("profile.is_following")
    ->middleware("auth");



?>