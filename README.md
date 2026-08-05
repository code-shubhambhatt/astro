# Astrology Website

Full-stack consultation website for Pandit Kamla Prasad Bhatt built with Flask, React, and MongoDB.

## Project Structure

## 📁 Project Structure

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



## Features

- **Services** — list and view Vedic astrology services
- **Testimonials** — client feedback and ratings
- **Booking** — consultation request form with validation
- **Responsive** — works on mobile, tablet, desktop

## Tech Stack

**Backend:** Flask, MongoDB, Python  
**Frontend:** React, Vite, Tailwind CSS  
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
cp .env.example .env
npm run dev
```

Runs on `http://localhost:5173`

## API Endpoints

- `GET /api/services` — list all services
- `GET /api/services/<id>` — get single service
- `POST /api/services` — create service (admin)
- `GET /api/testimonials` — list testimonials
- `POST /api/testimonials` — create testimonial
- `POST /api/bookings` — create booking request

## Next Steps

- [ ] Build About page
- [ ] Complete booking form with email notifications
- [ ] Add admin panel for managing bookings
- [ ] Deploy (Vercel + Railway/Render)

## Contributing

This is a personal project. Feedback and suggestions welcome.

## License

Personal use only.
