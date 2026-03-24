from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from .database import engine, Base
from .routes import auth, pdf
from .config import settings

Base.metadata.create_all(bind=engine)

app = FastAPI(
    title="Gurupadigam Editor API",
    description="Backend API for Gurupadigam PDF processing",
    version="1.0.0"
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(auth.router)
app.include_router(pdf.router)


@app.get("/")
def root():
    return {"message": "Gurupadigam Editor API", "status": "running"}


@app.get("/health")
def health_check():
    return {"status": "healthy"}


@app.post("/test-download")
def test_download():
    from fastapi.responses import StreamingResponse
    import io
    return StreamingResponse(
        io.BytesIO(b"test content"),
        media_type="application/pdf",
        headers={"Content-Disposition": "attachment; filename=test.pdf"}
    )
