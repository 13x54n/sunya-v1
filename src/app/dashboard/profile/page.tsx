'use client';

import { useAuth } from '@/hooks/useAuth';
import { FaEnvelope, FaUser, FaCalendar } from 'react-icons/fa';
import Image from 'next/image';

export default function ProfilePage() {
    const { user } = useAuth();

    if (!user) return null;

    return (
        <div className="space-y-8 max-w-4xl mx-auto">
            {/* Header */}
            <div>
                <h1 className="text-3xl font-bold text-[#171717] font-manrope">Profile</h1>
                <p className="text-gray-600 mt-2">Manage your account information</p>
            </div>

            {/* Profile Card */}
            <div className="bg-white rounded-2xl shadow-sm p-8 border border-gray-200">
                <div className="flex items-center gap-6 mb-8">
                    {user.photoURL ? (
                        <Image
                            src={user.photoURL}
                            alt={user.displayName || 'User'}
                            width={96}
                            height={96}
                            className="w-24 h-24 rounded-full border-4 border-gray-100"
                        />
                    ) : (
                        <div className="w-24 h-24 rounded-full bg-[#FED835] flex items-center justify-center text-[#171717] text-4xl font-bold border-4 border-gray-100">
                            {user.displayName?.[0] || user.email?.[0] || 'U'}
                        </div>
                    )}
                    <div>
                        <h2 className="text-2xl font-bold text-[#171717] font-manrope">
                            {user.displayName || 'User'}
                        </h2>
                        <p className="text-gray-600">{user.email}</p>
                    </div>
                </div>

                {/* Profile Information */}
                <div className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                            <label className="flex items-center gap-2 text-sm font-medium text-gray-700">
                                <FaUser className="text-gray-400" />
                                Display Name
                            </label>
                            <input
                                type="text"
                                value={user.displayName || ''}
                                readOnly
                                className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-[#171717]"
                            />
                        </div>

                        <div className="space-y-2">
                            <label className="flex items-center gap-2 text-sm font-medium text-gray-700">
                                <FaEnvelope className="text-gray-400" />
                                Email Address
                            </label>
                            <input
                                type="email"
                                value={user.email || ''}
                                readOnly
                                className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-[#171717]"
                            />
                        </div>

                        <div className="space-y-2">
                            <label className="flex items-center gap-2 text-sm font-medium text-gray-700">
                                <FaCalendar className="text-gray-400" />
                                Account Created
                            </label>
                            <input
                                type="text"
                                value={user.metadata.creationTime ? new Date(user.metadata.creationTime).toLocaleDateString() : 'N/A'}
                                readOnly
                                className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-[#171717]"
                            />
                        </div>

                        <div className="space-y-2">
                            <label className="flex items-center gap-2 text-sm font-medium text-gray-700">
                                <FaCalendar className="text-gray-400" />
                                Last Sign In
                            </label>
                            <input
                                type="text"
                                value={user.metadata.lastSignInTime ? new Date(user.metadata.lastSignInTime).toLocaleDateString() : 'N/A'}
                                readOnly
                                className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-[#171717]"
                            />
                        </div>
                    </div>
                </div>
            </div>

            {/* Account Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-white rounded-2xl p-6 border border-gray-200 shadow-sm">
                    <p className="text-gray-500 text-sm mb-1">Total Audits</p>
                    <p className="text-4xl font-bold text-[#171717] font-manrope">12</p>
                </div>
                <div className="bg-white rounded-2xl p-6 border border-gray-200 shadow-sm">
                    <p className="text-gray-500 text-sm mb-1">Active Projects</p>
                    <p className="text-4xl font-bold text-[#171717] font-manrope">3</p>
                </div>
                <div className="bg-white rounded-2xl p-6 border border-gray-200 shadow-sm">
                    <p className="text-gray-500 text-sm mb-1">Security Score</p>
                    <p className="text-4xl font-bold text-[#171717] font-manrope">94%</p>
                </div>
            </div>
        </div>
    );
}
