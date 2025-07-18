<?php

namespace Database\Seeders;
use App\Models\Book;
use App\Models\User;
// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // User::factory(10)->create();

        User::factory()->create([
            'name' => 'Admin User',
            'email' => 'admin@example.com',
            'password' => bcrypt('12345678'), // Change as needed
            'role' => 'admin', // Make sure your User model has a 'role' column
        ]);

        User::factory()->create([
            'name' => 'Bhargav Joshi',
            'email' => 'bhargavjoshi1237@gmail.com',
            'password' => bcrypt('12345678'), // Change as needed
            'role' => 'user', // Make sure your User model has a 'role' column
        ]);

         Book::factory(25)->create();
    }
}
