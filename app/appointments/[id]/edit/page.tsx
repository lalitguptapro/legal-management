'use client';

import { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { supabase } from '@/lib/supabase';
import { toast } from 'sonner';
import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';

export default function EditAppointmentPage() {
    const router = useRouter();
    const params = useParams();
    const appointmentId = params.id as string;
    const [loading, setLoading] = useState(false);
    const [fetching, setFetching] = useState(true);
    const [contacts, setContacts] = useState<any[]>([]);
    const [formData, setFormData] = useState({
        contact_id: '',
        title: '',
        description: '',
        start_time: '',
        end_time: '',
        location: '',
        meeting_url: '',
        status: 'Scheduled',
    });

    useEffect(() => {
        fetchContacts();
        fetchAppointment();
    }, [appointmentId]);

    const fetchContacts = async () => {
        try {
            const { data } = await supabase
                .from('contacts')
                .select('id, first_name, last_name')
                .order('first_name');
            setContacts(data || []);
        } catch (error) {
            console.error('Error fetching contacts:', error);
        }
    };

    const fetchAppointment = async () => {
        try {
            const { data, error } = await supabase
                .from('appointments')
                .select('*')
                .eq('id', appointmentId)
                .single();

            if (error) throw error;

            if (data) {
                // Format datetime for input fields
                const startTime = data.start_time ? new Date(data.start_time).toISOString().slice(0, 16) : '';
                const endTime = data.end_time ? new Date(data.end_time).toISOString().slice(0, 16) : '';

                setFormData({
                    contact_id: data.contact_id || '',
                    title: data.title || '',
                    description: data.description || '',
                    start_time: startTime,
                    end_time: endTime,
                    location: data.location || '',
                    meeting_url: data.meeting_url || '',
                    status: data.status || 'Scheduled',
                });
            }
        } catch (error: any) {
            console.error('Error fetching appointment:', error);
            toast.error('Failed to load appointment');
            router.push('/appointments');
        } finally {
            setFetching(false);
        }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        try {
            const { error } = await supabase
                .from('appointments')
                .update({
                    ...formData,
                    contact_id: formData.contact_id || null,
                    updated_at: new Date().toISOString(),
                })
                .eq('id', appointmentId);

            if (error) throw error;

            toast.success('Appointment updated successfully');
            router.push('/appointments');
        } catch (error: any) {
            console.error('Error updating appointment:', error);
            toast.error(error.message || 'Failed to update appointment');
        } finally {
            setLoading(false);
        }
    };

    if (fetching) {
        return (
            <div className="flex items-center justify-center h-64">
                <div className="text-gray-500">Loading appointment...</div>
            </div>
        );
    }

    return (
        <div className="p-6 max-w-4xl mx-auto space-y-6">
            <div className="flex items-center gap-4">
                <Link
                    href="/appointments"
                    className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                >
                    <ArrowLeft className="w-5 h-5" />
                </Link>
                <div>
                    <h1 className="text-2xl font-semibold text-gray-900">Edit Appointment</h1>
                    <p className="text-gray-600 mt-1">Update appointment details</p>
                </div>
            </div>

            <form onSubmit={handleSubmit} className="bg-white rounded-lg border border-gray-200 p-6 space-y-6">
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                        Contact (Optional)
                    </label>
                    <select
                        name="contact_id"
                        value={formData.contact_id}
                        onChange={handleChange}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                        <option value="">Select a contact</option>
                        {contacts.map((contact) => (
                            <option key={contact.id} value={contact.id}>
                                {contact.first_name} {contact.last_name}
                            </option>
                        ))}
                    </select>
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                        Title *
                    </label>
                    <input
                        type="text"
                        name="title"
                        required
                        value={formData.title}
                        onChange={handleChange}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                        Description
                    </label>
                    <textarea
                        name="description"
                        value={formData.description}
                        onChange={handleChange}
                        rows={4}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Start Time *
                        </label>
                        <input
                            type="datetime-local"
                            name="start_time"
                            required
                            value={formData.start_time}
                            onChange={handleChange}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            End Time *
                        </label>
                        <input
                            type="datetime-local"
                            name="end_time"
                            required
                            value={formData.end_time}
                            onChange={handleChange}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                        Location
                    </label>
                    <input
                        type="text"
                        name="location"
                        value={formData.location}
                        onChange={handleChange}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                        Meeting URL (for virtual meetings)
                    </label>
                    <input
                        type="url"
                        name="meeting_url"
                        value={formData.meeting_url}
                        onChange={handleChange}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                        Status
                    </label>
                    <select
                        name="status"
                        value={formData.status}
                        onChange={handleChange}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                        <option value="Scheduled">Scheduled</option>
                        <option value="Completed">Completed</option>
                        <option value="Cancelled">Cancelled</option>
                        <option value="No Show">No Show</option>
                    </select>
                </div>

                <div className="flex items-center justify-end gap-4 pt-4 border-t border-gray-200">
                    <Link
                        href="/appointments"
                        className="px-6 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                    >
                        Cancel
                    </Link>
                    <button
                        type="submit"
                        disabled={loading}
                        className="px-6 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50"
                    >
                        {loading ? 'Updating...' : 'Update Appointment'}
                    </button>
                </div>
            </form>
        </div>
    );
}

