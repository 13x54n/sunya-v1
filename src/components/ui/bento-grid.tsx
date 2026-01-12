import { cn } from "@/lib/utils";

export const BentoGrid = ({
  className,
  children,
}: {
  className?: string;
  children?: React.ReactNode;
}) => {
  return (
    <div
      className={cn(
        "mx-auto grid max-w-7xl grid-cols-1 gap-4 md:grid-cols-3",
        className,
      )}
    >
      {children}
    </div>
  );
};

const getSeverityBadge = (severity?: string): string => {
  if (!severity) return "";
  
  const baseClasses = "inline-flex items-center px-2 py-1 rounded-md text-xs font-medium";
  const severityLower = severity.toLowerCase();
  
  switch (severityLower) {
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
      return `${baseClasses} bg-gray-100 text-gray-800 border border-gray-200`;
  }
};

export const BentoGridItem = ({
  className,
  title,
  description,
  header,
  icon,
  severity,
}: {
  className?: string;
  title?: string | React.ReactNode;
  description?: string | React.ReactNode;
  header?: React.ReactNode;
  icon?: React.ReactNode;
  severity?: string;
}) => {
  return (
    <div
      className={cn(
        "group/bento shadow-input flex flex-col space-y-4 rounded-xl border border-neutral-200 bg-white p-4 transition duration-200 hover:shadow-xl dark:border-white/[0.2] dark:bg-black dark:shadow-none",
        className,
      )}
    >
      {header}
        
    </div>
  );
};
