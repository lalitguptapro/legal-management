'use client';

import { useState, useEffect } from 'react';
import supabase from '@/app/api/clients';
import { Eye, Edit, Trash2 } from "lucide-react";
import { toast } from 'sonner';

type Case = {
    id: string;
    title: string;
    case_number: string;
    status: "Open" | "Pending" | "Closed";
    case_type: string;
    start_date: string;
    clients: { name: string } | null; // Joined
    lawyers: { name: string } | null; // Joined
};

export function CaseTable({ title, filterStatus }: { title: string, filterStatus?: string }) {
    const [cases, setCases] = useState<Case[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchCases();
    }, [filterStatus]);

    const fetchCases = async () => {
        try {
            let query = supabase
                .from('cases')
                .select(`
                    *,
                    clients (name),
                    lawyers (name)
                `)
                .order('created_at', { ascending: false });

            if (filterStatus) {
                query = query.eq('status', filterStatus);
            }

            const { data, error } = await query;

            if (error) throw error;

            setCases(data || []);
        } catch (error) {
            console.error('Error fetching cases:', error);
            toast.error('Failed to fetch cases');
        } finally {
            setLoading(false);
        }
    };

    if (loading) {
        return <div className="p-6 text-center text-slate-500">Loading cases...</div>;
    }

    return (
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
            <div className="px-6 py-4 border-b border-slate-200 flex justify-between items-center">
                <h2 className="text-lg font-semibold text-slate-800">{title}</h2>
                <button className="px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 transition-colors">
                    Export CSV
                </button>
            </div>
            <div className="overflow-x-auto">
                <table className="w-full text-left text-sm text-slate-600">
                    <thead className="bg-slate-50 text-slate-900 font-medium">
                        <tr>
                            <th className="px-6 py-3">Case ID</th>
                            <th className="px-6 py-3">Title</th>
                            <th className="px-6 py-3">Client</th>
                            <th className="px-6 py-3">Lawyer</th>
                            <th className="px-6 py-3">Type</th>
                            <th className="px-6 py-3">Status</th>
                            <th className="px-6 py-3">Start Date</th>
                            <th className="px-6 py-3 text-right">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-200">
                        {cases.length === 0 ? (
                            <tr>
                                <td colSpan={8} className="px-6 py-8 text-center text-slate-500">
                                    No cases found.
                                </td>
                            </tr>
                        ) : (
                            cases.map((c) => (
                                <tr key={c.id} className="hover:bg-slate-50 transition-colors">
                                    <td className="px-6 py-4 font-medium text-slate-900">{c.case_number || '-'}</td>
                                    <td className="px-6 py-4">{c.title}</td>
                                    <td className="px-6 py-4">{c.clients?.name || '-'}</td>
                                    <td className="px-6 py-4">{c.lawyers?.name || '-'}</td>
                                    <td className="px-6 py-4">{c.case_type}</td>
                                    <td className="px-6 py-4">
                                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium
                                            ${c.status === 'Open' ? 'bg-green-100 text-green-800' :
                                                c.status === 'Pending' ? 'bg-yellow-100 text-yellow-800' :
                                                    'bg-slate-100 text-slate-800'}`}>
                                            {c.status}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4">{c.start_date || '-'}</td>
                                    <td className="px-6 py-4 text-right">
                                        <div className="flex items-center justify-end gap-2">
                                            <button className="p-1 text-slate-400 hover:text-blue-600 transition-colors"><Eye className="w-4 h-4" /></button>
                                            <button className="p-1 text-slate-400 hover:text-blue-600 transition-colors"><Edit className="w-4 h-4" /></button>
                                            <button className="p-1 text-slate-400 hover:text-red-600 transition-colors"><Trash2 className="w-4 h-4" /></button>
                                        </div>
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
