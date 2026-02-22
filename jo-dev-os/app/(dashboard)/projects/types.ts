export type ProjectStatus = "WIP" | "DONE";
export type ProjectTag = "LIVE" | "CURRENT" | "CONFIDENTIAL";
export type TabKey = "overview" | "tech" | "business";

export type Project = {
  id: string;
  name: string;
  tagline: string;
  description: string;
  status: ProjectStatus;
  tags?: ProjectTag[];
  stack: string[];
  highlights: string[];
  links: { github?: string; live?: string; caseStudy?: string };
  cover?: string;
  cardImage?: string;
  previewImage?: string;
  iconImage?: string;
  icon?: "twitter" | "weighty" | "portfolio" | "folder";
  period: string;
  role: string;
  context: string;
  scope: string;
  contributions: string[];
  outcomes: string[];
  impacts: Array<{ label: string; value: string; note: string }>;
  scorecard: {
    complexity: number;
    impact: number;
    maintenance: number;
    maturity: number;
  };
  timeline: Array<{
    phase: "Conception" | "Build" | "Release" | "Iterations";
    state: "done" | "current" | "next";
    note: string;
  }>;
};
