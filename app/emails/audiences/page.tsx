'use client';

import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';
import { Plus, Users } from 'lucide-react';
import { toast } from 'sonner';

interface Audience {
    id: string;
    name: string;
    description?: string;
    contact_count: number;
    created_at: string;
}

export default function AudiencesPage() {
    const [audiences, setAudiences] = useState<Audience[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchAudiences();
    }, []);

    const fetchAudiences = async () => {
        try {
            const { data, error } = await supabase
                .from('audiences')
                .select('*')
                .order('created_at', { ascending: false });

            if (error) throw error;
            setAudiences(data || []);
        } catch (error: unknown) {
            const errorMessage = error instanceof Error ? error.message : 'Failed to fetch audiences';
            console.error('Error fetching audiences:', error);
            toast.error(errorMessage);
        } finally {
            setLoading(false);
        }
    };

    if (loading) {
        return (
            <div className="flex items-center justify-center h-64">
                <div className="text-gray-500">Loading audiences...</div>
            </div>
        );
    }

    return (
        <div className="p-6 space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-semibold text-gray-900">Audiences</h1>
                    <p className="text-gray-600 mt-1">Segment your contacts for targeted campaigns</p>
                </div>
                <button className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors">
                    <Plus className="w-4 h-4" />
                    Create Audience
                </button>
            </div>

            <div className="bg-white rounded-lg border border-gray-200">
                <div className="divide-y divide-gray-200">
                    {audiences.length === 0 ? (
                        <div className="p-12 text-center text-gray-500">
                            No audiences found. Create your first audience to get started.
                        </div>
                    ) : (
                        audiences.map((audience) => (
                            <div key={audience.id} className="p-6 hover:bg-gray-50 transition-colors">
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-4">
                                        <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg flex items-center justify-center">
                                            <Users className="w-6 h-6 text-white" />
                                        </div>
                                        <div>
                                            <h3 className="font-semibold text-gray-900">{audience.name}</h3>
                                            {audience.description && (
                                                <p className="text-sm text-gray-500 mt-1">{audience.description}</p>
                                            )}
                                            <div className="flex items-center gap-4 mt-2 text-xs text-gray-400">
                                                <span>{audience.contact_count} contacts</span>
                                                <span>Created {new Date(audience.created_at).toLocaleDateString()}</span>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <button className="px-4 py-2 text-sm font-medium text-blue-600 hover:bg-blue-50 rounded-lg transition-colors">
                                            Edit
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))
                    )}
                </div>
            </div>
        </div>
    );
}
