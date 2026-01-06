"use client"
import { usePathname, useRouter } from "next/navigation";
import React from "react";

export const SidebarItem = ({
    href,
    title,
    icon,
}: {
    href: string;
    title: string;
    icon: React.ReactNode;
}) => {
    const router = useRouter();
    const pathname = usePathname();
    const selected = pathname === href;

    return (
        <div
            onClick={() => router.push(href)}
            className={`flex items-center gap-3 cursor-pointer px-6 py-3
          ${selected ? "text-accent bg-accent/10 border-l-4 border-accent" : "text-muted"}
        `}
        >
            {icon}
            <span className="font-medium">{title}</span>
        </div>
    );
};

