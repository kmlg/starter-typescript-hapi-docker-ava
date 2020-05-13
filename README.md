# starter-typescript-hapi-docker-ava

A Typescript starter development kit with hapi, docker and ava.

[![Build Status](https://travis-ci.com/kmlg/starter-typescript-hapi-docker-ava.svg?branch=master)](https://travis-ci.com/kmlg/starter-typescript-hapi-docker-ava)

## Features

- Hapi v19.1.1
- Logger: Winston
- Basic Users model and CRUD API and data repository with nedb as an example
- /status

- Testing - ava
- Debug - vscode tasks (attach to process or debug test file)
- Linting - tslint
- Documentation - typedoc and swagger
- Coverage - nyc
- Configuration - Dotenv
- Docker (server and tests)
- Versioning - semver, standard-version

## Quickstart

```bash
git clone https://github.com/kmlg/starter-typescript-hapi-docker-ava.git
cd starter-typescript-hapi-docker-ava

npm i

npm run start:server
```