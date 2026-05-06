# Psychologist App

A responsive web app to explore and book appointments with psychologists. Users can register, log in, add favorites, and schedule consultations.

Live – https://psychologist-app-lyart.vercel.app/psychologists

---

## Tech Stack

- **Frontend:** React, React Router DOM, React Hook Form, Yup
- **State & Data Fetching:** TanStack Query
- **Database & Auth:** Firebase (Realtime Database & Authentication)
- **Notifications:** Sonner
- **SEO:** Custom React SEO component (Open Graph + Twitter meta management)
- **Styling:** CSS, responsive (320px–1440px)
- **Bundler:** Vite
- **Deployment:** Vercel

---

## Features

- Browse psychologists with detailed profiles (name, avatar, experience, reviews, price, rating, license, specialization, initial consultation, about)
- Sort psychologists by name, price, and rating
- Add/remove favorites (persisted across reloads)
- View extended information and reviews (“Read more” functionality)
- Book appointments via modal form
- Authentication (registration, login, logout)
- Private routes for authenticated users
- Theme switcher with multiple color themes (green, blue, orange)
- User notifications for actions and system feedback

---

## Key Integrations

- **TanStack Query** handles server state, caching, and efficient data fetching
- **React Router DOM** manages navigation and protected routes
- **Sonner** provides toast notifications for user actions and errors
- **SEO Component** centralizes metadata management for pages (title, description, Open Graph, Twitter Cards)

---

## SEO Implementation

The project uses a reusable React SEO component instead of static HTML meta tags.

---

## Routing

* / → Home
* /psychologists → Psychologists list
* /favorites → Favorites (private route)

[React Router Documentation](https://reactrouter.com/en/main)￼

---

## Getting Started

```

git clone https://github.com/Diamond-FoxUA/psychologist-app.git

cd psychologist-app

npm install

npm run dev

```

---

## Environment Setup

```

VITE_API_KEY=your_key
VITE_AUTH_DOMAIN=your_domain
VITE_PROJECT_ID=your_project_id
VITE_STORAGE_BUCKET=your_bucket
VITE_MESSAGING_SENDER_ID=your_sender_id
VITE_APP_ID=your_app_id

```

---

## License

MIT License