# qrsec_frontend

> Thesis frontend project for the Bachelor's degree in Information Technologies Engineering at the University of Mendoza.
 
- CRUD Pages:
  - Address
  - Guest
  - Invite
  - User

---

# Getting Started

## Running the project (local)

```shell
npm start
```

## Installing dependencies
```shell
npm install
```

## Building the project

```shell
npm run build
```

## Run production ready versions
```shell
npm install -g serve

serve -s /app -l 3000
```

Or use an nginx server.

# Docker
## Build Docker image
```shell
docker build -t qrsec_frontend:x.x.x -t qrsec_frontend:latest .
```

## Run standalone Docker image
```shell
docker run --rm -d -p 80:80 --name qrsec_frontend --env-file .env.production qrsec_frontend
```
