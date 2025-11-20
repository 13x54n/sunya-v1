import { ITestimonial } from "@/types";
import { siteDetails } from "./siteDetails";

export const testimonials: ITestimonial[] = [
    {
        name: 'Laxman Rai',
        role: 'Full Stack Developer',
        message: `${siteDetails.siteName}'s AI-driven insights have transformed how we approach vunerability detection on smart contracts. It's an invaluable resource in the modern blockchain landscape.`,
        avatar: 'https://media.licdn.com/dms/image/v2/D5603AQH_ACJPte9uVQ/profile-displayphoto-shrink_400_400/profile-displayphoto-shrink_400_400/0/1724103658437?e=1765411200&v=beta&t=Lsfnd3ufwvKs8gx1l7gSUUafdMSWfdsg-OHjmCCNv-U',
    },
    {
        name: 'Sagar Budathoki',
        role: 'Full Stack Developer',
        message: `I'm proud to build ${siteDetails.siteName}'s robust security measures and seamless integrations. We tried to balance user-friendliness with advanced security technology.`,
        avatar: 'https://media.licdn.com/dms/image/v2/D4D03AQFycnRQAiurkA/profile-displayphoto-shrink_400_400/profile-displayphoto-shrink_400_400/0/1672591432967?e=1765411200&v=beta&t=5hH98sIlak25U95loeuUvkSQaT4DtwUUF5KW56MdA3k',
    },
    {
        name: 'Suraj Gaire',
        role: 'Product Manager',
        message: `${siteDetails.siteName} is revolutionizing smart contract development. Its intuitive approach and powerful features make it an indispensable tool for anyone serious about smart contract development.`,
        avatar: 'https://media.licdn.com/dms/image/v2/C4E03AQFPYltjdcdTJg/profile-displayphoto-shrink_400_400/profile-displayphoto-shrink_400_400/0/1652040368923?e=1765411200&v=beta&t=2CsMfvjNTcnXaFG2dAc6DMwNECOnixHOInHha3EvRbE',
    },
];