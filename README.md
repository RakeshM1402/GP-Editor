# Gurupadigam Editor

A SaaS web application that automates weekly editing of Gurupadigam PDFs by replacing "text" placeholders with custom student and parent commitment text.

![Gurupadigam Editor](https://via.placeholder.com/800x400?text=Gurupadigam+Editor)

## Features

- **PDF Processing**: Automatically replace "text" placeholders on the last page
- **3D Interactive UI**: Modern frontend with 3D canvas background
- **User Authentication**: Login with Google (Supabase) or demo mode
- **Customizable Text**: Configure default student and parent commitment texts
- **No File Storage**: Process PDFs in-memory, return directly

## Tech Stack

| Component | Technology |
|-----------|------------|
| Frontend | Next.js 14 + Tailwind CSS |
| Backend | FastAPI (Python) |
| Database | PostgreSQL (SQLite for dev) |
| Auth | Supabase (Google OAuth) |
| Payments | Paystack (Nigeria) |
| PDF Processing | PyMuPDF (fitz) |

## Project Structure

```
├── frontend/                 # Next.js application
│   ├── src/
│   │   ├── app/           # App router pages
│   │   └── components/    # React components
│   └── ...
│
├── backend/                # FastAPI application
│   ├── app/
│   │   ├── routes/       # API endpoints
│   │   ├── services/     # Business logic
│   │   └── models/       # Database models
│   ├── requirements.txt
│   └── ...
│
└── README.md
```

## Getting Started

### Prerequisites

- Node.js 18+
- Python 3.10+
- PostgreSQL (or SQLite for development)

### Frontend Setup

```bash
cd frontend
npm install
npm run dev
```

### Backend Setup

```bash
cd backend
python -m venv venv
# On Windows: venv\Scripts\activate
# On Mac/Linux: source venv/bin/activate

pip install -r requirements.txt

# Create .env file
cp .env.example .env

uvicorn app.main:app --reload
```

## API Endpoints

### PDF Processing
- `POST /api/pdf/process` - Upload and process PDF

### Authentication
- `POST /api/auth/register` - Create account
- `POST /api/auth/login` - Login
- `GET /api/auth/me` - Get current user

## Environment Variables

```env
# Backend
DATABASE_URL=postgresql://user:password@localhost:5432/gurupadigam
SECRET_KEY=your-secret-key
PAYSTACK_SECRET_KEY=sk_test_...

# Frontend
NEXT_PUBLIC_API_URL=http://localhost:8000
```

## Deployment

### Frontend (Vercel)
1. Push to GitHub
2. Import project on Vercel
3. Auto-detects Next.js

### Backend (Railway/Render)
1. Push backend to GitHub
2. Deploy on Railway or Render
3. Set environment variables

## License

MIT License
