'use client';

import { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import supabase from '@/app/api/clients';
import { Plus, Trash2, Upload, ChevronDown, Search, X, ChevronUp } from 'lucide-react';
import { AddClientModal } from './AddClientModal';
import { toast } from 'sonner';

interface Person {
    id?: string; // For local keying
    firstName: string;
    lastName: string;
    mobile: string;
    email: string;
    addressLine1: string;
    addressLine2: string;
    city: string;
    state: string;
    postalCode: string;
    country: string;
    photo: File | null;
    isExpanded?: boolean; // UI state
}

interface Lawyer {
    id: string;
    name: string;
}

interface Client {
    id: string;
    name: string;
}

export function CaseForm() {
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [lawyers, setLawyers] = useState<Lawyer[]>([]);
    const [clients, setClients] = useState<Client[]>([]);

    // Modal State
    const [isAddClientModalOpen, setIsAddClientModalOpen] = useState(false);
    const [isClientDropdownOpen, setIsClientDropdownOpen] = useState(false);
    const [clientSearch, setClientSearch] = useState('');
    const dropdownRef = useRef<HTMLDivElement>(null);

    // Form State
    const [title, setTitle] = useState('');
    const [caseNumber, setCaseNumber] = useState('');
    const [lawyerId, setLawyerId] = useState('');
    const [clientId, setClientId] = useState('');
    const [caseType, setCaseType] = useState('');
    const [startDate, setStartDate] = useState('');
    const [courtName, setCourtName] = useState('');
    const [description, setDescription] = useState('');

    // Dynamic Lists
    const [opposingClients, setOpposingClients] = useState<Person[]>([]);
    const [witnesses, setWitnesses] = useState<Person[]>([]);

    useEffect(() => {
        fetchDropdowns();

        const handleClickOutside = (event: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setIsClientDropdownOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const fetchDropdowns = async () => {
        const { data: lawyersData } = await supabase.from('lawyers').select('id, name');
        const { data: clientsData } = await supabase.from('clients').select('id, name');

        if (lawyersData) setLawyers(lawyersData);
        if (clientsData) setClients(clientsData);
    };

    const handleClientAdded = (newClient: Client) => {
        setClients(prev => [...prev, newClient]);
        setClientId(newClient.id);
        setIsClientDropdownOpen(false);
    };

    const filteredClients = clients.filter(c =>
        c.name.toLowerCase().includes(clientSearch.toLowerCase())
    );

    const selectedClientName = clients.find(c => c.id === clientId)?.name || '-Select-';

    // Generic Person Handler
    const handlePersonChange = (
        index: number,
        field: keyof Person,
        value: any,
        list: Person[],
        setList: (list: Person[]) => void
    ) => {
        const newList = [...list];
        newList[index] = { ...newList[index], [field]: value };
        setList(newList);
    };

    const addNewPerson = (list: Person[], setList: (list: Person[]) => void) => {
        setList([
            ...list,
            {
                id: crypto.randomUUID(),
                firstName: '',
                lastName: '',
                mobile: '',
                email: '',
                addressLine1: '',
                addressLine2: '',
                city: '',
                state: '',
                postalCode: '',
                country: '',
                photo: null,
                isExpanded: true // Open by default when added
            }
        ]);
    };

    const removePerson = (index: number, list: Person[], setList: (list: Person[]) => void) => {
        const newList = list.filter((_, i) => i !== index);
        setList(newList);
    };

    const toggleExpand = (index: number, list: Person[], setList: (list: Person[]) => void) => {
        const newList = [...list];
        newList[index] = { ...newList[index], isExpanded: !newList[index].isExpanded };
        setList(newList);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        try {
            // 1. Create Case
            const { data: caseData, error: caseError } = await supabase
                .from('cases')
                .insert({
                    title,
                    case_number: caseNumber,
                    lawyer_id: lawyerId,
                    client_id: clientId,
                    case_type: caseType,
                    start_date: startDate,
                    court_name: courtName,
                    description,
                    status: 'Open'
                })
                .select()
                .single();

            if (caseError) throw caseError;

            const caseId = caseData.id;

            // 2. Add Opposing Clients
            for (const person of opposingClients) {
                if (!person.firstName && !person.lastName) continue;
                await supabase.from('opposing_clients').insert({
                    case_id: caseId,
                    first_name: person.firstName,
                    last_name: person.lastName,
                    mobile: person.mobile,
                    email: person.email,
                    address_line1: person.addressLine1,
                    address_line2: person.addressLine2,
                    city: person.city,
                    state: person.state,
                    postal_code: person.postalCode,
                    country: person.country
                });
            }

            // 3. Add Witnesses
            for (const person of witnesses) {
                if (!person.firstName && !person.lastName) continue;
                await supabase.from('case_witnesses').insert({
                    case_id: caseId,
                    first_name: person.firstName,
                    last_name: person.lastName,
                    mobile: person.mobile,
                    email: person.email,
                    address_line1: person.addressLine1,
                    address_line2: person.addressLine2,
                    city: person.city,
                    state: person.state,
                    postal_code: person.postalCode,
                    country: person.country
                });
            }

            toast.success('Case created successfully');
            router.push('/cases/all-cases'); // Redirect to all cases for now

        } catch (error: any) {
            console.error('Error creating case:', error);
            toast.error('Error creating case: ' + error.message);
        } finally {
            setLoading(false);
        }
    };

    const renderPersonSection = (
        title: string,
        list: Person[],
        setList: (list: Person[]) => void
    ) => (
        <div className="space-y-4">
            <h3 className="text-md font-semibold text-slate-800">{title}</h3>

            {/* List Header */}
            {list.length > 0 && (
                <div className="grid grid-cols-12 gap-4 px-4 py-2 bg-slate-50 text-xs font-medium text-slate-500 rounded-t-lg border-b border-slate-200">
                    <div className="col-span-3">Name</div>
                    <div className="col-span-3">Mobile Number</div>
                    <div className="col-span-3">Email</div>
                    <div className="col-span-2">Address</div>
                    <div className="col-span-1">Action</div>
                </div>
            )}

            <div className="space-y-4">
                {list.map((person, index) => (
                    <div key={person.id || index} className="border border-slate-200 rounded-lg overflow-hidden">
                        {/* Summary Row (Always Visible) */}
                        <div className="grid grid-cols-12 gap-4 p-4 items-center bg-white">
                            <div className="col-span-3 font-medium text-slate-900">
                                {person.firstName || person.lastName ? `${person.firstName} ${person.lastName}` : <span className="text-slate-400 italic">New Person</span>}
                            </div>
                            <div className="col-span-3 text-sm text-slate-600">{person.mobile || '-'}</div>
                            <div className="col-span-3 text-sm text-slate-600">{person.email || '-'}</div>
                            <div className="col-span-2 text-sm text-slate-600 truncate">{person.city || '-'}</div>
                            <div className="col-span-1 flex items-center gap-2">
                                <button type="button" onClick={() => toggleExpand(index, list, setList)} className="text-blue-600 hover:text-blue-800">
                                    {person.isExpanded ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
                                </button>
                                <button type="button" onClick={() => removePerson(index, list, setList)} className="text-red-500 hover:text-red-700">
                                    <Trash2 size={18} />
                                </button>
                            </div>
                        </div>

                        {/* Detailed Form (Collapsible) */}
                        {person.isExpanded && (
                            <div className="p-6 bg-slate-50 border-t border-slate-200 grid grid-cols-1 md:grid-cols-4 gap-4">
                                <div className="md:col-span-1">
                                    <input value={person.firstName} onChange={e => handlePersonChange(index, 'firstName', e.target.value, list, setList)} placeholder="First Name" className="w-full px-3 py-2 border rounded-lg text-sm" />
                                </div>
                                <div className="md:col-span-1">
                                    <input value={person.lastName} onChange={e => handlePersonChange(index, 'lastName', e.target.value, list, setList)} placeholder="Last Name" className="w-full px-3 py-2 border rounded-lg text-sm" />
                                </div>
                                <div className="md:col-span-2">
                                    <div className="flex gap-2">
                                        <div className="flex items-center gap-2 px-3 py-2 border rounded-lg bg-white w-full">
                                            <span className="text-slate-500 text-sm">🇮🇳 +91</span>
                                            <input value={person.mobile} onChange={e => handlePersonChange(index, 'mobile', e.target.value, list, setList)} placeholder="81234 56789" className="w-full outline-none text-sm" />
                                        </div>
                                    </div>
                                </div>
                                <div className="md:col-span-2">
                                    <input value={person.email} onChange={e => handlePersonChange(index, 'email', e.target.value, list, setList)} placeholder="Email" className="w-full px-3 py-2 border rounded-lg text-sm" />
                                </div>
                                <div className="md:col-span-2">
                                    <input value={person.addressLine1} onChange={e => handlePersonChange(index, 'addressLine1', e.target.value, list, setList)} placeholder="Address Line 1" className="w-full px-3 py-2 border rounded-lg text-sm" />
                                </div>
                                <div className="md:col-span-2">
                                    <input value={person.addressLine2} onChange={e => handlePersonChange(index, 'addressLine2', e.target.value, list, setList)} placeholder="Address Line 2" className="w-full px-3 py-2 border rounded-lg text-sm" />
                                </div>
                                <div className="md:col-span-1">
                                    <input value={person.city} onChange={e => handlePersonChange(index, 'city', e.target.value, list, setList)} placeholder="City / District" className="w-full px-3 py-2 border rounded-lg text-sm" />
                                </div>
                                <div className="md:col-span-1">
                                    <input value={person.state} onChange={e => handlePersonChange(index, 'state', e.target.value, list, setList)} placeholder="State / Province" className="w-full px-3 py-2 border rounded-lg text-sm" />
                                </div>
                                <div className="md:col-span-1">
                                    <input value={person.postalCode} onChange={e => handlePersonChange(index, 'postalCode', e.target.value, list, setList)} placeholder="Postal Code" className="w-full px-3 py-2 border rounded-lg text-sm" />
                                </div>
                                <div className="md:col-span-1">
                                    <select value={person.country} onChange={e => handlePersonChange(index, 'country', e.target.value, list, setList)} className="w-full px-3 py-2 border rounded-lg text-sm text-slate-600">
                                        <option value="">-Select-</option>
                                        <option value="India">India</option>
                                        <option value="USA">USA</option>
                                        <option value="UK">UK</option>
                                    </select>
                                </div>
                                <div className="md:col-span-4">
                                    <div className="border-2 border-dashed border-slate-300 rounded-lg p-4 flex flex-col items-center justify-center text-slate-500 cursor-pointer hover:bg-slate-100 transition-colors">
                                        <Upload size={20} className="mb-2" />
                                        <span className="text-sm">Select Image</span>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                ))}
            </div>

            <button type="button" onClick={() => addNewPerson(list, setList)} className="flex items-center gap-2 text-blue-600 hover:text-blue-700 font-medium text-sm">
                <Plus size={16} /> Add New
            </button>
        </div>
    );

    return (
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
            <h2 className="text-lg font-semibold text-slate-800 mb-6">Add New Case</h2>
            <form onSubmit={handleSubmit} className="space-y-8">

                {/* Case Details */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                        <label className="text-sm font-medium text-slate-700">Case Title *</label>
                        <input required value={title} onChange={e => setTitle(e.target.value)} type="text" className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="e.g. Smith vs. Jones" />
                    </div>
                    <div className="space-y-2">
                        <label className="text-sm font-medium text-slate-700">Lawyer *</label>
                        <select required value={lawyerId} onChange={e => setLawyerId(e.target.value)} className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
                            <option value="">Select Lawyer</option>
                            {lawyers.map(l => <option key={l.id} value={l.id}>{l.name}</option>)}
                        </select>
                    </div>
                    <div className="space-y-2">
                        <label className="text-sm font-medium text-slate-700">Case Type *</label>
                        <select required value={caseType} onChange={e => setCaseType(e.target.value)} className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
                            <option value="">Select Type</option>
                            <option value="Civil">Civil</option>
                            <option value="Criminal">Criminal</option>
                            <option value="Corporate">Corporate</option>
                            <option value="Family">Family</option>
                        </select>
                    </div>
                    <div className="space-y-2">
                        <label className="text-sm font-medium text-slate-700">Starting Date</label>
                        <input value={startDate} onChange={e => setStartDate(e.target.value)} type="date" className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" />
                    </div>

                    {/* Custom Client Dropdown */}
                    <div className="space-y-2 relative" ref={dropdownRef}>
                        <label className="text-sm font-medium text-slate-700">Client *</label>
                        <div
                            onClick={() => setIsClientDropdownOpen(!isClientDropdownOpen)}
                            className="w-full px-3 py-2 border border-slate-300 rounded-lg flex items-center justify-between cursor-pointer bg-white hover:border-blue-500 transition-colors"
                        >
                            <span className={clientId ? 'text-slate-900' : 'text-slate-500'}>
                                {selectedClientName}
                            </span>
                            <ChevronDown size={16} className="text-slate-400" />
                        </div>

                        {isClientDropdownOpen && (
                            <div className="absolute z-10 w-full mt-1 bg-white border border-slate-200 rounded-lg shadow-lg max-h-60 flex flex-col">
                                <div className="p-2 border-b border-slate-100">
                                    <div className="relative">
                                        <Search size={14} className="absolute left-2 top-2.5 text-slate-400" />
                                        <input
                                            autoFocus
                                            value={clientSearch}
                                            onChange={e => setClientSearch(e.target.value)}
                                            placeholder="Search client..."
                                            className="w-full pl-8 pr-3 py-1.5 text-sm border border-slate-200 rounded-md focus:outline-none focus:border-blue-500"
                                        />
                                    </div>
                                </div>
                                <div className="overflow-y-auto flex-1">
                                    {filteredClients.length > 0 ? (
                                        filteredClients.map(client => (
                                            <div
                                                key={client.id}
                                                onClick={() => {
                                                    setClientId(client.id);
                                                    setIsClientDropdownOpen(false);
                                                }}
                                                className="px-3 py-2 hover:bg-slate-50 cursor-pointer text-sm text-slate-700"
                                            >
                                                {client.name}
                                            </div>
                                        ))
                                    ) : (
                                        <div className="px-3 py-4 text-center text-sm text-slate-500">
                                            No matches found
                                        </div>
                                    )}
                                </div>
                                <div className="p-2 border-t border-slate-100 bg-slate-50">
                                    <button
                                        type="button"
                                        onClick={() => {
                                            setIsAddClientModalOpen(true);
                                            setIsClientDropdownOpen(false);
                                        }}
                                        className="w-full flex items-center justify-center gap-2 px-3 py-2 text-sm text-blue-600 font-medium hover:bg-blue-50 rounded-md border border-blue-200 transition-colors"
                                    >
                                        <Plus size={14} /> Add New client
                                    </button>
                                </div>
                            </div>
                        )}
                    </div>
                </div>

                <div className="space-y-2">
                    <label className="text-sm font-medium text-slate-700">Case Description</label>
                    <textarea value={description} onChange={e => setDescription(e.target.value)} className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 h-32" placeholder="Enter case details..."></textarea>
                </div>

                {/* Opposing Clients */}
                {renderPersonSection('Opposing Clients', opposingClients, setOpposingClients)}

                {/* Case Witnesses */}
                {renderPersonSection('Case Witness', witnesses, setWitnesses)}

                <div className="flex justify-start gap-4 pt-4">
                    <button disabled={loading} type="submit" className="px-6 py-2 text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50">
                        {loading ? 'Saving...' : 'Add'}
                    </button>
                    <button type="button" onClick={() => {
                        setTitle('');
                        setCaseNumber('');
                        setLawyerId('');
                        setClientId('');
                        setCaseType('');
                        setStartDate('');
                        setCourtName('');
                        setDescription('');
                        setOpposingClients([]);
                        setWitnesses([]);
                    }} className="px-6 py-2 text-slate-700 bg-white border border-slate-300 rounded-lg hover:bg-slate-50 transition-colors">
                        Reset
                    </button>
                </div>

                <AddClientModal
                    isOpen={isAddClientModalOpen}
                    onClose={() => setIsAddClientModalOpen(false)}
                    onClientAdded={handleClientAdded}
                />
            </form>
        </div>
    );
}
