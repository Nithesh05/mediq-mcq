const { GoogleGenerativeAI } = require("@google/generative-ai");
const fs = require('fs');
const path = require('path');

async function listModels() {
    let apiKey = process.env.GEMINI_API_KEY;

    if (!apiKey) {
        try {
            const envPath = path.join(__dirname, '.env.local');
            const envContent = fs.readFileSync(envPath, 'utf8');
            const match = envContent.match(/GEMINI_API_KEY=(.*)/);
            if (match) {
                apiKey = match[1].trim();
            }
        } catch (e) {
            console.error("Could not read .env.local");
        }
    }

    if (!apiKey) {
        console.error("No API Key found in .env.local");
        return;
    }

    console.log("Using API Key:", apiKey.substring(0, 10) + "...");

    try {
        const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models?key=${apiKey}`);
        const data = await response.json();

        if (data.models) {
            console.log("Available Models:");
            data.models.forEach(m => console.log(`- ${m.name}`));
        } else {
            console.error("Failed to list models:", data);
        }
    } catch (error) {
        console.error("Error:", error);
    }
}

listModels();
