import { HearingTable } from "@/components/hearings/HearingTable";

export default function UpcomingHearingsPage() {
    return (
        <div className="space-y-6">
            <h1 className="text-2xl font-bold text-slate-800">Upcoming Hearings</h1>
            <HearingTable title="Upcoming Hearings Schedule" filterStatus="Scheduled" />
        </div>
    );
}
