import { TaskTable } from "@/components/tasks/TaskTable";

export default function MyTasksPage() {
    return (
        <div className="space-y-6">
            <h1 className="text-2xl font-bold text-slate-800">My Tasks</h1>
            <TaskTable title="My Tasks" />
        </div>
    );
}
