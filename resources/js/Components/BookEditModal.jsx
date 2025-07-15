import { useState, useEffect } from 'react';
import { useForm } from '@inertiajs/react';
import Modal from '@/Components/Modal';

export default function BookEditModal({ show, onClose, book, processing, isEdit }) {
    const [form, setForm] = useState({
        id: '',
        title: '',
        author: '',
        price: '',
        cover_image: '',
        description: '',
        isbn: '',
    });

    useEffect(() => {
        if (book) {
            setForm({
                id: book.id || '',
                title: book.title || '',
                author: book.author || '',
                price: book.price || '',
                cover_image: book.cover_image || '',
                description: book.description || '',
                isbn: book.isbn || '',
            });
        } else {
            setForm({
                id: '',
                title: '',
                author: '',
                price: '',
                cover_image: '',
                description: '',
                isbn: '',
            });
        }
    }, [book, show]);

    const { put, processing: formProcessing } = useForm();

    const handleChange = e => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = e => {
        e.preventDefault();
        if (isEdit && form.id) {
            put(route('books.update', { id: form.id }), {
                data: {
                    id: form.id, // Ensure id is sent
                    title: form.title,
                    author: form.author,
                    price: form.price,
                    cover_image: form.cover_image,
                    description: form.description,
                    isbn: form.isbn,
                },
                onSuccess: () => {
                    onClose();
                }
            });
        }
    };

    if (!show) return null;

    return (
        <Modal show={show} onClose={onClose}>
            <form onSubmit={handleSubmit} className="p-6 flex flex-col gap-4">
                <h2 className="text-lg font-bold mb-2">{isEdit ? 'Edit Book' : 'Add Book'}</h2>
                <input
                    type="text"
                    name="title"
                    value={form.title}
                    onChange={handleChange}
                    placeholder="Title"
                    required
                    className="border rounded px-3 py-2"
                />
                <input
                    type="text"
                    name="author"
                    value={form.author}
                    onChange={handleChange}
                    placeholder="Author"
                    required
                    className="border rounded px-3 py-2"
                />
                <input
                    type="number"
                    name="price"
                    value={form.price}
                    onChange={handleChange}
                    placeholder="Price"
                    required
                    className="border rounded px-3 py-2"
                />
                <input
                    type="text"
                    name="cover_image"
                    value={form.cover_image}
                    onChange={handleChange}
                    placeholder="Cover Image URL"
                    className="border rounded px-3 py-2"
                />
                <input
                    type="text"
                    name="isbn"
                    value={form.isbn}
                    onChange={handleChange}
                    placeholder="ISBN"
                    className="border rounded px-3 py-2"
                />
                <textarea
                    name="description"
                    value={form.description}
                    onChange={handleChange}
                    placeholder="Description"
                    className="border rounded px-3 py-2"
                />
                <div className="flex justify-end gap-2 mt-4">
                    <button
                        type="button"
                        onClick={onClose}
                        className="px-4 py-2 rounded bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200"
                    >
                        Cancel
                    </button>
                    <button
                        type="submit"
                        disabled={formProcessing}
                        className="px-4 py-2 rounded bg-blue-600 text-white font-semibold hover:bg-blue-700"
                    >
                        {isEdit ? 'Update' : 'Save'}
                    </button>
                </div>
            </form>
        </Modal>
    );
}
