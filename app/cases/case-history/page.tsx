import { CaseTable } from "@/components/cases/CaseTable";

export default function CaseHistoryPage() {
    return (
        <div className="space-y-6">
            <h1 className="text-2xl font-bold text-slate-800">Case History</h1>
            <CaseTable title="Closed Cases Archive" filterStatus="Closed" />
        </div>
    );
}
