<?php

    
use Illuminate\Support\Facades\Route;
use App\Models\User;
use Illuminate\Support\Facades\Auth;

use App\Http\Controllers\MemoryController;
use App\Http\Controllers\AppreciationController;



/**
 * Submits a new memory
 */

Route::post("/memories/new", [MemoryController::class, "addNewMemory"])
    ->middleware("auth");


/**
 * Submits a reply for a memory
 */
Route::post("/memories/reply", [MemoryController::class, "addReplyMemory"])
    ->middleware("auth");   


Route::get("/profile/{alias}/memories", [MemoryController::class, "getProfileMemories"]);

Route::put("/memories/toggle-appreciation", [AppreciationController::class, "toogleAppreciationToMemory"]);;

Route::get("/memories/fetch-appreciation", [AppreciationController::class, "getMemoryAppreciation"]);

?>