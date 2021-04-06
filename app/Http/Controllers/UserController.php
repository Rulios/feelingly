<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use App\Models\User;
use App\Rules\ProjectDateFormat;
use Illuminate\Support\Facades\Hash;
use Stevebauman\Location\Facades\Location;

class UserController extends Controller
{
    //


    public function create(Request $request){   

        $user = new User;

        $validatedData = $request->validate([
            "email" => "required|unique:users|email",
            "alias" => "required|unique:users|between:1,30",
            "name" => "required|between:1,30",
            "password" => "required|min:6",
            "repeat_password" => "required|same:password",
            "date_of_birth" => ["required", "before:today", "date", new ProjectDateFormat]
        ]);


        $user->email = $request->email;
        $user->alias = $request->alias;
        $user->name = $request->name;
        $user->password = Hash::make($request->password);
        $user->date_of_birth = $request->date_of_birth;
        
        if ($position = Location::get()) {
            $user->country = $request->countryCode;
        }

        
        $user->save();

        session()->flash('signupSuccess', true);
        return view('signup');
    }
}
