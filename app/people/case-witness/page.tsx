import { PeopleTable } from "@/components/people/PeopleTable";

export const dynamic = 'force-dynamic';

export default function CaseWitnessPage() {
    return (
        <div className="space-y-6">
            <h1 className="text-2xl font-bold text-slate-800">Case Witnesses</h1>
            <PeopleTable title="Witness Directory" filterRole="Witness" />
        </div>
    );
}
