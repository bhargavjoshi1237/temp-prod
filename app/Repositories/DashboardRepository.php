<?php

namespace App\Repositories;

use App\Models\Book;
use App\Models\User;

class DashboardRepository
{
    public function getAllBooks()
    {
        return Book::with(['reviews.user'])->get();
    }

    public function getUserLikedBooks($userId)
    {
        $user = User::with('likedBooks')->find($userId);
        return $user ? $user->likedBooks : collect();
    }

    public function getBooksWithStats()
    {
        return Book::withCount(['likes', 'reviews'])->get();
    }
}
