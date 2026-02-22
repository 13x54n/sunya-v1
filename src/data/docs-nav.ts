// Navigation structure aligned with Sunya package (package/README.md)
export interface NavItem {
  title: string
  url: string
  slug: string
  isActive?: boolean
}

export interface NavGroup {
  title: string
  url: string
  items: NavItem[]
}

export const docsNavData = {
  versions: ["0.1.0"] as const,
  navMain: [
    {
      title: "Getting Started",
      url: "/docs",
      items: [
        { title: "Installation", url: "/docs/installation", slug: "installation" },
        { title: "Quick Start", url: "/docs/quick-start", slug: "quick-start" },
        {
          title: "Project Structure",
          url: "/docs/project-structure",
          slug: "project-structure",
        },
      ],
    },
    {
      title: "Configuration",
      url: "/docs/configuration",
      items: [
        {
          title: "sunya.config.json",
          url: "/docs/configuration",
          slug: "configuration",
        }
      ],
    },
    {
      title: "Slither",
      url: "/docs/parsers",
      items: [
        { title: "Slither", url: "/docs/parsers", slug: "parsers" },
      ],
    },
    {
      title: "Development",
      url: "/docs",
      items: [
        {
          title: "Example Workflow",
          url: "/docs/example-workflow",
          slug: "example-workflow",
        },
        {
          title: "Contributing",
          url: "/docs/contributing",
          slug: "contributing",
        },
      ],
    },
  ] satisfies NavGroup[],
}

// Map slugs to breadcrumb labels
export const docTitles: Record<string, string> = {
  installation: "Installation",
  "quick-start": "Quick Start",
  "project-structure": "Project Structure",
  configuration: "Configuration",
  parsers: "Slither",
  "example-workflow": "Example Workflow",
  contributing: "Contributing",
}
