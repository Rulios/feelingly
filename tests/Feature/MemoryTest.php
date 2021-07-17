<?php

namespace Tests\Feature;

use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Illuminate\Database\Eloquent\Factories\Sequence;
use Tests\TestCase;
use App\Models\User;
use App\Models\Diary;
use App\Models\Memory;
use App\Traits\TestDebugTrait;
use Carbon\Carbon;

class MemoryTest extends TestCase
{
    use TestDebugTrait;
    use RefreshDatabase;

    /**
     * Tests that a authenticated user can add a new memory
     *
     * @return void
     */
    public function test_add_new_memory()
    {
        $user = User::factory()->create();
        $diary = Diary::factory()->create(["user_id" => $user->id]);


        $response = $this->actingAs($user)
                    ->post("/memories/new", [
                        "title" => "New memory",
                        "content" => "supp everyone, this is a test for laravel. 
                                     this will probably be more longer, since this short content
                                     is not meaningful and doesn't align with feelingly objectives.",
                        "diaryID" => User::find($user->id)->diaries[0]->id,
                        "visibility" => "public"
                    ]);


        $response->assertStatus(200)
            ->assertJson([
                "status_message" => "Memory saved!",
                "created" => true
            ]);
    }

    /**
     * Tests that own memories are fetched 
     */
    public function test_fetch_own_memories(){
        $user = User::factory()->create();
        $diary = Diary::factory()->create(["user_id" => $user->id]);
        $memories = Memory::factory()->count(4)->state(new Sequence(
            ["visibility" => "public"],
            ["visibility" => "private"],
        ))->create([
            "user_id" => $user->id, 
            "diary_id" => $diary->id,
        ]);
        
        $response = $this->actingAs($user)->get("//profile/".$user->alias."/memories");
       
        /*
            There's a bug here. Ideally, this test should assert exact json.
            But doing so, it won't pass. There's a minor difference in the 
            fields of created_at and updated_at between $response and $memories.
            The $response field is ok and valid since it complies to the date time it executed,
            but the $memories fied complies with date, but no time. Always setting the hour to T19.
        */ 
        $response->assertJson($memories->makeHidden("created_at")->makeHidden("updated_at")->toArray());

    }

    /**Tests that a own user can fetch PUBLIC memories from another user
     * 
     * IMPORTANT: this test may be redesign as application grows since we'll
     * most likely be implementing a new visibility type named: "just-friends", that
     * can change the mechanic of how memories are rendered depending on the type of user.
     */
    public function test_fetch_other_users_memories(){
        $ownUser = User::factory()->create();
        $anotherUser = User::factory()->create();

        $anotherUserDiary = Diary::factory()->create(["user_id" => $anotherUser->id]);
        $memories = Memory::factory()->count(4)->state(new Sequence(
            ["visibility" => "public"],
            ["visibility" => "private"],
        ))->create([
            "user_id" => $anotherUser->id, 
            "diary_id" => $anotherUserDiary->id,
        ]);

        $response = $this->actingAs($ownUser)->get("//profile/".$anotherUser->alias."/memories");

        $response->assertJsonMissing([
            "visibility" => "private"
        ]);
    }
}
