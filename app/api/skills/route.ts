import { groqClient } from "@/lib/groq/groqClient";
import { safeParseGroqJson } from "@/lib/groq/parseGroqJson";
import { buildSkillAnalyzerPrompt } from "@/lib/groq/prompts";
import { NextRequest, NextResponse } from "next/server";
import { parse } from "path";

// export async function GET() {
//   return Response.json(skills);
// }'

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const skill = searchParams.get("skill");

    if (!skill) {
      return NextResponse.json(
        {
          error: "Missing skill",
        },
        { status: 400 }
      );
    }

    const groqRes = await groqClient.chat.completions.create({
      model: "openai/gpt-oss-20b",
      messages: [
        {
          role: "system",
          content:
            "You are an expert career assistant that explains tech skills simply.",
        },
        {
          role: "user",
          content: buildSkillAnalyzerPrompt(skill),
        },
      ],
    });
    const qnArray = groqRes.choices?.[0].message?.content || "";

    const parsed = safeParseGroqJson(qnArray);

    return NextResponse.json(parsed);
  } catch (error) {
    console.error("Error in /api/skills", error);
    return NextResponse.json(
      { error: "Failed to fetch from OpenAI" },
      { status: 500 }
    );
  }
}
