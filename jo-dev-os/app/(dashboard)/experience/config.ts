import type { FilterKey } from "./types";

export const FILTERS: { id: FilterKey; label: string }[] = [
  { id: "all", label: "Tout" },
  { id: "pro", label: "Pro" },
  { id: "perso", label: "Perso" },
];
