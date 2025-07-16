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
            'title' => $title = $this->faker->words(2, true),
            'author' => $this->faker->name(),
            'cover_image' => 'https://placehold.co/600x400/EEE/31343C.png',
            'price' => $this->faker->randomFloat(2, 5, 100),
            'description' => $this->faker->paragraph(),
            'isbn' => $this->faker->unique()->isbn13(),
        ];
    }
}
