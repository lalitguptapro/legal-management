import { Briefcase, Users, Gavel, CheckSquare } from "lucide-react";

export default function Dashboard() {
    return (
        <div className="space-y-6">
            <h1 className="text-2xl font-bold text-slate-800">Dashboard</h1>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm font-medium text-slate-500">Total Cases</p>
                            <h3 className="text-2xl font-bold text-slate-800 mt-1">128</h3>
                        </div>
                        <div className="p-3 bg-blue-50 text-blue-600 rounded-lg">
                            <Briefcase className="w-6 h-6" />
                        </div>
                    </div>
                    <div className="mt-4 flex items-center text-sm">
                        <span className="text-green-500 font-medium">+12%</span>
                        <span className="text-slate-400 ml-2">from last month</span>
                    </div>
                </div>

                <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm font-medium text-slate-500">Active Lawyers</p>
                            <h3 className="text-2xl font-bold text-slate-800 mt-1">24</h3>
                        </div>
                        <div className="p-3 bg-purple-50 text-purple-600 rounded-lg">
                            <Users className="w-6 h-6" />
                        </div>
                    </div>
                    <div className="mt-4 flex items-center text-sm">
                        <span className="text-green-500 font-medium">+2</span>
                        <span className="text-slate-400 ml-2">new this month</span>
                    </div>
                </div>

                <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm font-medium text-slate-500">Pending Hearings</p>
                            <h3 className="text-2xl font-bold text-slate-800 mt-1">14</h3>
                        </div>
                        <div className="p-3 bg-orange-50 text-orange-600 rounded-lg">
                            <Gavel className="w-6 h-6" />
                        </div>
                    </div>
                    <div className="mt-4 flex items-center text-sm">
                        <span className="text-red-500 font-medium">3 urgent</span>
                        <span className="text-slate-400 ml-2">need attention</span>
                    </div>
                </div>

                <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm font-medium text-slate-500">Open Tasks</p>
                            <h3 className="text-2xl font-bold text-slate-800 mt-1">42</h3>
                        </div>
                        <div className="p-3 bg-green-50 text-green-600 rounded-lg">
                            <CheckSquare className="w-6 h-6" />
                        </div>
                    </div>
                    <div className="mt-4 flex items-center text-sm">
                        <span className="text-slate-500 font-medium">85%</span>
                        <span className="text-slate-400 ml-2">completion rate</span>
                    </div>
                </div>
            </div>

            {/* Recent Activity & Upcoming Hearings */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100">
                    <h2 className="text-lg font-bold text-slate-800 mb-4">Recent Activity</h2>
                    <div className="space-y-4">
                        {[1, 2, 3, 4].map((i) => (
                            <div key={i} className="flex items-start gap-4 pb-4 border-b border-slate-50 last:border-0 last:pb-0">
                                <div className="w-2 h-2 mt-2 rounded-full bg-blue-500" />
                                <div>
                                    <p className="text-sm font-medium text-slate-800">Case #2024-{100 + i} updated</p>
                                    <p className="text-xs text-slate-500 mt-1">New document uploaded by John Doe</p>
                                    <p className="text-xs text-slate-400 mt-1">2 hours ago</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100">
                    <h2 className="text-lg font-bold text-slate-800 mb-4">Upcoming Hearings</h2>
                    <div className="space-y-4">
                        {[1, 2, 3, 4].map((i) => (
                            <div key={i} className="flex items-center justify-between p-3 bg-slate-50 rounded-lg">
                                <div className="flex items-center gap-3">
                                    <div className="flex flex-col items-center justify-center w-12 h-12 bg-white rounded-md border border-slate-200 shadow-sm">
                                        <span className="text-xs font-bold text-red-500">NOV</span>
                                        <span className="text-lg font-bold text-slate-800">{10 + i}</span>
                                    </div>
                                    <div>
                                        <p className="text-sm font-medium text-slate-800">Smith vs. Jones</p>
                                        <p className="text-xs text-slate-500">High Court, Room 302</p>
                                    </div>
                                </div>
                                <span className="px-2 py-1 text-xs font-medium text-blue-600 bg-blue-50 rounded-full">
                                    10:00 AM
                                </span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
