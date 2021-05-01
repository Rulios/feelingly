<?php

namespace App\Rules;

use Illuminate\Contracts\Validation\Rule;

class EnablesURLEncoding implements Rule
{
    /**
     * Create a new rule instance.
     *
     * @return void
     */
    public function __construct()
    {
        //
    }

    /**
     * Determine if the validation rule passes.
     *
     * @param  string  $attribute
     * @param  mixed  $value
     * @return bool
     */
    public function passes($attribute, $value)
    {
        //


        if(preg_match("/^[a-z0-9_][a-z0-9_.]*/gm", $value) == 1){
            return true;
        }else{
            return false;
        }
    }

    /**
     * Get the validation error message.
     *
     * @return string
     */
    public function message()
    {
        return "Provide your alias with the accepted characters a-z, 0-9, dot(.), underline(_).";
    }
}
