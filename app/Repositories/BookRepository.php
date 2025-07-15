<?php
namespace App\Repositories;

use App\Models\Book;

class BookRepository extends BaseRepository
{
    public function getAllBooks()
    {
        return Book::all();
    }

    public function find($id)
    {
        return Book::find($id);
    }

    public function create(array $data)
    {
        return Book::create($data);
    }

    public function update($id, array $data)
    {
        return parent::update($id, $data);
    }

    // Add more repository methods as needed
}
