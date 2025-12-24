// === Gemini Chatbot Script with Typing Animation and Dynamic Description ===

const myFullName = "Anvesha";
const GEMINI_API_KEY = "AIzaSyDNDY0IIRidvGCnSR-ZOFYmqG-26KmN_54";

// Set a different random description each time
const descriptions = [
  "I'm an electronics engineer who loves AI, coding, and coffee.",
  "I'm a creative mind blending circuits with software.",
  "A passionate builder of intelligent tech.",
  "Explorer of ideas through electronics, code, and art.",
  "Just a tech girl with a dream to build something big."
];

const myDescription = descriptions[Math.floor(Math.random() * descriptions.length)];

// === Hero Description Rotator ===
let currentDescriptionIndex = 0;
const heroDescription = document.querySelector('.hero-description');

function rotateHeroDescription() {
  if (heroDescription) {
    // Fade out
    heroDescription.style.opacity = '0';
    heroDescription.style.transform = 'translateY(10px)';
    
    setTimeout(() => {
      // Change text
      heroDescription.textContent = descriptions[currentDescriptionIndex];
      currentDescriptionIndex = (currentDescriptionIndex + 1) % descriptions.length;
      
      // Fade in
      heroDescription.style.opacity = '1';
      heroDescription.style.transform = 'translateY(0)';
    }, 500);
  }
}

// Start rotating descriptions every 4 seconds
setInterval(rotateHeroDescription, 4000);

const chatOverlay = document.getElementById("chatOverlay");
const chatMessages = document.getElementById("chatMessages");
const userInput = document.getElementById("userInput");

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
    appendMessage("bot", "Hmm, I didn't get that. Try asking again?");
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

// Custom live cursor like Formula 1 car
if (!document.getElementById('custom-cursor')) {
  let prevX = 0;
  let prevY = 0;
  let currentX = 0;
  let currentY = 0;
  let targetX = 0;
  let targetY = 0;
  let smokeCounter = 0;

  const cursor = document.createElement('div');
  cursor.id = 'custom-cursor';
  document.body.appendChild(cursor);

  function updateCursor() {
    // Smooth interpolation (lerp) - adjust 0.1 for speed (lower = slower)
    currentX += (targetX - currentX) * 0.1;
    currentY += (targetY - currentY) * 0.1;

    const dx = currentX - prevX;
    const dy = currentY - prevY;
    const angle = Math.atan2(dy, dx) * 180 / Math.PI;
    
    cursor.style.left = currentX + 'px';
    cursor.style.top = currentY + 'px';
    cursor.style.transform = `translate(-50%, -50%) rotate(${angle}deg)`;
    
    // Create smoke particle at car's position every few frames
    smokeCounter++;
    if (smokeCounter >= 5) { // Create smoke every 5 frames
      const smoke = document.createElement('div');
      smoke.className = 'smoke';
      smoke.style.left = (currentX - 5) + 'px'; // offset a bit
      smoke.style.top = (currentY - 5) + 'px';
      document.body.appendChild(smoke);
      setTimeout(() => smoke.remove(), 1000); // remove after animation
      smokeCounter = 0;
    }
    
    prevX = currentX;
    prevY = currentY;
    
    requestAnimationFrame(updateCursor);
  }
  
  updateCursor(); // Start the animation loop

  document.addEventListener('mousemove', (e) => {
    targetX = e.clientX;
    targetY = e.clientY;
  });
}

// Animate skill bars on load
const bars = document.querySelectorAll('.bar');
bars.forEach(bar => {
  const targetWidth = bar.style.width;
  bar.style.width = '0%';
  setTimeout(() => {
    bar.style.width = targetWidth;
  }, 500);
});

const sections = document.querySelectorAll('section');
const navLinks = document.querySelectorAll('.nav-links a');
const observer = new IntersectionObserver((entries) => {
  let hasIntersecting = false;
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      hasIntersecting = true;

      // Update active navigation link
      const currentSectionId = entry.target.id;
      navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${currentSectionId}`) {
          link.classList.add('active');
        }
      });
    }
  });

  // If no section is intersecting (at top of page), remove all active classes
  if (!hasIntersecting) {
    navLinks.forEach(link => link.classList.remove('active'));
  }
}, { threshold: 0.1 });
sections.forEach(section => observer.observe(section));

const canvas = document.getElementById('particle-canvas');
const ctx = canvas.getContext('2d');
let particles = [];
let mouse = { x: null, y: null };

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

class Particle {
  constructor() {
    this.x = Math.random() * canvas.width;
    this.y = Math.random() * canvas.height;
    this.size = Math.random() * 2 + 0.5;
    this.speedX = Math.random() * 0.5 - 0.25;
    this.speedY = Math.random() * 0.5 - 0.25;
  }
  update() {
    this.x += this.speedX;
    this.y += this.speedY;
    if (this.x > canvas.width || this.x < 0) this.speedX *= -1;
    if (this.y > canvas.height || this.y < 0) this.speedY *= -1;
  }
  draw() {
    ctx.fillStyle = '#1e5a5c';
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
    ctx.fill();
  }
}

function init() {
  particles = [];
  for (let i = 0; i < 150; i++) particles.push(new Particle());
}

function animate() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  particles.forEach(p => {
    p.update();
    p.draw();
  });
  connectParticles();
  requestAnimationFrame(animate);
}

function connectParticles() {
  for (let a = 0; a < particles.length; a++) {
    for (let b = a; b < particles.length; b++) {
      let distance = Math.hypot(particles[a].x - particles[b].x, particles[a].y - particles[b].y);
      if (distance < 100) {
        ctx.strokeStyle = `rgba(30, 90, 92, ${1 - distance / 100})`;
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.moveTo(particles[a].x, particles[a].y);
        ctx.lineTo(particles[b].x, particles[b].y);
        ctx.stroke();
      }
    }
  }
}

window.addEventListener('mousemove', e => { mouse.x = e.x; mouse.y = e.y; });
window.addEventListener('resize', () => { canvas.width = window.innerWidth; canvas.height = window.innerHeight; init(); });

init();
animate();

// === Project Card Mouse Tilt Effect ===
document.querySelectorAll('.project-card, .achievement-card').forEach(card => {
  card.addEventListener('mousemove', e => {
    let rect = card.getBoundingClientRect();
    let x = e.clientX - rect.left;
    let y = e.clientY - rect.top;
    let rotateY = (x / rect.width - 0.5) * 20;
    let rotateX = (0.5 - y / rect.height) * 20;
    card.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
  });
  card.addEventListener('mouseleave', () => {
    card.style.transform = 'rotateX(0) rotateY(0)';
  });
});