'use client';

import Container from "@/components/Container";
import { audits } from "@/data/audits";
import { IAudit } from "@/types";

import Link from "next/link";
import { BentoGrid, BentoGridItem } from "@/components/ui/bento-grid";
import { useState, useMemo } from "react";
import { FaSearch, FaFilter, FaFilePdf, FaExternalLinkAlt, FaShieldAlt, FaClock, FaCheckCircle, FaExclamationTriangle, FaInfoCircle } from "react-icons/fa";

const getSeverityIcon = (severity: IAudit['severity']) => {
    switch (severity) {
        case 'critical':
        case 'high':
            return <FaExclamationTriangle className="text-red-600" />;
        case 'medium':
            return <FaExclamationTriangle className="text-yellow-600" />;
        case 'low':
        case 'info':
            return <FaInfoCircle className="text-blue-600" />;
        default:
            return null;
    }
};

const getSeverityBadge = (severity: IAudit['severity']) => {
    const baseClasses = "inline-flex items-center px-3 py-1 rounded-full text-sm font-medium";
    switch (severity) {
        case 'critical':
            return `${baseClasses} bg-red-100 text-red-800 border border-red-200`;
        case 'high':
            return `${baseClasses} bg-orange-100 text-orange-800 border border-orange-200`;
        case 'medium':
            return `${baseClasses} bg-yellow-100 text-yellow-800 border border-yellow-200`;
        case 'low':
            return `${baseClasses} bg-blue-100 text-blue-800 border border-blue-200`;
        case 'info':
            return `${baseClasses} bg-gray-100 text-gray-800 border border-gray-200`;
        default:
            return baseClasses;
    }
};

const getStatusIcon = (status: IAudit['status']) => {
    switch (status) {
        case 'completed':
            return <FaCheckCircle className="text-green-600" />;
        case 'in-progress':
            return <FaClock className="text-blue-600" />;
        case 'pending':
            return <FaClock className="text-gray-400" />;
        default:
            return null;
    }
};

const getStatusBadge = (status: IAudit['status']) => {
    const baseClasses = "inline-flex items-center px-3 py-1 rounded-full text-sm font-medium";
    switch (status) {
        case 'completed':
            return `${baseClasses} bg-green-100 text-green-800 border border-green-200`;
        case 'in-progress':
            return `${baseClasses} bg-blue-100 text-blue-800 border border-blue-200`;
        case 'pending':
            return `${baseClasses} bg-gray-100 text-gray-800 border border-gray-200`;
        default:
            return baseClasses;
    }
};

export default function AuditsPage() {
    const [searchTerm, setSearchTerm] = useState("");
    const [selectedSeverity, setSelectedSeverity] = useState<string>("all");
    const [selectedStatus, setSelectedStatus] = useState<string>("all");

    // Calculate statistics
    const stats = useMemo(() => {
        const totalAudits = audits.length;
        const completedAudits = audits.filter(a => a.status === 'completed').length;
        const criticalIssues = audits.filter(a => a.severity === 'critical').length;
        const totalFindings = audits.reduce((sum, audit) => sum + audit.findings, 0);

        return { totalAudits, completedAudits, criticalIssues, totalFindings };
    }, []);

    // Filter audits based on search and filters
    const filteredAudits = useMemo(() => {
        return audits.filter(audit => {
            const matchesSearch = audit.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                audit.description.toLowerCase().includes(searchTerm.toLowerCase());
            const matchesSeverity = selectedSeverity === "all" || audit.severity === selectedSeverity;
            const matchesStatus = selectedStatus === "all" || audit.status === selectedStatus;

            return matchesSearch && matchesSeverity && matchesStatus;
        });
    }, [searchTerm, selectedSeverity, selectedStatus]);

    return (
        <div className="min-h-screen pt-20 pb-20 bg-gray-50">
            <Container>
                {/* Header Section */}
                <div className="text-center mb-12">
                    <div className="flex items-center justify-center gap-3 mb-4 mt-10">
                        {/* <FaShieldAlt className="text-3xl text-primary" /> */}
                        <h1 className="text-4xl font-bold text-gray-900 font-manrope">Security Audit Reports</h1>
                    </div>
                    <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                        Comprehensive security assessments of smart contracts and blockchain protocols
                    </p>
                </div>

                {/* Statistics Cards */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-8">
                    <div className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm">
                        <div className="text-3xl font-bold text-blue-600 mb-2">{stats.totalAudits}</div>
                        <div className="text-sm text-gray-600">Total Audits</div>
                    </div>
                    <div className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm">
                        <div className="text-3xl font-bold text-green-600 mb-2">{stats.completedAudits}</div>
                        <div className="text-sm text-gray-600">Completed</div>
                    </div>
                    <div className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm">
                        <div className="text-3xl font-bold text-red-600 mb-2">{stats.criticalIssues}</div>
                        <div className="text-sm text-gray-600">Critical Issues</div>
                    </div>
                    <div className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm">
                        <div className="text-3xl font-bold text-purple-600 mb-2">{stats.totalFindings}</div>
                        <div className="text-sm text-gray-600">Total Findings</div>
                    </div>
                </div>

                {/* Search and Filters */}
                <div className="rounded-xl mb-4">
                    <div className="flex flex-col md:flex-row gap-4">
                        {/* Search */}
                        <div className="flex-1 relative">
                            <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                            <input
                                type="text"
                                placeholder="Search audits..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                            />
                        </div>

                        {/* Severity Filter */}
                        <div className="relative">
                            <select
                                value={selectedSeverity}
                                onChange={(e) => setSelectedSeverity(e.target.value)}
                                className="appearance-none bg-white border border-gray-200 rounded-lg px-4 py-3 pr-8 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                            >
                                <option value="all">All Severities</option>
                                <option value="critical">Critical</option>
                                <option value="high">High</option>
                                <option value="medium">Medium</option>
                                <option value="low">Low</option>
                                <option value="info">Info</option>
                            </select>
                            <FaFilter className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none" />
                        </div>

                        {/* Status Filter */}
                        <div className="relative">
                            <select
                                value={selectedStatus}
                                onChange={(e) => setSelectedStatus(e.target.value)}
                                className="appearance-none bg-white border border-gray-200 rounded-lg px-4 py-3 pr-8 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                            >
                                <option value="all">All Status</option>
                                <option value="completed">Completed</option>
                                <option value="in-progress">In Progress</option>
                                <option value="pending">Pending</option>
                            </select>
                            <FaFilter className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none" />
                        </div>
                    </div>
                </div>

                {/* Audit Grid */}
                <BentoGrid>
                    {filteredAudits.map((audit, i) => (
                        <BentoGridItem
                            key={i}
                            title={audit.title}
                            description={audit.description}
                            severity={audit.severity}
                            header={
                                <div className="flex flex-col gap-3 mb-4">
                                    {/* Status and Severity Badges */}
                                    <div className="flex items-center gap-2 flex-wrap">
                                        <span className={getStatusBadge(audit.status)}>
                                            <span className="flex items-center gap-2">
                                                {getStatusIcon(audit.status)}
                                                {audit.status.charAt(0).toUpperCase() + audit.status.slice(1).replace('-', ' ')}
                                            </span>
                                        </span>
                                        <span className={getSeverityBadge(audit.severity)}>
                                            <span className="flex items-center gap-2">
                                                {getSeverityIcon(audit.severity)}
                                                {audit.severity.charAt(0).toUpperCase() + audit.severity.slice(1)}
                                            </span>
                                        </span>
                                    </div>

                                    {/* Audit Details */}
                                    <div className="space-y-2 text-sm text-gray-600 px-2">
                                        <div className="flex justify-between">
                                            <span className="font-medium">Date:</span>
                                            <span>{new Date(audit.date).toLocaleDateString('en-US', {
                                                year: 'numeric',
                                                month: 'short',
                                                day: 'numeric'
                                            })}</span>
                                        </div>
                                        <div className="flex justify-between">
                                            <span className="font-medium">Findings:</span>
                                            <span className="font-semibold text-gray-900">{audit.findings}</span>
                                        </div>
                                        {audit.contractAddress && (
                                            <div className="flex justify-between">
                                                <span className="font-medium">Contract:</span>
                                                <span className="font-mono text-xs text-gray-500 truncate ml-2">
                                                    {audit.contractAddress.slice(0, 6)}...{audit.contractAddress.slice(-4)}
                                                </span>
                                            </div>
                                        )}
                                        {audit.auditor && (
                                            <div className="flex justify-between">
                                                <span className="font-medium">Auditor:</span>
                                                <span className="text-gray-900">{audit.auditor}</span>
                                            </div>
                                        )}
                                    </div>

                                    {/* Report Link */}
                                    {audit.reportUrl && (
                                        <Link
                                            href={audit.reportUrl}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="inline-flex items-center text-black font-medium text-sm"
                                        >
                                            <FaFilePdf />
                                            View Report
                                            <FaExternalLinkAlt className="text-xs" />
                                        </Link>
                                    )}

                                    <div className="mt-2 mb-2 font-sans font-bold text-neutral-600 dark:text-neutral-200">
                                        {audit.title}
                                    </div>
                                    <div className="font-sans text-xs font-normal text-neutral-600 dark:text-neutral-300">
                                        {audit.description}
                                    </div>
                                    {audit.severity && (
                                        <div className="mt-3">
                                            <span className={getSeverityBadge(audit.severity)}>
                                                {audit.severity.charAt(0).toUpperCase() + audit.severity.slice(1)} Severity
                                            </span>
                                        </div>
                                    )}
                                </div>
                            }
                        />
                    ))}
                </BentoGrid>

                {/* No Results */}
                {filteredAudits.length === 0 && (
                    <div className="text-center ">
                        <FaSearch className="text-4xl text-gray-400 mx-auto mb-4" />
                        <h3 className="text-xl font-semibold text-gray-900 mb-2">No audits found</h3>
                        <p className="text-gray-600">Try adjusting your search criteria or filters</p>
                    </div>
                )}

                {/* Load More / Pagination could go here */}
                {filteredAudits.length > 0 && (
                    <div className="text-center mt-8">
                        <p className="text-gray-600">
                            Showing {filteredAudits.length} of {audits.length} audits
                        </p>
                    </div>
                )}
            </Container>
        </div>
    );
}

