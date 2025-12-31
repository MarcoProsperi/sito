import { NextRequest, NextResponse } from 'next/server';
import { spawn } from 'child_process';
import path from 'path';
import fs from 'fs';
import { v4 as uuidv4 } from 'uuid';

export async function POST(req: NextRequest) {
    try {
        const formData = await req.json();

        // Prepare paths
        const scriptPath = path.join(process.cwd(), 'scripts', 'fill_pdf.py');
        const templatePath = path.join(process.cwd(), 'public', 'pdf', 'modulo-iscrizione-minibasket-25-26.pdf');
        const outputFilename = `modulo_${uuidv4()}.pdf`;
        const outputPath = path.join(process.cwd(), 'public', 'temp', outputFilename);

        // Ensure temp directory exists
        const tempDir = path.join(process.cwd(), 'public', 'temp');
        if (!fs.existsSync(tempDir)) {
            fs.mkdirSync(tempDir, { recursive: true });
        }

        // Stringify form data for python
        const jsonData = JSON.stringify(formData);

        // Spawn python process
        return new Promise((resolve) => {
            const pythonProcess = spawn('python', [
                scriptPath,
                '--data', jsonData,
                '--output', outputPath,
                '--template', templatePath
            ]);

            let errorData = '';
            pythonProcess.stderr.on('data', (data) => {
                errorData += data.toString();
            });

            pythonProcess.on('close', (code) => {
                if (code !== 0) {
                    console.error(`Python script failed with code ${code}: ${errorData}`);
                    resolve(NextResponse.json({ error: 'Failed to generate PDF' }, { status: 500 }));
                    return;
                }

                if (!fs.existsSync(outputPath)) {
                    console.error('Output file was not created');
                    resolve(NextResponse.json({ error: 'PDF file not found' }, { status: 500 }));
                    return;
                }

                // Read the file and return it
                const fileBuffer = fs.readFileSync(outputPath);

                // Clean up temp file after reading
                try {
                    fs.unlinkSync(outputPath);
                } catch (e) {
                    console.error('Failed to delete temp file:', e);
                }

                resolve(new NextResponse(fileBuffer, {
                    status: 200,
                    headers: {
                        'Content-Type': 'application/pdf',
                        'Content-Disposition': `attachment; filename="modulo-iscrizione-virtus.pdf"`,
                    },
                }));
            });
        });

    } catch (error) {
        console.error('Error generating PDF:', error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}
