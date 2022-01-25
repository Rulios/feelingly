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
            $memory->reply_to = null;

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
     * Reply Memory == Comment
     */
    public function addReplyMemory(Request $request){
        $request->validate([
            "title" => "required",
            "content" => "required",
            "reply_to_memory_id" => "required | exists:memories,id",
            "diary_id" => "required| exists:diaries,id",
        ]);

        try{
            
            $user = Auth::user();

            $memory = new Memory();

            $memory->user_id = $user->id;
            $memory->diary_id = $request->diary_id;
            $memory->title = $request->title;
            $memory->content = $request->content;

            //Set this new reply memory's visibility to be the same visibility
            //as the replied memory.
            $memory->visibility = Memory::where("id", $request->reply_to_memory_id)
                                    ->first()->visibility;   
                                    
            $memory->reply_to = $request->reply_to_memory_id;

            
            $memory->save();

            return response()->json([
                "status_message" => "Reply saved!",
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
                $memories = $this->queryMemoriesWithJoins()
                            ->where("memories.user_id", $userID)
                            ->get();


            }else{
                $memories = $this->queryMemoriesWithJoins()
                            ->where("memories.user_id", $userID)
                            ->where("memories.visibility", Config::get("constants.REFERENCE.VISIBILITY.PUBLIC"))
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
     *  - User's profile picture
     */
    private function queryMemoriesWithJoins(){
        return DB::table("memories")    
                ->join("users", "users.id", "=", "memories.user_id")
                ->join("diaries", "diaries.id", "=", "memories.diary_id")
                ->select("memories.*", "users.alias AS user_alias","users.name AS user_name", 
                "users.profile_image as user_profile_image", "diaries.name AS diary_name")
                ->orderBy("memories.created_at", "DESC");
                
    }




}
