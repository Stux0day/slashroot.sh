---
title: 'Windows: IIS & WordPress'
description: "Installer un rôle IIS sur Windows Server 2022 et y héberger un WordPress."
pubDate: 'Aug 14 2026'
---

Nous allons procéder à l'installation pas à pas d'un Windows Server 2022 pour y installer un rôle IIS, qui hébergera un WordPress. Dans un premier temps, dans la fenêtre « Gestionnaire de serveur » qui s'ouvre automatiquement, ou vous pouvez l'ouvrir à nouveau si vous l'avez fermé, on appuie sur gérer en haut à droite puis « Ajouter des rôles et des fonctionnalités ». Une nouvelle fenêtre vient de s'ouvrir comme ci-dessous, on clique sur suivant.

![Ajouter des rôles et des fonctionnalités](./images/windows-iis-wordpress-01.png)

On vient sélectionner le serveur concerné, dans notre cas nous n'en avons qu'un seul, on appuie sur Suivant.

![Sélection du serveur](./images/windows-iis-wordpress-02.png)

On vient sélectionner « Serveur Web (IIS) », une nouvelle fenêtre s'ouvre et on clique sur « Ajouter des fonctionnalités ».

![Sélection du rôle Serveur Web (IIS)](./images/windows-iis-wordpress-03.png)

Sur cet onglet, nous pouvons sélectionner « Suivant ».

![Fonctionnalités](./images/windows-iis-wordpress-04.png)

Sur cet onglet, nous pouvons sélectionner « Suivant ».

![Rôle Serveur Web (IIS)](./images/windows-iis-wordpress-05.png)

Sur cette fenêtre, on déroule l'onglet « Développement d'applications » puis on vient cocher CGI. On appuie sur « Suivant » puis on procède à l'installation.

![Sélection de CGI dans Développement d'applications](./images/windows-iis-wordpress-06.png)

## Mysql

Ensuite, nous allons avoir besoin de Mysql qui est un SGBD. Il va nous fournir notre base de données pour stocker des choses comme les utilisateurs ou les pages par exemple. On vient télécharger la version communautaire sur ce lien :

https://dev.mysql.com/downloads/installer

On lance l'installateur et on clique sur l'installation full, puis suivant :

![Installation complète de MySQL](./images/windows-iis-wordpress-07.png)

On appuie sur Execute

![Execute](./images/windows-iis-wordpress-08.png)

Une fois que tout est au vert, on appuie sur Next.

![Tout est au vert](./images/windows-iis-wordpress-09.png)

On appuie sur Suivant.

![Suivant](./images/windows-iis-wordpress-10.png)

On appuie sur Suivant.

![Suivant](./images/windows-iis-wordpress-11.png)

On appuie sur Suivant.

![Suivant](./images/windows-iis-wordpress-12.png)

On vient renseigner le mot de passe du compte Root pour mysql.

![Mot de passe root MySQL](./images/windows-iis-wordpress-13.png)

On appuie sur Suivant.

![Suivant](./images/windows-iis-wordpress-14.png)

On appuie sur Suivant.

![Suivant](./images/windows-iis-wordpress-15.png)

On appuie sur Execute.

![Execute](./images/windows-iis-wordpress-16.png)

On appuie sur Finish.

![Finish](./images/windows-iis-wordpress-17.png)

On appuie sur Suivant.

![Suivant](./images/windows-iis-wordpress-18.png)

On appuie sur Suivant.

![Suivant](./images/windows-iis-wordpress-19.png)

On appuie sur Suivant.

![Suivant](./images/windows-iis-wordpress-20.png)

On renseigne le mot de passe Root du compte précédemment créé.

![Mot de passe root du compte](./images/windows-iis-wordpress-21.png)

On appuie sur Execute.

![Execute](./images/windows-iis-wordpress-22.png)

Une fois l'installation terminée, on ouvre un interpréteur mysql.

![Interpréteur MySQL](./images/windows-iis-wordpress-23.png)

Et on vient mettre ces commandes :

Création de la base de données

```sql
create database wordpress;
```

On sélectionne la base de données que l'on vient de créer

```sql
use wordpress
```

On créé un utilisateur avec un mot de passe associé qui va venir travailler sur cette base de données

```sql
create user 'user'@'%' identified by 'root';
```

On lui attribue les droits sur la base de données

```sql
grant all privileges on wordpress.* TO 'user'@'%';
```

Et on recharge les droits

```sql
flush privileges;
```

## PHP

Afin de pouvoir lire les fichiers php de WordPress, nous devons installer PHP, pour cela on télécharge sur le lien ci-dessous et on le place à la racine de C.

https://www.php.net/downloads.php

![Téléchargement de PHP](./images/windows-iis-wordpress-24.png)

On vient modifier notre fichier php.ini pour ajouter

```
extension_dir = "C:\php-8.4.4\ext"
```

![Modification de php.ini](./images/windows-iis-wordpress-25.png)

![Configuration PHP](./images/windows-iis-wordpress-26.png)

## WordPress

https://fr.wordpress.org/download/

![Téléchargement de WordPress](./images/windows-iis-wordpress-27.png)

![Installation WordPress](./images/windows-iis-wordpress-28.png)

![Installation WordPress](./images/windows-iis-wordpress-29.png)

![Installation WordPress](./images/windows-iis-wordpress-30.png)

![Installation WordPress](./images/windows-iis-wordpress-31.png)

![Installation WordPress](./images/windows-iis-wordpress-32.png)

![Installation WordPress](./images/windows-iis-wordpress-33.png)
