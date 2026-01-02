import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
    try {
        const formData = await request.formData();
        const files = formData.getAll("files") as File[];

        if (files.length === 0) {
            return NextResponse.json({ error: "No files provided" }, { status: 400 });
        }

        // MOCK IMPLEMENTATION:
        // In a real app, we would upload to Vercel Blob here.
        // For now, we simulate a delay and return fake URLs.

        await new Promise((resolve) => setTimeout(resolve, 1500)); // Simulate network delay

        const uploadedFiles = files.map((file, index) => ({
            id: `file-${Date.now()}-${index}`,
            url: URL.createObjectURL(file), // This won't work on server, usually. 
            // For a real mock that works in browser, we might just echo back metadata.
            // Since we need to show "something" in the next steps, we'll just return success metadata
            // and let the client handle the "preview" from local state for now.
            name: file.name,
            size: file.size,
        }));

        return NextResponse.json({
            success: true,
            files: uploadedFiles,
            message: "Files uploaded successfully (Mock)"
        });

    } catch (error) {
        console.error("Upload error:", error);
        return NextResponse.json({ error: "Upload failed" }, { status: 500 });
    }
}
