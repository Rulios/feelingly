<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateDiariesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('diaries', function (Blueprint $table) {
            $table->uuid("id")->primary();
            $table->foreignUuid("user_id");
            $table->foreign("user_id")->references("id")->on("users")
                ->onUpdate("cascade")->onDelete("cascade");
            
            $table->string("name", 50);
            $table->string("description", 300)->nullable();
            $table->string("visibility", 10);
            
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('diaries');
    }
}
