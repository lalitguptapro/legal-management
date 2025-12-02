import { PeopleForm } from "@/components/people/PeopleForm";

export const dynamic = 'force-dynamic';

export default function AddPeoplePage() {
    return (
        <div className="max-w-4xl mx-auto">
            <h1 className="text-2xl font-bold text-slate-800 mb-6">Add New Person</h1>
            <PeopleForm />
        </div>
    );
}
