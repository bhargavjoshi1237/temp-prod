<?php
namespace App\Http\Controllers;

use App\Http\Requests\StoreReviewRequest;
use App\Repositories\ReviewRepository;
use Illuminate\Support\Facades\Auth;
use App\Http\Controllers\BaseController;

class ReviewController extends BaseController
{
    protected $reviews;

    public function __construct(ReviewRepository $reviews)
    {
        $this->reviews = $reviews;
    }

    public function index($id)
    {
        $reviews = $this->reviews->getReviewsForBook($id);
        return response()->json($reviews);
    }

    public function store(StoreReviewRequest $request, $id)
    {
        $data = $request->validated();
        $data['user_id'] = Auth::id();
        $data['book_id'] = $id;
        $review = $this->reviews->createReview($data);
        return $this->sendRedirectResponse(route('dashboard'), 'Review submitted successfully.');
    }
}
