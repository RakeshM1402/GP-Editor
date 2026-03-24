import fitz
import io


def process_pdf(
    pdf_data: bytes,
    student_text: str,
    parent_text: str
) -> bytes:
    """
    Process PDF by replacing 'text' placeholders on the last page.
    First occurrence -> student_text
    Second occurrence -> parent_text
    """
    doc = fitz.open(stream=pdf_data)
    
    if len(doc) == 0:
        raise ValueError("PDF is empty")
    
    last_page = doc[-1]
    page_width = last_page.rect.width
    mid_x = page_width / 2
    
    # Get text positions
    words = last_page.get_text("words")
    left_bbox = None
    right_bbox = None
    
    for w in words:
        if "text" in w[4].lower():
            r = fitz.Rect(w[:4])
            if r.x0 < mid_x:
                left_bbox = r
            else:
                right_bbox = r
    
    # Draw white rectangles to cover old text - NO redaction, just overlay
    if left_bbox:
        # Cover the exact text area
        cover_rect = fitz.Rect(left_bbox.x0 - 1, left_bbox.y0 - 1, left_bbox.x1 + 1, left_bbox.y1 + 1)
        last_page.draw_rect(cover_rect, color=(1, 1, 1), fill=(1, 1, 1))
        
    if right_bbox:
        cover_rect = fitz.Rect(right_bbox.x0 - 1, right_bbox.y0 - 1, right_bbox.x1 + 1, right_bbox.y1 + 1)
        last_page.draw_rect(cover_rect, color=(1, 1, 1), fill=(1, 1, 1))
    
    # Insert new text
    if left_bbox:
        last_page.insert_text(
            (left_bbox.x0, left_bbox.y1 - 3),
            student_text,
            fontsize=14,
            fontname="helv",
            color=(0, 0, 0)
        )
        
    if right_bbox:
        last_page.insert_text(
            (right_bbox.x0, right_bbox.y1 - 3),
            parent_text,
            fontsize=14,
            fontname="helv",
            color=(0, 0, 0)
        )
    
    output_buffer = io.BytesIO()
    doc.save(output_buffer)
    doc.close()
    
    return output_buffer.getvalue()
