export type InterestAccent = "cyan" | "amber" | "mint" | "violet";

export type TopCard = {
  id: "code" | "moto" | "muscu" | "chill";
  title: string;
  subtitle: string;
  meta: string;
  image: string;
  imagePosition?: string;
  accent: InterestAccent;
  chips: string[];
  rows?: string[];
  bullets?: string[];
  cta?: string;
};

export type BalanceItem = {
  label: string;
  value: number;
  color: string;
};

export type AdventureItem = {
  title: string;
  date: string;
  tag: string;
  image: string;
  accent: string;
};

export type GoalItem = {
  label: string;
  area: "Moto" | "Muscu" | "Code" | "Road Trip";
  progress: number;
  color: string;
};
