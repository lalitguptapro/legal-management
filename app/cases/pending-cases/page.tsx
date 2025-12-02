import { CaseTable } from "@/components/cases/CaseTable";

export default function PendingCasesPage() {
    return (
        <div className="space-y-6">
            <h1 className="text-2xl font-bold text-slate-800">Pending Cases</h1>
            <CaseTable title="All Pending Cases" filterStatus="Pending" />
        </div>
    );
}
