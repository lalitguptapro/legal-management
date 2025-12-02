import { Eye, Edit, Trash2, Calendar, CheckCircle } from "lucide-react";

type Task = {
    id: string;
    title: string;
    assignedTo: string;
    dueDate: string;
    priority: "High" | "Medium" | "Low";
    status: "Open" | "In Progress" | "Completed";
};

const mockTasks: Task[] = [
    { id: "T-001", title: "Review Contract Draft", assignedTo: "Sarah Connor", dueDate: "2024-11-18", priority: "High", status: "Open" },
    { id: "T-002", title: "File Motion to Dismiss", assignedTo: "Mike Ross", dueDate: "2024-11-20", priority: "Medium", status: "In Progress" },
    { id: "T-003", title: "Client Meeting Prep", assignedTo: "Harvey Specter", dueDate: "2024-11-15", priority: "Low", status: "Completed" },
];

export function TaskTable({ title, filterStatus, filterMyTasks }: { title: string, filterStatus?: string, filterMyTasks?: boolean }) {
    const filteredTasks = filterStatus
        ? mockTasks.filter(t => t.status === filterStatus)
        : mockTasks;

    return (
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
            <div className="px-6 py-4 border-b border-slate-200 flex justify-between items-center">
                <h2 className="text-lg font-semibold text-slate-800">{title}</h2>
                <button className="px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 transition-colors">
                    Add Task
                </button>
            </div>
            <div className="overflow-x-auto">
                <table className="w-full text-left text-sm text-slate-600">
                    <thead className="bg-slate-50 text-slate-900 font-medium">
                        <tr>
                            <th className="px-6 py-3">Task</th>
                            <th className="px-6 py-3">Assigned To</th>
                            <th className="px-6 py-3">Due Date</th>
                            <th className="px-6 py-3">Priority</th>
                            <th className="px-6 py-3">Status</th>
                            <th className="px-6 py-3 text-right">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-200">
                        {filteredTasks.map((t) => (
                            <tr key={t.id} className="hover:bg-slate-50 transition-colors">
                                <td className="px-6 py-4 font-medium text-slate-900">
                                    <div className="flex items-center gap-2">
                                        <CheckCircle className={`w-4 h-4 ${t.status === 'Completed' ? 'text-green-500' : 'text-slate-300'}`} />
                                        {t.title}
                                    </div>
                                </td>
                                <td className="px-6 py-4">{t.assignedTo}</td>
                                <td className="px-6 py-4">
                                    <div className="flex items-center gap-2">
                                        <Calendar className="w-4 h-4 text-slate-400" />
                                        {t.dueDate}
                                    </div>
                                </td>
                                <td className="px-6 py-4">
                                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium
                    ${t.priority === 'High' ? 'bg-red-100 text-red-800' :
                                            t.priority === 'Medium' ? 'bg-yellow-100 text-yellow-800' :
                                                'bg-green-100 text-green-800'}`}>
                                        {t.priority}
                                    </span>
                                </td>
                                <td className="px-6 py-4">
                                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium
                    ${t.status === 'Open' ? 'bg-blue-100 text-blue-800' :
                                            t.status === 'In Progress' ? 'bg-purple-100 text-purple-800' :
                                                'bg-green-100 text-green-800'}`}>
                                        {t.status}
                                    </span>
                                </td>
                                <td className="px-6 py-4 text-right">
                                    <div className="flex items-center justify-end gap-2">
                                        <button className="p-1 text-slate-400 hover:text-blue-600 transition-colors"><Eye className="w-4 h-4" /></button>
                                        <button className="p-1 text-slate-400 hover:text-blue-600 transition-colors"><Edit className="w-4 h-4" /></button>
                                        <button className="p-1 text-slate-400 hover:text-red-600 transition-colors"><Trash2 className="w-4 h-4" /></button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
