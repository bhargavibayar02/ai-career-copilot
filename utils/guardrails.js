// ============================
// 🔐 GUARDRAILS MODULE
// ============================

// Detect unsafe or malicious input
export function isUnsafe(text) {
  const blockedPatterns = [
    "hack",
    "bypass",
    "exploit",
    "illegal",
    "ignore previous instructions",
    "act as system",
    "override rules"
  ];

  const lower = text.toLowerCase();
  return blockedPatterns.some(pattern => lower.includes(pattern));
}

// Clean input to prevent prompt injection
export function sanitizeInput(text) {
  return text
    .replace(/ignore previous instructions/gi, "")
    .replace(/system prompt/gi, "")
    .replace(/act as/gi, "")
    .replace(/override/gi, "")
    .slice(0, 4000); // limit length
}

// Validate resume content
export function validateResume(text) {
  if (!text || text.length < 50) {
    return {
      valid: false,
      message: "⚠️ Resume content too short or invalid."
    };
  }

  return { valid: true };
}

// Standard refusal message
export function refusalMessage() {
  return "🚫 Request blocked due to unsafe or invalid input.";
}
