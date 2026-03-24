# GP Editor - Context for Future Development

## Project Overview
- **Name:** Gurupadigam Editor
- **Type:** SaaS Web Application
- **Purpose:** Automate weekly PDF editing - replace "Your text" placeholders with custom student/parent commitment text
- **Repo:** https://github.com/RakeshM1402/GP-Editor

## Tech Stack
| Component | Technology |
|-----------|------------|
| Frontend | Next.js 14 + Tailwind CSS |
| Backend | FastAPI (Python) |
| Database | PostgreSQL (SQLite for dev) |
| Auth | JWT + bcrypt |
| PDF Processing | PyMuPDF (fitz) |
| Payments | Paystack (Nigeria) |

## Project Structure
```
GP-Editor/
├── frontend/          # Next.js 14
│   ├── src/app/       # App router pages
│   ├── src/components/# React components
│   └── package.json
├── backend/           # FastAPI
│   ├── app/routes/    # API endpoints (auth, pdf)
│   ├── app/services/ # Business logic
│   ├── app/models/    # Pydantic/Database models
│   └── requirements.txt
└── README.md
```

## Key Features (MVP)
- PDF upload (drag & drop)
- Two text input fields for replacements
- Automatic last-page text replacement
- Download edited PDF
- No file storage (process in-memory)

## Environment Setup

### Backend
```bash
cd backend
python -m venv venv
# Windows: venv\Scripts\activate
# Mac/Linux: source venv/bin/activate
pip install -r requirements.txt
cp .env.example .env
uvicorn app.main:app --reload
```

### Frontend
```bash
cd frontend
npm install
npm run dev
```

## Important Notes
- PDFs processed in-memory, not stored
- Paystack test mode for development
- Use environment variables for secrets
- Keep JWT tokens in httpOnly cookies
- Free tier planned (3-5 edits/month), paid subscription later