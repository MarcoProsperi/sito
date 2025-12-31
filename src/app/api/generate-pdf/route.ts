import { NextRequest, NextResponse } from 'next/server';
import { spawn } from 'child_process';
import path from 'path';
import fs from 'fs';
import { v4 as uuidv4 } from 'uuid';

export async function POST(req: NextRequest) {
    try {
        const body = await req.json();
        const { formType, ...formData } = body;

        // Selection of template based on formType
        const templateFile = formType === 'basket'
            ? 'modulo-iscrizione-basket-25-26.pdf'
            : 'modulo-iscrizione-minibasket-25-26.pdf';

        // Prepare paths
        const scriptPath = path.join(process.cwd(), 'scripts', 'fill_pdf.py');
        const templatePath = path.join(process.cwd(), 'public', 'pdf', templateFile);
        const outputFilename = `modulo_${uuidv4()}.pdf`;
        const tempDir = path.join(process.cwd(), 'public', 'temp');
        const outputPath = path.join(tempDir, outputFilename);

        // Ensure temp directory exists
        if (!fs.existsSync(tempDir)) {
            fs.mkdirSync(tempDir, { recursive: true });
        }

        const jsonData = JSON.stringify(formData);

        // Run Python script to generate PDF
        await new Promise((resolve, reject) => {
            const pythonProcess = spawn('python', [scriptPath, '--data', jsonData, '--output', outputPath, '--template', templatePath]);
            let errorData = '';
            pythonProcess.stderr.on('data', (data) => errorData += data.toString());
            pythonProcess.on('close', (code) => {
                if (code !== 0) {
                    console.error(`Python script failed: ${errorData}`);
                    reject(new Error('Failed to generate PDF'));
                } else if (!fs.existsSync(outputPath)) {
                    reject(new Error('PDF file was not created'));
                } else {
                    resolve(true);
                }
            });
        });

        // Read the generated PDF
        const fileBuffer = fs.readFileSync(outputPath);

        // Clean up temp file
        try {
            fs.unlinkSync(outputPath);
        } catch (e) {
            console.error('Failed to delete temp file:', e);
        }

        return new NextResponse(fileBuffer, {
            status: 200,
            headers: {
                'Content-Type': 'application/pdf',
                'Content-Disposition': `attachment; filename="modulo-iscrizione-virtus.pdf"`,
            },
        });

    } catch (error) {
        console.error('Error in generate-pdf route:', error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}
