export const buildSkillAnalyzerPrompt = (skill: string) => `
Based on this skill "${skill}", give me 10 questions that analyze the user's expertise.
Each question should indirectly check their understanding of ${skill}.
We have three internal options (Yes, Somewhat Know, No) but DO NOT mention them.

Return only JSON in this format:
[
  { "id": "string", "text": "string" }
]
`;


