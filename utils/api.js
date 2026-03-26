// ============================
// 🌐 API MODULE (GROQ)
// ============================

const API_KEY = "YOUR_GROQ_API_KEY";

export async function analyzeWithGroq(text) {

  const prompt = `
You are an AI resume analyzer.

STRICT RULES:
- Return ONLY JSON
- No explanations
- Follow structure exactly

FORMAT:
{
 "score": number,
 "skills": [],
 "missing_skills": [],
 "suggestions": [],
 "job_roles": []
}

Example:
Input: React developer

Output:
{
 "score": 7,
 "skills": ["React"],
 "missing_skills": ["Node.js"],
 "suggestions": ["Build full stack apps"],
 "job_roles": ["Frontend Developer"]
}

Resume:
${text}
`;

  try {
    const response = await fetch("https://api.groq.com/openai/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${API_KEY}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        model: "llama3-8b-8192",
        messages: [{ role: "user", content: prompt }],
        temperature: 0.3
      })
    });

    const data = await response.json();

    const content = data.choices?.[0]?.message?.content;

    if (!content) throw new Error("Invalid response");

    return JSON.parse(content);

  } catch (err) {
    console.error("API Error:", err);
    return fallbackResponse();
  }
}

// 🛑 Fallback (safe default)
export function fallbackResponse() {
  return {
    score: 5,
    skills: ["HTML", "CSS"],
    missing_skills: ["JavaScript", "Projects"],
    suggestions: [
      "Add real-world projects",
      "Improve technical skills",
      "Include certifications"
    ],
    job_roles: ["Frontend Developer"]
  };
}
