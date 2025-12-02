"use client";

import { SettingsList } from "@/components/settings/SettingsList";

const mockCourts = [
    { id: "1", name: "Supreme Court", description: "Highest court of appeal" },
    { id: "2", name: "High Court of Justice", description: "Superior court of record" },
    { id: "3", name: "District Court", description: "General jurisdiction trial court" },
    { id: "4", name: "Family Court", description: "Matters involving families and children" },
];

export default function CourtsPage() {
    return (
        <div className="space-y-6">
            <h1 className="text-2xl font-bold text-slate-800">Courts Directory</h1>
            <SettingsList
                title="Manage Courts"
                items={mockCourts}
                onAdd={() => alert("Add functionality would open a modal here")}
            />
        </div>
    );
}
