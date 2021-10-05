<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\User;
use App\Models\Diary;
use App\Models\Memory;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;

use App\Rules\ValidVisibilityType;

class MemoryController extends Controller
{
    //


    public function addNewMemory(Request $request){

        $request->validate([
            "title" => "required",
            "content" => "required",
            "diary_id" => "required| exists:diaries,id",
            "visibility" => ["required", new ValidVisibilityType]
        ]);

        try{

            $user = Auth::user();

            $memory = new Memory();

            $memory->user_id = $user->id;
            $memory->diary_id = $request->diary_id;
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


    /**
     * Get the memories triggered when a user enters a profile
     */
    public function getProfileMemories(Request $request, $alias){
        try{
            
            $isRequestingOwn = $alias == Auth::user()->alias;

            $userID = User::where("alias", $alias)->first()->id;

            if($isRequestingOwn){
                /* $memories = Memory::with("userAlias")
                            ->where("user_id", $userID)->get(); */
                $memories = $this->queryMemoriesWithJoins()
                            ->where("memories.user_id", $userID)
                            ->get();


            }else{
                $memories = $this->queryMemoriesWithJoins()
                            ->where("memories.user_id", $userID)
                            ->where("memories.visibility", "public")
                            ->get();
            }

            return $memories;

        }catch(Exception $err){
            abort(404);
        }
    }


    /**
     * Returns a build up query defining the joins 
     * and the select, but without the WHERE clause.
     * 
     * This query joins the memories with:
     *  - Diary's name
     *  - User's name
     *  - User's alias
     */
    private function queryMemoriesWithJoins(){
        return DB::table("memories")    
                ->join("users", "users.id", "=", "memories.user_id")
                ->join("diaries", "diaries.user_id", "=", "memories.user_id")
                ->select("memories.*", "users.alias AS user_alias","users.name AS user_name", "diaries.name AS diary_name")
                ->orderBy("memories.created_at", "DESC");
                
    }




}
