<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use App\Providers\RouteServiceProvider;

use App\Models\User;
use App\Rules\ProjectDateFormat;
use App\Rules\EnablesURLEncoding;

use Illuminate\Support\Facades\Hash;
use Stevebauman\Location\Facades\Location;

use Illuminate\Auth\Events\Registered;
use Illuminate\Support\Facades\Auth;

class UserController extends Controller
{
    //


    public function store(Request $request){   

        $user = new User;

        $request->validate([
            "email" => "required|unique:users|email",
            "alias" => ["required", "unique:users", "between:3,30", new EnablesURLEncoding] ,
            "name" => "required|between:1,30",
            "password" => ["required", "confirmed", Password::min(8)],
            "password_confirmation" => "required|same:password",
            "date_of_birth" => ["required", "before:today", "date", new ProjectDateFormat]
        ]);


        $user->email = $request->email;
        $user->alias = $request->alias;
        $user->name = $request->name;
        $user->password = Hash::make($request->password);
        $user->date_of_birth = $request->date_of_birth;
        
        if ($position = Location::get()) {
            $user->country = $position->countryCode;
        }


        Auth::login($user);


        //$user->sendEmailVerificationNotification();

        event(new Registered($user));

        //return redirect(RouteServiceProvider::DASHBOARD);
        return redirect("/dashboard");
    }
}
