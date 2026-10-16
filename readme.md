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


## 🤖 AI Usage & Technical Decisions

This section outlines how AI tools were integrated into the development process, the architectural choices made to learn Node.js, and the verification methods used to ensure system stability.

### 1. AI Tools & Agents Used
*   **ChatGPT / Gemini:** Used for **scaffolding** the initial backend setup from scratch and generating configuration files.
*   **AI Coding Assistant:** Used to quickly write connection code, configure environment parameters, and assist in structure parsing.

### 2. Prompt Iteration
*   **Initial Prompt (Scaffolding):** 
    > *"Create a new Node.js backend project from scratch with a basic setup, folder structure, and necessary dependencies to start building a REST API."*
*   **Iteration & Refinement (Database Integration):** Once the project was running, I asked for assistance connecting it to a containerized database:
    > *"Help me connect my Node.js application to a MongoDB database. Please provide the database connection section code and a `docker-compose.yml` file to run MongoDB locally using Docker."*

### 3. Technical Decisions & AI Suggestions
*   **The Stack:** **Node.js** (Backend), **MongoDB** (Database), and **Docker** (Environment Orchestration).
*   **Core Architectural Decisions:**
    *   *Decision Origin:* **I decided to use Node.js** for the backend because I wanted to experiment with it, step out of my comfort zone, and expand my backend development skills.
    *   *AI Suggestion:* The AI suggested using **Docker Compose** (`yml` file) to manage the MongoDB instance locally. **I accepted this choice** because it kept my local machine clean and streamlined the database setup process.
*   **API Design:** **I chose to integrate a public Pokémon API** to fetch core data. While the AI helped construct the basic boilerplate, **I custom-designed my own endpoints** around this data to practice managing server-side requests and building custom wrappers.

### 4. Verification & Code Review
*   **Review Process:** Every piece of AI-generated code was thoroughly inspected. I manually reviewed the structure of the generated `docker-compose.yml` file to ensure port bindings and volume allocations were accurate before running it.
*   **Testing:** I tested the database connection locally by spinning up the Docker container and verified my custom Pokémon endpoints using API clients to ensure data mapping from the public API was flowing correctly.
*   **What was Rejected/Rewrote:** 
    *   I rejected complex, nested endpoint logics initially offered by the AI assistant. I opted to keep my custom routing flat and explicit to make it readable and easier for me to debug while learning Node.js.

