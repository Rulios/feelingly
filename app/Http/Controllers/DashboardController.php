<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;

use App\Models\User;
use App\Models\Memory;
use App\Models\Diary;
use App\Models\Follow;

use Illuminate\Support\Facades\Config;

class DashboardController extends Controller
{

    /**
     * This method returns the memories of those followed by an user
     * in an chronological order.
     */
    public function fetchFollowersFeed(Request $request){

        $request->validate([
            "amountFetched" => "integer|min:0",
        ]);

        $user = Auth::user();

        $memories = DB::table("memories")
            ->join("follows", "memories.user_id", "=", "follows.followed_element_id")
            ->join("users", "users.id", "=", "memories.user_id")
            ->where("follows.user_id", "=", $user->id)
            ->select("memories.*", "users.name", "users.alias")
            ->orderBy("memories.created_at", "desc")
            ->skip($request->amountFetched ?? 0)
            ->take(Config::get("constants.FEED_FETCH_LIMIT"))
            ->get();

        return response()->json($memories);
    }

    /**
     * This method returns the memories of all users using the app
     * in an chronological order.
     */
    public function fetchGlobalFeed(Request $request){

        $request->validate([
            "amountFetched" => "integer|min:0",
        ]);


        $memories = DB::table("memories")
            ->join("users", "users.id", "=", "memories.user_id")
            ->select("memories.*", "users.name", "users.alias")
            ->orderBy("memories.created_at", "desc")
            ->skip($request->amountFetched ?? 0)
            ->take(Config::get("constants.FEED_FETCH_LIMIT"))
            ->get();

        return response()->json($memories);
    }
    
}
