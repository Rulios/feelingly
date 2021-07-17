<?php

namespace Database\Factories;

use App\Models\Memory;
use Carbon\Carbon;
use Illuminate\Database\Eloquent\Factories\Factory;

class MemoryFactory extends Factory
{
    /**
     * The name of the factory's corresponding model.
     *
     * @var string
     */
    protected $model = Memory::class;

    /**
     * Define the model's default state.
     *
     * @return array
     */
    public function definition()
    {
        return [
            "title" => $this->faker->text(50),
            "content" => $this->faker->text(500),
        ];
    }
}
