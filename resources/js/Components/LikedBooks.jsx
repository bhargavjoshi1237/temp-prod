import React from 'react';
import { Link } from '@inertiajs/react';

export default function LikedBooks({ books = [] }) {
    if (!books.length) {
        return <div className="text-gray-500 dark:text-gray-400">No liked books yet.</div>;
    }
    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {books.map(book => (
                <div key={book.id} className="bg-white dark:bg-[#161b22] rounded shadow p-4 flex flex-col">
                    <Link href={route('books.show', { id: book.id })} className="font-semibold text-lg mb-2 hover:underline">
                        {book.title}
                    </Link>
                    <div className="text-sm text-gray-600 dark:text-gray-400 mb-2">{book.author}</div>
                    <div className="flex-1 text-sm text-gray-700 dark:text-gray-300">{book.description}</div>
                </div>
            ))}
        </div>
    );
}
