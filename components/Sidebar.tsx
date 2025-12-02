"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { cn } from "@/lib/utils";
import {
    LayoutDashboard,
    Briefcase,
    Users,
    UserCheck,
    FileText,
    FileCheck,
    Gavel,
    CheckSquare,
    Settings,
    ChevronDown,
    ChevronRight,
    Menu,
} from "lucide-react";

type NavItem = {
    title: string;
    href?: string;
    icon: React.ElementType;
    submenu?: { title: string; href: string }[];
};

const navItems: NavItem[] = [
    {
        title: "Dashboard",
        href: "/dashboard",
        icon: LayoutDashboard,
    },
    {
        title: "Cases",
        icon: Briefcase,
        submenu: [
            { title: "Add Case", href: "/cases/add-case" },
            { title: "All Cases", href: "/cases/all-cases" },
            { title: "All Pending Cases", href: "/cases/pending-cases" },
            { title: "All Case History", href: "/cases/case-history" },
            { title: "My Open Cases", href: "/cases/my-open-cases" },
            { title: "My Pending Cases", href: "/cases/my-pending-cases" },
            { title: "My Case History", href: "/cases/my-case-history" },
        ],
    },
    {
        title: "Lawyers",
        icon: UserCheck,
        submenu: [
            { title: "Add Lawyers", href: "/lawyers/add-lawyer" },
            { title: "Lawyers", href: "/lawyers/all-lawyers" },
        ],
    },
    {
        title: "People",
        icon: Users,
        submenu: [
            { title: "Add People", href: "/people/add-people" },
            { title: "Clients", href: "/people/clients" },
            { title: "Opposing Clients", href: "/people/opposing-clients" },
            { title: "Case Witness", href: "/people/case-witness" },
        ],
    },
    {
        title: "Documents",
        icon: FileText,
        submenu: [
            { title: "All Documents", href: "/documents/all-documents" },
            { title: "My Case Documents", href: "/documents/my-case-documents" },
        ],
    },
    {
        title: "Case Points",
        icon: FileCheck,
        submenu: [
            { title: "Add Case Points", href: "/case-points/add-case-point" },
            { title: "All Case Points", href: "/case-points/all-case-points" },
            { title: "My Case Points", href: "/case-points/my-case-points" },
        ],
    },
    {
        title: "Hearing Details",
        icon: Gavel,
        submenu: [
            { title: "Add Hearing Date", href: "/hearing-details/add-hearing" },
            { title: "Upcoming Hearing", href: "/hearing-details/upcoming-hearings" },
            { title: "Hearing History", href: "/hearing-details/hearing-history" },
            { title: "My Upcoming History", href: "/hearing-details/my-upcoming-hearings" },
            { title: "My Hearing History", href: "/hearing-details/my-hearing-history" },
        ],
    },
    {
        title: "Tasks",
        icon: CheckSquare,
        submenu: [
            { title: "Add Task", href: "/tasks/add-task" },
            { title: "All Tasks", href: "/tasks/all-tasks" },
            { title: "My Open Tasks", href: "/tasks/my-open-tasks" },
            { title: "My Tasks", href: "/tasks/my-tasks" },
            { title: "My Task History", href: "/tasks/my-task-history" },
        ],
    },
    {
        title: "Settings",
        icon: Settings,
        submenu: [
            { title: "All Case/Lawyer Types", href: "/settings/case-lawyer-types" },
            { title: "All Judges", href: "/settings/judges" },
            { title: "Courts", href: "/settings/courts" },
        ],
    },
];

export function Sidebar() {
    const pathname = usePathname();
    const [isMobileOpen, setIsMobileOpen] = useState(false);
    const [openSubmenus, setOpenSubmenus] = useState<Record<string, boolean>>({});

    const toggleSubmenu = (title: string) => {
        setOpenSubmenus((prev) => ({ ...prev, [title]: !prev[title] }));
    };

    return (
        <>
            {/* Mobile Toggle */}
            <button
                className="lg:hidden fixed top-4 left-4 z-50 p-2 bg-white rounded-md shadow-md"
                onClick={() => setIsMobileOpen(!isMobileOpen)}
            >
                <Menu className="w-6 h-6 text-slate-800" />
            </button>

            {/* Sidebar Container */}
            <aside
                className={cn(
                    "fixed inset-y-0 left-0 z-40 w-64 bg-[#1e293b] text-white transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static lg:h-screen overflow-y-auto",
                    isMobileOpen ? "translate-x-0" : "-translate-x-full"
                )}
            >
                <div className="flex items-center justify-center h-16 border-b border-slate-700">
                    <h1 className="text-xl font-bold tracking-wider">LegalManager</h1>
                </div>

                <nav className="p-4 space-y-1">
                    {navItems.map((item) => (
                        <div key={item.title}>
                            {item.submenu ? (
                                <div>
                                    <button
                                        onClick={() => toggleSubmenu(item.title)}
                                        className={cn(
                                            "flex items-center justify-between w-full px-4 py-3 text-sm font-medium rounded-lg transition-colors",
                                            openSubmenus[item.title]
                                                ? "bg-slate-800 text-white"
                                                : "text-slate-400 hover:bg-slate-800 hover:text-white"
                                        )}
                                    >
                                        <div className="flex items-center gap-3">
                                            <item.icon className="w-5 h-5" />
                                            <span>{item.title}</span>
                                        </div>
                                        {openSubmenus[item.title] ? (
                                            <ChevronDown className="w-4 h-4" />
                                        ) : (
                                            <ChevronRight className="w-4 h-4" />
                                        )}
                                    </button>

                                    {openSubmenus[item.title] && (
                                        <div className="mt-1 ml-4 space-y-1 border-l border-slate-700 pl-2">
                                            {item.submenu.map((subItem) => (
                                                <Link
                                                    key={subItem.href}
                                                    href={subItem.href}
                                                    className={cn(
                                                        "block px-4 py-2 text-sm rounded-md transition-colors",
                                                        pathname === subItem.href
                                                            ? "bg-blue-600 text-white"
                                                            : "text-slate-400 hover:text-white hover:bg-slate-800"
                                                    )}
                                                >
                                                    {subItem.title}
                                                </Link>
                                            ))}
                                        </div>
                                    )}
                                </div>
                            ) : (
                                <Link
                                    href={item.href!}
                                    className={cn(
                                        "flex items-center gap-3 px-4 py-3 text-sm font-medium rounded-lg transition-colors",
                                        pathname === item.href
                                            ? "bg-blue-600 text-white"
                                            : "text-slate-400 hover:bg-slate-800 hover:text-white"
                                    )}
                                >
                                    <item.icon className="w-5 h-5" />
                                    <span>{item.title}</span>
                                </Link>
                            )}
                        </div>
                    ))}
                </nav>
            </aside>

            {/* Overlay for mobile */}
            {isMobileOpen && (
                <div
                    className="fixed inset-0 z-30 bg-black/50 lg:hidden"
                    onClick={() => setIsMobileOpen(false)}
                />
            )}
        </>
    );
}
