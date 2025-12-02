import { TaskForm } from "@/components/tasks/TaskForm";

export default function AddTaskPage() {
    return (
        <div className="max-w-4xl mx-auto">
            <h1 className="text-2xl font-bold text-slate-800 mb-6">Create New Task</h1>
            <TaskForm />
        </div>
    );
}
