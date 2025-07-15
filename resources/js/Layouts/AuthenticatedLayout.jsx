import { Link, usePage, router, useForm } from '@inertiajs/react';
import { useState, useEffect } from 'react';
import { Head } from '@inertiajs/react';
import ProfileModal from '@/Components/ProfileModal';
import AdminBooksSection from '@/Components/AdminBooksSection';
import BookEditModal from '@/Components/BookEditModal';

export default function AuthenticatedLayout({ header, children, likedBooks = [], activity = [], handleEditBook: propHandleEditBook }) {
    const user = usePage().props.auth?.user;
    // Dummy books state for admin section (replace with real data from backend)
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
        // add other fields as needed
    });

    // Fetch books for admin section (simulate, replace with Inertia prop or API)
    useEffect(() => {
        // TODO: Replace with real fetch from backend
        setAdminBooks(window.booksForAdmin || []);
    }, []);

    // Add book handler using useForm
    const handleAddBook = (bookData) => {
        setData({
            title: bookData.title,
            author: bookData.author,
            price: bookData.price,
            cover_image: bookData.cover_image,
            description: bookData.description,
            isbn: bookData.isbn,
            // add other fields as needed
        });
        post(route('books.store'), {
            onSuccess: () => {
                setShowAddBookModal(false);
                reset();
            }
        });
    };

    // Edit book handler
    const handleEditBook = propHandleEditBook || ((bookData) => {
        setData({
            title: bookData.title,
            author: bookData.author,
            price: bookData.price,
            cover_image: bookData.cover_image,
            description: bookData.description,
            isbn: bookData.isbn,
            // add other fields as needed
        });
        put(route('books.update', { id: bookData.id }), {
            onSuccess: () => {
                setShowEditBookModal(false);
                setEditBook(null);
                reset();
            }
        });
    });
    // Enum for roles (frontend usage)
    const ROLE = {
        ADMIN: 'admin',
        USER: 'user',
    };
    const [darkMode, setDarkMode] = useState(true);
    const [collapsed, setCollapsed] = useState(false);
    const [showLikedBooks, setShowLikedBooks] = useState(false);

    useEffect(() => {
        const savedTheme = localStorage.getItem('theme');
        const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
        if (savedTheme) {
            setDarkMode(savedTheme === 'dark');
        } else {
            setDarkMode(systemPrefersDark);
        }
    }, []);

    useEffect(() => {
        if (darkMode) {
            document.documentElement.classList.add('dark');
            localStorage.setItem('theme', 'dark');
        } else {
            document.documentElement.classList.remove('dark');
            localStorage.setItem('theme', 'light');
        }
    }, [darkMode]);

    const toggleTheme = () => setDarkMode(!darkMode);
    const toggleSidebar = () => setCollapsed(!collapsed);

    const handleBookClick = (book) => {
        window.location.href = route('books.show', { id: book.id });
    };

    // Filter likedBooks for current user (if needed)
    const userLikedBooks = likedBooks?.filter(book => book.pivot?.user_id === user?.id) ?? [];

    return (
        <div className="min-h-screen flex bg-white dark:bg-[#0d1117] text-gray-900 dark:text-[#e6edf3] transition-colors duration-200">
            {/* Sidebar */}
            <aside className={`h-screen fixed flex flex-col justify-between border-r border-gray-200 dark:border-gray-800 bg-white dark:bg-[#010409] transition-all duration-200 ${collapsed ? 'w-20 p-2' : 'w-64 p-6'}`}>
                <div>
                    <div className={`flex items-center ${collapsed ? 'justify-center mb-4' : 'gap-2 mb-8'}`}>
                        <button onClick={toggleSidebar} className={`p-2 rounded hover:bg-gray-100 dark:hover:bg-[#161b22] transition-colors ${collapsed ? 'mx-auto flex justify-center items-center' : ''}`}>
                            {collapsed ? (
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" /></svg>
                            ) : (
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" /></svg>
                            )}
                        </button>
                        {!collapsed && (
                            <Link href="/" className="flex items-center gap-2">
                                <div className="w-8 h-8 rounded bg-black dark:bg-white flex items-center justify-center">
                                    <span className="text-white dark:text-black font-bold">C</span>
                                </div>
                                <span className="font-bold text-lg tracking-tight">Crossword</span>
                            </Link>
                        )}
                    </div>
                    <nav className="flex flex-col gap-1">
                        <Link 
                            href={route('dashboard')}
                            className={`px-3 py-2 rounded-md hover:bg-gray-100 dark:hover:bg-[#161b22] transition-colors font-medium text-sm flex items-center gap-2 ${collapsed ? 'justify-center' : ''}`}
                        >
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"></path>
                            </svg>
                            {!collapsed && 'Dashboard'}
                        </Link>
                        {/* Only show to Admins */}
                        {user?.role === ROLE.ADMIN && (
                            <>
                                <button
                                    type="button"
                                    onClick={() => setShowAddBookModal(true)}
                                    className={`px-3 py-2 rounded-md hover:bg-gray-100 dark:hover:bg-[#161b22] transition-colors font-medium text-sm flex items-center gap-2 ${collapsed ? 'justify-center' : ''}`}
                                >
                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" /></svg>
                                    {!collapsed && 'Add Book'}
                                </button>
                                {/* <button
                                    type="button"
                                    onClick={() => { setShowEditBookModal(true); setEditBook(adminBooks[0] || null); }}
                                    className={`px-3 py-2 rounded-md hover:bg-gray-100 dark:hover:bg-[#161b22] transition-colors font-medium text-sm flex items-center gap-2 ${collapsed ? 'justify-center' : ''}`}
                                >
                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h7" /></svg>
                                    {!collapsed && 'Edit Books'}
                                </button> */}
                            </>
                        )}
                        <Link   
                            href={route('profile.edit')}
                            className={`px-3 py-2 rounded-md hover:bg-gray-100 dark:hover:bg-[#161b22] transition-colors font-medium text-sm flex items-center gap-2 ${collapsed ? 'justify-center' : ''}`}
                        >
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path>
                            </svg>
                            {!collapsed && 'Profile'}
                        </Link>
                        {/* Only show liked books link for users */}
                        {user?.role === ROLE.USER && (
                            <Link   
                                href="#"
                                onClick={e => { e.preventDefault(); setShowLikedBooks(true); }}
                                className={`px-3 py-2 rounded-md hover:bg-gray-100 dark:hover:bg-[#161b22] transition-colors font-medium text-sm flex items-center gap-2 ${collapsed ? 'justify-center' : ''} ${showLikedBooks ? 'bg-gray-200 dark:bg-[#161b22]' : ''}`}
                            >
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 19.5A2.5 2.5 0 006.5 22h11a2.5 2.5 0 002.5-2.5V6a2 2 0 00-2-2H6a2 2 0 00-2 2v13.5z" />
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 6v16" />
                                </svg>
                                {!collapsed && 'Liked Books'}
                            </Link>
                        )}
                    </nav>
                </div>
                <div className={`flex flex-col gap-2 text-sm ${collapsed ? 'items-center' : ''}`}>
                    <div className={`flex w-full ${collapsed ? 'justify-center items-center' : 'justify-between items-center'}`}>
                        {!collapsed && (
                            <div>
                                <span className="text-xs text-gray-500 dark:text-gray-400">Signed in as</span>
                                <span className="block font-semibold">{user.name}</span>
                            </div>
                        )}
                        <button 
                            onClick={toggleTheme}
                            className={`p-2 rounded-full hover:bg-gray-100 dark:hover:bg-[#161b22] transition-colors ${collapsed ? 'mx-auto flex justify-center items-center' : ''}`}
                        >
                            {darkMode ? (
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"></path>
                                </svg>
                            ) : (
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"></path>
                                </svg>
                            )}
                        </button>
                    </div>
                    {!collapsed && (
                        <form method="POST" action={route('logout')}>
                            <button 
                                type="submit" 
                                className="w-full px-3 py-2 rounded-md bg-gray-100 dark:bg-[#161b22] hover:bg-gray-200 dark:hover:bg-[#21262d] text-gray-800 dark:text-[#e6edf3] font-medium text-sm transition-colors"
                            >
                                Sign out
                            </button>
                        </form>
                    )}
                </div>
            </aside>

            {/* Main content */}
            <div className={`flex-1 flex flex-col min-h-screen transition-all duration-200 ${collapsed ? 'ml-20' : 'ml-64'}`}>
                <header className="sticky top-0 z-10 border-b border-gray-200 dark:border-gray-800 bg-white/80 dark:bg-[#0d1117]/80 backdrop-blur px-8 py-4 flex items-center justify-between">
                    <h1 className="text-lg font-semibold">{showLikedBooks ? 'Liked Books' : header}</h1>
                </header>
                <main className="flex-1 px-8 py-6 bg-gray-50 dark:bg-[#0d1117]">
                    {/* Only show liked books section for users */}
                    {showLikedBooks && user?.role === ROLE.USER ? (
                        <>
                            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mb-8">
                                {(userLikedBooks.length === 0) ? (
                                    <div className="text-gray-500 dark:text-gray-400">No liked books yet.</div>
                                ) : (
                                    userLikedBooks.map((book, idx) => (
                                        <div key={idx} className="bg-white dark:bg-[#161b22] rounded-lg shadow hover:shadow-lg transition-shadow duration-200 overflow-hidden flex flex-col cursor-pointer" onClick={() => handleBookClick(book)}>
                                            <img src={book.cover_image?.startsWith('/') ? `https://abc.nl${book.cover_image}` : book.cover_image} alt={book.title} className="w-full h-64 object-cover bg-gray-200 dark:bg-[#0d1117]" />
                                            <div className="p-4 flex-1 flex flex-col justify-between">
                                                <div>
                                                    <h3 className="text-lg font-bold text-gray-900 dark:text-[#e6edf3] mb-1 truncate">{book.title}</h3>
                                                    <p className="text-sm text-gray-500 dark:text-gray-400 mb-2">{book.author}</p>
                                                </div>
                                                <div className="flex items-center justify-between mt-2">
                                                    <span className="text-xl font-bold text-blue-600 dark:text-blue-400">€ {book.price}</span>
                                                </div>
                                            </div>
                                        </div>
                                    ))
                                )}
                            </div>
                        </>
                    ) : (
                        children
                    )}
                    {/* Only show admin book management section for admins */}
                    {user?.role === ROLE.ADMIN && (
                        <AdminBooksSection
                            books={adminBooks}
                            onAddBook={handleAddBook}
                            onEditBook={book => { setEditBook(book); setShowEditBookModal(true); }}
                            user={user}
                        />
                    )}
                    {/* Add Book Modal */}
                    <BookEditModal
                        show={showAddBookModal}
                        onClose={() => setShowAddBookModal(false)}
                        book={null}
                        onSave={handleAddBook}
                        processing={processing}
                    />
                    {/* Edit Book Modal */}
                    <BookEditModal
                        show={showEditBookModal}
                        onClose={() => { setShowEditBookModal(false); setEditBook(null); }}
                        book={editBook}
                        onSave={handleEditBook}
                        processing={processing}
                        isEdit={true}
                    />
                </main>
            </div>
        </div>
    );
}