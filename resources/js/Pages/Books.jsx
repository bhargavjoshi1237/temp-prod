import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import LikedBooks from '@/Components/LikedBooks';

export default function Books({ auth, likedBooks = [] }) {
    return (
        <AuthenticatedLayout user={auth.user} header="Liked Books">
            <Head title="Liked Books" />
            <div className="py-12">
                <div className="max-w-5xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white dark:bg-[#161b22] overflow-hidden shadow-sm sm:rounded-lg p-6">
                        <h2 className="text-2xl font-bold mb-6">Liked Books</h2>
                        <LikedBooks books={likedBooks} />
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
