<?php

namespace Tests\Feature;

use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\DatabaseMigrations;
use Illuminate\Foundation\Testing\WithFaker;
use Illuminate\Database\Eloquent\Factories\Sequence;
use Tests\TestCase;
use App\Models\Diary;
use App\Models\User;
use App\Traits\TestDebugTrait;

class DiaryTest extends TestCase
{
    use TestDebugTrait;
    use RefreshDatabase;
    
    /**
     * Tests that when getting own diaries, should get all the diaries with all the 
     * visibility types (Public, private).
     * 
     * Runs a sequence that sets visibility to public /private. 
     *
     * @return void
     */
    public function test_get_own_diaries()
    {
        $user = User::factory()->create();
        $diary = Diary::factory()->count(4)->state(new Sequence(
            ["visibility" => "public"],
            ["visibility" => "private"]
        ))->create(["user_id" => $user->id]);

        $response = $this->actingAs($user)
                    ->get("//profile/". $user->alias."/diaries");

        $response->assertJsonFragment([
            "visibility" => "public",
            "visibility" => "private"
        ]);
    }

    /**
     * Tests that other users can fetch public diaries from another user.
     * Since private diaries are just for own use.
     */
    public function test_get_other_user_diaries(){
        $user1 = User::factory()->create();
        $user2 = User::factory()->create();

        $diary = Diary::factory()->count(4)->state(new Sequence(
            ["visibility" => "public"],
            ["visibility" => "private"]
        ))->create(["user_id" => $user2->id]);

        $response = $this->actingAs($user1)
                    ->get("//profile/". $user2->alias."/diaries");

        $response->assertJsonMissing([
            "visibility"=>"private"
        ]);
    }
}
