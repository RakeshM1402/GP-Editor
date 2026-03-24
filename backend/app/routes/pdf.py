from fastapi import APIRouter, UploadFile, File, Form, HTTPException
from fastapi.responses import Response
from ..services.pdf_processor import process_pdf

router = APIRouter(prefix="/api/pdf", tags=["pdf"])


@router.post("/process")
async def process_pdf_endpoint(
    file: UploadFile = File(...),
    student_text: str = Form(...),
    parent_text: str = Form(...)
):
    if file.content_type != "application/pdf":
        raise HTTPException(status_code=400, detail="Only PDF files are accepted")
    
    try:
        pdf_data = await file.read()
        processed_pdf = process_pdf(pdf_data, student_text, parent_text)
        
        return Response(
            content=processed_pdf,
            media_type="application/pdf",
            headers={
                "Content-Disposition": f"attachment; filename=processed_{file.filename}"
            }
        )
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Failed to process PDF: {str(e)}")
