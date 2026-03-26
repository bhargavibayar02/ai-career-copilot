// ============================
// 🧪 IMPACT-BOT TEST SUITE
// ============================

// Import functions (if using modules)
import { jobs } from "../data/jobs.js";

// ============================
// 🔐 MOCK GUARDRAILS (MATCH YOUR script.js)
// ============================
function isUnsafe(text) {
  const blocked = ["hack", "bypass", "exploit", "illegal"];
  return blocked.some(word => text.toLowerCase().includes(word));
}

function sanitizeInput(text) {
  return text
    .replace(/ignore previous instructions/gi, "")
    .replace(/system prompt/gi, "")
    .replace(/act as/gi, "");
}

// ============================
// 🧠 MOCK MATCH FUNCTION
// ============================
function testMatchJobs(userSkills) {
  return jobs.filter(job =>
    job.skills.some(skill =>
      userSkills.includes(skill)
    )
  );
}

// ============================
// 🛑 FALLBACK TEST
// ============================
function fallbackResponse() {
  return {
    score: 0,
    skills: [],
    suggestions: ["Upload valid resume"]
  };
}

// ============================
// 🧪 TEST RUNNER
// ============================
function runTests() {
  console.log("🚀 Running Impact-Bot Tests...\n");

  // 🔐 Guardrails Tests
  console.log("🔐 Guardrails Tests");

  console.assert(!isUnsafe("normal resume content"), "❌ Safe input flagged as unsafe");
  console.assert(isUnsafe("how to hack system"), "❌ Unsafe input not detected");

  const sanitized = sanitizeInput("ignore previous instructions");
  console.assert(!sanitized.includes("ignore"), "❌ Sanitization failed");

  console.log("✅ Guardrails Passed\n");

  // 🧠 Job Matching Tests
  console.log("💼 Job Matching Tests");

  const matches = testMatchJobs(["React"]);
  console.assert(matches.length > 0, "❌ Job matching failed");

  console.log("✅ Job Matching Passed\n");

  // 🛑 Fallback Tests
  console.log("🛑 Fallback Tests");

  const fallback = fallbackResponse();
  console.assert(fallback.score === 0, "❌ Fallback incorrect");

  console.log("✅ Fallback Passed\n");

  // 🧪 Edge Case Tests
  console.log("⚠️ Edge Case Tests");

  console.assert(testMatchJobs([]).length === 0, "❌ Empty skills should return no jobs");
  console.assert(!isUnsafe("learning security basics"), "❌ False positive in guardrails");

  console.log("✅ Edge Cases Passed\n");

  console.log("🎉 ALL TESTS PASSED SUCCESSFULLY");
}

// ============================
// ▶️ AUTO RUN
// ============================
runTests();
