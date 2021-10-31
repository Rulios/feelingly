<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class AddReplyToColumn extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('memories', function (Blueprint $table) {
            //

            $table->foreignUuid("reply_to")->nullable()
                ->comment("If a memory is meant to reply another memory, 
                    this field will contain the ID of that replied meemory");


            $table->foreign("reply_to")->references("id")->on("memories")->onUpdate("cascade");
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('memories', function (Blueprint $table) {
            //
        });
    }
}
