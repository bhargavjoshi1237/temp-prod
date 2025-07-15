<?php

use App\Http\Controllers\ProfileController;
use App\Http\Controllers\BookController;
use App\Http\Controllers\LikeController;
use App\Http\Controllers\DashboardController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use App\Models\Book;
use Inertia\Inertia;

// Home screen: show all books
Route::get('/', [BookController::class, 'index'])->name('home');

// Book details page
Route::get('/books/{id}', [BookController::class, 'show'])->name('books.show');

// Admin: Add/Edit books (UI only, handled via modal in frontend)
Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('/books/create', function () {
        return Inertia::render('Dashboard'); // Modal handled in frontend
    })->name('books.create');
    Route::get('/books/editList', function () {
        return Inertia::render('Dashboard'); // Modal handled in frontend
    })->name('books.editList');
    Route::post('/books', [BookController::class, 'store'])->name('books.store');
    Route::put('/books/{id}', [BookController::class, 'update'])->name('books.update');
});

Route::get('/dashboard', [DashboardController::class, 'index'])->name('dashboard');

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');

    // Like a book
    Route::post('/books/{id}/like', [LikeController::class, 'like'])->name('books.like');
});

require __DIR__.'/auth.php';

