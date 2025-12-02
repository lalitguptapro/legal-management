import { CaseTable } from "@/components/cases/CaseTable";

export default function MyPendingCasesPage() {
    return (
        <div className="space-y-6">
            <h1 className="text-2xl font-bold text-slate-800">My Pending Cases</h1>
            <CaseTable title="My Pending Cases" filterStatus="Pending" />
        </div>
    );
}
