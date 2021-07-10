<?php

namespace App\Traits;

trait TestDebugTrait
{

    /**
     * Creates first mandatory diary on the DB.
     * This diary will be the starter to store all the memories
     */

    public function debug($response){

        $response->dumpHeaders();

        $response->dumpSession();

        $response->dump();

    }

}

?>