---
title: 'Send - Alternative à WeTransfer'
description: "Send - Alternative à WeTransfer"
pubDate: 'Jul 29 2026'
updatedDate: 'Aug 13 2026'
---

Send est un fork de Send l'outil de Firefox, il permet de faciliter le transfert de fichier. Il est auto hébergeable et permet une meilleure sécurité des données.

```bash
apt install git apache2 npm nodejs
```

```bash
adduser send
```

```bash
su - send
```

```bash
git clone https://gitlab.com/timvisee/send
```

```bash
cd send
```

```bash
npm install
```

```bash
npm run build
```

```bash
npm run prod
```

Et nous pouvons maintenant y accéder depuis le navigateur sur notre réseau depuis son adresse IP et le port 1443.

![send](./images/send.png)

## Ajouter l’application sous forme de service

On peut ajouter un service afin de pouvoir lancer l’application en arrière plan et cela afin d’avoir un terminal toujours lancé avec la commande qui attend la fin du processus.

```bash
vim /etc/systemd/system/send.service
```

```bash
[Unit]
Description=Service pour send
After=network.target
[Service]
WorkingDirectory=/home/send/send
ExecStart=/usr/bin/npm run prod
User=send
Restart=always
Environment=PATH=/usr/bin:/usr/local/bin
[Install]
WantedBy=multi-user.target 
```

```bash
systemctl daemon-reload
```

```bash
systemctl start send.service
```

```bash
systemctl enable send.service
```

## Ajout d’un reverse proxy pour du HTTPS

```bash
rm /etc/apache2/sites-available/default-ssl.conf
```

```bash
mv /etc/apache2/sites-available/000-default.conf /etc/apache2/sites-available/send.conf
```

```bash
vim /etc/apache2/sites-available/send.conf
```

```bash
<VirtualHost *:443>
        ServerName send.overcomputing.net
        DocumentRoot /var/www/html/
        ServerAdmin flynnhub@overcomputing.net
        ErrorLog /var/log/httpd/send.linuxtricks.fr-error_log
        TransferLog /var/log/httpd/send.linuxtricks.fr-access_log
        ServerSignature Off
        SSLEngine on
        SSLCertificateFile /etc/pki/tls/certs/localhost.crt
        SSLCertificateKeyFile /etc/pki/tls/private/localhost.key
        RewriteEngine on
        ProxyPreserveHost on
        RequestHeader set X-Forwarded-Proto https
        RewriteCond %{REQUEST_FILENAME} -f
        RewriteRule .* - [L]
        RewriteCond %{HTTP:Upgrade} =websocket [NC]
        RewriteRule /(.*) ws://127.0.0.1:1443/$1 [P,L]
        RewriteRule ^/(.*)$ http://127.0.0.1:1443/$1 [P,QSA]
        ProxyPassReverse  "/" "http://127.0.0.1:1443"
        ProxyPass  "/" "http://127.0.0.1:1443"
</VirtualHost>
```

```bash
mkdir -p /etc/pki/tls/certs
mkdir -p /etc/pki/tls/private
```

```bash
openssl req -x509 -nodes -days 365 -newkey rsa:2048 \
  -keyout /etc/pki/tls/private/localhost.key \
  -out /etc/pki/tls/certs/localhost.crt \
  -subj "/C=FR/ST=IDF/L=Paris/O=Send/OU=IT/CN=send.overcomputing.net/emailAddress=flynnhub@overcomputing.net"
```

```bash
chmod 600 /etc/pki/tls/private/localhost.key
chmod 644 /etc/pki/tls/certs/localhost.crt
```
