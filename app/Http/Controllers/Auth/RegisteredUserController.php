<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Models\User;
use App\Providers\RouteServiceProvider;
use Illuminate\Auth\Events\Registered;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;

use App\Rules\ProjectDateFormat;
use App\Rules\EnablesURLEncoding;

use Stevebauman\Location\Facades\Location;

class RegisteredUserController extends Controller
{
    /**
     * Display the registration view.
     *
     * @return \Illuminate\View\View
     */
    public function create()
    {
        return view('auth.register');
    }

    /**
     * Handle an incoming registration request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\RedirectResponse
     *
     * @throws \Illuminate\Validation\ValidationException
     */
    public function store(Request $request)
    {
        try{

        
            $request->validate([
                "email" => "required|unique:users|email",
                "alias" => ["required", "unique:users", "between:3,30", new EnablesURLEncoding],
                "name" => "required|between:1,30",
                "password" => "required|confirmed|min:8",
                "password_confirmation" => "required|same:password",
                "date_of_birth" => ["required", "before:today", "date", new ProjectDateFormat]
            ]);
    
            $user = new User;
            $user->email = $request->email;
            $user->alias = $request->alias;
            $user->name = $request->name;
            $user->password = Hash::make($request->password);
            $user->date_of_birth = $request->date_of_birth;

            
            
            if ($position = Location::get()) {
                $user->country = $position->countryCode;
            }
    
            $user->save();
            event(new Registered($user));
            Auth::login($user);
            return redirect(RouteServiceProvider::DASHBOARD);
            
        }catch(Exception $err){
            dd($err);
        }

        
    }
}
