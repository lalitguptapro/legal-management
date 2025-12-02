import { HearingTable } from "@/components/hearings/HearingTable";

export default function HearingHistoryPage() {
    return (
        <div className="space-y-6">
            <h1 className="text-2xl font-bold text-slate-800">Hearing History</h1>
            <HearingTable title="Past Hearings" filterStatus="Completed" />
        </div>
    );
}
