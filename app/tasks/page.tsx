'use client';

import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';
import { Plus, Search, CheckCircle2, Circle, Flag, Edit, Trash2 } from 'lucide-react';
import { toast } from 'sonner';
import Link from 'next/link';
import { DeleteConfirmModal } from '@/components/ui/DeleteConfirmModal';

interface Task {
    id: string;
    title: string;
    description?: string;
    contact_id?: string;
    due_date?: string;
    priority: string;
    status: string;
    contact?: {
        first_name: string;
        last_name: string;
    };
}

export default function TasksPage() {
    const [tasks, setTasks] = useState<Task[]>([]);
    const [loading, setLoading] = useState(true);
    const [filterStatus, setFilterStatus] = useState<string>('all');
    const [filterPriority, setFilterPriority] = useState<string>('all');
    const [searchTerm, setSearchTerm] = useState('');
    const [deleteModal, setDeleteModal] = useState<{ isOpen: boolean; task: Task | null }>({
        isOpen: false,
        task: null,
    });

    useEffect(() => {
        fetchTasks();
    }, []);

    const fetchTasks = async () => {
        try {
            const { data, error } = await supabase
                .from('tasks')
                .select(`
                    *,
                    contact:contacts(id, first_name, last_name)
                `)
                .order('created_at', { ascending: false });

            if (error) throw error;
            setTasks(data || []);
        } catch (error: any) {
            console.error('Error fetching tasks:', error);
            toast.error('Failed to fetch tasks');
        } finally {
            setLoading(false);
        }
    };

    const handleToggleComplete = async (taskId: string, currentStatus: string) => {
        const newStatus = currentStatus === 'Completed' ? 'Open' : 'Completed';
        try {
            const { error } = await supabase
                .from('tasks')
                .update({ status: newStatus, updated_at: new Date().toISOString() })
                .eq('id', taskId);

            if (error) throw error;
            toast.success(`Task marked as ${newStatus}`);
            fetchTasks();
        } catch (error: any) {
            toast.error(error.message || 'Failed to update task');
        }
    };

    const handleDelete = async (task: Task) => {
        try {
            const { error } = await supabase
                .from('tasks')
                .delete()
                .eq('id', task.id);

            if (error) throw error;

            toast.success('Task deleted successfully');
            fetchTasks();
        } catch (error: any) {
            console.error('Error deleting task:', error);
            toast.error(error.message || 'Failed to delete task');
        }
    };

    const getPriorityColor = (priority: string) => {
        switch (priority) {
            case 'Urgent': return 'text-red-600';
            case 'High': return 'text-orange-600';
            case 'Medium': return 'text-yellow-600';
            case 'Low': return 'text-gray-600';
            default: return 'text-gray-600';
        }
    };

    const filteredTasks = tasks.filter(task => {
        const matchesSearch = task.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
            task.description?.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesStatus = filterStatus === 'all' || task.status === filterStatus;
        const matchesPriority = filterPriority === 'all' || task.priority === filterPriority;
        return matchesSearch && matchesStatus && matchesPriority;
    });

    if (loading) {
        return (
            <div className="flex items-center justify-center h-64">
                <div className="text-gray-500">Loading tasks...</div>
            </div>
        );
    }

    return (
        <>
            <div className="p-6 space-y-6">
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-2xl font-semibold text-gray-900">Tasks</h1>
                        <p className="text-gray-600 mt-1">Manage your tasks and to-dos</p>
                    </div>
                    <Link
                        href="/tasks/create"
                        className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors"
                    >
                        <Plus className="w-4 h-4" />
                        Create Task
                    </Link>
                </div>

                <div className="bg-white rounded-lg border border-gray-200">
                    <div className="p-4 border-b border-gray-200 flex items-center gap-4">
                        <div className="flex-1 relative">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                            <input
                                type="text"
                                placeholder="Search tasks..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="w-full pl-10 pr-4 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                        </div>
                        <select
                            value={filterStatus}
                            onChange={(e) => setFilterStatus(e.target.value)}
                            className="px-4 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        >
                            <option value="all">All Status</option>
                            <option value="Open">Open</option>
                            <option value="In Progress">In Progress</option>
                            <option value="Completed">Completed</option>
                            <option value="Cancelled">Cancelled</option>
                        </select>
                        <select
                            value={filterPriority}
                            onChange={(e) => setFilterPriority(e.target.value)}
                            className="px-4 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        >
                            <option value="all">All Priorities</option>
                            <option value="Urgent">Urgent</option>
                            <option value="High">High</option>
                            <option value="Medium">Medium</option>
                            <option value="Low">Low</option>
                        </select>
                    </div>

                    <div className="divide-y divide-gray-200">
                        {filteredTasks.length === 0 ? (
                            <div className="p-12 text-center text-gray-500">
                                No tasks found. Create your first task to get started.
                            </div>
                        ) : (
                            filteredTasks.map((task) => (
                                <div key={task.id} className="p-4 hover:bg-gray-50 transition-colors">
                                    <div className="flex items-start gap-4">
                                        <button
                                            onClick={() => handleToggleComplete(task.id, task.status)}
                                            className="mt-1"
                                        >
                                            {task.status === 'Completed' ? (
                                                <CheckCircle2 className="w-5 h-5 text-green-600" />
                                            ) : (
                                                <Circle className="w-5 h-5 text-gray-400" />
                                            )}
                                        </button>
                                        <div className="flex-1">
                                            <div className="flex items-center gap-3 mb-1">
                                                <h3 className={`font-medium ${task.status === 'Completed' ? 'line-through text-gray-400' : 'text-gray-900'}`}>
                                                    {task.title}
                                                </h3>
                                                <Flag className={`w-4 h-4 ${getPriorityColor(task.priority)}`} />
                                                <span className="text-xs text-gray-500">{task.priority}</span>
                                            </div>
                                            {task.description && (
                                                <p className="text-sm text-gray-600 mb-2">{task.description}</p>
                                            )}
                                            <div className="flex items-center gap-4 text-xs text-gray-500">
                                                {task.contact && (
                                                    <span>
                                                        Contact: {task.contact.first_name} {task.contact.last_name}
                                                    </span>
                                                )}
                                                {task.due_date && (
                                                    <span>
                                                        Due: {new Date(task.due_date).toLocaleDateString()}
                                                    </span>
                                                )}
                                            </div>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <Link
                                                href={`/tasks/${task.id}/edit`}
                                                className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                                            >
                                                <Edit className="w-4 h-4" />
                                            </Link>
                                            <button
                                                onClick={() => setDeleteModal({ isOpen: true, task })}
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
                </div>
            </div>

            <DeleteConfirmModal
                isOpen={deleteModal.isOpen}
                onClose={() => setDeleteModal({ isOpen: false, task: null })}
                onConfirm={() => deleteModal.task && handleDelete(deleteModal.task)}
                title="Delete Task"
                message="Are you sure you want to delete this task? This action cannot be undone."
                itemName={deleteModal.task?.title}
            />
        </>
    );
}
