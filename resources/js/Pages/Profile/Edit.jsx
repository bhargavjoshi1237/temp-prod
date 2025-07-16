import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import DeleteUserForm from './Partials/DeleteUserForm';
import UpdatePasswordForm from './Partials/UpdatePasswordForm';
import UpdateProfileInformationForm from './Partials/UpdateProfileInformationForm';

export default function Edit({ mustVerifyEmail, status }) {
    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-900">
                    Profile Settings
                </h2>
            }
        >
            <Head title="Profile" />

            <div className="py-8">
                <div className="mx-auto max-w-3xl space-y-8 px-4 sm:px-6 lg:px-8">
                    {/* Profile Information Section */}
                    <div className="bg-gray-200 p-6 shadow-sm rounded-xl border border-gray-100">
                        <div className="mb-6">
                            <h3 className="text-lg font-medium text-black">Profile Information</h3>
                            <p className="mt-1 text-sm text-gray-500">
                                Update your account's profile information and email address.
                            </p>
                        </div>
                        <UpdateProfileInformationForm
                            mustVerifyEmail={mustVerifyEmail}
                            status={status}
                        />
                    </div>

                    {/* Password Update Section */}
                    <div className="bg-gray-200 p-6 shadow-sm rounded-xl border border-gray-100">
                        <div className="mb-6">
                            <h3 className="text-lg font-medium text-gray-900">Update Password</h3>
                            <p className="mt-1 text-sm text-gray-500">
                                Ensure your account is using a long, random password to stay secure.
                            </p>
                        </div>
                        <UpdatePasswordForm />
                    </div>

                    {/* Account Deletion Section */}
                    <div className="bg-gray-200 p-6  shadow-sm rounded-xl border border-gray-100">
                        <div className="mb-6">
                            <h3 className="text-lg font-medium text-gray-900">Delete Account</h3>
                            <p className="mt-1 text-sm text-gray-500">
                                Once your account is deleted, all of its resources and data will be permanently removed.
                            </p>
                        </div>
                        <DeleteUserForm />
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}