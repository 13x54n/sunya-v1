export interface IMenuItem {
    text: string;
    url: string;
}

export interface IBenefit {
    title: string;
    description: string;
    imageSrc: string;
    bullets: IBenefitBullet[]
}

export interface IBenefitBullet {
    title: string;
    description: string;
    icon: JSX.Element;
}


export interface IFAQ {
    question: string;
    answer: string;
}

export interface ITestimonial {
    name: string;
    role: string;
    message: string;
    avatar: string;
}

export interface IStats {
    title: string;
    icon: JSX.Element;
    description: string;
}

export interface ISocials {
    facebook?: string;
    github?: string;
    instagram?: string;
    linkedin?: string;
    threads?: string;
    twitter?: string;
    youtube?: string;
    x?: string;
    [key: string]: string | undefined;
}

export interface IAudit {
    id: string;
    title: string;
    description: string;
    date: string;
    status: 'completed' | 'in-progress' | 'pending';
    severity: 'critical' | 'high' | 'medium' | 'low' | 'info';
    findings: number;
    reportUrl?: string;
    contractAddress?: string;
    auditor?: string;
    imageUrl?: string;
}