<?php

namespace App\View\Components;

use Illuminate\View\Component;

class HiddenGetParameters extends Component
{

    /**
     * IMPORTANT NOTE: 
     * 
     * THIS COMPONENT GETS ALL THE "GET"s PARAMETERS AND RENDERS THEM AS HIDDEN INPUTS.
     * 
     * WHY IS THIS USEFUL? 
     * 
     *  - Because recently, I stepped in a edge case where I need to pass GET parameters through 
     *    a FORM to a different page.
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

        return view('components.hidden-get-parameters');
    }
}
