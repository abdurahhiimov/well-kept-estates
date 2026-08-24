import { cn } from "@/lib/utils";

/**
 * Wordmark — no house icon (the category default we're avoiding), no rule.
 * "Well Kept" over "ESTATES", the second line centred on the first and set
 * heavy enough in mono to hold its own rather than trail off as a whisper.
 */
export function Wordmark({
  className,
  size = "md",
}: {
  className?: string;
  size?: "sm" | "md" | "lg";
}) {
  const top =
    size === "lg" ? "text-[1.75rem]" : size === "sm" ? "text-lg" : "text-xl";
  const bottom =
    size === "lg" ? "text-[0.66rem]" : size === "sm" ? "text-[0.5rem]" : "text-[0.56rem]";

  return (
    <span className={cn("inline-flex flex-col items-center leading-none", className)}>
      <span className={cn("font-display font-semibold tracking-[-0.015em]", top)}>
        Well&nbsp;Kept
      </span>
      <span
        className={cn(
          "mt-1.5 font-mono font-bold uppercase tracking-[0.36em] text-foreground/60",
          bottom,
        )}
      >
        {/* Trailing letter-spacing pushes the word off-centre; the padding
            compensates so it optically centres under "Well Kept". */}
        <span className="pl-[0.36em]">Estates</span>
      </span>
    </span>
  );
}
