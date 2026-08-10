---
title: 'Configuration des repos RHEL sans licence (ISO DVD)'
description: "Installer Redhat sans y passer la journée."
pubDate: 'Jul 29 2026'
updatedDate: 'Aug 12 2026'
---

Quand on ne possède pas de licence redhat, mais que nous avons l’ISO sous le format DVD, il y’a une astuce afin de pouvoir installer des packages sur notre machine. On va copier l’ensemble des packages sur la machine depuis l’ISO, puis indiquer le répertoire à utiliser.

---

On mets l’ISO dans le lecteur CD sur notre machine virtuelle, puis nous allons le monter sur notre partition /mnt afin de pouvoir l’utiliser.

```bash
mount /dev/sr0 /mnt
```

On créé le répertoire dans lequel il y’aura tous nos packages qu’on va copier depuis notre ISO.

```bash
mkdir /RPMS
```
