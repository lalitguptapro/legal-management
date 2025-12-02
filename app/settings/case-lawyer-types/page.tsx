"use client";

import { SettingsList } from "@/components/settings/SettingsList";

const mockTypes = [
    { id: "1", name: "Criminal Defense", description: "Cases involving criminal charges" },
    { id: "2", name: "Corporate Law", description: "Business and corporate related matters" },
    { id: "3", name: "Family Law", description: "Divorce, custody, and family matters" },
    { id: "4", name: "Civil Litigation", description: "Non-criminal legal disputes" },
];

export default function CaseLawyerTypesPage() {
    return (
        <div className="space-y-6">
            <h1 className="text-2xl font-bold text-slate-800">Case & Lawyer Types</h1>
            <SettingsList
                title="Manage Case Types"
                items={mockTypes}
                onAdd={() => alert("Add functionality would open a modal here")}
            />
        </div>
    );
}
