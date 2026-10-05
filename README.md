# Virtual Campus Guide

A simple college project: students and visitors can browse campus locations, departments, facilities, events and announcements, log in, and find routes on a campus map. Admins manage all campus data.

**Tech stack:** React (frontend) · Kotlin + Spring Boot (backend) · MySQL/MariaDB (database) · REST API · Axios · Leaflet map · BCrypt password hashing

## Features
- Register / Login / Logout with Student, Visitor and Admin roles
- Admin Dashboard: add/edit/delete locations, departments, facilities, events, announcements
- Student/Visitor Dashboard: welcome + announcements + quick links
- Campus map (Leaflet + OpenStreetMap) with markers from the MySQL backend
- Source → Destination route with Haversine distance + walking time (5 km/h)
- Search locations by name **or category** via backend API
- Location details page with "Show on Map" button
- Admin-only CRUD protected by a Bearer token (BCrypt-hashed passwords, users stored in MySQL)

### Default accounts
- Admin: `admin@college.com` / `admin123`
- Student: `student@college.com` / `student123`

## How it all connects

```
React (browser)
   ↓  Axios HTTP calls
Kotlin Spring Boot REST API (port 9090)
   ↓  Spring Data JPA
MySQL / MariaDB database: virtual_campus
```

React never contains hardcoded campus data — it always fetches from the backend, and the backend reads/writes MySQL.

## Folder structure

```
VirtualCampusGuide/
├── backend/            # Kotlin Spring Boot
│   └── src/main/kotlin/com/example/campusguide/
│       ├── controller/ # REST API endpoints
│       ├── service/    # business logic
│       ├── repository/ # Spring Data JPA
│       └── entity/     # database tables as Kotlin classes
├── frontend/           # React (Vite)
│   └── src/
│       ├── components/ # Navbar
│       ├── pages/      # Home, Locations, Details, Departments, Facilities, Events, Map
│       └── services/   # Axios API calls
└── sql/virtual_campus.sql   # manual DB setup script (optional)
```

## Prerequisites

- JDK 21 (JAVA_HOME set)
- Node.js 18+
- MySQL or MariaDB running on localhost:3306 (database `virtual_campus` is auto-created)

## Run the backend

```bash
cd backend
./gradlew bootRun        # Windows: gradlew.bat bootRun
```

- API starts on http://localhost:9090
- Tables are created automatically and sample data is loaded on startup.

## Run the frontend

```bash
cd frontend
npm install
npm run dev              # opens http://localhost:3000
```

## API endpoints

| Method | URL | Description |
|--------|-----|-------------|
| GET | /api/locations | All locations (add `?name=lib` to search) |
| GET | /api/locations/{id} | One location |
| POST | /api/locations | Add a location |
| PUT | /api/locations/{id} | Update a location |
| DELETE | /api/locations/{id} | Remove a location |
| GET | /api/departments | All departments |
| GET | /api/departments/{id} | One department |
| GET | /api/facilities | All facilities |
| GET | /api/facilities/{id} | One facility |
| GET | /api/events | All events |
| GET | /api/events/{id} | One event |
| GET | /api/announcements | All announcements |
| POST | /api/auth/register | Register (name, email, password, role) |
| POST | /api/auth/login | Login → {token, name, email, role} |
| POST | /api/auth/logout | Logout |

POST/PUT/DELETE on locations, departments, facilities, events and announcements require an **Admin** Bearer token: `Authorization: Bearer <token>`.

## Pages

- **Home** – college intro, search bar, popular locations, quick links
- **Locations** – searchable cards, click for details
- **Location Details** – full info of one location
- **Departments / Facilities / Events** – card lists
- **Map** – Leaflet + OpenStreetMap markers for campus places

Note: port 9090 is used because 8080/8081 are taken on this machine. If they are free on your machine you can change `server.port` back to 8080 in `backend/src/main/resources/application.properties` (and the base URL in `frontend/src/services/api.js`).
