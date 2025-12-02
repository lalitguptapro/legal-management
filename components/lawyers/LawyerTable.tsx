'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import supabase from '@/app/api/clients';
import { Eye, Edit, Trash2, Mail, Phone, Copy, MoreHorizontal } from "lucide-react";
import { toast } from 'sonner';
import { ConfirmationModal } from '@/components/ui/ConfirmationModal';

type Lawyer = {
    id: string;
    name: string;
    specialization: string; // mapped from lawyer_type
    email: string;
    phone: string; // mapped from mobile
    activeCases: number; // Placeholder or calculated
    lawyer_type: string;
    mobile: string;
    [key: string]: any;
};

export function LawyerTable() {
    const router = useRouter();
    const [lawyers, setLawyers] = useState<Lawyer[]>([]);
    const [loading, setLoading] = useState(true);
    const [activeMenu, setActiveMenu] = useState<string | null>(null);

    // Modal State
    const [modalOpen, setModalOpen] = useState(false);
    const [modalConfig, setModalConfig] = useState<{
        type: 'delete' | 'duplicate';
        data: Lawyer | null;
        title: string;
        message: string;
        variant: 'danger' | 'primary';
        confirmText: string;
    }>({
        type: 'delete',
        data: null,
        title: '',
        message: '',
        variant: 'primary',
        confirmText: ''
    });
    const [actionLoading, setActionLoading] = useState(false);

    useEffect(() => {
        fetchLawyers();
    }, []);

    const fetchLawyers = async () => {
        try {
            const { data, error } = await supabase
                .from('lawyers')
                .select('*')
                .order('created_at', { ascending: false });

            if (error) throw error;

            setLawyers(data || []);
        } catch (error) {
            console.error('Error fetching lawyers:', error);
            toast.error('Failed to fetch lawyers');
        } finally {
            setLoading(false);
        }
    };

    const confirmDelete = (lawyer: Lawyer) => {
        setModalConfig({
            type: 'delete',
            data: lawyer,
            title: 'Delete Lawyer',
            message: `Are you sure you want to delete ${lawyer.name}? This action cannot be undone.`,
            variant: 'danger',
            confirmText: 'Delete'
        });
        setModalOpen(true);
    };

    const confirmDuplicate = (lawyer: Lawyer) => {
        setModalConfig({
            type: 'duplicate',
            data: lawyer,
            title: 'Duplicate Lawyer',
            message: `Are you sure you want to create a copy of ${lawyer.name}?`,
            variant: 'primary',
            confirmText: 'Duplicate'
        });
        setModalOpen(true);
    };

    const handleConfirm = async () => {
        if (!modalConfig.data) return;
        setActionLoading(true);

        try {
            if (modalConfig.type === 'delete') {
                const { error } = await supabase
                    .from('lawyers')
                    .delete()
                    .eq('id', modalConfig.data.id);

                if (error) throw error;

                setLawyers(lawyers.filter(l => l.id !== modalConfig.data!.id));
                toast.success('Lawyer deleted successfully');
            } else if (modalConfig.type === 'duplicate') {
                const { id, created_at, ...lawyerData } = modalConfig.data;
                const newLawyer = {
                    ...lawyerData,
                    name: `${lawyerData.name} (Copy)`
                };

                const { data, error } = await supabase
                    .from('lawyers')
                    .insert(newLawyer)
                    .select()
                    .single();

                if (error) throw error;

                setLawyers([data, ...lawyers]);
                toast.success('Lawyer duplicated successfully');
            }
            setModalOpen(false);
        } catch (error: any) {
            toast.error(`Error ${modalConfig.type === 'delete' ? 'deleting' : 'duplicating'} lawyer: ` + error.message);
        } finally {
            setActionLoading(false);
        }
    };

    if (loading) {
        return <div className="p-6 text-center text-slate-500">Loading lawyers...</div>;
    }

    return (
        <>
            <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden min-h-[400px]">
                <div className="px-6 py-4 border-b border-slate-200 flex justify-between items-center">
                    <h2 className="text-lg font-semibold text-slate-800">Lawyers Directory</h2>
                    <button className="px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 transition-colors">
                        Export CSV
                    </button>
                </div>
                <div className="overflow-x-auto">
                    <table className="w-full text-left text-sm text-slate-600">
                        <thead className="bg-slate-50 text-slate-900 font-medium">
                            <tr>
                                <th className="px-6 py-3">Name</th>
                                <th className="px-6 py-3">Specialization</th>
                                <th className="px-6 py-3">Contact</th>
                                <th className="px-6 py-3">Active Cases</th>
                                <th className="px-6 py-3 text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-200">
                            {lawyers.length === 0 ? (
                                <tr>
                                    <td colSpan={5} className="px-6 py-8 text-center text-slate-500">
                                        No lawyers found. Add one to get started.
                                    </td>
                                </tr>
                            ) : (
                                lawyers.map((l) => (
                                    <tr key={l.id} className="hover:bg-slate-50 transition-colors group">
                                        <td className="px-6 py-4">
                                            <div className="flex items-center gap-3">
                                                <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-bold uppercase">
                                                    {l.name.charAt(0)}
                                                </div>
                                                <span className="font-medium text-slate-900">{l.name}</span>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">{l.lawyer_type || '-'}</td>
                                        <td className="px-6 py-4">
                                            <div className="flex flex-col gap-1">
                                                {l.email && (
                                                    <div className="flex items-center gap-2 text-xs">
                                                        <Mail className="w-3 h-3" /> {l.email}
                                                    </div>
                                                )}
                                                {l.mobile && (
                                                    <div className="flex items-center gap-2 text-xs">
                                                        <Phone className="w-3 h-3" /> {l.mobile}
                                                    </div>
                                                )}
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">0</td> {/* Placeholder for now */}
                                        <td className="px-6 py-4 text-right relative">
                                            <div className="flex items-center justify-end gap-2">
                                                <button
                                                    onClick={() => router.push(`/lawyers/edit/${l.id}`)}
                                                    className="p-1 text-slate-400 hover:text-blue-600 transition-colors"
                                                    title="Edit"
                                                >
                                                    <Edit className="w-4 h-4" />
                                                </button>
                                                <button
                                                    onClick={() => confirmDuplicate(l)}
                                                    className="p-1 text-slate-400 hover:text-blue-600 transition-colors"
                                                    title="Duplicate"
                                                >
                                                    <Copy className="w-4 h-4" />
                                                </button>
                                                <button
                                                    onClick={() => confirmDelete(l)}
                                                    className="p-1 text-slate-400 hover:text-red-600 transition-colors"
                                                    title="Delete"
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
            </div>

            <ConfirmationModal
                isOpen={modalOpen}
                onClose={() => setModalOpen(false)}
                onConfirm={handleConfirm}
                title={modalConfig.title}
                message={modalConfig.message}
                variant={modalConfig.variant}
                confirmText={modalConfig.confirmText}
                isLoading={actionLoading}
            />
        </>
    );
}
