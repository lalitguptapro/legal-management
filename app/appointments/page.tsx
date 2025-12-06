'use client';

import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';
import { Plus, Search, Filter, Calendar, Clock, MapPin, Video, Edit, Trash2 } from 'lucide-react';
import { toast } from 'sonner';
import Link from 'next/link';
import { DeleteConfirmModal } from '@/components/ui/DeleteConfirmModal';

interface Appointment {
    id: string;
    contact_id: string;
    title: string;
    description?: string;
    start_time: string;
    end_time: string;
    location?: string;
    meeting_url?: string;
    status: string;
    contact?: {
        first_name: string;
        last_name: string;
        email: string;
    };
}

export default function AppointmentsPage() {
    const [appointments, setAppointments] = useState<Appointment[]>([]);
    const [loading, setLoading] = useState(true);
    const [viewMode, setViewMode] = useState<'list' | 'calendar'>('list');
    const [searchTerm, setSearchTerm] = useState('');
    const [deleteModal, setDeleteModal] = useState<{ isOpen: boolean; appointment: Appointment | null }>({
        isOpen: false,
        appointment: null,
    });

    useEffect(() => {
        fetchAppointments();
    }, []);

    const fetchAppointments = async () => {
        try {
            const { data, error } = await supabase
                .from('appointments')
                .select(`
                    *,
                    contact:contacts(id, first_name, last_name, email)
                `)
                .order('start_time', { ascending: true });

            if (error) throw error;
            setAppointments(data || []);
        } catch (error: any) {
            console.error('Error fetching appointments:', error);
            toast.error('Failed to fetch appointments');
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (appointment: Appointment) => {
        try {
            const { error } = await supabase
                .from('appointments')
                .delete()
                .eq('id', appointment.id);

            if (error) throw error;

            toast.success('Appointment deleted successfully');
            fetchAppointments();
        } catch (error: any) {
            console.error('Error deleting appointment:', error);
            toast.error(error.message || 'Failed to delete appointment');
        }
    };

    const filteredAppointments = appointments.filter(apt =>
        apt.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        apt.contact?.first_name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        apt.contact?.last_name?.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const getStatusColor = (status: string) => {
        switch (status) {
            case 'Scheduled': return 'bg-blue-100 text-blue-800';
            case 'Completed': return 'bg-green-100 text-green-800';
            case 'Cancelled': return 'bg-red-100 text-red-800';
            case 'No Show': return 'bg-yellow-100 text-yellow-800';
            default: return 'bg-gray-100 text-gray-800';
        }
    };

    if (loading) {
        return (
            <div className="flex items-center justify-center h-64">
                <div className="text-gray-500">Loading appointments...</div>
            </div>
        );
    }

    return (
        <>
            <div className="p-6 space-y-6">
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-2xl font-semibold text-gray-900">Appointments</h1>
                        <p className="text-gray-600 mt-1">Manage your appointments and bookings</p>
                    </div>
                    <div className="flex items-center gap-3">
                        <div className="flex items-center gap-2 bg-gray-100 rounded-lg p-1">
                            <button
                                onClick={() => setViewMode('list')}
                                className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                                    viewMode === 'list' ? 'bg-white text-gray-900 shadow-sm' : 'text-gray-600'
                                }`}
                            >
                                List
                            </button>
                            <button
                                onClick={() => setViewMode('calendar')}
                                className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                                    viewMode === 'calendar' ? 'bg-white text-gray-900 shadow-sm' : 'text-gray-600'
                                }`}
                            >
                                Calendar
                            </button>
                        </div>
                        <Link
                            href="/appointments/create"
                            className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors"
                        >
                            <Plus className="w-4 h-4" />
                            Schedule Appointment
                        </Link>
                    </div>
                </div>

                <div className="bg-white rounded-lg border border-gray-200">
                    <div className="p-4 border-b border-gray-200 flex items-center gap-4">
                        <div className="flex-1 relative">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                            <input
                                type="text"
                                placeholder="Search appointments..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="w-full pl-10 pr-4 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                        </div>
                        <button className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50">
                            <Filter className="w-4 h-4" />
                            Filter
                        </button>
                    </div>

                    {viewMode === 'list' ? (
                        <div className="divide-y divide-gray-200">
                            {filteredAppointments.length === 0 ? (
                                <div className="p-12 text-center text-gray-500">
                                    No appointments found. Schedule your first appointment to get started.
                                </div>
                            ) : (
                                filteredAppointments.map((appointment) => (
                                    <div key={appointment.id} className="p-6 hover:bg-gray-50 transition-colors">
                                        <div className="flex items-start justify-between">
                                            <div className="flex-1">
                                                <div className="flex items-center gap-3 mb-2">
                                                    <h3 className="text-lg font-semibold text-gray-900">
                                                        {appointment.title}
                                                    </h3>
                                                    <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(appointment.status)}`}>
                                                        {appointment.status}
                                                    </span>
                                                </div>
                                                {appointment.contact && (
                                                    <p className="text-sm text-gray-600 mb-3">
                                                        with {appointment.contact.first_name} {appointment.contact.last_name}
                                                    </p>
                                                )}
                                                <div className="flex flex-wrap items-center gap-4 text-sm text-gray-500">
                                                    <div className="flex items-center gap-2">
                                                        <Calendar className="w-4 h-4" />
                                                        <span>
                                                            {new Date(appointment.start_time).toLocaleDateString('en-US', {
                                                                weekday: 'short',
                                                                month: 'short',
                                                                day: 'numeric',
                                                                year: 'numeric',
                                                            })}
                                                        </span>
                                                    </div>
                                                    <div className="flex items-center gap-2">
                                                        <Clock className="w-4 h-4" />
                                                        <span>
                                                            {new Date(appointment.start_time).toLocaleTimeString('en-US', {
                                                                hour: 'numeric',
                                                                minute: '2-digit',
                                                            })} - {new Date(appointment.end_time).toLocaleTimeString('en-US', {
                                                                hour: 'numeric',
                                                                minute: '2-digit',
                                                            })}
                                                        </span>
                                                    </div>
                                                    {appointment.location && (
                                                        <div className="flex items-center gap-2">
                                                            <MapPin className="w-4 h-4" />
                                                            <span>{appointment.location}</span>
                                                        </div>
                                                    )}
                                                    {appointment.meeting_url && (
                                                        <div className="flex items-center gap-2">
                                                            <Video className="w-4 h-4" />
                                                            <a href={appointment.meeting_url} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
                                                                Join Meeting
                                                            </a>
                                                        </div>
                                                    )}
                                                </div>
                                                {appointment.description && (
                                                    <p className="text-sm text-gray-600 mt-3">{appointment.description}</p>
                                                )}
                                            </div>
                                            <div className="flex items-center gap-2 ml-4">
                                                <Link
                                                    href={`/appointments/${appointment.id}/edit`}
                                                    className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                                                >
                                                    <Edit className="w-4 h-4" />
                                                </Link>
                                                <button
                                                    onClick={() => setDeleteModal({ isOpen: true, appointment })}
                                                    className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                                                >
                                                    <Trash2 className="w-4 h-4" />
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                ))
                            )}
                        </div>
                    ) : (
                        <div className="p-6">
                            <div className="text-center text-gray-500 py-12">
                                Calendar view coming soon
                            </div>
                        </div>
                    )}
                </div>
            </div>

            <DeleteConfirmModal
                isOpen={deleteModal.isOpen}
                onClose={() => setDeleteModal({ isOpen: false, appointment: null })}
                onConfirm={() => deleteModal.appointment && handleDelete(deleteModal.appointment)}
                title="Delete Appointment"
                message="Are you sure you want to delete this appointment? This action cannot be undone."
                itemName={deleteModal.appointment?.title}
            />
        </>
    );
}
