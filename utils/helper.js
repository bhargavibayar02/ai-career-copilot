// ============================
// ⚙️ HELPER FUNCTIONS
// ============================

// 💬 Add chat message
export function addMessage(text, type = "bot") {
  const chat = document.getElementById("chat");

  const div = document.createElement("div");
  div.className = "message " + type;
  div.innerText = text;

  chat.appendChild(div);
}

// ⚡ Typing animation
export function typingEffect(text, callback) {
  const chat = document.getElementById("chat");

  const div = document.createElement("div");
  div.className = "message bot";

  chat.appendChild(div);

  let i = 0;

  const interval = setInterval(() => {
    div.innerText += text[i];
    i++;

    if (i >= text.length) {
      clearInterval(interval);
      if (callback) callback();
    }
  }, 15);
}

// ❌ Show error
export function showError(msg) {
  const box = document.getElementById("errorBox");
  box.innerText = msg;
  box.classList.remove("hidden");
}

// ✅ Hide error
export function hideError() {
  document.getElementById("errorBox").classList.add("hidden");
}

// 📊 Chart
let chartInstance;

export function showChart(score) {
  const ctx = document.getElementById("scoreChart");

  if (chartInstance) chartInstance.destroy();

  chartInstance = new Chart(ctx, {
    type: "doughnut",
    data: {
      labels: ["Score", "Remaining"],
      datasets: [{
        data: [score, 10 - score]
      }]
    }
  });
}

// 🧭 Roadmap
export function generateRoadmap(skills) {
  const div = document.getElementById("roadmap");

  let html = "<ul>";

  skills.forEach(skill => {
    html += `<li>Learn ${skill} → Build project → Add to resume</li>`;
  });

  html += "</ul>";

  div.innerHTML = html;
}

// 🧭 Smart roadmap (job-based)
export function generateSmartRoadmap(jobs) {
  const div = document.getElementById("roadmap");

  let skills = new Set();

  jobs.forEach(job => {
    job.missingSkills?.forEach(skill => skills.add(skill));
  });

  let html = "<h4>📈 Career Path</h4><ul>";

  skills.forEach(skill => {
    html += `<li>Master ${skill} → Build project → Apply jobs</li>`;
  });

  html += "</ul>";

  div.innerHTML = html;
}
