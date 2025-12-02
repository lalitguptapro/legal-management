import { Eye, Edit, Trash2 } from "lucide-react";

type CasePoint = {
    id: string;
    title: string;
    case: string;
    addedBy: string;
    date: string;
    status: "Draft" | "Finalized";
};

const mockPoints: CasePoint[] = [
    { id: "CP-001", title: "Key Witness Testimony Contradiction", case: "Smith vs. Jones", addedBy: "Sarah Connor", date: "2024-11-12", status: "Draft" },
    { id: "CP-002", title: "Precedent from 1998 Ruling", case: "State vs. Doe", addedBy: "Mike Ross", date: "2024-11-14", status: "Finalized" },
];

export function CasePointTable({ title, filterMyPoints }: { title: string, filterMyPoints?: boolean }) {
    const filteredPoints = mockPoints;

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
                            <th className="px-6 py-3">Title</th>
                            <th className="px-6 py-3">Case</th>
                            <th className="px-6 py-3">Added By</th>
                            <th className="px-6 py-3">Date</th>
                            <th className="px-6 py-3">Status</th>
                            <th className="px-6 py-3 text-right">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-200">
                        {filteredPoints.map((p) => (
                            <tr key={p.id} className="hover:bg-slate-50 transition-colors">
                                <td className="px-6 py-4 font-medium text-slate-900">{p.title}</td>
                                <td className="px-6 py-4">{p.case}</td>
                                <td className="px-6 py-4">{p.addedBy}</td>
                                <td className="px-6 py-4">{p.date}</td>
                                <td className="px-6 py-4">
                                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium
                    ${p.status === 'Finalized' ? 'bg-green-100 text-green-800' :
                                            'bg-yellow-100 text-yellow-800'}`}>
                                        {p.status}
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
