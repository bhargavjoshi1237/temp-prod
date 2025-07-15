<?php
namespace App\Repositories;

use App\Models\Like;
use App\Models\User;
use App\Models\Book;

class LikeRepository
{
    public function likeBook($userId, $bookId)
    {
        $user = User::find($userId);
        if ($user) {
            $user->likedBooks()->syncWithoutDetaching([$bookId]);
        }
    }

    public function isBookLiked($userId, $bookId)
    {
        return Like::where('user_id', $userId)->where('book_id', $bookId)->exists();
    }

    public function getUserLikes($userId)
    {
        return Like::where('user_id', $userId)->get();
    }

    // Add more repository methods as needed
}
