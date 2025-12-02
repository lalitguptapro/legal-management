'use client';

import { useEffect, useState, use } from 'react';
import { LawyerForm } from '@/components/lawyers/LawyerForm';
import supabase from '@/app/api/clients';

export default function EditLawyerPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = use(params);
    const [lawyer, setLawyer] = useState<any>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchLawyer = async () => {
            try {
                const { data, error } = await supabase
                    .from('lawyers')
                    .select('*')
                    .eq('id', id)
                    .single();

                if (error) throw error;
                setLawyer(data);
            } catch (error) {
                console.error('Error fetching lawyer:', error);
            } finally {
                setLoading(false);
            }
        };

        if (id) {
            fetchLawyer();
        }
    }, [id]);

    if (loading) {
        return <div className="p-6 text-center text-slate-500">Loading lawyer details...</div>;
    }

    if (!lawyer) {
        return <div className="p-6 text-center text-red-500">Lawyer not found.</div>;
    }

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <h1 className="text-2xl font-bold text-slate-800">Edit Lawyer</h1>
            </div>
            <LawyerForm initialData={lawyer} isEdit={true} />
        </div>
    );
}
