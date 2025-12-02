import { FileText, Download, Eye, Trash2 } from "lucide-react";

type Document = {
    id: string;
    name: string;
    type: string;
    case: string;
    uploadedBy: string;
    date: string;
    size: string;
};

const mockDocuments: Document[] = [
    { id: "D-001", name: "Case Brief.pdf", type: "PDF", case: "Smith vs. Jones", uploadedBy: "Sarah Connor", date: "2024-11-01", size: "2.4 MB" },
    { id: "D-002", name: "Evidence Photo.jpg", type: "Image", case: "State vs. Doe", uploadedBy: "Mike Ross", date: "2024-11-05", size: "5.1 MB" },
    { id: "D-003", name: "Contract Draft.docx", type: "Word", case: "Tech Corp Merger", uploadedBy: "Harvey Specter", date: "2024-11-10", size: "1.2 MB" },
];

export function DocumentTable({ title }: { title: string }) {
    // In a real app, we'd filter by current user ID
    const filteredDocs = mockDocuments;

    return (
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
            <div className="px-6 py-4 border-b border-slate-200 flex justify-between items-center">
                <h2 className="text-lg font-semibold text-slate-800">{title}</h2>
                <button className="px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 transition-colors">
                    Upload Document
                </button>
            </div>
            <div className="overflow-x-auto">
                <table className="w-full text-left text-sm text-slate-600">
                    <thead className="bg-slate-50 text-slate-900 font-medium">
                        <tr>
                            <th className="px-6 py-3">Name</th>
                            <th className="px-6 py-3">Case</th>
                            <th className="px-6 py-3">Uploaded By</th>
                            <th className="px-6 py-3">Date</th>
                            <th className="px-6 py-3">Size</th>
                            <th className="px-6 py-3 text-right">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-200">
                        {filteredDocs.map((d) => (
                            <tr key={d.id} className="hover:bg-slate-50 transition-colors">
                                <td className="px-6 py-4 font-medium text-slate-900">
                                    <div className="flex items-center gap-3">
                                        <FileText className="w-5 h-5 text-blue-500" />
                                        {d.name}
                                    </div>
                                </td>
                                <td className="px-6 py-4">{d.case}</td>
                                <td className="px-6 py-4">{d.uploadedBy}</td>
                                <td className="px-6 py-4">{d.date}</td>
                                <td className="px-6 py-4">{d.size}</td>
                                <td className="px-6 py-4 text-right">
                                    <div className="flex items-center justify-end gap-2">
                                        <button className="p-1 text-slate-400 hover:text-blue-600 transition-colors"><Eye className="w-4 h-4" /></button>
                                        <button className="p-1 text-slate-400 hover:text-blue-600 transition-colors"><Download className="w-4 h-4" /></button>
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
