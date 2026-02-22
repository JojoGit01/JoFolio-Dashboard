import type { Project, ProjectStatus } from "./types";

export function isRealLink(v?: string) {
  if (!v) return false;
  const t = v.trim();
  return !(t === "" || t === "#");
}

export function hasConfidential(project: Project) {
  return (project.tags ?? []).includes("CONFIDENTIAL");
}

export function statusLabel(status: ProjectStatus) {
  return status === "DONE" ? "Production" : "Developpement";
}

export function statusMiniLabel(status: ProjectStatus) {
  return status === "DONE" ? "PROD" : "DEV";
}

export function buildProjectDiffs(current: Project, previous: Project) {
  const lines: string[] = [];
  if (current.status !== previous.status) {
    lines.push(`Statut: ${statusLabel(previous.status)} -> ${statusLabel(current.status)}`);
  }
  const added = current.stack.filter((s) => !previous.stack.includes(s));
  if (added.length) lines.push(`Nouvelles technos: ${added.slice(0, 3).join(", ")}`);
  current.impacts.forEach((imp) => {
    const old = previous.impacts.find((o) => o.label === imp.label);
    if (old && old.value !== imp.value && lines.length < 3) lines.push(`${imp.label}: ${old.value} -> ${imp.value}`);
  });
  if (lines.length === 0) lines.push("Progression continue sans rupture majeure.");
  return lines.slice(0, 3);
}
