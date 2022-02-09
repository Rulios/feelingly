<?php

namespace App\Traits;

use Illuminate\Support\Str;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\Storage;

use App\Models\User;
use App\Models\Diary;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;

trait DeleteObjectPropertiesTrait{


    /**
     * Deletes a set of reserved properties from an object.
     */
    public function deleteReserved($object, $reservedProperties){

        foreach ($reservedProperties as $reservedProperty) {
            if (isset($object->$reservedProperty)) {
                unset($object->$reservedProperty);
            }
        }

        return $object;
    }

    /**
     * Deletes all properties from an object except 
     * the ones in the $allowedProperties array.
     */
    public function deleteAllExceptAllowed($object, $allowedProperties){
            
            foreach ($object as $key => $value) {
                if (!in_array($key, $allowedProperties)) {
                    unset($object->$key);
                }
            }
    
            return $object;
    }

}


?>