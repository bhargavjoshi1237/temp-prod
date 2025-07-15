<?php
namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Repositories\LikeRepository;
use Illuminate\Support\Facades\Auth;

class LikeController extends Controller
{
    protected $likeRepository;

    public function __construct(LikeRepository $likeRepository)
    {
        $this->likeRepository = $likeRepository;
    }

    public function like(Request $request, $id)
    {
        $user = Auth::user();
        if (!$user) {
            return redirect()->back()->withErrors(['error' => 'Unauthorized']);
        }
        $bookId = $request->input('book_id', $id);
        $this->likeRepository->likeBook($user->id, $bookId);
        return redirect()->back();
    }
}
