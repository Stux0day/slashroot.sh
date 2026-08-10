// Contenu éditorial séparé de la présentation.
// C'est ici que tu modifies le site au quotidien, sans toucher au balisage.

export interface LigneConf {
  cle: string;
  valeur: string;
  lien?: string;
}

export interface Travail {
  titre: string;
  resume: string;
  tags: string[];
}

/** Dossiers de la barre supérieure.
 *  `id` = nom du répertoire dans src/content/blog/ (sans accent ni majuscule,
 *  il finit dans l'URL). `libelle` = ce qui s'affiche.
 *  L'ordre de cette liste est celui de la barre. Un dossier créé sur le disque
 *  mais absent d'ici reste publié et s'ajoute à la fin. */
export const dossiers: { id: string; libelle: string }[] = [
  { id: 'os', libelle: '_OS' },
  { id: 'systeme', libelle: '_SYSTÈMES' },
  { id: 'reseaux', libelle: '_RÉSEAUX' },
  { id: 'devs', libelle: '_DÉVS' },
  { id: 'divers', libelle: '_DIVERS' },
];

/** Bannière de la page d'accueil, en police pixel.
 *  `titre` est encadré d'accolades et de guillemets par la mise en page :
 *  n'écrire ici que le texte. */
export const banniere = {
  intro: " hi, i'm flynnhub, a ...",
  titre: '_system engineer',
};

export const identite = {
  nom: 'Théophile',
  service: 'flynnhub.system',
  role: 'Ingénieur système',
  depuis: '2019',
  ville: 'Lille, France',
  statut: 'Ouvert aux opportunités',
  email: 'contact@ton-domaine.fr',
  github: 'https://github.com/Stux0day',
  // Conservée sous forme percent-encodée : le fragment de profil contient un
  // accent et un emoji, que LinkedIn encode déjà dans l'URL qu'il distribue.
  // La décoder ici ferait un lien qui fonctionne dans un navigateur mais pas
  // dans tous les clients qui liront le HTML.
  linkedin: 'https://www.linkedin.com/in/th%C3%A9ophile-garin-%F0%9F%90%A7-58564a138/',
} as const;

export const stack: LigneConf[] = [
  { cle: 'systèmes', valeur: 'RHEL 9, Debian, systemd, WSL' },
  { cle: 'cloud / iac', valeur: 'GCP, Terraform, modules & workspaces' },
  { cle: 'secrets', valeur: 'OpenBao, HashiCorp Vault, PKI' },
  { cle: 'observabilité', valeur: 'Zabbix, Telegraf, InfluxDB' },
  { cle: 'automatisation', valeur: 'Bash, PowerShell, Go, Python' },
  { cle: 'réseau', valeur: 'HAProxy, TLS, reverse proxy, VPN' },
];

/** Liens affichés dans le pied de page. `cle` sert aussi de clé de logo côté
 *  Footer.astro : n'y mettre que 'github' ou 'linkedin' tant qu'aucune autre
 *  icône n'y est déclarée. `identite.email` reste défini plus haut mais n'est
 *  plus affiché nulle part — il est là si tu veux le remettre un jour. */
export const contact: LigneConf[] = [
  { cle: 'github', valeur: identite.github, lien: identite.github },
  { cle: 'linkedin', valeur: identite.linkedin, lien: identite.linkedin },
];

export const travaux: Travail[] = [
  {
    titre: 'Gestion de secrets en haute disponibilité',
    resume:
      "Conception d'une architecture OpenBao multi-tiers : front HAProxy, cluster Raft à trois nœuds, cluster Transit dédié pour l'auto-unseal, tier de journalisation séparé. Déploiement sur RHEL 9.",
    tags: ['OpenBao', 'HAProxy', 'Raft', 'RHEL 9'],
  },
  {
    titre: "Industrialisation d'une infrastructure GCP",
    resume:
      "Reprise d'un socle Terraform multi-environnements : résolution de dérives d'état, migration de version de provider, harmonisation des contraintes de modules entre workspaces.",
    tags: ['Terraform', 'GCP', 'CI/CD'],
  },
  {
    titre: 'Chaîne de supervision applicative',
    resume:
      "Instrumentation d'un parc d'instances Tomcat en pré-production : collecte JMX via Telegraf, métriques JVM et pools de connexions, stratégies de suppression d'alertes côté Zabbix.",
    tags: ['Zabbix', 'Telegraf', 'JMX', 'Tomcat'],
  },
];

export interface Certif {
  /** Intitulé exact tel qu'il figure sur l'attestation. */
  intitule: string;
  /** Organisme qui la délivre : Red Hat, HashiCorp, LPI… */
  organisme: string;
  /** Année d'obtention. Chaîne et non nombre : certaines sont datées
   *  « 2024 – 2027 » quand elles expirent. */
  annee: string;
  /** Lien de vérification, si l'organisme en fournit un. Facultatif. */
  lien?: string;
}

/** Certifications affichées sur la page d'accueil, dans l'ordre de cette
 *  liste. Tant qu'elle est vide, la section n'apparaît pas et le lien
 *  « certifs » quitte la barre du haut : mieux vaut pas de bloc qu'un bloc
 *  vide.
 *
 *  ┌──────────────────────────────────────────────────────────────────┐
 *  │ Les trois entrées ci-dessous sont des GABARITS, pas des données.  │
 *  │ Elles sont là pour que la section soit visible pendant que tu     │
 *  │ construis le site. Remplace-les par tes vraies certifications, ou │
 *  │ supprime celles qui restent avant de publier : afficher un titre  │
 *  │ que l'on ne détient pas se retourne vite contre son auteur.       │
 *  └──────────────────────────────────────────────────────────────────┘
 *
 *  `lien` est facultatif — avec, l'intitulé devient cliquable ; sans, il
 *  s'affiche en texte simple.
 */
export const certifs: Certif[] = [
  { intitule: 'Operations & Supply Chain, Retail & Customer Experience', organisme: 'LVMH', annee: '2026' },
  { intitule: 'Professionnel Cloud Architect', organisme: 'GCP', annee: '2025' },
  { intitule: 'Associate Cloud Engineer', organisme: 'GCP', annee: '2025' },
  { intitule: 'Solution Architect Professionnel', organisme: 'AWS', annee: '2024' },
  { intitule: 'Solution Architect Associate', organisme: 'AWS', annee: '2023' },
  { intitule: 'Certified Cloud Practitioner', organisme: 'AWS', annee: '2023' },
  { intitule: 'ITIL® Foundation v4', organisme: 'PeopleCert', annee: '2023' },
];
