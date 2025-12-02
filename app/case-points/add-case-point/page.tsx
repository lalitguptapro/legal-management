import { CasePointForm } from "@/components/case-points/CasePointForm";

export default function AddCasePointPage() {
    return (
        <div className="max-w-4xl mx-auto">
            <h1 className="text-2xl font-bold text-slate-800 mb-6">Add Case Point</h1>
            <CasePointForm />
        </div>
    );
}
