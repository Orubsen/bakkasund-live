// Web Audio API ambient coastal ocean waves generator
class CoastalAudio {
  constructor() {
    this.ctx = null;
    this.isPlaying = false;
    this.noiseNode = null;
    this.filterNode = null;
    this.gainNode = null;
    this.lfoNode = null;
    this.lfoGain = null;
  }

  init() {
    const AudioContext = window.AudioContext || window.webkitAudioContext;
    if (!AudioContext) return;
    this.ctx = new AudioContext();
  }

  toggle() {
    if (this.isPlaying) {
      this.stop();
      return false;
    } else {
      this.start();
      return true;
    }
  }

  start() {
    if (!this.ctx) this.init();
    if (!this.ctx) return;
    if (this.ctx.state === 'suspended') {
      this.ctx.resume();
    }

    const bufferSize = this.ctx.sampleRate * 2;
    const buffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
    const data = buffer.getChannelData(0);
    
    // Pink noise generation
    let b0 = 0, b1 = 0, b2 = 0, b3 = 0, b4 = 0, b5 = 0, b6 = 0;
    for (let i = 0; i < bufferSize; i++) {
      const white = Math.random() * 2 - 1;
      b0 = 0.99886 * b0 + white * 0.0555179;
      b1 = 0.99332 * b1 + white * 0.0750759;
      b2 = 0.96900 * b2 + white * 0.1538520;
      b3 = 0.86650 * b3 + white * 0.3104856;
      b4 = 0.55000 * b4 + white * 0.5329522;
      b5 = -0.7616 * b5 - white * 0.0168980;
      data[i] = (b0 + b1 + b2 + b3 + b4 + b5 + b6 + white * 0.5362) * 0.04;
      b6 = white * 0.115926;
    }

    this.noiseNode = this.ctx.createBufferSource();
    this.noiseNode.buffer = buffer;
    this.noiseNode.loop = true;

    // Filter simulating crashing waves
    this.filterNode = this.ctx.createBiquadFilter();
    this.filterNode.type = 'lowpass';
    this.filterNode.frequency.value = 350;

    // LFO to modulate wave surge
    this.lfoNode = this.ctx.createOscillator();
    this.lfoNode.frequency.value = 0.14; // ~7 seconds per wave cycle
    this.lfoGain = this.ctx.createGain();
    this.lfoGain.gain.value = 280;
    this.lfoNode.connect(this.lfoGain);
    this.lfoGain.connect(this.filterNode.frequency);

    // Master volume gain
    this.gainNode = this.ctx.createGain();
    this.gainNode.gain.setValueAtTime(0.01, this.ctx.currentTime);
    this.gainNode.gain.exponentialRampToValueAtTime(0.35, this.ctx.currentTime + 2);

    this.noiseNode.connect(this.filterNode);
    this.filterNode.connect(this.gainNode);
    this.gainNode.connect(this.ctx.destination);

    this.noiseNode.start();
    this.lfoNode.start();
    this.isPlaying = true;
  }

  stop() {
    if (!this.isPlaying || !this.gainNode || !this.ctx) return;
    this.gainNode.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 1);
    setTimeout(() => {
      try {
        if (this.noiseNode) this.noiseNode.stop();
        if (this.lfoNode) this.lfoNode.stop();
      } catch (e) {
        // ignore
      }
      this.isPlaying = false;
    }, 1000);
  }
}

export const coastalAudio = new CoastalAudio();
