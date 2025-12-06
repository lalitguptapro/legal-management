'use client';

import { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { supabase } from '@/lib/supabase';
import { toast } from 'sonner';
import { ArrowLeft, Plus, Trash2, GripVertical } from 'lucide-react';
import Link from 'next/link';

type FieldType = 'text' | 'email' | 'phone' | 'textarea' | 'select' | 'checkbox' | 'date' | 'number';

interface FormField {
    id: string;
    label: string;
    type: FieldType;
    required: boolean;
    placeholder?: string;
    options?: string[];
}

export default function EditFormPage() {
    const router = useRouter();
    const params = useParams();
    const formId = params.id as string;
    const [loading, setLoading] = useState(false);
    const [fetching, setFetching] = useState(true);
    const [formName, setFormName] = useState('');
    const [formDescription, setFormDescription] = useState('');
    const [isPasswordProtected, setIsPasswordProtected] = useState(false);
    const [password, setPassword] = useState('');
    const [fields, setFields] = useState<FormField[]>([]);

    useEffect(() => {
        fetchForm();
    }, [formId]);

    const fetchForm = async () => {
        try {
            const { data, error } = await supabase
                .from('forms')
                .select('*')
                .eq('id', formId)
                .single();

            if (error) throw error;

            if (data) {
                setFormName(data.name || '');
                setFormDescription(data.description || '');
                setIsPasswordProtected(data.is_password_protected || false);
                setPassword('');
                setFields(Array.isArray(data.fields) ? data.fields : []);
            }
        } catch (error: any) {
            console.error('Error fetching form:', error);
            toast.error('Failed to load form');
            router.push('/forms');
        } finally {
            setFetching(false);
        }
    };

    const addField = () => {
        const newField: FormField = {
            id: Date.now().toString(),
            label: '',
            type: 'text',
            required: false,
        };
        setFields([...fields, newField]);
    };

    const removeField = (id: string) => {
        setFields(fields.filter(f => f.id !== id));
    };

    const updateField = (id: string, updates: Partial<FormField>) => {
        setFields(fields.map(f => f.id === id ? { ...f, ...updates } : f));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        try {
            const formData = {
                name: formName,
                description: formDescription,
                is_password_protected: isPasswordProtected,
                password: isPasswordProtected ? password : null,
                fields: fields,
                updated_at: new Date().toISOString(),
            };

            const { error } = await supabase
                .from('forms')
                .update(formData)
                .eq('id', formId);

            if (error) throw error;

            toast.success('Form updated successfully');
            router.push('/forms');
        } catch (error: any) {
            console.error('Error updating form:', error);
            toast.error(error.message || 'Failed to update form');
        } finally {
            setLoading(false);
        }
    };

    if (fetching) {
        return (
            <div className="flex items-center justify-center h-64">
                <div className="text-gray-500">Loading form...</div>
            </div>
        );
    }

    return (
        <div className="p-6 max-w-4xl mx-auto space-y-6">
            <div className="flex items-center gap-4">
                <Link
                    href="/forms"
                    className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                >
                    <ArrowLeft className="w-5 h-5" />
                </Link>
                <div>
                    <h1 className="text-2xl font-semibold text-gray-900">Edit Form</h1>
                    <p className="text-gray-600 mt-1">Update form configuration</p>
                </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
                <div className="bg-white rounded-lg border border-gray-200 p-6 space-y-6">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Form Name *
                        </label>
                        <input
                            type="text"
                            required
                            value={formName}
                            onChange={(e) => setFormName(e.target.value)}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="e.g., Client Intake Form"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Description
                        </label>
                        <textarea
                            value={formDescription}
                            onChange={(e) => setFormDescription(e.target.value)}
                            rows={3}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="Describe what this form is for..."
                        />
                    </div>

                    <div className="flex items-center gap-3">
                        <input
                            type="checkbox"
                            id="password-protected"
                            checked={isPasswordProtected}
                            onChange={(e) => setIsPasswordProtected(e.target.checked)}
                            className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                        />
                        <label htmlFor="password-protected" className="text-sm font-medium text-gray-700">
                            Password Protect This Form
                        </label>
                    </div>

                    {isPasswordProtected && (
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Password {password ? '(Leave empty to keep current)' : '*'}
                            </label>
                            <input
                                type="password"
                                required={isPasswordProtected && !password}
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                        </div>
                    )}
                </div>

                <div className="bg-white rounded-lg border border-gray-200 p-6">
                    <div className="flex items-center justify-between mb-4">
                        <h2 className="text-lg font-semibold text-gray-900">Form Fields</h2>
                        <button
                            type="button"
                            onClick={addField}
                            className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors"
                        >
                            <Plus className="w-4 h-4" />
                            Add Field
                        </button>
                    </div>

                    <div className="space-y-4">
                        {fields.length === 0 ? (
                            <div className="text-center py-8 text-gray-500">
                                No fields added yet. Click "Add Field" to get started.
                            </div>
                        ) : (
                            fields.map((field, index) => (
                                <div key={field.id} className="border border-gray-200 rounded-lg p-4 space-y-3">
                                    <div className="flex items-center gap-3">
                                        <GripVertical className="w-5 h-5 text-gray-400" />
                                        <div className="flex-1 grid grid-cols-2 gap-3">
                                            <div>
                                                <label className="block text-xs font-medium text-gray-700 mb-1">
                                                    Field Label
                                                </label>
                                                <input
                                                    type="text"
                                                    value={field.label}
                                                    onChange={(e) => updateField(field.id, { label: e.target.value })}
                                                    className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                                    placeholder="e.g., First Name"
                                                />
                                            </div>
                                            <div>
                                                <label className="block text-xs font-medium text-gray-700 mb-1">
                                                    Field Type
                                                </label>
                                                <select
                                                    value={field.type}
                                                    onChange={(e) => updateField(field.id, { type: e.target.value as FieldType })}
                                                    className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                                >
                                                    <option value="text">Text</option>
                                                    <option value="email">Email</option>
                                                    <option value="phone">Phone</option>
                                                    <option value="textarea">Textarea</option>
                                                    <option value="select">Select</option>
                                                    <option value="checkbox">Checkbox</option>
                                                    <option value="date">Date</option>
                                                    <option value="number">Number</option>
                                                </select>
                                            </div>
                                        </div>
                                        <button
                                            type="button"
                                            onClick={() => removeField(field.id)}
                                            className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                                        >
                                            <Trash2 className="w-4 h-4" />
                                        </button>
                                    </div>

                                    <div className="flex items-center gap-4">
                                        <div className="flex items-center gap-2">
                                            <input
                                                type="checkbox"
                                                id={`required-${field.id}`}
                                                checked={field.required}
                                                onChange={(e) => updateField(field.id, { required: e.target.checked })}
                                                className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                                            />
                                            <label htmlFor={`required-${field.id}`} className="text-sm text-gray-700">
                                                Required
                                            </label>
                                        </div>
                                        {field.type === 'select' && (
                                            <div className="flex-1">
                                                <input
                                                    type="text"
                                                    value={field.options?.join(', ') || ''}
                                                    onChange={(e) => updateField(field.id, { options: e.target.value.split(',').map(s => s.trim()) })}
                                                    className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                                    placeholder="Option 1, Option 2, Option 3"
                                                />
                                            </div>
                                        )}
                                    </div>
                                </div>
                            ))
                        )}
                    </div>
                </div>

                <div className="flex items-center justify-end gap-4 pt-4 border-t border-gray-200">
                    <Link
                        href="/forms"
                        className="px-6 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                    >
                        Cancel
                    </Link>
                    <button
                        type="submit"
                        disabled={loading || !formName}
                        className="px-6 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50"
                    >
                        {loading ? 'Updating...' : 'Update Form'}
                    </button>
                </div>
            </form>
        </div>
    );
}

