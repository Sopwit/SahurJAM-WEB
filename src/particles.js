function rand(a, b) {
  return Math.random() * (b - a) + a;
}

export class ParticleSystem {
  constructor() {
    this.particles = [];
  }

  emit(type, x, y, options = {}) {
    if (type === "smoke") {
      const count = options.count || 3;
      for (let i = 0; i < count; i += 1) {
        this.particles.push({
          type,
          x: x + rand(-8, 8),
          y: y + rand(-4, 4),
          vx: rand(-12, 12),
          vy: rand(-24, -8),
          life: rand(700, 1200),
          maxLife: 1200,
          size: rand(5, 10),
          alpha: 0.55
        });
      }
      return;
    }

    if (type === "sparkle") {
      const count = options.count || 8;
      for (let i = 0; i < count; i += 1) {
        this.particles.push({
          type,
          x,
          y,
          vx: rand(-80, 80),
          vy: rand(-90, -20),
          life: 700,
          maxLife: 700,
          size: rand(3, 6),
          color: options.color || "#f2dd83",
          alpha: 1
        });
      }
      return;
    }

    if (type === "phaseWarm" || type === "phaseCool") {
      const count = options.count || 10;
      for (let i = 0; i < count; i += 1) {
        this.particles.push({
          type: "sparkle",
          x: x + rand(-140, 140),
          y: y + rand(-14, 14),
          vx: rand(-40, 40),
          vy: rand(-30, 20),
          life: 800,
          maxLife: 800,
          size: rand(2, 5),
          color: type === "phaseWarm" ? "#f3c66b" : "#9dd0ff",
          alpha: 1
        });
      }
      return;
    }

    if (type === "popup" || type === "warning") {
      this.particles.push({
        type,
        x,
        y,
        vx: 0,
        vy: type === "warning" ? -5 : -25,
        life: type === "warning" ? 900 : 1200,
        maxLife: type === "warning" ? 900 : 1200,
        text: options.text || "",
        color: options.color || (type === "warning" ? "#ff3d2e" : "#f2d68e"),
        alpha: 1,
        pulse: 0
      });
    }
  }

  update(delta) {
    for (const p of this.particles) {
      p.life -= delta;
      if (p.type === "sparkle") {
        p.vy += 120 * (delta / 1000);
      }
      p.x += p.vx * (delta / 1000);
      p.y += p.vy * (delta / 1000);
      p.alpha = Math.max(0, p.life / p.maxLife);
      if (p.type === "warning") {
        p.pulse += delta * 0.012;
      }
    }
    this.particles = this.particles.filter((p) => p.life > 0);
  }

  draw(ctx) {
    ctx.save();
    for (const p of this.particles) {
      if (p.type === "smoke") {
        ctx.globalAlpha = p.alpha * 0.7;
        ctx.fillStyle = "#8f8f8f";
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fill();
      } else if (p.type === "sparkle") {
        ctx.globalAlpha = p.alpha;
        ctx.fillStyle = p.color;
        ctx.beginPath();
        ctx.moveTo(p.x, p.y - p.size);
        ctx.lineTo(p.x + p.size * 0.5, p.y - p.size * 0.2);
        ctx.lineTo(p.x + p.size, p.y);
        ctx.lineTo(p.x + p.size * 0.5, p.y + p.size * 0.2);
        ctx.lineTo(p.x, p.y + p.size);
        ctx.lineTo(p.x - p.size * 0.5, p.y + p.size * 0.2);
        ctx.lineTo(p.x - p.size, p.y);
        ctx.lineTo(p.x - p.size * 0.5, p.y - p.size * 0.2);
        ctx.closePath();
        ctx.fill();
      } else if (p.type === "popup" || p.type === "warning") {
        ctx.globalAlpha = p.alpha;
        const pulse = p.type === "warning" ? 1 + Math.sin(p.pulse) * 0.06 : 1;
        ctx.save();
        ctx.translate(p.x, p.y);
        ctx.scale(pulse, pulse);
        ctx.fillStyle = p.color;
        ctx.font = p.type === "warning" ? "bold 20px Georgia" : "bold 18px Georgia";
        ctx.textAlign = "center";
        ctx.fillText(p.text, 0, 0);
        ctx.restore();
      }
    }
    ctx.restore();
  }
}
