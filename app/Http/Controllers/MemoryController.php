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

            $memory->FK_memories_users = $user->id;
            $memory->FK_memories_diaries = $request->diaryID;
            $memory->title = $request->title;
            $memory->content = $request->content;
            $memory->visibility = $request->visibility;

            $memory->save();

            return response()->json(["status_message", "Memory saved!"], 200);
            

        }catch(Throwable $e){

            return back()->withErrors($e->getMessage())->withInput();
            dd($e);
        }
    }

}
