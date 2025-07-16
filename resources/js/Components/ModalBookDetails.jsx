import React, { useEffect, useState } from 'react';
import { useForm } from '@inertiajs/react';

export default function ModalBookDetails({ book, show, onClose, onLike, liked: initialLiked }) {
    const [reviews, setReviews] = useState([]);
    const [loading, setLoading] = useState(false);
    const [likeLoading, setLikeLoading] = useState(false);
    const [liked, setLiked] = useState(initialLiked);

    useEffect(() => {
        setLiked(initialLiked);
    }, [book, initialLiked, show]);
    const { post, data, setData, processing, errors, reset } = useForm({ 
        content: '', 
        rating: '' 
    });

    useEffect(() => {
        if (book && show) {
            setLoading(true);
            fetch(`/books/${book.id}/reviews`)
                .then(res => res.json())
                .then(data => {
                    setReviews(data);
                    setLoading(false);
                });
        }
    }, [book, show]);

    const [reviewErrors, setReviewErrors] = useState({});
    const handleReviewSubmit = e => {
        e.preventDefault();
        let errors = {};
        if (!data.content || data.content.trim().length === 0) {
            errors.content = 'Review is required.';
        }
        if (!data.rating || isNaN(data.rating) || data.rating < 1 || data.rating > 5) {
            errors.rating = 'Rating (1-5) is required.';
        }
        setReviewErrors(errors);
        if (Object.keys(errors).length > 0) return;
        post(`/books/${book.id}/reviews`, {
            preserveScroll: true,
            onSuccess: () => {
                reset();
                fetch(`/books/${book.id}/reviews`)
                    .then(res => res.json())
                    .then(data => setReviews(data));
            }
        });
    };

    const handleLike = async () => {
        setLikeLoading(true);
        // Use inertia post for consistency
        await post(`/books/${book.id}/like`, {
            preserveScroll: true,
            data: { book_id: book.id },
            onSuccess: () => {
                setLiked(true);
                setLikeLoading(false);
            },
            onError: () => {
                setLikeLoading(false);
            }
        });
    };

    if (!book) return null;

    return (
        <div className={`fixed inset-0 z-50 flex items-center justify-center p-4 ${show ? '' : 'hidden'}`}>
            <div 
                className="fixed inset-0 bg-black/30 backdrop-blur-sm" 
                onClick={onClose}
                aria-hidden="true"
            />
            
            <div className="relative bg-white rounded-lg shadow-xl w-full max-w-md max-h-[90vh] overflow-y-auto">
                <button 
                    className="absolute top-4 right-4 p-1 rounded-full hover:bg-gray-100 transition-colors"
                    onClick={onClose}
                    aria-label="Close"
                >
                    <svg className="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                </button>
                
                <div className="p-6">
                    <div className="flex flex-col sm:flex-row gap-6 mb-6">
                        <div className="flex-shrink-0">
                            <img 
                                src={book.cover_image?.startsWith('/') ? `https://abc.nl${book.cover_image}` : book.cover_image} 
                                alt={book.title} 
                                className="w-32 h-48 object-cover rounded-lg shadow-sm border border-gray-200" 
                            />
                        </div>
                        <div className="flex-1">
                            <h2 className="text-xl font-semibold text-gray-900 mb-1">{book.title}</h2>
                            <p className="text-sm text-gray-600 mb-2">{book.author}</p>
                            <p className="text-lg font-medium text-blue-600 mb-3">€{book.price}</p>
                            <p className="text-sm text-gray-700 mb-4 line-clamp-4">{book.description}</p>
                            <button 
                                className={`px-3 py-1.5 text-sm rounded-md transition-colors flex items-center gap-2 ${
                                    liked || likeLoading
                                        ? 'bg-gray-100 text-gray-500 cursor-not-allowed' 
                                        : 'bg-blue-50 text-blue-600 hover:bg-blue-100'
                                }`}
                                onClick={handleLike}
                                disabled={liked || likeLoading}
                            >
                                {likeLoading ? (
                                    <span className="inline-block animate-spin mr-1">
                                        <svg className="w-4 h-4 text-blue-500" fill="none" viewBox="0 0 24 24">
                                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z"></path>
                                        </svg>
                                    </span>
                                ) : null}
                                {liked ? '✓ Liked' : 'Like'}
                            </button>
                        </div>
                    </div>
                    
                    <div className="border-t pt-6">
                        <h3 className="text-lg font-medium text-gray-900 mb-3">Reviews ({reviews.length})</h3>
                        
                        {loading ? (
                            <div className="flex justify-center py-4">
                                <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-gray-300"></div>
                            </div>
                        ) : (
                            <ul className="space-y-3 mb-6 max-h-48 overflow-y-auto pr-2">
                                {reviews.map(r => (
                                    <li key={r.id} className="border-b border-gray-100 pb-3 last:border-0 last:pb-0">
                                        <div className="flex items-center gap-2 mb-1">
                                            <span className="text-xs font-medium text-gray-500">
                                                {r.user?.name || 'Anonymous'}
                                            </span>
                                            {r.rating && (
                                                <span className="text-xs bg-gray-100 px-1.5 py-0.5 rounded text-gray-600">
                                                    {r.rating}/5
                                                </span>
                                            )}
                                        </div>
                                        <p className="text-sm text-gray-700">{r.content}</p>
                                    </li>
                                ))}
                                {reviews.length === 0 && (
                                    <li className="text-sm text-gray-500 italic">No reviews yet. Be the first to review!</li>
                                )}
                            </ul>
                        )}
                        
                        <form onSubmit={handleReviewSubmit} className="space-y-3">
                            <div>
                                <textarea
                                    name="content"
                                    value={data.content}
                                    onChange={e => setData('content', e.target.value)}
                                    placeholder="Share your thoughts about this book..."
                                    rows={3}
                                    className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                                />
                                {reviewErrors.content && (
                                    <p className="mt-1 text-xs text-red-500">{reviewErrors.content}</p>
                                )}
                            </div>
                            
                            <div className="flex items-center gap-4">
                                <div className="flex-1">
                                    <input
                                        type="number"
                                        name="rating"
                                        value={data.rating}
                                        onChange={e => setData('rating', e.target.value)}
                                        min={1}
                                        max={5}
                                        placeholder="Rating (1-5)"
                                        className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                                    />
                                    {reviewErrors.rating && (
                                        <p className="mt-1 text-xs text-red-500">{reviewErrors.rating}</p>
                                    )}
                                </div>
                                <button
                                    type="submit"
                                    disabled={processing}
                                    className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
                                >
                                    {processing ? 'Submitting...' : 'Submit Review'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}