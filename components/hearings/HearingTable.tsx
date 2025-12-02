import { Eye, Edit, Trash2, Calendar, MapPin } from "lucide-react";

type Hearing = {
    id: string;
    case: string;
    date: string;
    time: string;
    court: string;
    judge: string;
    status: "Scheduled" | "Completed" | "Cancelled";
};

const mockHearings: Hearing[] = [
    { id: "H-001", case: "Smith vs. Jones", date: "2024-11-20", time: "10:00 AM", court: "High Court, Room 302", judge: "Hon. Jane Doe", status: "Scheduled" },
    { id: "H-002", case: "State vs. Doe", date: "2024-11-22", time: "02:00 PM", court: "District Court, Room 101", judge: "Hon. John Smith", status: "Scheduled" },
    { id: "H-003", case: "Tech Corp Merger", date: "2024-10-15", time: "11:00 AM", court: "Commercial Court", judge: "Hon. Robert Baratheon", status: "Completed" },
];

export function HearingTable({ title, filterStatus }: { title: string, filterStatus?: string }) {
    const filteredHearings = filterStatus
        ? mockHearings.filter(h => h.status === filterStatus)
        : mockHearings;

    return (
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
            <div className="px-6 py-4 border-b border-slate-200 flex justify-between items-center">
                <h2 className="text-lg font-semibold text-slate-800">{title}</h2>
                <button className="px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 transition-colors">
                    Export CSV
                </button>
            </div>
            <div className="overflow-x-auto">
                <table className="w-full text-left text-sm text-slate-600">
                    <thead className="bg-slate-50 text-slate-900 font-medium">
                        <tr>
                            <th className="px-6 py-3">Case</th>
                            <th className="px-6 py-3">Date & Time</th>
                            <th className="px-6 py-3">Location</th>
                            <th className="px-6 py-3">Judge</th>
                            <th className="px-6 py-3">Status</th>
                            <th className="px-6 py-3 text-right">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-200">
                        {filteredHearings.map((h) => (
                            <tr key={h.id} className="hover:bg-slate-50 transition-colors">
                                <td className="px-6 py-4 font-medium text-slate-900">{h.case}</td>
                                <td className="px-6 py-4">
                                    <div className="flex items-center gap-2">
                                        <Calendar className="w-4 h-4 text-slate-400" />
                                        {h.date} at {h.time}
                                    </div>
                                </td>
                                <td className="px-6 py-4">
                                    <div className="flex items-center gap-2">
                                        <MapPin className="w-4 h-4 text-slate-400" />
                                        {h.court}
                                    </div>
                                </td>
                                <td className="px-6 py-4">{h.judge}</td>
                                <td className="px-6 py-4">
                                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium
                    ${h.status === 'Scheduled' ? 'bg-blue-100 text-blue-800' :
                                            h.status === 'Completed' ? 'bg-green-100 text-green-800' :
                                                'bg-red-100 text-red-800'}`}>
                                        {h.status}
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
