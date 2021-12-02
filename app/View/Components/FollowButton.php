<?php

namespace App\View\Components;

use Illuminate\View\Component;
use App\Models\User;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Log;
use App\Models\Follow;


use Illuminate\Support\Facades\Config;


class FollowButton extends Component
{


    public $tUserAlias;
    public $isOwnProfile;
    public $isFollowing;
    /**
     * Create a new component instance.
     *
     * @return void
     */
    public function __construct($tUserAlias = null)
    {
        $this->tUserAlias = $tUserAlias ?? "";
        $this->isOwnProfile = Auth::user() ? Auth::user()->alias == $this->tUserAlias : false;
        $this->isFollowing = Auth::user() ? Follow::where("user_id", Auth::user()->id)
                ->where("followed_element_id", User::where("alias", $this->tUserAlias)->first()->id)
                ->where("type", Config::get("constants.USER_FOLLOW_TYPE"))
            ->exists() : false;
    }

    /**
     * Get the view / contents that represent the component.
     *
     * @return \Illuminate\Contracts\View\View|\Closure|string
     */
    public function render()
    {
        return view('components.follow-button', [
            "isOwnProfile" => $this->isOwnProfile,
            "isFollowing" => $this->isFollowing,
            "tUserAlias" => $this->tUserAlias
        ]);
    }
}
