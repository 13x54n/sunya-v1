import { IMenuItem, ISocials } from "@/types";

export const footerDetails: {
    subheading: string;
    quickLinks: IMenuItem[];
    email: string;
    telephone: string;
    socials: ISocials;
} = {
    subheading: "Securing the blockchain with AI-driven smart contract vulnerability detection.",
    quickLinks: [
        {
            text: "Audit Tools",
            url: "#audit-tools"
        },
        {
            text: "Pricing",
            url: "#pricing"
        },
        {
            text: "Case Studies",
            url: "#case-studies"
        }
    ],
    email: 'ming.env@gmail.com',
    telephone: '+1 (416) 725-8527',
    socials: {
        // github: 'https://github.com',
        // x: 'https://twitter.com/x',
        // twitter: 'https://twitter.com/SunyaAI',
        // facebook: 'https://facebook.com',
        // youtube: 'https://youtube.com',
        // linkedin: 'https://www.linkedin.com/company/sunya-ai',
        // threads: 'https://www.threads.net',
        // instagram: 'https://www.instagram.com',
    }
}