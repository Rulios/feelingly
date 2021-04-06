<?php

namespace App\Rules;

use Illuminate\Contracts\Validation\Rule;
use DateTime;

class ProjectDateFormat implements Rule
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
        $testDate = DateTime::createFromFormat("Y-m-d", $value);
        
        return $testDate && $testDate->format("Y-m-d") === $value;
    }

    /**
     * Get the validation error message.
     *
     * @return string
     */
    public function message()
    {

        return 'Invalid date format';
    }
}
