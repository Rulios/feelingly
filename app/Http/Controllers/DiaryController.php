<?php

namespace App\Http\Controllers;

use App\Models\Diary;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Validation\Rule;

class DiaryController extends Controller
{
    //

    /**
     * Returns a json of visible diaries depending on the role the user has.
     *@constructor
        @param $request
        @param $alias
     * Request params: 
     *  - User alias
     */

    public function getDiaries(Request $request, $alias){

        
        
        try{
            
            $isRequestingOwn = $alias == Auth::user()->alias;

            $userID = User::where("alias", $alias)->id;

            if($isRequestingOwn){
                $diaries = Diary::where("user_id", $userID);
            }else{
                $diaries = Diary::where("user_id", $userID)->where("visibility", "public");
            }

            return $diaries;

        }catch(Exception $err){
            abort(404);
        }
    }

    /**
     * Creates a new diary if the user has the permission to do it
     * Diary Requirements:
     *  - name
     *  - auth user id
     *  - visibility
     */

    public function createDiary(Request $request){

        try{
            $userID = Auth::user()->id;

            $request->validate([
                "name" => "required|between:0,50",
                "visibility" => ["required", Rule::in(["private", "public"])]
            ]);

            $diary = new Diary;
            
            $diary->name = $request->name;
            $diary->user_id = $userID;
            $diary->visibility = $request->visibility;

            $diary-save();

            return response(200);

        }catch(Exception $err){
            dd($err);
        }
        
    }

    /**
     * Takes the id of the diary and the new name to rename it
     */

    public function renameDiary(Request $request){
        try{

        }catch(Exception $err){
            dd($err);
        }
    }

}
