# Pokémon Pokedex Backend — Express & TypeScript

A production-ready Node.js proxy server built with **Express** and **TypeScript**. It serves as an intermediary to consume the public PokéAPI securely while managing a local list of favorite Pokémon inside a **MongoDB** database.

---

## 🚀 Prerequisites

Before getting started, make sure you have the following installed on your machine:
- **Node.js** (v19.0.0+ recommended)
- **Docker Desktop** (Installed and running in the background)

---

## 🛠️ Setup & Installation Instructions

Follow these steps in your terminal to get the server running from scratch:

### 1. Install Node Dependencies
Extract all required packages (Express, Mongoose, Axios, TypeScript compiler tools) specified in the `package.json`:
```bash
npm install
```

### 2. Start the Database Container (Docker)
Launch the MongoDB instance in the background using Docker Compose. This automatically creates a persistent volume so you don't lose your marked favorite Pokémon when turning off the container:
```bash
docker compose up -d
```

### 3. Launch the Development Server
Run the local environment using `tsx`. The server will monitor your TypeScript code and automatically hot-reload whenever you save a file:
```bash
npm run dev
```

The backend server will successfully run at: **`http://localhost:3000`**

---

## 🔌 API v2 Endpoints Reference

Your frontend application (e.g., Vue 3) can interact with the server using the following endpoints:

| Method | Endpoint | Description | Sample Body / Query |
| :--- | :--- | :--- | :--- |
| **GET** | `/api/v2/pokemons` | Retrieves a paginated list of Pokémon with name, image, description, and favorite status. | `?limit=10&offset=0` |
| **GET** | `/api/v2/pokemon/:nameOrId` | Searches a specific Pokémon by name or ID. Checks database to return `isFavorite: true/false`. | *None* |
| **POST** | `/api/v2/favorites` | Saves a Pokémon ID into the local MongoDB favorites collection. | `{ "pokemonId": 25 }` |

---

## ⚙️ Available Scripts

- `npm run dev`: Starts the TypeScript server with live reloading capability (`tsx watch`).
- `npm run build`: Compiles all production-ready TypeScript code from `/src` into standard vanilla JavaScript inside the `/dist` folder.
- `npm run start`: Runs the pre-compiled JavaScript application using native Node.

---

## 📦 Project Clean Up
To turn off the database container and free up RAM on your machine when you're done programming, run:
```bash
docker compose down
```
*(Your saved favorite Pokémon data will safely remain stored on your local disk).*