# 🎮 GameSeek

[![ReactJS](https://img.shields.io/badge/React-61DAFB?logo=react&logoColor=white&style=flat)](https://reactjs.org/)  
[![Vite](https://img.shields.io/badge/Vite-646CFF?logo=vite&logoColor=white&style=flat)](https://vitejs.dev/)  
[![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?logo=typescript&logoColor=white&style=flat)](https://www.typescriptlang.org/)  
[![RAWG API](https://img.shields.io/badge/RAWG-Video%20Games%20DB-orange?style=flat)](https://rawg.io/apidocs)  
[![Axios](https://img.shields.io/badge/Axios-5A29E4?logo=axios&logoColor=white&style=flat)](https://axios-http.com/)  

> A college project frontend built with React, Vite, and TypeScript that consumes the RAWG Video Games Database API.  
> Search for games and view their ratings, screenshots, release dates, available platforms, and tags—all in real time!

---

## 🚀 Features

- **Live Search**: Debounced input that updates results as you type  
- **Game Details**: Displays rating, release date, platforms, genres, tags  
- **Media**: Shows screenshots and trailers when available  
- **Responsive UI**: Fully responsive layout powered by React components  

---

## 🛠️ Tech Stack

| Technology     | Purpose                               |
| -------------- | ------------------------------------- |
| ReactJS        | Component-based UI framework          |
| Vite           | Lightning-fast build & dev server     |
| TypeScript     | Statically typed JavaScript           |
| RAWG API       | Source of game metadata               |
| Axios          | Promise-based HTTP client             |

---

## 🔧 Installation

1. **Clone the repository**  
   ```bash
   git clone https://github.com/your-username/college-game-explorer.git
   cd college-game-explorer

## Install dependencies

  ```bash
    npm install
  ```
  
## Configure environment variables

Create a `.env` file in the project root with:
  ```
    VITE_RAWG_API_KEY=your_rawg_api_key_here
  ```

## Start the development server
```bash
    npm run dev
```


The app will open at [http://localhost:5173](http://localhost:5173).

---

## ⚙️ Usage

### Search

- Type a game name into the search bar.
- Results update automatically after a brief pause.

### Browse

- Scroll through featured games.
- Click a card for more details: screenshots, release date, platforms, tags.

---

## 📚 Documentation & Links

- [RAWG API Docs](https://rawg.io/apidocs)
- [React](https://reactjs.org/)
- [Vite](https://vitejs.dev/)
- [TypeScript](https://www.typescriptlang.org/)
- [Axios](https://axios-http.com/)

---

## 📄 License

This project is licensed under the MIT License.
