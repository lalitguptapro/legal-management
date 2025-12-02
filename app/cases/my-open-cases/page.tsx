import { CaseTable } from "@/components/cases/CaseTable";

export default function MyOpenCasesPage() {
    return (
        <div className="space-y-6">
            <h1 className="text-2xl font-bold text-slate-800">My Open Cases</h1>
            <CaseTable title="My Active Cases" filterStatus="Open" />
        </div>
    );
}
