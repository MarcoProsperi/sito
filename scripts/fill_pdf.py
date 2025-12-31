import sys
import json
import io
from pypdf import PdfReader, PdfWriter
from reportlab.pdfgen import canvas
from reportlab.lib.pagesizes import A4
from reportlab.lib.colors import black
import argparse
import os

def fill_pdf(data, output_path, template_path):
    # Load the template
    reader = PdfReader(template_path)
    page = reader.pages[0]
    
    # Create a temporary PDF with the overlaid text
    packet = io.BytesIO()
    can = canvas.Canvas(packet, pagesize=A4)
    can.setFont("Helvetica", 10)
    can.setFillColor(black)

    # Mapping form data to coordinates (adjusted based on analysis)
    # The extracted coordinates were negative and shifted. 
    # Reference: "Nome" label was at y=283.0, "Email" at y=-874.0
    # Let's use a scale/offset transformation.
    # We will place the text to the right of the labels.
    
    # Base X offsets for first and second column
    COL1_X = 120 # Right after "Nome", "Nato/a a", etc.
    COL2_X = 400 # Right after "Cognome", "Data di nascita", etc.
    
    # Y-coordinates mapped manually to typical A4 points (0,0 is bottom-left)
    # Total range was ~1150 in the extraction, but we map to ~800 heights.
    # Labels start about 150pt from top.
    Y_START = 738
    Y_STEP = 24 # Standard line height
    
    # Mapping table (Field Name -> [x, y])
    # PAGE 1
    # Atleta
    can.drawString(120, 697, data.get('nomeAtleta', '').title())
    can.drawString(380, 697, data.get('cognomeAtleta', '').title())
    
    can.drawString(120, 656, data.get('luogoNascita', '').title())
    can.drawString(390, 656, data.get('dataNascita', ''))
    
    can.drawString(150, 614, data.get('cittadinanza', 'Italiana').title())
    
    can.drawString(160, 582, data.get('cittaAtleta', '').title())
    can.drawString(470, 582, data.get('provAtleta', '').upper())
    can.drawString(160, 560, data.get('indirizzoAtleta', '').title())
    
    can.drawString(210, 528, data.get('codiceFiscaleAtleta', '').upper())
    
    # Genitore
    can.drawString(160, 477, f"{data.get('nomeGenitore', '').title()} {data.get('cognomeGenitore', '').title()}")
    can.drawString(100, 450, data.get('codiceFiscaleGenitore', '').upper()) # User asked to remove
    can.drawString(360, 450, data.get('telefono', ''))
    can.drawString(120, 420, data.get('email', ''))

    can.save()

    packet.seek(0)
    new_pdf = PdfReader(packet)
    
    # Overlay the new content onto the template
    writer = PdfWriter()
    page.merge_page(new_pdf.pages[0])
    writer.add_page(page)
    
    # Add other pages as they are
    for i in range(1, len(reader.pages)):
        writer.add_page(reader.pages[i])

    with open(output_path, "wb") as output_file:
        writer.write(output_file)

if __name__ == "__main__":
    parser = argparse.ArgumentParser()
    parser.add_argument("--data", type=str, required=True, help="JSON string with form data")
    parser.add_argument("--output", type=str, help="Output file path", default="filled_form.pdf")
    parser.add_argument("--template", type=str, help="Template file path", default="public/pdf/modulo-iscrizione-minibasket-25-26.pdf")
    args = parser.parse_args()

    try:
        data = json.loads(args.data)
        fill_pdf(data, args.output, args.template)
        print(f"PDF successfully generated at {args.output}")
    except Exception as e:
        print(f"Error generating PDF: {e}")
        sys.exit(1)
