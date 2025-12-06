'use client';

import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';
import { Users, Mail, Calendar, DollarSign, TrendingUp, Clock } from 'lucide-react';

export default function Dashboard() {
    const [stats, setStats] = useState({
        contacts: 0,
        emails: 0,
        appointments: 0,
        revenue: 0,
        conversionRate: 0,
        avgResponseTime: 0,
    });
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchDashboardStats();
    }, []);

    const fetchDashboardStats = async () => {
        try {
            // Fetch contacts count
            const { count: contactsCount } = await supabase
                .from('contacts')
                .select('*', { count: 'exact', head: true });

            // Fetch emails count
            const { count: emailsCount } = await supabase
                .from('email_templates')
                .select('*', { count: 'exact', head: true });

            // Fetch appointments count
            const { count: appointmentsCount } = await supabase
                .from('appointments')
                .select('*', { count: 'exact', head: true });

            setStats({
                contacts: contactsCount || 0,
                emails: emailsCount || 0,
                appointments: appointmentsCount || 0,
                revenue: 0,
                conversionRate: 0,
                avgResponseTime: 0,
            });
        } catch (error) {
            console.error('Error fetching dashboard stats:', error);
        } finally {
            setLoading(false);
        }
    };

    if (loading) {
        return (
            <div className="flex items-center justify-center h-64">
                <div className="text-gray-500">Loading dashboard...</div>
            </div>
        );
    }

    const statCards = [
        {
            title: 'Total Contacts',
            value: stats.contacts.toLocaleString(),
            icon: Users,
            color: 'bg-blue-500',
            bgGradient: 'from-blue-500 to-blue-600',
        },
        {
            title: 'Emails Sent',
            value: stats.emails.toLocaleString(),
            icon: Mail,
            color: 'bg-green-500',
            bgGradient: 'from-green-500 to-green-600',
        },
        {
            title: 'Appointments',
            value: stats.appointments.toLocaleString(),
            icon: Calendar,
            color: 'bg-purple-500',
            bgGradient: 'from-purple-500 to-purple-600',
        },
        {
            title: 'Revenue',
            value: `$${stats.revenue.toLocaleString()}`,
            icon: DollarSign,
            color: 'bg-yellow-500',
            bgGradient: 'from-yellow-500 to-yellow-600',
        },
        {
            title: 'Conversion Rate',
            value: `${stats.conversionRate}%`,
            icon: TrendingUp,
            color: 'bg-indigo-500',
            bgGradient: 'from-indigo-500 to-indigo-600',
        },
        {
            title: 'Avg Response Time',
            value: `${stats.avgResponseTime}h`,
            icon: Clock,
            color: 'bg-pink-500',
            bgGradient: 'from-pink-500 to-pink-600',
        },
    ];

    return (
        <div className="p-6 space-y-6">
            <div>
                <h1 className="text-2xl font-semibold text-gray-900">Dashboard</h1>
                <p className="text-gray-600 mt-1">Welcome to your legal management system</p>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {statCards.map((stat, index) => (
                    <div
                        key={index}
                        className="bg-white rounded-lg border border-gray-200 p-6 hover:shadow-md transition-shadow"
                    >
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm text-gray-600 mb-1">{stat.title}</p>
                                <p className="text-2xl font-semibold text-gray-900">{stat.value}</p>
                            </div>
                            <div className={`bg-gradient-to-br ${stat.bgGradient} p-3 rounded-lg`}>
                                <stat.icon className="w-6 h-6 text-white" />
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Recent Activity and Quick Actions */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="bg-white rounded-lg border border-gray-200 p-6">
                    <h2 className="text-lg font-semibold text-gray-900 mb-4">Recent Activity</h2>
                    <div className="space-y-3">
                        <p className="text-sm text-gray-500">No recent activity</p>
                    </div>
                </div>

                <div className="bg-white rounded-lg border border-gray-200 p-6">
                    <h2 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h2>
                    <div className="space-y-2">
                        <button className="w-full text-left px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50 rounded-lg transition-colors">
                            Create New Contact
                        </button>
                        <button className="w-full text-left px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50 rounded-lg transition-colors">
                            Schedule Appointment
                        </button>
                        <button className="w-full text-left px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50 rounded-lg transition-colors">
                            Send Email Campaign
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
