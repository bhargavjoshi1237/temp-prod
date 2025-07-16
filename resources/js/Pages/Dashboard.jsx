import React, { useState } from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { useForm, usePage } from '@inertiajs/react';
import BookEditModal from '@/Components/BookEditModal';
import ModalBookDetails from '@/Components/ModalBookDetails';
import { FaSpinner, FaHeart, FaRegHeart, FaEdit } from 'react-icons/fa';

export default function Dashboard({ books, likedBooks = [], handleEditBook }) {
    const [liked, setLiked] = useState({});
    const { post, processing } = useForm();
    const user = usePage().props.auth?.user;
    const [showEditBookModal, setShowEditBookModal] = useState(false);
    const [editBook, setEditBook] = useState(null);
    const [showBookDetailsModal, setShowBookDetailsModal] = useState(false);
    const [selectedBook, setSelectedBook] = useState(null);

    // Create a Set of liked book ids for fast lookup
    const likedBookIds = new Set(likedBooks.map(b => b.id));

    const handleLike = (bookId) => {
        setLiked(prev => ({ ...prev, [bookId]: 'loading' }));
        post(route('books.like', { id: bookId }), {
            preserveScroll: true,
            data: { book_id: bookId },
            onError: () => setLiked(prev => ({ ...prev, [bookId]: false })),
            onSuccess: () => setLiked(prev => ({ ...prev, [bookId]: true })),
        });
    };

    const handleEditClick = (book) => {
        setEditBook(book);
        setShowEditBookModal(true);
    };

    const handleBookClick = (book) => {
        setSelectedBook(book);
        setShowBookDetailsModal(true);
    };

    return (
        <AuthenticatedLayout
            header={<h2 className="text-2xl font-bold text-gray-900">Dashboard</h2>}
            likedBooks={likedBooks}
            handleEditBook={handleEditBook}
        >
          
            <div className="py-8 max-w-7xl mx-auto">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    {books.map((book, idx) => {
                        const isLiked = likedBookIds.has(book.id);
                        const likeState = liked[book.id];
                        return (
                            <div 
                                key={idx} 
                                className="bg-white rounded-lg border border-gray-100 shadow-sm hover:shadow-md transition-all duration-200 overflow-hidden flex flex-col cursor-pointer"
                                onClick={() => handleBookClick(book)}
                            >
                                <div className="relative pt-[150%] bg-gray-50">
                                    <img 
                                        src={ book.cover_image} 
                                        alt={book.title} 
                                        className="absolute top-0 left-0 w-full h-full object-cover" 
                                    />
                                </div>
                                <div className="p-4 flex-1 flex flex-col">
                                    <div className="mb-3">
                                        <h3 className="text-lg font-semibold text-gray-900 line-clamp-2 mb-1">{book.title}</h3>
                                        <p className="text-sm text-gray-600">{book.author}</p>
                                        <div className="flex gap-2 mt-1">
                                            <span className="text-xs text-gray-500">{book.likes_count ?? 0} Likes</span>
                                            <span className="text-xs text-gray-500">{book.reviews_count ?? 0} Reviews</span>
                                        </div>
                                    </div>
                                    <div className="mt-auto pt-2 flex items-center justify-between">
                                        <span className="text-lg font-bold text-blue-600">€{book.price}</span>
                                        <div className="flex gap-2">
                                            <span
                                                className="p-2 rounded-full bg-gray-50 text-blue-600 flex items-center gap-1"
                                                title="Reviews"
                                            >
                                                <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8h2a2 2 0 012 2v8a2 2 0 01-2 2H7a2 2 0 01-2-2V10a2 2 0 012-2h2m2-4h4a2 2 0 012 2v2a2 2 0 01-2 2h-4a2 2 0 01-2-2V6a2 2 0 012-2z" />
                                                </svg>
                                                <span className="ml-1 text-xs font-semibold">{Array.isArray(book.reviews) ? book.reviews.length : 0}</span>
                                            </span>
                                             <button
                                                className={`p-2 rounded-full hover:bg-gray-100 transition-colors ${isLiked || likeState === true ? 'text-red-500' : 'text-gray-400'}`}
                                                disabled={isLiked || likeState === true || likeState === 'loading' || processing}
                                                onClick={() => handleLike(book.id)}
                                                aria-label={isLiked || likeState === true ? 'Liked' : 'Like'}
                                            >
                                                {likeState === 'loading' ? (
                                                    <FaSpinner className="animate-spin" />
                                                ) : isLiked || likeState === true ? (
                                                    <FaHeart />
                                                ) : (
                                                    <FaRegHeart />
                                                )}
                                            </button>
                                            {user?.role === 'admin' && (
                                                <button
                                                    className="p-2 rounded-full hover:bg-gray-100 text-gray-600 transition-colors"
                                                    onClick={() => handleEditClick(book)}
                                                    aria-label="Edit"
                                                >
                                                    <FaEdit className="w-4 h-4" />
                                                </button>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
            <BookEditModal
                show={showEditBookModal}
                onClose={() => { setShowEditBookModal(false); setEditBook(null); }}
                book={editBook}
                processing={processing}
                onEditBook={handleEditBook}
            />
            <ModalBookDetails
                book={selectedBook}
                show={showBookDetailsModal}
                onClose={() => { setShowBookDetailsModal(false); setSelectedBook(null); }}
                liked={selectedBook ? likedBookIds.has(selectedBook.id) || liked[selectedBook.id] === true : false}
                onLike={() => selectedBook && handleLike(selectedBook.id)}
            />
        </AuthenticatedLayout>
    );
}