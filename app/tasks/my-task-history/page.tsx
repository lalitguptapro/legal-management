import { TaskTable } from "@/components/tasks/TaskTable";

export default function MyTaskHistoryPage() {
    return (
        <div className="space-y-6">
            <h1 className="text-2xl font-bold text-slate-800">My Task History</h1>
            <TaskTable title="My Completed Tasks" filterStatus="Completed" filterMyTasks={true} />
        </div>
    );
}
