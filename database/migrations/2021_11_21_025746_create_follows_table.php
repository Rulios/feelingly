<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateFollowsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('follows', function (Blueprint $table) {

            //migration of a followers table

            $table->id();
            $table->uuid('user_id')
                    ->comment("ID of the user that emmits the follow action");
            $table->uuid("followed_element_id")
                    ->comment("ID of the element that is being followed");
            $table->string("type", 50)
                    ->comment("Type of the element that is being followed");

            $table->timestamps();

            $table->foreign("user_id")->references("id")->on("users")->onDelete("cascade")->onUpdate("cascade");


        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('follows');
    }
}
