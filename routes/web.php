<?php

use App\Http\Controllers\ProfileController;
use App\Http\Controllers\BookController;
use App\Http\Controllers\ReviewController;
use App\Http\Controllers\LikeController;
use App\Http\Controllers\DashboardController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use App\Models\Book;
use Inertia\Inertia;


Route::get('/', function () {
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
})->name('welcome');

Route::get('/books/{id}', [BookController::class, 'show'])->name('books.show');
Route::get('/books/{id}/reviews', [ReviewController::class, 'index'])->name('books.reviews');
Route::post('/books/{id}/reviews', [ReviewController::class, 'store'])->name('books.reviews.store');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('/books/create', function () {
        return Inertia::render('Dashboard');
    })->name('books.create');
    Route::get('/books/editList', function () {
        return Inertia::render('Dashboard'); 
    })->name('books.editList');
    Route::post('/books', [BookController::class, 'store'])->name('books.store');
    Route::put('/books/{id}', [BookController::class, 'update'])->name('books.update');
    Route::delete('/books/{id}', [BookController::class, 'destroy'])->name('books.destroy');
});

Route::get('/dashboard', [DashboardController::class, 'index'])->name('dashboard');

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');


    Route::post('/books/{id}/like', [LikeController::class, 'like'])->name('books.like');
});



require __DIR__ . '/auth.php';
