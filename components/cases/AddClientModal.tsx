'use client';

import { useState } from 'react';
import supabase from '@/app/api/clients';
import { X, Upload } from 'lucide-react';

interface AddClientModalProps {
    isOpen: boolean;
    onClose: () => void;
    onClientAdded: (newClient: { id: string; name: string }) => void;
}

export function AddClientModal({ isOpen, onClose, onClientAdded }: AddClientModalProps) {
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        mobile: '',
        email: '',
        addressLine1: '',
        addressLine2: '',
        city: '',
        state: '',
        postalCode: '',
        country: ''
    });

    if (!isOpen) return null;

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        try {
            const fullName = `${formData.firstName} ${formData.lastName}`.trim();
            const fullAddress = [
                formData.addressLine1,
                formData.addressLine2,
                formData.city,
                formData.state,
                formData.postalCode,
                formData.country
            ].filter(Boolean).join(', ');

            const { data, error } = await supabase
                .from('clients')
                .insert({
                    name: fullName,
                    email: formData.email,
                    phone: formData.mobile,
                    address: fullAddress
                })
                .select()
                .single();

            if (error) throw error;

            onClientAdded(data);
            onClose();
            // Reset form
            setFormData({
                firstName: '',
                lastName: '',
                mobile: '',
                email: '',
                addressLine1: '',
                addressLine2: '',
                city: '',
                state: '',
                postalCode: '',
                country: ''
            });

        } catch (error) {
            console.error('Error adding client:', error);
            alert('Error adding client: ' + (error as Error).message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
            <div className="bg-white rounded-xl shadow-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
                <div className="flex items-center justify-between p-6 border-b border-slate-100">
                    <h2 className="text-xl font-semibold text-slate-800">Add People</h2>
                    <button onClick={onClose} className="text-slate-400 hover:text-slate-600 transition-colors">
                        <X size={24} />
                    </button>
                </div>

                <form onSubmit={handleSubmit} className="p-6 space-y-6">
                    {/* Case Field (Disabled/Placeholder as per screenshot context) */}
                    <div className="space-y-2">
                        <label className="text-sm font-medium text-slate-700">Case</label>
                        <select disabled className="w-full px-3 py-2 border border-slate-300 rounded-lg bg-slate-50 text-slate-500">
                            <option>-Select-</option>
                        </select>
                    </div>

                    {/* Name */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <label className="text-sm font-medium text-slate-700">Name *</label>
                            <input required name="firstName" value={formData.firstName} onChange={handleChange} placeholder="First Name" className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" />
                        </div>
                        <div className="space-y-2">
                            <label className="text-sm font-medium text-slate-700">&nbsp;</label>
                            <input required name="lastName" value={formData.lastName} onChange={handleChange} placeholder="Last Name" className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" />
                        </div>
                    </div>

                    {/* Type */}
                    <div className="space-y-2">
                        <label className="text-sm font-medium text-slate-700">Type *</label>
                        <select disabled className="w-full px-3 py-2 border border-slate-300 rounded-lg bg-slate-50">
                            <option>Client</option>
                        </select>
                    </div>

                    {/* Contact */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <label className="text-sm font-medium text-slate-700">Mobile Number *</label>
                            <div className="flex">
                                <span className="inline-flex items-center px-3 border border-r-0 border-slate-300 rounded-l-lg bg-slate-50 text-slate-500 text-sm">
                                    🇮🇳 +91
                                </span>
                                <input required name="mobile" value={formData.mobile} onChange={handleChange} type="tel" className="w-full px-3 py-2 border border-slate-300 rounded-r-lg focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="81234 56789" />
                            </div>
                        </div>
                        <div className="space-y-2">
                            <label className="text-sm font-medium text-slate-700">Email</label>
                            <input name="email" value={formData.email} onChange={handleChange} type="email" className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" />
                        </div>
                    </div>

                    {/* Address */}
                    <div className="space-y-4">
                        <label className="text-sm font-medium text-slate-700">Address</label>
                        <input name="addressLine1" value={formData.addressLine1} onChange={handleChange} placeholder="Address Line 1" className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" />
                        <input name="addressLine2" value={formData.addressLine2} onChange={handleChange} placeholder="Address Line 2" className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" />

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <input name="city" value={formData.city} onChange={handleChange} placeholder="City / District" className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" />
                            <input name="state" value={formData.state} onChange={handleChange} placeholder="State / Province" className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" />
                            <input name="postalCode" value={formData.postalCode} onChange={handleChange} placeholder="Postal Code" className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" />
                            <select name="country" value={formData.country} onChange={handleChange} className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
                                <option value="">-Select Country-</option>
                                <option value="India">India</option>
                                <option value="USA">USA</option>
                                <option value="UK">UK</option>
                            </select>
                        </div>
                    </div>

                    {/* Photo */}
                    <div className="space-y-2">
                        <label className="text-sm font-medium text-slate-700">Photo</label>
                        <div className="border border-slate-300 rounded-lg px-3 py-2 flex items-center justify-between cursor-pointer hover:bg-slate-50">
                            <span className="text-slate-500">Select Image</span>
                            <Upload size={18} className="text-slate-400" />
                        </div>
                    </div>

                    <div className="flex justify-end gap-4 pt-4 border-t border-slate-100">
                        <button type="button" onClick={onClose} className="px-6 py-2 text-slate-700 bg-white border border-slate-300 rounded-lg hover:bg-slate-50 transition-colors">
                            Reset
                        </button>
                        <button disabled={loading} type="submit" className="px-6 py-2 text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50">
                            {loading ? 'Adding...' : 'Add'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
