/**
 * THE LAPTOP QUEST 💻
 * 3D Interactive Floating Laptop & Pedestal Engine
 * Features: 3D Projection Geometry, Shading, Interactive Mouse/Touch Rotation,
 * Magical Particle Nebula, State Reactions (Floating, Pleading, Golden Joy).
 */

class LaptopPedestal3D {
  constructor(canvasId) {
    this.canvas = document.getElementById(canvasId);
    if (!this.canvas) return;
    this.ctx = this.canvas.getContext('2d');

    this.rotY = -0.35;
    this.rotX = 0.22;
    this.targetRotY = -0.35;
    this.targetRotX = 0.22;

    this.isDragging = false;
    this.lastMouseX = 0;
    this.lastMouseY = 0;

    this.time = 0;
    this.state = 'idle'; // 'idle' | 'pleading' | 'celebrating'

    this.particles = [];
    this.initParticles();

    this.resize();
    window.addEventListener('resize', () => this.resize());
    this.bindEvents();
    this.animate();
  }

  resize() {
    const rect = this.canvas.getBoundingClientRect();
    const dpr = window.devicePixelRatio || 1;
    this.canvas.width = rect.width * dpr;
    this.canvas.height = rect.height * dpr;
    this.ctx.scale(dpr, dpr);
    this.width = rect.width;
    this.height = rect.height;
  }

  initParticles() {
    this.particles = [];
    for (let i = 0; i < 40; i++) {
      this.particles.push({
        x: (Math.random() - 0.5) * 260,
        y: (Math.random() - 0.5) * 180,
        z: (Math.random() - 0.5) * 200,
        size: Math.random() * 3 + 2,
        speed: Math.random() * 0.02 + 0.01,
        color: Math.random() > 0.5 ? '#ffd166' : '#ff9ebb',
        angle: Math.random() * Math.PI * 2
      });
    }
  }

  bindEvents() {
    const startDrag = (x, y) => {
      this.isDragging = true;
      this.lastMouseX = x;
      this.lastMouseY = y;
    };

    const moveDrag = (x, y) => {
      if (!this.isDragging) return;
      const dx = x - this.lastMouseX;
      const dy = y - this.lastMouseY;
      this.targetRotY += dx * 0.01;
      this.targetRotX = Math.max(-0.5, Math.min(0.6, this.targetRotX + dy * 0.01));
      this.lastMouseX = x;
      this.lastMouseY = y;
    };

    const stopDrag = () => {
      this.isDragging = false;
    };

    this.canvas.addEventListener('mousedown', (e) => startDrag(e.clientX, e.clientY));
    window.addEventListener('mousemove', (e) => moveDrag(e.clientX, e.clientY));
    window.addEventListener('mouseup', stopDrag);

    this.canvas.addEventListener('touchstart', (e) => {
      if (e.touches.length > 0) startDrag(e.touches[0].clientX, e.touches[0].clientY);
    }, { passive: true });

    window.addEventListener('touchmove', (e) => {
      if (e.touches.length > 0) moveDrag(e.touches[0].clientX, e.touches[0].clientY);
    }, { passive: true });

    window.addEventListener('touchend', stopDrag);
  }

  setState(newState) {
    this.state = newState;
  }

  project(x, y, z) {
    // 3D rotation around Y and X
    const cosY = Math.cos(this.rotY);
    const sinY = Math.sin(this.rotY);
    const cosX = Math.cos(this.rotX);
    const sinX = Math.sin(this.rotX);

    // Y rotation
    let x1 = x * cosY - z * sinY;
    let z1 = z * cosY + x * sinY;

    // X rotation
    let y2 = y * cosX - z1 * sinX;
    let z2 = z1 * cosX + y * sinX;

    const fov = 420;
    const distance = 460;
    const scale = fov / (distance + z2);

    return {
      x: this.width / 2 + x1 * scale,
      y: this.height / 2 + y2 * scale,
      scale: scale,
      z: z2
    };
  }

  animate() {
    this.time += 0.03;

    // Smooth rotation interpolation
    if (!this.isDragging) {
      if (this.state === 'celebrating') {
        this.targetRotY += 0.035; // Fast joyous victory spin
      } else {
        this.targetRotY += 0.005; // Gentle ambient rotation
      }
    }
    this.rotY += (this.targetRotY - this.rotY) * 0.08;
    this.rotX += (this.targetRotX - this.rotX) * 0.08;

    this.draw();
    requestAnimationFrame(() => this.animate());
  }

  draw() {
    const ctx = this.ctx;
    ctx.clearRect(0, 0, this.width, this.height);

    // Floating bobbing motion
    let bobY = Math.sin(this.time * 2) * 12;
    if (this.state === 'pleading') {
      bobY = Math.sin(this.time * 8) * 4 + 18; // Drooping & trembling
    } else if (this.state === 'celebrating') {
      bobY = Math.sin(this.time * 6) * 22; // Happy energetic bounce
    }

    // 1. Draw Magical Pedestal Base
    this.drawPedestal(ctx);

    // 2. Draw Floating Particles
    this.drawParticles(ctx, bobY);

    // 3. Draw 3D Floating Laptop
    this.drawLaptop(ctx, bobY);
  }

  drawPedestal(ctx) {
    const pCenter = this.project(0, 85, 0);

    // Pedestal glow
    const grad = ctx.createRadialGradient(pCenter.x, pCenter.y, 10, pCenter.x, pCenter.y, 110);
    grad.addColorStop(0, 'rgba(255, 230, 109, 0.4)');
    grad.addColorStop(1, 'rgba(255, 255, 255, 0)');
    ctx.fillStyle = grad;
    ctx.beginPath();
    ctx.ellipse(pCenter.x, pCenter.y, 110, 36, 0, 0, Math.PI * 2);
    ctx.fill();

    // 3D Stone Ring Pedestal
    ctx.fillStyle = '#e2e8f0';
    ctx.strokeStyle = '#cbd5e1';
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.ellipse(pCenter.x, pCenter.y + 10, 85, 26, 0, 0, Math.PI * 2);
    ctx.fill();
    ctx.stroke();

    ctx.fillStyle = '#ffffff';
    ctx.beginPath();
    ctx.ellipse(pCenter.x, pCenter.y, 80, 24, 0, 0, Math.PI * 2);
    ctx.fill();
    ctx.stroke();
  }

  drawParticles(ctx, bobY) {
    this.particles.forEach((p) => {
      p.angle += p.speed;
      const radius = 100 + Math.sin(p.angle * 2) * 25;
      const px = Math.cos(p.angle) * radius;
      const pz = Math.sin(p.angle) * radius;
      const py = p.y + bobY * 0.4;

      const proj = this.project(px, py, pz);

      ctx.save();
      ctx.globalAlpha = Math.max(0.1, (proj.scale * 1.5));
      ctx.fillStyle = this.state === 'celebrating' ? '#ffe66d' : p.color;
      ctx.beginPath();
      ctx.arc(proj.x, proj.y, p.size * proj.scale, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();
    });
  }

  drawLaptop(ctx, bobY) {
    const baseW = 120;
    const baseD = 85;
    const baseH = 6;

    // Laptop Base Corners
    const p1 = this.project(-baseW / 2, bobY, -baseD / 2);
    const p2 = this.project(baseW / 2, bobY, -baseD / 2);
    const p3 = this.project(baseW / 2, bobY, baseD / 2);
    const p4 = this.project(-baseW / 2, bobY, baseD / 2);

    const b1 = this.project(-baseW / 2, bobY + baseH, -baseD / 2);
    const b2 = this.project(baseW / 2, bobY + baseH, -baseD / 2);
    const b3 = this.project(baseW / 2, bobY + baseH, baseD / 2);
    const b4 = this.project(-baseW / 2, bobY + baseH, baseD / 2);

    // Laptop Base Body (Pastel Rose / Metallic Silver)
    let bodyColor = this.state === 'celebrating' ? '#ffd166' : '#f8fafc';
    let edgeColor = this.state === 'celebrating' ? '#e5a800' : '#cbd5e1';

    // Base bottom/edges
    ctx.fillStyle = edgeColor;
    ctx.beginPath();
    ctx.moveTo(b1.x, b1.y);
    ctx.lineTo(b2.x, b2.y);
    ctx.lineTo(b3.x, b3.y);
    ctx.lineTo(b4.x, b4.y);
    ctx.closePath();
    ctx.fill();

    // Base top surface
    ctx.fillStyle = bodyColor;
    ctx.strokeStyle = edgeColor;
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(p1.x, p1.y);
    ctx.lineTo(p2.x, p2.y);
    ctx.lineTo(p3.x, p3.y);
    ctx.lineTo(p4.x, p4.y);
    ctx.closePath();
    ctx.fill();
    ctx.stroke();

    // Keyboard notch & Trackpad
    const trackCenter = this.project(0, bobY - 1, baseD * 0.2);
    ctx.fillStyle = '#e2e8f0';
    ctx.beginPath();
    ctx.ellipse(trackCenter.x, trackCenter.y, 22 * trackCenter.scale, 10 * trackCenter.scale, 0, 0, Math.PI * 2);
    ctx.fill();

    // Keyboard area
    const kbCenter = this.project(0, bobY - 1, -baseD * 0.15);
    ctx.fillStyle = '#334155';
    ctx.beginPath();
    ctx.ellipse(kbCenter.x, kbCenter.y, 44 * kbCenter.scale, 16 * kbCenter.scale, 0, 0, Math.PI * 2);
    ctx.fill();

    // 4. Draw Open Laptop Screen Lid (Angled back)
    const screenW = baseW;
    const screenH = 80;
    const screenAngle = -0.3; // Screen tilt back

    const sBottomLeft = p1;
    const sBottomRight = p2;
    const sTopLeft = this.project(-screenW / 2, bobY - screenH * Math.cos(screenAngle), -baseD / 2 + screenH * Math.sin(screenAngle));
    const sTopRight = this.project(screenW / 2, bobY - screenH * Math.cos(screenAngle), -baseD / 2 + screenH * Math.sin(screenAngle));

    // Screen Back Shell
    ctx.fillStyle = '#1e293b';
    ctx.strokeStyle = edgeColor;
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.moveTo(sBottomLeft.x, sBottomLeft.y);
    ctx.lineTo(sBottomRight.x, sBottomRight.y);
    ctx.lineTo(sTopRight.x, sTopRight.y);
    ctx.lineTo(sTopLeft.x, sTopLeft.y);
    ctx.closePath();
    ctx.fill();
    ctx.stroke();

    // Glowing Inner Screen Display
    const sInnerBL = this.project(-screenW * 0.44, bobY - 4, -baseD / 2 + 2);
    const sInnerBR = this.project(screenW * 0.44, bobY - 4, -baseD / 2 + 2);
    const sInnerTL = this.project(-screenW * 0.44, bobY - (screenH - 8) * Math.cos(screenAngle), -baseD / 2 + (screenH - 8) * Math.sin(screenAngle));
    const sInnerTR = this.project(screenW * 0.44, bobY - (screenH - 8) * Math.cos(screenAngle), -baseD / 2 + (screenH - 8) * Math.sin(screenAngle));

    let screenGlow = '#38bdf8';
    if (this.state === 'celebrating') screenGlow = '#ffe66d';
    if (this.state === 'pleading') screenGlow = '#93c5fd';

    ctx.fillStyle = screenGlow;
    ctx.beginPath();
    ctx.moveTo(sInnerBL.x, sInnerBL.y);
    ctx.lineTo(sInnerBR.x, sInnerBR.y);
    ctx.lineTo(sInnerTR.x, sInnerTR.y);
    ctx.lineTo(sInnerTL.x, sInnerTL.y);
    ctx.closePath();
    ctx.fill();

    // Screen Cartoon Expression / Face
    const screenCenter = this.project(0, bobY - (screenH * 0.5) * Math.cos(screenAngle), -baseD / 2 + (screenH * 0.5) * Math.sin(screenAngle));
    ctx.save();
    ctx.font = `bold ${Math.round(24 * screenCenter.scale)}px sans-serif`;
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';

    if (this.state === 'celebrating') {
      ctx.fillStyle = '#ff0055';
      ctx.fillText('💖 (^◡^) 💖', screenCenter.x, screenCenter.y);
    } else if (this.state === 'pleading') {
      ctx.fillStyle = '#1e3a8a';
      ctx.fillText('(◕︿◕) 💧', screenCenter.x, screenCenter.y);
    } else {
      ctx.fillStyle = '#0f172a';
      ctx.fillText('💻 LAPPY', screenCenter.x, screenCenter.y);
    }
    ctx.restore();
  }
}

// Global instance handle
window.laptopPedestal = null;
document.addEventListener('DOMContentLoaded', () => {
  window.laptopPedestal = new LaptopPedestal3D('laptopCanvas3D');
});

