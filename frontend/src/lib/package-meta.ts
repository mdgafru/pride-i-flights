import { sanitizeSlug } from "@/lib/slug-utils";

export function buildPackageSlug(title: string) {
  return sanitizeSlug(title) || "tour-package";
}

export function resolveUniquePackageSlug(title: string, taken: Set<string>) {
  const base = buildPackageSlug(title);
  if (!taken.has(base)) return base;

  let counter = 2;
  while (taken.has(`${base}-${counter}`)) counter += 1;
  return `${base}-${counter}`;
}

export function parseIncludesInput(value: string) {
  return value
    .split(",")
    .map((item) => item.trim())
    .filter(Boolean);
}

export function includesToText(values: string[]) {
  return values.join(", ");
}
