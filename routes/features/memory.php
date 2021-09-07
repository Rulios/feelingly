<?php

    
use Illuminate\Support\Facades\Route;
use App\Models\User;
use Illuminate\Support\Facades\Auth;

use App\Http\Controllers\MemoryController;
use App\Http\Controllers\AppreciationController;
/**
 * Diary Routes
 * 
 * Includes all the available routes for doing the operations
 * made by DiaryController
 */


/**
 * Submits a new memory
 */

Route::post("/memories/new", [MemoryController::class, "addNewMemory"])
    ->middleware("auth");


Route::get("/profile/{alias}/memories", [MemoryController::class, "getProfileMemories"]);

Route::post("/memories/toogle-appreciation", [AppreciationController::class, "toogleAppreciationToMemory"]);;

?>