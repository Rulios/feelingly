<?php

namespace App\Rules;

use Illuminate\Contracts\Validation\Rule;

class ValidImageURL implements Rule
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
     * The image url should pass if the http response headers have: 
     *      
     *      **rule on further review**
     * 
     *    //we shouldn't rely to much on content-type
     *  - content-type: image/(png, jpeg, jpg, gif, svg) 
     *  - content-length: > 0
     *  - x-content-type-options: nosniff
     *
     * @param  string  $attribute
     * @param  mixed  $value
     * @return bool
     */
    public function passes($attribute, $value)
    {
        //

        $urlHeaders = get_headers($value, 1);

        return $this->matchesContentType($urlHeaders) && 
                $this->notEmptyContentLength($urlHeaders) &&
                $this->matchesXContentTypeOptions($urlHeaders);

    }

    /**
     * Get the validation error message.
     *
     * @return string
     */
    public function message()
    {
        return 'Illegal Image URL';
    }

    private function matchesContentType($urlHeaders){
        return isset($urlHeaders['Content-Type']) && preg_match('/image\/(png|jpeg|jpg|gif|svg)/', $urlHeaders['Content-Type']);
    }

    private function notEmptyContentLength($urlHeaders){
        return isset($urlHeaders['Content-Length']) && $urlHeaders['Content-Length'] > 0;
    }

    private function matchesXContentTypeOptions($urlHeaders){
        return isset($urlHeaders['X-Content-Type-Options']) && $urlHeaders['X-Content-Type-Options'] === 'nosniff';
    }
}
