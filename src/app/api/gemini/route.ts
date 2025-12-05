import { GoogleGenerativeAI } from "@google/generative-ai";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
    try {
        const { topic, difficulty } = await req.json();

        const apiKey = process.env.GEMINI_API_KEY;
        if (!apiKey) {
            return NextResponse.json(
                { error: "API Key not found. Please add GEMINI_API_KEY to .env.local" },
                { status: 500 }
            );
        }

        const genAI = new GoogleGenerativeAI(apiKey);
        // Using gemini-1.5-flash for speed and cost efficiency
        const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

        const prompt = `
      Generate 5 UNIQUE, HIGH-YIELD multiple-choice questions (MCQs) on the medical topic: "${topic}".
      Difficulty Level: ${difficulty}.
      
      STRICT CONSTRAINTS:
      1. Content must strictly adhere to the Indian Medical Graduate (IMG) curriculum as per National Medical Commission (NMC) guidelines.
      2. Focus on CLINICAL VIGNETTES and practical scenarios relevant to Indian healthcare settings.
      3. ABSOLUTELY NO REPETITIVE or GENERIC questions. Ensure each question tests a distinct concept.
      4. Avoid obscure or USMLE-specific content unless it overlaps with the Indian syllabus.
      5. Ensure options are plausible distractors, not obvious incorrect answers.
      6. If the topic is broad, select a specific high-yield subtopic to ensure depth.

      Format the output strictly as a JSON array of objects.
      Each object must have:
      - id: number (1-5)
      - question: string (Clinical vignette style preferred)
      - options: array of 4 strings
      - correctAnswer: number (0-3, index of the correct option)
      - explanation: string (Brief explanation of why the answer is correct)

      Example format:
      [
        {
          "id": 1,
          "question": "Question text...",
          "options": ["A", "B", "C", "D"],
          "correctAnswer": 0,
          "explanation": "Explanation..."
        }
      ]
      
      IMPORTANT: Return ONLY the JSON array. Do not use markdown code blocks.
    `;

        const result = await model.generateContent(prompt);
        const response = await result.response;
        const text = response.text();

        // console.log("Gemini Raw Response:", text); // For debugging

        // Robust cleaning: remove markdown, whitespace, and find the array
        let cleanedText = text.replace(/```json/g, "").replace(/```/g, "").trim();
        const firstBracket = cleanedText.indexOf("[");
        const lastBracket = cleanedText.lastIndexOf("]");

        if (firstBracket !== -1 && lastBracket !== -1) {
            cleanedText = cleanedText.substring(firstBracket, lastBracket + 1);
        }

        try {
            const questions = JSON.parse(cleanedText);

            if (!Array.isArray(questions)) {
                throw new Error("AI response is not an array");
            }

            // Validate structure
            const validatedQuestions = questions.map((q: any, index: number) => ({
                id: q.id || index + 1,
                question: q.question || "Question text missing",
                options: Array.isArray(q.options) ? q.options : ["Option A", "Option B", "Option C", "Option D"],
                correctAnswer: typeof q.correctAnswer === 'number' ? q.correctAnswer : 0,
                explanation: q.explanation || "No explanation provided."
            }));

            return NextResponse.json({ questions: validatedQuestions });
        } catch (parseError) {
            console.error("JSON Parse Error:", parseError, "Text:", cleanedText);
            return NextResponse.json(
                { error: "Failed to parse AI response. Try again." },
                { status: 500 }
            );
        }

    } catch (error: any) {
        console.error("Gemini API Error:", error);
        return NextResponse.json(
            { error: error.message || "Failed to generate questions." },
            { status: 500 }
        );
    }
}
