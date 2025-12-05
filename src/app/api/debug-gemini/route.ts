import { GoogleGenerativeAI } from "@google/generative-ai";
import { NextResponse } from "next/server";

export async function GET() {
    try {
        const apiKey = process.env.GEMINI_API_KEY;
        if (!apiKey) {
            return NextResponse.json({ error: "API Key not found" }, { status: 500 });
        }

        const genAI = new GoogleGenerativeAI(apiKey);
        // Use the model manager to list models
        // Note: In some versions it's genAI.getGenerativeModel... but listing requires accessing the API directly or via a manager if exposed.
        // Actually, the SDK doesn't always expose listModels directly on the main class in all versions.
        // Let's try to just return a simple "Hello" and try to instantiate a model and run a simple prompt to see if it works.
        // But wait, the error said "Call ListModels".

        // In @google/generative-ai, there isn't a direct listModels method on the client instance in all versions.
        // However, we can try to use the `gemini-pro` model and catch the specific error details.

        // Let's try a fallback list of models to see which one works.
        const modelsToTry = ["gemini-1.5-flash", "gemini-pro", "gemini-1.0-pro", "gemini-1.5-pro"];
        const results: Record<string, string> = {};

        for (const modelName of modelsToTry) {
            try {
                const model = genAI.getGenerativeModel({ model: modelName });
                const result = await model.generateContent("Hi");
                const response = await result.response;
                results[modelName] = "Success: " + response.text();
            } catch (e: any) {
                results[modelName] = "Failed: " + e.message;
            }
        }

        return NextResponse.json({
            apiKeyPresent: !!apiKey,
            apiKeyPrefix: apiKey.substring(0, 4) + "...",
            results
        });

    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
