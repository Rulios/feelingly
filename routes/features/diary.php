<?php

    
use Illuminate\Support\Facades\Route;
use App\Models\User;
use Illuminate\Support\Facades\Auth;

use App\Http\Controllers\DiaryController;

/**
 * Diary Routes
 * 
 * Includes all the available routes for doing the operations
 * made by DiaryController
 */


/**
 * Fetchs all diaries 
 */

 Route::get("/profile/{alias}/diaries", [DiaryController::class, "getDiaries"]);
    //->middleware("auth");



?>