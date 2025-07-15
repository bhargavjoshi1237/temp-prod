import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';

export default function Book({ auth, book }) {
    return (
        <AuthenticatedLayout user={auth.user}>
            <Head title={book.title} />
            <div className="py-12">
                <div className="max-w-3xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6">
                            <h2 className="text-2xl font-bold mb-2">{book.title}</h2>
                            <p className="mb-2">Author: {book.author}</p>
                            <p className="mb-4">{book.description}</p>
                            {/* Book cover and like button can be added here */}
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
