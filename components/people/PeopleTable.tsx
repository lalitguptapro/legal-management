'use client';

import { useState, useEffect } from 'react';
import supabase from '@/lib/supabase';
import { Eye, Edit, Trash2, Mail, Phone } from "lucide-react";
import { toast } from 'sonner';

type Person = {
    id: string;
    first_name: string;
    last_name: string;
    role: string;
    email: string;
    mobile: string;
    cases: { title: string } | null; // Joined
};

export function PeopleTable({ title, filterRole }: { title: string, filterRole?: string }) {
    const [people, setPeople] = useState<Person[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchPeople = async () => {
            try {
                let query = supabase
                    .from('people')
                    .select(`
                        *,
                        cases (title)
                    `)
                    .order('created_at', { ascending: false });

                if (filterRole) {
                    query = query.eq('role', filterRole);
                }

                const { data, error } = await query;

                if (error) throw error;

                setPeople(data || []);
            } catch (error) {
                console.error('Error fetching people:', error);
                toast.error('Failed to fetch people: ' + ((error as Error).message || 'Unknown error'));
            } finally {
                setLoading(false);
            }
        };

        fetchPeople();
    }, [filterRole]);

    if (loading) {
        return <div className="p-6 text-center text-slate-500">Loading people...</div>;
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
                            <th className="px-6 py-3">ID</th>
                            <th className="px-6 py-3">Name</th>
                            <th className="px-6 py-3">Role</th>
                            <th className="px-6 py-3">Contact</th>
                            <th className="px-6 py-3">Associated Case</th>
                            <th className="px-6 py-3 text-right">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-200">
                        {people.length === 0 ? (
                            <tr>
                                <td colSpan={6} className="px-6 py-8 text-center text-slate-500">
                                    No people found.
                                </td>
                            </tr>
                        ) : (
                            people.map((p) => (
                                <tr key={p.id} className="hover:bg-slate-50 transition-colors">
                                    <td className="px-6 py-4 font-medium text-slate-900">{p.id.slice(0, 8)}...</td>
                                    <td className="px-6 py-4">
                                        <div className="flex items-center gap-3">
                                            <div className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center text-slate-600 font-bold">
                                                {p.first_name.charAt(0)}
                                            </div>
                                            {p.first_name} {p.last_name}
                                        </div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium
                                            ${p.role === 'Client' ? 'bg-green-100 text-green-800' :
                                                p.role === 'Witness' ? 'bg-purple-100 text-purple-800' :
                                                    'bg-red-100 text-red-800'}`}>
                                            {p.role}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="flex flex-col gap-1">
                                            {p.email && (
                                                <div className="flex items-center gap-2 text-xs">
                                                    <Mail className="w-3 h-3" /> {p.email}
                                                </div>
                                            )}
                                            {p.mobile && (
                                                <div className="flex items-center gap-2 text-xs">
                                                    <Phone className="w-3 h-3" /> {p.mobile}
                                                </div>
                                            )}
                                        </div>
                                    </td>
                                    <td className="px-6 py-4">{p.cases?.title || '-'}</td>
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
