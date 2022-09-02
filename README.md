# Project

The project is an API to register places you want to visit.

## 🌎 Usage

- [Access Project](https://places-test.nicolau.dev/api/v1) (<small>Countries available: `Brazil, United States, France`</small>)

## 🛠️ Framework / Tools

- Postgres (with TypeORM)
- Docker
- NestJS
- Jest
- Github Actions
- Google Cloud Run
- CloudFlare

## 💻 Getting Started

```bash
make init
```

## 📖 Documentation

- [Swagger Documentation](https://places-test.nicolau.dev/docs/api)
- [Postman Collection](docs/api.postman_collection.json)

## 🆎 Running Tests

```
make tests
make cov
```

## 🟢 Possible Improvements

- Cache with REDIS to prevent overload on database;
- Pagination to deal with huge data;
- Migrations to keep version control of database and disable `synchronize` to prevent clean all data when will change in entities;
- Seed to populate countries table;
