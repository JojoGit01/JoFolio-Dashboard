export const DEFAULT_TEXT = "a remplir";
export const DEFAULT_NUMBER = 1;

export type SkillLevel = "Beginner" | "Intermediate" | "Advanced" | "Expert";
export type SkillConfidence = "Core" | "Strong" | "Working";
export type ProjectStatus = "LIVE" | "WIP" | "BETA" | "DONE" | "ARCHIVE";
export type ContractType = "CDI" | "CDD" | "Freelance" | "Stage" | "Personnel";

export type SkillRecord = {
  id: string;
  name: string;
  category:
    | "Frontend"
    | "Backend"
    | "Database"
    | "DevOps"
    | "ProductivityAI"
    | "MobileDesktop"
    | "TestingQuality"
    | "SecurityNetwork";
  level: SkillLevel;
  confidence: SkillConfidence;
  years: number;
  lastUsedYear: number;
  priorityScore: number;
  note: string;
};

export type ProjectScorecard = {
  complexity: number;
  impact: number;
  maintenance: number;
  maturity: number;
};

export type ExperienceProject = {
  id: string;
  name: string;
  status: ProjectStatus;
  cover?: string;
  icon?: string;
  cardImage?: string;
  previewImage?: string;
  stack: string[];
  summary: string;
  actions: string[];
  results: string[];
  deliveryTimeBeforeHours: number;
  deliveryTimeAfterMinutes: number;
  costReductionPercent: number;
  qualityGainPercent: number;
  usersImpacted: number;
  links: {
    repo: string;
    demo: string;
    caseStudy: string;
  };
  scorecard: ProjectScorecard;
  notes: string;
};

export type ExperienceRecord = {
  id: string;
  title: string;
  company: string;
  location: string;
  country: string;
  contractType: ContractType;
  workMode: "Onsite" | "Remote" | "Hybrid";
  startYear: number;
  endYear: number;
  durationMonths: number;
  teamSize: number;
  context: string;
  responsibilities: string[];
  technologies: string[];
  projects: ExperienceProject[];
  globalImpact: {
    deliveryGainPercent: number;
    costReductionPercent: number;
    reliabilityGainPercent: number;
    automationGainPercent: number;
  };
  reference: string;
};

export type EducationRecord = {
  id: string;
  title: string;
  school: string;
  city: string;
  country: string;
  startMonth: string;
  startYear: number;
  endMonth: string;
  endYear: number;
  specialization: string;
  level: string;
  grade: string;
  modules: string[];
  keySkills: string[];
  diplomaFile: string;
  notes: string;
};

export type ProjectRecord = {
  id: string;
  name: string;
  status: ProjectStatus;
  cover?: string;
  icon?: string;
  cardImage?: string;
  previewImage?: string;
  period: string;
  type: string;
  role: string;
  summary: string;
  stack: string[];
  highlights: string[];
  businessImpact: {
    deliveryGainPercent: number;
    costReductionPercent: number;
    reliabilityGainPercent: number;
    automationGainPercent: number;
    usersImpacted: number;
  };
  links: {
    repo: string;
    demo: string;
    caseStudy: string;
  };
  scorecard: ProjectScorecard;
};

export type PortfolioData = {
  profile: {
    fullName: string;
    title: string;
    city: string;
    country: string;
    yearsPro: number;
    yearsPersonal: number;
    availability: string;
    bio: string;
  };
  contact: {
    email: string;
    phone: string;
    linkedin: string;
    github: string;
    website: string;
    timezone: string;
    responseTimeHours: number;
  };
  experiences: ExperienceRecord[];
  projects: ProjectRecord[];
  formations: EducationRecord[];
  skills: SkillRecord[];
  quickStats: {
    totalProjects: number;
    totalExperiences: number;
    totalFormations: number;
    totalCertifications: number;
  };
};

export const PORTFOLIO_DATA: PortfolioData = {
  profile: {
    fullName: "Jo Di Martino",
    title: "Developpeur Full-Stack JS",
    city: "Nice",
    country: "France",
    yearsPro: 3,
    yearsPersonal: 8,
    availability: "Disponible CDI / Freelance",
    bio: "Developpeur Full-Stack oriente produit, automation et dashboards premium.",
  },
  contact: {
    email: "contact@jodevos.dev",
    phone: DEFAULT_TEXT,
    linkedin: "https://linkedin.com/in/jo-dm",
    github: "https://github.com/jo-dm",
    website: DEFAULT_TEXT,
    timezone: "Europe/Paris",
    responseTimeHours: 24,
  },
  experiences: [
    {
      id: "exp-personal-fullstack-2025",
      title: "Developpeur Fullstack",
      company: "Personnel",
      location: "Remote",
      country: "France",
      contractType: "Personnel",
      workMode: "Remote",
      startYear: 2025,
      endYear: 2026,
      durationMonths: DEFAULT_NUMBER,
      teamSize: DEFAULT_NUMBER,
      context: "Developpement de produits personnels et experimentation continue.",
      responsibilities: [
        "Conception produit et architecture technique",
        "Implementation front-end et back-end",
        "Suivi delivery et amelioration continue",
      ],
      technologies: [
        "Next.js",
        "React",
        "TypeScript",
        "Node.js",
        "PostgreSQL",
        "Docker",
      ],
      projects: [
        {
          id: "weighty",
          name: "Weighty",
          status: "WIP",
          cover: "/images/projects/projects_weighty_banner.png",
          icon: "/images/projects/projects_weighty_logo.png",
          cardImage: "/images/projects/projects_weighty_banner.png",
          previewImage: "/images/projects/projects_weighty_banner.png",
          stack: ["Next.js", "TypeScript", "Node.js"],
          summary: "Plateforme de suivi nutrition et performance avec objectifs hebdo et analytics personnalises.",
          actions: [
            "Conception d'une architecture modulaire Next.js avec separation UI / logique metier",
            "Implementation d'un moteur de calcul calories et macros adapte au profil utilisateur",
            "Mise en place d'un flux onboarding + routines quotidiennes optimisees mobile",
          ],
          results: [
            "MVP valide avec parcours complet: onboarding, tracking, recap hebdo",
            "Reduction du temps de saisie grace aux presets repas et templates d'entrainement",
            "Premiers retours utilisateurs positifs sur la clarte du dashboard",
          ],
          deliveryTimeBeforeHours: 8,
          deliveryTimeAfterMinutes: 190,
          costReductionPercent: 20,
          qualityGainPercent: 42,
          usersImpacted: 120,
          links: {
            repo: DEFAULT_TEXT,
            demo: DEFAULT_TEXT,
            caseStudy: DEFAULT_TEXT,
          },
          scorecard: {
            complexity: 4,
            impact: 3,
            maintenance: 3,
            maturity: 2,
          },
          notes: DEFAULT_TEXT,
        },
        {
          id: "portfolio",
          name: "Portfolio",
          status: "LIVE",
          cover: "/images/projects/projects_portfolio_banner.png",
          icon: "/images/projects/projects_portfolio_logo.png",
          cardImage: "/images/projects/projects_portfolio_banner.png",
          previewImage: "/images/projects/projects_portfolio_banner.png",
          stack: ["Next.js", "Tailwind", "Framer Motion"],
          summary: "Dashboard portfolio type OS, orientee UX premium, navigation fluide et storytelling technique.",
          actions: [
            "Design system unifie avec tokens visuels et composants reutilisables",
            "Creation d'experiences interactives (modals projets, transitions de routes, micro-interactions)",
            "Optimisation mobile-first avec bottom tabs et layouts adaptatifs par page",
          ],
          results: [
            "Navigation percue plus rapide grace aux transitions et a la hierarchie visuelle",
            "Meilleure lisibilite du parcours pro avec des sections specialisees par domaine",
            "Base technique maintenable pour iterer rapidement sur le branding et le contenu",
          ],
          deliveryTimeBeforeHours: 6,
          deliveryTimeAfterMinutes: 150,
          costReductionPercent: 28,
          qualityGainPercent: 60,
          usersImpacted: 300,
          links: {
            repo: DEFAULT_TEXT,
            demo: DEFAULT_TEXT,
            caseStudy: DEFAULT_TEXT,
          },
          scorecard: {
            complexity: 4,
            impact: 4,
            maintenance: 4,
            maturity: 4,
          },
          notes: DEFAULT_TEXT,
        },
        {
          id: "shopy",
          name: "Shopy",
          status: "DONE",
          cover: "/images/projects/projects_shopy_mom_banner.png",
          icon: "/images/projects/projects_shopy_mom_logo.png",
          cardImage: "/images/projects/projects_shopy_mom_banner.png",
          previewImage: "/images/projects/projects_shopy_mom_banner.png",
          stack: ["React", "Node.js", "MongoDB"],
          summary: "Application e-commerce fullstack avec catalogue, panier, checkout et espace administration.",
          actions: [
            "Construction d'un front React oriente conversion avec parcours produit simplifie",
            "Mise en place d'API Node.js securisees pour panier, commandes et catalogue",
            "Structuration MongoDB avec indexes pour recherches et filtres performants",
          ],
          results: [
            "Parcours d'achat raccourci avec moins d'etapes entre listing et validation",
            "Back-office simple pour mettre a jour produits, prix et disponibilite",
            "Socle reutilisable pour lancer d'autres verticales e-commerce",
          ],
          deliveryTimeBeforeHours: 5,
          deliveryTimeAfterMinutes: 175,
          costReductionPercent: 18,
          qualityGainPercent: 40,
          usersImpacted: 80,
          links: {
            repo: DEFAULT_TEXT,
            demo: DEFAULT_TEXT,
            caseStudy: DEFAULT_TEXT,
          },
          scorecard: {
            complexity: 3,
            impact: 3,
            maintenance: 3,
            maturity: 4,
          },
          notes: DEFAULT_TEXT,
        },
      ],
      globalImpact: {
        deliveryGainPercent: DEFAULT_NUMBER,
        costReductionPercent: DEFAULT_NUMBER,
        reliabilityGainPercent: DEFAULT_NUMBER,
        automationGainPercent: DEFAULT_NUMBER,
      },
      reference: DEFAULT_TEXT,
    },
    {
      id: "exp-orange-business-2021",
      title: "Junior Developpeur Full Stack",
      company: "Orange Business",
      location: "Biot",
      country: "France",
      contractType: "CDD",
      workMode: "Onsite",
      startYear: 2021,
      endYear: 2024,
      durationMonths: 36,
      teamSize: DEFAULT_NUMBER,
      context: "Automatisation reseau et outils internes pour experts reseau.",
      responsibilities: [
        "Developpement d'applications internes de configuration reseau",
        "Conception de prototypes d'assistance intelligente",
        "Automatisation des process de mise en service",
      ],
      technologies: ["React", "Python", "Next.js", "Node.js", "Cisco Viptela"],
      projects: [
        {
          id: "assistant-intelligent-reseau",
          name: "Prototype d'assistance intelligente reseau",
          status: "DONE",
          cover: "/images/projects/projects_ia_reseau_banner.png",
          icon: "/images/projects/projects_ia_reseau_logo.png",
          cardImage: "/images/projects/projects_ia_reseau_banner.png",
          previewImage: "/images/projects/projects_ia_reseau_banner.png",
          stack: ["React", "Python", "Next.js"],
          summary: "Assistant intelligent pour automatiser la configuration routeurs et reduire les erreurs d'exploitation.",
          actions: [
            "Automatisation de la configuration et mise en service routeurs",
            "Gestion des erreurs et logique d'assistance intelligente",
            "Pilotage du projet de la conception a la mise en production",
          ],
          results: [
            "Reduction du temps de deploiement de plusieurs heures a moins de 5 minutes",
            "Mise en production en autonomie complete",
          ],
          deliveryTimeBeforeHours: 3,
          deliveryTimeAfterMinutes: 5,
          costReductionPercent: 45,
          qualityGainPercent: 52,
          usersImpacted: 60,
          links: {
            repo: DEFAULT_TEXT,
            demo: DEFAULT_TEXT,
            caseStudy: DEFAULT_TEXT,
          },
          scorecard: {
            complexity: 4,
            impact: 5,
            maintenance: 4,
            maturity: 4,
          },
          notes: DEFAULT_TEXT,
        },
        {
          id: "automation-cisco-viptela",
          name: "Application interne d'automatisation reseau - Cisco Viptela",
          status: "DONE",
          cover: "/images/projects/projects_app_auto_cisco_banner.png",
          icon: "/images/projects/projects_app_auto_cisco_logo.png",
          cardImage: "/images/projects/projects_app_auto_cisco_banner.png",
          previewImage: "/images/projects/projects_app_auto_cisco_banner.png",
          stack: ["React", "Node.js", "Cisco Viptela"],
          summary: "Application interne pour generer des configurations Cisco Viptela fiables en quelques secondes.",
          actions: [
            "Generation automatique via champs structures",
            "Standardisation des deploiements experts reseau",
            "Renforcement de la securisation des mises en production",
          ],
          results: [
            "Passage d'un process manuel de 2 a 5h a une generation quasi instantanee",
            "Reduction des erreurs humaines",
          ],
          deliveryTimeBeforeHours: 2,
          deliveryTimeAfterMinutes: 5,
          costReductionPercent: 55,
          qualityGainPercent: 58,
          usersImpacted: 90,
          links: {
            repo: DEFAULT_TEXT,
            demo: DEFAULT_TEXT,
            caseStudy: DEFAULT_TEXT,
          },
          scorecard: {
            complexity: 4,
            impact: 5,
            maintenance: 4,
            maturity: 4,
          },
          notes: DEFAULT_TEXT,
        },
      ],
      globalImpact: {
        deliveryGainPercent: 70,
        costReductionPercent: DEFAULT_NUMBER,
        reliabilityGainPercent: DEFAULT_NUMBER,
        automationGainPercent: 80,
      },
      reference: DEFAULT_TEXT,
    },
    {
      id: "exp-thoody-2020",
      title: "Stage developpeur full stack",
      company: "Thoody Consulting",
      location: "Monaco",
      country: "Monaco",
      contractType: "CDD",
      workMode: "Onsite",
      startYear: 2020,
      endYear: 2020,
      durationMonths: 1,
      teamSize: DEFAULT_NUMBER,
      context: "Analyse du marche immobilier de Monaco.",
      responsibilities: [
        "Collecte et structuration de donnees immobilieres",
        "Analyse des tendances de prix",
        "Deploiement sur environnement fullstack",
      ],
      technologies: ["Python", "Web Scraping", "Data Analysis"],
      projects: [
        {
          id: "analyse-marche-immobilier-monaco",
          name: "Analyse du marche immobilier - Monaco",
          status: "DONE",
          cover: "/images/projects/projects_analyse_marche_monaco_banner.png",
          icon: "/images/projects/projects_analyse_marche_monaco_logo.png",
          cardImage: "/images/projects/projects_analyse_marche_monaco_banner.png",
          previewImage: "/images/projects/projects_analyse_marche_monaco_banner.png",
          stack: ["Python", "Scraping", "Data Analysis"],
          summary: "Collecte automatique et analyse des donnees immobilieres pour extraire tendances prix et zones chaudes.",
          actions: [
            "Developpement du pipeline de scraping",
            "Analyse des tendances marche/prix",
            "Deploiement du projet en fullstack",
          ],
          results: [
            "Base de donnees exploitable pour visualiser les tendances de prix par quartier",
            "Process de collecte industrialise reduisant la saisie manuelle",
            "Insights actionnables pour orienter des decisions d'investissement",
          ],
          deliveryTimeBeforeHours: 4,
          deliveryTimeAfterMinutes: 90,
          costReductionPercent: 22,
          qualityGainPercent: 35,
          usersImpacted: 15,
          links: {
            repo: DEFAULT_TEXT,
            demo: DEFAULT_TEXT,
            caseStudy: DEFAULT_TEXT,
          },
          scorecard: {
            complexity: 3,
            impact: 3,
            maintenance: 3,
            maturity: 3,
          },
          notes: DEFAULT_TEXT,
        },
      ],
      globalImpact: {
        deliveryGainPercent: DEFAULT_NUMBER,
        costReductionPercent: DEFAULT_NUMBER,
        reliabilityGainPercent: DEFAULT_NUMBER,
        automationGainPercent: DEFAULT_NUMBER,
      },
      reference: DEFAULT_TEXT,
    },
  ],
  projects: [
    {
      id: "clone-twitter",
      name: "Clone Twitter",
      status: "DONE",
      cover: "/images/projects/projects_twitter_banner.png",
      icon: "/images/projects/projects_twitter_logo.png",
      cardImage: "/images/projects/projects_twitter_banner.png",
      previewImage: "/images/projects/projects_twitter_banner.png",
      period: "2023",
      type: "Social Platform",
      role: "Fullstack JS Developer",
      summary: "Application sociale temps reel avec fil d'actualite, publication, likes et commentaires.",
      stack: ["React", "Node.js", "MongoDB"],
      highlights: [
        "Feed dynamique avec pagination et rafraichissement progressif",
        "Systeme d'interactions (likes, commentaires, repost) avec mise a jour instantanee",
        "Auth securisee avec gestion de sessions et routes protegees",
        "Optimisation de requetes MongoDB pour reduire la latence percue",
      ],
      businessImpact: {
        deliveryGainPercent: 24,
        costReductionPercent: 12,
        reliabilityGainPercent: 30,
        automationGainPercent: 20,
        usersImpacted: 1500,
      },
      links: {
        repo: DEFAULT_TEXT,
        demo: DEFAULT_TEXT,
        caseStudy: DEFAULT_TEXT,
      },
      scorecard: {
        complexity: 3,
        impact: 2,
        maintenance: 3,
        maturity: 3,
      },
    },
    {
      id: "clone-netflix",
      name: "Clone Netflix",
      status: "DONE",
      cover: "/images/projects/projects_netflix_banner.png",
      icon: "/images/projects/projects_netflix_logo.png",
      cardImage: "/images/projects/projects_netflix_banner.png",
      previewImage: "/images/projects/projects_netflix_banner.png",
      period: "2024",
      type: "Streaming UI Platform",
      role: "Front-end Engineer",
      summary: "Interface streaming avec browse par categories, details contenus et experience immersive.",
      stack: ["Next.js", "TypeScript", "Tailwind"],
      highlights: [
        "UI orientee media avec sections hero, rails et navigation par genres",
        "Chargement optimise des assets pour fluidifier la consultation du catalogue",
        "Composants reutilisables pour cartes, badges et overlays d'information",
        "Amelioration de la coherence visuelle sur desktop et mobile",
      ],
      businessImpact: {
        deliveryGainPercent: 28,
        costReductionPercent: 15,
        reliabilityGainPercent: 34,
        automationGainPercent: 18,
        usersImpacted: 900,
      },
      links: {
        repo: DEFAULT_TEXT,
        demo: DEFAULT_TEXT,
        caseStudy: DEFAULT_TEXT,
      },
      scorecard: {
        complexity: 3,
        impact: 2,
        maintenance: 3,
        maturity: 3,
      },
    },
    {
      id: "clone-battlenet",
      name: "Clone Battlenet",
      status: "DONE",
      cover: "/images/projects/projects_battlenet_banner.png",
      icon: "/images/projects/projects_battlenet_logo.png",
      cardImage: "/images/projects/projects_battlenet_banner.png",
      previewImage: "/images/projects/projects_battlenet_banner.png",
      period: "2024",
      type: "Desktop Launcher",
      role: "Desktop Front-end Developer",
      summary: "Launcher desktop inspire de Battlenet avec navigation jeux, updates et panneau utilisateur.",
      stack: ["Electron", "React", "TypeScript"],
      highlights: [
        "Architecture Electron + React pour simuler une experience app native",
        "Gestion d'etat pour sections launcher, bibliotheque et profils",
        "Composants d'interface orientes gaming avec transitions et feedbacks visuels",
        "Structure preparant l'integration d'un systeme de patch notes et updates",
      ],
      businessImpact: {
        deliveryGainPercent: 22,
        costReductionPercent: 10,
        reliabilityGainPercent: 26,
        automationGainPercent: 16,
        usersImpacted: 600,
      },
      links: {
        repo: DEFAULT_TEXT,
        demo: DEFAULT_TEXT,
        caseStudy: DEFAULT_TEXT,
      },
      scorecard: {
        complexity: 4,
        impact: 2,
        maintenance: 3,
        maturity: 3,
      },
    },
  ],
  formations: [
    {
      id: "master-informatique-ia",
      title: "Master Informatique",
      school: "Universite Cote d'Azur",
      city: "Nice",
      country: "France",
      startMonth: "Sept",
      startYear: 2022,
      endMonth: "Sept",
      endYear: 2024,
      specialization: "Intelligence Artificielle",
      level: "Master",
      grade: DEFAULT_TEXT,
      modules: [DEFAULT_TEXT],
      keySkills: [DEFAULT_TEXT],
      diplomaFile: DEFAULT_TEXT,
      notes: DEFAULT_TEXT,
    },
    {
      id: "licence-pro-informatique",
      title: "Licence Pro Informatique",
      school: "Universite Cote d'Azur",
      city: "Nice",
      country: "France",
      startMonth: "Sept",
      startYear: 2021,
      endMonth: "Sept",
      endYear: 2022,
      specialization:
        "Conception, Developpement et Test de logiciels parcours Developpement d'application mobile",
      level: "Licence Pro",
      grade: DEFAULT_TEXT,
      modules: [DEFAULT_TEXT],
      keySkills: [DEFAULT_TEXT],
      diplomaFile: DEFAULT_TEXT,
      notes: DEFAULT_TEXT,
    },
    {
      id: "bts-snir",
      title: "BTS SNIR",
      school: "Eucalyptus",
      city: "Nice",
      country: "France",
      startMonth: "Sept",
      startYear: 2019,
      endMonth: "Juin",
      endYear: 2021,
      specialization: "Systemes Numeriques Informatique et Reseaux",
      level: "BTS",
      grade: DEFAULT_TEXT,
      modules: [DEFAULT_TEXT],
      keySkills: [DEFAULT_TEXT],
      diplomaFile: DEFAULT_TEXT,
      notes: DEFAULT_TEXT,
    },
  ],
  skills: [
    { id: "react", name: "React.js", category: "Frontend", level: "Expert", confidence: "Core", years: 5, lastUsedYear: 2026, priorityScore: 5, note: DEFAULT_TEXT },
    { id: "next", name: "Next.js", category: "Frontend", level: "Expert", confidence: "Core", years: 4, lastUsedYear: 2026, priorityScore: 5, note: DEFAULT_TEXT },
    { id: "typescript", name: "TypeScript", category: "Frontend", level: "Advanced", confidence: "Core", years: 4, lastUsedYear: 2026, priorityScore: 5, note: DEFAULT_TEXT },
    { id: "javascript", name: "JavaScript ES6+", category: "Frontend", level: "Expert", confidence: "Core", years: 6, lastUsedYear: 2026, priorityScore: 5, note: DEFAULT_TEXT },
    { id: "react-native", name: "React Native", category: "Frontend", level: "Advanced", confidence: "Strong", years: 3, lastUsedYear: 2025, priorityScore: 4, note: DEFAULT_TEXT },
    { id: "tailwind", name: "Tailwind CSS", category: "Frontend", level: "Advanced", confidence: "Strong", years: 4, lastUsedYear: 2026, priorityScore: 4, note: DEFAULT_TEXT },
    { id: "redux", name: "Redux Toolkit", category: "Frontend", level: "Advanced", confidence: "Strong", years: 3, lastUsedYear: 2025, priorityScore: 4, note: DEFAULT_TEXT },
    { id: "zustand", name: "Zustand", category: "Frontend", level: "Advanced", confidence: "Working", years: 2, lastUsedYear: 2025, priorityScore: 3, note: DEFAULT_TEXT },
    { id: "framer-motion", name: "Framer Motion", category: "Frontend", level: "Advanced", confidence: "Strong", years: 2, lastUsedYear: 2026, priorityScore: 4, note: DEFAULT_TEXT },
    { id: "styled-components", name: "Styled Components", category: "Frontend", level: "Intermediate", confidence: "Working", years: 2, lastUsedYear: 2025, priorityScore: 3, note: DEFAULT_TEXT },
    { id: "sass", name: "Sass", category: "Frontend", level: "Intermediate", confidence: "Working", years: 2, lastUsedYear: 2024, priorityScore: 2, note: DEFAULT_TEXT },
    { id: "vite", name: "Vite", category: "Frontend", level: "Advanced", confidence: "Working", years: 2, lastUsedYear: 2025, priorityScore: 3, note: DEFAULT_TEXT },
    { id: "html5", name: "HTML5", category: "Frontend", level: "Expert", confidence: "Core", years: 7, lastUsedYear: 2026, priorityScore: 5, note: DEFAULT_TEXT },
    { id: "css3", name: "CSS3", category: "Frontend", level: "Expert", confidence: "Core", years: 7, lastUsedYear: 2026, priorityScore: 5, note: DEFAULT_TEXT },

    { id: "node", name: "Node.js", category: "Backend", level: "Expert", confidence: "Core", years: 5, lastUsedYear: 2026, priorityScore: 5, note: DEFAULT_TEXT },
    { id: "express", name: "Express", category: "Backend", level: "Advanced", confidence: "Strong", years: 4, lastUsedYear: 2026, priorityScore: 4, note: DEFAULT_TEXT },
    { id: "nestjs", name: "NestJS", category: "Backend", level: "Advanced", confidence: "Strong", years: 3, lastUsedYear: 2025, priorityScore: 4, note: DEFAULT_TEXT },
    { id: "rest-api", name: "API Rest", category: "Backend", level: "Expert", confidence: "Core", years: 5, lastUsedYear: 2026, priorityScore: 5, note: DEFAULT_TEXT },
    { id: "graphql", name: "GraphQL", category: "Backend", level: "Intermediate", confidence: "Working", years: 1, lastUsedYear: 2025, priorityScore: 2, note: DEFAULT_TEXT },
    { id: "python", name: "Python", category: "Backend", level: "Advanced", confidence: "Strong", years: 4, lastUsedYear: 2025, priorityScore: 4, note: DEFAULT_TEXT },
    { id: "fastapi", name: "FastAPI", category: "Backend", level: "Intermediate", confidence: "Working", years: 2, lastUsedYear: 2025, priorityScore: 3, note: DEFAULT_TEXT },
    { id: "django", name: "Django", category: "Backend", level: "Beginner", confidence: "Working", years: 1, lastUsedYear: 2024, priorityScore: 1, note: DEFAULT_TEXT },
    { id: "socketio", name: "Socket.io", category: "Backend", level: "Intermediate", confidence: "Working", years: 2, lastUsedYear: 2025, priorityScore: 2, note: DEFAULT_TEXT },

    { id: "postgresql", name: "PostgreSQL", category: "Database", level: "Advanced", confidence: "Strong", years: 4, lastUsedYear: 2026, priorityScore: 4, note: DEFAULT_TEXT },
    { id: "mysql", name: "MySQL", category: "Database", level: "Advanced", confidence: "Strong", years: 4, lastUsedYear: 2025, priorityScore: 4, note: DEFAULT_TEXT },
    { id: "mongodb", name: "MongoDB", category: "Database", level: "Advanced", confidence: "Strong", years: 3, lastUsedYear: 2025, priorityScore: 4, note: DEFAULT_TEXT },
    { id: "redis", name: "Redis", category: "Database", level: "Intermediate", confidence: "Working", years: 2, lastUsedYear: 2025, priorityScore: 3, note: DEFAULT_TEXT },
    { id: "sqlite", name: "SQLite", category: "Database", level: "Intermediate", confidence: "Working", years: 2, lastUsedYear: 2024, priorityScore: 2, note: DEFAULT_TEXT },
    { id: "prisma", name: "Prisma", category: "Database", level: "Advanced", confidence: "Working", years: 2, lastUsedYear: 2025, priorityScore: 3, note: DEFAULT_TEXT },

    { id: "docker", name: "Docker", category: "DevOps", level: "Advanced", confidence: "Strong", years: 4, lastUsedYear: 2026, priorityScore: 4, note: DEFAULT_TEXT },
    { id: "git", name: "Git", category: "DevOps", level: "Expert", confidence: "Core", years: 6, lastUsedYear: 2026, priorityScore: 5, note: DEFAULT_TEXT },
    { id: "github-actions", name: "GitHub Actions", category: "DevOps", level: "Advanced", confidence: "Strong", years: 3, lastUsedYear: 2026, priorityScore: 4, note: DEFAULT_TEXT },
    { id: "aws", name: "AWS", category: "DevOps", level: "Intermediate", confidence: "Working", years: 2, lastUsedYear: 2025, priorityScore: 3, note: DEFAULT_TEXT },
    { id: "ci-cd", name: "CI/CD", category: "DevOps", level: "Advanced", confidence: "Strong", years: 3, lastUsedYear: 2026, priorityScore: 4, note: DEFAULT_TEXT },
    { id: "linux", name: "Linux", category: "DevOps", level: "Advanced", confidence: "Strong", years: 4, lastUsedYear: 2026, priorityScore: 4, note: DEFAULT_TEXT },
    { id: "nginx", name: "Nginx", category: "DevOps", level: "Intermediate", confidence: "Working", years: 2, lastUsedYear: 2025, priorityScore: 2, note: DEFAULT_TEXT },
    { id: "vercel", name: "Vercel", category: "DevOps", level: "Advanced", confidence: "Strong", years: 3, lastUsedYear: 2026, priorityScore: 4, note: DEFAULT_TEXT },

    { id: "chatgpt", name: "ChatGPT", category: "ProductivityAI", level: "Expert", confidence: "Core", years: 2, lastUsedYear: 2026, priorityScore: 5, note: DEFAULT_TEXT },
    { id: "notion", name: "Notion", category: "ProductivityAI", level: "Advanced", confidence: "Strong", years: 3, lastUsedYear: 2026, priorityScore: 4, note: DEFAULT_TEXT },
    { id: "figma", name: "Figma", category: "ProductivityAI", level: "Intermediate", confidence: "Working", years: 2, lastUsedYear: 2025, priorityScore: 3, note: DEFAULT_TEXT },
    { id: "jira", name: "Jira", category: "ProductivityAI", level: "Intermediate", confidence: "Working", years: 2, lastUsedYear: 2024, priorityScore: 2, note: DEFAULT_TEXT },
    { id: "postman", name: "Postman", category: "ProductivityAI", level: "Advanced", confidence: "Strong", years: 4, lastUsedYear: 2026, priorityScore: 4, note: DEFAULT_TEXT },
    { id: "insomnia", name: "Insomnia", category: "ProductivityAI", level: "Intermediate", confidence: "Working", years: 2, lastUsedYear: 2025, priorityScore: 2, note: DEFAULT_TEXT },

    { id: "electron", name: "Electron", category: "MobileDesktop", level: "Advanced", confidence: "Strong", years: 2, lastUsedYear: 2025, priorityScore: 3, note: DEFAULT_TEXT },
    { id: "expo", name: "Expo", category: "MobileDesktop", level: "Intermediate", confidence: "Working", years: 2, lastUsedYear: 2025, priorityScore: 2, note: DEFAULT_TEXT },
    { id: "pwa", name: "PWA", category: "MobileDesktop", level: "Intermediate", confidence: "Working", years: 2, lastUsedYear: 2024, priorityScore: 2, note: DEFAULT_TEXT },

    { id: "jest", name: "Jest", category: "TestingQuality", level: "Advanced", confidence: "Strong", years: 3, lastUsedYear: 2025, priorityScore: 3, note: DEFAULT_TEXT },
    { id: "cypress", name: "Cypress", category: "TestingQuality", level: "Intermediate", confidence: "Working", years: 2, lastUsedYear: 2025, priorityScore: 2, note: DEFAULT_TEXT },
    { id: "playwright", name: "Playwright", category: "TestingQuality", level: "Intermediate", confidence: "Working", years: 1, lastUsedYear: 2025, priorityScore: 2, note: DEFAULT_TEXT },
    { id: "rtl", name: "React Testing Library", category: "TestingQuality", level: "Intermediate", confidence: "Working", years: 2, lastUsedYear: 2025, priorityScore: 2, note: DEFAULT_TEXT },
    { id: "vitest", name: "Vitest", category: "TestingQuality", level: "Beginner", confidence: "Working", years: 1, lastUsedYear: 2025, priorityScore: 1, note: DEFAULT_TEXT },

    { id: "jwt", name: "JWT", category: "SecurityNetwork", level: "Advanced", confidence: "Strong", years: 3, lastUsedYear: 2026, priorityScore: 3, note: DEFAULT_TEXT },
    { id: "oauth2", name: "OAuth2", category: "SecurityNetwork", level: "Intermediate", confidence: "Working", years: 2, lastUsedYear: 2025, priorityScore: 2, note: DEFAULT_TEXT },
    { id: "networking", name: "Networking", category: "SecurityNetwork", level: "Advanced", confidence: "Strong", years: 3, lastUsedYear: 2024, priorityScore: 3, note: DEFAULT_TEXT },
    { id: "cisco-viptela", name: "Cisco Viptela", category: "SecurityNetwork", level: "Advanced", confidence: "Strong", years: 2, lastUsedYear: 2024, priorityScore: 3, note: DEFAULT_TEXT },
  ],
  quickStats: {
    totalProjects: 25,
    totalExperiences: 3,
    totalFormations: 3,
    totalCertifications: DEFAULT_NUMBER,
  },
};

export const TOTAL_CORE_PROJECTS = PORTFOLIO_DATA.projects.length;
export const TOTAL_EXPERIENCE_PROJECTS = PORTFOLIO_DATA.experiences.reduce(
  (acc, exp) => acc + exp.projects.length,
  0
);
export const TOTAL_PROJECTS_WITH_EXPERIENCE = TOTAL_CORE_PROJECTS + TOTAL_EXPERIENCE_PROJECTS;
