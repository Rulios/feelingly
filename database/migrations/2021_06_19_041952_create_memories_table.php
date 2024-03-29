<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateMemoriesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('memories', function (Blueprint $table) {
            $table->uuid('id')->primary();
            $table->uuid("user_id");
            $table->uuid("diary_id");
            $table->foreign("user_id")->references("id")->on("users")->onDelete("cascade")->onUpdate("cascade");
            $table->foreign("diary_id")->references("id")->on("diaries")->onDelete("cascade")->onUpdate("cascade");
            
            $table->text("title")
                ->comment("Title of the memory");

            $table->text("content")
                ->comment("Content of the memory");
            $table->string("visibility", 10)
                ->comment("Memory's visibility: public | private");

            $table->timestamps();

            /* this is a field that is added after with a migration. 
                This operation needs to be done after since it's a foreign key constraint
                to this same table. If written here, the migration will pop an error because
                the table isn't created yet. 

            table->foreignUuid("reply_to")
                ->comment("If a memory is meant to reply another memory, 
                    this field will contain the ID of that replied meemory");

            $table->foreign("reply_to")->references("id")->on("memories")->onUpdate("cascade"); 
            */
            
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('memories');
    }
}
