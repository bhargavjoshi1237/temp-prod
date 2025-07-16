<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Book;
use App\Http\Requests\BookRequest;
use App\Http\Repositories\BookRepository;
use App\Http\Controllers\BaseController;
use Inertia\Inertia;

class BookController extends BaseController
{
    public function __construct(
        public BookRepository $bookRepository,
    ) {}

    public function index()
    {
        $books = $this->bookRepository->getAll();
        $user = auth()->user();
        $role = $user ? $user->role : null;
        return Inertia::render('Home', [
            'books' => $books,
            'userRole' => $role,
            'user' => $user,
        ]);
    }

    public function show(Book $book)
    {

        $user = auth()->user();
        $role = $user ? $user->role : null;
        $book->load(['reviews.user']);
        return Inertia::render('Book', [
            'book' => $book,
            'reviews' => $book->reviews,
            'userRole' => $role,
            'user' => $user,
        ]);
    }

    public function store(BookRequest $request)
    {
        try {
            $this->bookRepository->create($request->validated());
            return $this->sendRedirectResponse(route('dashboard'), 'Book created successfully.');
        } catch (\Exception $e) {
            return $this->sendRedirectBackError('Failed to create book.');
        }
    }

    public function update(BookRequest $request, $id)
    {
        try {
            $this->bookRepository->update($id, $request->validated());
            return $this->sendRedirectResponse(route('dashboard'), 'Book updated successfully.');
        } catch (\Exception $e) {
            return $this->sendRedirectBackError('Failed to update book.');
        }
    }

    public function destroy($id)
    {
        try {
            $this->bookRepository->destroy($id);
            return $this->sendRedirectResponse(route('dashboard'), 'Book deleted successfully.');
        } catch (\Exception $e) {
            return $this->sendRedirectBackError('Failed to delete book.');
        }
    }
}
