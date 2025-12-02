'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import supabase from '@/app/api/clients';
import { Upload, Plus, Trash2, X } from 'lucide-react';
import { toast } from 'sonner';

interface PaymentDetail {
    paymentFor: string;
    caseName: string;
    billDate: string;
    paidAmount: string;
    lawyer: string;
    paidForLawyer: string;
    description: string;
}

interface LawyerFormProps {
    initialData?: any;
    isEdit?: boolean;
}

export function LawyerForm({ initialData, isEdit = false }: LawyerFormProps) {
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        name: initialData?.name || '',
        gender: initialData?.gender || 'Male',
        dob: initialData?.dob || '',
        age: initialData?.age || '',
        email: initialData?.email || '',
        mobile: initialData?.mobile || '',
        addressLine1: initialData?.address?.split(', ')[0] || '',
        addressLine2: initialData?.address?.split(', ')[1] || '',
        city: initialData?.city || '',
        state: initialData?.state || '',
        postalCode: initialData?.postal_code || '',
        country: initialData?.country || '',
        lawyerType: initialData?.lawyer_type || '',
        caseBasedBillRate: initialData?.case_based_bill_rate || '',
        timeBasedBillRate: initialData?.time_based_bill_rate || '',
        monthlyBillRate: initialData?.monthly_bill_rate || '',
    });

    const [paymentDetails, setPaymentDetails] = useState<PaymentDetail[]>(
        initialData?.payment_details || []
    );

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handlePaymentChange = (index: number, field: keyof PaymentDetail, value: string) => {
        const newDetails = [...paymentDetails];
        newDetails[index] = { ...newDetails[index], [field]: value };
        setPaymentDetails(newDetails);
    };

    const addPaymentRow = () => {
        setPaymentDetails([
            ...paymentDetails,
            {
                paymentFor: '',
                caseName: '',
                billDate: '',
                paidAmount: '',
                lawyer: '',
                paidForLawyer: '',
                description: ''
            }
        ]);
    };

    const removePaymentRow = (index: number) => {
        const newDetails = [...paymentDetails];
        newDetails.splice(index, 1);
        setPaymentDetails(newDetails);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        try {
            const fullAddress = [
                formData.addressLine1,
                formData.addressLine2
            ].filter(Boolean).join(', ');

            const payload = {
                name: formData.name,
                gender: formData.gender,
                dob: formData.dob,
                age: formData.age ? parseInt(formData.age) : null,
                email: formData.email,
                mobile: formData.mobile,
                address: fullAddress,
                city: formData.city,
                state: formData.state,
                postal_code: formData.postalCode,
                country: formData.country,
                lawyer_type: formData.lawyerType,
                case_based_bill_rate: formData.caseBasedBillRate ? parseFloat(formData.caseBasedBillRate) : null,
                time_based_bill_rate: formData.timeBasedBillRate ? parseFloat(formData.timeBasedBillRate) : null,
                monthly_bill_rate: formData.monthlyBillRate ? parseFloat(formData.monthlyBillRate) : null,
                payment_details: paymentDetails
            };

            let error;
            if (isEdit && initialData?.id) {
                const { error: updateError } = await supabase
                    .from('lawyers')
                    .update(payload)
                    .eq('id', initialData.id);
                error = updateError;
                if (!error) toast.success('Lawyer updated successfully');
            } else {
                const { error: insertError } = await supabase
                    .from('lawyers')
                    .insert(payload);
                error = insertError;
                if (!error) toast.success('Lawyer added successfully');
            }

            if (error) throw error;

            router.push('/lawyers/all-lawyers');
            router.refresh();

        } catch (error: any) {
            console.error('Error saving lawyer:', error);
            toast.error('Error saving lawyer: ' + error.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
            <h2 className="text-lg font-semibold text-slate-800 mb-6">{isEdit ? 'Edit Lawyer' : 'Add Lawyer'}</h2>
            <form onSubmit={handleSubmit} className="space-y-8">

                {/* Personal Details */}
                <section>
                    <h3 className="text-md font-medium text-slate-700 mb-4 border-b pb-2">Personal Details</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-4">
                            <div className="space-y-2">
                                <label className="text-sm font-medium text-slate-700">Name *</label>
                                <input required name="name" value={formData.name} onChange={handleChange} className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="Full Name" />
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm font-medium text-slate-700">Gender</label>
                                <div className="flex gap-4">
                                    <label className="flex items-center gap-2">
                                        <input type="radio" name="gender" value="Male" checked={formData.gender === 'Male'} onChange={handleChange} /> Male
                                    </label>
                                    <label className="flex items-center gap-2">
                                        <input type="radio" name="gender" value="Female" checked={formData.gender === 'Female'} onChange={handleChange} /> Female
                                    </label>
                                </div>
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm font-medium text-slate-700">Date of Birth *</label>
                                <input required type="date" name="dob" value={formData.dob} onChange={handleChange} className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" />
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm font-medium text-slate-700">Age</label>
                                <input type="number" name="age" value={formData.age} onChange={handleChange} className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="Age" />
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm font-medium text-slate-700">Email *</label>
                                <input required type="email" name="email" value={formData.email} onChange={handleChange} className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="Email Address" />
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm font-medium text-slate-700">Mobile *</label>
                                <div className="flex">
                                    <span className="inline-flex items-center px-3 border border-r-0 border-slate-300 rounded-l-lg bg-slate-50 text-slate-500 text-sm">🇮🇳 +91</span>
                                    <input required type="tel" name="mobile" value={formData.mobile} onChange={handleChange} className="w-full px-3 py-2 border border-slate-300 rounded-r-lg focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="Mobile Number" />
                                </div>
                            </div>
                        </div>

                        <div className="space-y-4">
                            <div className="space-y-2">
                                <label className="text-sm font-medium text-slate-700">Address</label>
                                <input name="addressLine1" value={formData.addressLine1} onChange={handleChange} className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="Address Line 1" />
                                <input name="addressLine2" value={formData.addressLine2} onChange={handleChange} className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="Address Line 2" />
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <input name="city" value={formData.city} onChange={handleChange} className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="City / District" />
                                <input name="state" value={formData.state} onChange={handleChange} className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="State / Province" />
                                <input name="postalCode" value={formData.postalCode} onChange={handleChange} className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="Postal Code" />
                                <select name="country" value={formData.country} onChange={handleChange} className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
                                    <option value="">-Select-</option>
                                    <option value="India">India</option>
                                    <option value="USA">USA</option>
                                    <option value="UK">UK</option>
                                </select>
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm font-medium text-slate-700">Photo</label>
                                <div className="border border-slate-300 rounded-lg px-3 py-2 flex items-center justify-between cursor-pointer hover:bg-slate-50">
                                    <span className="text-slate-500">Select Image</span>
                                    <Upload size={18} className="text-slate-400" />
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Official Details */}
                <section>
                    <h3 className="text-md font-medium text-slate-700 mb-4 border-b pb-2">Official Details</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                            <label className="text-sm font-medium text-slate-700">Lawyer Type *</label>
                            <select required name="lawyerType" value={formData.lawyerType} onChange={handleChange} className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
                                <option value="">-Select-</option>
                                <option value="Criminal Defence">Criminal Defence</option>
                                <option value="Corporate">Corporate</option>
                                <option value="Family">Family</option>
                                <option value="Civil">Civil</option>
                            </select>
                        </div>
                        <div className="space-y-2">
                            <label className="text-sm font-medium text-slate-700">Case Based Bill Rate</label>
                            <input type="number" name="caseBasedBillRate" value={formData.caseBasedBillRate} onChange={handleChange} className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="0.00" />
                        </div>
                        <div className="space-y-2">
                            <label className="text-sm font-medium text-slate-700">Time Based Bill Rate</label>
                            <input type="number" name="timeBasedBillRate" value={formData.timeBasedBillRate} onChange={handleChange} className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="0.00" />
                        </div>
                        <div className="space-y-2">
                            <label className="text-sm font-medium text-slate-700">Monthly Bill Rate</label>
                            <input type="number" name="monthlyBillRate" value={formData.monthlyBillRate} onChange={handleChange} className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="0.00" />
                        </div>
                    </div>
                </section>

                {/* Payment Details */}
                <section>
                    <h3 className="text-md font-medium text-slate-700 mb-4 border-b pb-2">Payment Details</h3>
                    <div className="overflow-x-auto">
                        <table className="w-full text-sm text-left">
                            <thead className="bg-slate-50 text-slate-700 font-medium">
                                <tr>
                                    <th className="px-4 py-2">Action</th>
                                    <th className="px-4 py-2">Payment For *</th>
                                    <th className="px-4 py-2">Case</th>
                                    <th className="px-4 py-2">Bill Date *</th>
                                    <th className="px-4 py-2">Paid Amount *</th>
                                    <th className="px-4 py-2">Lawyer</th>
                                    <th className="px-4 py-2">Paid For Lawyer</th>
                                    <th className="px-4 py-2">Description *</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-100">
                                {paymentDetails.map((detail, index) => (
                                    <tr key={index}>
                                        <td className="px-4 py-2">
                                            <button type="button" onClick={() => removePaymentRow(index)} className="text-red-500 hover:text-red-700">
                                                <X size={16} />
                                            </button>
                                        </td>
                                        <td className="px-4 py-2">
                                            <select value={detail.paymentFor} onChange={(e) => handlePaymentChange(index, 'paymentFor', e.target.value)} className="w-full border rounded px-2 py-1">
                                                <option value="">-Select-</option>
                                                <option value="Consultation">Consultation</option>
                                                <option value="Retainer">Retainer</option>
                                            </select>
                                        </td>
                                        <td className="px-4 py-2">
                                            <select value={detail.caseName} onChange={(e) => handlePaymentChange(index, 'caseName', e.target.value)} className="w-full border rounded px-2 py-1">
                                                <option value="">-Select-</option>
                                                <option value="Case A">Case A</option>
                                            </select>
                                        </td>
                                        <td className="px-4 py-2">
                                            <input type="date" value={detail.billDate} onChange={(e) => handlePaymentChange(index, 'billDate', e.target.value)} className="w-full border rounded px-2 py-1" />
                                        </td>
                                        <td className="px-4 py-2">
                                            <input type="number" value={detail.paidAmount} onChange={(e) => handlePaymentChange(index, 'paidAmount', e.target.value)} className="w-full border rounded px-2 py-1" placeholder="0.00" />
                                        </td>
                                        <td className="px-4 py-2">
                                            <select value={detail.lawyer} onChange={(e) => handlePaymentChange(index, 'lawyer', e.target.value)} className="w-full border rounded px-2 py-1">
                                                <option value="">-Select-</option>
                                                <option value="Self">Self</option>
                                            </select>
                                        </td>
                                        <td className="px-4 py-2">
                                            <input type="number" value={detail.paidForLawyer} onChange={(e) => handlePaymentChange(index, 'paidForLawyer', e.target.value)} className="w-full border rounded px-2 py-1" placeholder="0.00" />
                                        </td>
                                        <td className="px-4 py-2">
                                            <input type="text" value={detail.description} onChange={(e) => handlePaymentChange(index, 'description', e.target.value)} className="w-full border rounded px-2 py-1" />
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                        <button type="button" onClick={addPaymentRow} className="mt-2 flex items-center gap-1 text-blue-600 hover:text-blue-700 text-sm font-medium">
                            <Plus size={16} /> Add New
                        </button>
                    </div>
                </section>

                <div className="flex justify-end gap-4 pt-4 border-t border-slate-100">
                    <button type="button" onClick={() => router.back()} className="px-6 py-2 text-slate-700 bg-white border border-slate-300 rounded-lg hover:bg-slate-50 transition-colors">
                        Cancel
                    </button>
                    <button disabled={loading} type="submit" className="px-6 py-2 text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50">
                        {loading ? 'Saving...' : 'Submit'}
                    </button>
                </div>
            </form>
        </div>
    );
}
