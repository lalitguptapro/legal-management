import { CaseTable } from "@/components/cases/CaseTable";

export const dynamic = 'force-dynamic';

export default function AllCasesPage() {
    return (
        <div className="space-y-6">
            <h1 className="text-2xl font-bold text-slate-800">All Cases</h1>
            <CaseTable title="All Cases Directory" />
        </div>
    );
}
