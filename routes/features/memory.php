<?php

    
use Illuminate\Support\Facades\Route;
use App\Models\User;
use Illuminate\Support\Facades\Auth;

use App\Http\Controllers\DiaryController;
use App\Http\Controllers\MemoryController;
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



?>