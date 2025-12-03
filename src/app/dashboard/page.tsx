'use client';

import { useAuth } from '@/hooks/useAuth';
import { FaRocket, FaShieldAlt, FaCode, FaChartLine } from 'react-icons/fa';

const stats = [
    { name: 'Total Audits', value: '12', icon: FaShieldAlt, color: 'text-blue-600', bg: 'bg-blue-50' },
    { name: 'Active Projects', value: '3', icon: FaCode, color: 'text-purple-600', bg: 'bg-purple-50' },
    { name: 'Security Score', value: '94%', icon: FaChartLine, color: 'text-green-600', bg: 'bg-green-50' },
    { name: 'Gas Saved', value: '2.4K', icon: FaRocket, color: 'text-orange-600', bg: 'bg-orange-50' },
];

export default function DashboardPage() {
    const { user } = useAuth();

    return (
        <div className="space-y-8 max-w-6xl mx-auto">
            {/* Welcome Section */}
            <div className="bg-white rounded-2xl p-8 border border-gray-200 shadow-sm">
                <h1 className="text-3xl font-bold text-[#171717] mb-2 font-manrope">
                    Welcome back, {user?.displayName?.split(' ')[0] || 'User'}! 👋
                </h1>
                <p className="text-gray-600">
                    Here&apos;s what&apos;s happening with your smart contracts today.
                </p>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {stats.map((stat) => {
                    const Icon = stat.icon;
                    return (
                        <div
                            key={stat.name}
                            className="bg-white rounded-2xl p-6 shadow-sm border border-gray-200 hover:shadow-md transition-shadow duration-200"
                        >
                            <div className="flex items-center justify-between mb-4">
                                <div className={`p-3 rounded-xl ${stat.bg}`}>
                                    <Icon className={`text-2xl ${stat.color}`} />
                                </div>
                            </div>
                            <p className="text-gray-500 text-sm font-medium mb-1">{stat.name}</p>
                            <p className="text-3xl font-bold text-[#171717] font-manrope">{stat.value}</p>
                        </div>
                    );
                })}
            </div>

            {/* Recent Activity */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
                <h2 className="text-xl font-bold text-[#171717] mb-6 font-manrope">Recent Activity</h2>
                <div className="space-y-4">
                    {[
                        { action: 'Security audit completed', contract: 'TokenContract.sol', time: '2 hours ago', status: 'success' },
                        { action: 'Gas optimization started', contract: 'NFTMarketplace.sol', time: '5 hours ago', status: 'pending' },
                        { action: 'Vulnerability scan', contract: 'StakingPool.sol', time: '1 day ago', status: 'warning' },
                    ].map((activity, index) => (
                        <div
                            key={index}
                            className="flex items-center justify-between p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors border border-gray-100"
                        >
                            <div className="flex-1">
                                <p className="font-semibold text-[#171717]">{activity.action}</p>
                                <p className="text-sm text-gray-500">{activity.contract}</p>
                            </div>
                            <div className="text-right">
                                <span
                                    className={`inline-block px-3 py-1 rounded-full text-xs font-semibold ${activity.status === 'success'
                                        ? 'bg-green-100 text-green-700'
                                        : activity.status === 'warning'
                                            ? 'bg-yellow-100 text-yellow-800'
                                            : 'bg-blue-100 text-blue-700'
                                        }`}
                                >
                                    {activity.status.charAt(0).toUpperCase() + activity.status.slice(1)}
                                </span>
                                <p className="text-xs text-gray-400 mt-1">{activity.time}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Quick Actions */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-[#171717] rounded-2xl p-8 text-white shadow-lg cursor-pointer group hover:bg-black transition-colors">
                    <h3 className="text-xl font-bold mb-2 font-manrope">Start New Audit</h3>
                    <p className="text-gray-400 mb-6">
                        Upload your smart contract for comprehensive security analysis
                    </p>
                    <button className="px-6 py-3 bg-[#FED835] text-black rounded-xl font-bold hover:bg-[#e5c230] transition-colors">
                        Get Started
                    </button>
                </div>

                <div className="bg-white rounded-2xl p-8 border border-gray-200 shadow-sm cursor-pointer group hover:border-[#FED835] transition-colors">
                    <h3 className="text-xl font-bold mb-2 text-[#171717] font-manrope">Optimize Gas Usage</h3>
                    <p className="text-gray-600 mb-6">
                        Reduce transaction costs with AI-powered optimization
                    </p>
                    <button className="px-6 py-3 bg-gray-100 text-[#171717] rounded-xl font-bold group-hover:bg-gray-200 transition-colors">
                        Optimize Now
                    </button>
                </div>
            </div>
        </div>
    );
}
