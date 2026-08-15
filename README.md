# JyotishHorizon

Full-stack Vedic astrology consultation platform for Pandit Kamla Prasad Bhatt, built with React, Flask, MongoDB, JWT authentication, and Resend.

The application provides a public-facing astrology consultation website and a protected admin dashboard for managing bookings and website content.

## Current Status

The project is at the **feature-complete MVP / productionization** stage.

Implemented:

- Public astrology website
- Responsive React UI
- About/contact content
- Services and service detail pages
- Testimonials
- Consultation booking
- MongoDB persistence
- JWT authentication
- Protected admin dashboard
- Booking status management
- Admin service management
- Admin testimonial management
- Admin About/contact management
- Centralized authenticated API requests
- Invalid JWT handling and automatic logout
- Booking email notifications through Resend
- Blog backend API with draft/published status and slugs

Still to complete:

- Blog frontend
- Blog admin UI
- Blog DELETE endpoint
- Automated backend tests
- Frontend integration tests
- Production deployment
- Production domain
- Verified Resend sending domain
- Production monitoring and error handling
- Production security hardening

## Features

### Public Website

- Responsive landing page
- About page with dynamic content
- Vedic astrology services
- Service detail pages
- Testimonials
- Testimonial submission
- Consultation booking form
- Booking validation
- Contact information
- Responsive navigation

### Admin Dashboard

JWT-protected admin area with:

- Dashboard
- Booking management
- Booking status updates
- About/contact content management
- Service management
- Create and update services
- Activate/deactivate services
- Testimonial management
- Edit testimonials
- Show/hide testimonials
- Admin navigation
- Logout
- Automatic handling of invalid authentication tokens

### Booking Notifications

New bookings are stored in MongoDB and trigger email notifications through Resend.

Current flow:

```text
Customer submits booking
        ↓
Backend validates request
        ↓
Booking stored in MongoDB
        ↓
Admin email notification
        ↓
Customer confirmation attempt
```

Customer-facing production email delivery requires a verified sending domain in Resend.

Email delivery is intentionally independent of booking creation. An email failure does not invalidate an already-created booking.

### Blog API

The backend currently supports:

| Method | Endpoint | Description |
|---|---|---|
| POST | `/api/blogs` | Create a blog |
| GET | `/api/blogs` | Get published blogs publicly; authenticated users can access all blogs |
| GET | `/api/blogs/<id>` | Get a published blog publicly; authenticated users can access drafts |
| PATCH | `/api/blogs/<id>` | Update a blog |

Blog fields currently include:

- `title`
- `slug`
- `content`
- `status` (`draft` or `published`)
- `created_at`
- `updated_at`

The frontend blog UI and admin blog management are not implemented yet.

## Tech Stack

### Frontend

- React 19
- Vite
- React Router
- Tailwind CSS
- Lucide React
- Native Fetch API

### Backend

- Python
- Flask
- Flask Blueprints
- Flask-PyMongo
- Flask-CORS
- Flask-JWT-Extended
- Werkzeug password hashing
- Resend

### Database

- MongoDB
- MongoDB Atlas

### Authentication

- JWT-based authentication
- Protected admin routes
- Token-based API authorization
- Automatic logout on invalid authentication responses

## Architecture

```text
                    ┌─────────────────────┐
                    │     React / Vite    │
                    │   Public Website    │
                    │   Admin Dashboard   │
                    └──────────┬──────────┘
                               │
                               │ REST API
                               ▼
                    ┌─────────────────────┐
                    │      Flask API      │
                    │    Blueprints       │
                    │  JWT Authentication │
                    └──────┬───────┬──────┘
                           │       │
                  ┌────────┘       └────────────┐
                  ▼                             ▼
        ┌─────────────────┐           ┌─────────────────┐
        │ MongoDB Atlas   │           │     Resend      │
        │ Application Data│           │ Email Delivery  │
        └─────────────────┘           └─────────────────┘
```

## Project Structure

```text
astro/
├── backend/
│   ├── app.py
│   ├── config.py
│   ├── extensions.py
│   ├── requirements.txt
│   ├── .env.example
│   ├── routes/
│   │   ├── about.py
│   │   ├── auth.py
│   │   ├── blogs.py
│   │   ├── bookings.py
│   │   ├── health.py
│   │   └── services.py
│   │   └── testimonials.py
│   └── services/
│       └── email.py
│
├── frontend/
│   ├── src/
│   │   ├── api/
│   │   │   ├── about.js
│   │   │   ├── auth.js
│   │   │   ├── bookings.js
│   │   │   ├── client.js
│   │   │   ├── services.js
│   │   │   └── testimonials.js
│   │   ├── components/
│   │   ├── pages/
│   │   ├── App.jsx
│   │   └── main.jsx
│   ├── public/
│   ├── package.json
│   └── .env.example
│
└── README.md
```

> The repository currently contains the backend blog route, while the frontend blog API client/pages are still pending.

## API

### Public Endpoints

| Method | Endpoint | Description |
|---|---|---|
| GET | `/api/services` | Get active services |
| GET | `/api/services/<id>` | Get a service |
| GET | `/api/testimonials` | Get visible testimonials |
| POST | `/api/testimonials` | Submit a testimonial |
| POST | `/api/bookings` | Create a consultation booking |
| GET | `/api/about` | Get About/contact content |
| POST | `/api/auth/login` | Authenticate admin |
| GET | `/api/blogs` | Get published blogs |
| GET | `/api/blogs/<id>` | Get a published blog |

### Protected Endpoints

These endpoints require a valid JWT.

| Method | Endpoint | Description |
|---|---|---|
| GET | `/api/bookings` | Get all bookings |
| PUT | `/api/bookings/<id>` | Update booking status |
| POST | `/api/services` | Create a service |
| PUT | `/api/services/<id>` | Update a service |
| PUT | `/api/about` | Update About/contact content |
| PUT | `/api/testimonials/<id>` | Update testimonial |
| POST | `/api/blogs` | Create a blog |
| GET | `/api/blogs` | Get all blogs including drafts |
| GET | `/api/blogs/<id>` | Get a blog including drafts |
| PATCH | `/api/blogs/<id>` | Update a blog |

## Frontend Routes

### Public

```text
/
/about
/services
/testimonials
/contact
/login
```

### Protected Admin

```text
/dashboard
/dashboard/about
/dashboard/services
/dashboard/testimonials
```

The blog frontend routes are not implemented yet.

## Environment Variables

### Backend

Create `backend/.env` from `backend/.env.example`.

Configure the required:

- MongoDB connection
- JWT secret
- Resend API key
- Email configuration
- Application configuration

Never commit `.env` files or secret credentials.

### Frontend

Create `frontend/.env` from `frontend/.env.example`.

```env
VITE_API_BASE=http://localhost:5000/api
```

Use the production backend URL after deployment.

## Getting Started

### Backend

```bash
cd backend
python -m venv venv
```

Windows:

```powershell
venv\Scripts\activate
```

Linux/macOS:

```bash
source venv/bin/activate
```

Install dependencies:

```bash
pip install -r requirements.txt
```

Create and configure `backend/.env`, then start Flask:

```bash
python app.py
```

Backend:

```text
http://localhost:5000
```

### Frontend

Open another terminal:

```bash
cd frontend
npm install
npm run dev
```

Frontend:

```text
http://localhost:5173
```

## Admin Authentication Flow

```text
Admin Login
    ↓
JWT access token
    ↓
Protected dashboard
    ↓
Authenticated API requests
    ↓
Logout / invalid token
    ↓
Clear token
    ↓
Login page
```

## Validation

The backend validates important application data including:

- Required fields
- Indian 10-digit contact numbers
- Email format
- Booking datetime
- Booking status
- MongoDB ObjectIds
- Service field types
- Blog status
- Blog title/content fields

## Development Progress

### Completed

- [x] Public website
- [x] Responsive UI
- [x] MongoDB integration
- [x] Service management
- [x] Testimonial management
- [x] About/contact management
- [x] Booking system
- [x] Booking status management
- [x] JWT authentication
- [x] Protected admin routes
- [x] Admin navigation
- [x] Logout
- [x] Centralized authenticated API requests
- [x] Invalid authentication token handling
- [x] Resend booking notifications
- [x] Environment configuration templates
- [x] Blog create API
- [x] Blog read APIs
- [x] Blog update API
- [x] Blog draft/published status
- [x] Blog slug generation

### In Progress / Planned

- [ ] Blog frontend
- [ ] Admin blog management
- [ ] Blog DELETE endpoint
- [ ] Production deployment
- [ ] Production domain
- [ ] Verified Resend sending domain
- [ ] Automated backend tests
- [ ] Frontend integration tests
- [ ] Production monitoring
- [ ] Production error handling
- [ ] Production security hardening

## Deployment Plan

Target architecture:

```text
React / Vite
     ↓
Frontend hosting
     ↓
Flask REST API
     ↓
Cloud server
     ↓
MongoDB Atlas

Flask API
     ↓
Resend
     ↓
Email notifications
```

The application is currently being prepared for production deployment.

## Future Improvements

Potential future additions:

- Appointment scheduling and slot management
- Online payments
- AI-assisted horoscope readings
- Analytics dashboard
- Improved email templates
- Automated testing and CI/CD
- Production monitoring
- Blog SEO improvements
- Sitemap and metadata for public blog pages

## Latest Development Checkpoint

Latest known GitHub commit:

```text
1390b425133914d73167954b9be92e8376038096
feat: add blog CRUD APIs
```

The latest development work adds the backend blog API and registers the blog blueprint with the Flask application.

The project should now be treated as a **full-stack productionization project**, not an initial MVP. Future development should prioritize completing the blog end-to-end, testing, deployment, and production hardening.

## License

Personal project. All rights reserved.
