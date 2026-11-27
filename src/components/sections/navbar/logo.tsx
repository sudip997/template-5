import Link from "next/link";
import { cn } from "@/lib/utils";
import { brandName } from "./navbar-content";

/** Four connected nodes forming an "N", echoing the Hero's workflow graph. */
function LogoMark() {
  return (
    <span className="grid size-8 place-items-center rounded-[10px] bg-primary text-primary-foreground shadow-md shadow-primary/25">
      <svg viewBox="0 0 20 20" fill="none" aria-hidden="true" className="size-5">
        <path
          d="M5 15V5l10 10V5"
          stroke="currentColor"
          strokeWidth={1.6}
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <g fill="currentColor">
          <circle cx={5} cy={5} r={2} />
          <circle cx={5} cy={15} r={2} />
          <circle cx={15} cy={5} r={2} />
          <circle cx={15} cy={15} r={2} />
        </g>
      </svg>
    </span>
  );
}

type LogoProps = {
  className?: string;
  onClick?: () => void;
};

export function Logo({ className, onClick }: LogoProps) {
  return (
    <Link
      href="/"
      onClick={onClick}
      aria-label={`${brandName} home`}
      className={cn(
        "inline-flex items-center gap-2.5 rounded-lg focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ring",
        className,
      )}
    >
      <LogoMark />
      <span className="font-heading text-xl font-bold tracking-tight text-foreground">
        {brandName}
      </span>
    </Link>
  );
}
