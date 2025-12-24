// === Hero Description Rotator ===
const descriptions = [
  "A passionate electronics and tech enthusiast.",
  "I'm an electronics engineer who loves AI, coding, and coffee.",
  "A creative mind blending circuits with software.",
  "A passionate builder of intelligent tech.",
  "Explorer of ideas through electronics, code, and art.",
  "Just a tech girl with a dream to build something big."
];

let currentDescriptionIndex = 0;
const heroDescription = document.querySelector('.hero-description');

function rotateHeroDescription() {
  if (heroDescription) {
    heroDescription.style.opacity = '0';
    heroDescription.style.transform = 'translateY(10px)';
    
    setTimeout(() => {
      heroDescription.textContent = descriptions[currentDescriptionIndex];
      currentDescriptionIndex = (currentDescriptionIndex + 1) % descriptions.length;
      heroDescription.style.opacity = '1';
      heroDescription.style.transform = 'translateY(0)';
    }, 500);
  }
}

setInterval(rotateHeroDescription, 4000);
rotateHeroDescription(); // Initial call

// === Chat Logic (Fake Responses - Safe & Reliable) ===
const chatOverlay = document.getElementById("chatOverlay");
const chatMessages = document.getElementById("chatMessages");
const userInput = document.getElementById("userInput");

const fakeReplies = [
  "Hi! I'm Anvesha's AI assistant. Ask me about her projects or skills! 🚀",
  "Anvesha is passionate about IoT, AI, and embedded systems. Check out her AquaSense and MAITRI projects!",
  "She loves blending hardware with software — from circuits to machine learning models.",
  "Her skills include Electronics (85%), AI/ML (80%), Python/JS (90%), and Embedded Systems (88%).",
  "Fun fact: Anvesha believes technology should feel magical! ✨",
  "She's always experimenting and dreaming big — one line of code and one circuit at a time.",
  "Want to know more? Just ask! 😊"
];

function toggleChat() {
  chatOverlay.classList.toggle("hidden");

  const hasInit = [...chatMessages.children].some(msg => msg.textContent.includes("Hi, I am"));
  if (!hasInit) {
    appendMessage("bot", `Hi, I am ${"Anvesha"}'s AI assistant. What would you like to know? 💬`);
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

  setTimeout(() => {
    removeTyping();
    const randomReply = fakeReplies[Math.floor(Math.random() * fakeReplies.length)];
    appendMessage("bot", randomReply);
  }, 1000 + Math.random() * 1000); // Natural delay
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

// === Custom F1 Car Cursor with Smoke ===
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
    currentX += (targetX - currentX) * 0.1;
    currentY += (targetY - currentY) * 0.1;

    const dx = currentX - prevX;
    const dy = currentY - prevY;
    const angle = Math.atan2(dy, dx) * 180 / Math.PI;
    
    cursor.style.left = currentX + 'px';
    cursor.style.top = currentY + 'px';
    cursor.style.transform = `translate(-50%, -50%) rotate(${angle}deg)`;
    
    smokeCounter++;
    if (smokeCounter >= 5) {
      const smoke = document.createElement('div');
      smoke.className = 'smoke';
      smoke.style.left = (currentX - 5) + 'px';
      smoke.style.top = (currentY - 5) + 'px';
      document.body.appendChild(smoke);
      setTimeout(() => smoke.remove(), 1000);
      smokeCounter = 0;
    }
    
    prevX = currentX;
    prevY = currentY;
    
    requestAnimationFrame(updateCursor);
  }
  
  updateCursor();

  document.addEventListener('mousemove', (e) => {
    targetX = e.clientX;
    targetY = e.clientY;
  });
}

// === Scroll Animations & Active Nav Highlight ===
const sections = document.querySelectorAll('section');
const navLinks = document.querySelectorAll('.nav-links a');

const observer = new IntersectionObserver((entries) => {
  let hasIntersecting = false;
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      hasIntersecting = true;

      const currentId = entry.target.id;
      navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${currentId}`) {
          link.classList.add('active');
        }
      });
    }
  });

  if (!hasIntersecting) {
    navLinks.forEach(link => link.classList.remove('active'));
  }
}, { threshold: 0.2 });

sections.forEach(section => observer.observe(section));

// === Particle Background ===
const canvas = document.getElementById('particle-canvas');
const ctx = canvas.getContext('2d');
let particles = [];

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

function initParticles() {
  particles = [];
  const count = window.innerWidth < 768 ? 80 : 150;
  for (let i = 0; i < count; i++) particles.push(new Particle());
}

function animateParticles() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  particles.forEach(p => {
    p.update();
    p.draw();
  });
  connectParticles();
  requestAnimationFrame(animateParticles);
}

function connectParticles() {
  for (let a = 0; a < particles.length; a++) {
    for (let b = a + 1; b < particles.length; b++) {
      const distance = Math.hypot(particles[a].x - particles[b].x, particles[a].y - particles[b].y);
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

window.addEventListener('resize', () => {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  initParticles();
});

initParticles();
animateParticles();

// === Project & Achievement Card Tilt Effect ===
document.querySelectorAll('.project-card, .achievement-card').forEach(card => {
  card.addEventListener('mousemove', e => {
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const rotateY = (x / rect.width - 0.5) * 20;
    const rotateX = (0.5 - y / rect.height) * 20;
    card.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateZ(20px)`;
  });
  card.addEventListener('mouseleave', () => {
    card.style.transform = 'rotateX(0) rotateY(0) translateZ(0)';
  });
});

// === Holographic Skills Animation on Hover ===
const holographicSkills = document.getElementById('holographic-skills');
if (holographicSkills) {
  const skillItems = document.querySelectorAll('.skill-holo');
  
  skillItems.forEach(skill => {
    const fill = skill.querySelector('.holo-fill');
    const level = skill.getAttribute('data-level');

    // Reset on leave
    holographicSkills.addEventListener('mouseleave', () => {
      fill.style.width = '0%';
    });

    // Animate on enter
    holographicSkills.addEventListener('mouseenter', () => {
      fill.style.width = level + '%';
    });
  });
}