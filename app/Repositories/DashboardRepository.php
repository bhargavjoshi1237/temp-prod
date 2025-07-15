<?php

namespace App\Repositories;

use App\Models\Book;
use App\Models\User;

class DashboardRepository
{
    public function getAllBooks()
    {
        return Book::all();
    }

    public function getUserLikedBooks($userId)
    {
        $user = User::with('likedBooks')->find($userId);
        return $user ? $user->likedBooks : collect();
    }
}
