import { HearingForm } from "@/components/hearings/HearingForm";

export default function AddHearingPage() {
    return (
        <div className="max-w-4xl mx-auto">
            <h1 className="text-2xl font-bold text-slate-800 mb-6">Schedule New Hearing</h1>
            <HearingForm />
        </div>
    );
}
