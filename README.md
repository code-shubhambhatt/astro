# Astrology Website

Full-stack consultation website for Pandit Kamla Prasad Bhatt built with Flask, React, and MongoDB.

## Project Structure

<details>
<summary><b>📁 Project Structure</b></summary>

```text
astro/
├── backend/
│   ├── app.py
│   ├── config.py
│   ├── extensions.py
│   ├── routes/
│   ├── requirements.txt
│   └── .env.example
├── frontend/
│   ├── src/
│   ├── package.json
│   └── .env.example
└── README.md
```

</details>

### Backend

- Flask REST API (app factory pattern, Blueprints)
- MongoDB Atlas (via PyMongo)
- JWT Authentication (flask-jwt-extended)
- Password hashing (werkzeug.security)

### Frontend

- React + Vite
- Tailwind CSS
- React Router
- Native `fetch` for API calls

## Features

- **Services** — list and view Vedic astrology services
- **Testimonials** — client feedback and ratings, with public submission
- **Booking** — consultation request form with validation
- **About** — bio, milestones, and approach/ethics content
- **Contact** — live contact info (phone/email/address), sourced from a single admin-editable record
- **Admin Panel** — JWT-protected dashboard for managing bookings (view all, mark completed) and editing About/contact content
- **Responsive** — works on mobile, tablet, desktop

## Tech Stack

**Backend:** Flask, MongoDB, PyMongo, Python  
**Frontend:** React, Vite, Tailwind CSS  
**Auth:** JWT (flask-jwt-extended)  
**Deployment:** (planned)

## Getting Started

### Backend Setup

```bash
cd backend
python -m venv venv
source venv/bin/activate  # Windows: venv\Scripts\activate
pip install -r requirements.txt
cp .env.example .env
# Edit .env with your MongoDB URI
python app.py
```

Runs on `http://localhost:5000`

### Frontend Setup

```bash
cd frontend
npm install
npm run dev
```

Runs on `http://localhost:5173`

## API Endpoints

**Public**
- `GET /api/services` — list all active services
- `GET /api/services/<id>` — get single service
- `GET /api/testimonials` — list visible testimonials
- `POST /api/testimonials` — submit a testimonial
- `POST /api/bookings` — create a booking request
- `GET /api/about` — get about/contact content
- `POST /api/auth/login` — admin login, returns JWT

**Protected (requires JWT)**
- `GET /api/bookings` — list all bookings
- `PUT /api/bookings/<id>` — update booking status (`new` / `completed`)
- `POST /api/services` — create a service
- `PUT /api/about` — update about/contact content

## Next Steps

- [ ] Email notifications on new bookings
- [ ] PUT/DELETE routes for Services and Testimonials (admin management)
- [ ] Deploy (Vercel + Railway/Render)

## Contributing

This is a personal project. Feedback and suggestions welcome.

## License

Personal use only.