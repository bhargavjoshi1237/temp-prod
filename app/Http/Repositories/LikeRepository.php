<?php
namespace App\Http\Repositories;

use App\Models\Like;
use App\Repositories\BaseRepository;

class LikeRepository extends BaseRepository
{
    public function __construct(Like $model)
    {
        parent::__construct($model);
    }

    public function likeBook($userId, $bookId)
    {
        return $this->store([
            'user_id' => $userId,
            'book_id' => $bookId,
        ]);
    }

    public function getUserLikes($userId)
    {
        return $this->model->where('user_id', $userId)->get();
    }
}
