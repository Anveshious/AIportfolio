// === Gemini Chatbot Script with Dark Mode, Typing Animation, and Dynamic Description ===

const myFullName = "Anvesha";
const GEMINI_API_KEY = "AIzaSyBMLbT3eQMbc5eyf6-5WotP68xu5X9-3q8";

// Set a different random description each time
const descriptions = [
  "I'm an electronics engineer who loves AI, coding, and coffee.",
  "I'm a creative mind blending circuits with software.",
  "A passionate builder of embedded systems and intelligent tech.",
  "Explorer of ideas through electronics, code, and art.",
  "Just a tech girl with a dream to build something big."
];

const myDescription = descriptions[Math.floor(Math.random() * descriptions.length)];

const chatOverlay = document.getElementById("chatOverlay");
const chatMessages = document.getElementById("chatMessages");
const userInput = document.getElementById("userInput");

// === Dark Mode Toggle ===
const toggle = document.getElementById("darkToggle");
const themeIcon = document.getElementById("themeIcon");

if (localStorage.getItem("theme") === "dark") {
  document.body.classList.add("dark");
  toggle.checked = true;
  themeIcon.textContent = "☀️";
} else {
  themeIcon.textContent = "🌙";
}

toggle.addEventListener("change", () => {
  document.body.classList.toggle("dark");
  const theme = document.body.classList.contains("dark") ? "dark" : "light";
  localStorage.setItem("theme", theme);
  themeIcon.textContent = theme === "dark" ? "☀️" : "🌙";
});

// === Chat Logic ===
function toggleChat() {
  chatOverlay.classList.toggle("hidden");

  const hasInit = [...chatMessages.children].some(msg => msg.textContent.includes("Hi, I am"));
  if (!hasInit) {
    appendMessage("bot", `Hi, I am ${myFullName}, what do you want to know about me?`);
  }
}

function handleKey(e) {
  if (e.key === "Enter") sendMessage();
}

function sendMessage() {
  const msg = userInput.value.trim();
  if (!msg) return;

  appendMessage("user", msg);
  userInput.value = "";

  appendTyping();
  getGeminiResponse(msg);
}

function appendMessage(sender, text) {
  const msg = document.createElement("div");
  msg.className = `chat-message ${sender}`;
  msg.textContent = text;
  chatMessages.appendChild(msg);
  chatMessages.scrollTop = chatMessages.scrollHeight;
}

function appendTyping() {
  removeTyping();
  const typing = document.createElement("div");
  typing.className = "chat-message bot typing";
  typing.id = "typingIndicator";
  typing.textContent = "Typing...";
  chatMessages.appendChild(typing);
  chatMessages.scrollTop = chatMessages.scrollHeight;
}

function removeTyping() {
  const typing = document.getElementById("typingIndicator");
  if (typing) typing.remove();
}

async function getGeminiResponse(message) {
  const payload = {
  contents: [
    {
      role: "user",
      parts: [{ text: message }]
    },
    {
      role: "system",
      parts: [{
        text: `Reply like you're Anvesha. Respond in short, friendly sentences. Use this info if helpful: ${myDescription}`
      }]
    }
  ]
};

try {
  const res = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${GEMINI_API_KEY}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(payload)
  });

  const data = await res.json();
  console.log("Gemini response:", data);

  const reply = data?.candidates?.[0]?.content?.parts?.[0]?.text;
  if (reply) {
    appendMessage("bot", reply);
  } else {
    appendMessage("bot", "Hmm, I didn’t get that. Try asking again?");
  }
} catch (error) {
  appendMessage("bot", "Oops! Something went wrong.");
  console.error("Gemini error:", error);
}
}
function showTyping() {
  const typing = document.createElement("div");
  typing.className = "chat-message bot typing";
  typing.id = "typingIndicator";
  typing.textContent = "Typing...";
  chatMessages.appendChild(typing);
  chatMessages.scrollTop = chatMessages.scrollHeight;
}

function removeTyping() {
  const typing = document.getElementById("typingIndicator");
  if (typing) typing.remove();
}
showTyping();

const reply = await getGeminiResponse(userMessage);

removeTyping();
appendMessage("bot", reply);

