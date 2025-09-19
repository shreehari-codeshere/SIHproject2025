import * as React from 'react';

export function Logo(props: React.SVGProps<SVGSVGElement>) {
  return (
    <div className="flex items-center gap-2 group-data-[collapsible=icon]:justify-center">
      <div className="p-1.5 bg-primary rounded-lg">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="hsl(var(--primary-foreground))"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="lucide lucide-leaf"
        >
          <path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 4.18 2 8 0 5.5-4.78 10-10 10Z" />
          <path d="M2 21c0-3 1.85-5.36 5.08-6C9.5 14.52 12 13 13 12" />
        </svg>
      </div>
      <span className="text-lg font-bold font-headline group-data-[collapsible=icon]:hidden">
        AgriAssist AI
      </span>
    </div>
  );
}
