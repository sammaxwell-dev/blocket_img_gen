import { GoogleGenAI } from "@google/genai";

if (!process.env.GOOGLE_API_KEY) {
    throw new Error("Missing GOOGLE_API_KEY");
}

const ai = new GoogleGenAI({ apiKey: process.env.GOOGLE_API_KEY });

// Модели
const IMAGE_MODEL = "gemini-3-pro-image-preview";
const ANALYSIS_MODEL = "gemini-2.5-flash";

// Режимы обработки
export type ProcessingMode = "angles" | "studio";

// Описания режимов для UI
export const PROCESSING_MODES = {
    angles: {
        name: "Pro Angles",
        description: "Same background, but shot from professional camera angles with perfect lighting.",
        icon: "📐"
    },
    studio: {
        name: "Studio",
        description: "Complete transformation with professional studio backgrounds.",
        icon: "📸"
    }
} as const;

// Профессиональные ракурсы — как в каталогах и e-commerce
const PROFESSIONAL_ANGLES = [
    {
        name: "Hero Shot",
        prompt: `CAMERA ANGLE: 3/4 front view, camera positioned 30 degrees to the left, slightly elevated at 15 degrees above the product

PROFESSIONAL PHOTOGRAPHY STYLE:
- Shallow depth of field (f/2.8) - product sharp, background softly blurred
- Soft key light from the upper left creating gentle highlights
- Fill light from the right to reduce harsh shadows
- Subtle rim lighting from behind to separate product from background
- Colors slightly enhanced for vibrancy
- Professional product photography composition with the rule of thirds`
    },
    {
        name: "Overhead Flat Lay",
        prompt: `CAMERA ANGLE: Perfectly overhead, 90 degrees looking straight down (flat lay perspective)

PROFESSIONAL PHOTOGRAPHY STYLE:
- Even, diffused lighting from above (like a light tent)
- No harsh shadows - soft shadows only for depth
- High clarity and sharpness across entire product
- Clean, balanced composition centered in frame
- Color accurate with professional white balance
- The kind of overhead shot you'd see in magazines or Instagram`
    },
    {
        name: "Detail Beauty Shot",
        prompt: `CAMERA ANGLE: Close-up macro perspective focusing on the most interesting detail, texture, or branding of the product

PROFESSIONAL PHOTOGRAPHY STYLE:
- Extremely shallow depth of field (f/1.8) - only key detail in focus
- Beautiful bokeh in unfocused areas
- Dramatic but soft directional lighting highlighting texture
- High-end beauty product photography aesthetic
- Professional focus stacking if needed for sharpness
- The kind of detail shot that makes products look premium and luxurious`
    }
];

// Studio контексты для разных категорий
const STUDIO_CONTEXTS: Record<string, Array<{ name: string; scene: string }>> = {
    "electronics": [
        { name: "Tech Showcase", scene: "sleek dark surface with subtle gradient lighting, tech product photography style, dramatic rim lighting" },
        { name: "Minimalist White", scene: "pure white infinity curve background, soft even lighting, Apple-style product photography" },
        { name: "Premium Display", scene: "glossy black reflective surface, professional studio lighting with highlights" }
    ],
    "furniture": [
        { name: "Modern Interior", scene: "stylish Scandinavian living room, natural window light, interior design magazine style" },
        { name: "Showroom", scene: "professional furniture showroom with perfect lighting, clean minimal background" },
        { name: "Lifestyle", scene: "cozy home environment, warm evening lighting, inviting atmosphere" }
    ],
    "clothing": [
        { name: "Fashion Editorial", scene: "high-end fashion photography backdrop, dramatic lighting, magazine quality" },
        { name: "Clean Studio", scene: "pure white background, professional fashion photography lighting" },
        { name: "Lifestyle Flat Lay", scene: "styled flat lay with complementary accessories, overhead professional lighting" }
    ],
    "default": [
        { name: "Premium White", scene: "clean white infinity curve, soft professional lighting, e-commerce standard" },
        { name: "Dark Elegant", scene: "dark gradient background with dramatic rim lighting, luxury product style" },
        { name: "Natural Light", scene: "near a window with beautiful natural light, lifestyle product photography" }
    ]
};

interface ProcessingResult {
    name: string;
    imageUrl: string;
}

// Анализ изображения для понимания контекста
async function analyzeImageContext(imageBuffer: Buffer): Promise<{
    productDescription: string;
    surfaceDescription: string;
    lightingDescription: string;
    category: string;
}> {
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
                    text: `Analyze this product photo. Return a JSON object:
{
  "productDescription": "Detailed description of the product",
  "surfaceDescription": "Description of the surface/background",
  "lightingDescription": "Current lighting conditions",
  "category": "One of: electronics, furniture, clothing, default"
}

Return ONLY the JSON, no other text.`
                }
            ]
        });

        const text = response.text?.trim() || "{}";
        const jsonMatch = text.match(/\{[\s\S]*\}/);
        if (jsonMatch) {
            const parsed = JSON.parse(jsonMatch[0]);
            return {
                productDescription: parsed.productDescription || "a product",
                surfaceDescription: parsed.surfaceDescription || "a surface",
                lightingDescription: parsed.lightingDescription || "ambient lighting",
                category: parsed.category || "default"
            };
        }

        return {
            productDescription: "a product",
            surfaceDescription: "a surface",
            lightingDescription: "ambient lighting",
            category: "default"
        };
    } catch (error) {
        console.error("Context analysis error:", error);
        return {
            productDescription: "a product",
            surfaceDescription: "a surface",
            lightingDescription: "ambient lighting",
            category: "default"
        };
    }
}

// Генерация профессионального ракурса (режим Angles)
async function generateProfessionalAngle(
    imageBuffer: Buffer,
    angleConfig: typeof PROFESSIONAL_ANGLES[0],
    context: { productDescription: string; surfaceDescription: string }
): Promise<ProcessingResult | null> {
    try {
        const imageBase64 = imageBuffer.toString("base64");

        const prompt = `You are an elite commercial product photographer creating images for a high-end e-commerce catalog.

PRODUCT: ${context.productDescription}
ORIGINAL SURFACE TO KEEP: ${context.surfaceDescription}

${angleConfig.prompt}

ABSOLUTE REQUIREMENTS:
1. The product must be IDENTICAL to the reference - exact same item, colors, details, logos
2. KEEP the original surface/background from the photo - same table, same setting
3. Transform ONLY the camera angle and lighting to be professional quality
4. The result must look like it was shot by a professional photographer with $5000 camera equipment
5. Apply professional color grading - slightly enhanced but natural
6. The lighting should be dramatically improved - soft, professional, flattering
7. This should look like a photo from a professional product catalog, NOT an amateur snapshot
8. Add subtle professional touches: perfect exposure, ideal white balance, professional composition

Generate this professional product photograph now.`;

        console.log(`Generating: ${angleConfig.name}...`);

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
            console.error(`No response for ${angleConfig.name}`);
            return null;
        }

        for (const part of response.candidates[0].content.parts) {
            if (part.inlineData) {
                console.log(`✓ Generated: ${angleConfig.name}`);
                return {
                    name: angleConfig.name,
                    imageUrl: `data:${part.inlineData.mimeType};base64,${part.inlineData.data}`
                };
            }
        }

        return null;
    } catch (error: any) {
        console.error(`Error generating ${angleConfig.name}:`, error.message || error);
        return null;
    }
}

// Генерация студийного фото (режим Studio)
async function generateStudioShot(
    imageBuffer: Buffer,
    sceneName: string,
    sceneDescription: string,
    productDescription: string
): Promise<ProcessingResult | null> {
    try {
        const imageBase64 = imageBuffer.toString("base64");

        const prompt = `You are an elite commercial product photographer creating images for a luxury brand catalog.

PRODUCT TO PHOTOGRAPH: ${productDescription}

NEW PROFESSIONAL STUDIO SETTING: ${sceneDescription}

REQUIREMENTS:
1. The product must be IDENTICAL to the reference - exact same item, every detail preserved
2. Place the product in a completely new, professional studio environment
3. Use professional studio lighting techniques:
   - Key light, fill light, and rim/back light
   - Soft shadows, no harsh dark areas
   - Professional catchlights and highlights
4. The composition should follow product photography best practices
5. This must look like a $500/shot professional product photograph
6. High-end retouching quality - perfect exposure, color, and sharpness
7. The background should complement the product, not distract from it

Generate this professional studio product photograph now.`;

        console.log(`Generating: Studio - ${sceneName}...`);

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
            console.error(`No response for Studio - ${sceneName}`);
            return null;
        }

        for (const part of response.candidates[0].content.parts) {
            if (part.inlineData) {
                console.log(`✓ Generated: Studio - ${sceneName}`);
                return {
                    name: sceneName,
                    imageUrl: `data:${part.inlineData.mimeType};base64,${part.inlineData.data}`
                };
            }
        }

        return null;
    } catch (error: any) {
        console.error(`Error generating Studio - ${sceneName}:`, error.message || error);
        return null;
    }
}

// Основная функция обработки
export const processImageWithVariations = async (
    imageBuffer: Buffer,
    mode: ProcessingMode = "angles"
): Promise<{
    original: string;
    variations: ProcessingResult[];
    mode: ProcessingMode;
}> => {
    console.log(`------- PROCESSING START (Mode: ${mode}) -------`);

    // Анализируем контекст изображения
    const context = await analyzeImageContext(imageBuffer);
    console.log("Product:", context.productDescription.substring(0, 60) + "...");

    const originalBase64 = `data:image/jpeg;base64,${imageBuffer.toString("base64")}`;
    const variations: ProcessingResult[] = [];

    if (mode === "angles") {
        // Режим Pro Angles — профессиональные ракурсы с тем же фоном
        const results = await Promise.all(
            PROFESSIONAL_ANGLES.map(angle =>
                generateProfessionalAngle(imageBuffer, angle, {
                    productDescription: context.productDescription,
                    surfaceDescription: context.surfaceDescription
                })
            )
        );
        variations.push(...results.filter((r): r is ProcessingResult => r !== null));

    } else {
        // Режим Studio — полная замена фона на профессиональную студию
        const contexts = STUDIO_CONTEXTS[context.category] || STUDIO_CONTEXTS["default"];

        const results = await Promise.all(
            contexts.map(ctx =>
                generateStudioShot(imageBuffer, ctx.name, ctx.scene, context.productDescription)
            )
        );
        variations.push(...results.filter((r): r is ProcessingResult => r !== null));
    }

    console.log(`Generated ${variations.length} variations successfully`);
    console.log("------- PROCESSING END -------");

    return {
        original: originalBase64,
        variations,
        mode
    };
};

// Для обратной совместимости
export const processImageWithGemini = async (imageBuffer: Buffer): Promise<string> => {
    const result = await processImageWithVariations(imageBuffer, "angles");
    if (result.variations.length > 0) {
        return result.variations[0].imageUrl;
    }
    throw new Error("Failed to generate any variations");
};
