import { NextRequest, NextResponse } from "next/server";
import { processImageWithVariations, ProcessingMode } from "@/lib/ai-services";
import { checkAndIncrementUsage, getUserTier } from "@/lib/rate-limit";
import { createClient } from "@/lib/supabase/server";

export async function POST(req: NextRequest) {
    try {
        const formData = await req.formData();
        const file = formData.get("file") as File;
        const mode = (formData.get("mode") as ProcessingMode) || "angles";
        const fingerprint = formData.get("fingerprint") as string | null;

        if (!file) {
            return NextResponse.json({ error: "No file provided" }, { status: 400 });
        }

        // Получаем пользователя
        const supabase = await createClient();
        const { data: { user } } = await supabase.auth.getUser();

        // Определяем идентификатор и tier
        let identifier: string;
        let identifierType: 'user' | 'fingerprint';
        const tier = await getUserTier(user?.id);

        if (user) {
            identifier = user.id;
            identifierType = 'user';
        } else if (fingerprint) {
            identifier = fingerprint;
            identifierType = 'fingerprint';
        } else {
            // Без fingerprint используем IP (fallback)
            identifier = req.headers.get('x-forwarded-for') || 'unknown';
            identifierType = 'fingerprint';
        }

        // Проверяем лимит
        const usage = await checkAndIncrementUsage(identifier, identifierType, tier);
        if (!usage.allowed) {
            return NextResponse.json({
                error: "Daily limit reached",
                usage: {
                    used: usage.used,
                    limit: usage.limit,
                    remaining: 0,
                },
                upgrade: tier !== 'pro',
            }, { status: 429 });
        }

        // Validate mode
        const validModes: ProcessingMode[] = ["angles", "studio"];
        const selectedMode = validModes.includes(mode) ? mode : "angles";

        // Convert File to Buffer
        const arrayBuffer = await file.arrayBuffer();
        const buffer = Buffer.from(arrayBuffer);

        console.log(`Processing image in ${selectedMode} mode...`);
        const result = await processImageWithVariations(buffer, selectedMode);
        console.log("Processing complete.");

        return NextResponse.json({
            original: result.original,
            variations: result.variations,
            mode: result.mode,
            usage: {
                used: usage.used,
                limit: usage.limit,
                remaining: usage.remaining,
            },
            success: true
        });

    } catch (error: any) {
        console.error("Processing error:", error);
        return NextResponse.json({ error: error.message || "Internal Server Error" }, { status: 500 });
    }
}
