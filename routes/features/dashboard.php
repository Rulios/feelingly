<?php

use Illuminate\Support\Facades\Route;
use App\Models\User;
use Illuminate\Support\Facades\Auth;

use App\Http\Controllers\DashboardController;



Route::get('/dashboard', function (Request $request) {
    return view('dashboard');
})->middleware(['auth'])->name('dashboard');


Route::get("/dashboard/feed-followers",[DashboardController::class,"fetchFollowersFeed"])
    ->middleware("auth")
    ->name("dashboard.feed-followers");

Route::get("/dashboard/feed-global",[DashboardController::class,"fetchGlobalFeed"])
->middleware("auth")
->name("dashboard.feed-global");


?>