// Génération du flux de journal SSH corrompu affiché par Bruit.astro.
//
// Ce module tourne des deux côtés : au build pour écrire le HTML initial, et
// dans le navigateur pour retirer un flux différent à chaque visite. Il ne doit
// donc employer aucune API propre à Node — d'où `TextEncoder` et `btoa` plutôt
// que `Buffer`, disponibles partout.

export type Niveau = 'normal' | 'alerte' | 'nasty';
export type Ligne = { texte: string; niveau: Niveau };

/** mulberry32 : générateur pseudo-aléatoire à graine. Une graine fixe donne
 *  toujours la même suite, ce qui rend le rendu du build reproductible ; une
 *  graine tirée au hasard donne un flux différent à chaque visite. */
export const creerAlea = (graine: number) => {
  let a = graine >>> 0;
  return () => {
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
};

/** Octets UTF-8 d'une chaîne, relus un à un comme des caractères latin-1.
 *  Sert à la fois au base64 et au mojibake. */
const octets = (s: string) => String.fromCharCode(...new TextEncoder().encode(s));

const base64 = (s: string) => btoa(octets(s));

/** UTF-8 relu comme du latin-1 : « é » devient « Ã© ». Le grand classique du
 *  fichier ouvert avec le mauvais jeu de caractères. */
const mojibake = octets;

const LEET_TABLE: Record<string, string> = {
  a: '4',
  e: '3',
  i: '1',
  o: '0',
  s: '5',
  t: '7',
  l: '1',
  g: '9',
};

/** « no internet » -> « N0 1N73RN37 » */
const leet = (s: string) =>
  s
    .toUpperCase()
    .split('')
    .map((c) => LEET_TABLE[c.toLowerCase()] ?? c)
    .join('');

const UTILISATEURS = ['root', 'admin', 'oracle', 'ubuntu', 'test', 'postgres', 'git', 'pi'];
const CLES = ['ED25519', 'RSA', 'ECDSA'];
const B64_ALPHABET = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/';
const SYMBOLES = '#*$%^&+=~°¨:.·`|/\\<>_-';

/** La phrase vedette du flux : traitement en vidéo inverse. */
const NASTY = 'IT IS POSSIBLE THAT SOMEONE IS DOING SOMETHING NASTY!';

// Le reste de l'avertissement de changement de clé d'hôte, texte d'OpenSSH.
const ALERTE = [
  '@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@',
  '@    WARNING: REMOTE HOST IDENTIFICATION HAS CHANGED!     @',
  'Someone could be eavesdropping on you right now (man-in-the-middle attack)!',
  'It is also possible that a host key has just been changed.',
  'Host key verification failed.',
];

// Fragments de randomart : ssh-keygen -lv dessine la clé sous cette forme.
const RANDOMART = [
  '+--[ED25519 256]--+',
  '|      .o+ .      |',
  '|     . o+o. E    |',
  '|    . *o+ o      |',
  '|   o = B S .     |',
  '|  . = @ = .      |',
  '|   o.O.* o       |',
  '+-----[SHA256]----+',
];

// Phrases servant de matière première : encodées, leetifiées ou corrompues
// selon le générateur qui les prend.
const MESSAGES = [
  "l'uptime est une vanité",
  'la sauvegarde que personne ne teste',
  'no internet, no problem',
  'when you lose small mind you free your life',
  'quis custodiet ipsos custodes',
  'everything is fine',
  'un miroir n’est pas une sauvegarde',
  'il n’y a pas de nuage, juste l’ordinateur de quelqu’un d’autre',
  'have you tried turning it off and on again',
  'scanning everyone is not targeting anyone',
  '42 is the answer of the life',
  'your password is in the logs',
];

const NUAGE = 'il n’y a pas de nuage, juste l’ordinateur de quelqu’un d’autre';

/** « Chat Control » : la proposition européenne CSAR, qui prévoit le dépistage
 *  des messages privés côté client. Mélange d'avertissements système et de mots
 *  d'ordre — le registre du reste du flux. */
const CHAT_CONTROL = [
  'CSAR 2022/0155: client-side scanning REQUESTED on every private message',
  'WARNING: your end-to-end encryption is read before it is encrypted',
  'detection order issued  ->  scope: all messages, all users, no suspicion',
  'client-side scanning does not break the crypto, it breaks the promise',
  'a scanner on every phone is a scanner for every future government',
  'false positives x 1e9 messages = your holiday photos, reviewed by a stranger',
  'there is no scanning that only ever finds the guilty',
  'a backdoor with a nicer name is still a backdoor',
  'confidentiality of correspondence: DEPRECATED',
  '#StopChatControl  —  scanning everyone is not targeting anyone',
  '#StopChatControl  —  privacy is not a feature flag',
  `#StopChatControl  ${leet('e2ee or nothing')}`,
  `${base64('stop scanning my messages')}  #StopChatControl`,
];

/** Commandes tapées sous le flux, l'une après l'autre. */
export const COMMANDES = [
  'ssh-keygen -lv -f ~/.ssh/known_hosts',
  'tail -f /var/log/auth.log | grep -i nasty',
  'fail2ban-client status sshd',
  "awk '/Failed password/{print $11}' auth.log | sort | uniq -c",
  'aws ec2 describe-instances --filters Name=instance-state-name,Values=running',
  'kubectl get pods -A --field-selector status.phase!=Running',
  'ausearch -m avc -ts recent | audit2allow -w',
  'firewall-cmd --permanent --add-service=https && firewall-cmd --reload',
  'rm -rf ~/.ssh/known_hosts',
];

/** Construit une bande de `lignes` entrées à partir d'une source aléatoire. */
export const construireBande = (alea: () => number, lignes: number): Ligne[] => {
  const piocher = <T,>(t: readonly T[]): T => t[Math.floor(alea() * t.length)];
  const entre = (min: number, max: number) => min + Math.floor(alea() * (max - min + 1));

  // Plages réservées à la documentation (RFC 5737) : jamais d'adresse réelle
  // dans un décor.
  const ip = () => `${piocher(['192.0.2', '198.51.100', '203.0.113'])}.${entre(2, 254)}`;
  const port = () => entre(1024, 65535);
  const empreinte = () =>
    `SHA256:${Array.from({ length: 43 }, () => B64_ALPHABET[entre(0, 63)]).join('')}`;
  const soupe = () =>
    Array.from({ length: entre(6, 16) }, () => SYMBOLES[entre(0, SYMBOLES.length - 1)]).join('');

  const JOURNAL: (() => string)[] = [
    () =>
      `Failed password for invalid user ${piocher(UTILISATEURS)} from ${ip()} port ${port()} ssh2`,
    () => `Connection closed by authenticating user root ${ip()} port ${port()} [preauth]`,
    () => `Invalid user ${piocher(UTILISATEURS)} from ${ip()} port ${port()}`,
    () => `Received disconnect from ${ip()} port ${port()}:11: Bye Bye [preauth]`,
    () => `error: maximum authentication attempts exceeded for root from ${ip()}`,
    () =>
      `Accepted publickey for flynn from ${ip()} port ${port()} ssh2: ED25519 ${empreinte().slice(0, 24)}`,
    () => `debug1: Server host key: ssh-${piocher(CLES).toLowerCase()} ${empreinte().slice(0, 30)}`,
    () =>
      `The ${piocher(CLES)} host key for [host] has changed and you have requested strict checking.`,
    () => `Offending ${piocher(CLES)} key in /home/flynn/.ssh/known_hosts:${entre(1, 400)}`,
    () => 'Permission denied (publickey,keyboard-interactive).',
    () => empreinte(),
  ];

  // Un seul représentant par forme d'encodage : base64, binaire et leet en
  // gardent un chacun. Le dump hexadécimal seul et les codes décimaux ont été
  // retirés — illisibles, ils occupaient une ligne entière pour rien.
  const BRUIT: (() => string)[] = [
    () => base64(piocher(MESSAGES)),
    () => {
      const t = leet(piocher(['no internet', 'snail', 'root', 'no signal', 'lost packet']));
      return Array.from({ length: entre(2, 4) }, () => t).join(' ');
    },
    () => mojibake(piocher(MESSAGES)),
    () =>
      Array.from({ length: entre(3, 6) }, () =>
        Array.from({ length: 8 }, () => (alea() < 0.5 ? '0' : '1')).join(''),
      ).join(' '),
    () => piocher(['░▒▓', '▓▓█', '█▄▀', '▒░▒', '▓█▓░', '▄▄▀▀▄', '█░█░█']),
    () => piocher(['¯\\_(ツ)_/¯', 'o_O', '@_@', '>o)', '(_>', '\\o/', '(°□°)', '¬_¬']),
    () => soupe(),
    // Assemblages : c'est le mélange sur une même ligne qui fait le désordre.
    () => `${soupe()} ${leet(piocher(['no internet', 'snail']))} ${piocher(['o_O', '@_@', '>o)'])}`,
    () => `${piocher(MESSAGES)} ${soupe()}`,
    () => `${piocher(MESSAGES)}  ${piocher(['▓▓█', '░▒▓'])}  ${soupe()}`,
    // Slogans : tag répété ou leet, sans passer par un encodage illisible.
    () => {
      const slogan = piocher(['NoInternet', 'FreeSoftware', 'RightToRepair']);
      return piocher([
        `#${slogan} #${slogan} #${slogan}`,
        `#${slogan}  ${leet(slogan)}`,
        `#${slogan}  ${soupe()}`,
      ]);
    },
    // Le mot de passe qui fuit dans un journal, jamais tout à fait lisible.
    // « hunter2 » est la blague IRC de rigueur.
    () => `YOUR PASSWORD IS ${piocher(['▓▓▓▓▓▓▓', '*******', leet('hunter2')])}`,
    // La réponse, déclinée dans toutes les bases.
    () =>
      piocher([
        '42 is the answer of the life  ->  0b00101010',
        '0x2a = 052 = 42  ->  the answer of the life',
        '00101010  42  2a  *  the answer of the life',
      ]),
    () => leet('when you lose small mind you free your life'),
    // Deux entrées : deux passages par cycle.
    () => piocher(CHAT_CONTROL),
    () => piocher(CHAT_CONTROL),
  ];

  /** Mélange de Fisher-Yates. */
  const melanger = <T,>(t: T[]): T[] => {
    const c = [...t];
    for (let i = c.length - 1; i > 0; i--) {
      const j = Math.floor(alea() * (i + 1));
      [c[i], c[j]] = [c[j], c[i]];
    }
    return c;
  };

  // Un tirage uniforme laisse statistiquement plusieurs catégories absentes
  // d'une bande. On distribue donc un paquet mélangé, réapprovisionné une fois
  // épuisé : chaque registre passe avant qu'aucun ne repasse.
  const PAQUET: (() => string)[] = [
    // Le journal SSH est la colonne vertébrale : compté plusieurs fois.
    ...Array.from({ length: 8 }, () => () => piocher(JOURNAL)()),
    () => piocher(RANDOMART),
    () => piocher(RANDOMART),
    // Entrée dédiée : MESSAGES ne sert par ailleurs que de matière à encoder,
    // donc ces phrases ne se liraient jamais en clair.
    () => NUAGE,
    () => piocher(MESSAGES),
    ...BRUIT,
  ];

  let pioche: (() => string)[] = [];
  const suivant = () => {
    if (pioche.length === 0) pioche = melanger(PAQUET);
    return (pioche.pop() as () => string)();
  };

  // Une ligne sur quatre est un avertissement, et une sur deux de ces
  // avertissements est la phrase vedette : elle revient donc toutes les huit
  // lignes environ, en alternance avec le reste du bloc OpenSSH.
  let alertes = 0;
  return Array.from({ length: lignes }, (_, i) => {
    if (i % 4 !== 1) return { texte: suivant(), niveau: 'normal' as const };
    return alertes++ % 2 === 1
      ? { texte: piocher(ALERTE), niveau: 'alerte' as const }
      : { texte: NASTY, niveau: 'nasty' as const };
  });
};
