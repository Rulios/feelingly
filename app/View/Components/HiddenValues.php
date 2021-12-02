<?php

namespace App\View\Components;

use Illuminate\View\Component;
use Illuminate\Support\Facades\Auth;


class HiddenValues extends Component
{
    /**
     * Create a new component instance.
     *
     * @return void
     */

    /**
     * - s_user_alias = refers to self user alias. Current auth user
     */
    public $sUserAlias;


    /**
     * - t_user_alias = refers to the target profile. This is useful when
     *      visiting another user's profile page. So frontend can build customs 
     *      requests to routes based on this alias. 
     */
    public $tUserAlias;


    /**
     * @param string $t_user_alias
     */

    public function __construct($tUserAlias = null)
    {
        $this->tUserAlias = $tUserAlias ?? "";
        $this->sUserAlias = Auth::user()->alias ?? null;
    }   

    /**
     * Get the view / contents that represent the component.
     * 
     * This component has (hidden inputs filled with one time values
     *  that will be stored in SessionStorage):
     *
     * @return \Illuminate\Contracts\View\View|\Closure|string
     */
    public function render()
    {
        return view('components.hidden-values');
    }
}
