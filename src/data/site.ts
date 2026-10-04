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

/** Une ligne de la section « stack » : un domaine, et les outils qu'on y
 *  emploie. Chaque outil est une entrée du tableau et non un fragment d'une
 *  chaîne séparée par des virgules — c'est ce qui permet à la page d'en
 *  dessiner une pastille par outil sans avoir à redécouper du texte, et ce qui
 *  évite qu'un nom contenant lui-même une virgule ne se scinde en deux. */
export interface LigneStack {
  domaine: string;
  outils: string[];
}

/** Cinq domaines, nommés dans le vocabulaire du métier — celui qu'un lecteur
 *  cherche et qu'un moteur indexe. On a essayé des verbes, des métaphores et
 *  des chemins Unix ; ils disaient plus, mais aucun ne se serait retrouvé dans
 *  une offre d'emploi.
 *
 *  DEUX RÈGLES pour les entrées :
 *
 *  1. Pas de numéro de version. « RHEL 9 » devient « RHEL » : une version
 *     périme la page toute seule, et personne ne recrute sur un chiffre.
 *     La version se dit en entretien, ou dans un article du blog.
 *
 *  2. Une entrée = quelque chose sur quoi on peut être interrogé. Cela
 *     exclut les sous-fonctions d'un produit — « modules & workspaces » ne
 *     veut rien dire sans Terraform juste à côté. Cela garde en revanche les
 *     compétences qui ne portent pas de nom de produit : PKI, TLS, CI/CD
 *     sont des sujets d'entretien à part entière.
 *
 *  L'ORDRE de cette liste est l'ordre d'affichage, de haut en bas. Il ne suit
 *  aucune logique technique : il va du domaine le plus large au plus étroit,
 *  donc du plus susceptible d'intéresser un lecteur au moins. Les réseaux
 *  ferment la marche, avec leurs deux entrées.
 *
 *  LE DÉSÉQUILIBRE EST CONNU : le premier domaine porte quatorze entrées sur
 *  vingt-cinq, les trois autres se partagent le reste. C'est le prix de la
 *  fusion infrastructure/exploitation, et c'est un vrai prix — une catégorie
 *  qui contient plus de la moitié du tout ne trie plus grand-chose. Si la
 *  première ligne finit par peser trop lourd à l'œil, c'est elle qu'il faut
 *  rouvrir en deux, pas les autres qu'il faut gonfler.
 *
 *  LISTE PRÉCÉDENTE, si tu veux redonner à l'exploitation sa propre ligne :
 *    { domaine: 'infrastructure', outils: ['Linux', 'RHEL', 'Debian', 'systemd', 'HAProxy', 'TLS', 'AWS', 'GCP', 'OVH'] },
 *    { domaine: 'réseaux & interconnexion', outils: ['Cisco', 'VPN'] },
 *    { domaine: 'sécurité & secrets', outils: ['OpenBao', 'Vault', 'PKI'] },
 *    { domaine: 'développement & automatisation', outils: ['Bash', 'Python', 'Go', 'Terraform', 'Git', 'CI/CD'] },
 *    { domaine: 'exploitation', outils: ['Zabbix', 'Telegraf', 'InfluxDB', 'JMX', 'ITIL'] },
 */
export const stack: LigneStack[] = [
  // « infrastructure » couvre à la fois les machines et le cloud : c'est le
  // seul mot qui dispense de trancher entre un serveur qu'on installe et une
  // instance qu'on provisionne, distinction qui n'intéresse plus grand monde.
  // « exploitation » lui est adjoint parce que tenir un parc et le surveiller
  // sont le même métier — Zabbix et Telegraf s'installent et se maintiennent
  // comme le reste, et ITIL décrit la façon de s'en servir.
  // HAProxy et TLS sont ici plutôt qu'avec les réseaux — un démon qu'on
  // installe et supervise, des certificats qu'on émet et qu'on renouvelle :
  // du travail de système. Le blog dit déjà la même chose, son article sur
  // les certificats étant rangé dans le dossier « systeme ».
  {
    domaine: 'infrastructure & exploitation',
    outils: [
      'Linux',
      'RHEL',
      'Debian',
      'systemd',
      'HAProxy',
      'TLS',
      'AWS',
      'GCP',
      'OVH',
      'Zabbix',
      'Telegraf',
      'InfluxDB',
      'JMX',
      'ITIL',
    ],
  },
  // Un seul domaine et non deux : séparer « développement » d'« automatisation »
  // obligerait à trancher où va Bash, qui est les deux à la fois.
  {
    domaine: 'développement & automatisation',
    outils: ['Bash', 'Python', 'Go', 'Terraform', 'Git', 'CI/CD'],
  },
  // « secrets » n'est pas un synonyme de sécurité, c'est ce que ces trois
  // outils font précisément : un coffre, son fork, et l'autorité qui signe.
  // C'est aussi le mot que tu emploies déjà dans tes travaux, dont le premier
  // s'intitule « Gestion de secrets en haute disponibilité » — un lecteur qui
  // descend la page retrouve le même terme deux fois.
  { domaine: 'sécurité & secrets', outils: ['OpenBao', 'Vault', 'PKI'] },
  // « interconnexion » couvre les deux entrées d'un seul mot : ce que Cisco
  // relie à l'intérieur d'un site, ce qu'un VPN relie entre plusieurs. Le
  // domaine reste à deux outils, et c'est assumé — il dit une compétence que
  // les autres ne recouvrent pas, la fondre ailleurs la ferait disparaître.
  { domaine: 'réseaux & interconnexion', outils: ['Cisco', 'OpenVPN', 'STP', 'vLAN', 'RIP'] },
];/** Liens affichés dans le pied de page. `cle` sert aussi de clé de logo côté
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
