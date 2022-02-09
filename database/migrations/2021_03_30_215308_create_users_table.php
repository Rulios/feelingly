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
            $table->uuid("id")->primary();

            $table->string("email")->unique();
            $table->string("name", 40);
            $table->string("alias", 30)->unique();

            //The password field is set to nullable because aside from
            //traditional registration process. Users will be able to login using OAuth 2.0
            $table->text("password")->nullable();
            
            $table->date("date_of_birth")->nullable();
            $table->string("description", 1000)->nullable();
            $table->string("profile_image")->nullable();
            $table->string("country", 10)->nullable();
            $table->timestamp("email_verified_at")->nullable();
            $table->string("remember_token", 100)->nullable();
            
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
        Schema::dropIfExists('users');
    }
}
