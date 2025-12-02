import { LawyerForm } from "@/components/lawyers/LawyerForm";

export default function AddLawyerPage() {
    return (
        <div className="max-w-4xl mx-auto">
            <h1 className="text-2xl font-bold text-slate-800 mb-6">Add New Lawyer</h1>
            <LawyerForm />
        </div>
    );
}
