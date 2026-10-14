import { useRef, type KeyboardEvent } from "react";
import { cn } from "@/lib/utils";

type FilterPillsProps<T extends string> = {
  options: readonly { value: T; label: string }[];
  value: T;
  onChange: (value: T) => void;
  /** id of the element the tabs control. */
  panelId: string;
  label: string;
};

/** Pill-shaped tabs with roving focus: arrow keys / Home / End move between filters. */
export function FilterPills<T extends string>({ options, value, onChange, panelId, label }: FilterPillsProps<T>) {
  const refs = useRef<(HTMLButtonElement | null)[]>([]);

  const onKeyDown = (event: KeyboardEvent<HTMLButtonElement>, index: number) => {
    const last = options.length - 1;
    const next =
      event.key === "ArrowRight" ? (index === last ? 0 : index + 1)
      : event.key === "ArrowLeft" ? (index === 0 ? last : index - 1)
      : event.key === "Home" ? 0
      : event.key === "End" ? last
      : null;
    if (next === null) return;
    event.preventDefault();
    onChange(options[next].value);
    refs.current[next]?.focus();
  };

  return (
    <div role="tablist" aria-label={label} className="flex flex-wrap justify-center gap-2 sm:gap-3">
      {options.map((option, index) => {
        const selected = option.value === value;
        return (
          <button
            key={option.value}
            ref={(node) => { refs.current[index] = node; }}
            type="button"
            role="tab"
            id={`${panelId}-tab-${index}`}
            aria-selected={selected}
            aria-controls={panelId}
            tabIndex={selected ? 0 : -1}
            onClick={() => onChange(option.value)}
            onKeyDown={(event) => onKeyDown(event, index)}
            className={cn(
              "min-h-11 rounded-full border px-5 text-sm font-semibold transition-colors duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-700 focus-visible:ring-offset-2",
              selected
                ? "border-emerald-700 bg-emerald-700 text-white shadow-soft"
                : "border-border bg-white text-muted-foreground hover:border-emerald-700/40 hover:text-emerald-700",
            )}
          >
            {option.label}
          </button>
        );
      })}
    </div>
  );
}
