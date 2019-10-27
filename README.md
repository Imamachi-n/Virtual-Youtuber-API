# Virtual-Youtuber-API

**This was created during my time as a student at Code Chrysalis**

Virtual YouTuber (VTuber) API is the data collection of 700+ Virtual TouTuber channels. The raw data was gotten from [YouTube Data API v3](https://developers.google.com/youtube/v3) and then extracted the basic data for only Virtual TouTubers.

## Setup environment

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

## How to use API

Get the list of all Virtual YouTuber channels.

| Method | URI           |
| ------ | ------------- |
| GET    | /api/channels |
