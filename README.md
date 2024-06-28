# README

## Overview

This repository is a RESTful API service for managing Pokémon cards. It includes endpoints for creating, updating, deleting, and retrieving Pokémon cards. Additionally, it features an authentication endpoint to manage user login and protected routes.

## Features

- Authentication endpoint to generate JWT tokens for secure access.
- CRUD operations for Pokémon cards.
- Protected routes requiring valid JWT tokens.
- Battle simulation endpoint to determine the outcome of battles between Pokémon cards.
- Endpoint to detect cards against which the consulted card has resistances and weaknesses.

## Getting Started

Follow these steps to set up and run the project on your local machine.

### Prerequisites

- Node.js and npm installed on your machine.
- PostgreSQL database setup.

### Installation

1. **Clone the repository**

   ```bash
   git clone https://github.com/Koldunism/cu-pokemon-cards-be.git
   cd cu-pokemon-cards-be
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Configure the database**

   Edit the `config/config.json` file with your database credentials:

   ```json
   {
     "development": {
       "username": "your_username",
       "password": "your_password",
       "database": "pokemon_cards",
       "host": "127.0.0.1",
       "dialect": "postgres"
     }
   }
   ```

4. **Create the database**

   ```bash
   npx sequelize-cli db:create
   ```

5. **Migrate the database**

   ```bash
   npx sequelize-cli db:migrate
   ```

6. **Seed the database**

   ```bash
   npx sequelize-cli db:seed:all
   ```

7. **Create the `.env` file**

   Create a `.env` file in the root directory of the project and add the following variables:

   ### DATABASE variables

   ```env
   DB_HOST="127.0.0.1"
   DB_USERNAME="postgres" # Change this to your PostgreSQL username
   DB_PASSWORD="EB&Tn4Vr!" # Change this to your PostgreSQL password
   DB_NAME="pokemon_cards"
   DB_DIALECT="postgres"
   ```

   ### SERVER variables

   ```env
   PORT=3000
   HOST='0.0.0.0'
   ```

   ### JWT

   ```env
   JWT_SECRET="superlongandcomplexsecret"
   HASH_ALG='sha256'
   ```

8. **Start the application**

   ```bash
   npm run start
   ```

### Running the Application

Start the application with the following command:

```bash
npm run start
```

## Authentication

To access protected endpoints, you need to authenticate using the `/login` endpoint. Use the following credentials:

```json
{
  "username": "tester",
  "password": "123456"
}
```

Upon successful authentication, you will receive a JWT token to use in the Authorization header for subsequent requests.

## API Endpoints

### Authentication

- `POST /login`: Authenticate user and receive a JWT token.

### Pokémon Cards

- `POST /cards`: Create a new Pokémon card.
- `GET /cards`: Retrieve all Pokémon cards (supports pagination and filtering).
- `GET /cards/:id`: Retrieve a Pokémon card by ID.
- `PATCH /cards/:id`: Update a Pokémon card by ID.
- `DELETE /cards/:id`: Delete a Pokémon card by ID.
- `GET /cards/:id/damage-modifiers`: Get weaknesses and resistances for a Pokémon card.
- `GET /simulate-battle?attackerId=&defenderId=`: Simulate a battle between two Pokémon cards.

### Health Check

- `GET /health`: Check if the service is running.
