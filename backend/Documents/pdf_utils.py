from PyPDF2 import PdfReader, PdfWriter
from reportlab.pdfgen import canvas
from reportlab.lib.pagesizes import letter
from io import BytesIO
from django.http import HttpResponse


def create_pdf_with_metadata(
    document, company_name, employee_name, employee_id, duration, position, company_logo
):
    """Create a PDF with the specified metadata and save it to the output path."""
    # Leer el PDF original
    document.document_pdf.seek(0)
    existing_pdf = PdfReader(document.document_pdf)
    output = PdfWriter()

    # Crear un nuevo PDF con el texto
    packet = BytesIO()
    can = canvas.Canvas(packet, pagesize=letter)
    can.setFont("Helvetica", 12)
    page_width, page_height = letter

    # Agregar logo de la empresa si está presente
    if company_logo:
        can.drawImage(company_logo, 40, page_height - 100, width=100, height=50)

    # Agregar el contenido del documento
    can.drawString(
        40,
        page_height - 150,
        f"We, {company_name}, confirm that Mr. or Ms. {employee_name},",
    )
    can.drawString(
        40,
        page_height - 170,
        f"identified with ID number {employee_id}, worked at our company for {duration},",
    )
    can.drawString(40, page_height - 190, f"holding the position of {position}.")
    can.drawString(
        40,
        page_height - 210,
        "Their performance and work commitment were in line with our organization's expectations.",
    )
    can.drawString(
        40,
        page_height - 250,
        "This document is issued at the request of the interested party, for any legal purposes they deem appropriate.",
    )
    can.drawString(40, page_height - 290, "Sincerely,")
    can.drawString(40, page_height - 350, "__________________________")
    can.drawString(40, page_height - 370, "Company signature and seal")

    can.save()

    # Mover al inicio del buffer
    packet.seek(0)
    new_pdf = PdfReader(packet)

    # Agregar el texto solo a la última página del PDF existente
    for page_num in range(len(existing_pdf.pages)):
        page = existing_pdf.pages[page_num]
        if page_num == len(existing_pdf.pages) - 1:
            page.merge_page(new_pdf.pages[0])
        output.add_page(page)

    # Guardar el PDF modificado en un archivo temporal
    output_stream = BytesIO()
    output.write(output_stream)
    output_stream.seek(0)

    # Crear la respuesta HTTP con el PDF
    response = HttpResponse(output_stream, content_type="application/pdf")
    response["Content-Disposition"] = 'attachment; filename="generated_document.pdf"'
    return response
