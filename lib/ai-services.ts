import { GoogleGenAI } from "@google/genai";

if (!process.env.GOOGLE_API_KEY) {
    throw new Error("Missing GOOGLE_API_KEY");
}

const ai = new GoogleGenAI({ apiKey: process.env.GOOGLE_API_KEY });

// Модели
const IMAGE_MODEL = "gemini-3-pro-image-preview"; // Nano Banana Pro для генерации
const ANALYSIS_MODEL = "gemini-2.5-flash"; // Быстрая модель для анализа

// Контексты для разных категорий товаров
const CATEGORY_CONTEXTS: Record<string, Array<{ name: string; scene: string }>> = {
    "electronics_computer": [
        { name: "Gaming Setup", scene: "professional gaming desk with RGB lighting, gaming monitor, keyboard, mouse, evening atmosphere with colorful accent lights" },
        { name: "Home Office", scene: "clean minimalist desk, natural daylight, plant decoration, Scandinavian-style aesthetic" },
        { name: "Tech Studio", scene: "modern tech workspace, multiple monitors, professional lighting, sleek and futuristic" }
    ],
    "electronics_phone": [
        { name: "Lifestyle", scene: "held in hand at a coffee shop, modern cafe background, natural lighting" },
        { name: "Desk Shot", scene: "laying on a clean marble or wooden desk, minimal accessories, soft shadows" },
        { name: "Tech Display", scene: "standing on a wireless charger, modern home interior background, ambient lighting" }
    ],
    "vehicle_car": [
        { name: "Street Parking", scene: "parked on a clean city street, urban environment, good lighting, realistic setting" },
        { name: "Scenic Drive", scene: "parked in a scenic location, nature or mountain backdrop, golden hour lighting" },
        { name: "Showroom", scene: "in a professional car showroom or garage, polished floor, professional lighting" }
    ],
    "vehicle_motorcycle": [
        { name: "Urban Street", scene: "parked on a city street, urban backdrop, evening lighting" },
        { name: "Open Road", scene: "on a scenic highway or mountain road, adventure feeling" },
        { name: "Garage", scene: "in a clean garage or workshop, professional display" }
    ],
    "furniture": [
        { name: "Living Room", scene: "in a stylish living room, coordinated decor, natural daylight" },
        { name: "Showroom", scene: "in a furniture showroom, professional lighting, clean background" },
        { name: "Cozy Home", scene: "in a warm, cozy home environment, evening lighting, comfortable atmosphere" }
    ],
    "clothing": [
        { name: "Fashion Shot", scene: "flat lay on a clean background, styled with accessories" },
        { name: "Lifestyle", scene: "in a stylish room or outdoor setting, lifestyle context" },
        { name: "Studio", scene: "on a mannequin or hanger, professional studio lighting, clean backdrop" }
    ],
    "sports_equipment": [
        { name: "In Action", scene: "in appropriate sports environment (gym, field, court)" },
        { name: "Clean Display", scene: "on a clean surface with related gear, professional lighting" },
        { name: "Lifestyle", scene: "in a home gym or outdoor setting, active lifestyle context" }
    ],
    "home_appliance": [
        { name: "Kitchen", scene: "in a modern kitchen, on countertop, natural lighting" },
        { name: "Lifestyle", scene: "being used in a realistic home setting" },
        { name: "Clean Display", scene: "on a clean surface, studio lighting, product focus" }
    ],
    "default": [
        { name: "Professional", scene: "on a clean surface with professional studio lighting, neutral background" },
        { name: "Lifestyle", scene: "in a realistic home or office environment, natural lighting" },
        { name: "Context Shot", scene: "in an appropriate setting for this type of product, showing it in use" }
    ]
};

// Анализ изображения для определения категории товара
async function analyzeProductCategory(imageBuffer: Buffer): Promise<string> {
    try {
        const imageBase64 = imageBuffer.toString("base64");

        const response = await ai.models.generateContent({
            model: ANALYSIS_MODEL,
            contents: [
                {
                    inlineData: {
                        mimeType: "image/jpeg",
                        data: imageBase64
                    }
                },
                {
                    text: `Analyze this product image and categorize it. Return ONLY one of these exact category codes:

- electronics_computer (PC, laptop, monitor, keyboard, gaming gear)
- electronics_phone (smartphone, tablet, smartwatch)
- vehicle_car (car, SUV, truck)
- vehicle_motorcycle (motorcycle, scooter, bike)
- furniture (chair, table, sofa, bed, shelf)
- clothing (clothes, shoes, bags, accessories)
- sports_equipment (gym equipment, sports gear, outdoor gear)
- home_appliance (kitchen appliances, home devices)
- default (anything else)

Return ONLY the category code, nothing else.`
                }
            ]
        });

        const category = response.text?.trim().toLowerCase() || "default";
        console.log(`Product category detected: ${category}`);

        // Validate category exists
        if (CATEGORY_CONTEXTS[category]) {
            return category;
        }
        return "default";
    } catch (error) {
        console.error("Category analysis error:", error);
        return "default";
    }
}

interface ProcessingResult {
    name: string;
    imageUrl: string;
}

// Генерация одного изображения в контексте
async function generateInContext(
    imageBuffer: Buffer,
    contextName: string,
    sceneDescription: string
): Promise<ProcessingResult | null> {
    try {
        const imageBase64 = imageBuffer.toString("base64");

        const prompt = `Using the provided product image as reference, place this EXACT product into a new scene.

NEW SCENE: ${sceneDescription}

CRITICAL REQUIREMENTS:
1. The product must look EXACTLY like in the reference - same model, colors, details, branding
2. Only change the environment/background around the product
3. Make it look like a professional product photo for e-commerce
4. The scene should look realistic and natural
5. High quality, professional photography lighting

Generate the image now.`;

        console.log(`Generating: ${contextName}...`);

        const response = await ai.models.generateContent({
            model: IMAGE_MODEL,
            contents: [
                {
                    inlineData: {
                        mimeType: "image/jpeg",
                        data: imageBase64
                    }
                },
                { text: prompt }
            ],
            config: {
                responseModalities: ["Text", "Image"]
            }
        });

        if (!response.candidates?.[0]?.content?.parts) {
            console.error(`No response for ${contextName}`);
            return null;
        }

        for (const part of response.candidates[0].content.parts) {
            if (part.inlineData) {
                console.log(`✓ Generated: ${contextName}`);
                return {
                    name: contextName,
                    imageUrl: `data:${part.inlineData.mimeType};base64,${part.inlineData.data}`
                };
            }
        }

        return null;
    } catch (error: any) {
        console.error(`Error generating ${contextName}:`, error.message || error);
        return null;
    }
}

// Основная функция
export const processImageWithVariations = async (imageBuffer: Buffer): Promise<{
    original: string;
    variations: ProcessingResult[];
    category: string;
}> => {
    console.log("------- SMART CONTEXT GENERATION START -------");

    // 1. Определяем категорию товара
    const category = await analyzeProductCategory(imageBuffer);
    const contexts = CATEGORY_CONTEXTS[category] || CATEGORY_CONTEXTS["default"];

    console.log(`Using contexts for: ${category}`);
    console.log(`Generating ${contexts.length} variations...`);

    // 2. Конвертируем оригинал в base64
    const originalBase64 = `data:image/jpeg;base64,${imageBuffer.toString("base64")}`;

    // 3. Генерируем все вариации параллельно
    const results = await Promise.all(
        contexts.map(ctx => generateInContext(imageBuffer, ctx.name, ctx.scene))
    );

    // 4. Фильтруем успешные результаты
    const variations = results.filter((r): r is ProcessingResult => r !== null);

    console.log(`Generated ${variations.length}/${contexts.length} variations successfully`);
    console.log("------- SMART CONTEXT GENERATION END -------");

    return {
        original: originalBase64,
        variations,
        category
    };
};

// Для обратной совместимости
export const processImageWithGemini = async (imageBuffer: Buffer): Promise<string> => {
    const result = await processImageWithVariations(imageBuffer);
    if (result.variations.length > 0) {
        return result.variations[0].imageUrl;
    }
    throw new Error("Failed to generate any variations");
};
