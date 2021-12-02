<?php

/**
 * Holds all the constants that the app may use.
 * 
 *  - To use it, just import it with 
 * 
 *          use Illuminate\Support\Facades\Config;
 * 
 *  - and when using it, use it like this:
 * 
 *          Config::get("constants.//whatever_you_want");
    *       example: Config::get("contstants.VISIBILITY_TYPES");)  
 * 
 */

 return [
     "VISIBILITY_TYPES" => ["public", "private"],

     //The following constants are used to refer to the different types of follow
     "USER_FOLLOW_TYPE" => "user" 
 ];