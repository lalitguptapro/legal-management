import { PeopleTable } from "@/components/people/PeopleTable";

export default function OpposingClientsPage() {
    return (
        <div className="space-y-6">
            <h1 className="text-2xl font-bold text-slate-800">Opposing Clients</h1>
            <PeopleTable title="Opposing Client Directory" filterRole="Opposing Client" />
        </div>
    );
}
