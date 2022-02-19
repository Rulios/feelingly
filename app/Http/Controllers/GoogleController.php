<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Config;
use Illuminate\Support\Facades\DB;
use Laravel\Socialite\Facades\Socialite;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\Session;
use Illuminate\Support\Carbon;

use App\Models\User;

use App\Providers\RouteServiceProvider;


use App\Traits\RegisterSecondChoresTrait;

use App\Http\Requests\GoogleRegisterRequest;

use Stevebauman\Location\Facades\Location;


class GoogleController extends Controller{

    use RegisterSecondChoresTrait;
    //


    public function loginWithGoogle()
    {
        return Socialite::driver('google')->redirect();
    }

    /**
     *
     * 
     * Note: there's an parameter called 'code' that google returns in the callback uri
     *      This parameter is used to get the access token from google. So it's CONSUMED ONCE.
     *      The access token is used to get the user's profile from google.
     *      So there can't be a 'Socialite::driver('google')->user()' call twice during 
     *      one flow. 
     * 
     * 
     * - TO DO: SHOULD FIGURE A WAY TO GET THE ACCESS TOKEN BY LARAVEL.
     */
    public function callbackFromGoogle()
    {
        try {

            $googleUser = Socialite::driver('google')->user();

            // check if they're an existing user
            $existingUser = User::where('email', $googleUser->email)->first();   


            if(!$existingUser){

                //put prepopulated user data into session
                //note: this is because it's redirecting and not rendering
                Session::put(Config::get("constants.SESSION_PREPOPULATED_USER_JSON"), json_encode($googleUser->user));

                return redirect()
                            ->route('request-alias');
            }

            // log them in
            auth()->login($existingUser, true);
            return redirect(RouteServiceProvider::DASHBOARD);

        } catch (\Exception $e) {
            dd($e);
            dd("OOPS, THERE HAS BEEN AN ERROR LOGGINGs IN WITH GOOGLE");
        }        
        
    }

    /**
     * TO DO: FIX BUG OF NOT GETTING INTO THIS ROUTE
     */

    public function createGoogleUser(GoogleRegisterRequest $request){

        $validated = $request->validated();


        try{

            // check if they're an existing user
            $existingUser = User::where('email', $validated["email"])->first();        
            
            if($existingUser){
                // log them in
                auth()->login($existingUser, true);
            } else {

            

                DB::beginTransaction();

                // create a new user
                $newUser                  = new User;
                $newUser->name            = $validated["name"];
                $newUser->email           = $validated["email"];
                $newUser->google_id       = $validated["id"];
                $newUser->alias           = $validated["alias"];
                $newUser->profile_image   = $validated["picture"];
                $newUser->email_verified_at = Carbon::now();

                if ($position = Location::get()) {
                    $newUser->country = $position->countryCode;
                }

                $newUser->save();            
                $this->createInitialsDiaries($newUser->id);

                DB::commit();

                auth()->login($newUser, true);

                //delete the session data to prepopulate the form
                Session::forget(Config::get("constants.SESSION_PREPOPULATED_USER_JSON"));

            }
            
            return redirect(RouteServiceProvider::DASHBOARD);

        }catch(Exception $err){
            dd("OOPS, THERE HAS BEEN AN ERROR LOGGING IN WITH GOOGLE");
        }

    }

}


