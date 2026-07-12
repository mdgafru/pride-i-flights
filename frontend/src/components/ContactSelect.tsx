"use client";

import { useEffect, useId, useRef, useState } from "react";
import { ChevronDown } from "lucide-react";

export type ContactSelectOption = {
  label: string;
  value: string;
};

type ContactSelectProps = {
  value: string;
  onChange: (value: string) => void;
  options: ContactSelectOption[];
  ariaLabel: string;
  selectedLabel?: string;
  className?: string;
  listClassName?: string;
};

export function ContactSelect({
  value,
  onChange,
  options,
  ariaLabel,
  selectedLabel,
  className = "",
  listClassName = "",
}: ContactSelectProps) {
  const [open, setOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);
  const listId = useId();

  useEffect(() => {
    if (!open) return;

    function handlePointerDown(event: MouseEvent | TouchEvent) {
      if (!rootRef.current?.contains(event.target as Node)) {
        setOpen(false);
      }
    }

    function handleEscape(event: KeyboardEvent) {
      if (event.key === "Escape") setOpen(false);
    }

    document.addEventListener("mousedown", handlePointerDown);
    document.addEventListener("touchstart", handlePointerDown);
    document.addEventListener("keydown", handleEscape);

    return () => {
      document.removeEventListener("mousedown", handlePointerDown);
      document.removeEventListener("touchstart", handlePointerDown);
      document.removeEventListener("keydown", handleEscape);
    };
  }, [open]);

  const selected = options.find((option) => option.value === value);

  return (
    <div ref={rootRef} className={`relative ${className}`}>
      <button
        type="button"
        onClick={() => setOpen((current) => !current)}
        aria-label={ariaLabel}
        aria-expanded={open}
        aria-controls={listId}
        className="flex w-full min-h-[44px] touch-manipulation items-center justify-between gap-2 py-2.5 text-base text-[#0b2f57] outline-none"
      >
        <span className="truncate text-left font-semibold">
          {selectedLabel || selected?.label || "Select"}
        </span>
        <ChevronDown
          className={`h-4 w-4 shrink-0 text-slate-500 transition-transform ${open ? "rotate-180" : ""}`}
        />
      </button>

      {open ? (
        <div
          id={listId}
          role="listbox"
          className={`absolute top-full right-0 left-0 z-30 mt-1 max-h-60 overflow-y-auto overscroll-contain rounded-xl border border-slate-200 bg-white py-1 shadow-[0_12px_30px_rgba(11,47,87,0.12)] ${listClassName}`}
        >
          {options.map((option) => {
            const active = option.value === value;
            return (
              <button
                key={`${option.value}-${option.label}`}
                type="button"
                role="option"
                aria-selected={active}
                onClick={() => {
                  onChange(option.value);
                  setOpen(false);
                }}
                className={`flex w-full min-h-[44px] touch-manipulation items-center px-3 text-left text-base transition ${
                  active
                    ? "bg-[#fff5f6] font-semibold text-[#e30613]"
                    : "text-[#0b2f57] hover:bg-slate-50"
                }`}
              >
                {option.label}
              </button>
            );
          })}
        </div>
      ) : null}
    </div>
  );
}
