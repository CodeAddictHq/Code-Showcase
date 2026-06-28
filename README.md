<div align="center">

# 🦊 Adibs.Codes.Weeb

**Portfolio + Code Blog** — built with React & Django REST Framework

### Live Web: [adibscodes.onrender.com](https://adibscodes.onrender.com)
### Live API: [adibscodes.onrender.com](https://adibscodes.onrender.com)

</div>

---

> ⚠️ **Heads up:** this is hosted on Render's free tier, so both services spin down when idle.
> Give the frontend ~10s and the API another ~10s to wake up on first visit.

## About

A full-stack web app not only portfolio but also code blog platform .where I can share single-file code snippets, DSA solutions, and other programming write-ups. Users can browse projects, react to and comment on snippets, and everything — text, content, categories — is managed through a custom Django admin panel without touching the source code.

Built as a hands-on learning project with **React** and **Django REST Framework**.

## Features

- **Portfolio** — a personal site to introduce myself
- **Code Sharing** — blog-style feed of snippets by category (Python, JavaScript, HTML & CSS, etc.)
- **Projects** — showcase of personal projects
- **Reactions & Comments** — Like, Love, Dislike, Angry reactions, plus editable comments
- **Dynamic Content** — most site text is slug-based and editable from the admin panel, no redeploy needed
- **Authentication** — registration, login, and JWT-based auth

## Tech Stack

**Frameworks**

- React (Vite)
- Django
- Django REST Framework

**Libraries & Plugins**

- React Router DOM
- Lucide React
- SimpleJWT

**Database**

- SQLite3

**Servers**

- Nginx
- Gunicorn

## Getting Started

### Backend

```bash
cd backend
python -m venv venv

# Linux / macOS
source venv/bin/activate

# Windows
venv\Scripts\activate

pip install -r requirements.txt
```

**Database setup**

```bash
python manage.py migrate
python manage.py loaddata data.json
```

**Run**

```bash
# Development
python manage.py runserver

# Production
gunicorn main.wsgi
```

### Frontend

```bash
cd frontend
npm install
```

**Run**

```bash
# Development
npm run dev

# Build
npm run build
```

## Dynamic Content

Most texts is slug-based and editable from the Django Admin Panel (`/admin`). Update a content entry by its slug, and the frontend reflects the change immediately — no source changes or redeployment required.

## Authentication

JWT authentication via SimpleJWT. Users can register, log in, access protected endpoints, and stay authenticated using JWT tokens.

## Purpose

A learning project to practice React, Django, REST API design, JWT authentication, database modeling, and full-stack deployment.

## License

Personal and educational use.
