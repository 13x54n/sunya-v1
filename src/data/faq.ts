import { IFAQ } from "@/types";
import { siteDetails } from "./siteDetails";

export const faqs: IFAQ[] = [
    {
        question: `What is Sunya?`,
        answer: 'Sunya is an advanced AI agent specialized in smart contract security, designed to detect and mitigate vulnerabilities in blockchain protocols with precision and efficiency.',
    },
    {
        question: `How does Sunya detect vulnerabilities?`,
        answer: 'Sunya leverages cutting-edge machine learning models trained on extensive datasets of real-world exploits, combined with formal verification techniques, to scan smart contracts for issues like reentrancy, integer overflows, and access control flaws.',
    },
    {
        question: `Is Sunya accurate for auditing smart contracts?`,
        answer: 'Yes, Sunya achieves over 95% accuracy in vulnerability detection, backed by continuous learning from verified audits and community-reported incidents, ensuring robust protection for your DeFi and NFT projects.',
    },
    {
        question: `What types of smart contracts does Sunya support?`,
        answer: `Sunya supports Solidity, Vyper, and Rust-based contracts across major blockchains like Ethereum, Binance Smart Chain, Polygon, and Solana, with seamless integration for EVM-compatible chains.`
    },
    {
        question: `How long does a Sunya audit take?`,
        answer: 'Audits with Sunya are lightning-fast—most scans complete in under 5 minutes, delivering instant reports with remediation recommendations, so you can deploy securely without delays.'
    }
];