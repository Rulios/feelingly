<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\User;
use App\Models\Diary;
use App\Models\Memory;
use Illuminate\Support\Facades\Auth;
use Illuminate\Validation\Rule;

use App\APP_CONSTANTS;

class MemoryController extends Controller
{
    //

    public function addNewMemory(Request $request){
        try{

            $user = Auth::user();

            $request->validate([
                "title" => "required",
                "content" => "required",
                "visibility" => ["required", Rule::in(APP_CONSTANTS::VISIBLITY_TYPES)],
                "diaryID" => "required| exists:diaries,id"
            ]);

            $memory = new Memory();

            $memory->user_id = $user->id;
            $memory->diary_id = $request->diaryID;
            $memory->title = $request->title;
            $memory->content = $request->content;
            $memory->visibility = $request->visibility;

            $memory->save();

            return response()->json(["status", "Memory saved!"], 200);
            

        }catch(Throwable $e){
            dd($e);
        }
    }

}
