import { GoogleGenAI } from "@google/genai";

if (!process.env.GOOGLE_API_KEY) {
    throw new Error("Missing GOOGLE_API_KEY");
}

const ai = new GoogleGenAI({ apiKey: process.env.GOOGLE_API_KEY });

// Используем Nano Banana Pro (gemini-3-pro-image-preview) для лучшего качества
const MODEL_NAME = "gemini-3-pro-image-preview";

// Три разных контекста/сцены для продуктового фото
const VARIATION_PROMPTS = [
    {
        name: "Gaming Setup",
        prompt: `Using the provided product image as reference, place this EXACT product into a professional gaming setup scene.

SCENE: Modern gaming desk with RGB lighting
- Place this exact product on a stylish desk next to a gaming monitor
- Add keyboard, mouse, and ambient RGB lighting in the background
- Evening atmosphere with colorful accent lights (purple, blue, orange)
- Professional product photography quality

Keep the product looking EXACTLY like in the reference image - same model, same colors, same details. Only change the environment around it.`
    },
    {
        name: "Clean Desk Setup",
        prompt: `Using the provided product image as reference, place this EXACT product into a clean, minimal desk setup.

SCENE: Minimalist home office
- Place this exact product on a clean white or wooden desk
- Simple, uncluttered environment with natural daylight
- Maybe a plant or simple decor in the background
- Bright, airy, Scandinavian-style aesthetic
- Professional product photography quality

Keep the product looking EXACTLY like in the reference image - same model, same colors, same details. Only change the environment around it.`
    },
    {
        name: "Lifestyle Shot",
        prompt: `Using the provided product image as reference, place this EXACT product into a lifestyle home environment.

SCENE: Cozy living room or bedroom corner
- Place this exact product in a realistic home setting
- Show how it would look in someone's actual living space
- Warm, inviting lighting and comfortable atmosphere
- Real-life context that helps buyers visualize owning it
- Professional product photography quality

Keep the product looking EXACTLY like in the reference image - same model, same colors, same details. Only change the environment around it.`
    }
];

interface ProcessingResult {
    name: string;
    imageUrl: string;
}

// Обработка одного изображения с конкретным промптом
const processWithPrompt = async (imageBuffer: Buffer, promptConfig: typeof VARIATION_PROMPTS[0]): Promise<ProcessingResult | null> => {
    try {
        const imageBase64 = imageBuffer.toString("base64");

        // Формат из документации: сначала изображение, потом текст
        const contents = [
            {
                inlineData: {
                    mimeType: "image/jpeg",
                    data: imageBase64
                }
            },
            { text: promptConfig.prompt }
        ];

        console.log(`Sending request for: ${promptConfig.name}...`);

        const response = await ai.models.generateContent({
            model: MODEL_NAME,
            contents: contents,
            config: {
                responseModalities: ["Text", "Image"]
            }
        });

        if (!response.candidates || response.candidates.length === 0) {
            console.error(`No candidates for ${promptConfig.name}`);
            return null;
        }

        const parts = response.candidates[0].content?.parts;
        if (!parts || parts.length === 0) {
            console.error(`No parts for ${promptConfig.name}`);
            return null;
        }

        // Ищем изображение в ответе
        for (const part of parts) {
            if (part.text) {
                console.log(`[${promptConfig.name}] Text:`, part.text.substring(0, 100));
            }
            if (part.inlineData) {
                console.log(`✓ Generated: ${promptConfig.name}`);
                return {
                    name: promptConfig.name,
                    imageUrl: `data:${part.inlineData.mimeType};base64,${part.inlineData.data}`
                };
            }
        }

        console.error(`No image in response for ${promptConfig.name}`);
        return null;
    } catch (error: any) {
        console.error(`Error generating ${promptConfig.name}:`, error.message || error);
        return null;
    }
};

// Основная функция: генерирует 3 вариации изображения
export const processImageWithVariations = async (imageBuffer: Buffer): Promise<{
    original: string;
    variations: ProcessingResult[];
}> => {
    console.log("------- NANO BANANA PRO START -------");
    console.log(`Model: ${MODEL_NAME}`);
    console.log("Generating 3 lighting variations...");

    // Конвертируем оригинал в base64 для превью
    const originalBase64 = `data:image/jpeg;base64,${imageBuffer.toString("base64")}`;

    // Запускаем все 3 вариации параллельно
    const results = await Promise.all(
        VARIATION_PROMPTS.map(prompt => processWithPrompt(imageBuffer, prompt))
    );

    // Фильтруем успешные результаты
    const variations = results.filter((r): r is ProcessingResult => r !== null);

    console.log(`Generated ${variations.length}/3 variations successfully`);
    console.log("------- NANO BANANA PRO END -------");

    return {
        original: originalBase64,
        variations
    };
};

// Старая функция для обратной совместимости
export const processImageWithGemini = async (imageBuffer: Buffer): Promise<string> => {
    const result = await processImageWithVariations(imageBuffer);
    if (result.variations.length > 0) {
        return result.variations[0].imageUrl;
    }
    throw new Error("Failed to generate any variations");
};
