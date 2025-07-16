import { useState } from 'react';
import { useForm } from '@inertiajs/react';
import Modal from '@/Components/Modal';

export default function BookAddModal({ show, onClose, processing, onAddBook }) {
    const [form, setForm] = useState({
        title: '',
        author: '',
        price: '',
        cover_image: '',
        description: '',
        isbn: '',
    });

    const { post, processing: formProcessing, errors, reset } = useForm();

    const handleChange = e => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = e => {
        e.preventDefault();
        const trimmedForm = {
            ...form,
            title: form.title.trim(),
            author: form.author.trim(),
            price: form.price.trim(),
        };
        if (trimmedForm.title && trimmedForm.author && trimmedForm.price) {
            if (onAddBook) {
                onAddBook(trimmedForm);
            } else {
                post(route('books.store'), {
                    ...trimmedForm,
                    onSuccess: () => {
                        onClose();
                        reset();
                        setForm({
                            title: '',
                            author: '',
                            price: '',
                            cover_image: '',
                            description: '',
                            isbn: '',
                        });
                    }
                });
            }
        }
    };

    return (
        <Modal show={show} onClose={onClose} maxWidth="md">
            <div className="p-6 bg-white rounded-lg shadow-xl">
  <div className="flex items-center justify-between mb-6 border-b border-gray-100 pb-4">
    <h2 className="text-xl font-semibold text-gray-900">Add New Book</h2>
    <button
      onClick={onClose}
      className="p-1 text-gray-400 hover:text-gray-500 rounded-md hover:bg-gray-50 transition-colors"
      aria-label="Close"
    >
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
      </svg>
    </button>
  </div>
           
                
                
                {Object.keys(errors).length > 0 && (
                    <div className="mb-6 p-3 bg-red-50 rounded-lg text-red-600 text-sm border border-red-100">
                        <strong className="font-medium">Please fix these errors:</strong>
                        <ul className="mt-1.5 space-y-1.5">
                            {Object.entries(errors).map(([field, message]) => (
                                <li key={field} className="flex items-start">
                                    <span className="inline-block mr-1.5">•</span>
                                    <span>{message}</span>
                                </li>
                            ))}
                        </ul>
                    </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-5">
                    <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                        <div className="space-y-1.5">
                            <label htmlFor="title" className="block text-sm font-medium text-gray-700">
                                Title <span className="text-red-500">*</span>
                            </label>
                            <input
                                id="title"
                                type="text"
                                name="title"
                                value={form.title}
                                onChange={handleChange}
                                placeholder="Book title"
                                required
                                className="block w-full px-3 py-2 text-sm border border-gray-300 rounded-md shadow-sm focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                            />
                        </div>

                        <div className="space-y-1.5">
                            <label htmlFor="author" className="block text-sm font-medium text-gray-700">
                                Author <span className="text-red-500">*</span>
                            </label>
                            <input
                                id="author"
                                type="text"
                                name="author"
                                value={form.author}
                                onChange={handleChange}
                                placeholder="Author name"
                                required
                                className="block w-full px-3 py-2 text-sm border border-gray-300 rounded-md shadow-sm focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                            />
                        </div>

                        <div className="space-y-1.5">
                            <label htmlFor="price" className="block text-sm font-medium text-gray-700">
                                Price <span className="text-red-500">*</span>
                            </label>
                            <div className="relative rounded-md shadow-sm">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <span className="text-gray-500 sm:text-sm">€</span>
                                </div>
                                <input
                                    id="price"
                                    type="number"
                                    name="price"
                                    value={form.price}
                                    onChange={handleChange}
                                    placeholder="0.00"
                                    step="0.01"
                                    min="0"
                                    required
                                    className="block w-full pl-7 pr-3 py-2 text-sm border border-gray-300 rounded-md focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                                />
                            </div>
                        </div>

                        <div className="space-y-1.5">
                            <label htmlFor="isbn" className="block text-sm font-medium text-gray-700">
                                ISBN
                            </label>
                            <input
                                id="isbn"
                                type="text"
                                name="isbn"
                                value={form.isbn}
                                onChange={handleChange}
                                placeholder="ISBN number"
                                className="block w-full px-3 py-2 text-sm border border-gray-300 rounded-md shadow-sm focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                            />
                        </div>
                    </div>

                    <div className="space-y-1.5">
                        <label htmlFor="cover_image" className="block text-sm font-medium text-gray-700">
                            Cover Image URL
                        </label>
                        <input
                            id="cover_image"
                            type="url"
                            name="cover_image"
                            value={form.cover_image}
                            onChange={handleChange}
                            placeholder="https://example.com/image.jpg"
                            className="block w-full px-3 py-2 text-sm border border-gray-300 rounded-md shadow-sm focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                        />
                    </div>

                    <div className="space-y-1.5">
                        <label htmlFor="description" className="block text-sm font-medium text-gray-700">
                            Description
                        </label>
                        <textarea
                            id="description"
                            name="description"
                            value={form.description}
                            onChange={handleChange}
                            placeholder="Book description"
                            rows={4}
                            className="block w-full px-3 py-2 text-sm border border-gray-300 rounded-md shadow-sm focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                        />
                    </div>

                    <div className="flex justify-end space-x-3 pt-2">
                        <button
                            type="button"
                            onClick={onClose}
                            className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            disabled={formProcessing}
                            className="px-4 py-2 text-sm font-medium text-white bg-gray-900 rounded-md shadow-sm hover:bg-gray-700 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 transition-colors disabled:opacity-70 disabled:cursor-not-allowed"
                        >
                            {formProcessing ? (
                                <span className="flex items-center justify-center">
                                    <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                    </svg>
                                    Adding...
                                </span>
                            ) : 'Add Book'}
                        </button>
                    </div>
                </form>
            </div>
        </Modal>
    );
} 