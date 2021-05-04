<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Support\Facades\Auth;

use Illuminate\Http\Request;
use Illuminate\Support\Str;

use App\Traits\UploadTrait;

//FOLDER path
define("FOLDER", "/uploads/profile_images/");



class ProfileController extends Controller
{
    //
    use UploadTrait;

    private function deleteFileImage($user){
        if($user->profile_image){
            $paths = explode("/", $user->profile_image);
            $fileName = $paths[count($paths)-1]; //get the filename

            $this->deleteOne(FOLDER, "public", $fileName);
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

            return redirect()->back()->with(['status' => "Looking sharp in your new profile picture!"]);

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

            return redirect()->back()->with(['status' => "Profile picture deleted!"]);

        }catch(Throwable $e){
            echo $e;
        }
    }

}
