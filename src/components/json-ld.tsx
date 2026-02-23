import { siteDetails } from "@/data/siteDetails";

export function JsonLd() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: siteDetails.siteName,
    applicationCategory: "DeveloperApplication",
    operatingSystem: "Linux, macOS, Windows",
    description: siteDetails.metadata.description,
    url: siteDetails.siteUrl,
    author: {
      "@type": "Organization",
      name: siteDetails.metadata.author,
    },
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "USD",
    },
    featureList: [
      "Static analysis for Solidity smart contracts",
      "Slither integration",
      "Cross-platform (Linux, macOS, Windows)",
      "Curl install in one command",
      "Foundry and Hardhat support",
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
