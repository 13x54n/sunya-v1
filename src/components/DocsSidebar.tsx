'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import { Book, Code2, Shield, Zap, Layout, PlayCircle } from 'lucide-react';

const sidebarItems = [
    {
        title: 'Getting Started',
        items: [
            { name: 'Introduction', href: '/developers', icon: Book },
            { name: 'Quick Start', href: '/developers/quick-start', icon: Zap },
            { name: 'Authentication', href: '/developers/authentication', icon: Shield },
        ],
    },
    {
        title: 'Core Concepts',
        items: [
            { name: 'Architecture', href: '/developers/architecture', icon: Layout },
            { name: 'API Reference', href: '/developers/api-reference', icon: Code2 },
            { name: 'Playground', href: '/developers/playground', icon: PlayCircle },
        ],
    },
];

const DocsSidebar = () => {
    const pathname = usePathname();

    return (
        <aside className="w-64 h-screen sticky top-0 border-r border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 hidden md:block overflow-y-auto pt-20 pb-10">
            <div className="px-6 space-y-8">
                {sidebarItems.map((section) => (
                    <div key={section.title}>
                        <h4 className="mb-4 text-sm font-semibold text-muted-foreground uppercase tracking-wider">
                            {section.title}
                        </h4>
                        <div className="space-y-1">
                            {section.items.map((item) => {
                                const Icon = item.icon;
                                const isActive = pathname === item.href;

                                return (
                                    <Link
                                        key={item.href}
                                        href={item.href}
                                        className={cn(
                                            'flex items-center gap-3 px-3 py-2 rounded-md text-sm transition-colors',
                                            isActive
                                                ? 'bg-primary/10 text-primary font-medium'
                                                : 'text-foreground/80 hover:bg-accent hover:text-accent-foreground'
                                        )}
                                    >
                                        <Icon className="h-4 w-4" />
                                        {item.name}
                                    </Link>
                                );
                            })}
                        </div>
                    </div>
                ))}
            </div>
        </aside>
    );
};

export default DocsSidebar;
