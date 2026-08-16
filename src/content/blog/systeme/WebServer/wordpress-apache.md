---
title: 'WordPress (Apache & Debian)'
description: 'Installer WordPress sur Debian avec Apache et Mariadb, puis mettre en place HTTPS.'
pubDate: 'Jan 28 2025'
---

WordPress, éminent dans le panorama des CMS (Systèmes de Gestion de Contenu), se distingue par sa robustesse et sa flexibilité, en particulier pour les professionnels de l'informatique qui souhaitent édifier des sites web sophistiqués. Reposant sur une architecture modulaire et open source, WordPress permet une personnalisation poussée grâce à son écosystème de thèmes et de plugins. Son architecture PHP et MySQL, associée à une interface conviviale, facilite le développement et la gestion de sites web complexes, tout en offrant une scalabilité appréciable. En outre, sa communauté active et ses normes de sécurité rigoureuses en font un choix de prédilection pour ceux qui exigent un équilibre entre puissance, fiabilité et facilité de maintenance dans le domaine de l'informatique.

## Installation wordpress

L'installation va se faire une debian 12. Nous allons utiliser apache2 en tant que service WEB et Mariadb en tant que SGBD ( Système de Gestion de base de donnée ). Dans notre tutoriel nous allons utiliser la version 8 de PHP et installer tous les modules PHP nécessaires au bon fonctionnement de notre site WordPress. On commence par installer les paquets nécessaires.

```
apt-get install apache2 libapache2-mod-php8.4 mariadb-server unzip php8.4 php8.4-bz2 php8.4-cgi php8.4-cli php8.4-common php8.4-mysql php8.4-curl
```

Pour le bon fonctionnement de notre wordpress, nous pouvons installer quelques librairies PHP supplémentaires qui vont être nécessaires pour quelques actions.

- php8.4-opcache
- php8.4-phpdbg
- php8.4-pspell
- php8.4-readline
- php8.4-snmp
- php8.4-soap
- php8.4-sybase
- php8.4-tidy
- php8.4-xml
- php8.4-zip
- php8.4-curl
- php8.4-gd
- php8.4-gmagick
- php8.4-igbinary
- php8.4-intl
- php8.4-mbstring

A partir de ce moment-la, il est maitenant possible d'accéder à notre site internet qui possède une page internet par défault. Si vous avez un navigateur sur votre serveur, vous pouvez rentrer l'adresse « http://localhost ». Il est possible de pouvoir y accéder à partir du moment que vous êtes sur le même réseau et si il n'y a aucun élèment réseau qui bloque la connexion. Sur google chrome ou firefox, vous pouvez y accéder grâce à l'adresse IP de votre serveur en faisant « http://192.168.1.10 » par exemple. Vous pourrez trouver l'adresse de votre serveur à l'aide de la commande « ip a ».

Deux nouveaux services sont maintenant installés sur notre serveur, apache2 et mariadb. Nous allons maintenant « enabled » nos services afins qu'ils soient persistant au redémarrage. Cela va permettre à nos services de démarrer seul lorsque notre serveur va démarrer.

```
systemctl enable apache2.service
```

```
systemctl enable mariadb.service
```

On passe maintenant à la création et la configuration de la base de donnée. On rentre dans l'interpréteur MariaDB qui va nous permettre d'exécuter des commandes SQL ou des opérations d'administration, telles que la création de bases de données, la modification des autorisations d'utilisateur, ou l'exécution de requêtes sur les bases de données existantes.

```
mysql -u root -p
```

On créé une nouvelle base de données nommée « wordpress_database » dans le système de gestion de bases de données MySQL. Cette base de données est utilisée pour stocker des données structurées selon les besoins de l'application, dans le cas de WordPress, pour stocker les articles, les commentaires, les réglages, etc.

```sql
CREATE DATABASE wordpress_database;
```

On créé maintenant un utilisateur « wordpress_user_database » qui va être utilisé pour faire les actions sur la base de donnée. On précise que l'utilisateur peut se connecter que sur la base de donnée qui se trouve sur cette machine. On précise le mot de passe de l'utilisateur de la base de donnée « password ».

```sql
CREATE USER 'wordpress_user_database'@'localhost' IDENTIFIED BY 'password';
```

```sql
GRANT ALL PRIVILEGES ON wordpress_database.* TO 'wordpress_user_database'@'localhost' IDENTIFIED BY 'password';
```

```sql
FLUSH PRIVILEGES;
```

```sql
EXIT;
```

On vient ce déplacer dans le répertoire temporaire de la machine « /tmp » puis on y télécharge la dernière version de l'archive contenant WordPress.

```
cd /tmp

wget https://wordpress.org/latest.zip
```

On décompresse l'archive que l'on vient de télécharger à l'aide de la commande unzip dans le répertoire /var/www.

```
unzip latest.zip -d /var/www/
```

On modifie les droits du répertoire wordpress et de ses sous-répertoire graçe à l'argument -R, que l'on vient de décompresser afin qu'il appartienne à l'utilisateur www-data et au groupe www-data. L'utilisateur et le groupe www-data sont utilisés par le serveur web apache2 pour pouvoir accéder aux fichiers et s'assurer qu'il a les autorisations nécessaires pour lire et écrire dans ce répertoire.

```
chown -R www-data:www-data /var/www/wordpress
```

Afin de réaliser une installation plus propre, nous supprimons le répertoire par défaut /var/www/html qui ne nous est pas utile.

```
rm -rf /var/www/html/
```

Lors de l'installation d'apache, un fichier de configuration pour le site par défault est créé qui se nomme « 000-default.conf » on va le renommer afin que son nom colle un peu plus à notre application. Nous allons le renommer « wordpress.conf ».

```
mv /etc/apache2/sites-available/000-default.conf /etc/apache2/sites-available/wordpress.conf
```

Suite au renommage de notre fichier de configuration, on désactive le site par défault « 000-default.conf » qui n'existe maintenant plus.

```
a2dissite 000-default.conf
```

Suite au renommage de notre fichier de configuration, on active le site que l'on vient de remplacer afin qu'il soit prit en compte pour remplacer « 000-default.conf » qui s'appelle dans ce tutoriel « wordpress.conf ».

```
a2ensite wordpress.conf
```

L'activation de notre site internet « wordpress.conf » nécessite le rechargement de notre serveur WEB. On redémarre donc notre serveur WEB.

```
systemctl reload apache2
```

On modifie notre fichier de configuration spécifique à notre site internet pour lui indiquer le nouveau chemin à prendre en compte. Sur cette modification, on supprime tous les commentaires afin d'y voir plus clair et on modifie la valeur « DocumentRoot » sur « /var/www/wordpress ». Ce nouveau chemin représente le dossier WordPress que l'on vient de télécharger et placer à cet endroit.

```apache
# /etc/apache2/sites-available/wordpress.conf
<VirtualHost *:80>
        ServerAdmin webmaster@localhost
        DocumentRoot /var/www/wordpress
        ErrorLog ${APACHE_LOG_DIR}/error.log
        CustomLog ${APACHE_LOG_DIR}/access.log combined
</VirtualHost>
```

Et pour finir cette installation, on vient redémarrer notre serveur WEB.

```
systemctl restart apache2
```

### Mise en place de HTTPS avec certificat auto-signé

Les certificats auto-signés sont des outils de sécurité utilisés pour chiffrer les données échangées sur internet et vérifier l'identité des parties impliquées dans une communication. Contrairement aux certificats émis par des autorités de certification reconnues, les certificats auto-signés sont créés et signés par l'entité elle-même, sans validation externe. Bien qu'ils offrent un niveau de cryptage, leur principal inconvénient réside dans le manque de validation externe, ce qui signifie que leur fiabilité dépend entièrement de la confiance accordée à l'entité qui les génère

Dans un premier temps, on active le module d'apache2 qui va nous permettre de supporter la cryptographie SSL ( Secure Socket Layer ). Puis à la suite de l'activation du module, on redémarre le serveur WEB permettant de prendre en compte le module.

```
a2enmod ssl

systemctl restart apache2
```

On génère le certificat self-signed qui va permettre de chiffrer les communications entre notre client web et le serveur. Une série de question va nous êtres posés. Il faut remplir les informations avec exactitudes, en particulier sur la ligne numéro 6 qui demande le FQDN. Il faut mettre le lien complet final pour accéder à votre site internet.

```
openssl req -x509 -nodes -days 365 -newkey rsa:2048 -keyout /etc/ssl/private/overcomputing.net.key -out /etc/ssl/certs/overcomputing.net.crt
```

```
Country Name (2 letter code) [AU]:FR
State or Province Name (full name) [Some-State]:France
Locality Name (eg, city) []:Lille
Organization Name (eg, company) [Internet Widgits Pty Ltd]:Over Computing
Organizational Unit Name (eg, section) []:DSI
Common Name (e.g. server FQDN or YOUR name) []:overcomputing.net
Email Address []:flynn@overcomputing.net
```

Un virtualhost par défault est présent pour le SSL, nous allons le renommer afin de coller au nom de notre application.

```
mv /etc/apache2/sites-available/default-ssl.conf /etc/apache2/sites-available/wordpress-SSL.conf
```

On active ce nouveau site.

```
a2ensite wordpress-SSL.conf
```

Maintenant il est temps de modifier le fichier de configuration de notre site internet, celui que nous venons de renommer afin de pouvoir lui indiquer les chemins des certificats. On viendra nettoyer tous les commentaires et indiquer le chemin de nos certificats sur les lignes 8 et 9 sur le code ci-dessous. On va également corriger la ligne « DocumentRoot » pour lui indiquer notre wordpress.

```apache
# /etc/apache2/sites-available/wordpress-SSL.conf
<VirtualHost *:443>
        ServerAdmin webmaster@localhost
        DocumentRoot /var/www/wordpress
        ErrorLog ${APACHE_LOG_DIR}/error.log
        CustomLog ${APACHE_LOG_DIR}/access.log combined
        SSLEngine on
        SSLCertificateFile      /etc/ssl/certs/overcomputing.net.crt
        SSLCertificateKeyFile   /etc/ssl/private/overcomputing.net.key
        <FilesMatch "\.(?:cgi|shtml|phtml|php)$">
                SSLOptions +StdEnvVars
        </FilesMatch>
        <Directory /usr/lib/cgi-bin>
                SSLOptions +StdEnvVars
        </Directory>
</VirtualHost>
```

On vient redémarrer notre serveur afin de prendre en compte les modifications.

```
systemctl restart apache2
```

Nous pouvons maintenant nous rendre sur notre site internet en HTTPS. Un avertissement va apparaitre pour nous indiquer que le certificat est auto-signé et qu'il n'y a aucune autorité de confiance pour ce certificat, mais nous pouvons cliquer sur « Paramètres avancés » puis sur « Continuer vers le site ». Ce qui nous intéresse pour de l'interne c'est seulement le chiffrement, l'autorité de confiance nous importe peu dans notre cas.

### Mise en place d'HTTPS avec certbot

Certbot est un outil open-source qui simplifie l'obtention et le renouvellement des certificats SSL/TLS, garantissant la sécurité des sites web. En automatisant le processus, il facilite la configuration des certificats et assure des communications sécurisées entre les utilisateurs et les serveurs. Son interface conviviale et sa compatibilité avec diverses plates-formes en font un choix populaire parmi les administrateurs système et les développeurs.

```
apt install certbot python3-certbot-apache
```

On lance la configuration de certbot pour apache. Une série de question va apparaitre à l'écran.

```
certbot --apache
```

### Redirection HTTP vers HTTPS

La mise en place d'une redirection de HTTP vers HTTPS revêt une importance capitale dans la sécurisation des communications sur un site web. En redirigeant automatiquement les utilisateurs vers une connexion chiffrée via HTTPS, cette pratique renforce la confidentialité et l'intégrité des données échangées entre le navigateur de l'utilisateur et le serveur web. HTTPS garantit également l'authenticité du site web, ce qui aide à prévenir les attaques de type « Man-in-the-Middle » et renforce la confiance des visiteurs. De plus, la majorité des navigateurs modernes signalent les sites non sécurisés, ce qui peut dissuader les utilisateurs. Ainsi, en instaurant une redirection de HTTP vers HTTPS, les sites web renforcent leur sécurité tout en préservant la confiance de leurs visiteurs.

Dans un premier temps, on active le module d'apache permettant de réécrire les URLs. Puis comme pour tous les modules d'apache, on redémarre le serveur WEB.

```
a2enmod rewrite

systemctl restart apache2
```

On modifie notre fichier de configuration de notre site internet HTTP.

```apache
# /etc/apache2/sites-available/wordpress.conf
<VirtualHost *:80>
        ServerAdmin webmaster@localhost
        DocumentRoot /var/www/wordpress
        ErrorLog ${APACHE_LOG_DIR}/error.log
        CustomLog ${APACHE_LOG_DIR}/access.log combined
        RewriteEngine On
        RewriteCond %{HTTPS} !on
        RewriteRule (.*) https://%{HTTP_HOST}%{REQUEST_URI} [R=301,L]
</VirtualHost>
```
