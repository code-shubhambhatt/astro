# JyotishHorizon

Full-stack Vedic astrology consultation platform built with React, Flask, MongoDB, JWT authentication, and Resend.

The application provides a public-facing astrology consultation website along with a protected admin dashboard for managing bookings and website content.

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
- Responsive navigation for mobile, tablet, and desktop

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
- Logout
- Automatic handling of invalid authentication tokens

### Booking Notifications

New bookings are stored in MongoDB and trigger email notifications through Resend.

The current implementation supports:

- Admin booking notification
- Customer confirmation email logic

Customer-facing production email delivery will be finalized after a custom sending domain is configured in Resend.

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
│   │   ├── bookings.py
│   │   ├── health.py
│   │   ├── services.py
│   │   └── testimonials.py
│   └── services/
│       └── email.py
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
└── README.md
```

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

## Environment Variables

### Backend

Create `backend/.env` from `backend/.env.example` and configure the required MongoDB, JWT, email, and application settings.

### Frontend

Create `frontend/.env` from `frontend/.env.example` and configure:

```env
VITE_API_BASE=http://localhost:5000/api
```

Use the production backend URL when deploying.

> Never commit `.env` files or secret credentials to Git.

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

## Admin Panel

The admin panel is protected using JWT authentication.

Admin routes:

```text
/dashboard
/dashboard/about
/dashboard/services
/dashboard/testimonials
```

Authentication flow:

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

## Email Notifications

Booking notifications are handled through Resend.

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

The application intentionally keeps booking creation independent from email delivery. An email failure does not invalidate an already-created booking.

Production customer email delivery requires a verified sending domain in Resend.

## Validation

The backend validates important booking fields including:

- Required fields
- Indian 10-digit contact numbers
- Email format
- Booking datetime
- Booking status
- MongoDB ObjectIds
- Service field types

## Current Development Status

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

### Planned

- [ ] Production deployment
- [ ] Production domain
- [ ] Verified Resend sending domain
- [ ] Automated backend tests
- [ ] Frontend integration tests
- [ ] Production monitoring and error handling

## Deployment

Planned architecture:

```text
React / Vite
     ↓
Frontend hosting

Flask API
     ↓
Cloud server

MongoDB
     ↓
MongoDB Atlas

Email
     ↓
Resend
```

The application is currently being prepared for production deployment.

## Future Improvements

Potential future additions include:

- Appointment scheduling and slot management
- Online payments
- AI-assisted horoscope readings
- Analytics dashboard
- Improved email templates
- Automated testing and CI/CD
- Production monitoring

## License

Personal project. All rights reserved.
