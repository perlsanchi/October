# TaskFlow — Django REST Framework + Angular

Full-stack task management system built as a learning project.

## Structure
- `backend/`  — Django + DRF API
- `frontend/` — Angular SPA

## Quick start
### Backend
    cd backend
    python -m venv .venv
    source .venv/bin/activate     # Windows: .venv\Scripts\activate
    pip install -r requirements.txt
    python manage.py runserver

### Frontend
    cd frontend
    npm install
    ng serve
- Frontend: http://localhost:4200
- Backend:  http://localhost:8000