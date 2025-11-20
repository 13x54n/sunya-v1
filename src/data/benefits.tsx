import { FiBarChart2, FiBriefcase, FiLock, FiPackage, FiShield, FiTarget, FiTrendingUp } from "react-icons/fi";

import { IBenefit } from "@/types"

export const benefits: IBenefit[] = [
    {
        title: "Gas Optimization",
        description: "with practice of writing smart contract code that performs the same functions while consuming fewer computational resources, thereby reducing the gas fees required for execution.",
        bullets: [
            {
                title: "Minimizing On-Chain Data Storage",
                description: "Declaring a storage variable without initializing it incurs no gas cost, offering a simple way to save gas.",
                icon: <FiBarChart2 size={26} />
            },
            {
                title: "Efficient Function Design Suggestions",
                description: "Using constant or immutable variables for values that do not change after deployment avoids storage costs, as their values are compiled directly into the bytecode.",
                icon: <FiTarget size={26} />
            },
            {
                title: "Advanced Techniques & Mechanisms",
                description: "Zeroing out a storage slot refunds gas, and using the selfdestruct opcode refunds 24,000 gas, though the refund cannot exceed half the gas used in the current call to prevent abuse.",
                icon: <FiTrendingUp size={26} />
            }
        ],
        imageSrc: "https://images.unsplash.com/photo-1569256174397-819017e58de4?q=80&w=983&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
    },
    {
        title: "Static Analysis",
        description: "Involves examining the source code without executing it to identify potential security vulnerabilities, logical errors, and coding inefficiencies.",
        bullets: [
            {
                title: "Built-in Slither Analyzers",
                description: "Uses an intermediate representation called SlithIR based on Static Single Assignment (SSA) form, enable advanced program analysis techniques such as dataflow and taint tracking to detect vulnerabilities efficiently.",
                icon: <FiPackage size={26} />
            },
            {
                title: "Control-Flow Graphs (CFGs)",
                description: "Constructing precise Control-Flow Graphs (CFGs) from Ethereum bytecode using symbolic execution, which enhances the accuracy of vulnerability detection.",
                icon: <FiBriefcase size={26} />
            }
        ],
        imageSrc: "https://images.unsplash.com/photo-1637778352878-f0b46d574a04?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1yZWxhdGVkfDl8fHxlbnwwfHx8fHw%3D"
    },
    {
        title: "AI Assessment & Audit Report",
        description: "Automating repetitive tasks such as data extraction, transaction testing, and document review, significantly reducing manual effort and the risk of human error.",
        bullets: [
            {
                title: "Continuous Learning & Improvement",
                description: "Sunya AI agents adapt over time, learning from new vulnerabilities and attack patterns to improve detection capabilities and stay ahead of emerging threats.",
                icon: <FiLock size={26} />
            },
            {
                title: "Proactive Security",
                description: "By analyzing historical data and trends, Sunya AI can predict potential vulnerabilities and suggest preventive measures before they are exploited.",
                icon: <FiShield size={26} />
            },
        ],
        imageSrc: "https://images.unsplash.com/photo-1737641624486-7846df8528dc?q=80&w=987&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
    },
]