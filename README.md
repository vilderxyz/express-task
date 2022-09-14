# SolveQ Node.js recruitment task

## Starting

### Prerequisites

1. Docker with docker compose

### Preparing database

Start application using docker compose

```sh
docker compose up
```

after application startup

```sh
docker compose exec -T db mysql -uroot -ppassword task <db-data.sql
```

## Task

Database is filled with users and locations, you don't need to write CRUD operations for those.
This template can be changed in any desired way needed to finish tasks.

As your task please do the following things:

1. Create following endpoints
   1. POST /auth/login - should generate jwt token, don't play with hasing passwords, just plain string comaprison
   2. GET /locations - verify user and return list of cities
   3. POST /location/:id/favorite - verify user and add city to favorites for given user
   4. GET /weather - fetch and return weather for user favorited cities, you can use any weather api you want, eg. https://openweathermap.org/api
2. We preffer to see correctly committed code, we will be very sad to see whole task commited as one commit.

3. Please shortly explain why your code is easily testable. You can use an example for this.
4. Add es-lint rules and some form of forcing them in code. Why have you decided to implement such rules and why have you chosen such form of enforcing them?
5. (Optional) Add possibility to start application in dev(local) mode. In such mode app should not request open weather api for weather but should use some mocked data, stored locally.
   Please describe idea behind this implementation.
6. (Optional) Store weather in our database. App should request for weather once every hour and store it in database. Weather returned to user should be fetched from this table. This operation should not be handled by main application thread. It might be child process, worker etc. however, we want the code of origial weather fetch to be reused in this solution.
   Please move this solution to separate branch.
   Please, also describe shortly why you have implemented it like this.
