export function safeParseGroqJson(value: string) {
    const cleaned = value
      .replace(/```json/i, "")
      .replace(/```/g, "")
      .trim();
  
    try {
      return JSON.parse(cleaned);
    } catch {
      console.warn("Failed to parse Groq response as JSON:", cleaned);
      return [];
    }
  }
  