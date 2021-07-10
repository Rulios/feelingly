<?php

namespace Tests\Feature;

use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Tests\TestCase;
use App\Models\User;
use App\Models\Diary;
use App\Models\Memory;

class MemoryTest extends TestCase
{
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
     * Tests that memories are fetched 
     */
    public function test_fetch_own_memories_newer_to_older(){
        $user = User::factory()->create();
        $diary = Diary::factory()->create(["user_id" => $user->id]);
        $memories = Memory::factory()->count(3)->state(new Sequence(
            ["visibility" => "public"],
            ["visibility" => "private"]
        ))->create();

        
    }
}
