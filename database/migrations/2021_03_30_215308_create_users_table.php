<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateUsersTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('users', function (Blueprint $table) {
            $table->id();

            $table->string("email")->unique();
            $table->string("name", 30);
            $table->string("alias", 30)->unique();
            $table->text("password");
            $table->date("date_of_birth");
            $table->string("description", 1000)->nullable();
            $table->timestamptz("email_verified_at")->nullable();
            $table->string("country", 10)->nullable();
            $table->string("remember_token", 100)->nullable();
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
        Schema::dropIfExists('users');
    }
}