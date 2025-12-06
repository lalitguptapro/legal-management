'use client';

import { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { supabase } from '@/lib/supabase';
import { toast } from 'sonner';
import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';

export default function EditEmailPage() {
    const router = useRouter();
    const params = useParams();
    const emailId = params.id as string;
    const [loading, setLoading] = useState(false);
    const [fetching, setFetching] = useState(true);
    const [formData, setFormData] = useState({
        name: '',
        subject: '',
        html_content: '',
        text_content: '',
        email_type: 'Workflow/Campaign',
    });

    useEffect(() => {
        fetchEmail();
    }, [emailId]);

    const fetchEmail = async () => {
        try {
            const { data, error } = await supabase
                .from('email_templates')
                .select('*')
                .eq('id', emailId)
                .single();

            if (error) throw error;

            if (data) {
                setFormData({
                    name: data.name || '',
                    subject: data.subject || '',
                    html_content: data.html_content || '',
                    text_content: data.text_content || '',
                    email_type: data.email_type || 'Workflow/Campaign',
                });
            }
        } catch (error: any) {
            console.error('Error fetching email:', error);
            toast.error('Failed to load email');
            router.push('/emails');
        } finally {
            setFetching(false);
        }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        try {
            const { error } = await supabase
                .from('email_templates')
                .update({
                    ...formData,
                    updated_at: new Date().toISOString(),
                })
                .eq('id', emailId);

            if (error) throw error;

            toast.success('Email template updated successfully');
            router.push('/emails');
        } catch (error: any) {
            console.error('Error updating email:', error);
            toast.error(error.message || 'Failed to update email');
        } finally {
            setLoading(false);
        }
    };

    if (fetching) {
        return (
            <div className="flex items-center justify-center h-64">
                <div className="text-gray-500">Loading email...</div>
            </div>
        );
    }

    return (
        <div className="p-6 max-w-4xl mx-auto space-y-6">
            <div className="flex items-center gap-4">
                <Link
                    href="/emails"
                    className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                >
                    <ArrowLeft className="w-5 h-5" />
                </Link>
                <div>
                    <h1 className="text-2xl font-semibold text-gray-900">Edit Email Template</h1>
                    <p className="text-gray-600 mt-1">Update email template</p>
                </div>
            </div>

            <form onSubmit={handleSubmit} className="bg-white rounded-lg border border-gray-200 p-6 space-y-6">
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                        Email Name *
                    </label>
                    <input
                        type="text"
                        name="name"
                        required
                        value={formData.name}
                        onChange={handleChange}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                        Email Type
                    </label>
                    <select
                        name="email_type"
                        value={formData.email_type}
                        onChange={handleChange}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                        <option value="Workflow/Campaign">Workflow/Campaign</option>
                        <option value="One-time">One-time</option>
                        <option value="Newsletter">Newsletter</option>
                    </select>
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                        Subject *
                    </label>
                    <input
                        type="text"
                        name="subject"
                        required
                        value={formData.subject}
                        onChange={handleChange}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                        HTML Content *
                    </label>
                    <textarea
                        name="html_content"
                        required
                        value={formData.html_content}
                        onChange={handleChange}
                        rows={12}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 font-mono text-sm"
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                        Plain Text Content
                    </label>
                    <textarea
                        name="text_content"
                        value={formData.text_content}
                        onChange={handleChange}
                        rows={6}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>

                <div className="flex items-center justify-end gap-4 pt-4 border-t border-gray-200">
                    <Link
                        href="/emails"
                        className="px-6 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                    >
                        Cancel
                    </Link>
                    <button
                        type="submit"
                        disabled={loading}
                        className="px-6 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50"
                    >
                        {loading ? 'Updating...' : 'Update Email'}
                    </button>
                </div>
            </form>
        </div>
    );
}

