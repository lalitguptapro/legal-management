import { TaskTable } from "@/components/tasks/TaskTable";

export default function MyOpenTasksPage() {
    return (
        <div className="space-y-6">
            <h1 className="text-2xl font-bold text-slate-800">My Open Tasks</h1>
            <TaskTable title="My Active Tasks" filterStatus="Open" filterMyTasks={true} />
        </div>
    );
}
