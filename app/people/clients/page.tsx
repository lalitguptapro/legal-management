import { PeopleTable } from "@/components/people/PeopleTable";

export const dynamic = 'force-dynamic';

export default function ClientsPage() {
    return (
        <div className="space-y-6">
            <h1 className="text-2xl font-bold text-slate-800">Clients</h1>
            <PeopleTable title="Client Directory" filterRole="Client" />
        </div>
    );
}
