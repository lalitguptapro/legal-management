import { CasePointTable } from "@/components/case-points/CasePointTable";

export default function AllCasePointsPage() {
    return (
        <div className="space-y-6">
            <h1 className="text-2xl font-bold text-slate-800">All Case Points</h1>
            <CasePointTable title="All Case Points" />
        </div>
    );
}
