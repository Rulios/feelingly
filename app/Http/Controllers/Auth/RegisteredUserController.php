<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Models\User;
use App\Providers\RouteServiceProvider;
use Illuminate\Auth\Events\Registered;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\DB;

use App\Rules\ProjectDateFormat;
use App\Rules\EnablesURLEncoding;

use App\Traits\RegisterSecondChoresTrait;

use App\Http\Requests\TraditionalRegisterRequest;

use Stevebauman\Location\Facades\Location;

class RegisteredUserController extends Controller
{
    use RegisterSecondChoresTrait;


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
     * Handle an incoming traditional registration request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\RedirectResponse
     *
     * @throws \Illuminate\Validation\ValidationException
     */
    public function store(TraditionalRegisterRequest $request)
    {
        try{

            $validated = $request->validated();

            DB::beginTransaction();
    
            $user = new User;
            $user->email = $validated->email;
            $user->alias = $validated->alias;
            $user->name = $validated->name;
            $user->password = Hash::make($validated->password);
            $user->date_of_birth = $validated->date_of_birth;

            if ($position = Location::get()) {
                $user->country = $position->countryCode;
            }
    
            $user->save();
            $this->createInitialsDiaries($user->id);

            DB::commit();
            
            event(new Registered($user));
            Auth::login($user);
            

            return redirect(RouteServiceProvider::DASHBOARD);
            
        }catch(Exception $err){
            dd($err);
        }

        
    }
}
