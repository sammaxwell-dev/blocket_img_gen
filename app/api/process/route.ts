
import { NextRequest, NextResponse } from "next/server";
import { processImageWithVariations } from "@/lib/ai-services";

export async function POST(req: NextRequest) {
    try {
        const formData = await req.formData();
        const file = formData.get("file") as File;

        if (!file) {
            return NextResponse.json({ error: "No file provided" }, { status: 400 });
        }

        // Convert File to Buffer
        const arrayBuffer = await file.arrayBuffer();
        const buffer = Buffer.from(arrayBuffer);

        console.log("Processing image with 3 variations...");
        const result = await processImageWithVariations(buffer);
        console.log("Processing complete.");

        return NextResponse.json({
            original: result.original,
            variations: result.variations,
            success: true
        });

    } catch (error: any) {
        console.error("Processing error:", error);
        return NextResponse.json({ error: error.message || "Internal Server Error" }, { status: 500 });
    }
}
