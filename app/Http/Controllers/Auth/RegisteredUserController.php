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
        

        $request->validate([
            "email" => "required|unique:users|email",
            "alias" => "required|unique:users|between:1,30",
            "name" => "required|between:1,30",
            "password" => "required|min:6",
            "repeat_password" => "required|same:password",
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
    }
}
