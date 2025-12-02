import { CaseTable } from "@/components/cases/CaseTable";

export default function MyCaseHistoryPage() {
    return (
        <div className="space-y-6">
            <h1 className="text-2xl font-bold text-slate-800">My Case History</h1>
            <CaseTable title="My Closed Cases" filterStatus="Closed" />
        </div>
    );
}
