<br>
<p align="center">
  <a href="https://nodejs.org/en/" target="blank"><img src="https://nodejs.org/static/images/logo.svg" width="200" alt="Nest Logo" /></a>
</p>
<br>

# Fitness Tracker 

1. Execute `yarn` to install all dependencies:
```
$ yarn
```
2. Create `.env` file in the root directory:
```
# Example .env file

PORT=3001
POSTGRESQL_DB_NAME=database_name_example
POSTGRESQL_USERNAME=username_example
POSTGRESQL_PASSWORD=password_example
JWT_SECRET=s$cr3tKey
```
3. Init `Docker-Compose` to start database volumes:
```
$ docker compose up -d
```
1. Start applicacion on `dev` mode:
```
$ yarn start:dev
```