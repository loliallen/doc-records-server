# Варианты запуска

## 1 Запуск через `docker-compose`

```sh
$ docker-compose up -d --build
```
Сразу запустит сервер сервис для отправки уведомлений через отдельные docker контейнеры

## 2 Запуск через `npm scripts`

```sh
$ npm run server:dev
```

Запусит сервер и сервис для отпавки уведомлений, через модуль `concurently`

# Описание скриптов


## npm start
### Запускает сервер и сервис продакшн режиме
## npm run dev
### Запускает сервер и сервис в дев режиме
## npm server:prod
### Запускает сервер продакшн режиме
## npm run server:dev
### Запускает сервер в дев режиме
## npm build
### Собирает продакшн версию
## npm prefill
### Презаполняет базу данных
## npm drop-db
### Очищает базу данных
## npm cron:dev
### Запускает сервис в дев режиме
## npm cron:start
### Запускает сервис в продакшн режиме