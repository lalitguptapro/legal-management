import { TaskTable } from "@/components/tasks/TaskTable";

export default function AllTasksPage() {
    return (
        <div className="space-y-6">
            <h1 className="text-2xl font-bold text-slate-800">All Tasks</h1>
            <TaskTable title="All Tasks" />
        </div>
    );
}
