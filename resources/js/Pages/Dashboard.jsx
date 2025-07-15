import React, { useState } from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { useForm, usePage } from '@inertiajs/react';
import BookEditModal from '@/Components/BookEditModal';

export default function Dashboard({ books, likedBooks = [], handleEditBook }) {
    const [liked, setLiked] = useState({});
    const { post, processing } = useForm();
    const user = usePage().props.auth?.user;
    const [showEditBookModal, setShowEditBookModal] = useState(false);
    const [editBook, setEditBook] = useState(null);

    // Create a Set of liked book ids for fast lookup
    const likedBookIds = new Set(likedBooks.map(b => b.id));

    const handleLike = (bookId) => {
        setLiked(prev => ({ ...prev, [bookId]: true }));
        post(route('books.like', { id: bookId }), {
            preserveScroll: true,
            data: { book_id: bookId },
            onError: () => setLiked(prev => ({ ...prev, [bookId]: false })),
        });
    };

    const handleEditClick = (book) => {
        setEditBook(book);
        setShowEditBookModal(true);
    };

    return (
        <AuthenticatedLayout
            header={<h2 className="text-xl font-semibold leading-tight text-gray-800 dark:text-gray-200">Dashboard</h2>}
            likedBooks={likedBooks}
            handleEditBook={handleEditBook}
        >
            <div className="py-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                    {books.map((book, idx) => {
                        const isLiked = likedBookIds.has(book.id);
                        return (
                            <div key={idx} className="bg-white dark:bg-[#161b22] rounded-lg shadow hover:shadow-lg transition-shadow duration-200 overflow-hidden flex flex-col">
                                <img src={book.cover_image?.startsWith('/') ? `https://abc.nl${book.cover_image}` : book.cover_image} alt={book.title} className="w-full h-64 object-cover bg-gray-200 dark:bg-[#0d1117]" />
                                <div className="p-4 flex-1 flex flex-col justify-between">
                                    <div>
                                        <h3 className="text-lg font-bold text-gray-900 dark:text-[#e6edf3] mb-1 truncate">{book.title}</h3>
                                        <p className="text-sm text-gray-500 dark:text-gray-400 mb-2">{book.author}</p>
                                    </div>
                                    <div className="flex items-center justify-between mt-2">
                                        <span className="text-xl font-bold text-blue-600 dark:text-blue-400">€ {book.price}</span>
                                        <div className="flex gap-2">
                                            <button
                                                className={`px-3 py-1 rounded bg-blue-600 dark:bg-blue-500 text-white text-xs font-semibold hover:bg-blue-700 dark:hover:bg-blue-600 transition-colors ${isLiked || liked[book.id] ? 'opacity-50 cursor-not-allowed' : ''}`}
                                                disabled={isLiked || liked[book.id] || processing}
                                                onClick={() => handleLike(book.id)}
                                            >
                                                {isLiked || liked[book.id] ? 'Liked' : 'Like'}
                                            </button>
                                            {user?.role === 'admin' && (
                                                <button
                                                    className="px-3 py-1 rounded bg-yellow-500 text-white text-xs font-semibold hover:bg-yellow-600 transition-colors"
                                                    onClick={() => handleEditClick(book)}
                                                >
                                                    Edit
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
                onSave={handleEditBook}
                processing={processing}
                isEdit={true}
            />
        </AuthenticatedLayout>
    );
}
