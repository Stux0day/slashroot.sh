---
title: 'Debian installation facile'
description: "Installer Debian sans y passer la journée."
pubDate: 'Jul 29 2026'
updatedDate: 'Aug 12 2026'
---

Texte de remplissage, destiné à juger la mise en page sur un article de
longueur réaliste. Il n'a pas vocation à être publié.

Une installation Debian propre tient en trois décisions : le partitionnement,
le jeu de paquets initial, et ce qu'on fait juste après le premier
redémarrage. Le reste découle. La plupart des installations qui vieillissent
mal ont été bâclées sur l'un de ces trois points.

## Préparer le support

L'image netinst suffit dans la quasi-totalité des cas : elle pèse moins de
400 Mo et récupère le reste depuis les dépôts, ce qui garantit des paquets à
jour dès la fin de l'installation.

```bash
# Vérifier l'empreinte avant d'écrire quoi que ce soit
sha256sum -c SHA256SUMS --ignore-missing

# Écriture sur la clé — vérifier deux fois le nom du périphérique
sudo dd if=debian-13.0.0-amd64-netinst.iso of=/dev/sdX bs=4M status=progress
sudo sync
```

La vérification d'empreinte n'est pas une formalité. Une image tronquée
produit une erreur au milieu de l'installation, souvent après le
partitionnement, c'est-à-dire au pire moment.

> Ne jamais présumer du nom du périphérique. `lsblk` avant, `lsblk` après :
> la différence, c'est votre clé.

## Partitionner

Le partitionnement guidé convient à un poste de travail. Sur un serveur, il
faut séparer ce qui grossit de ce qui ne doit jamais saturer.

| Point de montage | Taille | Raison |
|---|---|---|
| `/` | 20 Go | Système, suffisant sans conteneurs |
| `/var` | 30 Go | Journaux et paquets ; grossit seul |
| `/home` | reste | Données, sauvegardées séparément |
| `swap` | 2 Go | Hibernation exclue |

Isoler `/var` évite le scénario classique : un journal qui s'emballe, une
partition racine pleine, et un système qui ne redémarre plus. Le coût est
d'une ligne dans le partitionneur.

### Chiffrement

LUKS sur `/home` et `swap` est un compromis raisonnable : le système reste
lisible pour le dépannage, les données ne le sont pas. Chiffrer la racine
impose une saisie de phrase à chaque démarrage, ce qui exclut le redémarrage
à distance sans console.

## Après le premier démarrage

Trois commandes avant tout le reste :

1. Retirer le CD-ROM des sources dans `/etc/apt/sources.list`, sinon `apt`
   réclamera le support à chaque opération.
2. Installer `unattended-upgrades` et le configurer pour les mises à jour de
   sécurité seulement.
3. Vérifier que `systemd-timesyncd` est actif — une horloge décalée casse
   TLS avant tout le reste.

```bash
sudo apt update && sudo apt full-upgrade
sudo apt install --no-install-recommends unattended-upgrades
sudo systemctl enable --now systemd-timesyncd
timedatectl status
```

L'option `--no-install-recommends` mérite d'être prise comme réflexe sur un
serveur : elle évite de traîner des dizaines de paquets recommandés dont
aucun n'est nécessaire au service visé.

## Ce qui reste

Le durcissement — SSH par clé uniquement, pare-feu, journalisation
centralisée — ne relève plus de l'installation mais de la configuration, et
mérite son propre article. Une machine correctement installée est simplement
celle sur laquelle ce travail sera rapide.
