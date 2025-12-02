import { CaseForm } from "@/components/cases/CaseForm";

export default function AddCasePage() {
    return (
        <div className="max-w-4xl mx-auto">
            <h1 className="text-2xl font-bold text-slate-800 mb-6">Add New Case</h1>
            <CaseForm />
        </div>
    );
}
