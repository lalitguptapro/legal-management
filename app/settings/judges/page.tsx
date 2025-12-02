"use client";

import { SettingsList } from "@/components/settings/SettingsList";

const mockJudges = [
    { id: "1", name: "Hon. Jane Doe", description: "High Court Judge" },
    { id: "2", name: "Hon. John Smith", description: "District Court Judge" },
    { id: "3", name: "Hon. Robert Baratheon", description: "Supreme Court Justice" },
];

export default function JudgesPage() {
    return (
        <div className="space-y-6">
            <h1 className="text-2xl font-bold text-slate-800">Judges Directory</h1>
            <SettingsList
                title="Manage Judges"
                items={mockJudges}
                onAdd={() => alert("Add functionality would open a modal here")}
            />
        </div>
    );
}
