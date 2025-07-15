<?php
namespace Database\Factories;

use App\Models\Book;
use Illuminate\Database\Eloquent\Factories\Factory;

class BookFactory extends Factory
{
    protected $model = Book::class;

    public function definition()
    {
        return [
            'title' => $this->faker->sentence(3),
            'author' => $this->faker->name(),
            'cover_image' => 'https://placehold.co/400x256?text=Book+Cover',
            'price' => $this->faker->randomFloat(2, 5, 100),
            'description' => $this->faker->paragraph(),
        ];
    }
}
