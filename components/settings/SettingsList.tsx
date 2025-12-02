import { Edit, Trash2, Plus } from "lucide-react";

type SettingItem = {
    id: string;
    name: string;
    description?: string;
};

export function SettingsList({ title, items, onAdd }: { title: string, items: SettingItem[], onAdd: () => void }) {
    return (
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
            <div className="px-6 py-4 border-b border-slate-200 flex justify-between items-center">
                <h2 className="text-lg font-semibold text-slate-800">{title}</h2>
                <button
                    onClick={onAdd}
                    className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 transition-colors"
                >
                    <Plus className="w-4 h-4" />
                    Add New
                </button>
            </div>
            <div className="divide-y divide-slate-200">
                {items.map((item) => (
                    <div key={item.id} className="px-6 py-4 flex items-center justify-between hover:bg-slate-50 transition-colors">
                        <div>
                            <h3 className="font-medium text-slate-900">{item.name}</h3>
                            {item.description && <p className="text-sm text-slate-500">{item.description}</p>}
                        </div>
                        <div className="flex items-center gap-2">
                            <button className="p-2 text-slate-400 hover:text-blue-600 transition-colors"><Edit className="w-4 h-4" /></button>
                            <button className="p-2 text-slate-400 hover:text-red-600 transition-colors"><Trash2 className="w-4 h-4" /></button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
