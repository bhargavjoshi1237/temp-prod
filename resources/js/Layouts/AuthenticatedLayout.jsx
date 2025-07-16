import { Link, usePage, router, useForm } from '@inertiajs/react';
import { useState, useEffect } from 'react';
import { Head } from '@inertiajs/react';
import ProfileModal from '@/Components/ProfileModal';
import AdminBooksSection from '@/Components/AdminBooksSection';
import BookAddModal from '@/Components/BookAddModal';
import BookEditModal from '@/Components/BookEditModal';

export default function AuthenticatedLayout({ header, children, likedBooks = [], activity = [], handleEditBook: propHandleEditBook }) {
    const user = usePage().props.auth?.user;
    const [adminBooks, setAdminBooks] = useState([]);
    const [showAddBookModal, setShowAddBookModal] = useState(false);
    const [showEditBookModal, setShowEditBookModal] = useState(false);
    const [editBook, setEditBook] = useState(null);
    const { post, put, data, setData, processing, reset } = useForm({
        title: '',
        author: '',
        price: '',
        cover_image: '',
        description: '',
        isbn: '',
    });

    useEffect(() => {
        setAdminBooks(window.booksForAdmin || []);
    }, []);

    const handleAddBook = (bookData) => {
        setData({
            title: bookData.title,
            author: bookData.author,
            price: bookData.price,
            cover_image: bookData.cover_image,
            description: bookData.description,
            isbn: bookData.isbn,
        });
        post(route('books.store'), {
            onSuccess: () => {
                setShowAddBookModal(false);
                reset();
            }
        });
    };

    const handleEditBook = propHandleEditBook || ((bookData) => {
        setData({
            title: bookData.title,
            author: bookData.author,
            price: bookData.price,
            cover_image: bookData.cover_image,
            description: bookData.description,
            isbn: bookData.isbn,
        });
        put(route('books.update', { id: bookData.id }), {
            onSuccess: () => {
                setShowEditBookModal(false);
                setEditBook(null);
                reset();
            }
        });
    });

    const ROLE = {
        ADMIN: 'admin',
        USER: 'user',
    };
    const [collapsed, setCollapsed] = useState(false);
    const [showLikedBooks, setShowLikedBooks] = useState(false);

    const toggleSidebar = () => setCollapsed(!collapsed);

    const handleBookClick = (book) => {
        window.location.href = route('books.show', { id: book.id });
    };

    const userLikedBooks = likedBooks?.filter(book => book.pivot?.user_id === user?.id) ?? [];

    return (
        <div className="min-h-screen flex bg-white text-gray-900 transition-colors duration-200">
            {/* Sidebar */}
            <aside className={`h-screen fixed flex flex-col justify-between border-r border-gray-200 bg-white transition-all duration-200 ${collapsed ? 'w-16 p-2' : 'w-64 p-6'}`}>
                <div>
                    <div className={`flex items-center ${collapsed ? 'justify-center mb-4' : 'gap-2 mb-8'}`}>
                        <button 
                            onClick={toggleSidebar} 
                            className={`p-2 rounded hover:bg-gray-100 transition-colors ${collapsed ? 'mx-auto flex justify-center items-center' : ''}`}
                        >
                            {collapsed ? (
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
                                </svg>
                            ) : (
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                                </svg>
                            )}
                        </button>
                        {!collapsed && (
                            <Link href="/" className="flex items-center gap-2">
                                <div className="w-8 h-8 rounded bg-black flex items-center justify-center">
                                    <span className="text-white font-bold">B</span>
                                </div>
                                <span className="font-bold text-lg tracking-tight">BookVerse</span>
                            </Link>
                        )}
                    </div>
                    <nav className="flex flex-col gap-1">
                        <Link 
                            href={route('dashboard')}
                            className={`px-3 py-2 rounded-md transition-colors font-medium text-sm flex items-center gap-2 ${collapsed ? 'justify-center' : ''} ${!showLikedBooks && window.location.pathname === route('dashboard') ? 'bg-gray-200' : 'hover:bg-gray-100'}`}
                        >
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"></path>
                            </svg>
                            {!collapsed && 'Dashboard'}
                        </Link>
                        
                        {user?.role === ROLE.ADMIN && (
                            <>
                                <button
                                    type="button"
                                    onClick={() => setShowAddBookModal(true)}
                                    className={`px-3 py-2 rounded-md hover:bg-gray-100 transition-colors font-medium text-sm flex items-center gap-2 ${collapsed ? 'justify-center' : ''}`}
                                >
                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" />
                                    </svg>
                                    {!collapsed && 'Add Book'}
                                </button>
                            </>
                        )}
                        
                        <Link   
                            href={route('profile.edit')}
                            className={`px-3 py-2 rounded-md transition-colors font-medium text-sm flex items-center gap-2 ${collapsed ? 'justify-center' : ''} ${window.location.pathname === route('profile.edit') ? 'bg-gray-200' : 'hover:bg-gray-100'}`}
                        >
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path>
                            </svg>
                            {!collapsed && 'Profile'}
                        </Link>
                         
                        <Link   
                            href="#"
                            onClick={e => { e.preventDefault(); setShowLikedBooks(true); }}
                            className={`px-3 py-2 rounded-md transition-colors font-medium text-sm flex items-center gap-2 ${collapsed ? 'justify-center' : ''} ${showLikedBooks ? 'bg-gray-200' : 'hover:bg-gray-100'}`}
                        >
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 19.5A2.5 2.5 0 006.5 22h11a2.5 2.5 0 002.5-2.5V6a2 2 0 00-2-2H6a2 2 0 00-2 2v13.5z" />
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 6v16" />
                            </svg>
                            {!collapsed && 'Liked Books'}
                        </Link>
                    </nav>
                </div>
                <div className={`flex flex-col gap-2 text-sm ${collapsed ? 'items-center' : ''}`}>
                    <div className={`flex w-full ${collapsed ? 'justify-center items-center' : 'justify-between items-center'}`}>
                        {!collapsed && (
                            <div>
                                <span className="text-xs text-gray-500">Signed in as</span>
                                <span className="block font-semibold">{user.name}</span>
                            </div>
                        )}
                    </div>
                    {!collapsed && (
                        <Link
                            href={route('logout')}
                            method="post"
                            as="button"
                            className="w-full px-3 py-2 rounded-md bg-gray-100 hover:bg-gray-200 text-gray-800 font-medium text-sm transition-colors"
                        >
                            Sign out
                        </Link>
                    )}
                </div>
            </aside>

            {/* Main content */}
            <div className={`flex-1 flex flex-col min-h-screen transition-all duration-200 ${collapsed ? 'ml-16' : 'ml-64'}`}>
                <header className="sticky top-0 z-10 border-b border-gray-200 bg-white/90 backdrop-blur px-8 py-4 flex items-center justify-between">
                    <h1 className="text-xl font-semibold text-gray-800">{showLikedBooks ? 'Liked Books' : header}</h1>
                </header>
                <main className="flex-1 px-8 py-6 bg-gray-50">
                    {/* Show liked books section */}
                    {showLikedBooks ? (
                        <div className="max-w-7xl mx-auto">
                            <h2 className="text-2xl font-bold text-gray-800 mb-6">Your Favorite Books</h2>
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                                {userLikedBooks.length === 0 ? (
                                    <div className="col-span-full text-center py-12">
                                        <div className="text-gray-500 mb-4">You haven't liked any books yet</div>
                                        <Link 
                                            href={route('books.index')} 
                                            className="text-blue-600 hover:text-blue-800 font-medium"
                                        >
                                            Browse books
                                        </Link>
                                    </div>
                                ) : (
                                    userLikedBooks.map((book, idx) => (
                                        <div 
                                            key={idx} 
                                            className="bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200 overflow-hidden flex flex-col cursor-pointer border border-gray-100"
                                            onClick={() => handleBookClick(book)}
                                        >
                                            <div className="relative pt-[150%] bg-gray-100">
                                                <img 
                                                    src={book.cover_image?.startsWith('/') ? `https://abc.nl${book.cover_image}` : book.cover_image} 
                                                    alt={book.title} 
                                                    className="absolute top-0 left-0 w-full h-full object-cover" 
                                                />
                                            </div>
                                            <div className="p-4 flex-1 flex flex-col">
                                                <h3 className="text-lg font-bold text-gray-900 mb-1 line-clamp-2">{book.title}</h3>
                                                <p className="text-sm text-gray-600 mb-2">{book.author}</p>
                                                <div className="mt-auto pt-2">
                                                    <span className="text-lg font-bold text-blue-600">€{book.price}</span>
                                                </div>
                                            </div>
                                        </div>
                                    ))
                                )}
                            </div>
                        </div>
                    ) : (
                        <div className="max-w-7xl mx-auto">
                            {children}
                        </div>
                    )}
                    
                    {/* Admin section */}
                    {user?.role === ROLE.ADMIN && (
                        <div className="max-w-7xl mx-auto mt-8">
                            <AdminBooksSection
                                books={adminBooks}
                                onAddBook={handleAddBook}
                                onEditBook={book => { setEditBook(book); setShowEditBookModal(true); }}
                                user={user}
                            />
                        </div>
                    )}
                    
                    {/* Modals */}
                    <BookAddModal
                        show={showAddBookModal}
                        onClose={() => setShowAddBookModal(false)}
                        processing={processing}
                        onAddBook={handleAddBook}
                    />
                    
                    <BookEditModal
                        show={showEditBookModal}
                        onClose={() => { setShowEditBookModal(false); setEditBook(null); }}
                        book={editBook}
                        processing={processing}
                        onEditBook={handleEditBook}
                    />
                </main>
            </div>
        </div>
    );
}