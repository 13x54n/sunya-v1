import React from 'react';
import DocsSidebar from '@/components/DocsSidebar';

export default function DevelopersLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="flex min-h-screen bg-background">
            <DocsSidebar />
            <main className="flex-1 w-full max-w-5xl mx-auto pt-24 pb-16 px-6 md:px-12">
                {children}
            </main>
        </div>
    );
}
