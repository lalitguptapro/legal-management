"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { cn } from "@/lib/utils";
import {
    LayoutDashboard,
    Users,
    Workflow,
    FileText,
    Calendar,
    CheckSquare,
    MessageSquare,
    Mail,
    Settings,
    ChevronDown,
    ChevronRight,
    Menu,
    CreditCard,
    BarChart3,
    FileCheck,
    Shield,
    Zap,
    Sparkles,
    Globe,
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
        title: "Pipeline",
        href: "/pipeline",
        icon: Workflow,
    },
    {
        title: "Contacts",
        href: "/contacts",
        icon: Users,
    },
    {
        title: "Automations",
        icon: Zap,
        submenu: [
            { title: "All Automations", href: "/automations" },
            { title: "Create Automation", href: "/automations/create" },
        ],
    },
    {
        title: "Forms",
        icon: FileText,
        submenu: [
            { title: "All Forms", href: "/forms" },
            { title: "Create Form", href: "/forms/create" },
            { title: "Password Protected", href: "/forms/password-protected" },
        ],
    },
    {
        title: "Appointments",
        icon: Calendar,
        submenu: [
            { title: "All Appointments", href: "/appointments" },
            { title: "Booking Settings", href: "/appointments/settings" },
            { title: "Round-Robin", href: "/appointments/round-robin" },
        ],
    },
    {
        title: "Tasks",
        icon: CheckSquare,
        submenu: [
            { title: "All Tasks", href: "/tasks" },
            { title: "My Tasks", href: "/tasks/my-tasks" },
        ],
    },
    {
        title: "Marketing",
        icon: Mail,
        submenu: [
            { title: "Emails", href: "/emails" },
            { title: "Create Email", href: "/emails/create" },
            { title: "Email Builder", href: "/emails/builder" },
            { title: "Audiences", href: "/emails/audiences" },
            { title: "Campaigns", href: "/emails/campaigns" },
            { title: "Event Management", href: "/events" },
            { title: "Phone Calls", href: "/phone-calls" },
        ],
    },
    {
        title: "People",
        icon: Users,
        submenu: [
            { title: "All Contacts", href: "/contacts" },
            { title: "Clients", href: "/people/clients" },
            { title: "Opposing Clients", href: "/people/opposing-clients" },
        ],
    },
    {
        title: "Docs & Forms",
        icon: FileCheck,
        submenu: [
            { title: "All Documents", href: "/documents" },
            { title: "Document Automation", href: "/documents/automation" },
            { title: "E-Signatures", href: "/documents/e-signatures" },
            { title: "File Requests", href: "/documents/file-requests" },
        ],
    },
    {
        title: "Reports",
        icon: BarChart3,
        href: "/analytics",
    },
    {
        title: "Time & Billing",
        icon: CreditCard,
        submenu: [
            { title: "Invoices", href: "/billing/invoices" },
            { title: "Time Tracking", href: "/billing/time" },
            { title: "Expenses", href: "/billing/expenses" },
            { title: "Payments", href: "/billing/payments" },
        ],
    },
    {
        title: "Settings",
        icon: Settings,
        submenu: [
            { title: "General", href: "/settings" },
            { title: "Integrations", href: "/settings/integrations" },
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
                className="lg:hidden fixed top-4 left-4 z-50 p-2 bg-white rounded-lg shadow-lg border border-gray-200"
                onClick={() => setIsMobileOpen(!isMobileOpen)}
            >
                <Menu className="w-5 h-5 text-gray-700" />
            </button>

            {/* Sidebar Container */}
            <aside
                className={cn(
                    "fixed inset-y-0 left-0 z-40 w-64 bg-[#1a1d29] text-white transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static lg:h-screen overflow-y-auto border-r border-[#2a2d3a]",
                    isMobileOpen ? "translate-x-0" : "-translate-x-full"
                )}
            >
                {/* Logo/Brand */}
                <div className="flex items-center h-16 px-6 border-b border-[#2a2d3a]">
                    <div className="flex items-center gap-3">
                        <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg flex items-center justify-center">
                            <span className="text-white font-bold text-sm">LM</span>
                        </div>
                        <h1 className="text-lg font-semibold text-white">LegalManager</h1>
                    </div>
                </div>

                {/* Navigation */}
                <nav className="p-3 space-y-1">
                    {navItems.map((item) => (
                        <div key={item.title}>
                            {item.submenu ? (
                                <div>
                                    <button
                                        onClick={() => toggleSubmenu(item.title)}
                                        className={cn(
                                            "flex items-center justify-between w-full px-3 py-2.5 text-sm font-medium rounded-md transition-all duration-200",
                                            openSubmenus[item.title]
                                                ? "bg-[#2563eb] text-white"
                                                : "text-gray-300 hover:bg-[#2a2d3a] hover:text-white"
                                        )}
                                    >
                                        <div className="flex items-center gap-3">
                                            <item.icon className="w-4 h-4" />
                                            <span>{item.title}</span>
                                        </div>
                                        {openSubmenus[item.title] ? (
                                            <ChevronDown className="w-4 h-4" />
                                        ) : (
                                            <ChevronRight className="w-4 h-4" />
                                        )}
                                    </button>

                                    {openSubmenus[item.title] && (
                                        <div className="mt-1 ml-3 space-y-0.5 border-l border-[#2a2d3a] pl-3">
                                            {item.submenu.map((subItem) => (
                                                <Link
                                                    key={subItem.href}
                                                    href={subItem.href}
                                                    onClick={() => setIsMobileOpen(false)}
                                                    className={cn(
                                                        "block px-3 py-2 text-sm rounded-md transition-colors",
                                                        pathname === subItem.href
                                                            ? "bg-[#2563eb] text-white font-medium"
                                                            : "text-gray-400 hover:text-white hover:bg-[#2a2d3a]"
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
                                    onClick={() => setIsMobileOpen(false)}
                                    className={cn(
                                        "flex items-center gap-3 px-3 py-2.5 text-sm font-medium rounded-md transition-all duration-200",
                                        pathname === item.href
                                            ? "bg-[#2563eb] text-white"
                                            : "text-gray-300 hover:bg-[#2a2d3a] hover:text-white"
                                    )}
                                >
                                    <item.icon className="w-4 h-4" />
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
