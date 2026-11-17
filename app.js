/**
 * OPERATION: LAPTOP FOR LAVANYA 💻
 * Official Executive Approval Portal Engine
 * Features: Web Audio Synthesizer, Canvas Confetti System, Interactive Telemetry,
 * Dynamic Dodge Button, Modal Orchestration & Certificate Generation.
 */

// Global State
let soundEnabled = true;
let dodgeCount = 0;
let isApproved = false;
let audioCtx = null;

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
  initAudio();
  initDateDisplay();
  initCardTilt();
  setupEventListeners();
  initConfettiCanvas();
});

/* --------------------------------------------------------------------------
   Audio Synthesizer (Native Web Audio API - Zero External Dependencies)
   -------------------------------------------------------------------------- */
function initAudio() {
  const toggleBtn = document.getElementById('soundToggle');
  const soundLabel = document.getElementById('soundLabel');
  const soundIcon = document.getElementById('soundIcon');

  if (toggleBtn) {
    toggleBtn.addEventListener('click', () => {
      soundEnabled = !soundEnabled;
      soundLabel.textContent = soundEnabled ? 'Audio: ON' : 'Audio: OFF';
      soundIcon.textContent = soundEnabled ? '🔊' : '🔇';
      if (soundEnabled) {
        getAudioContext();
        playClickSound();
      }
    });
  }
}

function getAudioContext() {
  if (!audioCtx) {
    const AudioContext = window.AudioContext || window.webkitAudioContext;
    if (AudioContext) {
      audioCtx = new AudioContext();
    }
  }
  if (audioCtx && audioCtx.state === 'suspended') {
    audioCtx.resume();
  }
  return audioCtx;
}

// Crisp UI Click Sound
function playClickSound() {
  if (!soundEnabled) return;
  const ctx = getAudioContext();
  if (!ctx) return;

  const osc = ctx.createOscillator();
  const gain = ctx.createGain();
  osc.type = 'sine';
  osc.frequency.setValueAtTime(600, ctx.currentTime);
  osc.frequency.exponentialRampToValueAtTime(900, ctx.currentTime + 0.08);

  gain.gain.setValueAtTime(0.15, ctx.currentTime);
  gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.08);

  osc.connect(gain);
  gain.connect(ctx.destination);

  osc.start();
  osc.stop(ctx.currentTime + 0.08);
}

// Terminal / Diagnostic Beep
function playDiagnosticBeep() {
  if (!soundEnabled) return;
  const ctx = getAudioContext();
  if (!ctx) return;

  const freqs = [440, 554, 659, 880];
  freqs.forEach((freq, index) => {
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = 'triangle';
    osc.frequency.setValueAtTime(freq, ctx.currentTime + index * 0.06);

    gain.gain.setValueAtTime(0.12, ctx.currentTime + index * 0.06);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + index * 0.06 + 0.05);

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.start(ctx.currentTime + index * 0.06);
    osc.stop(ctx.currentTime + index * 0.06 + 0.06);
  });
}

// Gentle "More Time" buzzer / sad slide
function playPleaSound() {
  if (!soundEnabled) return;
  const ctx = getAudioContext();
  if (!ctx) return;

  const osc = ctx.createOscillator();
  const gain = ctx.createGain();
  osc.type = 'sawtooth';
  osc.frequency.setValueAtTime(320, ctx.currentTime);
  osc.frequency.exponentialRampToValueAtTime(180, ctx.currentTime + 0.35);

  gain.gain.setValueAtTime(0.18, ctx.currentTime);
  gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.35);

  osc.connect(gain);
  gain.connect(ctx.destination);

  osc.start();
  osc.stop(ctx.currentTime + 0.35);
}

// Majestic Victory Fanfare for Vinoy Sir's Approval
function playCelebrationFanfare() {
  if (!soundEnabled) return;
  const ctx = getAudioContext();
  if (!ctx) return;

  // Brass/Trumpet chord sequence: C4, G4, C5, E5, G5
  const notes = [
    { freq: 261.63, start: 0.0, dur: 0.18 }, // C4
    { freq: 329.63, start: 0.18, dur: 0.18 }, // E4
    { freq: 392.00, start: 0.36, dur: 0.18 }, // G4
    { freq: 523.25, start: 0.54, dur: 0.55 }, // C5
    { freq: 659.25, start: 1.15, dur: 0.22 }, // E5
    { freq: 783.99, start: 1.38, dur: 0.65 }  // G5 High Victory Note
  ];

  notes.forEach(({ freq, start, dur }) => {
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = 'triangle';
    osc.frequency.setValueAtTime(freq, ctx.currentTime + start);

    gain.gain.setValueAtTime(0.25, ctx.currentTime + start);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + start + dur);

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.start(ctx.currentTime + start);
    osc.stop(ctx.currentTime + start + dur);
  });
}

/* --------------------------------------------------------------------------
   Interactive Laptop Screen Diagnostic Click
   -------------------------------------------------------------------------- */
let diagnosticStep = 0;
const diagnosticMessages = [
  "> RUNNING HARDWARE PROBE...",
  "[FAIL] Laptop battery: 0% (Colleague took charger)",
  "[FAIL] Display: Screen sharing via binoculars",
  "[WARN] Lavanya attempting to compile code by sheer willpower",
  ">> CONCLUSION: Manager Vinoy Sir must click APPROVE immediately! <<"
];

function handleLaptopClick() {
  playDiagnosticBeep();
  const term = document.getElementById('terminalOutput');
  if (!term) return;

  const msg = diagnosticMessages[diagnosticStep % diagnosticMessages.length];
  diagnosticStep++;

  const p = document.createElement('p');
  p.className = 'term-line action';
  p.style.animation = 'fadeIn 0.3s ease';
  p.textContent = msg;

  term.appendChild(p);
  term.scrollTop = term.scrollHeight;

  // Keep terminal clean
  if (term.children.length > 9) {
    term.removeChild(term.children[1]);
  }
}

/* --------------------------------------------------------------------------
   3D Tilt Card Interaction
   -------------------------------------------------------------------------- */
function initCardTilt() {
  const tiltCards = document.querySelectorAll('[data-tilt]');
  tiltCards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;

      const rotateX = ((y - centerY) / centerY) * -6;
      const rotateY = ((x - centerX) / centerX) * 6;

      card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-4px)`;
    });

    card.addEventListener('mouseleave', () => {
      card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) translateY(0)';
    });
  });
}

/* --------------------------------------------------------------------------
   Smooth Scroll To Approval
   -------------------------------------------------------------------------- */
function scrollToApproval() {
  playClickSound();
  const el = document.getElementById('decision');
  if (el) {
    el.scrollIntoView({ behavior: 'smooth' });
    const approveBtn = document.getElementById('approveBtn');
    if (approveBtn) {
      approveBtn.style.animation = 'subtle-pulse 0.5s ease 3';
    }
  }
}

/* --------------------------------------------------------------------------
   Interactive Crisis Delay Simulation
   -------------------------------------------------------------------------- */
let delaySimulated = false;
function simulateDelay() {
  playPleaSound();
  const prod = document.getElementById('metricProd');
  const patience = document.getElementById('metricPatience');
  const resultText = document.getElementById('delayResultText');
  const logBody = document.getElementById('incidentLogBody');

  if (!delaySimulated) {
    if (prod) prod.textContent = '4%';
    if (patience) {
      patience.textContent = '0.5%';
      patience.classList.add('blink');
    }
    if (resultText) {
      resultText.textContent = '🚨 ALERT: Patience critically low! Lavanya has begun looking at Vinoy Sir with puppy eyes.';
    }

    if (logBody) {
      const entry = document.createElement('div');
      entry.className = 'log-entry alert-log';
      entry.innerHTML = `<span class="log-time">[${new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}]</span> 🚨 SIMULATION: 24-hr delay applied. Office silence reaches deafening decibels.`;
      logBody.prepend(entry);
    }
    delaySimulated = true;
  } else {
    if (resultText) {
      resultText.textContent = '⛔ Further delays prohibited by the Laws of Thermodynamics. Please approve!';
    }
  }
}

/* --------------------------------------------------------------------------
   Vinoy Sir Karma Slider
   -------------------------------------------------------------------------- */
function updateKarma(val) {
  playClickSound();
  const scoreVal = document.getElementById('karmaScoreVal');
  const feedback = document.getElementById('karmaFeedback');

  const quotes = [
    "Even at minimum, Vinoy Sir is fundamentally legendary.",
    "Vinoy Sir is contemplating greatness.",
    "Vinoy Sir's aura is spreading across the department.",
    "Colleagues start whispering about Vinoy Sir's visionary leadership.",
    "Departmental output prepares for an exponential leap.",
    "Vinoy Sir's karma rating ascends past standard corporate ceilings.",
    "Lavanya is rehearsing her speech of eternal gratitude.",
    "IT procurement manager personally salutes Vinoy Sir.",
    "Executive Hall of Fame prepares a golden plaque for Vinoy Sir.",
    "BY APPROVING 1 LAPTOP, VINOY SIR ATTAINS PERMANENT LEGENDARY STATUS (100/10 ⭐)!"
  ];

  const parsedVal = parseInt(val, 10);
  const index = Math.max(0, Math.min(quotes.length - 1, parsedVal - 1));

  if (scoreVal) {
    const displayMultiplier = parsedVal * 10;
    scoreVal.textContent = `${displayMultiplier} / 10 ⭐`;
  }

  if (feedback) {
    feedback.textContent = `"${quotes[index]}"`;
  }
}

/* --------------------------------------------------------------------------
   "I Need More Time" Dodge & Modal Logic
   -------------------------------------------------------------------------- */
function dodgeButton(e) {
  if (dodgeCount >= 3) return; // After 3 playful attempts, let him click it

  const btn = document.getElementById('moreTimeBtn');
  const counter = document.getElementById('dodgeCounter');
  if (!btn) return;

  dodgeCount++;
  const randomX = (Math.random() - 0.5) * 80;
  const randomY = (Math.random() - 0.5) * 40;

  btn.style.transform = `translate(${randomX}px, ${randomY}px)`;

  if (counter) {
    counter.textContent = `(Escape attempt ${dodgeCount}/3 - Vinoy Sir, why the hesitation? 😉)`;
  }

  setTimeout(() => {
    btn.style.transform = 'translate(0, 0)';
  }, 900);
}

function handleMoreTime() {
  playPleaSound();
  const modal = document.getElementById('moreTimeModal');
  if (modal) {
    modal.classList.add('active');
  }
}

function closeMoreTimeModal() {
  playClickSound();
  const modal = document.getElementById('moreTimeModal');
  if (modal) {
    modal.classList.remove('active');
  }
}

function handleApproveFromModal() {
  closeMoreTimeModal();
  handleApprove();
}

let stillNeedCount = 30;
function handleStillNeedTime() {
  playPleaSound();
  const btn = document.getElementById('stillNeedTimeBtn');
  if (!btn) return;

  btn.disabled = true;
  btn.textContent = '⏳ Calculating remaining managerial hesitation...';

  setTimeout(() => {
    btn.disabled = false;
    btn.className = 'btn btn-emerald full-width';
    btn.textContent = '✅ Alright, time is up! APPROVE NOW!';
    btn.onclick = handleApproveFromModal;
  }, 1200);
}

/* --------------------------------------------------------------------------
   The Climax: Approve Laptop Request
   -------------------------------------------------------------------------- */
function handleApprove() {
  isApproved = true;
  playCelebrationFanfare();
  fireConfettiBursts();

  // Update Top Ticker
  const topTicker = document.getElementById('topTicker');
  if (topTicker) {
    topTicker.innerHTML = `
      <div class="ticker-content">
        <span class="ticker-badge" style="background:#10b981;">🎉 APPROVED!</span>
        <span class="ticker-text" style="color:#ffffff; font-weight:700;">BREAKING NEWS: Vinoy Sir has officially approved Lavanya's laptop request! Productivity skyrocketing!</span>
      </div>
      <div class="ticker-actions">
        <span style="color:#34d399; font-size:0.75rem; font-weight:800;">STATUS: LEGENDARY</span>
      </div>
    `;
  }

  // Update Rubber Stamp on Section 2 Dossier
  const stamp = document.getElementById('dossierStamp');
  if (stamp) {
    stamp.classList.add('approved');
    stamp.innerHTML = '<span>APPROVED BY VINOY SIR ✅</span>';
  }

  // Open the Celebration Modal
  const modal = document.getElementById('celebrationModal');
  if (modal) {
    modal.classList.add('active');
  }
}

function closeCelebrationModal() {
  playClickSound();
  const modal = document.getElementById('celebrationModal');
  if (modal) {
    modal.classList.remove('active');
  }
}

function celebrateAgain() {
  playCelebrationFanfare();
  fireConfettiBursts();
}

/* --------------------------------------------------------------------------
   Certificate & Sharing Actions
   -------------------------------------------------------------------------- */
function initDateDisplay() {
  const dateEl = document.getElementById('certDateVal');
  if (dateEl) {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    dateEl.textContent = new Date().toLocaleDateString(undefined, options);
  }
}

function printCertificate() {
  playClickSound();
  window.print();
}

function copyReceiptLink() {
  playClickSound();
  const text = `🎉 OFFICIAL REQUISITION RECEIPT: Manager Vinoy Sir has officially approved Lavanya's laptop request! Status: Certified Legend. Order ID: VIN-HERO-APPROVED-2026. Made with hope, ambition, and absolutely zero laptops.`;

  navigator.clipboard.writeText(text).then(() => {
    const alertMsg = document.getElementById('copyAlertMsg');
    if (alertMsg) {
      alertMsg.style.display = 'block';
      setTimeout(() => {
        alertMsg.style.display = 'none';
      }, 3500);
    }
  }).catch(() => {
    alert("Receipt: Vinoy Sir approved Lavanya's laptop! (Copied to heart)");
  });
}

function setupEventListeners() {
  // ESC key closes modals
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      closeCelebrationModal();
      closeMoreTimeModal();
    }
  });
}

/* --------------------------------------------------------------------------
   High-Performance Canvas Confetti Engine (Standalone & Lightweight)
   -------------------------------------------------------------------------- */
let confettiParticles = [];
let confettiAnimationId = null;

function initConfettiCanvas() {
  const canvas = document.getElementById('confettiCanvas');
  if (!canvas) return;

  function resize() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  }
  window.addEventListener('resize', resize);
  resize();
}

function fireConfettiBursts() {
  const canvas = document.getElementById('confettiCanvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');

  const colors = [
    '#2563eb', '#38bdf8', '#10b981', '#f59e0b', '#ec4899', '#8b5cf6', '#ffffff', '#fbbf24'
  ];

  // Spawn 220 particles from multiple origins (left, right, center)
  for (let i = 0; i < 220; i++) {
    const originX = i % 2 === 0 ? canvas.width * 0.2 : (i % 3 === 0 ? canvas.width * 0.8 : canvas.width * 0.5);
    const originY = canvas.height * 0.7;

    confettiParticles.push({
      x: originX,
      y: originY,
      vx: (Math.random() - 0.5) * 22,
      vy: (Math.random() * -18) - 8,
      size: Math.random() * 8 + 5,
      color: colors[Math.floor(Math.random() * colors.length)],
      rotation: Math.random() * 360,
      rotationSpeed: (Math.random() - 0.5) * 12,
      opacity: 1,
      shape: Math.random() > 0.5 ? 'rect' : 'circle'
    });
  }

  if (!confettiAnimationId) {
    animateConfetti(ctx, canvas);
  }
}

function animateConfetti(ctx, canvas) {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  for (let i = confettiParticles.length - 1; i >= 0; i--) {
    const p = confettiParticles[i];
    p.x += p.vx;
    p.y += p.vy;
    p.vy += 0.35; // gravity
    p.vx *= 0.98; // air resistance
    p.rotation += p.rotationSpeed;
    p.opacity -= 0.005;

    ctx.save();
    ctx.translate(p.x, p.y);
    ctx.rotate((p.rotation * Math.PI) / 180);
    ctx.globalAlpha = Math.max(0, p.opacity);
    ctx.fillStyle = p.color;

    if (p.shape === 'rect') {
      ctx.fillRect(-p.size / 2, -p.size / 2, p.size, p.size * 0.6);
    } else {
      ctx.beginPath();
      ctx.arc(0, 0, p.size / 2, 0, Math.PI * 2);
      ctx.fill();
    }
    ctx.restore();

    if (p.y > canvas.height + 20 || p.opacity <= 0) {
      confettiParticles.splice(i, 1);
    }
  }

  if (confettiParticles.length > 0) {
    confettiAnimationId = requestAnimationFrame(() => animateConfetti(ctx, canvas));
  } else {
    confettiAnimationId = null;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
  }
}

