<?php

namespace App\Http\Controllers;

use App\Models\User;
use App\Models\Follow;
use Illuminate\Support\Facades\Auth;
use Illuminate\Http\Request;

use Illuminate\Support\Facades\Config;

class FollowController extends Controller
{
    //

    public function isFollowing(Request $request){
        try{

            $request->validate([
                "followed_user_alias" => "required|string|exists:users,alias",
            ]);


            $user = Auth::user();
            $followedUser = User::where('alias', $request->followed_user_alias)->first();

            //the follow already exists
            $followExists = Follow::where([
                "user_id" => $user->id,
                "followed_element_id" => $followedUser->id,
                "type" => Config::get("constants.USER_FOLLOW_TYPE")
            ])->exists();


            if($followExists){
                return response()->json(["followed" => true]);
            }else{
                return response()->json(["followed" => false]);
            }

        }catch(\Exception $e){
            return response()->json(['message' => "Ooops, there has been an error in this operation"], 500);
        }
    }

    public function followUser(Request $request){
        try{


            $request->validate([
                "followed_user_alias" => "required|exists:users,alias"
            ]);

            $user = Auth::user();
            $followedUser = User::where("alias", $request->followed_user_alias)->first();

            //the follow already exists
            $followExists = Follow::where([
                "user_id" => $user->id,
                "followed_element_id" => $followedUser->id,
                "type" => Config::get("constants.USER_FOLLOW_TYPE")
            ])->exists();

            if($followExists){
                return response()->json([
                    "success" => false,
                    "message" => "You are already following this user"
                ]);
            }

            //follow doesn't exist
            $follow = new Follow;
            if($user->id != $followedUser->id){
                $follow->user_id = $user->id;
                $follow->followed_element_id = $followedUser->id;
                $follow->type = Config::get("constants.USER_FOLLOW_TYPE");
                $follow->save();

                return response()->json([
                    "success" => true,
                    "message" => "You are now following ". $followedUser->alias
                ]);

            }else{

                return response()->json([
                    "success" => false,
                    "message" => "You can't follow yourself"
                ]);
            }
        }catch(Throwable $e){
            return response()->json([
                "success" => false,
                "message" => "Oops, there has been an error following this user"
            ]);
        }
    }

    public function unfollowUser(Request $request){
        try{

            $request->validate([
                "followed_user_alias" => "required|exists:users,alias"
            ]);

            $user = Auth::user();
            $followedUser = User::where("alias", $request->followed_user_alias)->first();

        
            $follow = Follow::where([
                "user_id" => $user->id,
                "followed_element_id" => $followedUser->id,
                "type" => Config::get("constants.USER_FOLLOW_TYPE")
            ])->first();

            $follow->delete();

            return response()->json([
                "success" => true,
                "message" => "You are no longer following ". $followedUser->alias

            ]);
          
        }catch(Throwable $e){

            return response()->json([
                "success" => false,
                "message" => "Oops, there has been an error unfollowing this user"

            ]);
        }
    }

}
