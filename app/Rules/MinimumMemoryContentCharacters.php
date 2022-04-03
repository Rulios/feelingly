<?php

namespace App\Rules;

use Illuminate\Contracts\Validation\Rule;
use Illuminate\Support\Facades\Config;

class MinimumMemoryContentCharacters implements Rule
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
     * The validation passes, if the length of the string is greater than or equal to 
     * a value set by a constant .
     *
     * @param  string  $attribute
     * @param  mixed  $value
     * @return bool
     */
    public function passes($attribute, $value)
    {
        //
        $stripped = strip_tags($value);

        return strlen($stripped) >= Config::get("constants.MEMORY_CONTENT_MIN_LENGTH");
        

    }

    /**
     * Get the validation error message.
     *
     * @return string
     */
    public function message()
    {
        return 'We believe in deeper words. Please write at least '. Config::get("constants.MEMORY_CONTENT_MIN_LENGTH") .' characters.';
    }
}
