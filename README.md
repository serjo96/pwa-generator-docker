# Template generator




This is a template generator with support for push messages and pwa in docker.

Stack technologies: 

* **Front-end:** vue + ts, vuex, vuetify, axios, sass, jest.
* **Backend:** nest.js + express, firebase, webpack, handlebars


## Installation and Usage

The backend and frontend part are in docker containers.

For start docker run that command: 
```bash
$ docker-compose up -d --force-recreate
```

This command stops and removes all images.

```bash
$ docker-compose down --rmi all
```
