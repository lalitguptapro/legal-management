import { LawyerTable } from "@/components/lawyers/LawyerTable";

export default function AllLawyersPage() {
    return (
        <div className="space-y-6">
            <h1 className="text-2xl font-bold text-slate-800">All Lawyers</h1>
            <LawyerTable />
        </div>
    );
}
