/* <house-scene> — real-time three.js backdrop: a traditional Japanese machiya/shoin house
   at dusk. Camera dollies with the portfolio's horizontal chapter travel (window
   'ronin:pos'), parallaxes against the cursor, and reacts to clicks with a lantern pulse.
   Requires window.THREE (r147 UMD) loaded by the host page. */
(function () {
  if (window.customElements && customElements.get('house-scene')) return;

  const TONES = {
    // stars / ff (firefly gain) ride along so a blended tone carries them too
    dawn:  { sky: 0x171b20, moon: 0xf2d2b0, moonI: 0.5,  rim: 0x76869c, fog: 0x13161b, amb: 0x252a31, ambI: 0.62, warm: 0xffd09a, fogD: 0.021, stars: 0.4,  ff: 0.1 },
    noon:  { sky: 0x2c2619, moon: 0xfff2d8, moonI: 0.8,  rim: 0xb09868, fog: 0x1f1a11, amb: 0x3c3322, ambI: 0.8, warm: 0xffdca4, fogD: 0.009, stars: 0.1,  ff: 0 },
    dusk:  { sky: 0x17110c, moon: 0xe8a06a, moonI: 0.56, rim: 0xb7301f, fog: 0x120d08, amb: 0x241a14, ambI: 0.52, warm: 0xffc078, fogD: 0.014, stars: 0.85, ff: 0.45 },
    night: { sky: 0x0b0f16, moon: 0xbcd0e8, moonI: 0.5, rim: 0x3a4a6a, fog: 0x080a0f, amb: 0x151b26, ambI: 0.45, warm: 0xffb765, fogD: 0.017, stars: 1,    ff: 1.7 }
  };

  // camera keyframes, one per chapter — the scroll position lerps between them
  const SHOTS = [
    { p: [-11.5, 7.2, 34.0], t: [5.2, 4.2, 0] },  // 00 hero — wide, house holds the left
    { p: [-6.0, 4.0, 22.0],  t: [3.4, 3.4, 0] },  // 01 work — closer on the engawa deck
    { p: [16.5, 5.4, 25.0],  t: [-4.6, 3.8, 0] }, // 02 path — garden side, lit wall pushed right of the copy
    { p: [5.5, 10.2, 26.0],  t: [-1.0, 5.0, 0] }, // 03 proof — raised roofline silhouette, wall out of frame-left
    { p: [-6.5, 2.6, 15.5],  t: [6.2, 2.8, -1.0] } // 04 contact — lantern close, house held to the right
  ];

  // the walk: each chapter is a station ("room") on the grounds; half-steps are waypoints
  // so the move travels through the garden at eye height instead of lerping in a line
  const PATH = [
    { c: 0,   p: SHOTS[0].p, t: SHOTS[0].t },                 // 門 the gate
    { c: 0.5, p: [-10.2, 3.6, 26.5], t: [3.6, 3.1, 0] },       // down the stepping stones
    { c: 1,   p: SHOTS[1].p, t: SHOTS[1].t },                 // 書斎 the study
    { c: 1.5, p: [4.6, 3.3, 19.5],   t: [-0.6, 3.1, 0] },      // along the engawa front
    { c: 2,   p: SHOTS[2].p, t: SHOTS[2].t },                 // 庭 the garden
    { c: 2.5, p: [12.5, 9.4, 31.0],  t: [-3.2, 4.7, 0] },      // crane up past the eave
    { c: 3,   p: SHOTS[3].p, t: SHOTS[3].t },                 // 屋根 the roofline
    { c: 3.5, p: [-0.8, 5.4, 20.5],  t: [3.4, 3.5, -0.4] },    // descend to the path
    { c: 4,   p: SHOTS[4].p, t: SHOTS[4].t }                  // 提灯 the lantern
  ];
  function cr(a, b, c, d, u) { const u2 = u * u, u3 = u2 * u; return 0.5 * (2 * b + (-a + c) * u + (2 * a - 5 * b + 4 * c - d) * u2 + (-a + 3 * b - 3 * c + d) * u3); }
  function along(p, key, out) {
    let k = 0; while (k < PATH.length - 2 && p > PATH[k + 1].c) k++;
    const A = PATH[Math.max(0, k - 1)][key], B = PATH[k][key], C = PATH[k + 1][key], D = PATH[Math.min(PATH.length - 1, k + 2)][key];
    const u = Math.max(0, Math.min(1, (p - PATH[k].c) / (PATH[k + 1].c - PATH[k].c)));
    for (let i = 0; i < 3; i++) out[i] = cr(A[i], B[i], C[i], D[i], u);
    return out;
  }

  function tex(draw, w, h, rx, ry) {
    const c = document.createElement('canvas');
    c.width = w; c.height = h || w;
    draw(c.getContext('2d'), c.width, c.height);
    const t = new THREE.CanvasTexture(c);
    t.wrapS = t.wrapT = THREE.RepeatWrapping;
    if (rx) t.repeat.set(rx, ry || rx);
    t.anisotropy = 4;
    return t;
  }

  // hongawara: alternating pan tiles and rolled cover tiles, with deep shadow gaps
  function tileTex() {
    return tex((g, w, h) => {
      g.fillStyle = '#23272d'; g.fillRect(0, 0, w, h);
      const P = 24;
      for (let x = 0; x < w; x += P) {
        const pan = g.createLinearGradient(x, 0, x + P, 0);
        pan.addColorStop(0, '#0e1013'); pan.addColorStop(0.3, '#2c3238');
        pan.addColorStop(0.55, '#353c44'); pan.addColorStop(1, '#0c0e11');
        g.fillStyle = pan; g.fillRect(x, 0, P, h);
        const cap = g.createLinearGradient(x + P - 9, 0, x + P + 3, 0);
        cap.addColorStop(0, '#171a1f'); cap.addColorStop(0.45, '#5a636e');
        cap.addColorStop(0.75, '#3d444d'); cap.addColorStop(1, '#101215');
        g.fillStyle = cap; g.fillRect(x + P - 9, 0, 12, h);
      }
      // course lines: hard shadow under each overlap, thin highlight on the lip
      for (let y = 0; y < h; y += 30) {
        g.fillStyle = 'rgba(6,8,10,0.9)'; g.fillRect(0, y, w, 5);
        g.fillStyle = 'rgba(170,182,196,0.2)'; g.fillRect(0, y + 5, w, 1.6);
      }
      // weathering blotches so the field is not uniform
      for (let i = 0; i < 120; i++) {
        g.fillStyle = 'rgba(' + (120 + Math.random() * 60 | 0) + ',126,118,' + (0.03 + Math.random() * 0.05).toFixed(2) + ')';
        g.beginPath();
        g.arc(Math.random() * w, Math.random() * h, 3 + Math.random() * 12, 0, 6.3);
        g.fill();
      }
    }, 256, 256, 9, 4);
  }

  function shojiTex() {
    return tex((g, w, h) => {
      g.fillStyle = '#efe4c8'; g.fillRect(0, 0, w, h);
      g.fillStyle = 'rgba(180,150,104,0.18)';
      for (let i = 0; i < 400; i++) g.fillRect(Math.random() * w, Math.random() * h, 1.5, 1.5);
      g.strokeStyle = '#5a3f28'; g.lineWidth = 6;
      g.strokeRect(3, 3, w - 6, h - 6);
      g.lineWidth = 3.4;
      for (let i = 1; i < 4; i++) { g.beginPath(); g.moveTo((w / 4) * i, 0); g.lineTo((w / 4) * i, h); g.stroke(); }
      for (let i = 1; i < 6; i++) { g.beginPath(); g.moveTo(0, (h / 6) * i); g.lineTo(w, (h / 6) * i); g.stroke(); }
    }, 128, 192);
  }

  // aged cedar: tight grain lines, darker latewood bands, occasional knot
  function woodTex() {
    return tex((g, w, h) => {
      const base = g.createLinearGradient(0, 0, 0, h);
      base.addColorStop(0, '#4d3421'); base.addColorStop(0.5, '#5a3d26');
      base.addColorStop(1, '#402b1b');
      g.fillStyle = base; g.fillRect(0, 0, w, h);
      for (let i = 0; i < 26; i++) {
        g.fillStyle = 'rgba(40,26,15,' + (0.1 + Math.random() * 0.14).toFixed(2) + ')';
        g.fillRect(0, Math.random() * h, w, 2 + Math.random() * 7);
      }
      for (let i = 0; i < 190; i++) {
        const lit = Math.random() > 0.55;
        g.strokeStyle = lit
          ? 'rgba(' + (128 + Math.random() * 54 | 0) + ',' + (96 + Math.random() * 34 | 0) + ',60,0.28)'
          : 'rgba(' + (44 + Math.random() * 26 | 0) + ',28,16,0.42)';
        g.lineWidth = 0.7 + Math.random() * 1.9;
        const y = Math.random() * h;
        g.beginPath(); g.moveTo(0, y);
        g.bezierCurveTo(w * 0.3, y + (Math.random() * 10 - 5), w * 0.65, y - (Math.random() * 10 - 5), w, y + (Math.random() * 6 - 3));
        g.stroke();
      }
      for (let k = 0; k < 3; k++) {
        const kx = Math.random() * w, ky = Math.random() * h;
        for (let r = 9; r > 0; r -= 2) {
          g.strokeStyle = 'rgba(34,22,13,' + (0.1 + r * 0.03).toFixed(2) + ')';
          g.lineWidth = 1.4;
          g.beginPath(); g.ellipse(kx, ky, r * 1.5, r, 0, 0, 6.3); g.stroke();
        }
      }
    }, 256, 128, 3, 1);
  }

  // earthen plaster with a straw-fleck tooth
  function plasterTex() {
    return tex((g, w, h) => {
      g.fillStyle = '#8c8168'; g.fillRect(0, 0, w, h);
      for (let i = 0; i < 2600; i++) {
        g.fillStyle = 'rgba(' + (120 + Math.random() * 70 | 0) + ',' + (110 + Math.random() * 60 | 0) + ',86,' + (0.05 + Math.random() * 0.2).toFixed(2) + ')';
        g.fillRect(Math.random() * w, Math.random() * h, 1 + Math.random() * 6, 1 + Math.random() * 1.6);
      }
      for (let i = 0; i < 40; i++) {
        g.fillStyle = 'rgba(58,50,36,0.10)';
        g.beginPath(); g.arc(Math.random() * w, Math.random() * h, 6 + Math.random() * 22, 0, 6.3); g.fill();
      }
    }, 256, 256, 3, 1.4);
  }

  function dotTex(inner, outer) {
    return tex((g, w) => {
      const r = w / 2, grd = g.createRadialGradient(r, r, 0, r, r, r);
      grd.addColorStop(0, inner); grd.addColorStop(0.45, outer); grd.addColorStop(1, 'rgba(0,0,0,0)');
      g.fillStyle = grd; g.fillRect(0, 0, w, w);
    }, 64);
  }

  class HouseScene extends HTMLElement {
    static get observedAttributes() { return ['tone', 'drift', 'pos']; }
    attributeChangedCallback(n, o, v) {
      if (!this._scene) return;
      if (n === 'tone') this.setTone(v);
      if (n === 'pos') this.setPos(parseFloat(v));
      if (n === 'drift') this._noDrift = (v === 'false' || v === '0');
    }

    connectedCallback() {
      if (this._up) return;
      this._up = true;
      this.style.cssText = 'display:block;position:absolute;left:0;top:0;right:0;bottom:0;width:100%;height:100%;overflow:hidden';
      this._noDrift = this.getAttribute('drift') === 'false';
      this._reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
      this._pos = parseFloat(this.getAttribute('pos') || '0') || 0;
      this._posEase = this._pos;
      this._mx = 0; this._my = 0; this._tmx = 0; this._tmy = 0;
      this._pulse = 0;
      this._wait = setInterval(() => { if (window.THREE) { clearInterval(this._wait); this._init(); } }, 60);
      if (window.THREE) { clearInterval(this._wait); this._init(); }
    }

    disconnectedCallback() {
      clearInterval(this._wait);
      cancelAnimationFrame(this._raf);
      window.removeEventListener('pointermove', this._onMove);
      window.removeEventListener('pointerdown', this._onDown);
      window.removeEventListener('pointermove', this._onHover);
      window.removeEventListener('ronin:push', this._onPush);
      window.removeEventListener('ronin:pos', this._onPos);
      window.removeEventListener('ronin:tone', this._onTone);
      if (this._ro) this._ro.disconnect();
      if (this._pp) { this._pp.scene.dispose(); this._pp.down.concat(this._pp.up).forEach((r) => r.dispose()); }
      if (this._rnd) { this._rnd.dispose(); if (this._rnd.domElement.parentNode) this._rnd.domElement.remove(); }
    }

    setPos(p) { if (typeof p === 'number' && isFinite(p)) this._pos = Math.max(0, Math.min(SHOTS.length - 1, p)); }
    // diegetic demo: dolly into the study laptop (on) or back out (off)
    focusDesk(on) {
      this._focusT = on ? 1 : 0;
      return new Promise((res) => {
        if (!this._scr || !this._ready || Math.abs(this._focusT - (this._fzL || 0)) < 0.002) { this._fzL = this._focusT; res(); return; }
        const prev = this._fzDone; this._fzDone = () => { if (prev) prev(); res(); };
        setTimeout(() => { if (this._fzDone) { this._fzL = this._focusT; const f = this._fzDone; this._fzDone = null; f(); } }, 2200);
      });
    }
    // laptop screen in client px — the DOM demo grows out of exactly this rectangle
    screenRect() {
      if (!this._scr || !this._cam) return null;
      const T = THREE, v = new T.Vector3(), b = this._rnd.domElement.getBoundingClientRect();
      this._cam.updateMatrixWorld(true); this._scr.updateMatrixWorld(true);
      let l = 1e9, t = 1e9, rr = -1e9, bb = -1e9;
      [[-0.28, -0.175], [0.28, -0.175], [0.28, 0.175], [-0.28, 0.175]].forEach((c) => {
        v.set(c[0], c[1], 0); this._scr.localToWorld(v); v.project(this._cam);
        const x = b.left + (v.x + 1) / 2 * b.width, y = b.top + (1 - v.y) / 2 * b.height;
        l = Math.min(l, x); rr = Math.max(rr, x); t = Math.min(t, y); bb = Math.max(bb, y);
      });
      return { l, t, r: rr, b: bb };
    }
    setTone(k) { if (TONES[k]) { this._toneKey = k; if (this._scene) this._applyTone(); } }

    _init() {
      const T = THREE;
      this._toneKey = TONES[this.getAttribute('tone')] ? this.getAttribute('tone') : 'dusk';
      const rnd = this._rnd = new T.WebGLRenderer({ antialias: true, alpha: false, powerPreference: 'high-performance' });
      // adaptive quality: start at the device ceiling, step down when frames drop
      this._prMax = Math.min(devicePixelRatio || 1, 1.75);
      this._pr = this._prMax;
      rnd.setPixelRatio(this._pr);
      rnd.outputEncoding = T.sRGBEncoding;
      rnd.toneMapping = T.ACESFilmicToneMapping;
      rnd.toneMappingExposure = 1.14;
      rnd.shadowMap.enabled = !this._reduce;
      rnd.shadowMap.type = T.PCFSoftShadowMap;
      // The house is static — only the camera moves. Two 1024² shadow maps re-rendering
      // the whole scene every frame was pure waste, so drive them manually at a third
      // of the framerate: soft shadows on slow-swaying hangs can't show the cadence,
      // and it removes ~2 full scene passes from most frames.
      rnd.shadowMap.autoUpdate = false;
      rnd.shadowMap.needsUpdate = true;
      const cv = rnd.domElement;
      cv.style.cssText = 'display:block;width:100%;height:100%;opacity:0;transition:opacity 1.4s cubic-bezier(.4,0,.2,1)';
      this.appendChild(cv);

      const scene = this._scene = new T.Scene();
      const cam = this._cam = new T.PerspectiveCamera(38, 1, 0.1, 400);
      cam.position.set.apply(cam.position, SHOTS[0].p);

      this._lights(scene);
      this._world(scene);
      this._house(scene);
      this._garden(scene);
      this._heroLantern(scene);
      this._particles(scene);
      this._fireflies(scene);
      this._applyTone();
      this._post();

      this._onMove = (e) => {
        const w = innerWidth, h = innerHeight;
        this._tmx = (e.clientX / w - 0.5) * 2;
        this._tmy = (e.clientY / h - 0.5) * 2;
        if (this._lpx != null) { this._wx = (this._wx || 0) + (e.clientX - this._lpx) / w * 2.2; this._wy = (this._wy || 0) + (e.clientY - this._lpy) / h * 1.4; }
        this._lpx = e.clientX; this._lpy = e.clientY;
        this._pndc = { x: this._tmx, y: -this._tmy }; this._pAt = performance.now();
      };
      // lantern hover: remember the pointer in NDC; the loop raycasts once per frame
      this._ndc = null;
      this._onHover = (e) => {
        const ui = e.target && e.target.closest && e.target.closest('a,button,input,textarea,[role="button"],[data-case],[data-cell],header,[data-g="filmstrip"]');
        this._ndc = ui ? null : { x: (e.clientX / innerWidth) * 2 - 1, y: -(e.clientY / innerHeight) * 2 + 1 };
      };
      window.addEventListener('pointermove', this._onHover, { passive: true });
      this._onPush = () => { this._pushAt = performance.now(); };
      window.addEventListener('ronin:push', this._onPush);
      this._onDown = (e) => {
        if (e.target && e.target.closest && e.target.closest('a,button,input,textarea,[role="button"]')) return;
        this._pulse = 1;
        const h = this._hot;
        if (!h || this._fzL > 0.01) return;
        if (h === 'desk') window.dispatchEvent(new CustomEvent('ronin:desk'));
        else window.dispatchEvent(new CustomEvent('ronin:pick', { detail: { kind: (h === 'shelf' || h === 'letter') ? h : 'lantern' } }));
      };
      this._onPos = (e) => { this.setPos(e.detail && e.detail.pos); if (e.detail && e.detail.tone) this.setTone(e.detail.tone); };
      this._onTone = (e) => this.setTone(e.detail && e.detail.tone);
      window.addEventListener('pointermove', this._onMove, { passive: true });
      window.addEventListener('pointerdown', this._onDown, { passive: true });
      window.addEventListener('ronin:pos', this._onPos);
      window.addEventListener('ronin:tone', this._onTone);

      this._ro = new ResizeObserver(() => this._size());
      this._ro.observe(this);
      this._size();
      this._batch(scene);
      let lc = 0;
      scene.traverse((o) => { if (o.isLight) lc++; });
      this._lightCount = lc;
      this._precompile();
      this._clock = new T.Clock();
      this._loop();
      this._ready = true;
      requestAnimationFrame(() => requestAnimationFrame(() => { cv.style.opacity = '1'; }));
      this.dispatchEvent(new CustomEvent('house-ready', { bubbles: true, composed: true }));
    }

    // compile every program up front (scene + bloom chain) so the first dolly into a
    // new chapter doesn't hitch on a shader link
    _hoverPick() {
      let hot = null;
      if (this._ndc && !this._reduce) {
        const T = THREE;
        if (!this._ray) { this._ray = new T.Raycaster(); this._rayV = new T.Vector2(); this._rayCands = []; }
        if (!this._rayCands.length) {
          this._lanterns.forEach((L, i) => L.grp.traverse((o) => { if (o.isMesh) { o.userData.hk = 'l' + i; this._rayCands.push(o); } }));
          this._hangs.forEach((H, i) => H.grp.traverse((o) => { if (o.isMesh) { o.userData.hk = 'h' + i; this._rayCands.push(o); } }));
          if (this._desk) this._desk.traverse((o) => { if (o.isMesh) { o.userData.hk = 'desk'; this._rayCands.push(o); } });
          if (this._letter) this._letter.traverse((o) => { if (o.isMesh) o.userData.hk = 'letter'; });
          if (this._shelf) this._shelf.traverse((o) => { if (o.isMesh) { o.userData.hk = 'shelf'; this._rayCands.push(o); } });
          if (this._heroObj) this._heroObj.traverse((o) => { if (o.isMesh) { o.userData.hk = 'hero'; this._rayCands.push(o); } });
        }
        this._rayV.set(this._ndc.x, this._ndc.y);
        this._ray.setFromCamera(this._rayV, this._cam);
        const hit = this._ray.intersectObjects(this._rayCands, false)[0];
        if (hit && hit.distance < 60) hot = hit.object.userData.hk;
        if (this._fzL > 0.01) hot = null;
      }
      if (hot !== this._hot) {
        this._hot = hot;
        window.dispatchEvent(new CustomEvent('ronin:lantern', { detail: { on: !!hot, kind: hot ? (/^[lh]|hero/.test(hot) && hot !== 'letter' ? 'lantern' : hot) : null } }));
      }
    }

    _precompile() {
      const rnd = this._rnd;
      try {
        rnd.compile(this._scene, this._cam);
        if (this._pp) {
          const pp = this._pp;
          [pp.pre, pp.dn, pp.upm, pp.out].forEach((m) => { pp.quad.material = m; rnd.compile(pp.q, pp.cam); });
        }
      } catch (err) { /* non-fatal: programs compile lazily instead */ }
    }

    // fps governor: 2 bad half-second windows -> step resolution down; 8 good ones -> up.
    // Last resort drops the two smallest bloom mips (cheapest visible loss).
    _govern(fps) {
      if (this._reduce) return;
      const steps = [this._prMax, Math.min(this._prMax, 1.4), Math.min(this._prMax, 1.1), Math.min(this._prMax, 0.85)];
      this._qi = this._qi || 0;
      if (fps < 46) { this._bad = (this._bad || 0) + 1; this._good = 0; }
      else if (fps > 57) { this._good = (this._good || 0) + 1; this._bad = 0; }
      else { this._bad = 0; this._good = 0; }
      if (this._bad >= 2) {
        this._bad = 0;
        if (this._qi < steps.length - 1) { this._qi++; this._setPR(steps[this._qi]); }
        else if (this._pp && this._pp.levels > 3) { this._pp.levels = 3; }
      } else if (this._good >= 8 && this._qi > 0) {
        this._good = 0;
        if (this._pp && this._pp.levels < 5) this._pp.levels = 5;
        else { this._qi--; this._setPR(steps[this._qi]); }
      }
    }

    _setPR(pr) {
      if (Math.abs(pr - this._pr) < 0.01) return;
      this._pr = pr;
      this._rnd.setPixelRatio(pr);
      this._size();
    }

    _size() {
      const w = this.clientWidth || innerWidth, h = this.clientHeight || innerHeight;
      if (!w || !h) return;
      this._rnd.setSize(w, h, false);
      this._cam.aspect = w / h;
      this._cam.fov = this._fov0 = w / h < 1 ? 52 : 38;
      this._cam.updateProjectionMatrix();
      if (this._pp) this._ppSize();
    }

    // HDR bloom: scene -> half-float MSAA target, soft-knee prefilter, dual-Kawase
    // down/up chain, then ACES + sRGB by hand (r147 only tone-maps the null target)
    _post() {
      const T = THREE, rnd = this._rnd;
      if (!rnd.capabilities.isWebGL2) return;
      rnd.info.autoReset = false;
      const rt = (ms) => { const r = new T.WebGLRenderTarget(2, 2, { type: T.HalfFloatType, depthBuffer: ms, stencilBuffer: false }); if (ms) r.samples = 4; return r; };
      const V = 'varying vec2 vUv; void main(){ vUv = uv; gl_Position = vec4(position.xy, 0.0, 1.0); }';
      const DOWN = 'vec3 dn(sampler2D t, vec2 uv, vec2 h){ vec3 s = texture2D(t, uv).rgb * 4.0; s += texture2D(t, uv - h).rgb; s += texture2D(t, uv + h).rgb; s += texture2D(t, uv + vec2(h.x, -h.y)).rgb; s += texture2D(t, uv - vec2(h.x, -h.y)).rgb; return s / 8.0; }';
      const mat = (f, u) => new T.ShaderMaterial({ vertexShader: V, fragmentShader: f, uniforms: u, depthTest: false, depthWrite: false, toneMapped: false });
      const pp = this._pp = {
        scene: rt(true), down: [], up: [], levels: 5,
        cam: new T.OrthographicCamera(-1, 1, 1, -1, 0, 1),
        quad: new T.Mesh(new T.PlaneGeometry(2, 2)),
        strength: 0.72, threshold: 1.15, knee: 0.3
      };
      pp.quad.frustumCulled = false;
      pp.q = new T.Scene(); pp.q.add(pp.quad);
      for (let i = 0; i < pp.levels; i++) { pp.down.push(rt(false)); pp.up.push(rt(false)); }
      pp.pre = mat('uniform sampler2D t; uniform vec2 h; uniform float thr, knee; varying vec2 vUv; ' + DOWN +
        ' void main(){ vec3 c = dn(t, vUv, h); float br = max(c.r, max(c.g, c.b)); float sk = clamp(br - thr + knee, 0.0, 2.0 * knee); sk = sk * sk / (4.0 * knee + 1e-4); c *= max(sk, br - thr) / max(br, 1e-4); gl_FragColor = vec4(min(c, vec3(24.0)), 1.0); }',
        { t: { value: null }, h: { value: new T.Vector2() }, thr: { value: pp.threshold }, knee: { value: pp.knee } });
      pp.dn = mat('uniform sampler2D t; uniform vec2 h; varying vec2 vUv; ' + DOWN + ' void main(){ gl_FragColor = vec4(dn(t, vUv, h), 1.0); }',
        { t: { value: null }, h: { value: new T.Vector2() } });
      pp.upm = mat('uniform sampler2D t, b; uniform vec2 h; varying vec2 vUv; void main(){ vec2 u = vUv; vec3 s = texture2D(t, u + vec2(-h.x * 2.0, 0.0)).rgb + texture2D(t, u + vec2(h.x * 2.0, 0.0)).rgb + texture2D(t, u + vec2(0.0, h.y * 2.0)).rgb + texture2D(t, u + vec2(0.0, -h.y * 2.0)).rgb; s += (texture2D(t, u + vec2(-h.x, h.y)).rgb + texture2D(t, u + vec2(h.x, h.y)).rgb + texture2D(t, u + vec2(h.x, -h.y)).rgb + texture2D(t, u + vec2(-h.x, -h.y)).rgb) * 2.0; gl_FragColor = vec4(s / 12.0 + texture2D(b, u).rgb, 1.0); }',
        { t: { value: null }, b: { value: null }, h: { value: new T.Vector2() } });
      pp.out = mat('uniform sampler2D s, bl; uniform float k, ex; varying vec2 vUv;' +
        ' vec3 fit(vec3 v){ vec3 a = v * (v + 0.0245786) - 0.000090537; vec3 b = v * (0.983729 * v + 0.4329510) + 0.238081; return a / b; }' +
        ' vec3 aces(vec3 c){ const mat3 I = mat3(vec3(0.59719, 0.07600, 0.02840), vec3(0.35458, 0.90834, 0.13383), vec3(0.04823, 0.01566, 0.83777)); const mat3 O = mat3(vec3(1.60475, -0.10208, -0.00327), vec3(-0.53108, 1.10813, -0.07276), vec3(-0.07367, -0.00605, 1.07602)); c *= ex / 0.6; c = I * c; c = fit(c); c = O * c; return clamp(c, 0.0, 1.0); }' +
        ' vec3 srgb(vec3 c){ return mix(pow(c, vec3(0.41666)) * 1.055 - vec3(0.055), c * 12.92, vec3(lessThanEqual(c, vec3(0.0031308)))); }' +
        ' void main(){ vec3 c = texture2D(s, vUv).rgb + texture2D(bl, vUv).rgb * k; c = srgb(aces(c)); float n = fract(sin(dot(gl_FragCoord.xy, vec2(12.9898, 78.233))) * 43758.5453); gl_FragColor = vec4(c + (n - 0.5) / 255.0, 1.0); }',
        { s: { value: pp.scene.texture }, bl: { value: null }, k: { value: pp.strength }, ex: { value: rnd.toneMappingExposure } });
      this._ppSize();
    }

    _ppSize() {
      const pp = this._pp, v = new THREE.Vector2();
      this._rnd.getDrawingBufferSize(v);
      const w = Math.max(2, v.x | 0), h = Math.max(2, v.y | 0);
      pp.scene.setSize(w, h);
      for (let i = 0; i < pp.levels; i++) {
        const d = Math.pow(2, i + 1);
        pp.down[i].setSize(Math.max(1, (w / d) | 0), Math.max(1, (h / d) | 0));
        pp.up[i].setSize(Math.max(1, (w / d) | 0), Math.max(1, (h / d) | 0));
      }
    }

    _ppRender() {
      const pp = this._pp, rnd = this._rnd, q = pp.q, quad = pp.quad;
      rnd.setRenderTarget(pp.scene);
      rnd.render(this._scene, this._cam);
      const pass = (m, target) => { quad.material = m; rnd.setRenderTarget(target); rnd.render(q, pp.cam); };
      const tx = (r) => pp.h || (pp.h = new THREE.Vector2());
      // prefilter into level 0
      pp.pre.uniforms.t.value = pp.scene.texture;
      pp.pre.uniforms.h.value.set(1 / pp.scene.width, 1 / pp.scene.height);
      pass(pp.pre, pp.down[0]);
      for (let i = 1; i < pp.levels; i++) {
        const src = pp.down[i - 1];
        pp.dn.uniforms.t.value = src.texture;
        pp.dn.uniforms.h.value.set(1 / src.width, 1 / src.height);
        pass(pp.dn, pp.down[i]);
      }
      let src = pp.down[pp.levels - 1];
      for (let i = pp.levels - 2; i >= 0; i--) {
        pp.upm.uniforms.t.value = src.texture;
        pp.upm.uniforms.b.value = pp.down[i].texture;
        pp.upm.uniforms.h.value.set(0.5 / src.width, 0.5 / src.height);
        pass(pp.upm, pp.up[i]);
        src = pp.up[i];
      }
      pp.out.uniforms.bl.value = src.texture;
      pass(pp.out, null);
    }

    // fireflies: HDR vertex colours so bloom lights them, each on its own blink
    _fireflies(scene) {
      const T = THREE, N = this._reduce ? 14 : 46;
      const pos = new Float32Array(N * 3), col = new Float32Array(N * 3);
      this._ffl = [];
      for (let i = 0; i < N; i++) {
        this._ffl.push({ x: (Math.random() - 0.5) * 30, y: 0.5 + Math.random() * 3.2, z: 1 + Math.random() * 15, ph: Math.random() * 6.28, sp: 0.35 + Math.random() * 0.5, bl: 0.6 + Math.random() * 0.9 });
      }
      const g = new T.BufferGeometry();
      g.setAttribute('position', new T.BufferAttribute(pos, 3));
      g.setAttribute('color', new T.BufferAttribute(col, 3));
      const c = document.createElement('canvas'); c.width = c.height = 64;
      const x = c.getContext('2d'), gr = x.createRadialGradient(32, 32, 0, 32, 32, 32);
      gr.addColorStop(0, 'rgba(255,255,255,1)'); gr.addColorStop(0.25, 'rgba(255,255,255,0.55)'); gr.addColorStop(1, 'rgba(255,255,255,0)');
      x.fillStyle = gr; x.fillRect(0, 0, 64, 64);
      this._ff = new T.Points(g, new T.PointsMaterial({ size: 0.26, map: new T.CanvasTexture(c), vertexColors: true, transparent: true, depthWrite: false, blending: T.AdditiveBlending }));
      this._ff.frustumCulled = false;
      scene.add(this._ff);
    }

    _lights(scene) {
      const T = THREE;
      this._amb = new T.HemisphereLight(0x2a2418, 0x0a0806, 0.5);
      scene.add(this._amb);
      this._moonLight = new T.DirectionalLight(0xffffff, 0.55);
      this._moonLight.position.set(-16, 14, -13);
      this._moonLight.castShadow = !this._reduce;
      if (this._moonLight.shadow) {
        this._moonLight.shadow.mapSize.set(1024, 1024);
        const c = this._moonLight.shadow.camera;
        c.left = -22; c.right = 22; c.top = 22; c.bottom = -22; c.far = 70;
      }
      scene.add(this._moonLight);
      // camera-side raking light: low and warm, its job is to throw the overhanging
      // branch shadows forward onto the engawa and the stepping-stone path
      this._dapple = new T.DirectionalLight(0xffe0b0, 0.72);
      this._dapple.position.set(-13, 9, 17);
      this._dapple.target.position.set(1.5, 1.3, 3.5);
      this._dapple.castShadow = !this._reduce;
      if (this._dapple.shadow) {
        this._dapple.shadow.mapSize.set(1024, 1024);
        const dc = this._dapple.shadow.camera;
        dc.left = -16; dc.right = 16; dc.top = 16; dc.bottom = -16; dc.far = 60;
        this._dapple.shadow.bias = -0.0009;
      }
      scene.add(this._dapple.target);
      scene.add(this._dapple);
      this._rimLight = new T.DirectionalLight(0xb7301f, 0.5);
      this._rimLight.position.set(14, 5, -10);
      scene.add(this._rimLight);
      // interior warmth: what makes the shoji read as paper with a room behind it
      this._inner = [];
      [[-1.6, 1.9, -1.1], [2.4, 1.9, -1.1], [0.6, 5.3, -0.9]].forEach((p) => {
        const l = new T.PointLight(0xffc078, 0.85, 11, 2);
        l.position.set(p[0], p[1], p[2]);
        scene.add(l);
        this._inner.push(l);
      });
    }

    _world(scene) {
      const T = THREE;
      scene.fog = new T.FogExp2(0x120d08, 0.03);
      this._sky(scene);
      // ground
      const gm = new T.MeshStandardMaterial({ color: 0x1b1710, roughness: 0.96, metalness: 0 });
      const g = new T.Mesh(new T.CircleGeometry(90, 48), gm);
      g.rotation.x = -Math.PI / 2;
      g.receiveShadow = !this._reduce;
      scene.add(g);
      // raked gravel forecourt
      const grav = new T.Mesh(
        new T.CircleGeometry(13, 40),
        new T.MeshStandardMaterial({
          color: 0x3a3428, roughness: 1, metalness: 0,
          map: tex((c, w, h) => {
            c.fillStyle = '#3a3428'; c.fillRect(0, 0, w, h);
            c.strokeStyle = 'rgba(20,17,12,0.5)'; c.lineWidth = 2;
            for (let y = 0; y < h; y += 9) { c.beginPath(); c.moveTo(0, y); c.lineTo(w, y + 2); c.stroke(); }
          }, 256, 256, 9, 9)
        })
      );
      grav.rotation.x = -Math.PI / 2;
      grav.position.set(0.5, 0.012, 7.5);
      grav.receiveShadow = !this._reduce;
      scene.add(grav);
      // moon + halo
      const moon = this._moon = new T.Mesh(
        new T.SphereGeometry(7.6, 40, 28),
        new T.MeshBasicMaterial({ color: 0xe8dcc0 })
      );
      moon.position.set(-16, 19, -52);
      scene.add(moon);
      const halo = this._halo = new T.Sprite(new T.SpriteMaterial({
        map: dotTex('rgba(255,242,214,0.95)', 'rgba(232,122,74,0.28)'),
        transparent: true, blending: T.AdditiveBlending, depthWrite: false
      }));
      halo.scale.set(74, 74, 1);
      halo.position.copy(moon.position);
      scene.add(halo);
      // Distant ranges. The old version was three sine sums sampled every 7 units:
      // straight chords between far-apart points, so the silhouette read as a folded
      // paper strip. These are fractal ridges — four octaves with peak sharpening —
      // sampled fine enough to curve, and each layer is wide and deep enough that no
      // camera framing can find sky under it.
      const far = this._far = new T.Group();
      const fbm = (x, s) => {
        let v = 0, a = 1, f = 1, n = 0;
        for (let o = 0; o < 4; o++) {
          v += a * (Math.sin(x * 0.021 * f + s * 3.1 + o * 1.7) * 0.6 + Math.sin(x * 0.037 * f + s * 5.9 - o * 2.3) * 0.4);
          n += a; a *= 0.48; f *= 2.13;
        }
        return v / n;
      };
      const mtc = document.createElement('canvas');
      mtc.width = 4; mtc.height = 64;
      const mtg = mtc.getContext('2d');
      const mtgr = mtg.createLinearGradient(0, 0, 0, 64);
      mtgr.addColorStop(0, 'rgba(255,255,255,0)');
      mtgr.addColorStop(0.55, 'rgba(255,255,255,0.5)');
      mtgr.addColorStop(1, 'rgba(255,255,255,0.95)');
      mtg.fillStyle = mtgr; mtg.fillRect(0, 0, 4, 64);
      const mistTex = new T.CanvasTexture(mtc);
      const LAYERS = [
        { z: -112, h: 30, base: 0.62, ink: 0.30, op: 1 },
        { z: -94,  h: 24, base: 0.70, ink: 0.46, op: 1 },
        { z: -76,  h: 18, base: 0.80, ink: 0.64, op: 1 },
        { z: -60,  h: 13, base: 0.92, ink: 0.82, op: 1 }
      ];
      this._farMats = [];
      LAYERS.forEach((L, i) => {
        const W = 300, STEP = 1.1, shape = new T.Shape();
        shape.moveTo(-W, -60);
        const pts = [];
        for (let x = -W; x <= W; x += STEP) {
          let n = fbm(x, i + 1);
          // sharpen: |n|^0.72 keeps broad valleys but pulls summits to points, which is
          // what separates a mountain profile from a rolling sine
          n = Math.sign(n) * Math.pow(Math.abs(n), 0.72);
          pts.push([x, L.h * (L.base + n * 0.5)]);
        }
        pts.forEach(p => shape.lineTo(p[0], p[1]));
        shape.lineTo(W, -60);
        // Opaque and depth-writing: this is solid rock, and the sky layers (stars,
        // meteor) depth-test against it. With depthWrite off they had nothing to test
        // against and composited straight over the silhouette.
        const mat = new T.MeshBasicMaterial({ fog: false });
        const m = new T.Mesh(new T.ShapeGeometry(shape), mat);
        m.position.set(0, 0, L.z);
        m.renderOrder = -8 + i * 2;
        m.userData.keep = true;
        far.add(m);

        // light catching the crest: a thin warm line on the ridge itself. This is what
        // sells a mountain as lit by the same sun as the house instead of a flat cutout.
        const cg = new T.BufferGeometry().setFromPoints(pts.map(p => new T.Vector3(p[0], p[1], 0)));
        const cmat = new T.LineBasicMaterial({ transparent: true, opacity: 0.16 + (i / 3) * 0.2, fog: false, depthWrite: false });
        const crest = new T.Line(cg, cmat);
        crest.position.set(0, 0.16, L.z + 0.4);
        crest.renderOrder = -7 + i * 2;
        crest.userData.keep = true;
        far.add(crest);

        // mist pooling in the valley in front of each range — the separation cue that
        // makes four layers read as distance rather than four stacked shapes
        const mist = new T.Mesh(
          new T.PlaneGeometry(600, L.h * 0.9),
          new T.MeshBasicMaterial({ map: mistTex, transparent: true, opacity: 0.3 - i * 0.045, fog: false, depthWrite: false })
        );
        mist.position.set(0, L.h * 0.3, L.z + 5);
        mist.renderOrder = -7 + i * 2;
        mist.userData.keep = true;
        far.add(mist);

        this._farMats.push({ mat, cmat, mist: mist.material, k: i / (LAYERS.length - 1) });
      });
      far.userData.keep = true;
      scene.add(far);
    }

    // rough-hewn foundation stone (ishiba) — a post never sits on bare ground
    _boulder(r, mat) {
      const T = THREE;
      const geo = new T.IcosahedronGeometry(r, 1);
      const p = geo.attributes.position;
      for (let i = 0; i < p.count; i++) {
        const f = 0.78 + Math.random() * 0.36;
        p.setXYZ(i, p.getX(i) * f, p.getY(i) * f * 0.62, p.getZ(i) * f);
      }
      geo.computeVertexNormals();
      const m = new T.Mesh(geo, mat);
      m.castShadow = m.receiveShadow = !this._reduce;
      return m;
    }

    // post-and-beam column: stone base, chamfered column, nuki tie beam whose tenon
    // passes through and is locked with a visible wedge, plus a kumimono bracket head
    _column(hgt, y, wood, stone, opts) {
      const T = THREE, g = new T.Group(), o = opts || {};
      const t = o.t || 0.24;
      const bs = this._boulder(t * 1.5, stone);
      bs.position.set(0, y - t * 0.42, 0);
      g.add(bs);
      const col = new T.Mesh(new T.BoxGeometry(t, hgt, t), wood);
      col.position.y = y + hgt / 2;
      col.castShadow = !this._reduce;
      g.add(col);
      // chamfer strips read as a bevelled arris under raking light
      [-1, 1].forEach((s) => {
        const ch = new T.Mesh(new T.BoxGeometry(t * 0.14, hgt, t * 0.14), wood);
        ch.position.set(s * t * 0.5, y + hgt / 2, t * 0.5);
        ch.rotation.y = Math.PI / 4;
        g.add(ch);
      });
      if (o.nuki !== false) {
        const ny = y + hgt * (o.nukiAt || 0.58);
        const tenon = new T.Mesh(new T.BoxGeometry(t * 2.1, 0.17, t * 0.62), wood);
        tenon.position.set(0, ny, 0);
        g.add(tenon);
        [-1, 1].forEach((s) => {
          const wedge = new T.Mesh(new T.BoxGeometry(0.055, 0.21, t * 0.66), wood);
          wedge.position.set(s * t * 0.86, ny + 0.02, 0);
          g.add(wedge);
        });
      }
      if (o.head !== false) {
        const blk = new T.Mesh(new T.BoxGeometry(t * 1.3, 0.2, t * 1.3), wood);
        blk.position.y = y + hgt - 0.1;
        g.add(blk);
        const cap = new T.Mesh(new T.BoxGeometry(t * 2.6, 0.17, t * 1.5), wood);
        cap.position.y = y + hgt + 0.08;
        g.add(cap);
        // hozo brace from column to head
        [-1, 1].forEach((s) => {
          this._beam(g, wood, [s * t * 0.5, y + hgt - 0.72, 0], [s * t * 1.15, y + hgt - 0.06, 0], 0.085);
        });
      }
      return g;
    }

    // shinkabe wall: earthen infill recessed behind an exposed post-and-rail grid
    _shinkabe(w, h, plaster, wood) {
      const T = THREE, g = new T.Group();
      const infill = new T.Mesh(new T.BoxGeometry(w, h, 0.16), plaster);
      g.add(infill);
      const bays = Math.max(2, Math.round(w / 1.8));
      for (let i = 0; i <= bays; i++) {
        const p = new T.Mesh(new T.BoxGeometry(0.16, h, 0.22), wood);
        p.position.set(-w / 2 + (w / bays) * i, 0, 0.11);
        p.castShadow = !this._reduce;
        g.add(p);
      }
      [h / 2 - 0.09, -h / 2 + 0.09, h * 0.08].forEach((yy, i) => {
        const r = new T.Mesh(new T.BoxGeometry(w, i === 2 ? 0.11 : 0.19, 0.2), wood);
        r.position.set(0, yy, 0.1);
        g.add(r);
      });
      return g;
    }


    // Draw-call batching. Everything in this scene is hand-built from small primitives,
    // which is great for authoring and terrible for the GPU — 2300 meshes meant 2300
    // draw calls. These merge same-material static meshes into one buffer each.
    // Meshes flagged userData.keep are left alone (anything animated per-object).
    _mergeMeshes(meshes, mat) {
      const T = THREE;
      const parts = [];
      let total = 0, hasUV = true;
      for (let i = 0; i < meshes.length; i++) {
        const m = meshes[i];
        m.updateMatrix();
        let g = m.geometry;
        g = g.index ? g.toNonIndexed() : g.clone();
        g.applyMatrix4(m.matrix);
        if (!g.attributes.normal) g.computeVertexNormals();
        if (!g.attributes.uv) hasUV = false;
        total += g.attributes.position.count;
        parts.push(g);
      }
      if (!total) return null;
      const pos = new Float32Array(total * 3), nor = new Float32Array(total * 3);
      const uv = hasUV ? new Float32Array(total * 2) : null;
      let o = 0;
      for (let i = 0; i < parts.length; i++) {
        const g = parts[i], c = g.attributes.position.count;
        pos.set(g.attributes.position.array.subarray(0, c * 3), o * 3);
        nor.set(g.attributes.normal.array.subarray(0, c * 3), o * 3);
        if (uv) uv.set(g.attributes.uv.array.subarray(0, c * 2), o * 2);
        o += c;
        g.dispose();
      }
      const out = new T.BufferGeometry();
      out.setAttribute('position', new T.BufferAttribute(pos, 3));
      out.setAttribute('normal', new T.BufferAttribute(nor, 3));
      if (uv) out.setAttribute('uv', new T.BufferAttribute(uv, 2));
      const mesh = new T.Mesh(out, mat);
      mesh.castShadow = mesh.receiveShadow = !this._reduce;
      return mesh;
    }

    // Flatten a group: collect static meshes (with their world-relative transforms
    // baked in), merge per material, and swap them for one mesh each.
    _batch(group) {
      const T = THREE, buckets = new Map(), doomed = [];
      // base = transform of the space the children live in. The root's own transform is
      // deliberately excluded: merged meshes are re-added under it, so baking it in
      // would apply it twice.
      const walk = (node, base) => {
        node.children.slice().forEach((c) => {
          if (c.userData && c.userData.keep) return;
          c.updateMatrix();
          if (c.isMesh && !c.isSprite) {
            const key = c.material.uuid;
            if (!buckets.has(key)) buckets.set(key, { mat: c.material, list: [] });
            const proxy = new T.Mesh(c.geometry, c.material);
            proxy.matrix.copy(base).multiply(c.matrix);
            proxy.updateMatrix = () => {};
            buckets.get(key).list.push(proxy);
            doomed.push(c);
          } else if (c.children && c.children.length) {
            walk(c, base.clone().multiply(c.matrix));
            if (!c.children.length) doomed.push(c);
          }
        });
      };
      walk(group, new T.Matrix4());
      doomed.forEach((d) => { if (d.parent) d.parent.remove(d); });
      buckets.forEach((b) => {
        const m = this._mergeMeshes(b.list, b.mat);
        if (m) group.add(m);
      });
      return group;
    }

    // beam between two points, geometry cached by size
    _beam(g, mat, a, b, t) {
      const T = THREE, A = new T.Vector3().fromArray(a), B = new T.Vector3().fromArray(b);
      const len = A.distanceTo(B);
      this._geo = this._geo || new Map();
      const key = t.toFixed(3) + '|' + len.toFixed(2);
      let geo = this._geo.get(key);
      if (!geo) { geo = new T.BoxGeometry(t, len, t); this._geo.set(key, geo); }
      const m = new T.Mesh(geo, mat);
      m.position.copy(A).add(B).multiplyScalar(0.5);
      m.quaternion.setFromUnitVectors(new T.Vector3(0, 1, 0), B.clone().sub(A).normalize());
      g.add(m);
      return m;
    }

    // Signs of occupancy, not the occupant: a low desk with a live laptop on the engawa,
    // and a soft silhouette behind the one lit shoji. A shadow is allowed to be vague,
    // which is why it reads as a person where a modelled figure would read as a prop.
    _studio(house, x, woodMat, darkWood) {
      const T = THREE, top = 1.33;

      const c = document.createElement('canvas');
      c.width = 128; c.height = 128;
      const g = c.getContext('2d');
      g.filter = 'blur(9px)';
      g.fillStyle = 'rgba(28,22,16,0.82)';
      g.beginPath(); g.arc(64, 52, 17, 0, 7); g.fill();
      g.beginPath(); g.ellipse(64, 108, 39, 34, 0, 0, 7); g.fill();
      const sil = new T.Mesh(
        new T.PlaneGeometry(1.42, 1.42),
        new T.MeshBasicMaterial({ color: 0x1a1410, transparent: true, map: new T.CanvasTexture(c), opacity: 0.88, depthWrite: false })
      );
      // in FRONT of the paper, not behind it: an emissive panel can't be occluded from
      // the back, so the figure has to read as a shadow thrown onto the screen
      sil.position.set(x + 0.1, 2.0, -1.74);
      sil.userData.keep = true;
      house.add(sil);

      const d = new T.Group();
      d.position.set(x + 0.15, 0, 1.15);
      d.rotation.y = 0.55;
      const slab = new T.Mesh(new T.BoxGeometry(1.45, 0.055, 0.72), woodMat);
      slab.position.y = top + 0.32;
      slab.castShadow = slab.receiveShadow = !this._reduce;
      d.add(slab);
      [[-0.62, -0.28], [0.62, -0.28], [-0.62, 0.28], [0.62, 0.28]].forEach((p) => {
        const lg = new T.Mesh(new T.BoxGeometry(0.07, 0.32, 0.07), darkWood);
        lg.position.set(p[0], top + 0.16, p[1]);
        lg.castShadow = !this._reduce;
        d.add(lg);
      });

      const deckY = top + 0.35;
      const body = new T.Mesh(new T.BoxGeometry(0.6, 0.022, 0.4), new T.MeshStandardMaterial({ color: 0x4a4e55, roughness: 0.42, metalness: 0.55 }));
      body.position.set(-0.06, deckY + 0.011, 0.04);
      body.castShadow = !this._reduce;
      d.add(body);
      const lid = new T.Group();
      lid.position.set(-0.06, deckY + 0.02, -0.16);
      lid.rotation.x = -1.28;
      this._lid = lid; this._desk = d;
      const shell = new T.Mesh(new T.BoxGeometry(0.6, 0.38, 0.018), new T.MeshStandardMaterial({ color: 0x41454c, roughness: 0.42, metalness: 0.55 }));
      shell.position.y = 0.19;
      shell.castShadow = !this._reduce;
      lid.add(shell);
      const scr = this._scr = new T.Mesh(
        new T.PlaneGeometry(0.56, 0.35),
        new T.MeshBasicMaterial({ color: 0xcfe7ff, toneMapped: false })
      );
      scr.position.set(0, 0.19, 0.011);
      lid.add(scr);
      d.add(lid);

      const cup = new T.Mesh(new T.CylinderGeometry(0.052, 0.045, 0.1, 12), new T.MeshStandardMaterial({ color: 0x2f3338, roughness: 0.75 }));
      cup.position.set(0.44, deckY + 0.05, 0.15);
      cup.castShadow = !this._reduce;
      d.add(cup);
      const note = new T.Mesh(new T.BoxGeometry(0.26, 0.018, 0.34), new T.MeshStandardMaterial({ color: 0x6d6353, roughness: 0.95 }));
      note.position.set(0.42, deckY + 0.009, -0.14);
      note.rotation.y = 0.22;
      d.add(note);

      const gl = this._scrLight = new T.PointLight(0x9fd4ff, 1.15, 5.2, 2);
      gl.position.set(-0.06, deckY + 0.3, 0.12);
      d.add(gl);
      d.userData.keep = true;
      house.add(d);

      // the letter — a sealed envelope propped at the desk's near corner: click to write
      const lt = this._letter = new T.Group();
      lt.position.set(0.5, deckY, 0.26); this._letterY0 = deckY;
      lt.rotation.set(-0.35, -0.5, 0);
      const env = new T.Mesh(new T.BoxGeometry(0.3, 0.012, 0.2), new T.MeshStandardMaterial({ color: 0xe8dcc2, roughness: 0.9 }));
      env.position.y = 0.006; env.castShadow = !this._reduce;
      lt.add(env);
      const seal = new T.Mesh(new T.CylinderGeometry(0.03, 0.03, 0.012, 16), new T.MeshStandardMaterial({ color: 0xa3271a, roughness: 0.5, emissive: 0x5a0c06, emissiveIntensity: 0.4 }));
      seal.position.set(0, 0.015, 0.01);
      lt.add(seal);
      // invisible, generous hit box so a 0.3m envelope is still easy to point at
      const lhit = new T.Mesh(new T.BoxGeometry(0.5, 0.25, 0.4), new T.MeshBasicMaterial({ visible: false }));
      lhit.position.y = 0.08; lt.add(lhit);
      d.add(lt);
      this._letterLight = new T.PointLight(0xffc48a, 0, 1.6, 2);
      this._letterLight.position.set(0.5, deckY + 0.3, 0.3);
      d.add(this._letterLight);

      // the bookshelf — a low tansu against the lit shoji: click for skills
      const sh = this._shelf = new T.Group();
      sh.position.set(x - 1.15, top, -1.32);
      sh.rotation.y = 0.28;
      const W = 0.86, H = 1.06, D = 0.3, fr = 0.035;
      [[-W / 2 + fr / 2, H / 2, fr, H], [W / 2 - fr / 2, H / 2, fr, H]].forEach((p) => {
        const m = new T.Mesh(new T.BoxGeometry(p[2], p[3], D), darkWood); m.position.set(p[0], p[1], 0); m.castShadow = !this._reduce; sh.add(m);
      });
      const tiers = [0.02, 0.37, 0.71, H - 0.02];
      tiers.forEach((y) => { const m = new T.Mesh(new T.BoxGeometry(W, fr, D), darkWood); m.position.y = y; m.castShadow = !this._reduce; sh.add(m); });
      const back = new T.Mesh(new T.BoxGeometry(W, H, 0.015), darkWood); back.position.set(0, H / 2, -D / 2 + 0.008); sh.add(back);
      const bookCols = [0x7a2a1e, 0x3c4a3a, 0x8a7350, 0x2f3a4a, 0x5a4636, 0x9c8a6a, 0x46302a];
      const bookMats = bookCols.map((c) => new T.MeshStandardMaterial({ color: c, roughness: 0.85 }));
      let seed = 7; const rnd = () => (seed = (seed * 9301 + 49271) % 233280) / 233280;
      [0, 1, 2].forEach((ti) => {
        let bx = -W / 2 + fr + 0.01; const y0 = tiers[ti] + fr / 2, room = tiers[ti + 1] - tiers[ti] - fr - 0.03;
        while (bx < W / 2 - fr - 0.06) {
          const bw = 0.035 + rnd() * 0.03, bh = room * (0.68 + rnd() * 0.3);
          if (rnd() < 0.12) { bx += 0.05; continue; }
          const b = new T.Mesh(new T.BoxGeometry(bw, bh, D * 0.78), bookMats[Math.floor(rnd() * bookMats.length)]);
          b.position.set(bx + bw / 2, y0 + bh / 2, 0.01);
          if (rnd() < 0.08) b.rotation.z = 0.18;
          sh.add(b); bx += bw + 0.004;
        }
      });
      sh.userData.keep = true;
      house.add(sh);
      this._shelfLight = new T.PointLight(0xffc48a, 0, 2.4, 2);
      this._shelfLight.position.set(x - 1.0, top + 0.8, -0.8);
      house.add(this._shelfLight);

      this._sil = sil;
      this._silX0 = sil.position.x;
    }

    // The sky was a flat fill: one dead colour behind everything. It now gets depth
    // (a painted zenith→horizon ramp), grain (stars), and slow life (drifting cloud
    // banks, a crossing flight of birds) — all far enough out to stay behind the house
    // and quiet enough never to pull focus off the type.
    _sky(scene) {
      const T = THREE;

      const sc = document.createElement('canvas');
      sc.width = 4; sc.height = 256;
      this._skyCtx = sc.getContext('2d');
      const dome = this._dome = new T.Mesh(
        new T.SphereGeometry(300, 32, 20),
        new T.MeshBasicMaterial({ map: new T.CanvasTexture(sc), side: T.BackSide, fog: false, depthWrite: false })
      );
      dome.renderOrder = -10;
      dome.userData.keep = true;
      scene.add(dome);

      const n = 260, sp = new Float32Array(n * 3);
      this._starPh = new Float32Array(n);
      for (let i = 0; i < n; i++) {
        // the camera is near-level, so the visible sky is a shallow band above the
        // roofline — stars scattered over the zenith would never be on screen
        const th = (Math.random() * 1.9 - 0.62), el = 0.07 + Math.random() * 0.58, r = 215;
        sp[i * 3] = Math.sin(th) * Math.cos(el) * r;
        sp[i * 3 + 1] = Math.sin(el) * r;
        sp[i * 3 + 2] = -Math.cos(th) * Math.cos(el) * r;
        this._starPh[i] = Math.random() * 6.28;
      }
      const sg = new T.BufferGeometry();
      sg.setAttribute('position', new T.BufferAttribute(sp, 3));
      // a hard-cored dot: at a few pixels across, a soft alpha ramp is all skirt and
      // renders as nothing
      const stc = document.createElement('canvas');
      stc.width = 32; stc.height = 32;
      const stg = stc.getContext('2d');
      const sgr = stg.createRadialGradient(16, 16, 0, 16, 16, 16);
      sgr.addColorStop(0, 'rgba(255,253,247,1)');
      sgr.addColorStop(0.34, 'rgba(255,252,244,1)');
      sgr.addColorStop(0.62, 'rgba(214,226,244,0.42)');
      sgr.addColorStop(1, 'rgba(190,206,232,0)');
      stg.fillStyle = sgr; stg.fillRect(0, 0, 32, 32);
      this._stars = new T.Points(sg, new T.PointsMaterial({
        size: 5, map: new T.CanvasTexture(stc),
        color: 0xdfe6f2, transparent: true, opacity: 0.0, depthWrite: false, fog: false,
        blending: T.AdditiveBlending, sizeAttenuation: false
      }));
      scene.add(this._stars);

      const cc = document.createElement('canvas');
      cc.width = 256; cc.height = 128;
      const cg = cc.getContext('2d');
      cg.filter = 'blur(16px)';
      for (let i = 0; i < 26; i++) {
        const bx = 30 + Math.random() * 196, by = 52 + Math.random() * 38, br = 12 + Math.random() * 26;
        cg.fillStyle = 'rgba(255,255,255,' + (0.05 + Math.random() * 0.08).toFixed(3) + ')';
        cg.beginPath(); cg.ellipse(bx, by, br, br * 0.44, 0, 0, 7); cg.fill();
      }
      const cloudTex = new T.CanvasTexture(cc);
      this._clouds = [];
      for (let i = 0; i < 5; i++) {
        const m = new T.Mesh(
          new T.PlaneGeometry(90 + i * 22, 26 + i * 5),
          new T.MeshBasicMaterial({ map: cloudTex, transparent: true, opacity: 0.3, depthWrite: false, fog: false })
        );
        m.position.set(-110 + i * 62, 17 + (i % 3) * 9, -88 - i * 10);
        m.renderOrder = -9;
        m.userData.keep = true;
        scene.add(m);
        this._clouds.push({ m, sp: 0.55 + i * 0.22 });
      }

      // a flight crossing once every ~50s: the only fast thing in the sky, which is
      // what makes the rest of it feel still rather than frozen
      const bc = document.createElement('canvas');
      bc.width = 64; bc.height = 32;
      const bg = bc.getContext('2d');
      bg.strokeStyle = 'rgba(16,13,10,0.95)'; bg.lineWidth = 4; bg.lineCap = 'round';
      bg.beginPath(); bg.moveTo(8, 20); bg.lineTo(32, 8); bg.lineTo(56, 20); bg.stroke();
      const birdTex = new T.CanvasTexture(bc);
      this._birds = [];
      const flock = this._flock = new T.Group();
      for (let i = 0; i < 6; i++) {
        const s = new T.Sprite(new T.SpriteMaterial({ map: birdTex, transparent: true, opacity: 0.55, depthWrite: false, fog: false }));
        const sz = 2.4 + Math.random() * 1.1;
        s.scale.set(sz, sz * 0.5, 1);
        s.position.set(i * -4.2 - Math.random() * 2, (i % 2 ? 1 : -1) * (1.4 + i * 0.5), i * -2.1);
        flock.add(s);
        this._birds.push({ s, ph: Math.random() * 6.28, sz });
      }
      flock.position.set(-110, 24, -82);

      // meteor: one streak, reused. Idle most of the time, then a fast diagonal fall
      // with a tapered tail — rare enough to feel like luck rather than a loop.
      const mc = document.createElement('canvas');
      mc.width = 128; mc.height = 8;
      const mg = mc.getContext('2d');
      const mgr = mg.createLinearGradient(0, 0, 128, 0);
      mgr.addColorStop(0, 'rgba(255,255,255,0)');
      mgr.addColorStop(0.62, 'rgba(226,238,255,0.5)');
      mgr.addColorStop(0.93, 'rgba(255,253,246,1)');
      mgr.addColorStop(1, 'rgba(255,255,255,0)');
      mg.fillStyle = mgr; mg.fillRect(0, 2, 128, 4);
      const met = this._met = new T.Sprite(new T.SpriteMaterial({
        map: new T.CanvasTexture(mc), transparent: true, opacity: 0, depthWrite: false,
        fog: false, blending: T.AdditiveBlending, toneMapped: false
      }));
      met.scale.set(34, 1.5, 1);
      met.center.set(1, 0.5);
      met.userData.keep = true;
      met.visible = false;
      scene.add(met);
      this._metT = 2.5 + Math.random() * 4;
      scene.add(flock);
    }

    _paintSky(t) {
      const T = THREE, g = this._skyCtx;
      const zen = new T.Color(t.sky).multiplyScalar(0.55);
      const mid = new T.Color(t.sky);
      const hor = new T.Color(t.sky).lerp(new T.Color(t.rim), 0.55).lerp(new T.Color(t.warm), 0.18);
      const grad = g.createLinearGradient(0, 0, 0, 256);
      grad.addColorStop(0, '#' + zen.getHexString());
      grad.addColorStop(0.52, '#' + mid.getHexString());
      grad.addColorStop(0.8, '#' + mid.clone().lerp(hor, 0.5).getHexString());
      grad.addColorStop(1, '#' + hor.getHexString());
      g.fillStyle = grad;
      g.fillRect(0, 0, 4, 256);
      this._dome.material.map.needsUpdate = true;
      // stars only earn their place once the sky is actually dark
      // dusk is the shipped default, so it has to carry a real starfield
      this._starTarget = t.stars;
      this._clouds.forEach(c => { c.m.material.color = new T.Color(t.warm).lerp(new T.Color(t.sky), 0.55); });
      // Ranges are made of the sky's own colour, not an imported night-blue: each layer
      // is the sky darkened toward the ink, then lifted back toward the horizon by
      // distance. Warm world in, warm world out — no palette seam at the ridgeline.
      const air = new T.Color(t.sky).lerp(new T.Color(t.rim), 0.22);
      const ink = new T.Color(t.fog).multiplyScalar(0.5);
      if (this._farMats) this._farMats.forEach(f => {
        f.mat.color.copy(air).lerp(ink, f.k * 0.82 + 0.1);
        f.cmat.color.copy(new T.Color(t.rim)).lerp(new T.Color(t.warm), 0.45);
        f.mist.color.copy(air).lerp(new T.Color(t.warm), 0.16);
      });
    }

    // shoji bay: paper pane + kumiko lattice + koshi kick-board + surrounding frame
    _bay(w, h, paper, frame, cols, rows) {
      const T = THREE, g = new T.Group();
      const kick = h * 0.17, ph = h - kick;
      const pane = new T.Mesh(new T.PlaneGeometry(w - 0.09, ph - 0.08), paper);
      pane.position.set(0, kick / 2, 0);
      g.add(pane);
      for (let i = 1; i < cols * 2; i++) {
        const b = new T.Mesh(new T.BoxGeometry(0.032, ph - 0.08, 0.028), frame);
        b.position.set(-w / 2 + (w / (cols * 2)) * i, kick / 2, 0.028);
        g.add(b);
      }
      for (let j = 1; j < rows; j++) {
        const b = new T.Mesh(new T.BoxGeometry(w - 0.09, 0.032, 0.028), frame);
        b.position.set(0, -h / 2 + kick + (ph / rows) * j, 0.028);
        g.add(b);
      }
      const kb = new T.Mesh(new T.BoxGeometry(w - 0.06, kick, 0.07), frame);
      kb.position.set(0, -h / 2 + kick / 2, 0.02);
      g.add(kb);
      [[-w / 2, 0], [w / 2, 0], [0, 0]].forEach(([x], i) => {
        const st = new T.Mesh(new T.BoxGeometry(i === 2 ? 0.06 : 0.075, h, 0.075), frame);
        st.position.set(x, 0, 0.04);
        g.add(st);
      });
      [[0, h / 2], [0, -h / 2]].forEach(([, yy]) => {
        const r = new T.Mesh(new T.BoxGeometry(w + 0.06, 0.085, 0.08), frame);
        r.position.set(0, yy, 0.04);
        g.add(r);
      });
      return g;
    }

    // koshi lattice band — used for ranma transoms and window grilles
    _lattice(w, h, mat, n) {
      const T = THREE, g = new T.Group();
      for (let i = 0; i <= n; i++) {
        const b = new T.Mesh(new T.BoxGeometry(0.038, h, 0.05), mat);
        b.position.set(-w / 2 + (w / n) * i, 0, 0);
        g.add(b);
      }
      [h / 2, -h / 2].forEach((yy) => {
        const r = new T.Mesh(new T.BoxGeometry(w + 0.08, 0.07, 0.07), mat);
        r.position.set(0, yy, 0);
        g.add(r);
      });
      return g;
    }

    // sudare — rolled bamboo blind hung under the eave
    _sudare(w, h, mat) {
      const T = THREE, g = new T.Group();
      const rows = Math.round(h / 0.085);
      for (let i = 0; i < rows; i++) {
        const s = new T.Mesh(new T.BoxGeometry(w, 0.05, 0.022), mat);
        s.position.set(0, h / 2 - i * (h / rows), 0);
        g.add(s);
      }
      const roll = new T.Mesh(new T.CylinderGeometry(0.075, 0.075, w, 8), mat);
      roll.rotation.z = Math.PI / 2;
      roll.position.y = h / 2 + 0.09;
      g.add(roll);
      return g;
    }

    // one flared hip-roof section: two frusta + ribbed tiles, hip ridges, eave lip, rafter tails
    // profile of a sori (sweeping) hip roof: t=0 at the eave, 1 at the ridge.
    // radius shrinks linearly, rise follows a power curve so the slope is shallow and
    // flaring at the eave and steep at the ridge — the classic concave sweep.
    _profile(w, h, y, steps) {
      const pts = [];
      for (let i = 0; i <= steps; i++) {
        const t = i / steps;
        pts.push({ r: w * (1 - 0.895 * t), y: y + h * Math.pow(t, 1.42) });
      }
      return pts;
    }

    // one flared hip roof: curved tile shell, hip ridges, noshi eave course,
    // deep dark soffit, exposed rafter tails and fascia
    _roof(w, d, h, y, thick) {
      const T = THREE, g = new T.Group();
      const K = 1 / Math.SQRT2, zs = d / w;
      const mat = new T.MeshStandardMaterial({ map: this._tile, color: 0x8d96a3, roughness: 0.7, metalness: 0.14 });
      const ribMat = new T.MeshStandardMaterial({ color: 0x79818d, roughness: 0.56, metalness: 0.18 });
      const capMat = new T.MeshStandardMaterial({ color: 0x1e2228, roughness: 0.48, metalness: 0.28 });
      const rafMat = new T.MeshStandardMaterial({ map: this._wood, color: 0x7d5730, roughness: 0.88 });
      const soffitMat = new T.MeshStandardMaterial({ color: 0x0d0b08, roughness: 1 });

      const P = this._profile(w, h, y, 9);
      // stacked frusta following the curve — silhouette sweeps instead of a flat triangle
      for (let i = 0; i < P.length - 1; i++) {
        const lo = P[i], hi = P[i + 1];
        const m = new T.Mesh(new T.CylinderGeometry(hi.r, lo.r, hi.y - lo.y, 4, 1), mat);
        m.rotation.y = Math.PI / 4;
        m.scale.z = zs;
        m.position.y = (lo.y + hi.y) / 2;
        m.castShadow = m.receiveShadow = !this._reduce;
        g.add(m);
      }

      // hongawara barrel ribs, chained along the curve on all four slopes
      for (let f = 0; f < 4; f++) {
        const fg = new T.Group();
        const hz = f % 2 === 0 ? zs : 1 / zs;
        const halfAt = (r) => (f % 2 === 0 ? r * K : r * K * zs);
        const zAt = (r) => (f % 2 === 0 ? r * K * zs : r * K);
        const n = Math.max(7, Math.round(halfAt(w) * 2 / 1.15));
        void hz;
        for (let k = 0; k <= n; k++) {
          const u = k / n;
          for (let i = 0; i < P.length - 1; i++) {
            const lo = P[i], hi = P[i + 1];
            const hb = halfAt(lo.r), ht = halfAt(hi.r);
            this._beam(fg, ribMat,
              [-hb + u * hb * 2, lo.y + 0.03, zAt(lo.r) + 0.04],
              [-ht + u * ht * 2, hi.y + 0.03, zAt(hi.r) + 0.04], 0.1);
          }
        }
        fg.rotation.y = f * Math.PI / 2;
        g.add(fg);
      }

      // kudarimune — four descending hip ridges, chained so they curve too
      for (let i = 0; i < P.length - 1; i++) {
        const lo = P[i], hi = P[i + 1];
        [-1, 1].forEach((sx) => [-1, 1].forEach((sz) => {
          this._beam(g, capMat,
            [sx * lo.r * K, lo.y + 0.07, sz * lo.r * K * zs],
            [sx * hi.r * K, hi.y + 0.07, sz * hi.r * K * zs], h * 0.115);
        }));
      }

      // munagawara — ridge cap with rolled end blocks and onigawara
      const ridge = new T.Mesh(new T.BoxGeometry(w * 0.2, h * 0.11, d * 0.075), capMat);
      ridge.position.y = y + h + h * 0.05;
      g.add(ridge);
      const roll = new T.Mesh(new T.CylinderGeometry(h * 0.05, h * 0.05, w * 0.21, 8), capMat);
      roll.rotation.z = Math.PI / 2;
      roll.position.y = y + h + h * 0.11;
      g.add(roll);
      [-1, 1].forEach((s) => {
        const b = new T.Mesh(new T.BoxGeometry(w * 0.05, h * 0.19, d * 0.06),
          new T.MeshStandardMaterial({ color: 0x2f353e, roughness: 0.46, metalness: 0.3 }));
        b.position.set(s * w * 0.105, y + h + h * 0.14, 0);
        g.add(b);
      });

      // noshi — thick stacked tile course flaring at the eave edge
      [0, 1].forEach((k) => {
        const lip = new T.Mesh(new T.CylinderGeometry(w * (1.005 - k * 0.012), w * (1.035 - k * 0.012), h * 0.05, 4, 1), capMat);
        lip.rotation.y = Math.PI / 4;
        lip.scale.z = zs;
        lip.position.y = y + h * (0.018 + k * 0.05);
        g.add(lip);
      });

      // deep soffit: dark underside slab + shadow gap, so the eave reads as heavy shade
      const soffit = new T.Mesh(new T.BoxGeometry(w * 1.02, thick * 1.5, d * 1.02), soffitMat);
      soffit.position.y = y - thick * 0.9;
      g.add(soffit);
      const band = new T.Mesh(new T.BoxGeometry(w * 0.99, thick * 0.8, d * 0.99),
        new T.MeshStandardMaterial({ map: this._wood, color: 0x6a4728, roughness: 0.9 }));
      band.position.y = y - thick * 0.2;
      band.castShadow = !this._reduce;
      g.add(band);

      // taruki — rafter tails projecting past the eave, with a fascia board over them
      for (let f = 0; f < 4; f++) {
        const fg = new T.Group();
        const half = f % 2 === 0 ? w * K : w * K * zs;
        const z = f % 2 === 0 ? w * K * zs : w * K;
        const n = Math.max(8, Math.round(half * 2 / 0.4));
        for (let i = 0; i <= n; i++) {
          const t = new T.Mesh(new T.BoxGeometry(0.08, 0.085, 0.62), rafMat);
          t.position.set(-half + (half * 2 / n) * i, y - thick * 1.6, z - 0.22);
          t.castShadow = !this._reduce;
          fg.add(t);
        }
        const fascia = new T.Mesh(new T.BoxGeometry(half * 2 + 0.26, 0.15, 0.08), rafMat);
        fascia.position.set(0, y - thick * 1.78, z + 0.1);
        fg.add(fascia);
        const drip = new T.Mesh(new T.BoxGeometry(half * 2 + 0.3, 0.05, 0.13), capMat);
        drip.position.set(0, y - thick * 1.9, z + 0.11);
        fg.add(drip);
        fg.rotation.y = f * Math.PI / 2;
        g.add(fg);
      }
      return this._batch(g);
    }

    _house(scene) {
      const T = THREE;
      this._tile = tileTex();
      this._wood = woodTex();
      this._shoji = shojiTex();
      this._plasterT = plasterTex();
      const house = this._houseGrp = new T.Group();
      const woodMat = new T.MeshStandardMaterial({ map: this._wood, color: 0x6d4e31, roughness: 0.86, metalness: 0.04 });
      const darkWood = new T.MeshStandardMaterial({ map: this._wood, color: 0x5d4128, roughness: 0.9 });
      const plaster = new T.MeshStandardMaterial({ map: this._plasterT, color: 0x8f8670, roughness: 0.98 });
      const stoneMat = new T.MeshStandardMaterial({ color: 0x2b2b30, roughness: 0.95 });
      const shojiMat = this._shojiMat = new T.MeshStandardMaterial({
        map: this._shoji, emissiveMap: this._shoji, emissive: 0xffbf72, emissiveIntensity: 0.42,
        color: 0x4a4133, roughness: 0.94, side: T.DoubleSide, transparent: true, opacity: 0.93
      });

      // stone podium with coursed nozura-zumi facing
      const base = new T.Mesh(new T.BoxGeometry(12.4, 1.05, 8.2),
        new T.MeshStandardMaterial({ color: 0x24242a, roughness: 0.95 }));
      base.position.y = 0.52;
      base.receiveShadow = base.castShadow = !this._reduce;
      house.add(base);
      const courseMat = new T.MeshStandardMaterial({ color: 0x33333a, roughness: 0.98 });
      for (let r = 0; r < 3; r++) {
        for (let i = 0; i < 16; i++) {
          const s = new T.Mesh(new T.BoxGeometry(0.62 + (i % 3) * 0.14, 0.28, 0.14), courseMat);
          s.position.set(-5.9 + i * 0.79 + (r % 2) * 0.18, 0.2 + r * 0.32, 4.16);
          house.add(s);
        }
      }

      // engawa deck
      const deck = new T.Mesh(new T.BoxGeometry(13.2, 0.26, 9), woodMat);
      deck.position.y = 1.16;
      deck.castShadow = deck.receiveShadow = !this._reduce;
      house.add(deck);

      // ground-floor shoji wall + plaster panels
      const wallY = 1.29;
      const bambooMat = new T.MeshStandardMaterial({ map: this._wood, color: 0x8d7442, roughness: 0.9 });
      // one bay is awake: its own material so it can burn warmer than the rest and
      // carry the monitor flicker without dragging the whole wall with it
      const LIT = 4;
      const litMat = this._litMat = shojiMat.clone();
      litMat.emissiveIntensity = 0.95;
      for (let i = 0; i < 7; i++) {
        const x = -5.1 + i * 1.7;
        const bay = this._bay(1.62, 2.5, i === LIT ? litMat : shojiMat, darkWood, 2, 4);
        bay.position.set(x, wallY + 1.25, -1.9);
        house.add(bay);
        // ranma transom over each bay
        const rm = this._lattice(1.56, 0.34, darkWood, 9);
        rm.position.set(x, wallY + 2.7, -1.87);
        house.add(rm);
        const post = new T.Mesh(new T.BoxGeometry(0.17, 2.6, 0.17), darkWood);
        post.position.set(x + 0.85, wallY + 1.3, -1.86);
        post.castShadow = !this._reduce;
        house.add(post);
      }
      // sudare blinds hung under the lower eave on two bays
      [-3.4, 3.4].forEach((x) => {
        const sd = this._sudare(1.5, 1.35, bambooMat);
        sd.position.set(x, wallY + 3.35, 3.0);
        house.add(sd);
      });
      {
        const xl = -5.1 + LIT * 1.7;
        const mk = (fn) => { const c = document.createElement('canvas'); c.width = 64; c.height = 128; fn(c.getContext('2d')); const t = new T.CanvasTexture(c); return t; };
        const beamTex = mk((g) => {
          const v = g.createLinearGradient(0, 0, 0, 128); v.addColorStop(0, 'rgba(255,255,255,0.9)'); v.addColorStop(0.55, 'rgba(255,255,255,0.32)'); v.addColorStop(1, 'rgba(255,255,255,0)');
          g.fillStyle = v; g.fillRect(0, 0, 64, 128);
          g.globalCompositeOperation = 'destination-in';
          const hz = g.createLinearGradient(0, 0, 64, 0); hz.addColorStop(0, 'rgba(0,0,0,0)'); hz.addColorStop(0.22, 'rgba(0,0,0,1)'); hz.addColorStop(0.78, 'rgba(0,0,0,1)'); hz.addColorStop(1, 'rgba(0,0,0,0)');
          g.fillStyle = hz; g.fillRect(0, 0, 64, 128);
        });
        const bm = this._beamMat = new T.MeshBasicMaterial({ map: beamTex, color: 0xffc27a, transparent: true, opacity: 0.11, depthWrite: false, blending: T.AdditiveBlending, side: T.DoubleSide, fog: false });
        const beam = new T.Mesh(new T.PlaneGeometry(1.7, 3.8), bm);
        beam.position.set(xl, wallY + 1.1, -0.35);
        beam.rotation.x = -0.946;
        house.add(beam);
        const pool = new T.Mesh(new T.PlaneGeometry(1.9, 3.4), this._poolMat = new T.MeshBasicMaterial({ map: beamTex, color: 0xffb765, transparent: true, opacity: 0.2, depthWrite: false, blending: T.AdditiveBlending }));
        pool.rotation.x = -Math.PI / 2;
        pool.position.set(xl, wallY + 0.02, -0.15);
        house.add(pool);
      }
      const backWall = this._shinkabe(12, 2.7, plaster, darkWood);
      backWall.position.set(0, wallY + 1.35, -3.6);
      house.add(backWall);
      const lintel = new T.Mesh(new T.BoxGeometry(12.2, 0.42, 0.34), darkWood);
      lintel.position.set(0, wallY + 2.75, -1.86);
      house.add(lintel);
      // veranda columns: stone bases, through-tenons with wedges, bracket heads
      for (let i = 0; i < 5; i++) {
        const x = -5.4 + i * 2.7;
        const c = this._column(2.8, wallY, darkWood, stoneMat, { t: 0.24, nukiAt: 0.62 });
        c.position.set(x, 0, 3.5);
        house.add(c);
      }
      // head beam tying the veranda columns, with a lower nageshi rail
      const eaveBeam = new T.Mesh(new T.BoxGeometry(11.4, 0.3, 0.28), darkWood);
      eaveBeam.position.set(-0.3, wallY + 2.7, 3.5);
      eaveBeam.castShadow = !this._reduce;
      house.add(eaveBeam);
      // engawa floorboards + nosing, so the deck reads as planks not a slab
      for (let i = 0; i < 26; i++) {
        const pl = new T.Mesh(new T.BoxGeometry(13.2, 0.05, 0.3), woodMat);
        pl.position.set(0, 1.3, -3.2 + i * 0.345);
        pl.receiveShadow = !this._reduce;
        house.add(pl);
      }
      const nosing = new T.Mesh(new T.BoxGeometry(13.3, 0.14, 0.1), darkWood);
      nosing.position.set(0, 1.24, 4.5);
      house.add(nosing);
      this._studio(house, -5.1 + LIT * 1.7, woodMat, darkWood);
      // kutsunugi-ishi — the shoe-removing stone at the deck edge
      const step = this._boulder(0.75, stoneMat);
      step.position.set(0.2, 1.0, 5.0);
      step.scale.set(1.2, 0.6, 1);
      house.add(step);

      // genkan entrance: recessed doorway with noren panels
      const doorway = new T.Mesh(new T.BoxGeometry(1.9, 2.3, 0.1),
        new T.MeshStandardMaterial({ color: 0x14100d, roughness: 1 }));
      doorway.position.set(0.05, wallY + 1.15, -1.78);
      house.add(doorway);
      const norenMat = new T.MeshStandardMaterial({ color: 0x2d2118, roughness: 0.95, side: T.DoubleSide });
      for (let i = 0; i < 3; i++) {
        const n = new T.Mesh(new T.PlaneGeometry(0.6, 1.05), norenMat);
        n.position.set(-0.6 + i * 0.63, wallY + 1.78, -1.7);
        house.add(n);
      }
      const norenRod = new T.Mesh(new T.CylinderGeometry(0.035, 0.035, 2.1, 8), bambooMat);
      norenRod.rotation.z = Math.PI / 2;
      norenRod.position.set(0.05, wallY + 2.32, -1.7);
      house.add(norenRod);

      // lower roof (skirt)
      const lower = this._roof(14.6, 10.4, 2.5, wallY + 2.9, 0.22);
      house.add(lower);

      // upper storey, set back
      const upY = wallY + 5.55;
      const upFloor = new T.Mesh(new T.BoxGeometry(9.2, 0.24, 6), woodMat);
      upFloor.position.y = upY;
      house.add(upFloor);
      for (let i = 0; i < 5; i++) {
        const x = -3.4 + i * 1.7;
        const bay = this._bay(1.6, 2.1, shojiMat, darkWood, 2, 3);
        bay.position.set(x, upY + 1.2, -1.2);
        house.add(bay);
        const post = new T.Mesh(new T.BoxGeometry(0.15, 2.2, 0.15), darkWood);
        post.position.set(x + 0.85, upY + 1.2, -1.16);
        house.add(post);
      }
      // upper-floor head beam and nageshi rail
      [[upY + 2.32, 0.2], [upY + 0.12, 0.13]].forEach(([yy, t]) => {
        const b = new T.Mesh(new T.BoxGeometry(9.0, t, 0.22), darkWood);
        b.position.set(-0.05, yy, -1.14);
        house.add(b);
      });
      const upBack = this._shinkabe(8.6, 2.3, plaster, darkWood);
      upBack.position.set(0, upY + 1.2, -2.6);
      house.add(upBack);
      // balcony railing
      const rail = new T.Group();
      const top = new T.Mesh(new T.BoxGeometry(9.2, 0.12, 0.14), woodMat);
      top.position.set(0, upY + 0.95, 2.85);
      rail.add(top);
      const bot = new T.Mesh(new T.BoxGeometry(9.2, 0.09, 0.12), woodMat);
      bot.position.set(0, upY + 0.16, 2.85);
      rail.add(bot);
      for (let i = 0; i < 34; i++) {
        const b = new T.Mesh(new T.BoxGeometry(0.07, 0.86, 0.07), woodMat);
        b.position.set(-4.5 + i * 0.27, upY + 0.55, 2.85);
        rail.add(b);
      }
      [-1, 1].forEach((s) => {
        const side = new T.Mesh(new T.BoxGeometry(0.12, 0.9, 5.6), woodMat);
        side.position.set(s * 4.55, upY + 0.55, 0.15);
        rail.add(side);
      });
      house.add(rail);
      // giboshi finials on the balcony newel posts
      [-4.55, -1.5, 1.5, 4.55].forEach((x) => {
        const nw = new T.Mesh(new T.BoxGeometry(0.16, 1.16, 0.16), darkWood);
        nw.position.set(x, upY + 0.6, 2.85);
        house.add(nw);
        const fin = new T.Mesh(new T.SphereGeometry(0.1, 10, 8),
          new T.MeshStandardMaterial({ color: 0x8c7a4e, roughness: 0.45, metalness: 0.5 }));
        fin.position.set(x, upY + 1.24, 2.85);
        house.add(fin);
      });

      // upper roof
      house.add(this._roof(11.2, 8.2, 2.9, upY + 2.5, 0.2));

      // chidori-hafu — dormer gable breaking the lower eave over the entrance
      const gShape = new T.Shape();
      gShape.moveTo(-1.5, 0); gShape.lineTo(1.5, 0); gShape.lineTo(0, 1.25); gShape.lineTo(-1.5, 0);
      const gable = new T.Mesh(new T.ExtrudeGeometry(gShape, { depth: 0.16, bevelEnabled: false }), plaster);
      gable.position.set(0.05, wallY + 3.0, 3.42);
      house.add(gable);
      [[-1.5, 0], [1.5, 0]].forEach(([bx]) => {
        this._beam(house, darkWood,
          [0.05 + bx, wallY + 2.98, 3.6], [0.05, wallY + 4.28, 3.6], 0.17);
      });
      const gFin = new T.Mesh(new T.SphereGeometry(0.11, 10, 8),
        new T.MeshStandardMaterial({ color: 0x8c7a4e, roughness: 0.45, metalness: 0.5 }));
      gFin.position.set(0.05, wallY + 4.36, 3.6);
      house.add(gFin);
      const gLat = this._lattice(1.5, 0.42, darkWood, 8);
      gLat.position.set(0.05, wallY + 3.4, 3.56);
      house.add(gLat);

      this._batch(house);
      house.position.set(0, 0, -1.2);
      scene.add(house);

      // stone steps to the forecourt
      for (let i = 0; i < 3; i++) {
        const st = new T.Mesh(new T.BoxGeometry(3.4 + i * 0.5, 0.2, 0.9),
          new T.MeshStandardMaterial({ color: 0x2c2c31, roughness: 0.95 }));
        st.position.set(0.2, 0.92 - i * 0.28, 3.6 + i * 0.85);
        st.receiveShadow = !this._reduce;
        scene.add(st);
      }
    }


    // Foreground hero object: a kasuga-doro pulled right up to the lens, bottom-left,
    // deliberately cropped by the frame edge. Parented to the camera rig so it holds
    // its place through every dolly shot — the near layer of the composition.
    _heroLantern(scene) {
      const T = THREE;
      const rig = this._heroRig = new T.Group();
      const g = new T.Group();
      const stone = new T.MeshStandardMaterial({ color: 0x8b8477, roughness: 0.9, metalness: 0.02 });
      const dark = new T.MeshStandardMaterial({ color: 0x423c33, roughness: 0.98 });
      // a small warm rake from the lens side, so the pedestal and roof curls have edges
      const rake = new T.PointLight(0xffd6a6, 1.1, 7, 2.2);
      rake.position.set(1.6, 4.6, 2.2);
      g.add(rake);
      const seg = (geo, y) => { const m = new T.Mesh(geo, stone); m.position.y = y; m.castShadow = !this._reduce; g.add(m); return m; };

      // kiso (buried base) + renge-style lotus pedestal
      seg(new T.CylinderGeometry(0.62, 0.74, 0.34, 14), 0.17);
      seg(new T.CylinderGeometry(0.44, 0.62, 0.2, 14), 0.44);
      for (let i = 0; i < 12; i++) {
        const pet = new T.Mesh(new T.SphereGeometry(0.11, 8, 6), stone);
        pet.scale.set(1, 0.5, 1.5);
        pet.position.set(Math.cos(i / 12 * 6.283) * 0.42, 0.56, Math.sin(i / 12 * 6.283) * 0.42);
        pet.rotation.y = -i / 12 * 6.283;
        g.add(pet);
      }
      // sao (shaft) with three banded nodes, like a bamboo culm rendered in granite
      seg(new T.CylinderGeometry(0.2, 0.23, 2.5, 14), 1.85);
      [1.0, 1.85, 2.7].forEach((y) => seg(new T.CylinderGeometry(0.26, 0.26, 0.13, 14), y));
      // chudai (platform) under the fire box
      seg(new T.CylinderGeometry(0.5, 0.34, 0.26, 14), 3.24);
      for (let i = 0; i < 10; i++) {
        const pet = new T.Mesh(new T.SphereGeometry(0.1, 8, 6), stone);
        pet.scale.set(1, 0.45, 1.4);
        pet.position.set(Math.cos(i / 10 * 6.283) * 0.44, 3.34, Math.sin(i / 10 * 6.283) * 0.44);
        pet.rotation.y = -i / 10 * 6.283;
        g.add(pet);
      }

      // hibukuro (fire box): hexagonal granite frame, two open windows, paper on the rest
      const fbY = 3.92, fbR = 0.52, fbH = 1.0;
      const paper = new T.MeshStandardMaterial({
        map: this._shoji, emissiveMap: this._shoji, emissive: 0xffc079, emissiveIntensity: 1.5,
        color: 0x5a4a33, roughness: 0.95, transparent: true, opacity: 0.94, side: T.DoubleSide
      });
      this._heroPaper = paper;
      const aperture = this._heroAper = new T.MeshStandardMaterial({
        color: 0x120c07, emissive: 0xffd39a, emissiveIntensity: 2.2, roughness: 1, side: T.DoubleSide
      });
      void dark;
      for (let i = 0; i < 6; i++) {
        const a = i / 6 * 6.283;
        const isWindow = i === 1 || i === 4;
        const panel = new T.Mesh(new T.PlaneGeometry(fbR * 0.96, fbH * 0.78), isWindow ? aperture : paper);
        panel.position.set(Math.cos(a) * fbR * 0.87, fbY, Math.sin(a) * fbR * 0.87);
        panel.rotation.y = -a + Math.PI / 2;
        g.add(panel);
        // corner mullion between panels
        const mull = new T.Mesh(new T.BoxGeometry(0.1, fbH, 0.1), stone);
        mull.position.set(Math.cos(a + 0.52) * fbR, fbY, Math.sin(a + 0.52) * fbR);
        mull.castShadow = !this._reduce;
        g.add(mull);
      }
      // window surrounds: crescent on one face, circle on the other (moon and sun)
      const ring = (a, r) => {
        const m = new T.Mesh(new T.TorusGeometry(r, 0.035, 6, 18), stone);
        m.position.set(Math.cos(a) * fbR * 0.9, fbY, Math.sin(a) * fbR * 0.9);
        m.rotation.y = -a + Math.PI / 2;
        g.add(m);
      };
      ring(1 / 6 * 6.283, 0.17);
      ring(4 / 6 * 6.283, 0.15);
      [fbY + fbH * 0.42, fbY - fbH * 0.42].forEach((y, i) => {
        const r = new T.Mesh(new T.CylinderGeometry(fbR * 1.06, fbR * (i ? 1.0 : 1.12), 0.12, 6), stone);
        r.position.y = y;
        r.castShadow = !this._reduce;
        g.add(r);
      });

      // kasa (roof): concave hexagonal sweep with warabite corner curls and hoju finial
      const kY = 4.5;
      for (let i = 0; i < 5; i++) {
        const t0 = i / 5, t1 = (i + 1) / 5;
        const rr = (t) => 0.92 * (1 - 0.72 * t);
        const yy = (t) => kY + 0.52 * Math.pow(t, 1.5);
        const m = new T.Mesh(new T.CylinderGeometry(rr(t1), rr(t0), yy(t1) - yy(t0), 6, 1), stone);
        m.position.y = (yy(t0) + yy(t1)) / 2;
        m.castShadow = !this._reduce;
        g.add(m);
      }
      for (let i = 0; i < 6; i++) {
        const a = i / 6 * 6.283 + 0.52;
        const curl = new T.Mesh(new T.SphereGeometry(0.11, 8, 7), stone);
        curl.scale.set(1.5, 0.8, 1);
        curl.position.set(Math.cos(a) * 0.93, kY + 0.09, Math.sin(a) * 0.93);
        curl.castShadow = !this._reduce;
        g.add(curl);
      }
      const eaveLip = new T.Mesh(new T.CylinderGeometry(0.9, 0.96, 0.12, 6), stone);
      eaveLip.position.y = kY + 0.05;
      g.add(eaveLip);
      seg(new T.SphereGeometry(0.15, 12, 10), kY + 0.66);
      seg(new T.CylinderGeometry(0.05, 0.11, 0.22, 10), kY + 0.86);

      // flame: point light inside the box + additive sprite core, the brightest thing in frame
      const fl = this._heroFlame = new T.PointLight(0xffb463, 2.6, 9, 2);
      fl.position.set(0, fbY, 0);
      g.add(fl);
      const core = this._heroCore = new T.Sprite(new T.SpriteMaterial({
        map: dotTex('rgba(255,214,150,0.95)', 'rgba(230,110,52,0.28)'), color: 0xffb877,
        transparent: true, blending: T.AdditiveBlending, depthWrite: false, depthTest: false
      }));
      core.renderOrder = 6;
      core.scale.set(0.78, 0.95, 1);
      core.position.set(0, fbY, 0.1);
      g.add(core);
      const halo = this._heroHalo = new T.Sprite(new T.SpriteMaterial({
        map: dotTex('rgba(255,170,92,0.42)', 'rgba(198,74,40,0.08)'), color: 0xff9f5c,
        transparent: true, blending: T.AdditiveBlending, depthWrite: false, depthTest: false
      }));
      halo.renderOrder = 5;
      halo.scale.set(2.4, 2.4, 1);
      halo.position.set(0, fbY, -0.2);
      g.add(halo);

      // moss cap on the roof and a stone footing pad, so it reads as weathered and placed
      const mossy = new T.MeshStandardMaterial({ color: 0x232e1c, roughness: 1 });
      for (let i = 0; i < 4; i++) {
        const a = Math.random() * 6.283;
        const p = this._boulder(0.26, mossy);
        p.position.set(Math.cos(a) * 0.5, kY + 0.14 + Math.random() * 0.12, Math.sin(a) * 0.5);
        p.scale.set(1, 0.3, 1);
        g.add(p);
      }

      // lens framing: low-left, tilted off-axis, tall enough to run out of the frame
      g.position.set(-4.7, -4.0, -8.4);
      g.rotation.set(0.04, 1.15, 0.03);
      g.scale.setScalar(1.05);
      rig.add(g);
      this._heroObj = g;
      rig.userData.keep = true;
      this._batch(g);
      scene.add(rig);
    }

    _garden(scene) {
      const T = THREE;
      // koi pond — animated ripple surface
      const pg = new T.PlaneGeometry(17, 11, 46, 34);
      this._pond = new T.Mesh(pg, new T.MeshStandardMaterial({
        color: 0x0c1a1c, roughness: 0.13, metalness: 0.85, transparent: true, opacity: 0.94
      }));
      this._pond.rotation.x = -Math.PI / 2;
      this._pond.position.set(-13.5, 0.06, 7.2);
      this._pondBase = pg.attributes.position.array.slice();
      this._pond.userData.keep = true;
      scene.add(this._pond);

      // stone lanterns
      this._lanterns = [];
      // Proper kasuga-doro rather than a stack of three primitives: every named part is
      // here — kiso base, ringed sao post, chudai platform, hibukuro firebox with framed
      // corner posts and paper windows, a six-slope kasa with warabi-de upturned corners,
      // and the hoju finial on its ukebana cup.
      [[7.6, 4.6], [-6.2, 5.4], [11.4, -2.2]].forEach((p, i) => {
        const g = new T.Group();
        const stone = new T.MeshStandardMaterial({ color: 0x3b3a38, roughness: 0.95 });
        const dark = new T.MeshStandardMaterial({ color: 0x2e2c29, roughness: 0.96 });
        const add = (m, y) => { m.position.y = y; m.castShadow = !this._reduce; m.receiveShadow = !this._reduce; g.add(m); return m; };

        add(new T.Mesh(new T.CylinderGeometry(0.46, 0.54, 0.18, 6), stone), 0.09).rotation.y = 0.26;
        add(new T.Mesh(new T.CylinderGeometry(0.32, 0.44, 0.34, 6), stone), 0.35).rotation.y = 0.26;
        // sao: a tapering post interrupted by two carved rings (fushi)
        add(new T.Mesh(new T.CylinderGeometry(0.15, 0.19, 0.78, 8), stone), 0.88);
        add(new T.Mesh(new T.TorusGeometry(0.175, 0.038, 6, 10), stone), 0.72).rotation.x = Math.PI / 2;
        add(new T.Mesh(new T.TorusGeometry(0.16, 0.034, 6, 10), stone), 1.14).rotation.x = Math.PI / 2;
        // chudai: flared platform the firebox sits on
        add(new T.Mesh(new T.CylinderGeometry(0.34, 0.17, 0.2, 6), stone), 1.37).rotation.y = 0.52;
        add(new T.Mesh(new T.CylinderGeometry(0.36, 0.34, 0.07, 6), stone), 1.5).rotation.y = 0.52;

        // hibukuro: the fire chamber — paper core with stone corner posts and a lintel,
        // so light escapes between the posts instead of off a solid glowing cube
        const paperMat = new T.MeshStandardMaterial({
          color: 0xf0dcb4, roughness: 0.92, emissive: 0xffb765, emissiveIntensity: 0.6,
          transparent: true, opacity: 0.94, side: T.DoubleSide
        });
        const box = add(new T.Mesh(new T.CylinderGeometry(0.27, 0.29, 0.58, 6), paperMat), 1.84);
        box.rotation.y = 0.52;
        box.castShadow = false;
        for (let k = 0; k < 6; k++) {
          const a = 0.52 + (k / 6) * Math.PI * 2;
          const post = new T.Mesh(new T.BoxGeometry(0.075, 0.6, 0.075), dark);
          post.position.set(Math.cos(a) * 0.29, 1.84, Math.sin(a) * 0.29);
          post.rotation.y = -a;
          post.castShadow = !this._reduce;
          g.add(post);
        }
        add(new T.Mesh(new T.CylinderGeometry(0.32, 0.3, 0.06, 6), dark), 2.15).rotation.y = 0.52;
        add(new T.Mesh(new T.CylinderGeometry(0.3, 0.32, 0.06, 6), dark), 1.55).rotation.y = 0.52;

        // kasa: a concave six-slope roof, built as stacked rings so the profile curves
        for (let s = 0; s < 4; s++) {
          const t0 = s / 4, t1 = (s + 1) / 4;
          const r0 = 0.62 - 0.5 * Math.pow(t0, 1.7), r1 = 0.62 - 0.5 * Math.pow(t1, 1.7);
          const seg = new T.Mesh(new T.CylinderGeometry(r1, r0, 0.1, 6, 1, true), stone);
          seg.position.y = 2.22 + s * 0.095;
          seg.rotation.y = 0.52;
          seg.castShadow = !this._reduce;
          g.add(seg);
        }
        // warabi-de: the corner tips that flick upward — the signature of the style
        for (let k = 0; k < 6; k++) {
          const a = 0.52 + (k / 6) * Math.PI * 2 + Math.PI / 6;
          const tip = new T.Mesh(new T.ConeGeometry(0.075, 0.2, 5), stone);
          tip.position.set(Math.cos(a) * 0.6, 2.26, Math.sin(a) * 0.6);
          tip.rotation.set(-0.5 * Math.cos(a + Math.PI / 2), -a, 0.5 * Math.sin(a + Math.PI / 2));
          tip.castShadow = !this._reduce;
          g.add(tip);
        }
        // ukebana + hoju finial
        add(new T.Mesh(new T.CylinderGeometry(0.13, 0.05, 0.1, 6), stone), 2.63);
        add(new T.Mesh(new T.SphereGeometry(0.1, 10, 8), stone), 2.75);
        add(new T.Mesh(new T.ConeGeometry(0.045, 0.1, 6), stone), 2.87);

        const l = new T.PointLight(0xffb765, 1.15, 7.5, 2);
        l.position.set(0, 1.84, 0);
        g.add(l);
        const glow = new T.Sprite(new T.SpriteMaterial({
          map: dotTex('rgba(255,206,140,0.9)', 'rgba(224,103,79,0.22)'),
          transparent: true, blending: T.AdditiveBlending, depthWrite: false
        }));
        glow.scale.set(3.4, 3.4, 1); glow.position.y = 1.84;
        g.add(glow);
        g.rotation.y = i * 1.3;
        g.position.set(p[0], 0, p[1]);
        scene.add(g);
        g.userData.keep = true;
        this._lanterns.push({ grp: g, light: l, glow: glow, box: box, ph: i * 2.1, heat: 0 });
      });

      // hanging paper lanterns under the eave
      this._hangs = [];
      [[-2.9, 2.2], [2.7, 2.2]].forEach((p, i) => {
        const g = new T.Group();
        const cord = new T.Mesh(new T.CylinderGeometry(0.015, 0.015, 0.7, 5),
          new T.MeshStandardMaterial({ color: 0x241a12 }));
        cord.position.y = 0.35; g.add(cord);
        const ball = new T.Mesh(new T.SphereGeometry(0.3, 18, 14),
          new T.MeshStandardMaterial({ color: 0xf0d9a8, emissive: 0xffbe74, emissiveIntensity: 1.5, roughness: 0.7 }));
        g.add(ball);
        const l = new T.PointLight(0xffbe74, 0.95, 6, 2);
        g.add(l);
        g.position.set(p[0], 3.55, p[1]);
        scene.add(g);
        g.userData.keep = true;
        this._hangs.push({ grp: g, ball: ball, light: l, ph: i * 1.7, heat: 0 });
      });

      // trees: twisted trunks grown along curving spines, overhanging branches
      // that reach across the path, seasonal canopy colour per tree
      this._trees = [];
      const barkMat = new T.MeshStandardMaterial({ map: this._wood, color: 0x453022, roughness: 0.97 });
      const SEASON = [
        { c1: 0xe7a7b6, c2: 0xf6dfe4, c3: 0xb96a76, tint: 'rgba(255,220,228,0.5)' }, // sakura
        { c1: 0xc9562c, c2: 0xe8a04a, c3: 0x8e3118, tint: 'rgba(255,206,150,0.5)' }, // momiji
        { c1: 0xd994a8, c2: 0xefd2cf, c3: 0x9c5560, tint: 'rgba(255,224,226,0.5)' }
      ];

      // a limb: tapered tube along a curve, splitting into thinner sub-limbs
      const limb = (grp, from, dir, len, rad, depth, lean) => {
        const p0 = new T.Vector3().fromArray(from);
        const d = new T.Vector3().fromArray(dir).normalize();
        const side = new T.Vector3(-d.z, 0, d.x).normalize();
        const pts = [p0.clone()];
        let cur = p0.clone(), cd = d.clone();
        const segs = 4;
        for (let i = 0; i < segs; i++) {
          // twist: bend toward the lean vector and swing sideways each segment
          cd.addScaledVector(side, (Math.random() - 0.5) * 0.5 * lean);
          cd.y -= 0.16 * lean;                       // limbs droop as they extend
          cd.normalize();
          cur = cur.clone().addScaledVector(cd, len / segs);
          pts.push(cur.clone());
        }
        const curve = new T.CatmullRomCurve3(pts);
        const m = new T.Mesh(new T.TubeGeometry(curve, 10, rad, depth > 1 ? 7 : 5, false), barkMat);
        m.castShadow = !this._reduce;
        grp.add(m);
        if (depth <= 0) return pts[pts.length - 1].toArray();
        const n = depth > 1 ? 3 : 2;
        for (let i = 0; i < n; i++) {
          const t = 0.55 + Math.random() * 0.42;
          const at = curve.getPoint(t);
          const out = cd.clone()
            .addScaledVector(side, (Math.random() - 0.5) * 1.9)
            .add(new T.Vector3(0, 0.28 + Math.random() * 0.3, (Math.random() - 0.5) * 1.2));
          limb(grp, at.toArray(), out.toArray(), len * (0.6 + Math.random() * 0.18), rad * 0.58, depth - 1, lean * 1.25);
        }
        return pts[pts.length - 1].toArray();
      };

      // [x, z, scale, seasonIndex, reach — sideways lean of the canopy, toward the path]
      [[-10.4, 3.4, 1.15, 0, 1.0], [13.2, 2.6, 0.9, 1, -1.1], [-15.6, -3.2, 1.0, 2, 0.6]].forEach((t) => {
        const g = new T.Group(), sc = t[2], sea = SEASON[t[3]], reach = t[4];

        // trunk: a leaning, kinked spine so the silhouette never reads as a pipe
        const th = 4.4 * sc, tp = [];
        for (let i = 0; i <= 5; i++) {
          const u = i / 5;
          tp.push(new T.Vector3(
            Math.sin(u * 2.6 + t[0]) * 0.38 * sc + u * u * 0.9 * sc * reach,
            u * th,
            Math.cos(u * 2.1 + t[1]) * 0.3 * sc
          ));
        }
        const spine = new T.CatmullRomCurve3(tp);
        const trunk = new T.Mesh(new T.TubeGeometry(spine, 22, 0.3 * sc, 9, false), barkMat);
        // taper the trunk by scaling ring radii down with height
        const tpos = trunk.geometry.attributes.position;
        for (let i = 0; i < tpos.count; i++) {
          const y = tpos.getY(i), k = 1 - 0.55 * Math.min(1, y / th);
          const c = spine.getPoint(Math.min(1, Math.max(0, y / th)));
          tpos.setX(i, c.x + (tpos.getX(i) - c.x) * k);
          tpos.setZ(i, c.z + (tpos.getZ(i) - c.z) * k);
        }
        trunk.geometry.computeVertexNormals();
        trunk.castShadow = !this._reduce;
        g.add(trunk);

        // root flare where the trunk meets the moss
        for (let i = 0; i < 5; i++) {
          const a = i * 1.26 + t[0];
          const r = new T.Mesh(new T.CylinderGeometry(0.045 * sc, 0.19 * sc, 0.8 * sc, 5), barkMat);
          r.position.set(Math.cos(a) * 0.3 * sc, 0.16 * sc, Math.sin(a) * 0.3 * sc);
          r.rotation.set(Math.sin(a) * 1.15, 0, -Math.cos(a) * 1.15);
          g.add(r);
        }

        // main limbs off the crown, weighted to overhang one side
        const crown = spine.getPoint(0.86);
        const tips = [];
        for (let b = 0; b < 4; b++) {
          const a = b * 1.62 + t[1];
          tips.push(limb(g, crown.toArray(),
            [Math.cos(a) + reach * 0.85, 0.72 + Math.random() * 0.4, Math.sin(a)],
            1.9 * sc, 0.115 * sc, 2, 1));
        }

        // canopy: blossom clusters hung on the limb tips, not one floating ball
        const N = 900, pos = new Float32Array(N * 3), col = new Float32Array(N * 3);
        const c1 = new T.Color(sea.c1), c2 = new T.Color(sea.c2), c3 = new T.Color(sea.c3);
        for (let i = 0; i < N; i++) {
          const a = tips[i % tips.length];
          const r = 1.35 * sc * Math.cbrt(Math.random());
          const th2 = Math.random() * Math.PI * 2, ph = Math.acos(2 * Math.random() - 1);
          pos[i * 3] = a[0] + Math.sin(ph) * Math.cos(th2) * r * 1.35;
          pos[i * 3 + 1] = a[1] + Math.cos(ph) * r * 0.78 - 0.15;
          pos[i * 3 + 2] = a[2] + Math.sin(ph) * Math.sin(th2) * r * 1.35;
          const c = Math.random() < 0.3 ? c2 : (Math.random() < 0.5 ? c3 : c1);
          col[i * 3] = c.r; col[i * 3 + 1] = c.g; col[i * 3 + 2] = c.b;
        }
        const bg = new T.BufferGeometry();
        bg.setAttribute('position', new T.BufferAttribute(pos, 3));
        bg.setAttribute('color', new T.BufferAttribute(col, 3));
        const blossom = new T.Points(bg, new T.PointsMaterial({
          size: 0.34 * sc, map: dotTex('rgba(255,255,255,0.95)', sea.tint),
          vertexColors: true, transparent: true, depthWrite: false, opacity: 0.92, sizeAttenuation: true
        }));
        g.add(blossom);
        g.position.set(t[0], 0, t[1]);
        scene.add(g);
        g.userData.keep = true;
        this._trees.push({ grp: g, blossom: blossom });
      });

      // tobi-ishi — winding stepping-stone path: irregular dressed slabs bedded in
      // moss, curving out of the foreground right up to the entrance stone
      const mossMat = new T.MeshStandardMaterial({ color: 0x141c11, roughness: 1 });
      const slabMat = new T.MeshStandardMaterial({ color: 0x322f2a, roughness: 0.99 });
      const path = new T.CatmullRomCurve3([
        new T.Vector3(-4.2, 0, 15.6),
        new T.Vector3(-1.1, 0, 12.4),
        new T.Vector3(1.9, 0, 10.2),
        new T.Vector3(1.0, 0, 8.0),
        new T.Vector3(0.2, 0, 6.4),
        new T.Vector3(0.2, 0, 5.5)
      ]);
      // low moss cushion: higher-detail dome, dark and desaturated so it beds the
      // stones rather than competing with the house
      const taken = [];
      const mossPatch = (x, z, r) => {
        for (let i = 0; i < taken.length; i++) {
          const t = taken[i];
          if (Math.hypot(t[0] - x, t[1] - z) < (t[2] + r) * 0.82) return null;
        }
        taken.push([x, z, r]);
        const p = this._boulder(r, mossMat);
        p.position.set(x, 0.01, z);
        p.scale.set(1.05, 0.075, 1.05);
        p.castShadow = false;
        p.receiveShadow = !this._reduce;
        scene.add(p);
        return p;
      };
      const STEPS = 13;
      for (let i = 0; i < STEPS; i++) {
        const u = i / (STEPS - 1);
        const c = path.getPoint(u), tan = path.getTangent(u);
        const off = Math.sin(i * 1.24) * 0.5;
        const x = c.x - tan.z * off, z = c.z + tan.x * off;
        const rad = 0.56 - u * 0.13;
        // dressed slab: irregular plan, flat top, tall enough to throw its own edge shadow
        const slab = this._boulder(rad, slabMat);
        slab.scale.set(1 + Math.random() * 0.4, 0.62, 0.8 + Math.random() * 0.35);
        slab.position.set(x, 0.2, z);
        slab.rotation.y = Math.atan2(tan.x, tan.z) + (Math.random() - 0.5) * 0.9;
        slab.castShadow = slab.receiveShadow = !this._reduce;
        scene.add(slab);
        const top = new T.Mesh(new T.CircleGeometry(rad * 0.86, 9), slabMat);
        top.rotation.x = -Math.PI / 2;
        top.rotation.z = Math.random() * 3;
        top.position.set(x, 0.235, z);
        top.receiveShadow = !this._reduce;
        scene.add(top);
        // tight collar, kept clear of the slab face so the sequence stays readable
        mossPatch(x - tan.z * (rad + 0.4), z + tan.x * (rad + 0.4), rad * 0.5);
      }
      // sparse moss along the verges, thinning toward the house
      for (let i = 0; i < 11; i++) {
        const u = Math.random();
        const c = path.getPoint(u), tan = path.getTangent(u);
        const side = (Math.random() < 0.5 ? -1 : 1) * (1.5 + Math.random() * 1.6);
        mossPatch(c.x - tan.z * side, c.z + tan.x * side, 0.32 + Math.random() * 0.4);
      }

      // bamboo fence, stage right
      const fence = new T.Group();
      for (let i = 0; i < 26; i++) {
        const b = new T.Mesh(new T.CylinderGeometry(0.075, 0.08, 2.4, 6),
          new T.MeshStandardMaterial({ color: 0x4d4426, roughness: 0.85 }));
        b.position.set(i * 0.2, 1.2, 0);
        fence.add(b);
      }
      fence.position.set(8.2, 0, 8.4);
      fence.rotation.y = -0.42;
      scene.add(fence);
    }

    _particles(scene) {
      const T = THREE;
      const N = this._reduce ? 90 : 320;
      const pos = new Float32Array(N * 3);
      this._pet = [];
      for (let i = 0; i < N; i++) {
        const o = { x: (Math.random() - 0.5) * 52, y: Math.random() * 22, z: (Math.random() - 0.5) * 40 - 4, s: 0.5 + Math.random() * 0.9, ph: Math.random() * 6.28 };
        this._pet.push(o);
        pos[i * 3] = o.x; pos[i * 3 + 1] = o.y; pos[i * 3 + 2] = o.z;
      }
      const g = new T.BufferGeometry();
      g.setAttribute('position', new T.BufferAttribute(pos, 3));
      this._petals = new T.Points(g, new T.PointsMaterial({
        size: 0.17, map: dotTex('rgba(255,236,240,0.95)', 'rgba(231,167,182,0.45)'),
        color: 0xf2d8dd, transparent: true, depthWrite: false, opacity: 0.8
      }));
      scene.add(this._petals);

      // embers rising off the forecourt — ties to the page's vermilion accent
      const M = this._reduce ? 30 : 110;
      const ep = new Float32Array(M * 3);
      this._emb = [];
      for (let i = 0; i < M; i++) {
        const o = { x: (Math.random() - 0.5) * 26, y: Math.random() * 12, z: (Math.random() - 0.5) * 22 + 2, s: 0.3 + Math.random() * 0.7, ph: Math.random() * 6.28 };
        this._emb.push(o);
        ep[i * 3] = o.x; ep[i * 3 + 1] = o.y; ep[i * 3 + 2] = o.z;
      }
      const eg = new T.BufferGeometry();
      eg.setAttribute('position', new T.BufferAttribute(ep, 3));
      this._embers = new T.Points(eg, new T.PointsMaterial({
        size: 0.13, map: dotTex('rgba(255,214,150,0.95)', 'rgba(224,103,79,0.5)'),
        color: 0xffb06a, transparent: true, depthWrite: false, opacity: 0.85, blending: T.AdditiveBlending
      }));
      scene.add(this._embers);
    }

    // tone changes cross-fade over ~2.4s instead of snapping
    _applyTone() {
      const to = TONES[this._toneKey] || TONES.dusk;
      if (!this._toneCur || this._reduce) { this._toneCur = Object.assign({}, to); this._toneTo = null; this._setTone(this._toneCur); return; }
      this._toneFrom = Object.assign({}, this._toneCur); this._toneTo = to; this._toneT0 = performance.now();
    }
    _blendTone(a, b, u) {
      const T = THREE, o = {}, NUM = { moonI: 1, ambI: 1, fogD: 1, stars: 1, ff: 1 };
      for (const k in b) o[k] = NUM[k] ? a[k] + (b[k] - a[k]) * u : new T.Color(a[k]).lerp(new T.Color(b[k]), u).getHex();
      return o;
    }
    _setTone(t) {
      const T = THREE;
      this._ffK = t.ff;
      this._amb.color = new T.Color(t.amb);
      this._amb.intensity = t.ambI;
      this._moonLight.color = new T.Color(t.moon);
      this._moonLight.intensity = t.moonI;
      this._rimLight.color = new T.Color(t.rim);
      this._moon.material.color = new T.Color(t.moon);
      this._halo.material.color = new T.Color(t.moon);
      this._scene.fog.color = new T.Color(t.fog);
      this._scene.fog.density = t.fogD;
      this._scene.background = new T.Color(t.sky);
      this._paintSky(t);
      this._inner.forEach((l) => { l.color = new T.Color(t.warm); });
      this._shojiMat.emissive = new T.Color(t.warm);
    }

    _loop() {
      this._raf = requestAnimationFrame(() => this._loop());
      if (document.hidden || this.paused) return;
      if (this._toneTo) {
        const u = Math.min(1, (performance.now() - this._toneT0) / 2400), sm = u * u * (3 - 2 * u);
        this._toneCur = this._blendTone(this._toneFrom, this._toneTo, sm);
        if (u >= 1 || (this._fr || 0) % 3 === 0) this._setTone(this._toneCur);
        if (u >= 1) this._toneTo = null;
      }
      const dt = Math.min(this._clock.getDelta(), 0.05), e = this._clock.elapsedTime;
      this._fr = (this._fr || 0) + 1;
      if (!this._reduce) this._rnd.shadowMap.needsUpdate = this._fr % 3 === 0;

      // eased chapter dolly + cursor parallax
      // the host already eases the travel, so keep this follow tight — just enough
      // lag to read as depth, not enough to trail behind the copy
      // under-damped spring (ζ≈0.72): arrives with a few percent of overshoot, so the
      // dolly has mass. Its velocity drives FOV breathing, roll and wind below.
      const SK = 58, SC = 2 * Math.sqrt(SK) * 0.72;
      const pv0 = isFinite(this._pv) ? this._pv : 0;
      this._pv = pv0 + ((this._pos - this._posEase) * SK - pv0 * SC) * dt;
      if (!isFinite(this._posEase)) this._posEase = this._pos;
      this._posEase += this._pv * dt;
      const vel = this._reduce ? 0 : Math.max(-3.5, Math.min(3.5, this._pv));
      this._mx += (this._tmx - this._mx) * Math.min(1, dt * 2.4);
      this._my += (this._tmy - this._my) * Math.min(1, dt * 2.4);
      const p = Math.max(0, Math.min(SHOTS.length - 1, this._posEase));
      const drift = (this._reduce || this._noDrift) ? 0 : 1;
      const P = along(p, 'p', this._cp || (this._cp = [0, 0, 0])), Q = along(p, 't', this._ct || (this._ct = [0, 0, 0]));
      // footfall: a faint bob + sway that only exists while walking
      const sp = Math.min(1, Math.abs(vel));
      this._step = (this._step || 0) + Math.abs(vel) * dt * 6.5;
      const bob = this._reduce ? 0 : Math.abs(Math.sin(this._step)) * 0.09 * sp, sway = this._reduce ? 0 : Math.sin(this._step) * 0.05 * sp;
      const cx = P[0] - this._mx * 2.1 + Math.sin(e * 0.13) * 0.5 * drift + sway;
      const cy = P[1] - this._my * 1.15 + Math.sin(e * 0.19 + 1.4) * 0.22 * drift + bob;
      const cz = P[2] + Math.cos(e * 0.11) * 0.42 * drift;
      const ft = this._focusT || 0;
      this._fzL = Math.max(0, Math.min(1, (this._fzL || 0) + Math.sign(ft - (this._fzL || 0)) * dt / (this._reduce ? 0.01 : 1.25)));
      if (Math.abs(ft - this._fzL) < 0.002) { this._fzL = ft; if (this._fzDone) { const f = this._fzDone; this._fzDone = null; f(); } }
      const fl = this._fzL, fk = fl < 0.5 ? 4 * fl * fl * fl : 1 - Math.pow(-2 * fl + 2, 3) / 2;
      this._fk = fk;
      if (this._lid) this._lid.rotation.x = -1.28 + fk * 1.0;
      let lx = Q[0] + this._mx * 0.55, ly = Q[1] - this._my * 0.3 + bob * 0.4, lz = Q[2];
      let px = cx, py = Math.max(0.9, cy), pz = cz;
      if (fk > 0.0005 && this._scr) {
        const T = THREE, sp = this._fsp || (this._fsp = new T.Vector3()), sn = this._fsn || (this._fsn = new T.Vector3());
        this._desk.updateMatrixWorld(true);
        this._scr.getWorldPosition(sp); this._scr.getWorldDirection(sn);
        const fov = this._fov0 || 38, H = 0.35 / 0.72, dist = (H / 2) / Math.tan(fov * Math.PI / 360);
        const k = fk;
        px += (sp.x + sn.x * dist - px) * k; py += (sp.y + sn.y * dist - py) * k; pz += (sp.z + sn.z * dist - pz) * k;
        lx += (sp.x - lx) * k; ly += (sp.y - ly) * k; lz += (sp.z - lz) * k;
      }
      this._cam.position.set(px, py, pz);
      this._cam.lookAt(lx, ly, lz);
      // which room the visitor is standing in (0..1 per station) — drives the room light
      this._room = [0, 1, 2, 3, 4].map((k) => Math.max(0, 1 - Math.abs(p - k) * 1.6));
      if (!this._reduce) {
        this._cam.rotateZ(Math.max(-0.014, Math.min(0.014, -vel * 0.0055)) * (1 - this._fk));
        // signature push: the camera leans in toward the shoji while the doors close
        const pq = this._pushAt ? (performance.now() - this._pushAt) / 1500 : 1;
        const pe = pq < 1 ? Math.pow(Math.sin(pq * Math.PI), 1.6) : 0;
        if (pe > 0.001) this._cam.translateZ(-pe * 2.8 * (1 - this._fk));
        const fv = (this._fov0 || 38) + (Math.abs(vel) * 1.35 - pe * 8) * (1 - this._fk);
        if (Math.abs(fv - this._cam.fov) > 0.01) { this._cam.fov = fv; this._cam.updateProjectionMatrix(); }
      }

      if (this._pulse > 0.001) this._pulse *= Math.pow(0.12, dt);
      // cursor as weather: pointer speed is a gust, the pointer ray is a hand in the air
      const wd = Math.pow(0.06, dt);
      this._wx = Math.max(-2.5, Math.min(2.5, (this._wx || 0) * wd)); this._wy = Math.max(-2.5, Math.min(2.5, (this._wy || 0) * wd));
      const gust = this._reduce ? 0 : Math.min(1, Math.hypot(this._wx, this._wy) * 1.6);
      let ray = null;
      if (!this._reduce && this._pndc && performance.now() - this._pAt < 4000 && !(this._fzL > 0.01)) {
        const T = THREE;
        if (!this._pr0) { this._pr0 = new T.Vector3(); this._pr1 = new T.Vector3(); this._prq = new T.Vector3(); }
        this._pr0.setFromMatrixPosition(this._cam.matrixWorld);
        this._pr1.set(this._pndc.x, this._pndc.y, 0.5).unproject(this._cam).sub(this._pr0).normalize();
        ray = { o: this._pr0, d: this._pr1 };
      }
      const near = (x, y, z, R) => {
        if (!ray) return null;
        const vx = x - ray.o.x, vy = y - ray.o.y, vz = z - ray.o.z, t = vx * ray.d.x + vy * ray.d.y + vz * ray.d.z;
        if (t <= 0) return null;
        const qx = vx - ray.d.x * t, qy = vy - ray.d.y * t, qz = vz - ray.d.z * t, dd = Math.sqrt(qx * qx + qy * qy + qz * qz);
        return dd < R ? { dx: qx, dy: qy, dz: qz, d: dd, k: 1 - dd / R } : null;
      };
      this._hoverPick();
      const hk = Math.min(1, dt * 5);
      this._lanterns.forEach((L, i) => { L.heat += ((this._hot === 'l' + i ? 1 : 0) - L.heat) * hk; });
      this._hangs.forEach((H, i) => { H.heat += ((this._hot === 'h' + i ? 1 : 0) - H.heat) * hk; });
      this._heroHeat = (this._heroHeat || 0) + ((this._hot === 'hero' ? 1 : 0) - (this._heroHeat || 0)) * hk;
      this._shelfHeat = (this._shelfHeat || 0) + ((this._hot === 'shelf' ? 1 : 0) - (this._shelfHeat || 0)) * hk;
      this._letterHeat = (this._letterHeat || 0) + ((this._hot === 'letter' ? 1 : 0) - (this._letterHeat || 0)) * hk;
      if (this._shelfLight) this._shelfLight.intensity = this._shelfHeat * 2.4;
      if (this._letterLight) this._letterLight.intensity = this._letterHeat * 1.8;
      if (this._letter) this._letter.position.y = this._letterY0 + this._letterHeat * 0.025;
      const pulse = this._pulse;

      // foreground lantern rides the lens: fixed in frame through every dolly, with a
      // touch of counter-parallax so it still feels like a near object, not a decal
      if (this._heroRig) this._heroRig.visible = this._fk < 0.35;
      if (this._heroRig) {
        this._heroRig.position.copy(this._cam.position);
        this._heroRig.quaternion.copy(this._cam.quaternion);
        const o = this._heroObj;
        const dist = 8.4;
        const halfH = Math.tan(this._cam.fov * Math.PI / 360) * dist;
        const halfW = halfH * this._cam.aspect;
        // flame sits ~0.74 of the way to the left edge; box centre just below mid-frame
        o.position.x = -0.79 * halfW + this._mx * 0.34;
        o.position.y = -0.685 * halfH - 3.92 + this._my * 0.2 + Math.sin(e * 0.21) * 0.02 * drift;
        o.rotation.y = 1.15 + this._mx * 0.06;
        const fk = 1 + Math.sin(e * 2.7) * 0.1 + Math.sin(e * 11.4) * 0.06 + Math.sin(e * 5.1) * 0.04;
        this._heroFlame.intensity = 2.6 * fk + pulse * 3.4 + this._heroHeat * 2.4;
        this._heroPaper.emissiveIntensity = 1.5 * fk + pulse * 1.1 + this._heroHeat * 0.9;
        this._heroAper.emissiveIntensity = 2.2 * fk + pulse * 1.6;
        const cs = 0.78 * (0.93 + (fk - 1) * 0.6) + pulse * 0.3;
        this._heroCore.scale.set(cs, cs * 1.18, 1);
        const hs = 2.4 * (0.95 + (fk - 1) * 0.4) + pulse * 0.9 + this._heroHeat * 0.7;
        this._heroHalo.scale.set(hs, hs, 1);
      }

      // lantern flicker, breathing shoji, swaying hangs
      this._lanterns.forEach((L, i) => {
        const fl = 1 + Math.sin(e * (2.1 + i * 0.5) + L.ph) * 0.12 + Math.sin(e * 9.3 + L.ph) * 0.05 - gust * (0.16 + Math.sin(e * 23 + i * 2.1) * 0.12);
        L.light.intensity = (1.15 * fl) + pulse * 2.2 + L.heat * 3.2;
        L.box.material.emissiveIntensity = 0.95 * fl + pulse * 1.4 + L.heat * 2.2;
        const s = 3.4 * (0.94 + (fl - 1) * 0.5) + pulse * 1.6 + L.heat * 2.0;
        L.glow.scale.set(s, s, 1);
      });
      this._hangs.forEach((H, i) => {
        H.az = H.az || 0; H.vz = H.vz || 0; H.ax = H.ax || 0; H.vx = H.vx || 0;
        H.vz += (-H.az * 9 - H.vz * 1.6 - (this._wx || 0) * 3.2) * dt; H.az += H.vz * dt;
        H.vx += (-H.ax * 9 - H.vx * 1.6 + (this._wy || 0) * 2.0) * dt; H.ax += H.vx * dt;
        H.az = Math.max(-0.4, Math.min(0.4, H.az)); H.ax = Math.max(-0.3, Math.min(0.3, H.ax));
        H.grp.rotation.z = Math.sin(e * 0.7 + H.ph) * 0.07 * drift + H.az;
        H.grp.rotation.x = Math.cos(e * 0.53 + H.ph) * 0.05 * drift + H.ax;
        H.ball.material.emissiveIntensity = 1.5 + Math.sin(e * 2.7 + H.ph) * 0.2 + pulse * 1.2 + H.heat * 2.0;
        H.light.intensity = 0.95 + pulse * 1.6 + H.heat * 2.4;
      });
      this._shojiMat.emissiveIntensity = 0.42 + Math.sin(e * 0.9) * 0.04 + pulse * 0.35;
      // the awake room: monitor flicker on the same clock as the lanterns so the two
      // light sources read as one evening rather than two effects
      if (this._scr) {
        const key = Math.sin(e * 11.7) * 0.5 + Math.sin(e * 5.3) * 0.5;      // typing cadence
        const f = 0.86 + Math.sin(e * 1.9) * 0.07 + key * 0.045;
        const dh = this._deskHeat = (this._deskHeat || 0) + ((this._hot === 'desk' ? 1 : 0) - (this._deskHeat || 0)) * hk;
        const sg = 1 + dh * 0.5 + this._fk * 0.4 + (this._reduce ? 0 : (0.5 + 0.5 * Math.sin(e * 2.1)) * 0.22 * (1 - this._fk));
        this._scr.material.color.setRGB((0.70 * f + 0.11) * sg, (0.84 * f + 0.06) * sg, f * sg);
        this._scrLight.intensity = (1.15 * f + pulse * 1.1) * (1 + dh * 1.2);
        this._litMat.emissiveIntensity = 0.95 + Math.sin(e * 1.4) * 0.06 + key * 0.05 + pulse * 0.5;
        this._silLk = (this._silLk || 0) + ((this._reduce ? 0 : this._mx) - (this._silLk || 0)) * Math.min(1, dt * 1.2);
        this._sil.position.x = this._silX0 + Math.sin(e * 0.31) * 0.05 + this._silLk * 0.09;
        this._sil.scale.y = 1 + Math.sin(e * 0.47) * 0.012;
      }
      // room light: the station you're in warms up — study bay, garden lanterns, moonlit roof, hand lantern
      if (this._room) {
        const R = this._room;
        this._litMat.emissiveIntensity += R[1] * 0.55;
        this._lanterns.forEach((L) => { L.light.intensity += R[2] * 1.3; L.box.material.emissiveIntensity += R[2] * 0.7; });
        const tn = this._toneCur || TONES[this._toneKey] || TONES.dusk;
        this._moonLight.intensity = tn.moonI * (1 + R[3] * 0.55);
        if (this._heroFlame) this._heroFlame.intensity += R[4] * 1.6;
      }
      this._inner.forEach((l, i) => { l.intensity = 0.85 + Math.sin(e * 1.3 + i) * 0.1 + pulse * 0.8; });
      this._trees.forEach((t, i) => {
        t.grp.rotation.z = Math.sin(e * 0.42 + i) * 0.014 * drift;
        t.blossom.rotation.y = e * 0.02 * (i % 2 ? -1 : 1) * drift;
      });

      // pond ripple
      if (!this._reduce) {
        const arr = this._pond.geometry.attributes.position.array, base = this._pondBase;
        for (let k = 0; k < arr.length; k += 3) {
          const x = base[k], y = base[k + 1];
          arr[k + 2] = Math.sin(x * 0.7 + e * 1.1) * 0.055 + Math.cos(y * 0.9 - e * 0.8) * 0.045;
        }
        this._pond.geometry.attributes.position.needsUpdate = true;
        // normals only matter for the specular roll on the ripple; recomputing the whole
        // buffer every frame is invisible next to every third
        if (this._fr % 3 === 0) this._pond.geometry.computeVertexNormals();
      }

      // petals + embers
      const pa = this._petals.geometry.attributes.position.array;
      for (let k = 0; k < this._pet.length; k++) {
        const o = this._pet[k];
        o.y -= dt * (0.5 + o.s * 0.7);
        o.x -= vel * dt * 3.2 * o.s;
        if (o.x > 26) o.x -= 52; else if (o.x < -26) o.x += 52;
        if (o.y < -0.4) { o.y = 20 + Math.random() * 4; o.x = (Math.random() - 0.5) * 52; }
        o.x += (this._wx || 0) * dt * 2.4 * (0.5 + o.s); o.y -= (this._wy || 0) * dt * 1.2 * (0.5 + o.s);
        let px = o.x + Math.sin(e * 0.8 + o.ph) * 1.1, py = o.y, pz = o.z + Math.cos(e * 0.6 + o.ph) * 0.7;
        o.ox = (o.ox || 0) * Math.pow(0.3, dt); o.oy = (o.oy || 0) * Math.pow(0.3, dt); o.oz = (o.oz || 0) * Math.pow(0.3, dt);
        const nb = near(px, py, pz, 1.8);
        if (nb && nb.d > 0.001) { const f = nb.k * nb.k * dt * 9 / nb.d; o.ox += nb.dx * f; o.oy += nb.dy * f; o.oz += nb.dz * f; }
        pa[k * 3] = px + o.ox; pa[k * 3 + 1] = py + o.oy; pa[k * 3 + 2] = pz + o.oz;
      }
      this._petals.geometry.attributes.position.needsUpdate = true;
      const ea = this._embers.geometry.attributes.position.array;
      for (let k = 0; k < this._emb.length; k++) {
        const o = this._emb[k];
        o.y += dt * (0.7 + o.s * 1.1) * (1 + pulse * 2);
        o.x -= vel * dt * 2.0 * o.s;
        if (o.x > 13) o.x -= 26; else if (o.x < -13) o.x += 26;
        if (o.y > 13) { o.y = -0.2; o.x = (Math.random() - 0.5) * 26; }
        o.x += (this._wx || 0) * dt * 1.8 * o.s;
        o.ox = (o.ox || 0) * Math.pow(0.35, dt); o.oz = (o.oz || 0) * Math.pow(0.35, dt);
        const ex = o.x + Math.sin(e * 1.3 + o.ph) * 0.6, nb = near(ex, o.y, o.z, 1.5);
        if (nb && nb.d > 0.001) { const f = nb.k * dt * 6 / nb.d; o.ox += (nb.dx - nb.dz * 0.8) * f; o.oz += (nb.dz + nb.dx * 0.8) * f; }
        ea[k * 3] = ex + o.ox; ea[k * 3 + 1] = o.y; ea[k * 3 + 2] = o.z + o.oz;
      }
      this._embers.geometry.attributes.position.needsUpdate = true;
      this._embers.material.opacity = 0.85 * (0.7 + pulse * 0.5);
      if (this._ff) {
        const fp = this._ff.geometry.attributes.position.array, fc = this._ff.geometry.attributes.color.array;
        const night = this._ffK != null ? this._ffK : 0.45;
        for (let k = 0; k < this._ffl.length; k++) {
          const o = this._ffl[k], t = e * o.sp + o.ph;
          const bx = o.x + Math.sin(t * 0.9) * 1.6 + Math.sin(t * 2.3) * 0.3 - vel * 0.4, by = o.y + Math.sin(t * 1.3 + 1.1) * 0.5, bz = o.z + Math.cos(t * 0.7) * 1.2;
          const nb = night > 0.2 ? near(bx, by, bz, 3.2) : null, tg = nb ? nb.k * 0.55 : 0;
          o.pull = (o.pull || 0) + (tg - (o.pull || 0)) * Math.min(1, dt * 1.4);
          if (nb) { o.qx = -nb.dx; o.qy = -nb.dy; o.qz = -nb.dz; }
          const pl = o.pull || 0;
          fp[k * 3] = bx + (o.qx || 0) * pl + Math.sin(t * 3.1) * 0.25 * pl; fp[k * 3 + 1] = by + (o.qy || 0) * pl; fp[k * 3 + 2] = bz + (o.qz || 0) * pl;
          const bl = Math.pow(Math.max(0, Math.sin(e * o.bl + o.ph * 3)), 6);
          const I = (0.12 + bl * 2.6 + pulse * 1.2 + pl * 1.6) * night;
          fc[k * 3] = 1.0 * I; fc[k * 3 + 1] = 0.86 * I; fc[k * 3 + 2] = 0.42 * I;
        }
        this._ff.geometry.attributes.position.needsUpdate = true;
        this._ff.geometry.attributes.color.needsUpdate = true;
      }
      if (this._beamMat) {
        const lk = this._litMat.emissiveIntensity;
        this._beamMat.opacity = 0.085 * lk + pulse * 0.06;
        this._poolMat.opacity = 0.17 * lk + pulse * 0.08;
      }

      // sky life
      this._stars.material.opacity += ((this._starTarget || 0) * (0.86 + Math.sin(e * 0.7) * 0.14) - this._stars.material.opacity) * Math.min(1, dt * 2);
      // the whole field wheels slowly about the pole — too slow to watch, fast enough
      // that the sky is never the same twice
      this._stars.rotation.z = e * 0.0042;
      this._stars.rotation.y = Math.sin(e * 0.03) * 0.02;
      this._starSize = this._starSize || this._stars.material.size;
      this._stars.material.size = this._starSize * (1 + Math.sin(e * 2.1) * 0.05);

      if (this._met) {
        const m = this._met;
        if (m.visible) {
          m.userData.t += dt;
          const p = m.userData.t / m.userData.dur;
          if (p >= 1) { m.visible = false; m.material.opacity = 0; this._metT = 3 + Math.random() * 6; }
          else {
            m.position.addScaledVector(m.userData.v, dt);
            // in fast, out slow: the flare is at the head of the fall
            m.material.opacity = (this._starTarget || 0) * Math.min(1, p * 7) * Math.pow(1 - p, 0.85);
          }
        } else if ((this._starTarget || 0) > 0.4) {
          this._metT -= dt;
          if (this._metT <= 0) {
            const dirX = Math.random() < 0.5 ? -1 : 1;
            m.position.set(-dirX * (40 + Math.random() * 70), 58 + Math.random() * 26, -150 - Math.random() * 40);
            m.userData.v = new THREE.Vector3(dirX * 86, -34 - Math.random() * 16, 0);
            m.material.rotation = Math.atan2(m.userData.v.y, m.userData.v.x * dirX) * dirX;
            m.scale.set(dirX * (30 + Math.random() * 16), 1.5, 1);
            m.userData.t = 0;
            m.userData.dur = 0.85 + Math.random() * 0.5;
            m.visible = true;
          }
        }
      }
      this._clouds.forEach((c) => {
        c.m.position.x += c.sp * dt;
        if (c.m.position.x > 150) c.m.position.x = -150;
      });
      const fx = ((e * 3.4) % 540) - 150;
      this._flock.position.x = fx;
      this._flock.position.y = 24 + Math.sin(e * 0.21) * 4;
      this._flock.visible = fx < 160;
      this._birds.forEach((b) => {
        b.s.scale.y = b.sz * (0.28 + Math.abs(Math.sin(e * 5.2 + b.ph)) * 0.34);
      });

      this._rnd.info.reset();
      if (this._pp) this._ppRender(); else this._rnd.render(this._scene, this._cam);

      // live render stats, published for the page's spec plate
      this._fc = (this._fc || 0) + 1;
      this._ft = (this._ft || 0) + dt;
      if (this._ft >= 0.5) {
        const info = this._rnd.info;
        if (!this._meshCount) {
          let n = 0, tri = 0;
          this._scene.traverse((o) => {
            if (!o.isMesh) return;
            n++;
            const g = o.geometry;
            tri += (g.index ? g.index.count : g.attributes.position.count) / 3;
          });
          this._meshCount = n;
          this._triCount = Math.round(tri);
        }
        this.stats = {
          fps: Math.round(this._fc / this._ft),
          meshes: this._meshCount,
          tris: this._triCount,
          calls: info.render.calls,
          lights: this._lightCount || 0
        };
        this._govern(this.stats.fps);
        this.stats.pr = this._pr;
        this._fc = 0; this._ft = 0;
        this.dispatchEvent(new CustomEvent('house-stats', { detail: this.stats, bubbles: true, composed: true }));
      }
    }
  }

  customElements.define('house-scene', HouseScene);
})();
