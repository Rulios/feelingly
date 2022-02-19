<?php

namespace App\View\Components;

use Illuminate\View\Component;
use Illuminate\Support\Facades\Config;
use Illuminate\Support\Facades\Session;

class PrepopulatedUserHiddenField extends Component
{


    /**
     * THIS COMPONENT PREPOPULATES A FORM WITH HIDDEN FIELDS OF THE USER WHO HAS 
     * PASSED THE OAUTH CALLBACK. 
     */


    /**
     * Create a new component instance.
     *
     * @return void
     */
    public function __construct()
    {
        //
    }

    /**
     * Get the view / contents that represent the component.
     *
     * @return \Illuminate\Contracts\View\View|\Closure|string
     */
    public function render()
    {
        $prepopulatedUserJSON = session(Config::get("constants.SESSION_PREPOPULATED_USER_JSON"));


        
        return view('components.prepopulated-user-hidden-field', [
            "prepopulatedUser" =>json_decode($prepopulatedUserJSON),
        ]);
    }
}
