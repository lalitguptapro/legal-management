import { DocumentTable } from "@/components/documents/DocumentTable";

export default function MyCaseDocumentsPage() {
    return (
        <div className="space-y-6">
            <h1 className="text-2xl font-bold text-slate-800">My Case Documents</h1>
            <DocumentTable title="My Documents" filterMyDocs={true} />
        </div>
    );
}
