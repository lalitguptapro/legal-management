'use client';

import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';
import { Plus, MoreVertical } from 'lucide-react';
import { toast } from 'sonner';

interface PipelineStage {
    id: string;
    name: string;
    position: number;
    contacts: any[];
}

export default function PipelinePage() {
    const [stages, setStages] = useState<PipelineStage[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchPipeline();
    }, []);

    const fetchPipeline = async () => {
        try {
            // Fetch pipeline stages
            const { data: stagesData, error: stagesError } = await supabase
                .from('pipeline_stages')
                .select('*')
                .order('position', { ascending: true });

            if (stagesError) throw stagesError;

            // If no stages exist, create default stages
            if (!stagesData || stagesData.length === 0) {
                const defaultStages = [
                    { name: 'New Lead', position: 0 },
                    { name: 'Contacted', position: 1 },
                    { name: 'Qualified', position: 2 },
                    { name: 'Proposal', position: 3 },
                    { name: 'Negotiation', position: 4 },
                    { name: 'Won', position: 5 },
                    { name: 'Lost', position: 6 },
                ];

                const { data: newStages, error: insertError } = await supabase
                    .from('pipeline_stages')
                    .insert(defaultStages)
                    .select();

                if (insertError) throw insertError;
                setStages(newStages.map(s => ({ ...s, contacts: [] })));
            } else {
                // Fetch contacts for each stage
                const stagesWithContacts = await Promise.all(
                    stagesData.map(async (stage) => {
                        const { data: contacts } = await supabase
                            .from('contacts')
                            .select('*')
                            .eq('pipeline_stage_id', stage.id)
                            .order('updated_at', { ascending: false });

                        return { ...stage, contacts: contacts || [] };
                    })
                );
                setStages(stagesWithContacts);
            }
        } catch (error: any) {
            console.error('Error fetching pipeline:', error);
            toast.error(error.message || 'Failed to fetch pipeline');
        } finally {
            setLoading(false);
        }
    };

    if (loading) {
        return (
            <div className="flex items-center justify-center h-64">
                <div className="text-slate-500">Loading pipeline...</div>
            </div>
        );
    }

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold text-slate-900">Pipeline</h1>
                    <p className="text-slate-600 mt-2">Manage your sales pipeline</p>
                </div>
                <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                    <Plus className="w-5 h-5" />
                    Add Stage
                </button>
            </div>

            <div className="flex gap-4 overflow-x-auto pb-4">
                {stages.map((stage) => (
                    <div
                        key={stage.id}
                        className="flex-shrink-0 w-80 bg-slate-50 rounded-lg border border-slate-200"
                    >
                        <div className="p-4 border-b border-slate-200 bg-white rounded-t-lg">
                            <div className="flex items-center justify-between">
                                <h3 className="font-semibold text-slate-900">{stage.name}</h3>
                                <span className="text-sm text-slate-500 bg-slate-100 px-2 py-1 rounded">
                                    {stage.contacts.length}
                                </span>
                            </div>
                        </div>
                        <div className="p-4 space-y-3 max-h-[calc(100vh-300px)] overflow-y-auto">
                            {stage.contacts.length === 0 ? (
                                <div className="text-center text-slate-400 py-8 text-sm">
                                    No contacts in this stage
                                </div>
                            ) : (
                                stage.contacts.map((contact) => (
                                    <div
                                        key={contact.id}
                                        className="bg-white p-4 rounded-lg border border-slate-200 hover:shadow-md transition-shadow cursor-pointer"
                                    >
                                        <div className="flex items-start justify-between mb-2">
                                            <div>
                                                <h4 className="font-medium text-slate-900">
                                                    {contact.first_name} {contact.last_name}
                                                </h4>
                                                {contact.company && (
                                                    <p className="text-sm text-slate-500">{contact.company}</p>
                                                )}
                                            </div>
                                            <button className="text-slate-400 hover:text-slate-600">
                                                <MoreVertical className="w-4 h-4" />
                                            </button>
                                        </div>
                                        {contact.email && (
                                            <p className="text-xs text-slate-500 truncate">{contact.email}</p>
                                        )}
                                    </div>
                                ))
                            )}
                            <button className="w-full py-2 text-sm text-slate-500 hover:text-slate-700 border-2 border-dashed border-slate-300 rounded-lg hover:border-slate-400 transition-colors">
                                + Add Contact
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

