# Virtual-Youtuber-API

Virtual Youtuber (VTuber) API using Express.js and Knex.js

## Environment

### Postgres

You will need postgres installed. If you haven't installed it already, download and install the [PostgresApp](https://postgresapp.com/) and verify its working by running the command `psql` in your terminal.

Create a database for this project by running:

```bash
echo "CREATE DATABASE vtuber_api TEMPLATE template0 ENCODING 'UTF-8' LC_COLLATE 'ja_JP.UTF-8' LC_CTYPE 'ja_JP.UTF-8';" | psql
```

#### Migrations

```bash
knex migrate:make add_channels_table --knexfile models/knexfile.js
```

#### Seeds

```bash
knex seed:make seed_channels_data --knexfile models/knexfile.js
```
