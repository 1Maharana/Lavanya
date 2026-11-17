/**
 * THE LAPTOP QUEST 💻
 * Interactive Storytelling Engine & Sound Synthesizer
 * Features: Native Web Audio sound synthesis, Scroll-driven reveals,
 * Interactive thought bubbles, Framer Motion-style physics, and celebratory confetti.
 */

// Global State
let soundEnabled = true;
let audioCtx = null;
let currentScene = 0;

document.addEventListener('DOMContentLoaded', () => {
  initAudio();
  initScrollAnimations();
  initThoughtBubble();
  initConfettiCanvas();
});

/* --------------------------------------------------------------------------
   Native Web Audio Synthesizer (Pixar/Cartoon Sound Effects)
   -------------------------------------------------------------------------- */
function initAudio() {
  const toggleBtn = document.getElementById('questSoundToggle');
  const soundLabel = document.getElementById('questSoundLabel');
  const soundIcon = document.getElementById('questSoundIcon');

  if (toggleBtn) {
    toggleBtn.addEventListener('click', () => {
      soundEnabled = !soundEnabled;
      soundLabel.textContent = soundEnabled ? 'Sound: ON' : 'Sound: OFF';
      soundIcon.textContent = soundEnabled ? '🎵' : '🔇';
      if (soundEnabled) {
        getAudioContext();
        playCuteChime();
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

// Cheerful Cartoon Click Chime (Soft bell)
function playCuteChime() {
  if (!soundEnabled) return;
  const ctx = getAudioContext();
  if (!ctx) return;

  const notes = [523.25, 659.25, 783.99]; // C5, E5, G5
  notes.forEach((freq, i) => {
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = 'sine';
    osc.frequency.setValueAtTime(freq, ctx.currentTime + i * 0.05);

    gain.gain.setValueAtTime(0.12, ctx.currentTime + i * 0.05);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + i * 0.05 + 0.2);

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.start(ctx.currentTime + i * 0.05);
    osc.stop(ctx.currentTime + i * 0.05 + 0.22);
  });
}

// Magical Whoosh / Swoosh for scene jumps
function playSwoosh() {
  if (!soundEnabled) return;
  const ctx = getAudioContext();
  if (!ctx) return;

  const osc = ctx.createOscillator();
  const gain = ctx.createGain();

  osc.type = 'sine';
  osc.frequency.setValueAtTime(300, ctx.currentTime);
  osc.frequency.exponentialRampToValueAtTime(900, ctx.currentTime + 0.15);
  osc.frequency.exponentialRampToValueAtTime(400, ctx.currentTime + 0.35);

  gain.gain.setValueAtTime(0.1, ctx.currentTime);
  gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.35);

  osc.connect(gain);
  gain.connect(ctx.destination);

  osc.start();
  osc.stop(ctx.currentTime + 0.35);
}

// Pleading cute cartoon whimper
function playWhimper() {
  if (!soundEnabled) return;
  const ctx = getAudioContext();
  if (!ctx) return;

  const osc = ctx.createOscillator();
  const gain = ctx.createGain();

  osc.type = 'triangle';
  osc.frequency.setValueAtTime(480, ctx.currentTime);
  osc.frequency.linearRampToValueAtTime(360, ctx.currentTime + 0.18);
  osc.frequency.linearRampToValueAtTime(280, ctx.currentTime + 0.38);

  gain.gain.setValueAtTime(0.15, ctx.currentTime);
  gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.4);

  osc.connect(gain);
  gain.connect(ctx.destination);

  osc.start();
  osc.stop(ctx.currentTime + 0.4);
}

// Grand Cinematic Quest Complete Fanfare (Joyous orchestral chords)
function playQuestCompleteFanfare() {
  if (!soundEnabled) return;
  const ctx = getAudioContext();
  if (!ctx) return;

  // Major 7th celebratory chord sequence
  const chordSequence = [
    { freq: 392.00, start: 0.0, dur: 0.2 }, // G4
    { freq: 523.25, start: 0.18, dur: 0.2 }, // C5
    { freq: 659.25, start: 0.36, dur: 0.2 }, // E5
    { freq: 783.99, start: 0.54, dur: 0.35 }, // G5
    { freq: 987.77, start: 0.85, dur: 0.3 }, // B5
    { freq: 1046.50, start: 1.15, dur: 0.8 } // High C6 Golden Triumph!
  ];

  chordSequence.forEach(({ freq, start, dur }) => {
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = 'triangle';
    osc.frequency.setValueAtTime(freq, ctx.currentTime + start);

    gain.gain.setValueAtTime(0.24, ctx.currentTime + start);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + start + dur);

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.start(ctx.currentTime + start);
    osc.stop(ctx.currentTime + start + dur);
  });
}

/* --------------------------------------------------------------------------
   Scroll Storytelling & Framer Motion-Style Triggers
   -------------------------------------------------------------------------- */
function initScrollAnimations() {
  const scenes = document.querySelectorAll('.story-scene');

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('in-view');
      }
    });
  }, { threshold: 0.2 });

  scenes.forEach(scene => observer.observe(scene));
}

function startQuest() {
  playSwoosh();
  const struggleSection = document.getElementById('struggle');
  if (struggleSection) {
    struggleSection.scrollIntoView({ behavior: 'smooth' });
  }
}

function scrollToDecision() {
  playSwoosh();
  const decisionSection = document.getElementById('decision');
  if (decisionSection) {
    decisionSection.scrollIntoView({ behavior: 'smooth' });
  }
}

/* --------------------------------------------------------------------------
   Interactive Thought Bubble
   -------------------------------------------------------------------------- */
const thoughtQuotes = [
  "One day... I will have my own laptop.",
  "Imagine the code I could write! 🌸",
  "No more borrowing Deepak's machine! ✨",
  "A laptop worthy of our team's dreams! 💻",
  "Respected Vinoy Sir holds the key! 👑"
];
let thoughtIdx = 0;

function initThoughtBubble() {
  const bubble = document.getElementById('thoughtBubble');
  if (bubble) {
    bubble.addEventListener('click', () => {
      playCuteChime();
      thoughtIdx = (thoughtIdx + 1) % thoughtQuotes.length;
      const textSpan = bubble.querySelector('.thought-quote-text');
      if (textSpan) {
        textSpan.style.opacity = 0;
        setTimeout(() => {
          textSpan.textContent = `"${thoughtQuotes[thoughtIdx]}"`;
          textSpan.style.opacity = 1;
        }, 150);
      }
    });
  }
}

/* --------------------------------------------------------------------------
   Final Decision Handlers
   -------------------------------------------------------------------------- */
function handleQuestYes() {
  playQuestCompleteFanfare();
  fireQuestConfetti();

  // Transform 3D Laptop to joyous celebration mode
  if (window.laptopPedestal) {
    window.laptopPedestal.setState('celebrating');
  }

  // Change background to magical golden dawn sky
  document.body.style.background = 'linear-gradient(180deg, #ffeaa7 0%, #fab1a0 45%, #ffd166 80%, #ffbe0b 100%)';

  // Open the Grand Celebration Modal
  const modal = document.getElementById('questCelebrationModal');
  if (modal) {
    modal.classList.add('active');
  }
}

function closeQuestCelebrationModal() {
  playCuteChime();
  const modal = document.getElementById('questCelebrationModal');
  if (modal) {
    modal.classList.remove('active');
  }
}

function handleQuestThink() {
  playWhimper();

  // Change 3D Laptop to pleading face
  if (window.laptopPedestal) {
    window.laptopPedestal.setState('pleading');
  }

  // Open the "LET ME THINK..." Pleading Modal
  const modal = document.getElementById('questThinkModal');
  if (modal) {
    modal.classList.add('active');
  }
}

function closeQuestThinkModal() {
  playCuteChime();
  const modal = document.getElementById('questThinkModal');
  if (modal) {
    modal.classList.remove('active');
  }
}

function handleApproveFromThink() {
  closeQuestThinkModal();
  handleQuestYes();
}

function celebrateAgain() {
  playQuestCompleteFanfare();
  fireQuestConfetti();
}

function printRoyalOrder() {
  playCuteChime();
  window.print();
}

function shareWithVinoySir() {
  playCuteChime();
  const text = `👑 ROYAL PROCLAMATION: The Quest is Complete! Manager Vinoy Sir has officially granted Lavanya her laptop! A journey of one employee, one dream, and one legendary manager. #TheLaptopQuest`;

  if (navigator.clipboard) {
    navigator.clipboard.writeText(text).then(() => {
      alert("✨ Copied the Royal Proclamation! Send it to Vinoy Sir with a smile!");
    }).catch(() => {
      alert(text);
    });
  } else {
    alert(text);
  }
}

/* --------------------------------------------------------------------------
   High-Performance Canvas Confetti System (Pastel Stars, Discs & Hearts)
   -------------------------------------------------------------------------- */
let confettiParticles = [];
let confettiAnimId = null;

function initConfettiCanvas() {
  const canvas = document.getElementById('questConfettiCanvas');
  if (!canvas) return;

  function resize() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  }
  window.addEventListener('resize', resize);
  resize();
}

function fireQuestConfetti() {
  const canvas = document.getElementById('questConfettiCanvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');

  const palette = [
    '#ff758c', '#ffbe0b', '#06d6a0', '#118ab2', '#ff6b6b', '#c77dff', '#ffffff', '#ffd166'
  ];

  for (let i = 0; i < 240; i++) {
    const originX = i % 2 === 0 ? canvas.width * 0.15 : (i % 3 === 0 ? canvas.width * 0.85 : canvas.width * 0.5);
    const originY = canvas.height * 0.75;

    confettiParticles.push({
      x: originX,
      y: originY,
      vx: (Math.random() - 0.5) * 26,
      vy: (Math.random() * -20) - 8,
      size: Math.random() * 9 + 5,
      color: palette[Math.floor(Math.random() * palette.length)],
      rotation: Math.random() * 360,
      rotationSpeed: (Math.random() - 0.5) * 14,
      opacity: 1,
      shape: Math.random() > 0.6 ? 'star' : (Math.random() > 0.3 ? 'heart' : 'circle')
    });
  }

  if (!confettiAnimId) {
    animateConfetti(ctx, canvas);
  }
}

function animateConfetti(ctx, canvas) {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  for (let i = confettiParticles.length - 1; i >= 0; i--) {
    const p = confettiParticles[i];
    p.x += p.vx;
    p.y += p.vy;
    p.vy += 0.38; // gravity
    p.vx *= 0.98; // air resistance
    p.rotation += p.rotationSpeed;
    p.opacity -= 0.005;

    ctx.save();
    ctx.translate(p.x, p.y);
    ctx.rotate((p.rotation * Math.PI) / 180);
    ctx.globalAlpha = Math.max(0, p.opacity);
    ctx.fillStyle = p.color;

    if (p.shape === 'star') {
      drawStar(ctx, 0, 0, 5, p.size, p.size / 2);
    } else if (p.shape === 'heart') {
      drawHeart(ctx, 0, 0, p.size);
    } else {
      ctx.beginPath();
      ctx.arc(0, 0, p.size / 2, 0, Math.PI * 2);
      ctx.fill();
    }
    ctx.restore();

    if (p.y > canvas.height + 30 || p.opacity <= 0) {
      confettiParticles.splice(i, 1);
    }
  }

  if (confettiParticles.length > 0) {
    confettiAnimId = requestAnimationFrame(() => animateConfetti(ctx, canvas));
  } else {
    confettiAnimId = null;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
  }
}

function drawStar(ctx, cx, cy, spikes, outerRadius, innerRadius) {
  let rot = (Math.PI / 2) * 3;
  let x = cx;
  let y = cy;
  let step = Math.PI / spikes;

  ctx.beginPath();
  ctx.moveTo(cx, cy - outerRadius);
  for (let i = 0; i < spikes; i++) {
    x = cx + Math.cos(rot) * outerRadius;
    y = cy + Math.sin(rot) * outerRadius;
    ctx.lineTo(x, y);
    rot += step;

    x = cx + Math.cos(rot) * innerRadius;
    y = cy + Math.sin(rot) * innerRadius;
    ctx.lineTo(x, y);
    rot += step;
  }
  ctx.lineTo(cx, cy - outerRadius);
  ctx.closePath();
  ctx.fill();
}

function drawHeart(ctx, x, y, size) {
  ctx.beginPath();
  const topCurveHeight = size * 0.3;
  ctx.moveTo(x, y + topCurveHeight);
  // top left curve
  ctx.bezierCurveTo(x, y, x - size / 2, y, x - size / 2, y + topCurveHeight);
  // bottom left curve
  ctx.bezierCurveTo(x - size / 2, y + (size + topCurveHeight) / 2, x, y + (size + topCurveHeight) / 2, x, y + size);
  // bottom right curve
  ctx.bezierCurveTo(x, y + (size + topCurveHeight) / 2, x + size / 2, y + (size + topCurveHeight) / 2, x + size / 2, y + topCurveHeight);
  // top right curve
  ctx.bezierCurveTo(x + size / 2, y, x, y, x, y + topCurveHeight);
  ctx.closePath();
  ctx.fill();
}

