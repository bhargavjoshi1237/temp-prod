<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use App\Http\Controllers\BaseController;
use Inertia\Inertia;

class BookController extends BaseController
{
    protected $bookRepository;

    public function __construct(\App\Http\Repositories\BookRepository $bookRepository)
    {
        $this->bookRepository = $bookRepository;
    }

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

    public function show($id)
    {
        $book = $this->bookRepository->getById($id);
        // You will add logic to fetch details from abc.nl here
        if (!$book) {
            return $this->sendRedirectBackError('Book not found.');
        }
        $user = auth()->user();
        $role = $user ? $user->role : null;
        return Inertia::render('Book', [
            'book' => $book,
            'userRole' => $role,
            'user' => $user,
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'author' => 'required|string|max:255',
            'price' => 'required|numeric',
            'cover_image' => 'nullable|string',
            'description' => 'nullable|string',
            'isbn' => 'nullable|string',
            // add other required fields here if your DB/migration requires them
        ]);
        $this->bookRepository->create($validated);
        return redirect()->route('dashboard');
    }

    public function update(Request $request, $id)
    {
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'author' => 'required|string|max:255',
            'price' => 'required|numeric',
            'cover_image' => 'nullable|string',
            'description' => 'nullable|string',
            'isbn' => 'nullable|string',
            // add other required fields here if your DB/migration requires them
        ]);
        $this->bookRepository->update($id, $validated);
        return redirect()->route('dashboard');
    }
}
