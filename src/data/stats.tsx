import { BsBarChartFill, BsFillStarFill } from "react-icons/bs";
import { PiGlobeFill } from "react-icons/pi";

import { IStats } from "@/types";

export const stats: IStats[] = [
    {
        title: "10K+",
        icon: <BsBarChartFill size={34} className="text-blue-500" />,
        description: "Smart contracts audited, detecting vulnerabilities before deployment."
    },
    {
        title: "99.9%",
        icon: <BsFillStarFill size={34} className="text-yellow-500" />,
        description: "Detection accuracy, powered by AI trained on real-world exploits."
    },
    {
        title: "50+ ",
        icon: <PiGlobeFill size={34} className="text-green-600" />,
        description: "Blockchains supported, from Ethereum to Solana for seamless security."
    }
];