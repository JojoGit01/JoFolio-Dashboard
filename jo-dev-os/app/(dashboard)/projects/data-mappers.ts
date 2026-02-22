import { PORTFOLIO_DATA, type ExperienceProject, type ProjectRecord } from "@/app/data/portfolioData";

import type { Project, ProjectStatus, ProjectTag } from "./types";

export function buildProjectsFromData(): Project[] {
  const projectRecords = PORTFOLIO_DATA.projects.map(fromProjectRecord);
  const expRecords = PORTFOLIO_DATA.experiences.flatMap((exp) =>
    exp.projects.map((p) => fromExperienceProject(p, exp.title, `${exp.startYear} - ${exp.endYear}`, exp.context))
  );
  return [...projectRecords, ...expRecords];
}

function fromProjectRecord(source: ProjectRecord): Project {
  const status = toModalStatus(source.status);
  const gains = source.businessImpact;
  const businessOutcomes = buildBusinessOutcomes(gains);
  return {
    id: source.id,
    name: source.name,
    tagline: source.summary,
    description: source.summary,
    status,
    tags: toProjectTags(source.status),
    stack: source.stack,
    highlights: source.highlights.length > 0 ? source.highlights : ["a remplir"],
    links: normalizeLinks(source.links.repo, source.links.demo, source.links.caseStudy),
    cover: normalizeCover(source.cover),
    cardImage: normalizeCover(source.cardImage),
    previewImage: normalizeCover(source.previewImage),
    iconImage: normalizeCover(source.icon),
    icon: inferProjectIcon(source.name),
    period: source.period,
    role: source.role,
    context: `${source.summary} Projet ${source.type.toLowerCase()} porte en tant que ${source.role}.`,
    scope: source.type,
    contributions: source.highlights.length > 0 ? source.highlights : ["a remplir"],
    outcomes: businessOutcomes.length ? businessOutcomes : source.highlights.slice(0, 3),
    impacts: [
      {
        label: "Temps delivery",
        value: signedPercent(gains.deliveryGainPercent),
        note: buildImpactNote("delivery", gains.deliveryGainPercent),
      },
      {
        label: "Stabilite",
        value: signedPercent(gains.reliabilityGainPercent),
        note: buildImpactNote("reliability", gains.reliabilityGainPercent),
      },
      {
        label: "Automatisation",
        value: signedPercent(gains.automationGainPercent),
        note: buildImpactNote("automation", gains.automationGainPercent),
      },
    ],
    scorecard: {
      complexity: clampToFive(source.scorecard.complexity),
      impact: clampToFive(source.scorecard.impact),
      maintenance: clampToFive(source.scorecard.maintenance),
      maturity: clampToFive(source.scorecard.maturity),
    },
    timeline: buildTimeline(source.status, source.name),
  };
}

function fromExperienceProject(source: ExperienceProject, role: string, period: string, context: string): Project {
  const status = toModalStatus(source.status);
  const deliveryGain =
    source.deliveryTimeBeforeHours > 1
      ? Math.round(
          ((source.deliveryTimeBeforeHours * 60 - source.deliveryTimeAfterMinutes) / (source.deliveryTimeBeforeHours * 60)) *
            100
        )
      : 1;
  return {
    id: `exp-${source.id}`,
    name: source.name,
    tagline: source.summary,
    description: source.summary,
    status,
    tags: toProjectTags(source.status),
    stack: source.stack,
    highlights: source.actions.length ? source.actions : ["a remplir"],
    links: normalizeLinks(source.links.repo, source.links.demo, source.links.caseStudy),
    cover: normalizeCover(source.cover),
    cardImage: normalizeCover(source.cardImage),
    previewImage: normalizeCover(source.previewImage),
    iconImage: normalizeCover(source.icon),
    icon: inferProjectIcon(source.name),
    period,
    role,
    context: `${context}. ${source.summary}`,
    scope: inferExperienceScope(source),
    contributions: source.actions.length ? source.actions : ["a remplir"],
    outcomes: source.results.length ? source.results : buildExperienceOutcomes(source, deliveryGain),
    impacts: [
      {
        label: "Temps delivery",
        value: signedPercent(deliveryGain),
        note: buildImpactNote("delivery", deliveryGain),
      },
      {
        label: "Couts",
        value: signedPercent(source.costReductionPercent),
        note: buildImpactNote("cost", source.costReductionPercent),
      },
      {
        label: "Qualite",
        value: signedPercent(source.qualityGainPercent),
        note: buildImpactNote("quality", source.qualityGainPercent),
      },
    ],
    scorecard: {
      complexity: clampToFive(source.scorecard.complexity),
      impact: clampToFive(source.scorecard.impact),
      maintenance: clampToFive(source.scorecard.maintenance),
      maturity: clampToFive(source.scorecard.maturity),
    },
    timeline: buildTimeline(source.status, source.name),
  };
}

function toModalStatus(status: string): ProjectStatus {
  return status === "WIP" ? "WIP" : "DONE";
}

function toProjectTags(status: string): ProjectTag[] {
  if (status === "LIVE") return ["LIVE"];
  if (status === "WIP") return ["CURRENT"];
  return [];
}

function inferProjectIcon(name: string): Project["icon"] {
  const n = name.toLowerCase();
  if (n.includes("twitter")) return "twitter";
  if (n.includes("weighty")) return "weighty";
  if (n.includes("portfolio") || n.includes("jo dev os")) return "portfolio";
  return "folder";
}

function normalizeLinks(github?: string, live?: string, caseStudy?: string) {
  return {
    github: isEmptyLink(github) ? "#" : github,
    live: isEmptyLink(live) ? "#" : live,
    caseStudy: isEmptyLink(caseStudy) ? "#" : caseStudy,
  };
}

function normalizeCover(cover?: string) {
  if (!cover) return undefined;
  const v = cover.trim().toLowerCase();
  if (v === "" || v === "a remplir") return undefined;
  return cover;
}

function isEmptyLink(value?: string) {
  if (!value) return true;
  const v = value.trim().toLowerCase();
  return v === "" || v === "#" || v === "a remplir";
}

function signedPercent(value: number) {
  if (value <= 1) return "a remplir";
  return `${value >= 0 ? "+" : ""}${Math.round(value)}%`;
}

function buildImpactNote(kind: "delivery" | "reliability" | "automation" | "cost" | "quality", value: number) {
  if (value <= 1) return "Impact en cours de mesure.";
  if (kind === "delivery") return "Reduction du cycle de livraison et du time-to-value.";
  if (kind === "reliability") return "Baisse des incidents et meilleure disponibilite en usage reel.";
  if (kind === "automation") return "Moins de taches manuelles et execution plus previsible.";
  if (kind === "cost") return "Optimisation des couts operationnels et du run quotidien.";
  return "Amelioration qualitative sur la stabilite et la perception utilisateur.";
}

function buildBusinessOutcomes(gains: ProjectRecord["businessImpact"]) {
  const lines: string[] = [];
  if (gains.deliveryGainPercent > 1) lines.push(`Cycle de livraison accelere de ${gains.deliveryGainPercent}%.`);
  if (gains.reliabilityGainPercent > 1) lines.push(`Fiabilite globale amelioree de ${gains.reliabilityGainPercent}%.`);
  if (gains.automationGainPercent > 1) lines.push(`Automatisation des operations augmentee de ${gains.automationGainPercent}%.`);
  if (gains.costReductionPercent > 1) lines.push(`Reduction de couts estimee a ${gains.costReductionPercent}%.`);
  if (gains.usersImpacted > 1) lines.push(`${gains.usersImpacted}+ utilisateurs impactes positivement.`);
  return lines.slice(0, 4);
}

function buildExperienceOutcomes(source: ExperienceProject, deliveryGain: number) {
  const lines: string[] = [];
  if (deliveryGain > 1) lines.push(`Reduction du temps de livraison de ${deliveryGain}%.`);
  if (source.costReductionPercent > 1) lines.push(`Diminution des couts operationnels de ${source.costReductionPercent}%.`);
  if (source.qualityGainPercent > 1) lines.push(`Qualite de service renforcee de ${source.qualityGainPercent}%.`);
  if (source.usersImpacted > 1) lines.push(`${source.usersImpacted}+ utilisateurs internes servis.`);
  return lines.length ? lines : ["Impact en cours de mesure."];
}

function inferExperienceScope(source: ExperienceProject) {
  const name = source.name.toLowerCase();
  if (name.includes("reseau") || name.includes("cisco") || name.includes("routeur")) {
    return "Automatisation reseau entreprise";
  }
  if (name.includes("immobilier") || name.includes("marche")) {
    return "Data collecte et analyse metier";
  }
  return "Projet experience";
}

function clampToFive(value: number) {
  return Math.max(1, Math.min(5, value));
}

function buildTimeline(status: string, projectName: string): Project["timeline"] {
  if (status === "WIP") {
    return [
      { phase: "Conception", state: "done", note: `Cadrage fonctionnel et architecture de ${projectName}.` },
      { phase: "Build", state: "current", note: "Developpement actif des fonctionnalites prioritaires." },
      { phase: "Release", state: "next", note: "Preparation de release avec tests et validation metier." },
      { phase: "Iterations", state: "next", note: "Backlog d'optimisations post-MVP deja structure." },
    ];
  }
  return [
    { phase: "Conception", state: "done", note: `Definition du scope et des priorites produit pour ${projectName}.` },
    { phase: "Build", state: "done", note: "Implementation des composants, API et flux critiques." },
    { phase: "Release", state: "current", note: "Mise en production et passage de validation utilisateur." },
    { phase: "Iterations", state: "current", note: "Ameliorations continues, correctifs et evolutions fonctionnelles." },
  ];
}
