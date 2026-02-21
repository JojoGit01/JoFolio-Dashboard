"use client";

import { useMemo, useState } from "react";
import ExperienceTimelineLeft, { ExperienceItem } from "./ExperienceTimelineLeft";
import ExperienceDetailsRight, { ExperienceDetails } from "./ExperienceDetailsRight";

export default function ExperiencePage() {
  const items = useMemo<ExperienceItem[]>(
    () => [
      {
        id: "orange-2021-2024",
        year: 2024,
        type: "CDI",
        titleBold: "Junior Développeur Full Stack",
        titleLight: "Orange Business",
        line: "Biot • CDD (2021–2024)",
        chips: ["Automation", "Network", "Cisco Viptela"],
      },
      {
        id: "thoody-2020",
        year: 2020,
        type: "STAGE",
        titleBold: "Stage développeur full stack",
        titleLight: "Thoody Consulting",
        line: "Monaco • 1 mois (2020)",
        chips: ["Web Scraping", "Data", "Fullstack"],
      },
    ],
    []
  );

  const detailsMap = useMemo<Record<string, ExperienceDetails>>(
    () => ({
      "orange-2021-2024": {
        id: "orange-2021-2024",
        headerTitle: "Junior Développeur Full Stack",
        headerBadge: "CDD",
        company: "Orange Business",
        duration: "2021 – 2024 • 3 ans",
        location: "Biot • France",
        stack: ["Automatisation", "Réseau", "Cisco Viptela", "Production"],
        intro: "Développement d’outils internes orientés productivité et fiabilité réseau.",
        missions: [
          "Prototype d’assistance intelligente réseau",
          "Automatisation de la configuration et de la mise en service de routeurs",
          "Intégration d’une logique d’assistance intelligente avec gestion des erreurs",
          "Projet réalisé en autonomie complète, de la conception à la mise en production",
          "Application interne d’automatisation réseau – Cisco Viptela",
          "Génération automatique de configurations réseau à partir de champs structurés",
          "Standardisation et sécurisation des déploiements pour les experts réseau",
        ],
        results: [
          "Réduction du temps de déploiement de plusieurs heures à moins de 5 minutes",
          "Passage d’un processus manuel (2–5h) à une génération quasi instantanée",
          "Déploiements plus fiables : standardisation + contrôles d’erreurs",
        ],
        relatedProjects: [
          {
            id: "twitter",
            title: "Twitter Clone",
            subtitle: "FastAPI / PostgreSQL",
            iconText: "🐦",
            links: [{ label: "Case study", href: "/projects" }],
          },
          {
            id: "weighty",
            title: "Weighty",
            subtitle: "React Native / Expo",
            iconText: "W",
            links: [{ label: "Voir", href: "/projects" }],
          },
          {
            id: "portfolio",
            title: "Portfolio",
            subtitle: "Next.js / Tailwind",
            iconText: "Jo",
            links: [{ label: "Voir", href: "/projects" }],
          },
        ],
        action: { label: "Télécharger attestation", href: "#" },
      },

      "thoody-2020": {
        id: "thoody-2020",
        headerTitle: "Stage développeur full stack",
        headerBadge: "STAGE",
        company: "Thoody Consulting",
        duration: "2020 • 1 mois",
        location: "Monaco",
        stack: ["Web scraping", "Analyse", "Fullstack", "Déploiement"],
        intro: "Projet data orienté immobilier : collecte, analyse et restitution.",
        missions: [
          "Analyse du marché immobilier – Monaco",
          "Développement d’un projet de web scraping pour collecter des données immobilières",
          "Analyse des tendances du marché et des prix à partir des données collectées",
          "Déploiement du projet sur un environnement fullstack",
        ],
        results: [
          "Données structurées prêtes à analyser (prix, tendances, disponibilités)",
          "Automatisation de la collecte pour éviter les saisies manuelles",
        ],
        relatedProjects: [
          {
            id: "portfolio",
            title: "Portfolio",
            subtitle: "UI / Storytelling",
            iconText: "Jo",
            links: [{ label: "Voir", href: "/projects" }],
          },
        ],
      },
    }),
    []
  );

  const [selectedId, setSelectedId] = useState(items[0]?.id ?? "");

  return (
    <div className="relative mt-4 min-h-[860px] text-white">
      <div className="grid grid-cols-12 gap-10">
        {/* LEFT */}
        <div className="col-span-12 lg:col-span-5">
          <ExperienceTimelineLeft
            items={items}
            selectedId={selectedId}
            onSelect={setSelectedId}
          />
        </div>

        {/* RIGHT */}
        <div className="col-span-12 lg:col-span-7">
          <ExperienceDetailsRight
            details={detailsMap[selectedId]}
            onClose={() => {
              // Option: fermer = désélectionner (ou laisser)
              // setSelectedId("");
            }}
          />
        </div>
      </div>
    </div>
  );
}
