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
  intro: "hi, i'm flynnhub, a ...",
  titre: '_system engineer',
};

export const identite = {
  nom: 'Théophile [Nom]',
  service: 'Flynnhub.system',
  role: 'Administrateur systèmes & infrastructure',
  depuis: '2019',
  ville: 'Lille, France',
  statut: 'Ouvert aux opportunités',
  email: 'contact@ton-domaine.fr',
  github: 'https://github.com/[pseudo]',
  linkedin: 'https://linkedin.com/in/[pseudo]',
} as const;

export const stack: LigneConf[] = [
  { cle: 'systèmes', valeur: 'RHEL 9, Debian, systemd, WSL' },
  { cle: 'cloud / iac', valeur: 'GCP, Terraform, modules & workspaces' },
  { cle: 'secrets', valeur: 'OpenBao, HashiCorp Vault, PKI' },
  { cle: 'observabilité', valeur: 'Zabbix, Telegraf, InfluxDB' },
  { cle: 'automatisation', valeur: 'Bash, PowerShell, Go, Python' },
  { cle: 'réseau', valeur: 'HAProxy, TLS, reverse proxy, VPN' },
];

export const contact: LigneConf[] = [
  { cle: 'email', valeur: identite.email, lien: `mailto:${identite.email}` },
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