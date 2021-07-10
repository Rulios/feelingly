<?php

namespace Tests\Feature;

use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Tests\TestCase;

class RenderTest extends TestCase
{
    /**
     * Tests that all pages are being rendered
     *
     * @return void
     */
    public function test_login_page()
    {
        $response = $this->get('/');

        $response->assertStatus(200);
    }

    public function test_register_page(){

        $response = $this->get("/register");

        $response->assertStatus(200);
    }

    

}
