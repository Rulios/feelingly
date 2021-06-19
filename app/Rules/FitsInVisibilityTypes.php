<?php

namespace App\Rules;

use Illuminate\Contracts\Validation\Rule;
use App\APP_CONSTANTS;

class FitsInVisibilityTypes implements Rule
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
        return in_array($value, APP_CONSTANTS::VISIBILITY_TYPES);
    }

    /**
     * Get the validation error message.
     *
     * @return string
     */
    public function message()
    {
        return 'Not valid visibility type';
    }
}
