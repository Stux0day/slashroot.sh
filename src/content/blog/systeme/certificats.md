---
title: 'Certificats'
description: 'Générer un certificat auto-signé rapidement à des fins de test.'
pubDate: 'Aug 14 2026'
---

Il existe une commande permettant de générer automatiquement des certificats à des fins de test. Cette simple commande va permettre de générer de certificat « bidons » et rapidement. Cela va créer un certificat dans /etc/ssl/certs/ssl-cert-snakeoil.pem et la clef associé dans /etc/ssl/private/ssl-cert-snakeoil.key

```
make-ssl-cert generate-default-snakeoil
```
