import { Config } from '../constants/Config';
import { CheckData } from '../types';

const GEMINI_API_URL = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-flash-latest:generateContent';

export const extractCheckData = async (base64Image: string): Promise<CheckData> => {
    if (!Config.GEMINI_API_KEY) {
        throw new Error('Gemini API Key is missing. Please check your configuration.');
    }

    const prompt = `
    Act as a professional Bank OCR Analyst.
    Analyze the provided bank check image and extract data strictly in valid JSON format.
    
    CRITICAL INSTRUCTION:
    1. FIRST, locate and read the MICR line at the bottom of the check character-by-character.
    2. USE the MICR line as the primary source of truth for:
       - Routing Number (usually between |: symbols)
       - Account Number (usually between || symbols)
       - Check Number (often matches the number at top right)
    3. VERIFY the printed numbers on the check against the MICR line data. If they conflict, trust the MICR line.
    
    Required Fields:
    - bank_name
    - payer_name
    - payee_name
    - check_number (Source: MICR)
    - account_number (Source: MICR)
    - routing_number (Source: MICR)
    - micr_line (The exact full machine-readable line characters)
    - amount_numeric (e.g. 100.00)
    - amount_words
    - check_date (YYYY-MM-DD)
    - signature_present (boolean)
    - currency (e.g. USD, EUR)
    - confidence_score (0-100 for key fields)

    Rules:
    - If a field is not visible or readable, return null.
    - Do NOT guess or hallucinate.
    - Return ONLY the JSON object. No markdown.

    JSON Schema:
    {
      "bank_name": string | null,
      "payer_name": string | null,
      "payee_name": string | null,
      "check_number": string | null,
      "account_number": string | null,
      "routing_number": string | null,
      "micr_line": string | null,
      "amount_numeric": number | null,
      "amount_words": string | null,
      "check_date": "YYYY-MM-DD" | null,
      "signature_present": boolean,
      "currency": string | null,
      "confidence_score": {
        "bank_name": number,
        "payer_name": number,
        "payee_name": number,
        "amount": number,
        "micr_line": number
      }
    }
  `;

    try {
        const response = await fetch(`${GEMINI_API_URL}?key=${Config.GEMINI_API_KEY}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                contents: [
                    {
                        parts: [
                            { text: prompt },
                            {
                                inline_data: {
                                    mime_type: 'image/jpeg',
                                    data: base64Image,
                                },
                            },
                        ],
                    },
                ],
                generationConfig: {
                    temperature: 0.1, // Low temperature for factual extraction
                    response_mime_type: "application/json" // Force JSON response
                }
            }),
        });

        if (!response.ok) {
            const errorText = await response.text();
            console.error('Gemini API Error:', errorText);
            throw new Error(`API Request Failed: ${response.status}`);
        }

        const result = await response.json();

        // Parse the response
        const candidate = result.candidates?.[0];
        if (!candidate) {
            throw new Error('No candidates returned from Gemini');
        }

        const contentText = candidate.content.parts[0].text;

        // Clean potential markdown code blocks if the model ignored instructions (unlikely with response_mime_type but good safety)
        const cleanJson = contentText.replace(/```json/g, '').replace(/```/g, '').trim();

        const parsedData: CheckData = JSON.parse(cleanJson);
        return parsedData;

    } catch (error) {
        console.error('Gemini Service Error:', error);
        throw error;
    }
};
