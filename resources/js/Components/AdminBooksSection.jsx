import React from 'react';

export default function AdminBooksSection({ books, onAddBook, onEditBook, user }) {
    return (
        <div className="mt-8">
            <h2 className="text-xl font-bold mb-4">Manage Books</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                {books.map(book => (
                    <div key={book.id} className="bg-white dark:bg-[#161b22] rounded-lg shadow p-4 flex flex-col">
                        <img src={book.cover_image?.startsWith('/') ? `https://abc.nl${book.cover_image}` : book.cover_image} alt={book.title} className="w-full h-40 object-cover mb-2 bg-gray-200 dark:bg-[#0d1117]" />
                        <h3 className="font-bold text-lg mb-1">{book.title}</h3>
                        <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">{book.author}</p>
                        <p className="text-sm text-gray-700 dark:text-gray-300 mb-2">€ {book.price}</p>
                        <button
                            className="px-3 py-1 rounded bg-blue-600 dark:bg-blue-500 text-white text-xs font-semibold hover:bg-blue-700 dark:hover:bg-blue-600 transition-colors mt-auto"
                            onClick={() => onEditBook(book)}
                        >
                            Edit
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
}
