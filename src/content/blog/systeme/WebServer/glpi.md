---
title: 'GLPI'
description: "Installer GLPI sur Debian et mettre en place l'inventaire des postes."
pubDate: 'Aug 14 2026'
---

Cette installation se fait sur une Debian 13 sur une base de données Mysql

Installation des packages.

```
apt install apache2 mariadb-server php php-fpm php-{mysql,mbstring,curl,gd,xml,intl,ldap,apcu,xmlrpc,zip,bz2,bcmath} -y
```

On se connecte sur l'interpréteur Mariadb.

```
mariadb
```

Une fois dans l'interpréteur mariadb, on vient créer notre base de donnée « glpi_database ».

```sql
create database glpi_database;
```

On vient donner les droits de notre utilisateur « flynn » avec le mot de passe « root » sur la base de données « glpi_database ».

```sql
grant all privileges on glpi_database.* to flynn@localhost identified by "root";
```

On peut maintenant quitter l'interpréteur mariadb.

```sql
quit;
```

On vient télécharger l'archive de la dernière version de GLPI, qui est la 11.0.5 à l'heure ou j'écris ce tutoriel ! Vous pouvez retrouver la dernière version ici :

https://github.com/glpi-project/glpi/releases

```
wget https://github.com/glpi-project/glpi/releases/download/11.0.5/glpi-11.0.5.tgz
```

On décompresse l'archive que l'on vient de télécharger à l'instant en mettant les dossiers et fichiers dans /var/www/html.

```
tar -zxvf glpi-11.0.5.tgz -C /var/www/html/
```

On change les permissions sur les fichiers et les dossiers afin de permettre au serveur WEB de pouvoir les lires.

```
chown -R www-data:www-data /var/www/html/
```

On vient créer un nouveau virtualhost pour notre GLPI en y appliquant cette configuration :

```apache
# /etc/apache2/sites-available/glpi.conf
<VirtualHost *:80>
    ServerName GLPI
    ServerAlias 172.16.48.134
    DocumentRoot /var/www/html

    Alias /glpi /var/www/html/glpi/public

    <Directory /var/www/html/glpi/public>
        Options -Indexes +FollowSymLinks
        Require all granted
        RewriteEngine On
        RewriteBase /glpi/
        RewriteCond %{REQUEST_FILENAME} !-f
        RewriteCond %{REQUEST_FILENAME} !-d
        RewriteRule ^ index.php [QSA,L]
    </Directory>

    <FilesMatch \.php$>
        SetHandler "proxy:unix:/run/php/php8.4-fpm.sock|fcgi://localhost"
    </FilesMatch>

    ErrorLog ${APACHE_LOG_DIR}/glpi_error.log
    CustomLog ${APACHE_LOG_DIR}/glpi_access.log combined
</VirtualHost>
```

On active certains modules apache2.

```
a2enmod proxy_fcgi setenvif rewrite php*-fpm
```

On active le site glpi.conf que l'on vient de créer grâce à notre virtualhost

```
a2ensite glpi.conf
```

Et on redémarre notre service apache2 afin de prendre en compte toutes les configurations que l'on vient de changer.

```
systemctl restart apache2
```

Votre instance GLPI est maintenant accessible via un navigateur ! http://172.16.48.134/glpi

## L'inventaire avec GLPI

Dans un premier temps, nous devons activer l'inventaire depuis l'interface GLPI. On se rend dans le menu déroulant « Administration », puis dans « Inventaire » et on clique sur « Activer l'inventaire ».

Sur nos clients, nous venons installer l'agent. On se rend dans le répertoire /tmp

```
cd /tmp
```

On télécharge le dernier agent disponible à l'heure ou j'écris ce tutoriel ! https://github.com/glpi-project/glpi-agent/releases

```
wget https://github.com/glpi-project/glpi-agent/releases/download/1.16/glpi-agent-1.16-linux-installer.pl
```

On installe l'agent en exécutant le script.

```
perl glpi-agent-1.16-linux-installer.pl
```

Et on vient lancer une première l'agent instantanément.

```
glpi-agent
```

Un prompt apparait en nous demandant d'indiquer l'url de notre serveur GLPI ! On répond à cette question, puis nous pouvons laisser vide le reste des questions.

```
Provide an url to configure GLPI server:
> http://172.16.48.134/glpi/
```
