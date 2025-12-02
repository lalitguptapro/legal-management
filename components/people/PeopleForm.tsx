'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import supabase from '@/app/api/clients';
import { Upload } from 'lucide-react';
import { toast } from 'sonner';

interface Case {
    id: string;
    title: string;
}

export function PeopleForm() {
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [cases, setCases] = useState<Case[]>([]);

    // Form State
    const [caseId, setCaseId] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [role, setRole] = useState('Client');
    const [mobile, setMobile] = useState('');
    const [email, setEmail] = useState('');
    const [addressLine1, setAddressLine1] = useState('');
    const [addressLine2, setAddressLine2] = useState('');
    const [city, setCity] = useState('');
    const [state, setState] = useState('');
    const [postalCode, setPostalCode] = useState('');
    const [country, setCountry] = useState('');

    useEffect(() => {
        fetchCases();
    }, []);

    const fetchCases = async () => {
        const { data, error } = await supabase.from('cases').select('id, title');
        if (data) setCases(data);
        if (error) console.error('Error fetching cases:', error);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        try {
            const { error } = await supabase.from('people').insert({
                case_id: caseId || null,
                first_name: firstName,
                last_name: lastName,
                role,
                mobile,
                email,
                address_line1: addressLine1,
                address_line2: addressLine2,
                city,
                state,
                postal_code: postalCode,
                country
            });

            if (error) throw error;

            toast.success('Person added successfully');
            router.push('/people'); // Redirect to people list (adjust path if needed)

            // Reset form
            setCaseId('');
            setFirstName('');
            setLastName('');
            setRole('Client');
            setMobile('');
            setEmail('');
            setAddressLine1('');
            setAddressLine2('');
            setCity('');
            setState('');
            setPostalCode('');
            setCountry('');

        } catch (error: any) {
            console.error('Error adding person:', error);
            toast.error('Error adding person: ' + error.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
            <h2 className="text-lg font-semibold text-slate-800 mb-6">Add People</h2>
            <form onSubmit={handleSubmit} className="space-y-6">

                <div className="space-y-2">
                    <label className="text-sm font-medium text-slate-700">Case</label>
                    <select value={caseId} onChange={e => setCaseId(e.target.value)} className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-slate-600">
                        <option value="">-Select-</option>
                        {cases.map(c => <option key={c.id} value={c.id}>{c.title}</option>)}
                    </select>
                </div>

                <div className="space-y-2">
                    <label className="text-sm font-medium text-slate-700">Name *</label>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <input required value={firstName} onChange={e => setFirstName(e.target.value)} type="text" className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="First Name" />
                        <input value={lastName} onChange={e => setLastName(e.target.value)} type="text" className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="Last Name" />
                    </div>
                </div>

                <div className="space-y-2">
                    <label className="text-sm font-medium text-slate-700">Type *</label>
                    <select required value={role} onChange={e => setRole(e.target.value)} className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-slate-600">
                        <option value="Client">Client</option>
                        <option value="Opposing client">Opposing client</option>
                        <option value="Witness">Witness</option>
                    </select>
                </div>

                <div className="space-y-2">
                    <label className="text-sm font-medium text-slate-700">Mobile Number *</label>
                    <input required value={mobile} onChange={e => setMobile(e.target.value)} type="tel" className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="e.g. +1 234 567 890" />
                </div>

                <div className="space-y-2">
                    <label className="text-sm font-medium text-slate-700">Email</label>
                    <input value={email} onChange={e => setEmail(e.target.value)} type="email" className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="e.g. john@email.com" />
                </div>

                <div className="space-y-2">
                    <label className="text-sm font-medium text-slate-700">Address</label>
                    <div className="space-y-4">
                        <input value={addressLine1} onChange={e => setAddressLine1(e.target.value)} type="text" className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="Address Line 1" />
                        <input value={addressLine2} onChange={e => setAddressLine2(e.target.value)} type="text" className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="Address Line 2" />
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <input value={city} onChange={e => setCity(e.target.value)} type="text" className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="City / District" />
                            <input value={state} onChange={e => setState(e.target.value)} type="text" className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="State / Province" />
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <input value={postalCode} onChange={e => setPostalCode(e.target.value)} type="text" className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="Postal Code" />
                            <select value={country} onChange={e => setCountry(e.target.value)} className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-slate-600">
                                <option value="">-Select Country-</option>
                                <option value="India">India</option>
                                <option value="USA">USA</option>
                                <option value="UK">UK</option>
                            </select>
                        </div>
                    </div>
                </div>

                <div className="space-y-2">
                    <label className="text-sm font-medium text-slate-700">Photo</label>
                    <div className="w-full px-3 py-2 border border-slate-300 rounded-lg flex items-center justify-between bg-white">
                        <span className="text-slate-400 text-sm">Select Image</span>
                        <Upload size={18} className="text-slate-400" />
                    </div>
                </div>

                <div className="flex justify-start gap-4 pt-4">
                    <button disabled={loading} type="submit" className="px-6 py-2 text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50">
                        {loading ? 'Adding...' : 'Add'}
                    </button>
                    <button type="button" onClick={() => {
                        setCaseId('');
                        setFirstName('');
                        setLastName('');
                        setRole('Client');
                        setMobile('');
                        setEmail('');
                        setAddressLine1('');
                        setAddressLine2('');
                        setCity('');
                        setState('');
                        setPostalCode('');
                        setCountry('');
                    }} className="px-6 py-2 text-slate-700 bg-white border border-slate-300 rounded-lg hover:bg-slate-50 transition-colors">
                        Reset
                    </button>
                </div>
            </form>
        </div>
    );
}
