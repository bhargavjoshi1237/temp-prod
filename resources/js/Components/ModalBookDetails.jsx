import React from 'react';

export default function ModalBookDetails({ book, show, onClose, onLike, liked }) {
    if (!book) return null;
    return (
        <div className={`fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 ${show ? '' : 'hidden'}`}>
            <div className="bg-white dark:bg-[#161b22] rounded-lg shadow-lg p-6 w-full max-w-md relative">
                <button className="absolute top-2 right-2 text-gray-500 hover:text-gray-700" onClick={onClose}>&times;</button>
                <img src={book.cover_image?.startsWith('/') ? `https://abc.nl${book.cover_image}` : book.cover_image} alt={book.title} className="w-full h-64 object-cover mb-4 bg-gray-200 dark:bg-[#0d1117] rounded" />
                <h2 className="text-2xl font-bold text-gray-900 dark:text-[#e6edf3] mb-2">{book.title}</h2>
                <p className="text-md text-gray-500 dark:text-gray-400 mb-2">{book.author}</p>
                <p className="text-lg text-blue-600 dark:text-blue-400 font-bold mb-2">€ {book.price}</p>
                <p className="text-sm text-gray-700 dark:text-gray-300 mb-4">{book.description}</p>
                <button 
                    className={`px-4 py-2 rounded bg-blue-600 dark:bg-blue-500 text-white font-semibold transition-colors ${liked ? 'opacity-50 cursor-not-allowed' : 'hover:bg-blue-700 dark:hover:bg-blue-600'}`}
                    onClick={onLike}
                    disabled={liked}
                >
                    {liked ? 'Liked' : 'Like'}
                </button>
            </div>
        </div>
    );
}
