import { CasePointTable } from "@/components/case-points/CasePointTable";

export default function MyCasePointsPage() {
    return (
        <div className="space-y-6">
            <h1 className="text-2xl font-bold text-slate-800">My Case Points</h1>
            <CasePointTable title="My Case Points" filterMyPoints={true} />
        </div>
    );
}
