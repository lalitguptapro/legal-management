'use client';

import { useEffect, useState } from 'react';
import supabase from '../api/clients';

export default function VerifySupabase() {
    const [status, setStatus] = useState<'loading' | 'connected' | 'error'>('loading');
    const [message, setMessage] = useState('');

    useEffect(() => {
        async function checkConnection() {
            try {
                const { error } = await supabase.auth.getSession();
                if (error) throw error;
                setStatus('connected');
                setMessage('Successfully connected to Supabase!');
            } catch (e) {
                setStatus('error');
                setMessage((e as Error).message || 'Failed to connect');
            }
        }
        checkConnection();
    }, []);

    return (
        <div className="p-8">
            <h1 className="text-2xl font-bold mb-4">Supabase Connection Status</h1>
            {status === 'loading' && <p>Checking connection...</p>}
            {status === 'connected' && <p className="text-green-600 font-bold">{message}</p>}
            {status === 'error' && <p className="text-red-600 font-bold">Error: {message}</p>}
        </div>
    );
}
