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
 * 
 * 
 * Side note for modifications: 
 * 
 *     - If you want to add a new visibility type, you need to add it onto the 
 *      array VISIBILITY_TYPES. And append it to the reference visibility association array.
 * 
 */

 return [
     "VISIBILITY_TYPES" => ["public", "private"],

     "REFERENCE" => [
         "VISIBILITY" => [
             "PUBLIC" => "public",
             "PRIVATE" => "private"
         ]
     ],

     //The following constants are used to refer to the different types of follow
     "USER_FOLLOW_TYPE" => "user" ,

     //sets the amount memories (posts) that should be returned when fetching the feed
     "FEED_FETCH_LIMIT" => 10,

     //SESSION VARIABLES NAMES 
     "SESSION_PREPOPULATED_USER_JSON" => "prepopulatedUserJSON",

     //VALIDATION RANGES 
     "MEMORY_CONTENT_MIN_LENGTH" => 1000
   
 ];