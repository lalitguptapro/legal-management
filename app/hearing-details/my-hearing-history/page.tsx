import { HearingTable } from "@/components/hearings/HearingTable";

export default function MyHearingHistoryPage() {
    return (
        <div className="space-y-6">
            <h1 className="text-2xl font-bold text-slate-800">My Hearing History</h1>
            <HearingTable title="My Past Hearings" filterStatus="Completed" filterMyHearings={true} />
        </div>
    );
}
