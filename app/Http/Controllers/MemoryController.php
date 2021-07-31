<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\User;
use App\Models\Diary;
use App\Models\Memory;
use Illuminate\Support\Facades\Auth;

use App\Rules\ValidVisibilityType;

class MemoryController extends Controller
{
    //


    public function addNewMemory(Request $request){


        $request->validate([
            "title" => "required",
            "content" => "required",
            "diaryID" => "required| exists:diaries,id",
            "visibility" => ["required", new ValidVisibilityType]
        ]);

        try{

            $user = Auth::user();

            $memory = new Memory();

            $memory->user_id = $user->id;
            $memory->diary_id = $request->diaryID;
            $memory->title = $request->title;
            $memory->content = $request->content;
            $memory->visibility = $request->visibility;

            $memory->save();

            return response()->json([
                "status_message" => "Memory saved!",
                "created" => true
            ], 200);
            

        }catch(Throwable $e){

            return back()->withErrors($e->getMessage())->withInput();
            dd($e);
        }
    }

    public function getMemories(Request $request, $alias){
        try{
            
            $isRequestingOwn = $alias == Auth::user()->alias;

            $userID = User::where("alias", $alias)->first()->id;

            if($isRequestingOwn){
                $memories = Memory::where("user_id", $userID)->get();
            }else{
                $memories = Memory::where("user_id", $userID)->where("visibility", "public")->get();
            }
            
            return $memories;

        }catch(Exception $err){
            abort(404);
        }
    }

}
