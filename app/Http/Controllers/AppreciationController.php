<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Appreciation;
use App\Models\User;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;

class AppreciationController extends Controller
{

    /**
     * "Appreciation" as a concept in this app means the same as the "like" concept 
     * for another social medias. 
     * 
     * This method toggles the appreciation for a memory. It first checks if exists, and
     * deletes or creates a new record in the appreciations table depending on this state.
     */
    public function toogleAppreciationToMemory(Request $request){

        $request->validate([
            "memory_id" => "required | exists:memories,id"
        ]);

        $user = Auth::user();
        
        try{

            $appreciation = Appreciation::where("memory_id", $request->memory_id)
                                    ->where("user_id", $user->id);

            if($appreciation->exists()){
                $appreciation->delete();

                return response()->json([
                    "status_message" => "Quitted appreciation to memory!",
                    "appreciation" => false
                ], 200);

            }else{

                $appreciation = new Appreciation();

                $appreciation->user_id = $user->id;
                $appreciation->memory_id = $request->memory_id;

                $appreciation->save();

                return response()->json([
                    "status_message" => "Set appreciation to memory!",
                    "appreciation" => true
                ], 200);
            }

        }catch(Throwable $e){
            abort(404);
        }
    }

    public function getMemoryAppreciation(Request $request){
        $request->validate([
            "memory_id" => "required | exists:memories,id"
        ]);

        $user = Auth::user();
        
        try{
            $existsAppreciation = Appreciation::where("memory_id", $request->memory_id)
                                ->where("user_id", $user->id)->exists();
    
            return response()->json([
                "appreciation" => $existsAppreciation
            ]);
            
        }catch(Throwable $e){
            abort(404);
        }

    }

}
