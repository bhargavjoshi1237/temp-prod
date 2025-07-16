<?php
namespace App\Repositories;

use App\Models\Review;

class ReviewRepository extends BaseRepository
{
    public function __construct(Review $model)
    {
        parent::__construct($model);
    }

    public function getReviewsForBook($bookId)
    {
        return $this->model->where('book_id', $bookId)->with('user')->latest()->get();
    }

    public function createReview($data)
    {
        return $this->model->create($data);
    }

    public function countReviewsForBook($bookId)
    {
        return $this->model->where('book_id', $bookId)->count();
    }
}
