import { ITestimonial } from "@/types";
import { siteDetails } from "./siteDetails";

export const testimonials: ITestimonial[] = [
    {
        name: 'Laxman Rai',
        role: 'Full Stack Developer',
        message: `${siteDetails.siteName}'s AI-driven insights have transformed how we approach vunerability detection on smart contracts. It's an invaluable resource in the modern blockchain landscape.`,
        avatar: 'https://ik.imagekit.io/lexy/Ming/1724103658437.webp',
    },
    {
        name: 'Sagar Budathoki',
        role: 'Full Stack Developer',
        message: `I'm proud to build ${siteDetails.siteName}'s robust security measures and seamless integrations. We tried to balance user-friendliness with advanced security technology.`,
        avatar: 'https://ik.imagekit.io/lexy/Ming/1672591432967.webp',
    },
    {
        name: 'Suraj Gaire',
        role: 'Product Manager',
        message: `${siteDetails.siteName} is revolutionizing smart contract development. Its intuitive approach and powerful features make it an indispensable tool for anyone serious about smart contract development.`,
        avatar: 'https://ik.imagekit.io/lexy/Ming/1652040368923.webp',
    },
];