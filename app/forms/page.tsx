'use client';

import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';
import { Plus, Search, Lock, Copy, Trash2, FileText, Edit } from 'lucide-react';
import { toast } from 'sonner';
import Link from 'next/link';
import { DeleteConfirmModal } from '@/components/ui/DeleteConfirmModal';

interface Form {
    id: string;
    name: string;
    description?: string;
    is_password_protected: boolean;
    created_at: string;
    updated_at: string;
}

export default function FormsPage() {
    const [forms, setForms] = useState<Form[]>([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const [deleteModal, setDeleteModal] = useState<{ isOpen: boolean; form: Form | null }>({
        isOpen: false,
        form: null,
    });

    useEffect(() => {
        fetchForms();
    }, []);

    const fetchForms = async () => {
        try {
            const { data, error } = await supabase
                .from('forms')
                .select('*')
                .order('created_at', { ascending: false });

            if (error) throw error;
            setForms(data || []);
        } catch (error: any) {
            console.error('Error fetching forms:', error);
            toast.error('Failed to fetch forms');
        } finally {
            setLoading(false);
        }
    };

    const handleCopyLink = (formId: string) => {
        const link = `${window.location.origin}/forms/${formId}`;
        navigator.clipboard.writeText(link);
        toast.success('Form link copied to clipboard');
    };

    const handleDelete = async (form: Form) => {
        try {
            const { error } = await supabase
                .from('forms')
                .delete()
                .eq('id', form.id);

            if (error) throw error;
            toast.success('Form deleted successfully');
            fetchForms();
        } catch (error: any) {
            toast.error(error.message || 'Failed to delete form');
        }
    };

    const filteredForms = forms.filter(form =>
        form.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    if (loading) {
        return (
            <div className="flex items-center justify-center h-64">
                <div className="text-gray-500">Loading forms...</div>
            </div>
        );
    }

    return (
        <>
            <div className="p-6 space-y-6">
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-2xl font-semibold text-gray-900">Forms</h1>
                        <p className="text-gray-600 mt-1">Create and manage custom intake forms</p>
                    </div>
                    <Link
                        href="/forms/create"
                        className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors"
                    >
                        <Plus className="w-4 h-4" />
                        Create Form
                    </Link>
                </div>

                <div className="bg-white rounded-lg border border-gray-200">
                    <div className="p-4 border-b border-gray-200">
                        <div className="relative">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                            <input
                                type="text"
                                placeholder="Search forms..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="w-full pl-10 pr-4 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-gray-50"
                            />
                        </div>
                    </div>

                    <div className="divide-y divide-gray-200">
                        {filteredForms.length === 0 ? (
                            <div className="p-12 text-center text-gray-500">
                                No forms found. Create your first form to get started.
                            </div>
                        ) : (
                            filteredForms.map((form) => (
                                <div key={form.id} className="p-6 hover:bg-gray-50 transition-colors">
                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center gap-4 flex-1">
                                            <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg flex items-center justify-center">
                                                <FileText className="w-6 h-6 text-white" />
                                            </div>
                                            <div className="flex-1">
                                                <div className="flex items-center gap-2">
                                                    <h3 className="font-semibold text-gray-900">{form.name}</h3>
                                                    {form.is_password_protected && (
                                                        <Lock className="w-4 h-4 text-gray-400" />
                                                    )}
                                                </div>
                                                {form.description && (
                                                    <p className="text-sm text-gray-500 mt-1">{form.description}</p>
                                                )}
                                                <div className="flex items-center gap-4 mt-2 text-xs text-gray-400">
                                                    <span>Created {new Date(form.created_at).toLocaleDateString()}</span>
                                                    <span>Updated {new Date(form.updated_at).toLocaleDateString()}</span>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <button
                                                onClick={() => handleCopyLink(form.id)}
                                                className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
                                                title="Copy form link"
                                            >
                                                <Copy className="w-4 h-4" />
                                            </button>
                                            <Link
                                                href={`/forms/${form.id}/edit`}
                                                className="px-4 py-2 text-sm font-medium text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                                            >
                                                Edit
                                            </Link>
                                            <button
                                                onClick={() => setDeleteModal({ isOpen: true, form })}
                                                className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                                            >
                                                <Trash2 className="w-4 h-4" />
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            ))
                        )}
                    </div>
                </div>
            </div>

            <DeleteConfirmModal
                isOpen={deleteModal.isOpen}
                onClose={() => setDeleteModal({ isOpen: false, form: null })}
                onConfirm={() => deleteModal.form && handleDelete(deleteModal.form)}
                title="Delete Form"
                message="Are you sure you want to delete this form? This action cannot be undone."
                itemName={deleteModal.form?.name}
            />
        </>
    );
}
