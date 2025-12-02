import { HearingTable } from "@/components/hearings/HearingTable";

export default function MyUpcomingHearingsPage() {
    return (
        <div className="space-y-6">
            <h1 className="text-2xl font-bold text-slate-800">My Upcoming Hearings</h1>
            <HearingTable title="My Schedule" filterStatus="Scheduled" />
        </div>
    );
}
