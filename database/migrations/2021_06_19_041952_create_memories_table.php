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
            $table->id();
            $table->integer("FK_memories_users");
            $table->integer("FK_memories_diaries");
            $table->foreign("FK_memories_users")->references("id")->on("users")->onDelete("cascade");
            $table->foreign("FK_memories_diaries")->references("id")->on("diaries");
            
            $table->text("title");
            $table->text("content");
            $table->string("visibility", 10);
            $table->timestamptz('created_at');
            $table->timestamptz('updated_at');
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
