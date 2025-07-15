<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Repositories\DashboardRepository;
use Illuminate\Support\Facades\Auth;

class DashboardController extends Controller
{
    protected $dashboardRepository;

    public function __construct(DashboardRepository $dashboardRepository)
    {
        $this->dashboardRepository = $dashboardRepository;
    }

    public function index()
    {
        $user = Auth::user();
        $books = $this->dashboardRepository->getAllBooks();
        $likedBooks = $user ? $this->dashboardRepository->getUserLikedBooks($user->id) : [];
        return Inertia::render('Dashboard', [
            'books' => $books,
            'likedBooks' => $likedBooks,
            'auth' => ['user' => $user],
        ]);
    }
}
