'use client';

import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';
import { Plus, Search, Mail, Eye, MousePointerClick, Send, MoreVertical, Filter, Edit, Trash2 } from 'lucide-react';
import { toast } from 'sonner';
import Link from 'next/link';
import { DeleteConfirmModal } from '@/components/ui/DeleteConfirmModal';

interface Email {
    id: string;
    name: string;
    subject: string;
    email_type: string;
    tags?: string[];
    created_at: string;
    updated_at: string;
    stats?: {
        sends: number;
        opens: number;
        clicks: number;
    };
}

export default function EmailsPage() {
    const [emails, setEmails] = useState<Email[]>([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const [emailTypeFilter, setEmailTypeFilter] = useState<string>('all');
    const [deleteModal, setDeleteModal] = useState<{ isOpen: boolean; email: Email | null }>({
        isOpen: false,
        email: null,
    });

    useEffect(() => {
        fetchEmails();
    }, []);

    const fetchEmails = async () => {
        try {
            const { data, error } = await supabase
                .from('email_templates')
                .select('*')
                .order('updated_at', { ascending: false });

            if (error) throw error;

            const emailsWithStats = await Promise.all(
                (data || []).map(async (email) => {
                    const { count: sendsCount } = await supabase
                        .from('email_sends')
                        .select('*', { count: 'exact', head: true })
                        .eq('template_id', email.id);

                    const { count: opensCount } = await supabase
                        .from('email_sends')
                        .select('*', { count: 'exact', head: true })
                        .eq('template_id', email.id)
                        .not('opened_at', 'is', null);

                    const { count: clicksCount } = await supabase
                        .from('email_sends')
                        .select('*', { count: 'exact', head: true })
                        .eq('template_id', email.id)
                        .not('clicked_at', 'is', null);

                    return {
                        ...email,
                        stats: {
                            sends: sendsCount || 0,
                            opens: opensCount || 0,
                            clicks: clicksCount || 0,
                        },
                    };
                })
            );

            setEmails(emailsWithStats);
        } catch (error: any) {
            console.error('Error fetching emails:', error);
            toast.error('Failed to fetch emails');
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (email: Email) => {
        try {
            const { error } = await supabase
                .from('email_templates')
                .delete()
                .eq('id', email.id);

            if (error) throw error;

            toast.success('Email template deleted successfully');
            fetchEmails();
        } catch (error: any) {
            console.error('Error deleting email:', error);
            toast.error(error.message || 'Failed to delete email');
        }
    };

    const filteredEmails = emails.filter(email => {
        const matchesSearch = email.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            email.subject.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesType = emailTypeFilter === 'all' || email.email_type === emailTypeFilter;
        return matchesSearch && matchesType;
    });

    const calculateOpenRate = (sends: number, opens: number) => {
        if (sends === 0) return '0.00';
        return ((opens / sends) * 100).toFixed(2);
    };

    if (loading) {
        return (
            <div className="flex items-center justify-center h-64">
                <div className="text-gray-500">Loading emails...</div>
            </div>
        );
    }

    return (
        <>
            <div className="p-6 space-y-6">
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-2xl font-semibold text-gray-900">Emails</h1>
                    </div>
                    <div className="flex items-center gap-3">
                        <Link
                            href="/emails/builder"
                            className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                        >
                            Email Builder
                        </Link>
                        <Link
                            href="/emails/create"
                            className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors"
                        >
                            <Plus className="w-4 h-4" />
                            Create Email
                        </Link>
                    </div>
                </div>

                <div className="bg-white rounded-lg border border-gray-200">
                    <div className="p-4 border-b border-gray-200 flex items-center gap-4">
                        <div className="flex-1 relative">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                            <input
                                type="text"
                                placeholder="Search emails..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="w-full pl-10 pr-4 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-gray-50"
                            />
                        </div>
                        <select
                            value={emailTypeFilter}
                            onChange={(e) => setEmailTypeFilter(e.target.value)}
                            className="px-4 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
                        >
                            <option value="all">Email types</option>
                            <option value="Workflow/Campaign">Workflow/Campaign</option>
                            <option value="One-time">One-time</option>
                            <option value="Newsletter">Newsletter</option>
                        </select>
                    </div>

                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead className="bg-gray-50 border-b border-gray-200">
                                <tr>
                                    <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                                        Email Name
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                                        Subject
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                                        Email type
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                                        Sends
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                                        Opens
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                                        Open Rate
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                                        Tags
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                                        Update At
                                    </th>
                                    <th className="px-6 py-3 text-right text-xs font-semibold text-gray-500 uppercase tracking-wider">
                                        
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200">
                                {filteredEmails.length === 0 ? (
                                    <tr>
                                        <td colSpan={9} className="px-6 py-12 text-center text-gray-500">
                                            No emails found. Create your first email to get started.
                                        </td>
                                    </tr>
                                ) : (
                                    filteredEmails.map((email) => (
                                        <tr key={email.id} className="hover:bg-gray-50 transition-colors">
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <div className="text-sm font-medium text-gray-900">{email.name}</div>
                                            </td>
                                            <td className="px-6 py-4">
                                                <div className="text-sm text-gray-900 max-w-md truncate">{email.subject}</div>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <span className="text-sm text-gray-600">
                                                    {email.email_type || 'Workflow/Campaign'}
                                                </span>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <div className="text-sm text-gray-900">
                                                    {email.stats?.sends.toLocaleString() || 0}
                                                </div>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <div className="text-sm text-gray-900">
                                                    {email.stats?.opens.toLocaleString() || 0}
                                                </div>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <div className="text-sm text-gray-900">
                                                    {calculateOpenRate(email.stats?.sends || 0, email.stats?.opens || 0)}%
                                                </div>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <div className="flex flex-wrap gap-1">
                                                    {email.tags && email.tags.length > 0 ? (
                                                        email.tags.slice(0, 2).map((tag, idx) => (
                                                            <span key={idx} className="px-2 py-0.5 text-xs bg-gray-100 text-gray-600 rounded">
                                                                {tag}
                                                            </span>
                                                        ))
                                                    ) : (
                                                        <span className="text-xs text-gray-400">—</span>
                                                    )}
                                                </div>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <div className="text-sm text-gray-500">
                                                    {new Date(email.updated_at).toLocaleDateString('en-US', {
                                                        month: '2-digit',
                                                        day: '2-digit',
                                                        year: 'numeric',
                                                        hour: 'numeric',
                                                        minute: '2-digit',
                                                    })}
                                                </div>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-right">
                                                <div className="flex items-center justify-end gap-2">
                                                    <Link
                                                        href={`/emails/${email.id}/edit`}
                                                        className="p-1 text-blue-600 hover:text-blue-800 rounded transition-colors"
                                                    >
                                                        <Edit className="w-4 h-4" />
                                                    </Link>
                                                    <button
                                                        onClick={() => setDeleteModal({ isOpen: true, email })}
                                                        className="p-1 text-red-600 hover:text-red-800 rounded transition-colors"
                                                    >
                                                        <Trash2 className="w-4 h-4" />
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))
                                )}
                            </tbody>
                        </table>
                    </div>

                    <div className="px-6 py-4 border-t border-gray-200 flex items-center justify-between">
                        <div className="text-sm text-gray-500">
                            Show <select className="mx-1 px-2 py-1 border border-gray-200 rounded text-sm">
                                <option>11</option>
                                <option>25</option>
                                <option>50</option>
                                <option>100</option>
                            </select> items /page
                        </div>
                        <div className="flex items-center gap-2">
                            <button className="px-3 py-1 text-sm text-gray-600 hover:bg-gray-100 rounded">1</button>
                            <button className="px-3 py-1 text-sm text-gray-600 hover:bg-gray-100 rounded">2</button>
                        </div>
                    </div>
                </div>
            </div>

            <DeleteConfirmModal
                isOpen={deleteModal.isOpen}
                onClose={() => setDeleteModal({ isOpen: false, email: null })}
                onConfirm={() => deleteModal.email && handleDelete(deleteModal.email)}
                title="Delete Email Template"
                message="Are you sure you want to delete this email template? This action cannot be undone."
                itemName={deleteModal.email?.name}
            />
        </>
    );
}
