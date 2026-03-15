const AUDIO_PATHS = {
  ramadanCannon: "./audio/ramazan.mp3",
  sahurLoop: "./audio/sahur.wav",
  orderSuccess: "./audio/siparis-ok.wav",
  cookingLoop: "./audio/yemek-pisme.wav"
};

export class AudioManager {
  constructor() {
    this.ctx = null;
    this.enabled = true;
    this.loopPlayers = new Map();
    this.clipPlayers = new Set();
    this.cannonStopTimer = null;
  }

  ensureContext() {
    if (!this.enabled) return null;
    if (!this.ctx) {
      this.ctx = new (window.AudioContext || window.webkitAudioContext)();
    }
    if (this.ctx.state === "suspended") {
      this.ctx.resume();
    }
    return this.ctx;
  }

  unlock() {
    this.ensureContext();
    if (this.enabled) {
      this.primeLoop("sahur");
      this.primeLoop("cooking");
    }
  }

  primeLoop(key) {
    this.getLoopPlayer(key);
  }

  getLoopPlayer(key) {
    if (this.loopPlayers.has(key)) {
      return this.loopPlayers.get(key);
    }

    const src = key === "sahur" ? AUDIO_PATHS.sahurLoop : AUDIO_PATHS.cookingLoop;
    const audio = new Audio(src);
    audio.preload = "auto";
    audio.loop = true;
    audio.volume = key === "sahur" ? 0.22 : 0.34;
    this.loopPlayers.set(key, audio);
    return audio;
  }

  playLoop(key) {
    if (!this.enabled) return;
    const audio = this.getLoopPlayer(key);
    if (!audio.paused) return;
    audio.currentTime = 0;
    audio.play().catch(() => {});
  }

  stopLoop(key) {
    const audio = this.loopPlayers.get(key);
    if (!audio) return;
    audio.pause();
    audio.currentTime = 0;
  }

  setSahurActive(active) {
    if (!this.enabled || !active) {
      this.stopLoop("sahur");
      return;
    }
    this.playLoop("sahur");
  }

  setCookingActive(active) {
    if (!this.enabled || !active) {
      this.stopLoop("cooking");
      return;
    }
    this.playLoop("cooking");
  }

  playClip(src, { volume = 0.45, startAt = 0, endAt = null } = {}) {
    if (!this.enabled) return null;
    const audio = new Audio(src);
    audio.preload = "auto";
    audio.volume = volume;

    const stopPlayback = () => {
      audio.pause();
      audio.currentTime = 0;
      this.clipPlayers.delete(audio);
    };

    const startPlayback = () => {
      audio.currentTime = startAt;
      audio.play().catch(() => {});
      if (endAt !== null) {
        const durationMs = Math.max(0, (endAt - startAt) * 1000);
        window.setTimeout(stopPlayback, durationMs);
      }
    };

    audio.addEventListener("loadedmetadata", startPlayback, { once: true });
    audio.addEventListener("ended", () => this.clipPlayers.delete(audio), { once: true });
    audio.load();
    this.clipPlayers.add(audio);
    return audio;
  }

  playRamadanCannon() {
    if (!this.enabled) return;
    if (this.cannonStopTimer) {
      window.clearTimeout(this.cannonStopTimer);
      this.cannonStopTimer = null;
    }
    this.playClip(AUDIO_PATHS.ramadanCannon, {
      volume: 0.5
    });
  }

  playOrderSuccess() {
    this.playClip(AUDIO_PATHS.orderSuccess, { volume: 0.5 });
  }

  stopAll() {
    this.stopLoop("sahur");
    this.stopLoop("cooking");
    if (this.cannonStopTimer) {
      window.clearTimeout(this.cannonStopTimer);
      this.cannonStopTimer = null;
    }
    for (const player of this.clipPlayers) {
      player.pause();
      player.currentTime = 0;
    }
    this.clipPlayers.clear();
  }

  tone({ frequency = 440, duration = 0.12, type = "sine", gain = 0.04, slideTo = null }) {
    const ctx = this.ensureContext();
    if (!ctx) return;

    const now = ctx.currentTime;
    const osc = ctx.createOscillator();
    const amp = ctx.createGain();

    osc.type = type;
    osc.frequency.setValueAtTime(frequency, now);
    if (slideTo !== null) {
      osc.frequency.linearRampToValueAtTime(slideTo, now + duration);
    }

    amp.gain.setValueAtTime(0.0001, now);
    amp.gain.exponentialRampToValueAtTime(Math.max(0.0001, gain), now + 0.02);
    amp.gain.exponentialRampToValueAtTime(0.0001, now + duration);

    osc.connect(amp);
    amp.connect(ctx.destination);

    osc.start(now);
    osc.stop(now + duration + 0.02);
  }

  playMenuStart() {
    this.tone({ frequency: 392, duration: 0.1, type: "triangle", gain: 0.04 });
    setTimeout(() => this.tone({ frequency: 523, duration: 0.14, type: "triangle", gain: 0.04 }), 70);
  }

  playInteract() {
    this.tone({ frequency: 620, duration: 0.05, type: "square", gain: 0.02, slideTo: 560 });
  }

  playFail() {
    this.tone({ frequency: 220, duration: 0.16, type: "sawtooth", gain: 0.035, slideTo: 160 });
  }

  playWarning() {
    this.tone({ frequency: 300, duration: 0.08, type: "square", gain: 0.02 });
  }

  playChopTick() {
    this.tone({ frequency: 800, duration: 0.03, type: "square", gain: 0.015 });
  }
}
