<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\DB;

use Laravel\Socialite\Facades\Socialite;
use Illuminate\Support\Facades\Validator;

use App\Models\User;

use App\Providers\RouteServiceProvider;

use App\Rules\EnablesURLEncoding;

use App\Traits\RegisterSecondChoresTrait;

use Illuminate\Support\Facades\Config;

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


                return view("auth.request-alias")->with(["userJSON" => json_encode($googleUser->user)]);
            }

            // log them in
            auth()->login($existingUser, true);
            return redirect(RouteServiceProvider::DASHBOARD);

        } catch (\Exception $e) {
            dd($e);
            dd("OOPS, THERE HAS BEEN AN ERROR LOGGING IN WITH GOOGLE");
        }        
        
    }

    public function createGoogleUser(Request $request){

        dd($request->all());

        //TO DO: SIMPLIFY THE CODE IN THE VALIDATION OF A NEW USER

        $validator = Validator::make($request->all(), [
            'alias' => ["required", "unique:users", "between:3,30", new EnablesURLEncoding],
        ]);

        if ($validator->fails()) {
            return redirect()
                        ->route("google.callback", $_GET)
                        ->withErrors($validator)
                        ->withInput();
        }

        dd($request->all());




        try{

            // check if they're an existing user
            $existingUser = User::where('email', $user->email)->first();        
            
            if($existingUser){
                // log them in
                auth()->login($existingUser, true);
            } else {

            

                DB::beginTransaction();

                // create a new user
                $newUser                  = new User;
                $newUser->name            = $user->name;
                $newUser->email           = $user->email;
                $newUser->google_id       = $user->id;
                $newUser->alias           = $_GET["alias"];
                $newUser->profile_image   = $user->avatar;

                if ($position = Location::get()) {
                    $user->country = $position->countryCode;
                }

                $newUser->save();            
                $this->createInitialsDiaries($newUser->id);

                DB::commit();

                auth()->login($newUser, true);

            }
            
            return redirect(RouteServiceProvider::DASHBOARD);

        }catch(Exception $err){
            dd("OOPS, THERE HAS BEEN AN ERROR LOGGING IN WITH GOOGLE");
        }

    }

}


