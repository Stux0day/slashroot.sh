---
title: 'Zabbix'
description: 'Installer Zabbix Server sur Debian avec MariaDB.'
pubDate: 'Aug 14 2026'
---

On vient installer les packages nécessaires.

```
wget https://repo.zabbix.com/zabbix/8.0/release/debian/pool/main/z/zabbix-release/zabbix-release_latest_8.0+debian13_all.deb
```

```
dpkg -i zabbix-release_latest_8.0+debian13_all.deb
```

```
apt update
```

```
apt install zabbix-server-mysql zabbix-frontend-php zabbix-apache-conf zabbix-sql-scripts zabbix-agent2 mariadb-server
```

```
apt install zabbix-agent2-plugin-mongodb zabbix-agent2-plugin-mssql zabbix-agent2-plugin-postgresql
```

```
mysql -uroot -p
```

```sql
create database zabbix character set utf8mb4 collate utf8mb4_bin;
```

```sql
create user zabbix@localhost identified by 'password';
```

```sql
grant all privileges on zabbix.* to zabbix@localhost;
```

```sql
set global log_bin_trust_function_creators = 1;
```

```sql
quit;
```

```
zcat /usr/share/zabbix/sql-scripts/mysql/server.sql.gz | mysql --default-character-set=utf8mb4 -uzabbix -p zabbix
```

```
mysql -uroot -p
```

```sql
set global log_bin_trust_function_creators = 0;
```

```sql
quit;
```

```
# /etc/zabbix/zabbix_server.conf
DBPassword=password
```

```
systemctl restart zabbix-server zabbix-agent2 apache2
```

```
systemctl enable zabbix-server zabbix-agent2 apache2
```
