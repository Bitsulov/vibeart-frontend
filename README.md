# VibeArt FrontEnd
Social network for creative people where they can share their creativity. Built using **React 19** with Vite bundler.
> This repository is submodule of main repository ([VibeArt](https://github.com/Bitsulov/VibeArt.git)) that runs using docker compose.

## Run

To run this app use commands:
```bash
npm install
npm run dev
```

## Technologies
- TypeScript
- SCSS
- React 19
- Vite
- Axios
- i18next
- Redux Tool Kit
- Tanstack query

The project uses a multi-stage Dockerfile:
- **Dev stage**: Node.js environment with Hot Module Replacement (HMR).
- **Prod stage**: Ultra-lightweight Nginx server serving optimized static files.

## Architecture: [Feature-Sliced Design (FSD)](https://feature-sliced.design/)
- app: Entrypoint, global styles, and providers (Redux, Router).
- pages: Composition of widgets into full-screen views.
- widgets: Large, self-contained blocks (e.g., Navbar, UserFeed).
- features: User interactions and business logic (e.g., LikeButton, Search).
- entities: Domain models and business data (e.g., User, Post, Comment).
- shared: Reusable UI kits, helpers, and API configuration.

## Links
- [Vibeart](https://github.com/Bitsulov/VibeArt.git) - main repository
- [Vibeart BackEnd](https://github.com/Bitsulov/vibeart-backend.git) - backend repository
