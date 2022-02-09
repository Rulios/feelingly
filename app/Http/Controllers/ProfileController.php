<?php

namespace App\Http\Controllers;

use App\Models\User;
use App\Models\Follow;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;

use Illuminate\Http\Request;
use Illuminate\Support\Str;

use App\Traits\UploadTrait;

use App\Rules\EnablesURLEncoding;
use Illuminate\Validation\Rules\Password;
use App\Http\Controllers\Auth\AuthenticatedSessionController;
use App\Events\EmailChanged;


use Illuminate\Support\Facades\Config;

//FOLDER path
define("FOLDER", "/uploads/profile_images/");



class ProfileController extends Controller
{
    //
    use UploadTrait;

    public function updateProfileBasic(Request $request){

        try{

            $user = Auth::user();

            if($request->alias != $user->alias){
                $request->validate([
                    "alias" => ["required", "unique:users", "between:3,30", new EnablesURLEncoding]
                ]);
            }

            $request->validate([
                "name" => "required|between:1,30",
                "description" => "between:0,1000"
            ]);

            $user->alias = $request->alias;
            $user->name = $request->name;
            $user->description = $request->description;
            $user->date_of_birth = $request->date_of_birth;

            $user->save();


            return redirect()->back()->with(['success_status' => "¡Profile updated!"]);

        }catch(Throwable $e){
            echo $e;        
        }
    }

    public function changePassword(Request $request){
        try{
            $user = Auth::user();

            $request->validate([
                "actual_password" => "required",
                "password" => ["required", "confirmed",Password::min(8)],
                "password_confirmation" => "required|same:password",
            ]);

            if(Hash::check($request->actual_password, $user->password)){
                $user->password = Hash::make($request->password);

                $user->save();

                Auth::guard('web')->logout();
                $request->session()->invalidate();
                $request->session()->regenerateToken();
                return redirect('/')->with("success_status", "Password changed!");
            }else{
                return redirect()->back()->with(["actual_password" => "Password doesn't match credentials"]);
            }
            
        }catch(Throwable $e){
            return redirect()->back()->with(["failure_status" => "Oops, there has been an error updating your password"]);
            echo $e;
        }
    }

    public function changeEmail(Request $request){
        try{
            $user = Auth::user();   

            $request->validate([
                "password" => "required",
                "new_email" => "required|unique:users,email|email"
            ]);

            if(Hash::check($request->password, $user->password)){
                
                $user->email = $request->new_email;
                $user->email_verified_at = null;
                $user->save();
                event(new EmailChanged($user)); 


                Auth::guard('web')->logout();

                $request->session()->invalidate();

                $request->session()->regenerateToken();

                return redirect('/')->with("success_status", "Email changed! Please login and verify your email address");
            }else{
                return redirect()->back()->with(["password" => "Password doesn't match credentials"]);
            }

        }catch(Throwable $e){
            return redirect()->back()->with(["failure_status" => "Oops, there has been an error updating your password"]);
        }
    }
    
    public function imageUpdate(Request $request){
       
        try{

            $request->validate([
                "profile_image" => "required|image|mimes:jpeg,png,jpg,gif|max:2048"
            ]);

            $user = Auth::user();

            /**
             * If user has already a profile pic, previous image should be deleted
             */
            $this->deleteFileImage($user);
            $user->profile_image = null;

            // Get image file
            $image = $request->file('profile_image');
            // Make a image name based on user name and current timestamp
            $name = Str::slug($request->input('name')).'_'.time();

            // Make a file path where image will be stored [ FOLDER path + file name + file extension]
            $filePath = FOLDER . $name. '.' . $image->getClientOriginalExtension();
            // Upload image
            $this->uploadOne($image, FOLDER, 'public', $name);
            // Set user profile image path in database to filePath
            $user->profile_image = $filePath;

            $user->save();

            return redirect()->back()->with(['success_status' => "Looking sharp in your new profile picture!"]);

        }catch(Throwable $e){
            echo $e;
        }
    }

    public function imageDelete(Request $request){
        try{

            $user = Auth::user();

            /**
             * If user has already a profile pic, previous image should be deleted
             */
            $this->deleteFileImage($user);
            $user->profile_image = null;
            $user->save();

            return redirect()->back()->with(['success_status' => "Profile picture deleted!"]);

        }catch(Throwable $e){
            echo $e;
        }
    }

    private function deleteFileImage($user){
        if($user->profile_image){
            $paths = explode("/", $user->profile_image);
            $fileName = $paths[count($paths)-1]; //get the filename

            $this->deleteOne(FOLDER, "public", $fileName);
        }
    }







    


}
