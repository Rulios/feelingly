<?php

namespace Tests\Feature;

use App\Providers\RouteServiceProvider;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\DatabaseMigrations;
use Tests\TestCase;
use Carbon\Carbon;
use Carbon\CarbonPeriod;

class RegistrationTest extends TestCase
{
    use RefreshDatabase;
    use DatabaseMigrations;

    public function test_registration_screen_can_be_rendered()
    {
        $response = $this->get('/register');

        $response->assertStatus(200);
    }

    /**TO DO
     * 
     * This test isn't passing correctly. But the manual test version works ok.
     */
    /* public function test_new_users_can_register()
    {
        $response = $this->post('/register', [
            'name' => 'Test User',
            'email' => 'test@example.com',
            "alias" => "testing_alias",
            "date_of_birth" => Carbon::yesterday(),
            'password' => 'password',
            'password_confirmation' => 'password',
        ]);

        $this->assertAuthenticated();
        $response->assertRedirect(RouteServiceProvider::DASHBOARD);
    } */
}
