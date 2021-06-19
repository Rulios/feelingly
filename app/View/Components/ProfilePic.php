<?php

namespace App\View\Components;

use Illuminate\View\Component;
use App\Models\User;
use Illuminate\Support\Facades\Auth;

class ProfilePic extends Component
{
    /**
     * Create a new component instance.
     *
     * @return void
     */

    public $alias;
    public $width;
    public $height; 
    public $addClasses;
    public $profile_image;

    public function __construct($alias, $addClasses, $width, $height)
    {
        //
        $this->alias = $alias;
        $this->addClasses = $addClasses ?? "";
        $this->width = $width ?? "50";
        $this->height = $height ?? "50";

        //select default profile pic if user hasn't set one yet
        $user = User::where("alias", $alias)->first();
        if($user->profile_image){
            $this->profile_image = $user->profile_image;
        }else{
            $this->profile_image = "assets/avatar.svg";
        }

    }

    /**
     * Get the view / contents that represent the component.
     *
     * @return \Illuminate\Contracts\View\View|\Closure|string
     */
    public function render()
    {
        return view('components.profile-pic');
    }
}
