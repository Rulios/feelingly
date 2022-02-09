<?php

namespace App\View\Components;

use Illuminate\View\Component;



/**
 * This components gets a generic object/array and 
 * renders it as a list of key-value pairs as a hidden input. 
 * 
 *  - The key is rendered as the name property of the input
 *  - The value is rendered as the value property of the input
 * 
 */


class HiddenCollectionProps extends Component
{
    /**
     * Generic object
     */
    public $collection;

    
    /**
     * Create a new component instance.
     *
     * @return void
     */
    public function __construct($collection)
    {
        //

        $this->collection = $collection;

    }

    /**
     * Get the view / contents that represent the component.
     *
     * @return \Illuminate\Contracts\View\View|\Closure|string
     */
    public function render()
    {
        return view('components.hidden-collection-props');
    }
}
