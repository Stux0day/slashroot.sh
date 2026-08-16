---
title: 'Apache'
description: "Installation d'Apache et masquage des informations du serveur."
pubDate: 'Aug 14 2026'
---

Installation des packages nécessaires pour le lancement d'apache.

```
apt-get install apache2
```

Changement du serveur Token afin de cacher les informations d'apache et du serveur.

```
# /etc/apache2/conf-enabled/security.conf
ServerTokens Prod
```
