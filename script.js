/* ===================================================
   Nimishka's Birthday Extravaganza - Interactive Engine
=================================================== */

document.addEventListener('DOMContentLoaded', () => {
  initAudioEngine();
  initAmbientCanvas();
  initCelebrationDashboard();
  initCakeCandles();
  initImageVault();
  initScratchCard();
  initGiftBox();
  initQuiz();
  initFireworksLaunchpad();
  initPopperAndBalloons();
  initCurtain();
  initFlipCards();
  initMobileNav();
});

/* ================= 1. WEB AUDIO API SOUND & MUSIC ENGINE ================= */
// Synthesizes pleasant acoustic music box sounds & SFX with zero external assets required
let audioCtx = null;
let isMusicPlaying = false;
let musicInterval = null;
let currentNoteIndex = 0;

function getAudioContext() {
  if (!audioCtx) {
    const AudioContextClass = window.AudioContext || window.webkitAudioContext;
    audioCtx = new AudioContextClass();
  }
  if (audioCtx.state === 'suspended') {
    audioCtx.resume();
  }
  return audioCtx;
}

// Sanskrit Birthday melody note frequencies
const NOTES = {
  C4: 261.63, D4: 293.66, E4: 329.63, F4: 349.23, G4: 392.00, A4: 440.00, B4: 493.88,
  C5: 523.25, D5: 587.33, E5: 659.25, F5: 698.46, G5: 783.99, A5: 880.00, B5: 987.77,
  C6: 1046.50
};

// Sanskrit Birthday Song Verses & Meanings ("जन्मदिनमिदम् अयि प्रिय सखे")
const SANSKRIT_VERSES = [
  {
    hindi: "जन्मदिनमिदम् अयि प्रिय सखे",
    translit: "Janmadinam-idam ayi priya sakhe",
    meaning: "O dear beloved friend Nimishka, today is your auspicious birthday!"
  },
  {
    hindi: "शं तनोतु ते सर्वदा मुदम्",
    translit: "Sham tanotu te sarvada mudam",
    meaning: "May this sacred day bestow divine peace, health, and eternal happiness upon you!"
  },
  {
    hindi: "प्रार्थयामहे भव शतायुषी",
    translit: "Prarthayamahe bhava shatayushi",
    meaning: "With all our hearts, we pray that you live a long, radiant life of a hundred years!"
  },
  {
    hindi: "ईश्वरः सदा त्वां च रक्षतु",
    translit: "Ishwarah sada tvam cha rakshatu",
    meaning: "May the Almighty Divine always guide you, bless your path, and protect you at every step!"
  },
  {
    hindi: "पुण्यकर्मणा कीर्तिमर्जय",
    translit: "Punyakarmaṇā keertim-arjaya",
    meaning: "May you achieve glorious success and heartfelt reverence through noble deeds!"
  },
  {
    hindi: "जीवनं तव भवतु सार्थकम्",
    translit: "Jeevanam tava bhavatu sarthakam",
    meaning: "May your life be deeply purposeful, joyous, meaningful, and cherished forever!"
  }
];

// Melody: Sanskrit Birthday Song ("जन्मदिनमिदम् अयि प्रिय सखे")
const sanskritBirthdayMelody = [
  // 1. जन्मदिनमिदम् अयि प्रिय सखे
  { note: NOTES.E4, dur: 300, verse: 0 },
  { note: NOTES.E4, dur: 300, verse: 0 },
  { note: NOTES.E4, dur: 300, verse: 0 },
  { note: NOTES.F4, dur: 300, verse: 0 },
  { note: NOTES.G4, dur: 420, verse: 0 },
  { note: NOTES.G4, dur: 550, verse: 0 },
  { note: NOTES.G4, dur: 320, verse: 0 },
  { note: NOTES.A4, dur: 450, verse: 0 },
  { note: NOTES.G4, dur: 350, verse: 0 },
  { note: NOTES.F4, dur: 350, verse: 0 },
  { note: NOTES.E4, dur: 420, verse: 0 },
  { note: NOTES.D4, dur: 900, verse: 0 },
  { note: null, dur: 300, verse: 0 },

  // 2. शं तनोतु ते सर्वदा मुदम्
  { note: NOTES.E4, dur: 320, verse: 1 },
  { note: NOTES.F4, dur: 320, verse: 1 },
  { note: NOTES.G4, dur: 380, verse: 1 },
  { note: NOTES.G4, dur: 380, verse: 1 },
  { note: NOTES.G4, dur: 550, verse: 1 },
  { note: NOTES.A4, dur: 350, verse: 1 },
  { note: NOTES.G4, dur: 350, verse: 1 },
  { note: NOTES.F4, dur: 450, verse: 1 },
  { note: NOTES.E4, dur: 400, verse: 1 },
  { note: NOTES.E4, dur: 1050, verse: 1 },
  { note: null, dur: 350, verse: 1 },

  // 3. प्रार्थयामहे भव शतायुषी
  { note: NOTES.G4, dur: 320, verse: 2 },
  { note: NOTES.A4, dur: 320, verse: 2 },
  { note: NOTES.C5, dur: 400, verse: 2 },
  { note: NOTES.C5, dur: 400, verse: 2 },
  { note: NOTES.C5, dur: 550, verse: 2 },
  { note: NOTES.D5, dur: 380, verse: 2 },
  { note: NOTES.C5, dur: 450, verse: 2 },
  { note: NOTES.A4, dur: 380, verse: 2 },
  { note: NOTES.G4, dur: 450, verse: 2 },
  { note: NOTES.G4, dur: 450, verse: 2 },
  { note: NOTES.G4, dur: 1100, verse: 2 },
  { note: null, dur: 350, verse: 2 },

  // 4. ईश्वरः सदा त्वां च रक्षतु
  { note: NOTES.A4, dur: 320, verse: 3 },
  { note: NOTES.G4, dur: 320, verse: 3 },
  { note: NOTES.F4, dur: 380, verse: 3 },
  { note: NOTES.E4, dur: 420, verse: 3 },
  { note: NOTES.E4, dur: 500, verse: 3 },
  { note: NOTES.D4, dur: 350, verse: 3 },
  { note: NOTES.E4, dur: 380, verse: 3 },
  { note: NOTES.D4, dur: 380, verse: 3 },
  { note: NOTES.C4, dur: 450, verse: 3 },
  { note: NOTES.C4, dur: 1150, verse: 3 },
  { note: null, dur: 400, verse: 3 },

  // 5. पुण्यकर्मणा कीर्तिमर्जय
  { note: NOTES.G4, dur: 320, verse: 4 },
  { note: NOTES.A4, dur: 320, verse: 4 },
  { note: NOTES.C5, dur: 400, verse: 4 },
  { note: NOTES.C5, dur: 400, verse: 4 },
  { note: NOTES.C5, dur: 550, verse: 4 },
  { note: NOTES.D5, dur: 380, verse: 4 },
  { note: NOTES.C5, dur: 420, verse: 4 },
  { note: NOTES.A4, dur: 380, verse: 4 },
  { note: NOTES.G4, dur: 450, verse: 4 },
  { note: NOTES.G4, dur: 1050, verse: 4 },
  { note: null, dur: 350, verse: 4 },

  // 6. जीवनं तव भवतु सार्थकम्
  { note: NOTES.A4, dur: 320, verse: 5 },
  { note: NOTES.G4, dur: 320, verse: 5 },
  { note: NOTES.F4, dur: 380, verse: 5 },
  { note: NOTES.E4, dur: 420, verse: 5 },
  { note: NOTES.E4, dur: 500, verse: 5 },
  { note: NOTES.D4, dur: 350, verse: 5 },
  { note: NOTES.E4, dur: 380, verse: 5 },
  { note: NOTES.D4, dur: 380, verse: 5 },
  { note: NOTES.C4, dur: 450, verse: 5 },
  { note: NOTES.C4, dur: 450, verse: 5 },
  { note: NOTES.C4, dur: 1550, verse: 5 },
  { note: null, dur: 900, verse: 5 }
];

function playTone(freq, duration = 0.5, type = 'sine', gainVal = 0.12) {
  try {
    const ctx = getAudioContext();
    const osc = ctx.createOscillator();
    const gainNode = ctx.createGain();

    osc.type = type;
    osc.frequency.setValueAtTime(freq, ctx.currentTime);

    // Warm, music-box bell like envelope
    gainNode.gain.setValueAtTime(gainVal, ctx.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + duration);

    osc.connect(gainNode);
    gainNode.connect(ctx.destination);

    osc.start();
    osc.stop(ctx.currentTime + duration);
  } catch (e) {
    console.warn("Audio playback not allowed yet", e);
  }
}

// Sound Effects
function playChimeSFX() {
  const notes = [523.25, 659.25, 783.99, 1046.50];
  notes.forEach((freq, idx) => {
    setTimeout(() => playTone(freq, 0.45, 'triangle', 0.15), idx * 80);
  });
}

function playPopperSFX() {
  try {
    const ctx = getAudioContext();
    // Noise burst for party popper pop
    const bufferSize = ctx.sampleRate * 0.15;
    const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
    const data = buffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i++) {
      data[i] = Math.random() * 2 - 1;
    }
    const noise = ctx.createBufferSource();
    noise.buffer = buffer;
    const filter = ctx.createBiquadFilter();
    filter.type = 'lowpass';
    filter.frequency.value = 1200;

    const gain = ctx.createGain();
    gain.gain.setValueAtTime(0.3, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.15);

    noise.connect(filter);
    filter.connect(gain);
    gain.connect(ctx.destination);
    noise.start();

    // follow with celebratory chime
    setTimeout(playChimeSFX, 100);
  } catch (e) {}
}

function playBlowSFX() {
  try {
    const ctx = getAudioContext();
    const bufferSize = ctx.sampleRate * 0.25;
    const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
    const data = buffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i++) {
      data[i] = (Math.random() * 2 - 1) * Math.exp(-i / (ctx.sampleRate * 0.08));
    }
    const noise = ctx.createBufferSource();
    noise.buffer = buffer;
    const filter = ctx.createBiquadFilter();
    filter.type = 'bandpass';
    filter.frequency.value = 800;

    const gain = ctx.createGain();
    gain.gain.setValueAtTime(0.2, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.25);

    noise.connect(filter);
    filter.connect(gain);
    gain.connect(ctx.destination);
    noise.start();
  } catch (e) {}
}

function playWhistleSFX() {
  try {
    const ctx = getAudioContext();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = 'sine';
    const now = ctx.currentTime;
    osc.frequency.setValueAtTime(320, now);
    osc.frequency.exponentialRampToValueAtTime(1500, now + 0.35);

    gain.gain.setValueAtTime(0.035, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.35);

    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.start(now);
    osc.stop(now + 0.35);
  } catch (e) {}
}

function playBoomSFX() {
  try {
    const ctx = getAudioContext();
    const bufferSize = ctx.sampleRate * 0.45;
    const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
    const data = buffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i++) {
      data[i] = (Math.random() * 2 - 1) * Math.exp(-i / (ctx.sampleRate * 0.09));
    }
    const noise = ctx.createBufferSource();
    noise.buffer = buffer;
    const filter = ctx.createBiquadFilter();
    filter.type = 'lowpass';
    filter.frequency.value = 260;

    const gain = ctx.createGain();
    gain.gain.setValueAtTime(0.35, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.45);

    noise.connect(filter);
    filter.connect(gain);
    gain.connect(ctx.destination);
    noise.start();
  } catch (e) {}
}

// Timbre: Soothing Indian classical flute (Bansuri) with vibrato and music-box chime harmonics
function playFluteTone(freq, duration = 0.5, gainVal = 0.14) {
  try {
    const ctx = getAudioContext();
    const now = ctx.currentTime;

    const masterGain = ctx.createGain();
    masterGain.gain.setValueAtTime(0.0001, now);
    masterGain.gain.exponentialRampToValueAtTime(gainVal, now + 0.04);
    masterGain.gain.setValueAtTime(gainVal, now + duration * 0.75);
    masterGain.gain.exponentialRampToValueAtTime(0.0001, now + duration);

    // Primary bansuri sine oscillator
    const osc1 = ctx.createOscillator();
    osc1.type = 'sine';
    osc1.frequency.setValueAtTime(freq, now);

    // Gentle classical vibrato LFO (giving breath & natural soul to each note)
    const lfo = ctx.createOscillator();
    const lfoGain = ctx.createGain();
    lfo.frequency.setValueAtTime(4.6, now);
    lfoGain.gain.setValueAtTime(1.8, now);
    lfo.connect(osc1.frequency);
    lfo.start(now + 0.08);
    lfo.stop(now + duration);

    // Gentle harmonic overtone oscillator
    const osc2 = ctx.createOscillator();
    const osc2Gain = ctx.createGain();
    osc2.type = 'triangle';
    osc2.frequency.setValueAtTime(freq * 2, now);
    osc2Gain.gain.setValueAtTime(0.24, now);

    osc1.connect(masterGain);
    osc2.connect(osc2Gain);
    osc2Gain.connect(masterGain);
    masterGain.connect(ctx.destination);

    osc1.start(now);
    osc2.start(now);
    osc1.stop(now + duration);
    osc2.stop(now + duration);
  } catch (e) {
    console.warn("Audio playback not allowed yet", e);
  }
}

// Dynamic Sanskrit Lyrics Karaoke Tracker
let currentVerseIndex = -1;

function updateSanskritLyrics(verseIdx) {
  if (verseIdx === undefined || verseIdx === null) return;
  if (verseIdx === currentVerseIndex) return;
  currentVerseIndex = verseIdx;

  const banner = document.getElementById('sanskrit-lyrics-banner');
  const hindiEl = document.getElementById('sanskrit-lyric-hindi');
  const meaningEl = document.getElementById('sanskrit-lyric-meaning');

  if (!banner || !hindiEl || !meaningEl) return;
  const verse = SANSKRIT_VERSES[verseIdx];
  if (!verse) return;

  banner.classList.remove('hidden');

  hindiEl.style.opacity = '0';
  meaningEl.style.opacity = '0';
  hindiEl.style.transform = 'translateY(4px)';

  setTimeout(() => {
    hindiEl.textContent = verse.hindi;
    meaningEl.textContent = verse.meaning;
    hindiEl.style.opacity = '1';
    meaningEl.style.opacity = '1';
    hindiEl.style.transform = 'translateY(0)';
  }, 120);
}

function showSanskritLyricsBanner() {
  const banner = document.getElementById('sanskrit-lyrics-banner');
  if (banner) {
    banner.classList.remove('hidden');
    banner.style.display = 'block';
  }
}

function hideSanskritLyricsBanner() {
  const banner = document.getElementById('sanskrit-lyrics-banner');
  if (banner) {
    banner.classList.add('hidden');
    setTimeout(() => {
      if (banner.classList.contains('hidden')) {
        banner.style.display = 'none';
      }
    }, 400);
  }
}

let audioElem = null;
let isAudioElemPlaying = false;

function updateMusicUI(playing) {
  const musicBtns = [document.getElementById('music-toggle-btn'), document.getElementById('fab-music')];
  musicBtns.forEach(btn => {
    if (playing) {
      btn?.classList.add('playing');
    } else {
      btn?.classList.remove('playing');
    }
  });

  const label = document.getElementById('music-btn-label');
  if (label) {
    label.textContent = playing ? '⏸️ विरामः (Pause)' : '🎵 जन्मदिन गानम्';
  }
}

function startMusicLoop() {
  if (isMusicPlaying) return;
  isMusicPlaying = true;
  updateMusicUI(true);
  showSanskritLyricsBanner();

  // 1. Try local audio file if provided by user
  if (!audioElem) {
    audioElem = document.getElementById('sanskrit-audio');
    if (audioElem) {
      audioElem.addEventListener('ended', () => {
        if (isMusicPlaying) {
          audioElem.currentTime = 0;
          audioElem.play().catch(() => {});
        }
      });
      audioElem.addEventListener('timeupdate', () => {
        if (!isMusicPlaying || !audioElem.duration) return;
        const pct = audioElem.currentTime / audioElem.duration;
        const vIdx = Math.min(Math.floor(pct * SANSKRIT_VERSES.length), SANSKRIT_VERSES.length - 1);
        updateSanskritLyrics(vIdx);
      });
    }
  }

  if (audioElem && audioElem.currentSrc) {
    const playPromise = audioElem.play();
    if (playPromise !== undefined) {
      playPromise.then(() => {
        isAudioElemPlaying = true;
        return;
      }).catch(() => {
        // Fall back to built-in Web Audio API synthesizer
        isAudioElemPlaying = false;
        startSynthesizerMelody();
      });
      return;
    }
  }

  // 2. Built-in Web Audio API Sanskrit Bansuri synthesis
  startSynthesizerMelody();
}

function startSynthesizerMelody() {
  function step() {
    if (!isMusicPlaying) return;
    const item = sanskritBirthdayMelody[currentNoteIndex];

    if (item.verse !== undefined) {
      updateSanskritLyrics(item.verse);
    }

    if (item.note) {
      playFluteTone(item.note, item.dur / 1000 * 1.35, 0.14);
    }

    currentNoteIndex = (currentNoteIndex + 1) % sanskritBirthdayMelody.length;
    musicInterval = setTimeout(step, item.dur);
  }
  step();
}

function stopMusicLoop() {
  isMusicPlaying = false;
  clearTimeout(musicInterval);
  if (audioElem) {
    audioElem.pause();
  }
  isAudioElemPlaying = false;
  updateMusicUI(false);
}

function toggleMusic() {
  if (isMusicPlaying) {
    stopMusicLoop();
  } else {
    getAudioContext();
    startMusicLoop();
  }
}

function initAudioEngine() {
  const musicBtns = [document.getElementById('music-toggle-btn'), document.getElementById('fab-music')];
  musicBtns.forEach(btn => {
    btn?.addEventListener('click', toggleMusic);
  });

  const closeLyricsBtn = document.getElementById('close-lyrics-btn');
  closeLyricsBtn?.addEventListener('click', (e) => {
    e.stopPropagation();
    hideSanskritLyricsBanner();
  });
}

/* ================= 2. CURTAIN UNLOCK ================= */
function initCurtain() {
  const curtain = document.getElementById('welcome-curtain');
  const triggers = document.querySelectorAll('.curtain-unlock-trigger');

  function unlock() {
    getAudioContext();
    playPopperSFX();
    triggerFullConfettiBurst();
    startMusicLoop();

    curtain.classList.add('hidden');
    setTimeout(() => {
      curtain.style.display = 'none';
    }, 900);
  }

  triggers.forEach(el => el.addEventListener('click', unlock));
}

/* ================= 3. AMBIENT PARTICLES CANVAS ================= */
function initAmbientCanvas() {
  const canvas = document.getElementById('ambient-canvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  let width = (canvas.width = window.innerWidth);
  let height = (canvas.height = window.innerHeight);

  window.addEventListener('resize', () => {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
  });

  const particles = [];
  const particleCount = 45;

  class Particle {
    constructor() {
      this.reset();
    }
    reset() {
      this.x = Math.random() * width;
      this.y = Math.random() * height;
      this.size = Math.random() * 2.5 + 0.8;
      this.speedY = -(Math.random() * 0.5 + 0.2);
      this.speedX = (Math.random() - 0.5) * 0.4;
      this.opacity = Math.random() * 0.6 + 0.2;
      this.hue = Math.random() > 0.5 ? 330 : 45; // Pink or Gold
    }
    update() {
      this.y += this.speedY;
      this.x += this.speedX;
      if (this.y < -10) {
        this.y = height + 10;
        this.x = Math.random() * width;
      }
    }
    draw() {
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
      ctx.fillStyle = `hsla(${this.hue}, 100%, 75%, ${this.opacity})`;
      ctx.shadowBlur = 10;
      ctx.shadowColor = `hsla(${this.hue}, 100%, 70%, 0.8)`;
      ctx.fill();
    }
  }

  for (let i = 0; i < particleCount; i++) {
    particles.push(new Particle());
  }

  function animate() {
    ctx.clearRect(0, 0, width, height);
    particles.forEach(p => {
      p.update();
      p.draw();
    });
    requestAnimationFrame(animate);
  }
  animate();
}

/* ================= 4. BIRTHDAY CELEBRATION DASHBOARD ================= */
function initCelebrationDashboard() {
  const timeTicker = document.getElementById('live-time-ticker');

  function update() {
    const now = new Date();
    const h = String(now.getHours()).padStart(2, '0');
    const m = String(now.getMinutes()).padStart(2, '0');
    const s = String(now.getSeconds()).padStart(2, '0');

    if (timeTicker) {
      timeTicker.textContent = `${h}:${m}:${s}`;
    }
  }

  update();
  setInterval(update, 1000);
}

/* ================= 5. CAKE & CANDLE BLOWING ================= */
function initCakeCandles() {
  const candles = document.querySelectorAll('.candle');
  const blowBtn = document.getElementById('blow-candles-btn');
  const cakeStatus = document.getElementById('cake-wish-banner');
  let blownCount = 0;

  candles.forEach((candle, idx) => {
    candle.addEventListener('click', () => {
      const flame = candle.querySelector('.flame');
      if (flame && !flame.classList.contains('blown-out')) {
        flame.classList.add('blown-out');
        playBlowSFX();
        createSmokePuff(candle);
        blownCount++;
        checkAllBlown();
      }
    });
  });

  blowBtn?.addEventListener('click', () => {
    candles.forEach((candle, idx) => {
      setTimeout(() => {
        const flame = candle.querySelector('.flame');
        if (flame && !flame.classList.contains('blown-out')) {
          flame.classList.add('blown-out');
          createSmokePuff(candle);
          blownCount++;
          if (idx === candles.length - 1) {
            checkAllBlown();
          }
        }
      }, idx * 180);
    });
    playBlowSFX();
  });

  function checkAllBlown() {
    if (blownCount >= candles.length) {
      setTimeout(() => {
        playChimeSFX();
        triggerFullConfettiBurst();
        if (cakeStatus) {
          cakeStatus.classList.remove('hidden');
          cakeStatus.innerHTML = `
            <div class="glass-panel p-6 text-center animate-bounce-short border-pink-400">
              <span class="text-3xl">✨🎂⭐</span>
              <h3 class="text-2xl font-bold text-gold-gradient mt-2 font-serif">WISH LOCKED INTO THE STARS!</h3>
              <p class="text-pink-200 mt-1">May every single dream of yours come true this year, Nimishka! You deserve only the best!</p>
            </div>
          `;
        }
      }, 500);
    }
  }

  function createSmokePuff(candle) {
    const rect = candle.getBoundingClientRect();
    for (let i = 0; i < 6; i++) {
      const smoke = document.createElement('div');
      smoke.className = 'absolute rounded-full pointer-events-none';
      smoke.style.width = `${Math.random() * 10 + 6}px`;
      smoke.style.height = smoke.style.width;
      smoke.style.background = 'rgba(220, 220, 220, 0.6)';
      smoke.style.left = `${candle.offsetLeft + 4}px`;
      smoke.style.top = `${candle.offsetTop - 15}px`;
      smoke.style.filter = 'blur(4px)';
      smoke.style.transition = 'all 0.8s ease-out';
      candle.parentElement.appendChild(smoke);

      setTimeout(() => {
        smoke.style.transform = `translate(${(Math.random() - 0.5) * 40}px, -${Math.random() * 40 + 20}px) scale(2.2)`;
        smoke.style.opacity = '0';
      }, 20);

      setTimeout(() => smoke.remove(), 900);
    }
  }
}

/* ================= 6. POLAROID PHOTO MEMORIES VAULT & LIGHTBOX ================= */
const DEFAULT_PHOTOS = [
  {
    file: 'photo1.jpg',
    title: 'The Iconic PM Madam 👑',
    caption: 'Effortless grace, radiant leadership, and pure main character energy.',
    category: 'boss',
    date: 'Classic Moment',
    sticker: '👑 PM Madam',
    tilt: '-2.5deg',
    gradient: 'from-pink-600 to-purple-800'
  },
  {
    file: 'photo2.jpg',
    title: 'That Room-Lighting Smile ✨',
    caption: 'The brightest smile that instantly turns any ordinary day into sunshine.',
    category: 'smile',
    date: 'Pure Glow',
    sticker: '✨ Radiant',
    tilt: '2.5deg',
    gradient: 'from-amber-500 to-rose-600'
  },
  {
    file: 'photo3.jpg',
    title: 'Unfiltered Laughs & Banter 😂',
    caption: 'Those stomach-hurting laughs, witty comebacks, and non-stop joy.',
    category: 'laughs',
    date: 'Top Tier Banter',
    sticker: '😂 Pure Joy',
    tilt: '-1.8deg',
    gradient: 'from-purple-600 to-pink-500'
  },
  {
    file: 'photo4.jpg',
    title: 'Aesthetic Queen 🌸',
    caption: 'Effortlessly chic, iconic style, and looking stunning as always.',
    category: 'vibes',
    date: 'Iconic Look',
    sticker: '🌸 Main Character',
    tilt: '3deg',
    gradient: 'from-rose-500 to-indigo-700'
  },
  {
    file: 'photo5.jpg',
    title: 'Golden Heart & True Friend 💛',
    caption: 'The friend who always shows up, listens, and brings unwavering loyalty.',
    category: 'memories',
    date: 'One in a Million',
    sticker: '💛 Pure Gold',
    tilt: '-2deg',
    gradient: 'from-yellow-500 to-amber-700'
  },
  {
    file: 'photo6.jpg',
    title: 'Unstoppable Boss Vibes 🚀',
    caption: 'Crushing goals, taking charge, and destined for supreme greatness.',
    category: 'boss',
    date: 'Future Ruler',
    sticker: '🚀 Ambition',
    tilt: '1.5deg',
    gradient: 'from-blue-600 to-purple-700'
  },
  {
    file: 'photo7.jpg',
    title: 'Coffee, Talks & Good Vibes ☕',
    caption: 'Here is to all the unforgettable conversations and good times we treasure.',
    category: 'memories',
    date: 'Sweet Moments',
    sticker: '☕ Cozy Vibes',
    tilt: '-2.2deg',
    gradient: 'from-emerald-500 to-teal-800'
  },
  {
    file: 'photo8.jpg',
    title: 'Birthday Royalty Nimishka 💖',
    caption: 'May this upcoming year shower you with endless love, peace, and glory!',
    category: 'vibes',
    date: 'Birthday Special',
    sticker: '💖 Queen Today',
    tilt: '2.2deg',
    gradient: 'from-pink-500 to-rose-700'
  }
];

let allPhotos = [...DEFAULT_PHOTOS];
let currentPhotoIdx = 0;
let currentFilter = 'all';

function initImageVault() {
  const grid = document.getElementById('photo-grid');
  const modal = document.getElementById('photo-modal');
  const modalImg = document.getElementById('modal-photo-img');
  const modalPlaceholder = document.getElementById('modal-photo-placeholder');
  const modalTitle = document.getElementById('modal-photo-title');
  const modalCaption = document.getElementById('modal-photo-desc');
  const modalBadge = document.getElementById('modal-photo-badge');
  const closeBtn = document.getElementById('photo-modal-close');
  const prevBtn = document.getElementById('photo-prev-btn');
  const nextBtn = document.getElementById('photo-next-btn');
  const filterBtns = document.querySelectorAll('.photo-filter-btn');
  const uploadInput = document.getElementById('photo-upload-input');

  if (!grid) return;

  // Load custom photos from localStorage
  try {
    const saved = localStorage.getItem('nimishka_user_photos');
    if (saved) {
      const parsed = JSON.parse(saved);
      if (Array.isArray(parsed) && parsed.length > 0) {
        allPhotos = [...parsed, ...DEFAULT_PHOTOS];
      }
    }
  } catch (e) {}

  window.handlePolaroidImgError = function(img) {
    const original = img.dataset.original;
    if (!original) {
      img.classList.add('hidden');
      if (img.nextElementSibling) img.nextElementSibling.classList.remove('hidden');
      return;
    }
    let step = parseInt(img.dataset.extStep || '0', 10);
    const base = original.replace(/\.[^/.]+$/, '');
    const extensions = ['.png', '.jpeg', '.webp', '.PNG', '.JPG', '.JPEG'];
    if (step < extensions.length) {
      img.dataset.extStep = (step + 1).toString();
      img.src = base + extensions[step];
    } else {
      img.classList.add('hidden');
      if (img.nextElementSibling) img.nextElementSibling.classList.remove('hidden');
    }
  };

  function renderPhotos() {
    const visiblePhotos = allPhotos.filter(p => currentFilter === 'all' || p.category === currentFilter);

    if (visiblePhotos.length === 0) {
      grid.innerHTML = `
        <div class="col-span-full text-center py-12 text-gray-400">
          <p class="text-3xl mb-2">📸</p>
          <p>No photos found in this category.</p>
        </div>
      `;
      return;
    }

    grid.innerHTML = visiblePhotos.map((item) => {
      const idx = allPhotos.indexOf(item);
      const imgSrc = item.dataUrl || item.file;
      return `
        <div class="polaroid-card" style="--tilt: ${item.tilt || '0deg'};" data-idx="${idx}">
          <div class="polaroid-sticker">${item.sticker}</div>
          <div class="polaroid-img-box">
            <img src="${imgSrc}" alt="${escapeHTML(item.title)}" class="polaroid-img"
                 data-original="${item.file || ''}"
                 onerror="handlePolaroidImgError(this)">
            <div class="polaroid-art-placeholder bg-gradient-to-br ${item.gradient || 'from-pink-600 to-purple-800'} hidden">
              <span class="text-4xl mb-2">📸✨</span>
              <div class="font-serif font-bold text-sm tracking-wide text-white">${escapeHTML(item.title)}</div>
              <div class="text-[11px] text-pink-200 mt-1 italic font-medium">Click to view snapshot</div>
            </div>
          </div>
          <div class="polaroid-caption-area">
            <h3 class="polaroid-title">${escapeHTML(item.title)}</h3>
            <p class="polaroid-desc">${escapeHTML(item.caption)}</p>
            <span class="polaroid-date">${escapeHTML(item.date)}</span>
          </div>
        </div>
      `;
    }).join('');

    // Attach click listeners to polaroid cards
    grid.querySelectorAll('.polaroid-card').forEach(card => {
      card.addEventListener('click', () => {
        const idx = parseInt(card.dataset.idx, 10);
        openPhotoModal(idx);
      });
    });
  }

  // Filter click logic
  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      currentFilter = btn.dataset.filter || 'all';
      renderPhotos();
    });
  });

  // Photo Lightbox modal functions
  function openPhotoModal(idx) {
    currentPhotoIdx = idx;
    const item = allPhotos[idx];
    if (!item) return;

    modalTitle.textContent = item.title;
    modalCaption.textContent = item.caption;
    modalBadge.textContent = `${item.sticker} • ${item.date}`;

    const imgSrc = item.dataUrl || item.file;
    modalImg.src = imgSrc;
    modalImg.dataset.extStep = '0';
    modalImg.classList.remove('hidden');
    modalPlaceholder.classList.add('hidden');

    modalImg.onerror = () => {
      const originalFile = item.file || '';
      let step = parseInt(modalImg.dataset.extStep || '0', 10);
      const base = originalFile.replace(/\.[^/.]+$/, '');
      const extensions = ['.png', '.jpeg', '.webp', '.PNG', '.JPG', '.JPEG'];
      if (!imgSrc.startsWith('data:') && step < extensions.length) {
        modalImg.dataset.extStep = (step + 1).toString();
        modalImg.src = base + extensions[step];
      } else {
        modalImg.classList.add('hidden');
        modalPlaceholder.className = `photo-modal-placeholder bg-gradient-to-br ${item.gradient || 'from-pink-600 to-purple-800'}`;
        modalPlaceholder.innerHTML = `
          <span class="text-6xl mb-4 inline-block">📸✨</span>
          <h3 class="text-2xl font-bold font-serif text-white mb-2">${escapeHTML(item.title)}</h3>
          <p class="text-pink-100 text-sm max-w-md mx-auto italic font-medium">"${escapeHTML(item.caption)}"</p>
        `;
        modalPlaceholder.classList.remove('hidden');
      }
    };

    modal.classList.add('active');
  }

  function closePhotoModal() {
    modal.classList.remove('active');
    modalImg.src = '';
  }

  closeBtn?.addEventListener('click', closePhotoModal);
  modal?.addEventListener('click', (e) => {
    if (e.target === modal) closePhotoModal();
  });

  prevBtn?.addEventListener('click', () => {
    currentPhotoIdx = (currentPhotoIdx - 1 + allPhotos.length) % allPhotos.length;
    openPhotoModal(currentPhotoIdx);
  });

  nextBtn?.addEventListener('click', () => {
    currentPhotoIdx = (currentPhotoIdx + 1) % allPhotos.length;
    openPhotoModal(currentPhotoIdx);
  });

  // Keyboard navigation for lightbox
  window.addEventListener('keydown', (e) => {
    if (!modal.classList.contains('active')) return;
    if (e.key === 'Escape') closePhotoModal();
    if (e.key === 'ArrowLeft') prevBtn?.click();
    if (e.key === 'ArrowRight') nextBtn?.click();
  });

  // Upload custom photos via file picker
  uploadInput?.addEventListener('change', (e) => {
    const files = Array.from(e.target.files || []);
    if (files.length === 0) return;

    let userPhotos = [];
    try {
      const saved = localStorage.getItem('nimishka_user_photos');
      if (saved) userPhotos = JSON.parse(saved);
    } catch (err) {}

    let loadedCount = 0;
    files.forEach((file, i) => {
      const reader = new FileReader();
      reader.onload = (event) => {
        const newPhoto = {
          dataUrl: event.target.result,
          title: file.name.replace(/\.[^/.]+$/, '').replace(/[-_]/g, ' ') || 'Special Moment',
          caption: 'Another golden memory added to celebrate our favorite PM Madam!',
          category: 'memories',
          date: 'Just Added',
          sticker: '💖 New Snapshot',
          tilt: `${(Math.random() * 4 - 2).toFixed(1)}deg`,
          gradient: 'from-pink-500 to-rose-700'
        };
        userPhotos.unshift(newPhoto);
        allPhotos.unshift(newPhoto);
        loadedCount++;

        if (loadedCount === files.length) {
          try {
            localStorage.setItem('nimishka_user_photos', JSON.stringify(userPhotos));
          } catch (err) {}
          playChimeSFX();
          triggerConfetti();
          renderPhotos();
        }
      };
      reader.readAsDataURL(file);
    });
    uploadInput.value = '';
  });

  renderPhotos();
}

/* ================= 7. SCRATCH CARD MECHANISM ================= */
function initScratchCard() {
  const canvas = document.getElementById('scratch-canvas');
  if (!canvas) return;
  const parent = canvas.parentElement;
  const width = (canvas.width = parent ? parent.offsetWidth : 360);
  const height = (canvas.height = parent ? parent.offsetHeight : 220);
  const ctx = canvas.getContext('2d');

  // Fill with golden glitter metallic texture
  const grad = ctx.createLinearGradient(0, 0, width, height);
  grad.addColorStop(0, '#d4af37');
  grad.addColorStop(0.3, '#fff2a8');
  grad.addColorStop(0.6, '#b38728');
  grad.addColorStop(1, '#fbf5b7');
  ctx.fillStyle = grad;
  ctx.fillRect(0, 0, width, height);

  // Sparkle stars text on cover
  ctx.fillStyle = '#4a3200';
  ctx.font = 'bold 16px Outfit, sans-serif';
  ctx.textAlign = 'center';
  ctx.fillText('✨ Scratch Here to Reveal Secret Wish ✨', width / 2, height / 2 - 8);
  ctx.font = '13px Outfit, sans-serif';
  ctx.fillStyle = '#6b4c05';
  ctx.fillText('(Use finger or mouse)', width / 2, height / 2 + 18);

  let isDrawing = false;
  let scratchedPixels = 0;
  let isRevealed = false;

  function scratch(e) {
    if (!isDrawing || isRevealed) return;
    const rect = canvas.getBoundingClientRect();
    const touch = (e.touches && e.touches.length > 0) ? e.touches[0] : null;
    const clientX = touch ? touch.clientX : e.clientX;
    const clientY = touch ? touch.clientY : e.clientY;
    const x = clientX - rect.left;
    const y = clientY - rect.top;

    ctx.globalCompositeOperation = 'destination-out';
    ctx.beginPath();
    ctx.arc(x, y, 26, 0, Math.PI * 2);
    ctx.fill();

    checkScratchPercentage();
  }

  function checkScratchPercentage() {
    scratchedPixels++;
    if (scratchedPixels > 40 && !isRevealed) {
      isRevealed = true;
      playChimeSFX();
      triggerConfetti();
      canvas.style.transition = 'opacity 0.6s ease';
      canvas.style.opacity = '0';
      setTimeout(() => (canvas.style.display = 'none'), 600);
    }
  }

  canvas.addEventListener('mousedown', (e) => { isDrawing = true; scratch(e); });
  canvas.addEventListener('mousemove', scratch);
  window.addEventListener('mouseup', () => (isDrawing = false));

  canvas.addEventListener('touchstart', (e) => {
    isDrawing = true;
    scratch(e);
  }, { passive: true });
  canvas.addEventListener('touchmove', (e) => {
    if (e.cancelable) e.preventDefault();
    scratch(e);
  }, { passive: false });
  window.addEventListener('touchend', () => (isDrawing = false));
}

/* ================= 8. VIRTUAL GIFT BOX UNBOXING ================= */
function initGiftBox() {
  const box = document.getElementById('gift-box-trigger');
  const coupons = document.getElementById('gift-coupons');
  let isOpened = false;

  box?.addEventListener('click', () => {
    if (isOpened) return;
    isOpened = true;
    box.classList.add('opened');
    playPopperSFX();
    triggerFullConfettiBurst();

    setTimeout(() => {
      coupons?.classList.add('visible');
    }, 400);
  });
}

/* ================= 9. BESTIE TRIVIA QUIZ ================= */
const QUIZ_QUESTIONS = [
  {
    q: "What is Nimishka's undeniable superpower?",
    options: [
      { text: "Managing chaos and turning it into pure success (The True PM!)", correct: true },
      { text: "Sleeping for 48 hours straight without a single care", correct: false },
      { text: "Refusing to drink water forever", correct: false },
      { text: "Never laughing at our jokes", correct: false }
    ],
    praise: "Spot on! That's why everyone looks up to PM Madam! 👑✨"
  },
  {
    q: "If Nimishka is having a busy day, what's guaranteed to fix the mood?",
    options: [
      { text: "More spreadsheets and 10 urgent meetings", correct: false },
      { text: "Good food, hilarious gossip, and genuine laughter", correct: true },
      { text: "Lukewarm water with no ice", correct: false },
      { text: "Total silence in a cold room", correct: false }
    ],
    praise: "100% facts! Good vibes and great food heal everything! 🍕💖"
  },
  {
    q: "What makes Nimishka such a rare, one-in-a-million friend?",
    options: [
      { text: "She genuinely cares, shows up, and makes people feel special", correct: true },
      { text: "She only texts back once every 6 months", correct: false },
      { text: "She forgets everybody's birthday", correct: false },
      { text: "She refuses to take photos", correct: false }
    ],
    praise: "A golden heart wrapped in elegance and humor. Truly irreplaceable! 🌟"
  },
  {
    q: "What is our grand birthday wish for Nimishka this year?",
    options: [
      { text: "Skyrocketing success, immense peace, unlimited happiness & love!", correct: true },
      { text: "Just a plain pair of socks", correct: false },
      { text: "A broken alarm clock", correct: false },
      { text: "Nothing special", correct: false }
    ],
    praise: "Nothing less than the universe's greatest blessings for her! 🚀🥂"
  }
];

let currentQIdx = 0;
let quizScore = 0;

function initQuiz() {
  renderQuestion();
}

function renderQuestion() {
  const container = document.getElementById('quiz-box-content');
  if (!container) return;

  if (currentQIdx >= QUIZ_QUESTIONS.length) {
    // Show completion certificate
    playChimeSFX();
    triggerFullConfettiBurst();
    container.innerHTML = `
      <div class="text-center py-6">
        <div class="text-6xl mb-4">🏆🎖️</div>
        <h3 class="text-2xl font-bold text-gold-gradient font-serif">100% CERTIFIED NIMISHKA FANATIC!</h3>
        <p class="text-pink-200 mt-2 text-base">You passed with flying colors (${quizScore}/${QUIZ_QUESTIONS.length})!</p>
        <div class="p-5 mt-6 rounded-2xl bg-white/5 border border-white/10 text-sm text-gray-300">
          "Nimishka is officially certified as the brightest star, the sweetest confidante, and the most iconic PM Madam in the entire cosmos."
        </div>
        <button id="quiz-replay-btn" class="pill-btn primary mt-6">Play Again ↺</button>
      </div>
    `;
    document.getElementById('quiz-replay-btn')?.addEventListener('click', () => {
      currentQIdx = 0;
      quizScore = 0;
      renderQuestion();
    });
    return;
  }

  const item = QUIZ_QUESTIONS[currentQIdx];
  container.innerHTML = `
    <div class="mb-4 flex items-center justify-between text-xs text-pink-300 uppercase tracking-widest font-semibold">
      <span>Question ${currentQIdx + 1} of ${QUIZ_QUESTIONS.length}</span>
      <span>Bestie Radar</span>
    </div>
    <h3 class="text-xl font-bold text-white mb-6">${item.q}</h3>
    <div class="space-y-3">
      ${item.options.map((opt, i) => `
        <button class="quiz-option-btn" data-correct="${opt.correct}">
          <span>${opt.text}</span>
          <span class="indicator opacity-0">✓</span>
        </button>
      `).join('')}
    </div>
    <div id="quiz-feedback" class="mt-4 text-center text-sm font-medium hidden"></div>
  `;

  const optionBtns = container.querySelectorAll('.quiz-option-btn');
  const feedback = document.getElementById('quiz-feedback');

  optionBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const isCorrect = btn.dataset.correct === 'true';
      optionBtns.forEach(b => (b.disabled = true));

      if (isCorrect) {
        btn.classList.add('correct');
        quizScore++;
        playChimeSFX();
        triggerConfetti();
        if (feedback) {
          feedback.textContent = item.praise;
          feedback.className = 'mt-4 text-center text-sm font-semibold text-green-300 block';
        }
      } else {
        btn.classList.add('wrong');
        // highlight correct one
        optionBtns.forEach(b => {
          if (b.dataset.correct === 'true') b.classList.add('correct');
        });
        if (feedback) {
          feedback.textContent = "Oops! But we all know she's iconic anyway! 💫";
          feedback.className = 'mt-4 text-center text-sm font-semibold text-pink-300 block';
        }
      }

      setTimeout(() => {
        currentQIdx++;
        renderQuestion();
      }, 1600);
    });
  });
}

/* ================= 10. INTERACTIVE FIREWORKS LAUNCHPAD ================= */
function initFireworksLaunchpad() {
  const canvas = document.getElementById('fireworks-canvas');
  const stage = document.getElementById('fireworks-stage');
  const launchBtn = document.getElementById('launch-nimishka-show-btn');
  const typeSelect = document.getElementById('firework-type-select');
  const autoToggle = document.getElementById('auto-fireworks-toggle');
  const autoLabel = document.getElementById('auto-fireworks-label');
  const letterDisplay = document.getElementById('sky-letter-display');

  if (!canvas || !stage) return;
  const ctx = canvas.getContext('2d');

  function resizeCanvas() {
    canvas.width = stage.offsetWidth;
    canvas.height = stage.offsetHeight;
  }
  resizeCanvas();
  window.addEventListener('resize', resizeCanvas);

  const fireworks = [];
  const particles = [];
  let isAutoShow = false;
  let autoInterval = null;
  let isShowRunning = false;

  const COLORS = [
    '#ff4d8d', '#ffd166', '#c77dff', '#70a1ff', '#06d6a0', '#ff007f', '#ffeaa7', '#ff6b81'
  ];

  class FireworkRocket {
    constructor(startX, startY, targetX, targetY, shape = 'sparkle', customColor = null, onExplode = null) {
      this.x = startX;
      this.y = startY;
      this.targetX = targetX;
      this.targetY = targetY;
      this.distanceToTarget = Math.hypot(targetX - startX, targetY - startY);
      this.coordinates = [];
      this.coordinateCount = 3;
      while (this.coordinateCount--) {
        this.coordinates.push([this.x, this.y]);
      }
      this.angle = Math.atan2(targetY - startY, targetX - startX);
      this.speed = 4.8;
      this.acceleration = 1.05;
      this.shape = shape;
      this.color = customColor || COLORS[Math.floor(Math.random() * COLORS.length)];
      this.onExplode = onExplode;
      playWhistleSFX();
    }

    update(index) {
      this.coordinates.pop();
      this.coordinates.unshift([this.x, this.y]);
      this.speed *= this.acceleration;

      const vx = Math.cos(this.angle) * this.speed;
      const vy = Math.sin(this.angle) * this.speed;

      if (this.y <= this.targetY || Math.hypot(this.x - this.targetX, this.y - this.targetY) < 16) {
        createExplosion(this.targetX, this.targetY, this.color, this.shape);
        playBoomSFX();
        if (this.onExplode) this.onExplode();
        fireworks.splice(index, 1);
      } else {
        this.x += vx;
        this.y += vy;
      }
    }

    draw() {
      ctx.beginPath();
      ctx.moveTo(this.coordinates[this.coordinates.length - 1][0], this.coordinates[this.coordinates.length - 1][1]);
      ctx.lineTo(this.x, this.y);
      ctx.strokeStyle = this.color;
      ctx.lineWidth = 3;
      ctx.shadowBlur = 10;
      ctx.shadowColor = this.color;
      ctx.stroke();
    }
  }

  class SparkParticle {
    constructor(x, y, color, vx, vy) {
      this.x = x;
      this.y = y;
      this.coordinates = [];
      this.coordinateCount = 4;
      while (this.coordinateCount--) {
        this.coordinates.push([this.x, this.y]);
      }
      this.vx = vx;
      this.vy = vy;
      this.friction = 0.96;
      this.gravity = 0.55;
      this.color = color;
      this.alpha = 1;
      this.decay = Math.random() * 0.015 + 0.012;
      this.flicker = Math.random() > 0.5;
    }

    update(index) {
      this.coordinates.pop();
      this.coordinates.unshift([this.x, this.y]);
      this.vx *= this.friction;
      this.vy *= this.friction;
      this.vy += this.gravity;
      this.x += this.vx;
      this.y += this.vy;
      this.alpha -= this.decay;

      if (this.alpha <= 0) {
        particles.splice(index, 1);
      }
    }

    draw() {
      ctx.beginPath();
      ctx.moveTo(this.coordinates[this.coordinates.length - 1][0], this.coordinates[this.coordinates.length - 1][1]);
      ctx.lineTo(this.x, this.y);
      ctx.strokeStyle = this.color;
      ctx.globalAlpha = Math.max(0, this.alpha * (this.flicker ? (Math.random() * 0.4 + 0.6) : 1));
      ctx.lineWidth = 2.2;
      ctx.shadowBlur = 6;
      ctx.shadowColor = this.color;
      ctx.stroke();
      ctx.globalAlpha = 1;
    }
  }

  function createExplosion(x, y, color, shape) {
    const particleCount = shape === 'crown' ? 90 : 65;

    if (shape === 'heart') {
      for (let i = 0; i < 55; i++) {
        const t = (Math.PI * 2 * i) / 55;
        const hx = 16 * Math.pow(Math.sin(t), 3);
        const hy = -(13 * Math.cos(t) - 5 * Math.cos(2 * t) - 2 * Math.cos(3 * t) - Math.cos(4 * t));
        const speed = 0.28;
        particles.push(new SparkParticle(x, y, color, hx * speed, hy * speed));
      }
    } else if (shape === 'crown') {
      for (let i = 0; i < particleCount; i++) {
        const angle = (Math.PI * 2 * i) / particleCount;
        const spd = Math.random() * 2 + 3.2;
        const vx = Math.cos(angle) * spd * (1 + 0.3 * Math.sin(angle * 5));
        const vy = Math.sin(angle) * spd * 0.8;
        particles.push(new SparkParticle(x, y, '#ffd700', vx, vy));
      }
    } else if (shape === 'ring') {
      for (let i = 0; i < 50; i++) {
        const angle = (Math.PI * 2 * i) / 50;
        const speed = Math.random() * 1.5 + 4;
        particles.push(new SparkParticle(x, y, color, Math.cos(angle) * speed * 1.3, Math.sin(angle) * speed * 0.5));
      }
    } else {
      for (let i = 0; i < particleCount; i++) {
        const angle = Math.random() * Math.PI * 2;
        const speed = Math.random() * 6 + 1.5;
        particles.push(new SparkParticle(x, y, color, Math.cos(angle) * speed, Math.sin(angle) * speed));
      }
    }
  }

  function launchFirework(targetX, targetY, shape = null, color = null, onExplode = null, forcedStartX = null) {
    const startX = forcedStartX !== null ? forcedStartX : (Math.random() * (canvas.width * 0.8) + canvas.width * 0.1);
    const startY = canvas.height;
    const finalShape = shape || (typeSelect ? typeSelect.value : 'sparkle');
    fireworks.push(new FireworkRocket(startX, startY, targetX, targetY, finalShape, color, onExplode));
  }

  // Animation Loop
  function loop() {
    ctx.globalCompositeOperation = 'destination-out';
    ctx.fillStyle = 'rgba(0, 0, 0, 0.22)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.globalCompositeOperation = 'lighter';

    for (let i = fireworks.length - 1; i >= 0; i--) {
      fireworks[i].update(i);
      if (fireworks[i]) fireworks[i].draw();
    }

    for (let i = particles.length - 1; i >= 0; i--) {
      particles[i].update(i);
      if (particles[i]) particles[i].draw();
    }

    requestAnimationFrame(loop);
  }
  loop();

  // User interactive click/touch on canvas
  function handleUserTrigger(e) {
    const rect = canvas.getBoundingClientRect();
    const clientX = (e.touches && e.touches.length > 0) ? e.touches[0].clientX : e.clientX;
    const clientY = (e.touches && e.touches.length > 0) ? e.touches[0].clientY : e.clientY;
    const targetX = clientX - rect.left;
    const targetY = clientY - rect.top;
    launchFirework(targetX, Math.max(30, targetY));
  }

  canvas.addEventListener('click', handleUserTrigger);
  canvas.addEventListener('touchstart', (e) => {
    e.preventDefault();
    handleUserTrigger(e);
  }, { passive: false });

  // "NIMISHKA" Choreographed Sky Show (Pre-ordered slots so spelling is 100% strictly sequential)
  launchBtn?.addEventListener('click', () => {
    if (isShowRunning) return;
    isShowRunning = true;
    launchBtn.disabled = true;
    launchBtn.classList.add('opacity-50');

    const letters = ['N', 'I', 'M', 'I', 'S', 'H', 'K', 'A'];
    const letterColors = ['#ff4d8d', '#ffd166', '#c77dff', '#06d6a0', '#ff007f', '#ffeaa7', '#70a1ff', '#ffd700'];

    if (letterDisplay) {
      letterDisplay.innerHTML = letters.map((char, i) => `
        <span class="sky-letter" id="sky-char-${i}">${char}</span>
      `).join('');
    }

    letters.forEach((char, idx) => {
      setTimeout(() => {
        const stepX = (canvas.width / (letters.length + 1)) * (idx + 1);
        const stepY = canvas.height * 0.32;

        // Launch straight up from stepX directly beneath letter slot
        launchFirework(stepX, stepY, 'sparkle', letterColors[idx], () => {
          const slot = document.getElementById(`sky-char-${idx}`);
          if (slot) {
            slot.classList.add('revealed');
          }
        }, stepX);

        if (idx === letters.length - 1) {
          // Grand Finale Barrage
          setTimeout(() => {
            playChimeSFX();
            triggerFullConfettiBurst();
            launchBalloons(6);

            for (let f = 0; f < 5; f++) {
              setTimeout(() => {
                launchFirework(
                  Math.random() * (canvas.width * 0.7) + canvas.width * 0.15,
                  Math.random() * (canvas.height * 0.35) + 40,
                  f % 2 === 0 ? 'heart' : 'crown',
                  letterColors[f % letterColors.length]
                );
              }, f * 220);
            }

            const crownTag = document.createElement('div');
            crownTag.className = 'w-full text-center text-xs md:text-sm font-serif font-bold text-gold-gradient tracking-widest uppercase mt-3 animate-pulse';
            crownTag.innerHTML = '👑 QUEEN OF THE DAY • <span class="font-hindi text-base sm:text-lg">जन्मदिनमिदम् अयि प्रिय निमिष्का!</span> 👑';
            letterDisplay.parentElement.appendChild(crownTag);
            setTimeout(() => crownTag.remove(), 7000);

            isShowRunning = false;
            launchBtn.disabled = false;
            launchBtn.classList.remove('opacity-50');
          }, 1200);
        }
      }, idx * 650);
    });
  });

  // Continuous Auto-Show Toggle
  autoToggle?.addEventListener('click', () => {
    isAutoShow = !isAutoShow;
    if (isAutoShow) {
      autoLabel.textContent = '🎆 Continuous Show: ON';
      autoToggle.classList.add('border-pink-500', 'text-pink-300');
      autoInterval = setInterval(() => {
        const rx = Math.random() * (canvas.width * 0.8) + canvas.width * 0.1;
        const ry = Math.random() * (canvas.height * 0.45) + 30;
        launchFirework(rx, ry);
      }, 1400);
    } else {
      autoLabel.textContent = '🎆 Continuous Show: OFF';
      autoToggle.classList.remove('border-pink-500', 'text-pink-300');
      clearInterval(autoInterval);
    }
  });
}

function escapeHTML(str) {
  return str.replace(/[&<>'"]/g, 
    tag => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', "'": '&#39;', '"': '&quot;' }[tag] || tag)
  );
}

/* ================= 11. CONFETTI & FLOATING BALLOONS ================= */
function initPopperAndBalloons() {
  const popperBtn = document.getElementById('fab-popper');
  popperBtn?.addEventListener('click', () => {
    playPopperSFX();
    triggerFullConfettiBurst();
    launchBalloons(5);
  });
}

function triggerConfetti() {
  if (typeof confetti === 'function') {
    confetti({
      particleCount: 50,
      spread: 60,
      origin: { y: 0.75 },
      colors: ['#ff4d8d', '#ffd166', '#9d4edd', '#06d6a0']
    });
  }
}

function triggerFullConfettiBurst() {
  if (typeof confetti === 'function') {
    const end = Date.now() + 1500;
    (function frame() {
      confetti({
        particleCount: 7,
        angle: 60,
        spread: 55,
        origin: { x: 0 },
        colors: ['#ff4d8d', '#ffd166', '#c77dff']
      });
      confetti({
        particleCount: 7,
        angle: 120,
        spread: 55,
        origin: { x: 1 },
        colors: ['#ff758c', '#ffeaa7', '#a29bfe']
      });
      if (Date.now() < end) {
        requestAnimationFrame(frame);
      }
    })();
  }
}

function launchBalloons(count = 4) {
  const balloonColors = ['#ff4d8d', '#ffd166', '#c77dff', '#70a1ff', '#ff6b81'];
  for (let i = 0; i < count; i++) {
    const b = document.createElement('div');
    b.className = 'fixed pointer-events-none z-50';
    const size = Math.floor(Math.random() * 20 + 40);
    const color = balloonColors[Math.floor(Math.random() * balloonColors.length)];
    b.style.width = `${size}px`;
    b.style.height = `${size * 1.25}px`;
    b.style.borderRadius = '50% 50% 50% 50% / 40% 40% 60% 60%';
    b.style.background = `radial-gradient(circle at 35% 35%, #fff 0%, ${color} 60%, #000 120%)`;
    b.style.boxShadow = `0 10px 20px rgba(0,0,0,0.3), inset 0 -6px 12px rgba(0,0,0,0.2)`;
    b.style.left = `${Math.random() * 85 + 5}vw`;
    b.style.bottom = `-80px`;
    b.style.transition = `all ${Math.random() * 2 + 3.5}s cubic-bezier(0.2, 0.8, 0.4, 1)`;

    document.body.appendChild(b);

    setTimeout(() => {
      b.style.transform = `translate(${(Math.random() - 0.5) * 80}px, -120vh) rotate(${(Math.random() - 0.5) * 30}deg)`;
      b.style.opacity = '0.9';
    }, 20);

    setTimeout(() => b.remove(), 6000);
  }
}

/* ================= 12. 3D FLIP CARDS TAP-TO-FLIP (MOBILE READY) ================= */
function initFlipCards() {
  document.querySelectorAll('.flip-card').forEach(card => {
    card.addEventListener('click', () => {
      card.classList.toggle('flipped');
    });
  });
}

/* ================= 13. MOBILE MENU TOGGLE ================= */
function initMobileNav() {
  const toggle = document.getElementById('mobile-menu-toggle');
  const menu = document.getElementById('mobile-menu-drawer');
  const links = document.querySelectorAll('.mobile-nav-link');

  toggle?.addEventListener('click', () => {
    menu?.classList.toggle('open');
    toggle.textContent = menu?.classList.contains('open') ? '✕' : '☰';
  });

  links.forEach(link => {
    link.addEventListener('click', () => {
      menu?.classList.remove('open');
      if (toggle) toggle.textContent = '☰';
    });
  });
}
