# Portfolio & Code Sharing Platform

> A personal space to share who I am, what I build, and the code I write along the way.

A full-stack web application — part portfolio, part code blog. Visitors can browse projects, read and react to published code snippets, and leave comments. Everything on the site is managed through a custom admin panel without touching the source code.

Built with **React** and **Django REST Framework** as a hands-on learning project.

---

## What it does

- **Portfolio** — showcases personal projects
- **Code sharing** — publish scripts by category (Python, JavaScript, HTML & CSS, etc.) in a blog-style feed
- **Reactions & comments** — visitors can react (Like, Love, Dislike, Angry) and comment on entries
- **Dynamic content** — most site text is managed from the admin panel via slugs, no redeployment needed
- **Authentication** — user registration, login, and session-based auth

---

## Tech Stack

| Layer    | Technology                                                  |
|----------|-------------------------------------------------------------|
| Frontend | React (Vite), React Router DOM, Lucide React, Plain CSS     |
| Backend  | Django, Django REST Framework                               |
| Database | SQLite3                                                     |

---

## Getting Started

**Prerequisites:** Python 3.x, Node.js & npm

### Backend

```bash
cd backend
python -m venv venv
source venv/bin/activate        # Windows: venv\Scripts\activate
pip install -r requirements.txt
python manage.py migrate
python manage.py createsuperuser
python manage.py runserver
```

### Frontend

```bash
cd frontend
npm install
npm run dev
```

Frontend → `http://localhost:5173`  
Backend API → `http://localhost:8000`

---

## Content Management

Site text is slug-based and editable from the Django Admin Panel (`/admin`). Update a content entry by slug and it reflects on the frontend immediately — no code change needed.

---

## Auth & Deployment Notes

Session-based authentication works well locally. In production with a separate React frontend and Django backend on different origins, cross-origin cookie handling requires extra configuration (CORS headers, `SameSite`/`Secure` flags, `credentials: 'include'`).

This was handled for this project, but future projects will use **JWT-based auth** to keep cross-origin deployments simpler.

---

## Purpose

Built to learn full-stack development in practice — React architecture, DRF API design, authentication, database modeling, and the real-world challenges of deploying an SPA with a separate backend.

---

*Personal and educational use.*
