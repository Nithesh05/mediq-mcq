import { GoogleGenerativeAI } from "@google/generative-ai";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
    try {
        const { topic, type } = await req.json(); // type: 'disease' or 'concept'

        const apiKey = process.env.GEMINI_API_KEY;
        if (!apiKey) {
            return NextResponse.json(
                { error: "API Key not found." },
                { status: 500 }
            );
        }

        const genAI = new GoogleGenerativeAI(apiKey);
        const model = genAI.getGenerativeModel({ model: "gemini-flash-latest" });

        let prompt = "";

        if (type === 'disease') {
            prompt = `
            Generate a detailed medical summary for the disease: "${topic}".
            Target Audience: MBBS Students.
            Format: JSON object.
            
            Structure:
            {
                "name": "${topic}",
                "description": "Brief 1-line summary",
                "content": {
                    "definition": "Detailed definition",
                    "causes": ["Cause 1", "Cause 2", ...],
                    "symptoms": ["Symptom 1", "Symptom 2", ...],
                    "diagnosis": ["Diagnostic test 1", "Test 2", ...],
                    "treatment": ["Treatment 1", "Treatment 2", ...]
                },
                "mcqs": [
                    {
                        "id": 1,
                        "question": "Question text",
                        "options": ["A", "B", "C", "D"],
                        "correctAnswer": 0,
                        "explanation": "Explanation"
                    },
                    ... (Generate 5 MCQs)
                ]
            }
            
            IMPORTANT: Return ONLY the JSON object. No markdown.
            `;
        } else {
            prompt = `
            Generate a detailed medical concept summary for: "${topic}".
            Target Audience: MBBS Students.
            Format: JSON object.
            
            Structure:
            {
                "title": "${topic}",
                "description": "Brief 1-line summary",
                "content": {
                    "introduction": "Detailed introduction",
                    "keyPoints": ["Key point 1", "Key point 2", ...]
                },
                "mcqs": [
                    {
                        "id": 1,
                        "question": "Question text",
                        "options": ["A", "B", "C", "D"],
                        "correctAnswer": 0,
                        "explanation": "Explanation"
                    },
                    ... (Generate 5 MCQs)
                ]
            }
            
            IMPORTANT: Return ONLY the JSON object. No markdown.
            `;
        }

        const result = await model.generateContent(prompt);
        const response = await result.response;
        const text = response.text();

        // Cleaning
        let cleanedText = text.replace(/```json/g, "").replace(/```/g, "").trim();
        const firstBrace = cleanedText.indexOf("{");
        const lastBrace = cleanedText.lastIndexOf("}");

        if (firstBrace !== -1 && lastBrace !== -1) {
            cleanedText = cleanedText.substring(firstBrace, lastBrace + 1);
        }

        const data = JSON.parse(cleanedText);
        return NextResponse.json({ data });

    } catch (error: any) {
        console.error("Content Generation Error:", error);
        return NextResponse.json(
            { error: "Failed to generate content." },
            { status: 500 }
        );
    }
}
