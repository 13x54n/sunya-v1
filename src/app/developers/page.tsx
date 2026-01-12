import React from 'react';
import { Metadata } from 'next';
import { ArrowRight, Code, ShieldCheck, Zap } from 'lucide-react';
import Link from 'next/link';

export const metadata: Metadata = {
    title: 'Developers Documentation - Sunya',
    description: 'Everything you need to build with Sunya.',
};

export default function DevelopersPage() {
    return (
        <div className="space-y-10 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="space-y-4">
                <h1 className="text-4xl font-extrabold tracking-tight lg:text-5xl">
                    Developer Documentation
                </h1>
                <p className="text-xl text-muted-foreground leading-relaxed max-w-3xl">
                    Welcome to the Sunya Developer Platform. Explore our guides and examples to integrate verify, audit, and secure your financial infrastructure.
                </p>
            </div>

            <hr className="border-border" />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {[
                    {
                        title: 'Quick Start',
                        description: 'Get up and running with Sunya SDKs in minutes.',
                        icon: Zap,
                        href: '/developers/quick-start',
                        color: 'text-yellow-500',
                        bg: 'bg-yellow-500/10',
                    },
                    {
                        title: 'API Reference',
                        description: 'Detailed documentation for all Sunya API endpoints.',
                        icon: Code,
                        href: '/developers/api-reference',
                        color: 'text-blue-500',
                        bg: 'bg-blue-500/10',
                    },
                    {
                        title: 'Authentication',
                        description: 'Learn how to securely authenticate with our services.',
                        icon: ShieldCheck,
                        href: '/developers/authentication',
                        color: 'text-green-500',
                        bg: 'bg-green-500/10',
                    },
                ].map((item) => {
                    const Icon = item.icon;
                    return (
                        <Link
                            key={item.title}
                            href={item.href}
                            className="group relative p-6 bg-card rounded-xl border border-border hover:border-primary/50 transition-all hover:shadow-lg"
                        >
                            <div className="flex items-start gap-4">
                                <div className={`p-3 rounded-lg ${item.bg}`}>
                                    <Icon className={`h-6 w-6 ${item.color}`} />
                                </div>
                                <div className="space-y-2">
                                    <h3 className="font-semibold text-xl group-hover:text-primary transition-colors">
                                        {item.title}
                                    </h3>
                                    <p className="text-muted-foreground">
                                        {item.description}
                                    </p>
                                </div>
                            </div>
                            <div className="absolute bottom-6 right-6 opacity-0 translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all">
                                <ArrowRight className="h-5 w-5 text-primary" />
                            </div>
                        </Link>
                    );
                })}
            </div>

            <div className="prose prose-gray dark:prose-invert max-w-none">
                <h2>Why Sunya?</h2>
                <p>
                    Sunya provides a robust set of tools for financial auditing and verification. Our API is designed to be developer-friendly, secure, and scalable.
                </p>
                <ul>
                    <li><strong>Real-time Audits:</strong> Verify transactions as they happen.</li>
                    <li><strong>Secure Storage:</strong> Immutable logs for all your financial data.</li>
                    <li><strong>Easy Integration:</strong> Drop-in SDKs for major frameworks.</li>
                </ul>
            </div>
        </div>
    );
}
