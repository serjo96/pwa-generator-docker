# Template generator




This is a template generator with support push messages and pwa.

Stack technologies: 

* **Front-end:** vue + ts, vuex, vuetify, axios, sass, jest.
* **Backend:** nest.js + express, firebase, webpack, handlebars


## Installation and Usage

<p>The backend and frontend part are in docker containers.</p>

For start docker run that command: 
```bash
$ docker-compose up -d --force-recreate
```

This command stops and removes all images.

```bash
$ docker-compose down --rmi all
```

If you don't wanna run project by docker, you may use bash script

```bash
sh run.sh
```

On windows you may use **git bash terminal** and run there 
```bash
bash run.sh
```

> **Require node version "^8.13.0 || >=10.10.0".**

> **Require imagemagick software.**
>
> You may download it [here](https://imagemagick.org/script/download.php).
>
>Or use ```brew install imagemagick```
>
>Or just run this script, and imagemagick will be installed automatically, for all os except windows



----

#### Test account: 

 - login - `napad29272@mail8app.com`

 - password - `qwerty123`
 
 ---

Front-end starts on `localhost:8080`

Backend starts on `localhost:3000`


