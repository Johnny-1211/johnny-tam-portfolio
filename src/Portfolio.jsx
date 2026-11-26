import React from 'react';
import threeUrl from '../node_modules/three/build/three.min.js?url';
import DCLogic from './DCLogic.jsx';

export default class Component extends DCLogic {
  constructor(props){
    super(props);
    if(!window.THREE && !document.querySelector('script[data-three]')){ const s = document.createElement('script'); s.src = threeUrl; s.dataset.three = '1'; document.head.appendChild(s); }
    this.heroObj = React.createRef(); this.heroCanvas = React.createRef();
    this.samuraiInner = React.createRef(); this.gleam = React.createRef();
    this.plateWrap = React.createRef(); this.plateDot = React.createRef(); this.leak = React.createRef();
    this.statFps = React.createRef(); this.statMesh = React.createRef();
    this.statTri = React.createRef(); this.statCall = React.createRef();
    this.reel = React.createRef(); this.deepLayer = React.createRef();
    this.fogLayer = React.createRef(); this.sunLayer = React.createRef();
    this.progressFill = React.createRef(); this.curtain = React.createRef(); this.track = React.createRef();
    this.progressKnob = React.createRef(); this.posNum = React.createRef();
    this.sunCore = React.createRef(); this.skyTint = React.createRef(); this.emberWrap = React.createRef();
    this.cursorRing = React.createRef(); this.cursorDot = React.createRef();
    this.caseWrap = React.createRef(); this.curtainMark = React.createRef(); this.curtainLine = React.createRef(); this.curtainEnso = React.createRef(); this.curtainBar = React.createRef(); this.curtainSkip = React.createRef();
    this._tilt = { x: 0, y: 0 }; this._pulse = 0; this._active = -1;
    this.N = 5;
    this.quickWrap = React.createRef(); this.deskBeacon = React.createRef();
    // lite scene: phones and low-power machines get a still frame instead of live WebGL
    let live = false, low = false, narrow = false;
    try { live = localStorage.getItem('jt_live3d') === '1'; } catch(e){}
    try {
      const n = navigator, c = n.connection;
      low = !!((c && (c.saveData || /(^|-)2g/.test(c.effectiveType || ''))) || (n.deviceMemory && n.deviceMemory < 4) || (n.hardwareConcurrency && n.hardwareConcurrency < 4));
      narrow = matchMedia('(max-width:900px)').matches;
    } catch(e){}
    this._liteAuto = low;
    let sky = null; try { sky = localStorage.getItem('jt_sky'); } catch(e){}
    let rec = false;
    try { const q = new URLSearchParams(location.search).get('view'); if(q === 'recruiter' || location.hash === '#recruiter'){ rec = true; localStorage.setItem('jt_rec', '1'); } else if(q === 'full'){ localStorage.setItem('jt_rec', '0'); } else { const s = localStorage.getItem('jt_rec'); rec = s === '1' || (s === null && (low || narrow)); } } catch(e){}
    this._recBoot = rec;
    this.qlWrap = React.createRef(); this.qlScroll = React.createRef(); this.qlAmtRef = React.createRef();
    this.state = { sound: false, caseIdx: null, quick: rec, rec: rec, live3d: live, sky: sky, sceneGo: false,
      ql: false, qlApp: null, qlTab: 'ledger', qlTx: this._qlSeed(), qlSheet: false, qlAmt: '', qlCat: 'food', qlNote: '', qlBad: false, qlToast: '' };
  }
  _initCursor(){
    const ring = this.cursorRing && this.cursorRing.current, dot = this.cursorDot && this.cursorDot.current;
    if(!ring || !dot) return;
    if(!matchMedia('(hover:hover) and (pointer:fine) and (min-width:901px)').matches) return;
    let tx = innerWidth/2, ty = innerHeight/2, rx = tx, ry = ty, shown = false, label = '';
    const move = e => {
      tx = e.clientX; ty = e.clientY;
      dot.style.transform = 'translate3d(' + tx + 'px,' + ty + 'px,0)';
      if(!shown){ shown = true; ring.style.opacity = '1'; dot.style.opacity = '1'; }
      const t = e.target.closest && e.target.closest('[data-case],[data-cell],a,button,[data-goto]');
      let next = t ? (t.hasAttribute('data-case') ? 'View' : '') : null;
      if(next === null && this._lanternHot) next = { desk: 'Demo', shelf: 'Skills', letter: 'Write' }[this._hotKind] || '灯';
      if(next === label) return;
      label = next;
      if(next === null){
        ring.style.width = '38px'; ring.style.height = '38px'; ring.style.margin = '-19px 0 0 -19px';
        ring.style.borderColor = 'rgba(243,236,221,0.42)'; ring.style.background = 'transparent';
        ring.style.color = 'transparent'; ring.textContent = '';
      } else if(next === '灯'){
        ring.style.width = '60px'; ring.style.height = '60px'; ring.style.margin = '-30px 0 0 -30px';
        ring.style.borderColor = 'rgba(255,196,128,0.9)'; ring.style.background = 'rgba(255,170,90,0.16)';
        ring.style.color = '#FFD9A8'; ring.textContent = '灯';
      } else if(next){
        ring.style.width = '68px'; ring.style.height = '68px'; ring.style.margin = '-34px 0 0 -34px';
        ring.style.borderColor = '#E0674F'; ring.style.background = 'rgba(183,48,31,0.22)';
        ring.style.color = '#F3ECDD'; ring.textContent = next;
      } else {
        ring.style.width = '52px'; ring.style.height = '52px'; ring.style.margin = '-26px 0 0 -26px';
        ring.style.borderColor = 'rgba(224,103,79,0.8)'; ring.style.background = 'rgba(183,48,31,0.1)';
        ring.style.color = 'transparent'; ring.textContent = '';
      }
    };
    this._lastPE = null;
    const move0 = move;
    addEventListener('ronin:pick', ev => { if(!this._modal() && ev.detail && ev.detail.kind === 'lantern') this._burst(); });
    document.addEventListener('click', ev => { const m = ev.target.closest && ev.target.closest('a[href^="mailto"]'); if(m){ this._lastPE = ev; this._stamp('送'); } });
    this._onLantern = ev => { this._lanternHot = !!(ev.detail && ev.detail.on); if(this._dimEl) this._dimEl.style.opacity = this._lanternHot ? '0.16' : '0'; this._hotKind = ev.detail && ev.detail.kind; if(this._lastPE) move0(this._lastPE); };
    addEventListener('ronin:pick', ev => {
      if(this._modal()) return;
      const k = ev.detail && ev.detail.kind;
      if(k === 'shelf') this._goto(2);
      else if(k === 'letter') this._goto(4);
      else if(k === 'lantern') this._cycleSky();
    });
    addEventListener('ronin:lantern', this._onLantern);
    addEventListener('ronin:desk', () => { if(!this._modal()) this._openDemo(false, null); });
    addEventListener('pointermove', e => { this._lastPE = e; }, {passive:true});
    const leave = () => { shown = false; ring.style.opacity = '0'; dot.style.opacity = '0'; };
    addEventListener('pointermove', move, {passive:true});
    document.documentElement.addEventListener('pointerleave', leave);
    this._cursorOff = () => { removeEventListener('pointermove', move); document.documentElement.removeEventListener('pointerleave', leave); cancelAnimationFrame(this._craf); };
    const tick = () => { rx += (tx - rx) * 0.16; ry += (ty - ry) * 0.16; ring.style.transform = 'translate3d(' + rx.toFixed(2) + 'px,' + ry.toFixed(2) + 'px,0)'; this._craf = (Math.abs(tx - rx) + Math.abs(ty - ry) > 0.05) ? requestAnimationFrame(tick) : null; };
    const wakeRing = () => { if(!this._craf) this._craf = requestAnimationFrame(tick); };
    addEventListener('pointermove', wakeRing, {passive:true});
    const off0 = this._cursorOff; this._cursorOff = () => { removeEventListener('pointermove', wakeRing); off0(); };
    tick();
  }
  // scale each chapter's content down until it fits between header and chapter nav
  _fit(){
    const wide = window.matchMedia('(min-width:901px)').matches;
    document.querySelectorAll('[data-fit]').forEach(el => {
      el.style.zoom = '';
      const shots = el.querySelectorAll('[data-g="wframe"]');
      shots.forEach(f => f.style.removeProperty('height'));
      const p = el.closest('[data-panel]'); if(!p) return;
      p.removeAttribute('data-over');
      if(!wide) return;
      const cs = getComputedStyle(p);
      const avail = p.clientHeight - parseFloat(cs.paddingTop) - parseFloat(cs.paddingBottom);
      // screenshots can lose height without losing legibility, so they give it up before text is scaled
      const excess = Math.max(el.offsetHeight, el.scrollHeight) - avail;
      if(excess > 0){
        const heights = Array.from(shots, f => f.offsetHeight);
        shots.forEach((f, i) => f.style.setProperty('height', Math.max(120, heights[i] - excess) + 'px', 'important'));
      }
      let z = 1;
      for(let k = 0; k < 6; k++){
        const hh = Math.max(el.offsetHeight, el.scrollHeight) * z;
        if(hh <= avail) break;
        z = Math.max(0.85, z * (avail / hh) * 0.97);
        el.style.zoom = String(z);
        if(z === 0.85) break;
      }
      if(Math.max(el.offsetHeight, el.scrollHeight) * z > avail + 2) p.setAttribute('data-over', ''); else p.removeAttribute('data-over');
    });
  }
  componentDidMount(){
    this._initCursor();
    // v10 wheel-driven horizontal travel engine
    this._wide = matchMedia('(min-width:901px)');
    this._reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
    this._panels = Array.from(document.querySelectorAll('[data-panel]'));

    // pointer life on the deep plane (fog / sun / ronin drift toward the cursor)
    // one style write per frame, not per mousemove event
    this._move = (e) => {
      this._mx = e.clientX; this._my = e.clientY;
      this._lastMove = performance.now();
      if(!this._pRaf) this._pRaf = requestAnimationFrame(() => { this._pRaf = null; this._parallax(); });
      if(!this._reduce && !this._modal() && this._fleckWrap && this._fleckWrap.childElementCount < 14){
        const nt = performance.now();
        if(!this._lastFleck || nt - this._lastFleck > 150){ this._lastFleck = nt; this._spawnFleck(this._mx, this._my); }
      }
    };
    this._parallax = () => {
      const mx = (this._mx / window.innerWidth - 0.5), my = (this._my / window.innerHeight - 0.5);
      this._tilt = { x: my, y: mx };
      if(this.heroObj.current){ this.heroObj.current.style.transition = 'transform .7s cubic-bezier(.2,.7,.2,1)'; this.heroObj.current.style.transform = 'translate3d(' + (mx*22).toFixed(1) + 'px,' + (my*16).toFixed(1) + 'px,0)'; }
      if(this.fogLayer.current) this.fogLayer.current.style.transform = 'translate3d(' + (mx*-14).toFixed(1) + 'px,' + (my*-8).toFixed(1) + 'px,0)';
      if(this.sunLayer.current) this.sunLayer.current.style.transform = 'translate3d(' + (mx*20).toFixed(1) + 'px,' + (my*12).toFixed(1) + 'px,0)';
    };
    window.addEventListener('mousemove', this._move);
    // carried lantern: a warm pool of light trails the pointer across the house
    const stg = document.querySelector('[data-g="stage"]');
    if(stg && !this._reduce && matchMedia('(hover:hover) and (min-width:901px)').matches){
      const L = document.createElement('div');
      L.setAttribute('aria-hidden', 'true'); L.setAttribute('data-g', 'plight');
      L.style.cssText = 'position:absolute;left:0;top:0;z-index:11;pointer-events:none;width:62vh;height:62vh;margin:-31vh 0 0 -31vh;border-radius:50%;mix-blend-mode:screen;opacity:0;transition:opacity .9s ease;will-change:transform;background:radial-gradient(closest-side,rgba(255,196,128,0.26) 0%,rgba(236,132,72,0.12) 38%,rgba(226,116,66,0.04) 66%,rgba(226,116,66,0) 100%)';
      stg.appendChild(L);
      let lx = innerWidth * 0.6, ly = innerHeight * 0.5, tx = lx, ty = ly, seen = false, t = 0;
      this._plMove = e => { tx = e.clientX; ty = e.clientY; if(!seen){ seen = true; lx = tx; ly = ty; } };
      addEventListener('pointermove', this._plMove, { passive: true });
      const tk = () => {
        if(document.documentElement.hasAttribute('data-lite')){ L.style.display = 'none'; return; }
        this._plRaf = requestAnimationFrame(tk);
        const vis = seen && !this._modal();
        if(!vis){ if(L.style.opacity !== '0') L.style.opacity = '0'; return; }
        lx += (tx - lx) * 0.07; ly += (ty - ly) * 0.07; t += 0.016;
        // irregular flame flicker: two detuned sines
        this._plB = (this._plB || 1) + ((this._lanternHot ? 1.45 : 1) - (this._plB || 1)) * 0.1;
        const f = (0.9 + Math.sin(t * 7.3) * 0.04 + Math.sin(t * 12.9 + 1.7) * 0.03) * this._plB;
        L.style.transform = 'translate3d(' + lx.toFixed(1) + 'px,' + ly.toFixed(1) + 'px,0) scale(' + f.toFixed(3) + ')';
        if(L.style.opacity !== '1') L.style.opacity = '1';
      };
      tk();
    }
    // reactive ink flecks trail the cursor
    this._fleckWrap = document.createElement('div');
    this._fleckWrap.style.cssText = 'position:fixed;inset:0;z-index:230;pointer-events:none;overflow:hidden';
    document.body.appendChild(this._fleckWrap);

    // seed hidden state for reveals (wide only)
    if(this._wide.matches && !this._reduce){
      this._panels.forEach(p => { p.querySelectorAll('[data-anim]').forEach(el => { el.style.opacity = '0'; }); });
    }
    this._workHover();

    // self-owned horizontal travel — wheel / drag / keys drive a virtual position (0..N-1).
    // No native scroll or sticky, so it behaves identically in every host.
    this._pos = 0; this._target = 0;
    const clampP = v => Math.max(0, Math.min(this.N - 1, v));
    // offstage chapters must not be reachable by Tab or read by screen readers
    this._reach = (live) => {
      this._panels.forEach((p, n) => {
        const on = live < 0 || n === live;
        if(on){ p.removeAttribute('aria-hidden'); p.removeAttribute('inert'); p.inert = false; }
        else { p.setAttribute('aria-hidden', 'true'); p.setAttribute('inert', ''); p.inert = true; }
      });
      this._resolveFocus(live);
    };
    this._apply = () => {
      if(!this._wide.matches){
        if(this.reel.current) this.reel.current.style.transform = 'none';
        if(this.deepLayer.current) this.deepLayer.current.style.transform = 'none';
        if(this._wideStyled){ this._panels.forEach(p => { p.style.filter = ''; p.style.opacity = ''; p.style.transform = ''; }); this._wideStyled = false; }
        // phones: the house still travels — vertical scroll drives the same camera path
        if(this._panels && this._panels.length){
          const mid = innerHeight * 0.5; let mp = 0;
          for(let k = 0; k < this._panels.length; k++){
            const r = this._panels[k].getBoundingClientRect();
            if(r.top <= mid){ mp = k + Math.min(1, Math.max(0, (mid - r.top) / Math.max(1, r.height))) - 0.5; }
          }
          mp = Math.max(0, Math.min(this.N - 1, mp));
          if(this._mobPos == null || Math.abs(mp - this._mobPos) > 0.002){ this._mobPos = mp; window.dispatchEvent(new CustomEvent('ronin:pos', { detail: { pos: mp } })); }
          const live = Math.round(mp);
          if(this._setActive && live !== this._active) this._setActive(live);
        }
        return;
      }
      const w = window.innerWidth, x = this._pos * w;
      if(this.reel.current) this.reel.current.style.transform = `translate3d(${(-x).toFixed(1)}px,0,0)`;
      if(this.deepLayer.current) this.deepLayer.current.style.transform = `translate3d(${(-x * 0.3).toFixed(1)}px,0,0)`;
      if(this.progressFill.current) this.progressFill.current.style.width = ((this._pos / (this.N - 1)) * 100).toFixed(2) + '%';
      // the knob rides the live fractional position, so travel is legible as motion
      // along the sequence rather than a bar that silently grows
      if(this.progressKnob.current) this.progressKnob.current.style.left = ((this._pos / (this.N - 1)) * 100).toFixed(2) + '%';
      if(this.posNum.current){
        const n = String(Math.round(this._pos) + 1).padStart(2, '0');
        if(this.posNum.current.textContent !== n) this.posNum.current.textContent = n;
      }
      // each cell fills in proportion to how far into that chapter you are
      if(this.track.current){
        const bars = this.track.current.querySelectorAll('[data-cellbar]');
        for(let i = 0; i < bars.length; i++){
          bars[i].style.transform = 'scaleX(' + Math.max(0, Math.min(1, this._pos - i + 1)).toFixed(3) + ')';
        }
      }
      // hand the live camera position to the three.js house so it dollies with the reel
      window.dispatchEvent(new CustomEvent('ronin:pos', { detail: { pos: this._pos } }));
      // depth of field: the chapter under the camera is sharp, its neighbours
      // fall out of focus — what makes the travel read as one continuous shot.
      // Full-viewport blur is expensive, so it exists ONLY while the camera moves;
      // once parked, offstage panels hold a cheap opacity/scale state with no filter.
      const moving = Math.abs(this._target - this._pos) > 0.003;
      const dof = !this._reduce && this.props.depthOfField !== false && moving;
      if(dof){
        this._panels.forEach((p, i) => {
          const d = Math.abs(i - this._pos);
          if(d < 0.01){ p.style.filter = 'none'; p.style.opacity = '1'; p.style.transform = 'none'; }
          else if(d > 1.5){ p.style.filter = 'none'; p.style.opacity = '0.22'; p.style.transform = 'scale(0.95)'; }
          else { p.style.filter = 'blur(' + (d * 8).toFixed(2) + 'px) saturate(' + (1 - d * 0.42).toFixed(3) + ')'; p.style.opacity = (1 - d * 0.55).toFixed(3); p.style.transform = 'scale(' + (1 - d * 0.035).toFixed(4) + ')'; }
        });
        this._parked = false;
      } else if(!this._parked){
        const live = Math.round(this._pos);
        this._panels.forEach((p, i) => {
          p.style.filter = 'none';
          p.style.opacity = i === live ? '1' : '0.22';
          p.style.transform = i === live ? 'none' : 'scale(0.95)';
        });
        this._parked = true;
        this._resolveFocus(live);
      }
      // any styling above (moving or parked) must be undone if the window narrows
      this._wideStyled = true;
      if(!this._hintGone && this._pos > 0.06) this._retireHint();
      const idx = Math.round(this._pos);
      if(idx !== this._active) this._setActive(idx);
    };
    this._travel = this._apply;
    // Two travel modes, on purpose: direct manipulation (wheel/drag) follows the finger
    // with an exponential chase, while a commanded jump (nav/waypoint/keys) runs a
    // critically-damped spring so arrival is settled by physics rather than a
    // hand-tuned duration curve — no overshoot, no long exponential tail.
    const K = 150, D = 2 * Math.sqrt(K) * 0.82;   // stiffness + just-past-critical damping
    const tick = () => {
      const tw = this._tw;
      if(tw){
        const now = performance.now();
        let h = Math.min((now - tw.t) / 1000, 0.04); tw.t = now;
        // fixed sub-steps keep the spring identical on 60 and 144Hz displays
        for(let s = h; s > 0; s -= 1/240){
          const dtS = Math.min(s, 1/240);
          const kk = tw.k || K, dd = tw.k ? 2 * Math.sqrt(tw.k) * 0.82 : D;
          const a = (this._target - this._pos) * kk - tw.v * dd;
          tw.v += a * dtS;
          this._pos += tw.v * dtS;
        }
        if(this._pos < 0){ this._pos = 0; tw.v = 0; } else if(this._pos > this.N - 1){ this._pos = this.N - 1; tw.v = 0; }
        if(Math.abs(this._target - this._pos) < 0.0008 && Math.abs(tw.v) < 0.01){
          this._tw = null; this._pos = this._target; this._travelRaf = null; this._apply(); return;
        }
        this._apply();
        this._travelRaf = requestAnimationFrame(tick);
        return;
      }
      this._pos += (this._target - this._pos) * 0.085;
      if(Math.abs(this._target - this._pos) < 0.0004){
        this._pos = this._target; this._travelRaf = null; this._apply(); return;
      }
      this._apply();
      this._travelRaf = requestAnimationFrame(tick);
    };
    this._wake = () => { if(!this._travelRaf) this._travelRaf = requestAnimationFrame(tick); };
    this._to = (v) => { this._tw = null; this._target = clampP(v); this._parked = false; this._wake(); };
    // commanded jump: a spring carries any distance, so no duration to tune
    this._toEased = (v, k) => {
      const to = clampP(v), d = Math.abs(to - this._pos);
      if(this._reduce || d < 0.02){ this._to(to); return; }
      this._target = to; this._parked = false;
      this._tw = { t: performance.now(), v: this._tw ? this._tw.v : 0, k: k || 0 };
      this._wake();
    };
    this._wake();
    const stage = this.reel.current ? this.reel.current.parentElement : window;
    this._wheel = (e) => {
      if(!this._wide.matches) return;
      if(e.ctrlKey || e.metaKey) return;              // never swallow pinch/browser zoom
      if(this._modal()) return;                       // an open overlay owns its own scroll
      const d = Math.abs(e.deltaX) > Math.abs(e.deltaY) ? e.deltaX : e.deltaY;
      if(!d) return;
      e.preventDefault();
      this._to(this._target + d / (window.innerWidth * 0.9));
      this._snapSoon(240);
    };
    // when the wheel goes quiet, the reel settles onto the nearest chapter like a door on its track
    this._snapSoon = (ms) => {
      clearTimeout(this._snapT);
      this._snapT = setTimeout(() => {
        if(this._modal() || this._ts != null) return;
        const n = clampP(Math.round(this._target));
        if(Math.abs(n - this._target) > 0.001) this._toEased(n, 90);
      }, ms);
    };
    stage.addEventListener('wheel', this._wheel, { passive: false });
    this._ts = null;
    this._tStart = (e) => { if(!this._wide.matches) return; this._ts = e.touches[0].clientX; this._tp = this._target; };
    this._tMove = (e) => { if(!this._wide.matches || this._ts == null) return; e.preventDefault(); const dx = e.touches[0].clientX - this._ts; this._to(this._tp - dx / window.innerWidth); };
    this._tEnd = () => { this._ts = null; this._snapSoon(60); };
    stage.addEventListener('touchstart', this._tStart, { passive: true });
    stage.addEventListener('touchmove', this._tMove, { passive: false });
    stage.addEventListener('touchend', this._tEnd, { passive: true });
    this._key = (e) => {
      if(e.key === 'Escape' && this.state.ql){ if(this.state.qlSheet) this.setState({ qlSheet: false }); else if(this.state.qlApp) this._qlHome(); else this._closeDemo(); return; }
      if(e.key === 'Escape' && this.state.quick){ this._closeQuick(); return; }
      if(e.key === 'Escape' && this.state.caseIdx !== null){ this._closeCase(); return; }
      if(e.key === 'Tab' && this._modal()){ this._trap(e); return; }
      if(this._modal()) return;
      // the work frame is a div with role=button, so Enter/Space need wiring by hand
      if((e.key === 'Enter' || e.key === ' ') && document.activeElement && document.activeElement.matches('[data-g="wframe"][data-case]')){
        e.preventDefault();
        document.activeElement.click();
        return;
      }
      if(!this._wide.matches) return;
      if(e.key === 'ArrowRight' || e.key === 'PageDown'){ e.preventDefault(); this._step(1); }
      else if(e.key === 'ArrowLeft' || e.key === 'PageUp'){ e.preventDefault(); this._step(-1); }
      else if(e.key === 'Home'){ this._pendingFocus = 0; this._to(0); }
      else if(e.key === 'End'){ this._pendingFocus = this.N - 1; this._to(this.N - 1); }
    };
    window.addEventListener('keydown', this._key);
    this._onResize = () => { this._apply(); this._fit(); };
    // adaptive quality: sample real frame times once the scene is up; a machine that
    // can't hold ~36fps loses the decorative layers instead of stuttering
    const probe = () => {
      if(this._probed || document.hidden) return; this._probed = true;
      const d = []; let last = 0;
      const step = now => {
        if(last) d.push(now - last); last = now;
        if(d.length < 90){ this._probeRaf = requestAnimationFrame(step); return; }
        d.sort((a, b) => a - b);
        if(d[45] > 28){ document.documentElement.setAttribute('data-lite', ''); try { sessionStorage.setItem('jt_lite', '1'); } catch(e){} }
      };
      this._probeRaf = requestAnimationFrame(step);
    };
    try { if(sessionStorage.getItem('jt_lite') === '1'){ document.documentElement.setAttribute('data-lite', ''); this._probed = true; } } catch(e){}
    document.addEventListener('house-ready', () => setTimeout(probe, 2600), { once: true });
    setTimeout(probe, 7000);
    this._fit(); setTimeout(() => this._fit(), 400); setTimeout(() => this._fit(), 1800); setTimeout(() => this._fit(), 3200); setTimeout(() => this._fit(), 5000);
    if(document.fonts && document.fonts.ready) document.fonts.ready.then(() => this._fit());
    window.addEventListener('resize', this._onResize);
    this._wide.addEventListener('change', () => { this._parked = false; this._apply(); this._setActive(Math.round(this._target)); });
    this._stageEl = stage;

    const ho = this.props.heroObject || 'none';
    if(ho === 'monogram') this._initThree();

    this._sky();

    // returning visitors get a different greeting and land where they left off
    let visits = 1, resume = 0;
    try {
      visits = (+localStorage.getItem('jt_visits') || 0) + 1;
      localStorage.setItem('jt_visits', String(visits));
      resume = Math.max(0, Math.min(this.N - 1, +localStorage.getItem('jt_chapter') || 0));
      if(localStorage.getItem('jt_sound') === 'on') this._wantSound = true;
    } catch(e){}
    if(visits > 1 && this.curtainMark.current){
      this.curtainMark.current.textContent = '再会';
      if(this.curtainLine.current) this.curtainLine.current.textContent = resume > 0 ? 'Welcome back — resuming chapter ' + String(resume + 1).padStart(2, '0') : 'Welcome back';
      if(resume > 0){ this._pos = resume; this._target = resume; }
    }
    // sound was on last visit: browsers need a gesture, so arm it for the first one
    if(this._wantSound){
      this._kick = () => {
        document.removeEventListener('pointerdown', this._kick); document.removeEventListener('keydown', this._kick);
        this.setState({ sound: true }); this._ambientOn();
      };
      document.addEventListener('pointerdown', this._kick); document.addEventListener('keydown', this._kick);
    }

    // text and still paint first; the 3D scene mounts once the browser is idle
    const go = () => this.setState({ sceneGo: true });
    if(window.requestIdleCallback) requestIdleCallback(go, { timeout: 500 }); else setTimeout(go, 120);
    document.addEventListener('house-ready', () => { this._apply(); window.dispatchEvent(new CustomEvent('ronin:tone', { detail: { tone: this._skyKey() } })); });
    // launch curtain
    const cur = this.curtain.current;
    if(this.state.rec){ const tr0 = this.track.current; if(tr0){ tr0.setAttribute('inert', ''); tr0.inert = true; tr0.setAttribute('aria-hidden', 'true'); } }
    if(cur){
      if(this._reduce || this.state.rec){ cur.style.display = 'none'; }
      else {
        // designed load: the ensō draws while the house builds and compiles its shaders;
        // the curtain lifts once the scene reports ready (or after a hard 4.5s cap)
        const line = this.curtainLine.current, bar = this.curtainBar.current, enso = this.curtainEnso.current;
        if(line && !line.textContent) line.textContent = 'Lighting the lanterns';
        const t0 = performance.now();
        if(enso) enso.animate([{ strokeDashoffset: 92 }, { strokeDashoffset: 14 }], { duration: 700, easing: 'cubic-bezier(.3,.1,.2,1)', fill: 'forwards' });
        if(bar) bar.animate([{ transform: 'scaleX(0)' }, { transform: 'scaleX(0.82)' }], { duration: 800, easing: 'cubic-bezier(.2,.6,.3,1)', fill: 'forwards' });
        let lifted = false, skipped = false;
        const minShow = visits > 1 ? 120 : 420;
        const skip = () => {
          if(skipped) return; skipped = lifted = true;
          document.removeEventListener('house-ready', onReady);
          removeEventListener('keydown', onKey);
          cur.style.animation = 'curtainlift 0.6s cubic-bezier(.76,0,.24,1) forwards';
          cur.addEventListener('animationend', () => { cur.style.display = 'none'; }, { once: true });
        };
        const onKey = e => { if(e.key === 'Escape' || e.key === 'Enter' || e.key === ' ') skip(); };
        addEventListener('keydown', onKey);
        if(this.curtainSkip.current) this.curtainSkip.current.addEventListener('click', skip);
        const lift = () => {
          if(lifted) return; lifted = true;
          document.removeEventListener('house-ready', onReady);
          const wait = Math.max(0, minShow - (performance.now() - t0));
          setTimeout(() => {
            if(skipped) return; skipped = true;
            removeEventListener('keydown', onKey);
            if(enso) enso.animate([{ strokeDashoffset: getComputedStyle(enso).strokeDashoffset }, { strokeDashoffset: 0 }], { duration: 380, easing: 'ease-out', fill: 'forwards' });
            if(bar) bar.animate([{ transform: getComputedStyle(bar).transform }, { transform: 'scaleX(1)' }], { duration: 380, easing: 'ease-out', fill: 'forwards' });
            if(line) line.textContent = line.textContent === 'Lighting the lanterns' ? 'Lit' : line.textContent;
            cur.style.animation = 'curtainlift 0.8s cubic-bezier(.76,0,.24,1) 0.16s forwards';
            cur.addEventListener('animationend', () => { cur.style.display = 'none'; }, { once: true });
          }, wait);
        };
        const onReady = () => lift();
        document.addEventListener('house-ready', onReady);
        const hs = document.querySelector('house-scene');
        lift();
      }
    }
    try { if(localStorage.getItem('jt_traveled')){ this._hintGone = true; const h = document.querySelector('[data-g="ohint"]'); if(h) h.style.display = 'none'; } } catch(e){}
    // position the reel and fire the first chapter reveal without waiting on rAF
    this._onMobScroll = () => { if(!this._wide.matches) this._apply(); };
    addEventListener('scroll', this._onMobScroll, { passive: true });
    this._apply();
    this._setActive(Math.round(this._target));

    // waypoint / nav jumps + case study open/close
    this._nav = (e) => {
      // the frame wraps an <image-slot> with its own controls — let those clicks through
      if(e.target.closest && e.target.closest('image-slot')) return;
      const oc = e.target.closest && e.target.closest('[data-case]');
      if(oc){ e.preventDefault(); const wrap = oc.closest('[data-anim]'); this._openCase(+oc.getAttribute('data-case'), wrap ? wrap.firstElementChild : null); return; }
      const cc = e.target.closest && e.target.closest('[data-caseclose]');
      if(cc){ e.preventDefault(); this._closeCase(); return; }
      const t = e.target.closest && e.target.closest('[data-goto]');
      if(!t) return;
      e.preventDefault();
      if(this.state.caseIdx !== null) this._closeCase();
      this._goto(+t.getAttribute('data-goto'));
    };
    document.addEventListener('click', this._nav);
  }

  _step(dir){
    const i = Math.max(0, Math.min(this.N - 1, Math.round(this._target) + dir));
    this._pendingFocus = i;
    this._toEased(i);
  }
  // Focus lands on ARRIVAL, never on departure: a multi-chapter jump crosses
  // intermediate chapters, and each crossing re-inerts the destination — which
  // would drop focus to <body>. So we queue the intent and spend it once the
  // camera actually parks on that chapter.
  _resolveFocus(live){
    if(this._pendingFocus == null || live !== this._pendingFocus) return;
    this._pendingFocus = null;
    this._focusPanel(live);
  }
  _focusPanel(i){
    const p = this._panels && this._panels[i];
    if(!p) return;
    p.removeAttribute('aria-hidden'); p.removeAttribute('inert'); p.inert = false;
    try { p.focus({ preventScroll: true }); } catch(e){ }
  }
  _spawnFleck(x, y){
    if(!this._fleckWrap) return;
    const d = document.createElement('span');
    const s = 3 + Math.random() * 5;
    const r = Math.random();
    const col = r < 0.42 ? '#E0674F' : (r < 0.72 ? '#D8942E' : 'rgba(243,236,221,0.85)');
    const ox = (Math.random() - 0.5) * 26, oy = (Math.random() - 0.5) * 26;
    const shape = Math.random() < 0.4 ? '50%' : '46% 54% 50% 50% / 54% 46% 54% 46%';
    d.style.cssText = `position:absolute;left:${(x + ox).toFixed(1)}px;top:${(y + oy).toFixed(1)}px;width:${s.toFixed(1)}px;height:${s.toFixed(1)}px;border-radius:${shape};background:${col};opacity:0.72;transform:translate(-50%,-50%);will-change:transform,opacity`;
    this._fleckWrap.appendChild(d);
    const a = d.animate([{ opacity: 0.72, transform: 'translate(-50%,-50%) scale(1)' }, { opacity: 0, transform: `translate(calc(-50% + ${(ox * 1.6).toFixed(1)}px),calc(-50% + ${(oy * 1.4 + 20).toFixed(1)}px)) scale(0.3)` }], { duration: 850 + Math.random() * 550, easing: 'cubic-bezier(.2,.7,.2,1)', fill: 'forwards' });
    a.onfinish = () => d.remove();
  }
  _sky(){
    // the rising sun reads the visitor's local clock
    let k = this._skyKey();
    const P = {
      dawn:  { core: '#F7B45C', mid: '#D8562A', rim: '#87240F', glow: 'rgba(230,150,66,0.42)', halo: 'rgba(230,150,66,0.18)', tint: 'rgba(244,176,104,0.14)', em: '0.85' },
      noon:  { core: '#FFF4DC', mid: '#EF7A34', rim: '#9C2A14', glow: 'rgba(255,214,158,0.38)', halo: 'rgba(255,214,158,0.16)', tint: 'rgba(255,243,214,0.10)', em: '0.6' },
      dusk:  { core: '#EE4A2C', mid: '#C2331F', rim: '#7E1E12', glow: 'rgba(183,48,31,0.4)',    halo: 'rgba(183,48,31,0.18)',  tint: 'rgba(183,48,31,0.1)',    em: '1' },
      night: { core: '#C0523A', mid: '#78200F', rim: '#3A0F08', glow: 'rgba(120,40,26,0.34)',   halo: 'rgba(120,40,26,0.14)',  tint: 'rgba(52,66,104,0.2)',    em: '1' }
    }[k] || null;
    if(!P) return;
    if(this.sunCore.current){
      this.sunCore.current.style.background = 'radial-gradient(circle at 50% 48%,' + P.core + ' 0%,' + P.mid + ' 38%,' + P.rim + ' 64%,rgba(58,13,8,0) 77%)';
      this.sunCore.current.style.boxShadow = '0 0 150px 44px ' + P.glow + ',0 0 320px 120px ' + P.halo;
    }
    window.dispatchEvent(new CustomEvent('ronin:tone', { detail: { tone: k } }));
    setTimeout(() => window.dispatchEvent(new CustomEvent('ronin:tone', { detail: { tone: k } })), 1800);
    if(this.skyTint.current) this.skyTint.current.style.background = P.tint;
    const sk = this._skyKey(); document.documentElement.setAttribute('data-sky', sk);
    if(this.emberWrap.current) this.emberWrap.current.style.opacity = (sk === 'dusk' || sk === 'night') ? '1' : '0';
  }
  _skyAuto(){ const h = new Date().getHours(); return h >= 5 && h < 9 ? 'dawn' : (h < 17 && h >= 9 ? 'noon' : (h >= 17 && h < 20 ? 'dusk' : 'night')); }
  _skyKey(){ const o = this.state.sky || this.props.skyMode || 'auto'; return o === 'auto' ? this._skyAuto() : o; }
  _cycleSky(){
    const order = ['auto', 'dawn', 'noon', 'dusk', 'night'];
    const cur = this.state.sky || this.props.skyMode || 'auto';
    const next = order[(order.indexOf(cur) + 1) % order.length];
    try { localStorage.setItem('jt_sky', next); } catch(e){}
    this.setState({ sky: next }, () => this._sky());
  }
  _modal(){ return this.state.caseIdx !== null || this.state.quick || this.state.ql; }
  _qlSeed(){
    const m = new Date().toLocaleString('en-US', { month: 'short' });
    return [
      { id: 1, n: 'Salary', c: 'income', a: 5000, d: m + ' 1' },
      { id: 2, n: 'Groceries', c: 'food', a: 40, d: m + ' 4' }
    ];
  }
  _deskScene(){
    if(this._reduce || this.state.quick || this.state.rec) return null;
    const hs = document.querySelector('house-scene');
    if(!hs || !hs._ready || !hs.focusDesk || window.innerWidth <= 900) return null;
    return hs;
  }
  _clipOf(r){
    const W = window.innerWidth, H = window.innerHeight;
    return 'inset(' + Math.max(0, r.t).toFixed(1) + 'px ' + Math.max(0, W - r.r).toFixed(1) + 'px ' + Math.max(0, H - r.b).toFixed(1) + 'px ' + Math.max(0, r.l).toFixed(1) + 'px round 4px)';
  }
  _beaconLoop(){
    const b = this.deskBeacon.current; if(!b) return;
    const ring = b.querySelector('[data-ring]');
    if(ring && !this._reduce) ring.animate([{ transform: 'scale(1)', opacity: 0.9 }, { transform: 'scale(3.2)', opacity: 0 }], { duration: 1800, iterations: Infinity, easing: 'cubic-bezier(.2,.6,.3,1)' });
    let on = false;
    const tick = () => {
      this._beaconRaf = requestAnimationFrame(tick);
      const hs = (this._hsEl && this._hsEl.isConnected) ? this._hsEl : (this._hsEl = document.querySelector('house-scene'));
      let show = false, r = null;
      if(hs && hs._ready && hs.screenRect && !this._modal() && !this._qlBusy && window.innerWidth > 900 && hs._room && hs._room[1] > 0.72 && !(hs._fzL > 0.01)){
        r = hs.screenRect();
        show = !!r && r.r > 0 && r.l < window.innerWidth && r.b > 0 && r.t < window.innerHeight;
      }
      if(show){
        const x = (r.l + r.r) / 2, y = (r.t + r.b) / 2;
        b.style.transform = 'translate(' + x.toFixed(1) + 'px,' + y.toFixed(1) + 'px) translate(-50%, calc(-100% + 7px))';
      }
      if(show !== on){ on = show; b.style.opacity = show ? '1' : '0'; b.style.pointerEvents = show ? 'auto' : 'none'; b.tabIndex = show ? 0 : -1; }
    };
    tick();
  }
  _qlHome(){
    this.setState({ qlApp: null, qlSheet: false }, () => this._qlIn());
  }
  _qlPick(app){
    this.setState({ qlApp: app, qlSheet: false, qlTab: 'ledger' }, () => { if(this._qlFit) this._qlFit(); this._qlIn(); });
  }
  _qlIn(delay){
    const w = this.qlWrap.current; if(!w || this._reduce) return;
    w.querySelectorAll('[data-qv]').forEach((el, i) => el.animate([{ opacity: 0, transform: 'translateY(18px) scale(0.985)' }, { opacity: 1, transform: 'none' }], { duration: 560, delay: (delay || 40) + i * 90, easing: 'cubic-bezier(.16,.9,.24,1)', fill: 'both' }));
  }
  _openDemo(fromQuick, app){
    this._qlNext = app === undefined ? 'ledger' : app;
    if(this.state.ql || this._qlBusy) return;
    if(this._workClear) this._workClear();
    if(!fromQuick) this._qlReturn = document.activeElement;
    const tr = this.track.current;
    if(tr){ tr.setAttribute('inert', ''); tr.inert = true; tr.setAttribute('aria-hidden', 'true'); }
    const hs = this._deskScene();
    if(!hs){ this._qlDesk = null; this._qlShow(); return; }
    this._qlBusy = true; this._qlDesk = hs; hs.paused = false;
    const fade = [tr, document.querySelector('[data-g="filmstrip"]')].filter(Boolean);
    fade.forEach(el => el.animate([{ opacity: 1 }, { opacity: 0 }], { duration: 420, easing: 'ease-in', fill: 'forwards' }));
    this._qlFaded = fade;
    hs.focusDesk(true).then(() => { this._qlBusy = false; this._qlShow(hs.screenRect()); });
  }
  _qlShow(rect){
    this.setState({ ql: true, qlSheet: false, qlApp: this._qlNext || null, qlTab: 'ledger' }, () => {
      const w = this.qlWrap.current; if(!w) return;
      this._qlFit = () => {
        const fr = w.querySelector('[data-g="qlframe"]'); if(!fr) return;
        const k = window.innerWidth <= 900 ? 1 : Math.min(1, (window.innerHeight - 124) / 850);
        fr.style.zoom = k.toFixed(3);
      };
      this._qlFit();
      window.addEventListener('resize', this._qlFit);
      const c = w.querySelector('[data-qlclose]');
      if(c) try { c.focus({ preventScroll: true }); } catch(e){}
      if(this._reduce) return;
      if(rect){
        w.animate([{ clipPath: this._clipOf(rect), opacity: 0.4, filter: 'brightness(1.8)' }, { clipPath: this._clipOf(rect), opacity: 1, filter: 'brightness(1.25)', offset: 0.18 }, { clipPath: 'inset(0px 0px 0px 0px round 0px)', opacity: 1, filter: 'none' }], { duration: 900, easing: 'cubic-bezier(.7,0,.2,1)', fill: 'both' });
      } else w.animate([{ opacity: 0 }, { opacity: 1 }], { duration: 320, easing: 'ease-out', fill: 'both' });
      this._qlIn(rect ? 620 : 80);
    });
  }
  _closeDemo(){
    const w = this.qlWrap.current;
    if(this._qlFit) window.removeEventListener('resize', this._qlFit);
    const hs = this._qlDesk; this._qlDesk = null;
    const done = () => this.setState({ ql: false, qlSheet: false }, () => {
      const tr = this.track.current;
      if(tr){ tr.removeAttribute('inert'); tr.inert = false; tr.removeAttribute('aria-hidden'); }
      if(hs){
        hs.focusDesk(false);
        (this._qlFaded || []).forEach(el => { el.getAnimations().forEach(a => a.cancel()); el.animate([{ opacity: 0 }, { opacity: 1 }], { duration: 700, delay: 650, easing: 'ease-out', fill: 'backwards' }); });
        this._qlFaded = null;
      }
      const b = this._qlReturn; if(b && b.isConnected) try { b.focus({ preventScroll: true }); } catch(e){}
      this._qlReturn = null;
      this._reopenQuick();
    });
    if(!w || this._reduce){ done(); return; }
    if(hs){
      hs.paused = false;
      const r = hs.screenRect();
      if(r){ w.animate([{ clipPath: 'inset(0px 0px 0px 0px round 0px)', opacity: 1 }, { clipPath: this._clipOf(r), opacity: 1, offset: 0.85 }, { clipPath: this._clipOf(r), opacity: 0 }], { duration: 640, easing: 'cubic-bezier(.6,0,.3,1)', fill: 'forwards' }).onfinish = done; return; }
    }
    w.animate([{ opacity: 1 }, { opacity: 0 }], { duration: 220, easing: 'ease-in', fill: 'forwards' }).onfinish = done;
  }
  _qlSave(e){
    if(e && e.preventDefault) e.preventDefault();
    const a = Math.round(Number(this.state.qlAmt) * 100) / 100;
    if(!(a > 0) || a > 99999){ this.setState({ qlBad: true }); const r = this.qlAmtRef.current; if(r) r.focus(); return; }
    const CAT = { food: 'Food & Dining', transport: 'Transport', other: 'Other', income: 'Salary' };
    const c = this.state.qlCat;
    const d = new Date().toLocaleString('en-US', { month: 'short', day: 'numeric' });
    const tx = { id: Date.now(), n: (this.state.qlNote || '').trim() || CAT[c], c, a, d };
    this.setState(s => ({ qlTx: s.qlTx.concat([tx]), qlSheet: false, qlAmt: '', qlNote: '', qlBad: false, qlTab: 'ledger', qlToast: c === 'income' ? 'Income added' : 'Saved · left to spend updated' }), () => {
      const sc = this.qlScroll.current; if(sc) sc.scrollTop = 0;
    });
    clearTimeout(this._qlT); this._qlT = setTimeout(() => this.setState({ qlToast: '' }), 2200);
  }
  _qlVals(){
    const S = this.state, tx = S.qlTx, TEAL = '#84BDB1', RED = '#E07A6E';
    const f = (n) => (n < 0 ? '−' : '') + 'US$' + Math.abs(n).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
    const fk = (n) => Math.abs(n) >= 1000 ? 'US$' + (n / 1000).toFixed(1) + 'K' : f(n);
    const now = new Date(), dim = new Date(now.getFullYear(), now.getMonth() + 1, 0).getDate(), days = dim - now.getDate() + 1;
    const META = { food: ['✕', RED, 'Food & Dining', '#2E2220'], transport: ['T', '#A9C4E8', 'Transport', '#1F2632'], other: ['•', '#C9D3D0', 'Other', '#1F2826'], income: ['+', TEAL, 'Salary', '#1C2B28'] };
    const LIM = [['food', 400]];
    const income = tx.filter(t => t.c === 'income').reduce((x, t) => x + t.a, 0);
    const spend = tx.filter(t => t.c !== 'income').reduce((x, t) => x + t.a, 0);
    const alloc = LIM.reduce((x, l) => x + l[1], 0);
    const bSpent = tx.filter(t => LIM.some(l => l[0] === t.c)).reduce((x, t) => x + t.a, 0);
    const left = alloc - bSpent, over = left < 0;
    const row = (t) => ({ n: t.n, d: t.d, glyph: META[t.c][0], tint: META[t.c][1], ibg: META[t.c][3], catLabel: t.c === 'income' ? 'Income' : META[t.c][2], amtStr: (t.c === 'income' ? '+' : '−') + f(t.a), col: t.c === 'income' ? TEAL : '#EEF3F1',
      del: () => this.setState(s => ({ qlTx: s.qlTx.filter(x => x.id !== t.id) })) });
    const all = tx.slice().reverse().map(row);
    const tab = (k) => () => this.setState({ qlTab: k, qlSheet: false }, () => { const sc = this.qlScroll.current; if(sc) sc.scrollTop = 0; });
    const nav = {}; ['ledger', 'tx', 'reports', 'budgets', 'profile'].forEach(k => { const on = S.qlTab === k; nav[k] = { on: on ? 'true' : 'false', bg: on ? 'rgba(255,255,255,0.08)' : 'transparent', col: on ? TEAL : '#EEF3F1', pick: tab(k) }; });
    const cats = {}; tx.filter(t => t.c !== 'income').forEach(t => { cats[t.c] = (cats[t.c] || 0) + t.a; });
    const top = [{ label: 'Food & Dining', v: 391.5 }, { label: 'Bills & Utilities', v: 420 }, { label: 'Transport', v: 140 }].map(c => { const k = c.label === 'Food & Dining' ? 'food' : c.label === 'Transport' ? 'transport' : null; return { label: c.label, n: c.v + (k ? (cats[k] || 0) : 0) }; }).sort((a, b) => b.n - a.n).map(c => ({ label: c.label, v: f(c.n) }));
    const yInc = 15900 + income, yExp = 951.5 + spend;
    return {
      qlWrap: this.qlWrap, qlScroll: this.qlScroll, qlAmtRef: this.qlAmtRef,
      qlOpen: S.ql, closeDemo: () => this._closeDemo(), qlReset: () => this.setState({ qlTx: this._qlSeed(), qlSheet: false, qlTab: 'ledger', qlToast: '' }),
      qlIsLedger: S.qlTab === 'ledger', qlIsTx: S.qlTab === 'tx', qlIsReports: S.qlTab === 'reports', qlIsBudgets: S.qlTab === 'budgets', qlIsProfile: S.qlTab === 'profile',
      qlNav: nav, qlGoTx: tab('tx'), qlGoBudgets: tab('budgets'), qlGoProfile: tab('profile'),
      qlSoon: () => { this.setState({ qlToast: 'Available in the full app' }); clearTimeout(this._qlT); this._qlT = setTimeout(() => this.setState({ qlToast: '' }), 1800); },
      qlMonth: now.toLocaleString('en-US', { month: 'long', year: 'numeric' }), qlMonthUp: now.toLocaleString('en-US', { month: 'long', year: 'numeric' }), qlYear: String(now.getFullYear()),
      qlNet: f(income - spend), qlIncome: f(income), qlSpend: f(spend), qlIncomeK: fk(income), qlSpendK: fk(spend),
      qlAllTime: f(14898.5 + income - spend),
      qlLeft: f(left), qlLeftCol: over ? RED : '#EEF3F1', qlAvailCol: over ? RED : TEAL, qlLeftBar: over ? RED : TEAL,
      qlPerDay: f(Math.max(0, left) / days), qlDays: days,
      qlUsedPct: Math.min(100, Math.max(2, bSpent / alloc * 100)).toFixed(1) + '%',
      qlAlloc: f(alloc), qlBSpent: f(bSpent), qlCount: tx.length, qlAllocCount: LIM.length + (LIM.length === 1 ? ' allocation' : ' allocations'),
      qlYSaved: fk(yInc - yExp), qlYIncome: fk(yInc), qlYExp: fk(yExp), qlTop: top,
      qlBudgets: LIM.map(([k, lim]) => { const sp = tx.filter(t => t.c === k).reduce((x, t) => x + t.a, 0), rem = lim - sp, o = rem < 0;
        return { label: META[k][2], glyph: META[k][0], spentStr: f(sp), remLabel: o ? 'Over by' : 'Remaining', remStr: f(Math.abs(rem)), col: o ? RED : TEAL, pctStr: Math.round(sp / lim * 100) + '%', limitStr: f(lim), barW: Math.min(100, Math.max(2, sp / lim * 100)).toFixed(1) + '%' }; }),
      qlLatest: all.slice(0, 3), qlAll: all,
      qlSheet: S.qlSheet, qlToast: S.qlToast,
      qlOpenSheet: () => this.setState({ qlSheet: true, qlBad: false }, () => setTimeout(() => { const r = this.qlAmtRef.current; if(r) try { r.focus({ preventScroll: true }); } catch(e){} }, 30)),
      qlCloseSheet: () => this.setState({ qlSheet: false }),
      qlAmt: S.qlAmt, qlOnAmt: (e) => this.setState({ qlAmt: e.target.value.replace(/[^0-9.]/g, '').slice(0, 8), qlBad: false }),
      qlAmtBorder: S.qlBad ? RED : '#2B3533',
      qlNote: S.qlNote, qlOnNote: (e) => this.setState({ qlNote: e.target.value }), qlNoteHint: S.qlCat === 'income' ? 'Salary' : META[S.qlCat][2],
      qlCats: ['food', 'transport', 'other', 'income'].map(k => ({ label: k === 'income' ? 'Income' : META[k][2], on: S.qlCat === k ? 'true' : 'false', bg: S.qlCat === k ? 'rgba(132,189,177,0.18)' : '#1A2120', bd: S.qlCat === k ? TEAL : '#2B3533', col: S.qlCat === k ? '#EEF3F1' : '#C9D3D0', pick: () => this.setState({ qlCat: k }) })),
      qlSave: (e) => this._qlSave(e)
    };
  }
  _lite(){
    const m = this.props.liteMode || 'auto';
    if(this.props.house3d === false || m === 'never') return false;
    if(m === 'always') return !this.state.live3d;
    return this._liteAuto && !this.state.live3d;
  }
  _setRec(on){ try { localStorage.setItem('jt_rec', on ? '1' : '0'); } catch(e){} if(!on) this._recBoot = false; this.setState({ rec: on }); }
  _openQuick(){
    this._setRec(true);
    if(this.state.quick) return;
    if(this.state.caseIdx !== null) return;
    if(this._workClear) this._workClear();
    this._quickReturn = document.activeElement;
    const tr = this.track.current;
    if(tr){ tr.setAttribute('inert', ''); tr.inert = true; tr.setAttribute('aria-hidden', 'true'); }
    this.setState({ quick: true }, () => {
      const w = this.quickWrap.current; if(!w) return;
      w.scrollTop = 0;
      const close = w.querySelector('[data-quickclose]');
      if(close) try { close.focus({ preventScroll: true }); } catch(e){ }
      if(this._reduce) return;
      w.animate([{ opacity: 0 }, { opacity: 1 }], { duration: 320, easing: 'ease-out', fill: 'both' });
      w.querySelectorAll('[data-qv]').forEach((el, i) => el.animate([{ opacity: 0, transform: 'translateY(14px)' }, { opacity: 1, transform: 'none' }], { duration: 460, delay: 60 + i * 55, easing: 'cubic-bezier(.16,.9,.24,1)', fill: 'both' }));
    });
  }
  // a case study or demo opened from recruiter mode closes back into it
  _reopenQuick(){
    if(!this._backToQuick) return false;
    this._backToQuick = false;
    this._openQuick();
    return true;
  }
  _closeQuick(then){
    if(this.state.rec && !then) this._setRec(false);
    const w = this.quickWrap.current;
    const done = () => this.setState({ quick: false }, () => {
      const tr = this.track.current;
      if(then){ then(); return; }
      if(tr){ tr.removeAttribute('inert'); tr.inert = false; tr.removeAttribute('aria-hidden'); }
      const back = this._quickReturn;
      if(back && back.isConnected) try { back.focus({ preventScroll: true }); } catch(e){ }
      this._quickReturn = null;
    });
    if(!w || this._reduce || then){ done(); return; }
    const a = w.animate([{ opacity: 1 }, { opacity: 0 }], { duration: 240, easing: 'ease-in', fill: 'forwards' });
    a.onfinish = done;
  }
  // keep Tab inside the open overlay: the reel behind it is inert, so without this
  // the ring walks out to browser chrome and never comes back
  _trap(e){
    const w = this.state.ql ? this.qlWrap.current : this.state.quick ? this.quickWrap.current : this.caseWrap.current;
    if(!w) return;
    const f = Array.prototype.filter.call(
      w.querySelectorAll('a[href],button,input,select,textarea,[tabindex]:not([tabindex="-1"])'),
      el => !el.disabled && el.offsetParent !== null
    );
    if(!f.length){ e.preventDefault(); return; }
    const first = f[0], last = f[f.length - 1];
    const on = w.contains(document.activeElement);
    if(!on){ e.preventDefault(); (e.shiftKey ? last : first).focus({ preventScroll: true }); return; }
    if(e.shiftKey && document.activeElement === first){ e.preventDefault(); last.focus({ preventScroll: true }); }
    else if(!e.shiftKey && document.activeElement === last){ e.preventDefault(); first.focus({ preventScroll: true }); }
  }
  // the scroll cue has one job: earn the first horizontal move. After that it is noise,
  // so it retires for good rather than pulsing at someone who already understood.
  _retireHint(){
    if(this._hintGone) return;
    this._hintGone = true;
    try { localStorage.setItem('jt_traveled', '1'); } catch(e){}
    const h = document.querySelector('[data-g="ohint"]');
    if(!h) return;
    h.style.transition = 'opacity .5s ease, transform .5s ease';
    h.style.opacity = '0';
    h.style.transform = 'translateX(14px)';
    setTimeout(() => { if(h.isConnected) h.style.display = 'none'; }, 560);
  }
  // each room has its own light: cooler in the study, warmest at the lantern
  _mood(i){
    const stg = document.querySelector('[data-g="stage"]'); if(!stg) return;
    if(!this._moodEl){
      const m = document.createElement('div'); m.setAttribute('aria-hidden', 'true'); m.setAttribute('data-g', 'vscrim');
      m.style.cssText = 'position:absolute;inset:0;z-index:10;pointer-events:none;mix-blend-mode:soft-light;transition:background-color 1.6s ease';
      stg.appendChild(m); this._moodEl = m;
      const d = document.createElement('div'); d.setAttribute('aria-hidden', 'true'); d.setAttribute('data-g', 'vscrim');
      d.style.cssText = 'position:absolute;inset:0;z-index:10;pointer-events:none;background:#0B0906;opacity:0;transition:opacity .5s ease';
      stg.appendChild(d); this._dimEl = d;
    }
    this._moodEl.style.backgroundColor = ['rgba(255,176,104,0.10)', 'rgba(126,152,196,0.20)', 'rgba(168,178,128,0.14)', 'rgba(150,134,184,0.16)', 'rgba(255,138,58,0.26)'][i] || 'transparent';
  }
  _arrive(i){
    if(this._arrived === i) return; this._arrived = i;
    (this._arrT || []).forEach(clearTimeout); this._arrT = [];
    const root = document;
    // proof: an ink seal presses onto each credential in turn
    root.querySelectorAll('[data-cert-seal]').forEach(s => s.remove());
    if(i === 3){
      root.querySelectorAll('[data-cert]').forEach((c, n) => {
        const s = document.createElement('span'); s.setAttribute('data-cert-seal', ''); s.setAttribute('aria-hidden', 'true');
        s.textContent = '証'; const ang = [-6, -10, -4, -8][n % 4]; s.style.setProperty('--ang', ang + 'deg');
        s.style.cssText = 'position:absolute;right:0;top:calc(50% + 7px);margin-top:-20px;display:flex;align-items:center;justify-content:center;width:40px;height:40px;background:#B7301F;color:#F3ECDD;font-family:\'Shippori Mincho B1\',serif;font-weight:800;font-size:20px;box-shadow:0 0 0 2px rgba(11,9,6,0.9),0 0 0 3px rgba(183,48,31,0.85),0 6px 16px rgba(0,0,0,0.45);pointer-events:none;transform:rotate(var(--ang));opacity:' + (this._reduce ? '0.92' : '0');
        (c.querySelector('[data-cert-row]') || c).appendChild(s);
        if(this._reduce) return;
        this._arrT.push(setTimeout(() => {
          s.style.animation = 'certStamp .7s cubic-bezier(.2,.8,.2,1) forwards';
          c.animate([{ transform: 'translateY(0)' }, { transform: 'translateY(3px)' }, { transform: 'translateY(0)' }], { duration: 260, delay: 300, easing: 'ease-out' });
        }, 650 + n * 260));
      });
    }
    // contact: headline sets word by word
    const words = root.querySelectorAll('[data-cw]');
    if(i === 4 && !this._reduce){
      words.forEach((w, n) => w.animate([{ opacity: 0, transform: 'translateY(0.35em)', filter: 'blur(6px)' }, { opacity: 1, transform: 'none', filter: 'blur(0)' }], { duration: 640, delay: 260 + n * 120, easing: 'cubic-bezier(.2,.7,.2,1)', fill: 'backwards' }));
    }
  }
  _stamp(ch){
    const e = this._lastPE; if(!e || this._reduce) return;
    const w = document.createElement('div'); w.setAttribute('aria-hidden', 'true');
    w.style.cssText = 'position:fixed;left:' + e.clientX + 'px;top:' + e.clientY + 'px;z-index:330;pointer-events:none';
    w.innerHTML = '<span style="position:absolute;left:0;top:0;width:58px;height:58px;border-radius:50%;background:radial-gradient(closest-side,rgba(183,48,31,0.5),rgba(183,48,31,0));animation:inkOut .9s ease-out forwards"></span><span style="position:absolute;left:0;top:0;display:flex;align-items:center;justify-content:center;width:46px;height:46px;background:#B7301F;color:#F3ECDD;font-family:\'Shippori Mincho B1\',serif;font-weight:800;font-size:22px;box-shadow:0 0 0 2px #0B0906,0 0 0 3px #B7301F,0 8px 20px rgba(0,0,0,0.5);animation:stampIn 1.15s cubic-bezier(.2,.8,.2,1) forwards">' + ch + '</span>';
    document.body.appendChild(w); setTimeout(() => w.remove(), 1250);
  }
  _burst(){
    const e = this._lastPE; if(!e || this._reduce) return;
    const w = document.createElement('div'); w.setAttribute('aria-hidden', 'true');
    w.style.cssText = 'position:fixed;left:' + e.clientX + 'px;top:' + e.clientY + 'px;z-index:330;pointer-events:none';
    let s = '';
    for(let k = 0; k < 9; k++){
      const a = -Math.PI / 2 + (Math.random() - 0.5) * 2.4, r = 40 + Math.random() * 70, sz = 3 + Math.random() * 4;
      s += '<span style="position:absolute;left:0;top:0;width:' + sz.toFixed(1) + 'px;height:' + sz.toFixed(1) + 'px;border-radius:50%;background:radial-gradient(circle,#FFE6B4 0%,#F0722E 55%,rgba(183,48,31,0) 100%);box-shadow:0 0 8px 2px rgba(240,120,50,0.55);--bx:' + (Math.cos(a) * r).toFixed(0) + 'px;--by:' + (Math.sin(a) * r - 30).toFixed(0) + 'px;animation:burst ' + (0.7 + Math.random() * 0.6).toFixed(2) + 's cubic-bezier(.2,.7,.3,1) forwards"></span>';
    }
    w.innerHTML = s; document.body.appendChild(w); setTimeout(() => w.remove(), 1500);
  }
  _openCase(i, frameEl){
    if(this.state.caseIdx !== null) return;
    this._stamp('開');
    if(this._workClear) this._workClear();
    this._returnFocus = document.activeElement;
    const tr = this.track.current;
    if(tr){ tr.setAttribute('inert', ''); tr.inert = true; tr.setAttribute('aria-hidden', 'true'); }
    this._caseRect = frameEl ? frameEl.getBoundingClientRect() : null;
    this.setState({ caseIdx: i }, () => this._caseIn());
  }
  _caseInset(r){
    if(!r) return 'inset(44% 44% 44% 44%)';
    return 'inset(' + r.top.toFixed(0) + 'px ' + (window.innerWidth - r.right).toFixed(0) + 'px ' + (window.innerHeight - r.bottom).toFixed(0) + 'px ' + r.left.toFixed(0) + 'px)';
  }
  _caseIn(){
    const w = this.caseWrap.current; if(!w) return;
    const close = w.querySelector('[data-caseclose]');
    if(close) try { close.focus({ preventScroll: true }); } catch(e){ }
    if(this.reel.current){ this.reel.current.style.transition = 'filter .6s ease'; this.reel.current.style.filter = 'blur(16px) saturate(0.55)'; }
    if(this._reduce) return;
    w.animate([{ clipPath: this._caseInset(this._caseRect), opacity: 0.55 }, { clipPath: 'inset(0px)', opacity: 1 }], { duration: 660, easing: 'cubic-bezier(.16,.86,.2,1)', fill: 'both' });
    w.querySelectorAll('[data-cs]').forEach((el, idx) => {
      el.animate([{ opacity: 0, transform: 'translateY(26px)' }, { opacity: 1, transform: 'none' }], { duration: 620, delay: 240 + idx * 75, easing: 'cubic-bezier(.16,.9,.24,1)', fill: 'both' });
    });
  }
  _closeCase(){
    const w = this.caseWrap.current;
    if(this.reel.current) this.reel.current.style.filter = '';
    const done = () => this.setState({ caseIdx: null }, () => {
      if(this._workClear) this._workClear();
      const tr = this.track.current;
      if(tr){ tr.removeAttribute('inert'); tr.inert = false; tr.removeAttribute('aria-hidden'); }
      const back = this._returnFocus;
      if(back && back.isConnected) try { back.focus({ preventScroll: true }); } catch(e){ }
      this._returnFocus = null;
      this._reopenQuick();
    });
    if(!w || this._reduce){ done(); return; }
    const a = w.animate([{ clipPath: 'inset(0px)', opacity: 1 }, { clipPath: this._caseInset(this._caseRect), opacity: 0.2 }], { duration: 470, easing: 'cubic-bezier(.7,0,.3,1)', fill: 'forwards' });
    a.onfinish = done;
  }
  _setActive(i){
    this._active = i;
    // no pos dispatch here — the travel loop already streams the fractional
    // position every frame; firing the snapped index fights it and jerks the house
    try { localStorage.setItem('jt_chapter', String(i)); } catch(e){}
    clearTimeout(this._fitT); this._fitT = setTimeout(() => this._fit(), 60);
    this._mood(i);
    this._retune(i);
    if(this._reach) this._reach(this._wide && this._wide.matches ? i : -1);
    document.querySelectorAll('[data-cell]').forEach(c => {
      const on = +c.getAttribute('data-cell') === i;
      if(on) c.setAttribute('aria-current', 'true'); else c.removeAttribute('aria-current');
      c.style.color = on ? '#F3ECDD' : 'rgba(243,236,221,0.66)';
      c.style.background = on ? 'rgba(183,48,31,0.09)' : 'transparent';
      const n = c.querySelector('[data-cellnum]');
      if(n) n.style.color = on ? '#E0674F' : 'inherit';
    });
    if(this._shojiChapter) this._shojiChapter(i);
    this._switchPulse();
    const panel = this._panels[i];
    if(!panel) return;
    clearTimeout(this._actT);
    // behind closed shoji the reveal would play unseen — hold it until the doors part
    const wait = this._shojiOpenAt ? Math.max(0, this._shojiOpenAt - performance.now()) : 0;
    if(wait > 0) this._actT = setTimeout(() => { if(this._active === i) this._activate(panel); }, wait);
    else {
      const go = () => {
        if(this._active !== i) return;
        if(this._tw && Math.abs(this._target - this._pos) > 0.08){ this._actT = setTimeout(go, 40); return; }
        this._activate(panel);
      };
      go();
    }
  }
  _splitLines(el){
    if(el._lines !== undefined) return el._lines;
    el._lines = null;
    const cs = getComputedStyle(el);
    if(!/Shippori/.test(cs.fontFamily) || parseFloat(cs.fontSize) < 28) return null;
    if(el.querySelector('a,button,img,image-slot,svg,[data-case],[data-anim],[data-word]')) return null;
    const words = [];
    const walk = (n) => {
      [...n.childNodes].forEach(c => {
        if(c.nodeType === 3){
          const parts = c.textContent.split(/(\s+)/);
          if(!c.textContent.trim()) return;
          const frag = document.createDocumentFragment();
          parts.forEach(p => {
            if(!p) return;
            if(/^\s+$/.test(p)){ frag.appendChild(document.createTextNode(p)); return; }
            const o = document.createElement('span');
            o.style.cssText = 'display:inline-block;overflow:hidden;vertical-align:top;padding:0 0.04em 0.14em;margin:0 -0.04em -0.14em';
            const i = document.createElement('span');
            i.style.cssText = 'display:inline-block;transform-origin:0 100%;will-change:transform';
            i.textContent = p;
            o.appendChild(i); frag.appendChild(o); words.push(i);
          });
          c.replaceWith(frag);
        } else if(c.nodeType === 1 && c.tagName !== 'BR') walk(c);
      });
    };
    walk(el);
    if(!words.length) return null;
    const rows = [];
    let lastTop = null;
    words.forEach(w => {
      const t = Math.round(w.parentNode.getBoundingClientRect().top);
      if(lastTop === null || Math.abs(t - lastTop) > 4){ rows.push([]); lastTop = t; }
      rows[rows.length - 1].push(w);
    });
    el._lines = rows;
    return rows;
  }
  _activate(panel){
    if(!this._wide.matches || this._reduce){
      panel.querySelectorAll('[data-anim]').forEach(el => { el.style.opacity = '1'; el.style.transform = 'none'; });
      return;
    }
    const word = panel.querySelector('[data-word]');
    if(word){
      const base = parseFloat(word.getAttribute('data-op') || '0.08');
      word.animate([{ opacity: 0, filter: 'blur(28px)', transform: 'scale(1.12)' }, { opacity: base, filter: 'blur(0px)', transform: 'scale(1)' }], { duration: 1300, easing: 'cubic-bezier(.2,.72,.2,1)', fill: 'both' });
    }
    const els = panel.querySelectorAll('[data-anim]');
    els.forEach((el, idx) => {
      // display headlines: per-line mask reveal — each line rises from behind its own clip
      const lines = this._splitLines(el);
      if(lines){
        el.style.opacity = '1';
        lines.forEach((ws, li) => ws.forEach(w => w.animate([{ transform: 'translateY(108%) rotate(2.5deg)' }, { transform: 'none' }],
          { duration: 1050, delay: 140 + idx * 85 + li * 95, easing: 'cubic-bezier(.16,.9,.24,1)', fill: 'both' })));
        return;
      }
      // cards: a blade-drawn top-to-bottom wipe that preserves their staggered lift
      if(el.hasAttribute('data-wipe')){
        // the card's own transform is composed from --lift + --hy, so the entrance must
        // never write transform directly — that would clobber whatever hover is holding
        el.style.setProperty('--hy', '0px');
        const a = el.animate([{ opacity: 0, clipPath: 'inset(0 0 100% 0)' }, { opacity: 1, clipPath: 'inset(0 0 0% 0)' }],
          { duration: 860, delay: 180 + idx * 90, easing: 'cubic-bezier(.16,.9,.24,1)', fill: 'both' });
        // release the animation once settled, so hover dimming can own opacity
        a.onfinish = () => { el.style.opacity = '1'; el.style.clipPath = 'none'; try { a.cancel(); } catch(e){} };
        return;
      }
      el.animate([{ opacity: 0, transform: 'translateY(40px)' }, { opacity: 1, transform: 'none' }], { duration: 720, delay: 120 + idx * 85, easing: 'cubic-bezier(.16,.9,.24,1)', fill: 'both' });
    });
  }
  _workHover(){
    const grid = document.querySelector('[data-g="wgrid"]');
    if(!grid) return;
    this._wgrid = grid;
    const cards = () => Array.prototype.slice.call(grid.querySelectorAll('[data-card]'));
    const dim = (on, card) => {
      cards().forEach(c => {
        const other = on && c !== card;
        c.style.opacity = other ? '0.45' : '1';
        c.style.filter = other ? 'saturate(0.55)' : '';
      });
    };
    const shotOf = c => c.querySelector('[data-shot]');
    // shoji doors: k = how far each leaf has slid (0 closed, 1 fully parted)
    const slide = (card, k, delay) => {
      const L = card.querySelector('[data-leaf="l"]'), R = card.querySelector('[data-leaf="r"]'), hk = card.querySelector('[data-hanko]');
      if(!L || !R) return;
      [L, R].forEach(x => x.style.transitionDelay = (delay || 0) + 'ms');
      L.style.transform = 'translateX(' + (-k * 101).toFixed(1) + '%)';
      R.style.transform = 'translateX(' + (k * 101).toFixed(1) + '%)';
      if(hk){ hk.style.transitionDelay = (delay || 0) + 'ms'; hk.style.opacity = k > 0.2 ? '0' : '1'; }
      // what's behind the doors: the phone surfaces out of the dark as the leaves part, then a lantern sheen crosses the glass
      const dev = card.querySelector('[data-dev]'), gl = card.querySelector('[data-glow]'), sh = card.querySelector('[data-sheen]');
      const open = k > 0.5, d0 = (delay || 0) + (open ? 280 : 0);
      if(dev){
        dev.style.transitionDelay = d0 + 'ms';
        dev.style.opacity = open ? '1' : '0';
        dev.style.filter = open ? 'blur(0px)' : 'blur(8px)';
        dev.style.transform = open ? 'translate(-50%,0) scale(1)' : 'translate(-50%,28px) scale(0.93)';
      }
      // the two supporting screens fan out from behind the hero phone a beat later
      card.querySelectorAll('[data-side]').forEach(sd => {
        const L = sd.getAttribute('data-side') === 'l';
        sd.style.transitionDelay = (open ? d0 + 260 : 0) + 'ms';
        sd.style.opacity = open ? '1' : '0';
        sd.style.transform = open ? 'translateX(calc(-50% ' + (L ? '-' : '+') + ' 66%)) rotate(' + (L ? -6 : 6) + 'deg) scale(0.92)' : 'translateX(-50%) scale(0.86)';
      });
      if(gl){
        gl.style.transitionDelay = (open ? d0 + 120 : 0) + 'ms';
        gl.style.opacity = open ? '1' : '0';
        gl.style.transform = 'translate(-50%,-50%) scale(' + (open ? 1 : 0.6) + ')';
      }
      // stack tags light up in turn once the screens have surfaced
      card.querySelectorAll('[data-stk]').forEach((s, n) => {
        clearTimeout(s._t); clearTimeout(s._t2);
        if(!open || this._reduce){ s.style.color = ''; s.style.textShadow = ''; s.style.borderColor = ''; return; }
        s._t = setTimeout(() => { s.style.borderColor = 'rgba(224,103,79,0.8)'; s.style.color = '#E0674F'; s.style.textShadow = '0 0 10px rgba(224,103,79,0.55),0 1px 6px rgba(11,9,6,0.95)'; }, d0 + 420 + n * 90);
        s._t2 = setTimeout(() => { s.style.color = ''; s.style.textShadow = ''; s.style.borderColor = ''; }, d0 + 420 + n * 90 + 520);
      });
      if(sh){
        if(open && !this._reduce){ sh.style.transition = 'transform 1.4s cubic-bezier(.4,0,.2,1) ' + (d0 + 650) + 'ms'; sh.style.transform = 'translateX(360%) skewX(-14deg)'; }
        else { sh.style.transition = 'none'; sh.style.transform = 'translateX(-160%) skewX(-14deg)'; }
      }
    };
    this._shojiRest = 0;
    this._shojiChapter = (i) => {
      const touch = !matchMedia('(hover: hover)').matches || !this._wide.matches;
      // arriving at the study: doors part on their own so the work is visible at once; they close again only when leaving
      this._shojiRest = i === 1 ? 1 : 0;
      cards().forEach((c, n) => { if(c !== this._hoverCard) slide(c, this._shojiRest, i === 1 ? (touch ? 300 : 380) + n * 140 : 0); });
      this._arrive(i);
    };
    const rest = card => {
      slide(card, this._shojiRest, 0);
      card.style.setProperty('--hy', '0px');
      const fr0 = card.querySelector('[data-g="wframe"]'); if(fr0) fr0.style.rotate = '';
      const sh = shotOf(card); if(sh) sh.style.transform = '';
      const cap = card.querySelector('[data-cap]'); if(cap) cap.style.transform = '';
    };
    const enter = (e, card) => {
      if(this._modal() || card === this._hoverCard) return;
      if(this._hoverCard) rest(this._hoverCard);
      this._hoverCard = card;
      if(this._reduce){ dim(true, card); slide(card, 1, 0); return; }
      dim(true, card);
      slide(card, 1, 0);
      card.style.setProperty('--hy', '-6px');
      const cap = card.querySelector('[data-cap]'); if(cap) cap.style.transform = 'translateY(-4px)';
      const sh = shotOf(card); if(sh) sh.style.transform = 'scale(1.05)';
      // blade sweep down the frame, landing on the CTA
      const blade = card.querySelector('[data-blade]');
      const frame = card.querySelector('[data-g="wframe"]');
      const btn = card.querySelector('button[data-case]');
      if(blade && frame){
        const h = frame.getBoundingClientRect().height;
        blade.animate([{ transform: 'translateY(0px)', opacity: 0 }, { transform: 'translateY(' + (h * 0.22).toFixed(0) + 'px)', opacity: 1, offset: 0.18 },
          { transform: 'translateY(' + (h - 1).toFixed(0) + 'px)', opacity: 0.9, offset: 0.86 }, { transform: 'translateY(' + h.toFixed(0) + 'px)', opacity: 0 }],
          { duration: 560, easing: 'cubic-bezier(.3,.7,.2,1)' });
      }
      if(btn) setTimeout(() => {
        if(this._hoverCard !== card) return;
        btn.animate([{ borderColor: 'rgba(224,103,79,0.5)' }, { borderColor: '#F3ECDD' }, { borderColor: 'rgba(224,103,79,0.5)' }], { duration: 520, easing: 'ease-out' });
      }, 470);
    };
    const clear = () => {
      if(!this._hoverCard) return;
      rest(this._hoverCard);
      this._hoverCard = null;
      dim(false, null);
    };
    this._workClear = clear;
    grid.addEventListener('pointerover', (e) => {
      if(e.pointerType === 'touch') return;               // taps must not strand a dimmed row
      const card = e.target.closest && e.target.closest('[data-card]');
      if(card) enter(e, card);
    });
    grid.addEventListener('pointerleave', clear);
    grid.addEventListener('focusin', (e) => { const c = e.target.closest && e.target.closest('[data-card]'); if(c) slide(c, 1, 0); });
    grid.addEventListener('focusout', (e) => { const c = e.target.closest && e.target.closest('[data-card]'); if(c && c !== this._hoverCard && !c.contains(e.relatedTarget)) slide(c, this._shojiRest, 0); });
    // cursor drift inside the hovered frame
    this._wMove = (e) => {
      if(e.pointerType === 'touch' || this._modal()) return;
      const over = e.target.closest && e.target.closest('[data-card]');
      if(!over){ clear(); return; }                        // gutters release the dim
      if(over !== this._hoverCard) enter(e, over);
      if(!this._hoverCard || this._reduce) return;
      if(this._wRaf) return;
      this._wRaf = requestAnimationFrame(() => {
        this._wRaf = null;
        const card = this._hoverCard; if(!card) return;
        const sh = shotOf(card), fr = card.querySelector('[data-g="wframe"]');
        if(!sh || !fr) return;
        const r = fr.getBoundingClientRect();
        const dx = ((e.clientX - (r.left + r.width / 2)) / (r.width / 2)) * -6;
        const dy = ((e.clientY - (r.top + r.height / 2)) / (r.height / 2)) * -6;
        sh.style.transform = 'scale(1.05) translate(' + dx.toFixed(1) + 'px,' + dy.toFixed(1) + 'px)';
        const nx = -dx / 6, ny = -dy / 6, mag = Math.min(1, Math.hypot(nx, ny));
        card.style.perspective = '900px';
        fr.style.rotate = (-ny).toFixed(3) + ' ' + nx.toFixed(3) + ' 0 ' + (mag * 3.2).toFixed(2) + 'deg';
      });
    };
    grid.addEventListener('pointermove', this._wMove);
  }
  _switchPulse(){ this._pulse = performance.now(); }
  _goto(i){
    i = Math.max(0, Math.min(this.N - 1, i));
    if(!this._wide.matches){
      const panel = this._panels[i];
      if(panel){ const scroller = document.scrollingElement || document.documentElement; const cur = window.scrollY || scroller.scrollTop || 0; window.scrollTo({ top: cur + panel.getBoundingClientRect().top - 66, behavior: 'smooth' }); }
      return;
    }
    const go = () => { this._pendingFocus = i; this._toEased(i, this._reduce ? 0 : 62); };
    if(i === this._active || this._shojiBusy) return;
    // every chapter jump goes through the shoji; only leaving the opening also leans the camera in
    this._shojiPush = this._active === 0;
    this._shoji(go, i);
  }
  // signature moment: leaving the opening, the camera leans into the house and a pair of
  // lit shoji slide shut across the lens, then part on the next chapter
  _shoji(mid, i){
    if(this._reduce){ mid(); return; }
    let o = this._shojiEl;
    const lattice = 'repeating-linear-gradient(90deg,rgba(0,0,0,0) 0,rgba(0,0,0,0) calc(12.5vw - 3px),#24180F calc(12.5vw - 3px),#24180F 12.5vw),repeating-linear-gradient(0deg,rgba(0,0,0,0) 0,rgba(0,0,0,0) calc(14.285vh - 3px),#24180F calc(14.285vh - 3px),#24180F 14.285vh)';
    if(!o){
      o = this._shojiEl = document.createElement('div');
      o.setAttribute('aria-hidden', 'true');
      o.style.cssText = 'position:fixed;inset:0;z-index:262;pointer-events:none;overflow:hidden;display:none';
      const door = side => {
        const d = document.createElement('div');
        d.style.cssText = 'position:absolute;top:0;bottom:0;width:50.4vw;' + side + ':0;background-color:#E6D9BE;background-image:' + lattice + ',radial-gradient(70% 60% at ' + (side === 'left' ? '100%' : '0%') + ' 50%,rgba(255,196,128,0.9) 0%,rgba(240,150,84,0.35) 48%,rgba(120,70,40,0.25) 100%);box-shadow:inset 0 0 0 14px #1F150D,inset 0 0 120px rgba(40,22,10,0.55),0 0 60px rgba(0,0,0,0.6);will-change:transform';
        const glow = document.createElement('div');
        glow.style.cssText = 'position:absolute;inset:0;background:radial-gradient(60% 55% at ' + (side === 'left' ? '100%' : '0%') + ' 50%,rgba(255,214,150,0.85) 0%,rgba(255,170,90,0) 70%);mix-blend-mode:screen;opacity:0';
        d.appendChild(glow); d._glow = glow;
        o.appendChild(d); return d;
      };
      this._shL = door('left'); this._shR = door('right');
      const lab = this._shLab = document.createElement('div');
      lab.style.cssText = 'position:absolute;left:50%;top:50%;transform:translate(-50%,-50%);display:flex;flex-direction:column;align-items:center;gap:14px;opacity:0;padding:26px 30px;background:#E6D9BE;box-shadow:0 0 0 1px #24180F';
      lab.innerHTML = '<span data-k style="font-family:\'Shippori Mincho B1\',serif;font-weight:800;font-size:clamp(54px,7vw,104px);line-height:1;color:#B7301F"></span><span data-n style="font-family:\'JetBrains Mono\',monospace;font-size:11px;letter-spacing:0.24em;text-transform:uppercase;color:#24180F"></span>';
      o.appendChild(lab);
      document.body.appendChild(o);
    }
    const K = ['序', '壱', '弐', '参', '結'];
    const panel = this._panels && this._panels[i];
    const nm = panel ? (panel.getAttribute('aria-label') || '').split('— ')[1] || '' : '';
    this._shLab.querySelector('[data-k]').textContent = K[i] || '';
    this._shLab.querySelector('[data-n]').textContent = String(i + 1).padStart(2, '0') + ' · ' + nm;
    o.style.display = 'block';
    if(this._shojiPush !== false) window.dispatchEvent(new CustomEvent('ronin:push'));
    this._shojiBusy = true;
    setTimeout(() => { this._shojiBusy = false; }, this._shojiN > 0 ? 1300 : 2300);
    if(this.state.sound) { try { this._flute(); } catch(e){} }
    this._shojiN = (this._shojiN || 0) + 1;
    const q = this._shojiN > 1 ? 0.55 : 1, tS = Math.round(720 * q), tH = Math.round(560 * q), tP = Math.round(1000 * q), tL = Math.round(860 * q);
    const ez = 'cubic-bezier(.72,0,.22,1)';
    // wood on a track: the panels meet with a small knock and settle back, and
    // un-stick with a tiny inward nudge before they slide open
    const shut = (x) => [{ transform: 'translateX(' + x + '%)', easing: 'cubic-bezier(.62,0,.3,1)' }, { transform: 'translateX(' + (x < 0 ? 0.7 : -0.7) + '%)', offset: 0.86, easing: 'cubic-bezier(.3,0,.3,1)' }, { transform: 'translateX(0)' }];
    const part = (x) => [{ transform: 'translateX(0)', easing: 'ease-out' }, { transform: 'translateX(' + (x < 0 ? 0.5 : -0.5) + '%)', offset: 0.09, easing: 'cubic-bezier(.5,0,.18,1)' }, { transform: 'translateX(' + x + '%)' }];
    this._shojiOpenAt = performance.now() + tS + tH + Math.round(300 * q);
    const close = [this._shL.animate(shut(-101), { duration: tS, fill: 'forwards' }),
      this._shR.animate(shut(101), { duration: tS, fill: 'forwards' })];
    [this._shL, this._shR].forEach(d => d._glow.animate([{ opacity: 0 }, { opacity: 0 }, { opacity: 1 }, { opacity: 0.4 }], { duration: Math.round(1500 * q), easing: 'ease-in-out', fill: 'forwards' }));
    close[0].onfinish = () => {
      mid();
      this._shLab.animate([{ opacity: 0, filter: 'blur(6px)', transform: 'translate(-50%,-47%)' }, { opacity: 1, filter: 'blur(0px)', transform: 'translate(-50%,-50%)', offset: 0.32 }, { opacity: 1, filter: 'blur(0px)', transform: 'translate(-50%,-50%)', offset: 0.66 }, { opacity: 0, filter: 'blur(4px)', transform: 'translate(-50%,-52%)' }], { duration: tL, easing: 'ease-in-out', fill: 'forwards' });
      setTimeout(() => {
        this._shL.animate(part(-101), { duration: tP, fill: 'forwards' });
        const op = this._shR.animate(part(101), { duration: tP, fill: 'forwards' });
        op.onfinish = () => { o.style.display = 'none'; this._shojiOpenAt = 0; };
      }, tH);
    };
  }
  _wipe(mid){
    if(this._reduce){ if(mid) mid(); return; }
    let o = this._wipeEl;
    if(!o){
      o = this._wipeEl = document.createElement('div');
      o.style.cssText = 'position:fixed;inset:0;z-index:260;pointer-events:none;transform:translateX(-100%);will-change:transform;background:linear-gradient(105deg,#0B0906 0%,#17130F 58%,#B7301F 100%);box-shadow:0 0 60px rgba(183,48,31,0.4)';
      document.body.appendChild(o);
    }
    const inA = o.animate([{ transform: 'translateX(-100%)' }, { transform: 'translateX(0)' }], { duration: 320, easing: 'cubic-bezier(.7,0,.2,1)', fill: 'forwards' });
    inA.onfinish = () => { if(mid) mid(); o.animate([{ transform: 'translateX(0)' }, { transform: 'translateX(101%)' }], { duration: 440, easing: 'cubic-bezier(.7,0,.2,1)', fill: 'forwards' }); };
  }
  _ac(){ if(!this._actx) this._actx = new (window.AudioContext || window.webkitAudioContext)(); if(this._actx.state === 'suspended') this._actx.resume(); return this._actx; }
  _flute(){
    const ac = this._ac(), t = ac.currentTime;
    const o = ac.createOscillator(); o.type = 'sine'; o.frequency.setValueAtTime(587.3, t);
    const vib = ac.createOscillator(); vib.frequency.value = 4.6;
    const vg = ac.createGain(); vg.gain.value = 4.2; vib.connect(vg).connect(o.frequency);
    const g = ac.createGain();
    g.gain.setValueAtTime(0.0001, t); g.gain.linearRampToValueAtTime(0.07, t + 0.18); g.gain.linearRampToValueAtTime(0.0001, t + 1.5);
    const lp = ac.createBiquadFilter(); lp.type = 'lowpass'; lp.frequency.value = 1900;
    o.connect(lp).connect(g).connect(ac.destination);
    o.start(t); vib.start(t); o.stop(t + 1.6); vib.stop(t + 1.6);
  }
  _ambientOn(){
    if(this._amb) return;
    const ac = this._ac(), t = ac.currentTime;
    const out = ac.createGain(); out.gain.setValueAtTime(0.0001, t); out.gain.linearRampToValueAtTime(0.15, t + 3.4); out.connect(ac.destination);
    // low drone: two detuned sines under a soft lowpass
    const lp = ac.createBiquadFilter(); lp.type = 'lowpass'; lp.frequency.value = 520; lp.Q.value = 0.7; lp.connect(out);
    const a = ac.createOscillator(); a.type = 'sine'; a.frequency.value = 110;
    const b = ac.createOscillator(); b.type = 'sine'; b.frequency.value = 110.7;
    const bg = ac.createGain(); bg.gain.value = 0.45; b.connect(bg);
    a.connect(lp); bg.connect(lp);
    // wind bed: looping noise through a slowly sweeping band
    const len = Math.floor(ac.sampleRate * 4), buf = ac.createBuffer(1, len, ac.sampleRate), ch = buf.getChannelData(0);
    for(let i = 0; i < len; i++) ch[i] = (Math.random() * 2 - 1) * 0.5;
    const noise = ac.createBufferSource(); noise.buffer = buf; noise.loop = true;
    const bp = ac.createBiquadFilter(); bp.type = 'bandpass'; bp.frequency.value = 620; bp.Q.value = 0.9;
    const ng = ac.createGain(); ng.gain.value = 0.2;
    noise.connect(bp); bp.connect(ng); ng.connect(out);
    const lfo = ac.createOscillator(); lfo.frequency.value = 0.06;
    const lg = ac.createGain(); lg.gain.value = 250; lfo.connect(lg); lg.connect(bp.frequency);
    a.start(t); b.start(t); noise.start(t); lfo.start(t);
    this._amb = { out, a, b, nodes: [a, b, noise, lfo] };
    this._retune(this._active < 0 ? 0 : this._active);
  }
  _ambientOff(){
    if(!this._amb || !this._actx) return;
    const { out, nodes } = this._amb, t = this._actx.currentTime;
    out.gain.cancelScheduledValues(t); out.gain.setValueAtTime(out.gain.value, t); out.gain.linearRampToValueAtTime(0.0001, t + 1.1);
    nodes.forEach(n => { try { n.stop(t + 1.3); } catch(e){} });
    this._amb = null;
  }
  _retune(i){
    // one drone note per chapter — the score shifts as the camera travels
    if(!this._amb || !this._actx) return;
    const scale = [110, 123.5, 130.8, 146.8, 98];
    const f = scale[Math.max(0, Math.min(4, i))], t = this._actx.currentTime;
    this._amb.a.frequency.linearRampToValueAtTime(f, t + 2.6);
    this._amb.b.frequency.linearRampToValueAtTime(f * 1.006, t + 2.6);
  }
  _monoShapes(THREE){
    const J = new THREE.Shape();
    J.moveTo(0.67, 1.40); J.lineTo(0.95, 1.40); J.lineTo(0.95, 0.42);
    J.quadraticCurveTo(0.95, 0.00, 0.475, 0.00);
    J.quadraticCurveTo(0.00, 0.00, 0.00, 0.42);
    J.lineTo(0.28, 0.42);
    J.quadraticCurveTo(0.28, 0.28, 0.475, 0.28);
    J.quadraticCurveTo(0.67, 0.28, 0.67, 0.42);
    J.closePath();
    const T = new THREE.Shape();
    T.moveTo(0.00, 1.40); T.lineTo(0.95, 1.40); T.lineTo(0.95, 1.12);
    T.lineTo(0.615, 1.12); T.lineTo(0.615, 0.00); T.lineTo(0.335, 0.00);
    T.lineTo(0.335, 1.12); T.lineTo(0.00, 1.12);
    T.closePath();
    return [J, T];
  }
  _roundedSlab(THREE, w, h, d, r){
    const s = new THREE.Shape(), x = -w / 2, y = -h / 2;
    s.moveTo(x + r, y);
    s.lineTo(x + w - r, y); s.absarc(x + w - r, y + r, r, -Math.PI / 2, 0);
    s.lineTo(x + w, y + h - r); s.absarc(x + w - r, y + h - r, r, 0, Math.PI / 2);
    s.lineTo(x + r, y + h); s.absarc(x + r, y + h - r, r, Math.PI / 2, Math.PI);
    s.lineTo(x, y + r); s.absarc(x + r, y + r, r, Math.PI, Math.PI * 1.5);
    const g = new THREE.ExtrudeGeometry(s, { depth: d, bevelEnabled: true, bevelThickness: 0.02, bevelSize: 0.02, bevelSegments: 3, curveSegments: 10 });
    g.translate(0, 0, -d / 2);
    return g;
  }
  _prong(THREE, h, depth){
    const s = new THREE.Shape();
    s.moveTo(-0.06, 0);
    s.quadraticCurveTo(-0.12 * h, 0.52 * h, -0.01, h);
    s.quadraticCurveTo(0.05 * h, 0.5 * h, 0.06, 0);
    s.closePath();
    const g = new THREE.ExtrudeGeometry(s, { depth, bevelEnabled: true, bevelThickness: 0.008, bevelSize: 0.008, bevelSegments: 2, curveSegments: 20 });
    g.translate(0, 0, -depth / 2);
    return g;
  }
  _buildRonin(THREE, shell, accent){
    // Traditional samurai in full armour (yoroi): kabuto + menpo, lacquered dō with
    // silk lacing, hanging sode + kusazuri, kote sleeves, suneate, and the katana.
    const geos = [], mats = [];
    const iron = new THREE.MeshPhysicalMaterial({ color: new THREE.Color('#0D0C09'), metalness: 0.5, roughness: 0.5, envMapIntensity: 0.6 });
    const brass = new THREE.MeshPhysicalMaterial({ color: new THREE.Color('#B08D4C'), metalness: 1, roughness: 0.3, envMapIntensity: 1.2 });
    const silk = new THREE.MeshStandardMaterial({ color: new THREE.Color(accent), roughness: 0.78, metalness: 0 });      // odoshi lacing
    const cord = new THREE.MeshStandardMaterial({ color: new THREE.Color('#4A1207'), roughness: 0.95, metalness: 0 });   // sash / cords
    const cloth = new THREE.MeshStandardMaterial({ color: new THREE.Color('#17140E'), roughness: 0.98, metalness: 0 });  // hakama / under-sleeves
    const skin = new THREE.MeshStandardMaterial({ color: new THREE.Color('#3A2A20'), roughness: 0.7, metalness: 0 });
    mats.push(iron, brass, silk, cord, cloth, skin);
    const glow = null;
    const add = (p, g, m, fn) => { geos.push(g); const mesh = new THREE.Mesh(g, m); if(fn) fn(mesh); p.add(mesh); return mesh; };
    const slab = (w, h, d, r) => this._roundedSlab(THREE, w, h, d, r);
    // a curved armour plate = short slab bent forward, used for lames
    const lame = (parent, w, h, d, mat, fn) => add(parent, slab(w, h, d, Math.min(w, h) * 0.28), mat, fn);
    const root = new THREE.Group();

    const legParts = {};
    [-1, 1].forEach(sd => {
      const hip = new THREE.Group(); hip.position.set(sd * 0.2, 1.6, 0); root.add(hip);
      legParts[sd < 0 ? 'hipL' : 'hipR'] = hip;
      // hakama-covered thigh
      add(hip, new THREE.CylinderGeometry(0.19, 0.16, 0.78, 18), cloth, m => m.position.set(0, -0.4, 0));
      const knee = new THREE.Group(); knee.position.y = -0.8; hip.add(knee);
      legParts[sd < 0 ? 'kneeL' : 'kneeR'] = knee;
      // lower leg cloth + suneate (shin guard) as three stacked plates down the front
      add(knee, new THREE.CylinderGeometry(0.13, 0.1, 0.66, 16), cloth, m => m.position.set(0, -0.34, 0));
      [0, 1, 2].forEach(i => lame(knee, 0.2 - i * 0.012, 0.19, 0.05, shell, m => { m.position.set(0, -0.14 - i * 0.18, 0.11 - i * 0.006); m.rotation.x = 0.05; }));
      add(knee, new THREE.CylinderGeometry(0.012, 0.012, 0.6, 6), brass, m => m.position.set(0, -0.36, 0.128)); // shin cord
      const foot = new THREE.Group(); foot.position.y = -0.68; knee.add(foot);
      // tabi + waraji sandal
      add(foot, new THREE.SphereGeometry(0.12, 16, 12), cloth, m => { m.scale.set(1, 0.7, 1.7); m.position.set(0, 0, 0.1); });
      add(foot, slab(0.26, 0.05, 0.5, 0.04), cord, m => m.position.set(0, -0.09, 0.1));
    });

    const torso = new THREE.Group(); torso.position.set(0, 1.78, 0); root.add(torso);
    // under-kimono body
    add(torso, new THREE.CylinderGeometry(0.28, 0.3, 0.66, 20), cloth, m => m.position.set(0, 0.2, 0));
    // dō — barrel-shaped lacquered cuirass, slightly tapered
    add(torso, new THREE.CylinderGeometry(0.34, 0.31, 0.72, 22), shell, m => m.position.set(0, 0.5, 0.01));
    add(torso, slab(0.6, 0.72, 0.12, 0.16), shell, m => m.position.set(0, 0.5, 0.24)); // chest face
    add(torso, slab(0.58, 0.66, 0.1, 0.16), shell, m => m.position.set(0, 0.52, -0.24)); // back
    // rows of silk lacing (odoshi) across the dō
    [0.28, 0.42, 0.56, 0.7].forEach(y => add(torso, slab(0.56, 0.045, 0.02, 0.01), silk, m => m.position.set(0, y, 0.3)));
    [0.28, 0.42, 0.56, 0.7].forEach(y => add(torso, slab(0.5, 0.045, 0.02, 0.01), silk, m => m.position.set(0, y, -0.3)));
    // agemaki knot + centre stud
    add(torso, new THREE.SphereGeometry(0.06, 16, 12), silk, m => { m.scale.set(1.4, 1, 0.6); m.position.set(0, 0.5, -0.31); });
    add(torso, new THREE.CylinderGeometry(0.05, 0.05, 0.05, 22), brass, m => { m.rotation.x = Math.PI / 2; m.position.set(0, 0.62, 0.32); });
    // obi sash at the waist
    add(torso, new THREE.CylinderGeometry(0.33, 0.33, 0.16, 22), cord, m => m.position.set(0, 0.12, 0));
    add(torso, new THREE.CylinderGeometry(0.335, 0.335, 0.03, 22), silk, m => m.position.set(0, 0.16, 0));
    // kusazuri — skirt of hanging tassets around the waist, each a stack of lames
    for(let k = 0; k < 7; k++){
      const a = (k / 7) * Math.PI * 2 + Math.PI / 7;
      const tas = new THREE.Group(); tas.position.set(Math.sin(a) * 0.3, 0.02, Math.cos(a) * 0.3); tas.rotation.y = a; torso.add(tas);
      [0, 1, 2].forEach(i => lame(tas, 0.24, 0.13, 0.05, shell, m => { m.position.set(0, -0.06 - i * 0.11, 0.02); m.rotation.x = 0.16; }));
      lame(tas, 0.22, 0.03, 0.02, silk, m => m.position.set(0, -0.02, 0.045));
    }

    const armParts = {};
    [-1, 1].forEach(sd => {
      const sh = new THREE.Group(); sh.position.set(sd * 0.34, 0.88, 0); torso.add(sh);
      armParts[sd < 0 ? 'shL' : 'shR'] = sh;
      // sode — large hanging shoulder guard, stack of curved lames
      const sode = new THREE.Group(); sode.position.set(sd * 0.16, 0.02, 0); sode.rotation.z = -sd * 0.12; sh.add(sode);
      [0, 1, 2, 3].forEach(i => lame(sode, 0.34, 0.14, 0.05, shell, m => { m.position.set(0, -0.02 - i * 0.13, -i * 0.01); m.rotation.x = 0.04; }));
      [0, 1, 2, 3].forEach(i => lame(sode, 0.3, 0.03, 0.02, silk, m => m.position.set(0, 0.02 - i * 0.13, 0.03)));
      // upper arm — cloth sleeve
      add(sh, new THREE.CylinderGeometry(0.11, 0.1, 0.42, 16), cloth, m => m.position.set(sd * 0.03, -0.28, 0));
      const el = new THREE.Group(); el.position.set(sd * 0.05, -0.5, 0); sh.add(el);
      armParts[sd < 0 ? 'elL' : 'elR'] = el;
      // kote — armoured forearm sleeve with plate + brass chain look
      add(el, new THREE.CylinderGeometry(0.1, 0.085, 0.44, 16), cloth, m => m.position.set(0, -0.24, 0));
      lame(el, 0.14, 0.34, 0.12, iron, m => m.position.set(0, -0.24, 0.05));
      [0, 1].forEach(i => add(el, new THREE.SphereGeometry(0.03, 10, 8), brass, m => m.position.set(0, -0.14 - i * 0.16, 0.11)));
      // gloved hand
      add(el, new THREE.SphereGeometry(0.08, 14, 12), skin, m => m.position.set(0, -0.5, 0.02));
    });

    // katana thrust through the obi on the left hip, blade angled back
    const sword = new THREE.Group(); sword.position.set(-0.34, 0.1, 0.02); sword.rotation.set(0.2, 0.15, 0.62); torso.add(sword);
    add(sword, new THREE.CylinderGeometry(0.022, 0.03, 1.5, 12), shell, m => m.position.y = 0.55); // saya (scabbard)
    add(sword, new THREE.CylinderGeometry(0.035, 0.035, 0.03, 22), brass, m => m.position.y = -0.22); // tsuba
    add(sword, new THREE.CylinderGeometry(0.03, 0.028, 0.26, 12), cord, m => m.position.y = -0.37); // tsuka wrap
    add(sword, new THREE.CylinderGeometry(0.033, 0.033, 0.035, 16), brass, m => m.position.y = -0.52); // kashira

    const head = new THREE.Group(); head.position.set(0, 1.16, 0); torso.add(head);
    // neck
    add(head, new THREE.CylinderGeometry(0.09, 0.1, 0.14, 14), skin, m => m.position.set(0, -0.16, 0));
    // face core (mostly hidden by menpo + kabuto)
    add(head, new THREE.SphereGeometry(0.2, 24, 18), skin, m => { m.scale.set(0.92, 1.02, 0.9); m.position.set(0, 0.02, 0); });
    // menpo — dark iron half-mask over lower face
    add(head, slab(0.32, 0.22, 0.18, 0.09), iron, m => { m.position.set(0, -0.11, 0.08); m.rotation.x = 0.2; });
    add(head, new THREE.SphereGeometry(0.05, 12, 10), iron, m => { m.scale.set(1.3, 0.7, 0.9); m.position.set(0, -0.19, 0.2); }); // chin
    add(head, new THREE.CylinderGeometry(0.012, 0.012, 0.16, 8), brass, m => { m.rotation.z = Math.PI / 2; m.position.set(0, -0.06, 0.22); }); // moustache bar
    // kabuto bowl (hachi)
    add(head, new THREE.SphereGeometry(0.26, 32, 20, 0, Math.PI * 2, 0, Math.PI * 0.62), shell, m => { m.scale.set(1.04, 1, 1.08); m.position.set(0, 0.08, 0); });
    // rivet ridges over the bowl
    for(let r = 0; r < 8; r++){
      const a = (r / 8) * Math.PI * 2;
      add(head, new THREE.CylinderGeometry(0.006, 0.006, 0.26, 6), brass, m => { m.position.set(Math.sin(a) * 0.16, 0.14, Math.cos(a) * 0.16); m.rotation.set(0.9, a, 0); });
    }
    add(head, new THREE.CylinderGeometry(0.03, 0.03, 0.05, 16), brass, m => m.position.set(0, 0.32, 0)); // tehen crown ring
    // mabizashi — front brim
    add(head, slab(0.4, 0.09, 0.12, 0.05), iron, m => { m.position.set(0, 0.13, 0.24); m.rotation.x = 0.5; });
    // fukigaeshi — flared side flanges, gold-edged
    [-1, 1].forEach(sd => { add(head, slab(0.14, 0.18, 0.03, 0.03), shell, m => { m.position.set(sd * 0.26, 0.16, 0.13); m.rotation.set(0, sd * 0.7, sd * 0.2); }); add(head, slab(0.05, 0.18, 0.02, 0.02), brass, m => { m.position.set(sd * 0.31, 0.16, 0.13); m.rotation.set(0, sd * 0.7, sd * 0.2); }); });
    // maedate — kuwagata horn crest, brass
    [-1, 1].forEach(sd => add(head, this._prong(THREE, 0.5, 0.03), brass, m => { m.position.set(sd * 0.06, 0.2, 0.24); m.rotation.set(-0.2, 0, -sd * 0.42); }));
    add(head, new THREE.SphereGeometry(0.045, 14, 12), brass, m => { m.scale.set(1, 1.5, 0.5); m.position.set(0, 0.26, 0.26); }); // centre crest ornament
    // shikoro — neck guard, stack of lames flaring at the back
    [0, 1, 2, 3].forEach(i => lame(head, 0.42 - i * 0.02, 0.09, 0.07, shell, m => { m.position.set(0, -0.02 - i * 0.08, -0.16 - i * 0.055); m.rotation.x = -1.0 - i * 0.12; }));
    [0, 1, 2, 3].forEach(i => lame(head, 0.4 - i * 0.02, 0.02, 0.02, silk, m => { m.position.set(0, 0.02 - i * 0.08, -0.14 - i * 0.055); m.rotation.x = -1.0 - i * 0.12; }));

    return { obj: root, geos, mats, glow, parts: { kind: 'figure', torso, head, ...armParts, ...legParts } };
  }
  _buildMonogram(THREE, shell){
    const extrude = { depth: 0.34, bevelEnabled: true, bevelThickness: 0.045, bevelSize: 0.038, bevelSegments: 4, curveSegments: 18 };
    const root = new THREE.Group(), geos = [];
    this._monoShapes(THREE).forEach((shape, i) => {
      const geo = new THREE.ExtrudeGeometry(shape, extrude);
      geos.push(geo);
      const m = new THREE.Mesh(geo, shell); m.position.x = i * 1.24; root.add(m);
    });
    const c = new THREE.Box3().setFromObject(root).getCenter(new THREE.Vector3());
    root.children.forEach(m => m.position.sub(c));
    return { obj: root, geos, mats: [], glow: null, parts: null };
  }
  async _initThree(){
    const cv = this.heroCanvas.current; if(!cv || this._three) return;
    const V = '0.160.0', CDN = `https://esm.sh/three@${V}`;
    let THREE;
    try { THREE = await import(/* @vite-ignore */ CDN); } catch(err){ console.warn('three.js unavailable', err); return; }
    if(!this.heroCanvas.current) return;
    const accent = this.props.heroColor || '#C4402C';
    const variant = this.props.heroMaterial || 'urushi';
    const bloomOn = this.props.heroBloom !== false;
    const reduce = this._reduce;
    const renderer = new THREE.WebGLRenderer({ canvas: cv, antialias: true, alpha: true, preserveDrawingBuffer: true });
    renderer.setPixelRatio(Math.min(devicePixelRatio, 1.75));
    renderer.setClearAlpha(0);
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.12;
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(34, 1, 0.1, 100);
    camera.position.set(0, 0, 5.4);
    const g = document.createElement('canvas'); g.width = 64; g.height = 256;
    const gx = g.getContext('2d');
    const grad = gx.createLinearGradient(0, 0, 0, 256);
    grad.addColorStop(0, '#FFFDF4'); grad.addColorStop(0.42, '#EDE7D8');
    grad.addColorStop(0.74, accent); grad.addColorStop(1, '#221E17');
    gx.fillStyle = grad; gx.fillRect(0, 0, 64, 256);
    const envTex = new THREE.CanvasTexture(g);
    envTex.mapping = THREE.EquirectangularReflectionMapping;
    envTex.colorSpace = THREE.SRGBColorSpace;
    const pmrem = new THREE.PMREMGenerator(renderer);
    scene.environment = pmrem.fromEquirectangular(envTex).texture;
    envTex.dispose(); pmrem.dispose();
    const base = { roughness: 0.28, metalness: 0.95, color: new THREE.Color(accent), envMapIntensity: 1.35 };
    const variants = {
      iridescent: { ...base, iridescence: 1, iridescenceIOR: 1.35, iridescenceThicknessRange: [120, 420] },
      glass: { color: new THREE.Color('#ffffff'), metalness: 0, roughness: 0.09, transmission: 1, thickness: 1.35, ior: 1.45, attenuationColor: new THREE.Color(accent), attenuationDistance: 2.4, envMapIntensity: 1.6 },
      lacquer: { color: new THREE.Color(accent), metalness: 0, roughness: 0.42, clearcoat: 1, clearcoatRoughness: 0.08, envMapIntensity: 1.05 },
      urushi: { color: new THREE.Color('#15130E'), metalness: 0, roughness: 0.44, clearcoat: 0.6, clearcoatRoughness: 0.26, envMapIntensity: 0.34 }
    };
    const mat = new THREE.MeshPhysicalMaterial(variants[variant] || variants.urushi);
    const which = this.props.heroObject || 'ronin';
    const built = which === 'monogram' ? this._buildMonogram(THREE, mat) : this._buildRonin(THREE, mat, accent);
    const { obj, geos, glow, parts } = built;
    const mats = [mat, ...built.mats];
    const bbox = new THREE.Box3().setFromObject(obj);
    const size = bbox.getSize(new THREE.Vector3());
    const fit = new THREE.Group();
    fit.position.copy(bbox.getCenter(new THREE.Vector3()).negate());
    fit.add(obj);
    const group = new THREE.Group(); group.add(fit); scene.add(group);
    const key = new THREE.DirectionalLight(0xfff3e0, 2.5); key.position.set(3, 4.4, 5);
    const rim = new THREE.DirectionalLight(new THREE.Color(accent), 3.1); rim.position.set(-4, 0.8, -3);
    const back = new THREE.DirectionalLight(new THREE.Color('#FF6A3D'), 2.7); back.position.set(1.4, 1.6, -5);
    const fill = new THREE.DirectionalLight(0xbfd8ff, 0.55); fill.position.set(-2.4, 1.2, 4);
    scene.add(key, rim, back, fill, new THREE.AmbientLight(0xffffff, 0.3));
    cv.style.filter = (bloomOn && variant !== 'urushi') ? `drop-shadow(0 0 12px ${accent}5C) drop-shadow(0 0 4px ${accent}47)` : 'none';
    if(glow && !bloomOn) glow._peak = 0.9;
    let baseScale = 1;
    const resize = () => {
      const w = cv.clientWidth || 1, h = cv.clientHeight || 1;
      renderer.setSize(w, h, false);
      camera.aspect = w / h; camera.updateProjectionMatrix();
      const tf = Math.tan(THREE.MathUtils.degToRad(camera.fov / 2)), camZ = camera.position.z;
      const sY = 0.9 * camZ * tf / (size.y / 2 + 0.44 * size.z * tf);
      const sX = 0.9 * camZ * tf * camera.aspect / (size.x / 2 + 0.44 * size.z * tf * camera.aspect);
      baseScale = Math.min(sY, sX);
    };
    resize();
    this._ro = new ResizeObserver(resize); this._ro.observe(cv);
    const t0 = performance.now(), DELAY = 900, DUR = 1700;
    const easeOut = p => 1 - Math.pow(1 - p, 3);
    let t = 0;
    const loop = (now) => {
      this._raf = requestAnimationFrame(loop);
      t += reduce ? 0 : 0.0045;
      const p = Math.min(1, Math.max(0, (now - t0 - DELAY) / DUR));
      const e = reduce ? 1 : easeOut(p);
      group.scale.setScalar(baseScale * (0.9 + 0.1 * e));
      group.position.y = (1 - e) * -0.5;
      const scroll = (window.scrollY || 0) * 0.00018;
      if(parts && parts.kind === 'figure'){
        const idle = Math.min(1, Math.max(0, (now - (this._lastMove || t0) - 2400) / 1400));
        const scan = Math.sin(t * 0.5) * 0.55;
        const aimY = (-this._tilt.y * 1.4) * (1 - idle) + scan * idle;
        const aimX = (this._tilt.x * 0.55) * (1 - idle) + Math.sin(t * 0.34) * 0.1 * idle;
        const breath = Math.sin(t * 0.95);
        obj.rotation.y = -0.26 + Math.sin(t * 0.22) * 0.05 + scroll;
        parts.torso.rotation.y = (1 - e) * -0.55 + aimY * 0.22;
        parts.torso.rotation.x = breath * 0.008;
        parts.torso.position.y = 1.78 + breath * 0.012;
        parts.head.rotation.y = aimY * 0.72;
        parts.head.rotation.x = (1 - e) * 0.4 + aimX * 0.5 + breath * 0.01;
        parts.head.rotation.z = aimY * -0.07;
        parts.shL.rotation.x = breath * 0.05 - 0.03; parts.shR.rotation.x = Math.sin(t * 0.95 + 0.8) * 0.05 - 0.03;
        parts.shL.rotation.z = 0.05 + breath * 0.015; parts.shR.rotation.z = -0.05 - breath * 0.015;
        parts.elL.rotation.x = -0.22 + breath * 0.03; parts.elR.rotation.x = -0.3 + Math.sin(t * 0.95 + 0.8) * 0.03;
        parts.hipL.rotation.x = 0.02; parts.hipR.rotation.x = -0.03;
        parts.kneeL.rotation.x = 0.05 + breath * 0.006; parts.kneeR.rotation.x = 0.02;
        if(glow){
          const boot = Math.max(0, (p - 0.5) / 0.5);
          const pk = glow._peak || 2;
          glow.emissiveIntensity = boot < 1 ? boot * pk * 0.5 * (0.4 + Math.random() * 0.9) : pk + Math.sin(t * 2.1) * 0.26;
        }
      } else {
        obj.rotation.y = (1 - e) * -1.15 + Math.sin(t * 0.85) * 0.16 - this._tilt.y * 0.5 + scroll;
        obj.rotation.x = Math.sin(t * 1.15) * 0.09 + this._tilt.x * 0.34;
        obj.rotation.z = (1 - e) * 0.35 + Math.cos(t * 0.7) * 0.045;
        obj.position.y = Math.sin(t * 1.6) * 0.085;
      }
      const pu = this._pulse ? Math.max(0, 1 - (now - this._pulse) / 700) : 0;
      const fov = 34 + Math.sin(pu * Math.PI) * 3.8;
      if(Math.abs(camera.fov - fov) > 0.002){ camera.fov = fov; camera.updateProjectionMatrix(); }
      renderer.render(scene, camera);
    };
    this._raf = requestAnimationFrame(loop);
    this._three = { renderer, scene, group, mats, geos };
  }
  _teardownThree(){
    if(this._ro){ this._ro.disconnect(); this._ro = null; }
    if(this._raf){ cancelAnimationFrame(this._raf); this._raf = null; }
    if(this._three){
      const { geos, mats, scene, renderer } = this._three;
      (geos || []).forEach(g => g.dispose());
      (mats || []).forEach(m => m.dispose());
      if(scene.environment) scene.environment.dispose();
      renderer.dispose();
      this._three = null;
    }
  }
  _initPlate(){
    // Reads live figures off the 3D scene and eases them into place. The point of the
    // plate is that nothing here is typed: if the scene changes, the numbers change.
    const wrap = this.plateWrap.current; if(!wrap) return;
    const show = { fps:0, meshes:0, tris:0, calls:0 };
    const target = { fps:0, meshes:0, tris:0, calls:0 };
    const fmt = (n) => Math.round(n).toLocaleString('en-US');
    let windows = 0;
    this._onStats = (e) => { windows++; if(windows > 3) Object.assign(target, e.detail || {}); };
    document.addEventListener('house-stats', this._onStats);
    let last = performance.now();
    const loop = () => {
      this._plateRaf = requestAnimationFrame(loop);
      const now = performance.now(), dt = Math.min((now - last)/1000, 0.05); last = now;
      const k = Math.min(1, dt * 4.5);
      ['fps','meshes','tris','calls'].forEach((key) => { show[key] += (target[key] - show[key]) * k; });
      const set = (ref, v) => { const el = ref.current; if(el) el.textContent = target.fps ? fmt(v) : '—'; };
      set(this.statFps, show.fps); set(this.statMesh, show.meshes);
      set(this.statTri, show.tris); set(this.statCall, show.calls);
      const lk = this.leak.current;
      if(lk && !this._reduce){
        const t = now/1000;
        const f = 1 + Math.sin(t*2.7)*0.1 + Math.sin(t*11.4)*0.06 + Math.sin(t*5.1)*0.04;
        lk.style.opacity = (0.82 * f).toFixed(3);
      }
      const d = this.plateDot.current;
      if(d) d.style.opacity = (0.55 + Math.sin(now/1000 * 2.2) * 0.4).toFixed(2);
      if(!this._reduce){
        const t = now/1000;
        wrap.style.transform = 'translate3d(' + (Math.sin(t*0.34)*4).toFixed(2) + 'px,' + (Math.cos(t*0.27)*3).toFixed(2) + 'px,0)';
      }
    };
    this._plateRaf = requestAnimationFrame(loop);
  }
  _teardownPlate(){
    if(this._plateRaf) cancelAnimationFrame(this._plateRaf);
    this._plateRaf = null;
    if(this._onStats){ document.removeEventListener('house-stats', this._onStats); this._onStats = null; }
  }
  _initSamurai(){
    // interactive illustrated samurai: cursor parallax + tilt, idle breathing sway,
    // and a katana-gleam sweep on hover / click. Pure DOM — no WebGL.
    const inner = this.samuraiInner.current; if(!inner || this._samRaf) return;
    const reduce = this._reduce;
    let t = 0, t0 = performance.now();
    const loop = (now) => {
      this._samRaf = requestAnimationFrame(loop);
      t += reduce ? 0 : 0.016;
      const boot = Math.min(1, (now - t0) / 1200);
      const ease = 1 - Math.pow(1 - boot, 3);
      const idle = Math.min(1, Math.max(0, (now - (this._lastMove || t0) - 2400) / 1600));
      // cursor aim when active, gentle autonomous drift when idle
      const aimY = (this._tilt.y * 9) * (1 - idle) + Math.sin(t * 0.32) * 3.2 * idle;
      const aimX = (this._tilt.x * 5) * (1 - idle) + Math.sin(t * 0.24) * 1.6 * idle;
      const float = Math.sin(t * 0.9) * 8;              // breathing rise/fall
      const rock = Math.sin(t * 0.7) * 0.5;             // slow shoulder rock
      const enter = (1 - ease) * 40;                    // settle up on load
      // chapter-change camera breath — the lens punches in for a beat
      const pu = this._pulse ? Math.max(0, 1 - (now - this._pulse) / 700) : 0;
      const punch = 1 + Math.sin(pu * Math.PI) * 0.024;
      inner.style.transform =
        `translate3d(${aimY.toFixed(2)}px, ${(float + enter).toFixed(2)}px, 0) ` +
        `rotateY(${(-aimY * 0.72).toFixed(2)}deg) rotateX(${(aimX * 0.55).toFixed(2)}deg) rotateZ(${rock.toFixed(2)}deg) ` +
        `scale(${punch.toFixed(4)})`;
      inner.style.opacity = ease.toFixed(3);
      if(!reduce && boot >= 1 && now - (this._lastSweep || t0) > 6500){ this._lastSweep = now; if(this._sweep) this._sweep(); }
    };
    this._samRaf = requestAnimationFrame(loop);
    // gleam sweep on interaction
    this._sweep = () => {
      const g = this.gleam.current; if(!g || reduce) return;
      g.animate([
        { opacity: 0, transform: 'translateX(-14%)' },
        { opacity: 1, transform: 'translateX(0%)', offset: 0.5 },
        { opacity: 0, transform: 'translateX(14%)' }
      ], { duration: 900, easing: 'cubic-bezier(.4,.1,.2,1)' });
    };
    const zone = this.heroObj.current;
    if(zone){
      zone.style.pointerEvents = 'auto'; zone.style.cursor = 'pointer';
      zone.addEventListener('pointerenter', this._sweep);
      zone.addEventListener('click', () => { this._sweep(); this._pulse = performance.now(); });
      this._samZone = zone;
    }
  }
  _teardownSamurai(){
    if(this._samRaf){ cancelAnimationFrame(this._samRaf); this._samRaf = null; }
    if(this._samZone && this._sweep){ this._samZone.removeEventListener('pointerenter', this._sweep); }
  }
  _csEnd(el){ if(el) el.toggleAttribute('data-end', el.scrollTop + el.clientHeight >= el.scrollHeight - 24); }
  componentDidUpdate(prev){
    if(!this._csBound){ this._csBound = true; document.addEventListener('scroll', e => { const s = e.target; if(s && s.matches && s.matches('[data-csscroll]')) this._csEnd(s); }, true); }
    if(this.state.caseIdx !== null) requestAnimationFrame(() => document.querySelectorAll('[data-csscroll]').forEach(el => { el.scrollTop = el.scrollTop; this._csEnd(el); }));
    const hs = document.querySelector('house-scene'); if(hs) hs.paused = !!(this.state.ql || this.state.quick || this.state.caseIdx !== null);
    if(prev.skyMode !== this.props.skyMode) this._sky();
    if(prev.heroObject !== this.props.heroObject){
      this._teardownThree(); this._teardownSamurai(); this._teardownPlate();
      const ho = this.props.heroObject || 'none';
      if(ho === 'monogram') this._initThree();
      return;
    }
    if((this.props.heroObject || 'none') === 'monogram' && (prev.heroMaterial !== this.props.heroMaterial || prev.heroColor !== this.props.heroColor || prev.heroBloom !== this.props.heroBloom)){
      this._teardownThree(); this._initThree();
    }
  }
  componentWillUnmount(){
    cancelAnimationFrame(this._beaconRaf);
    this._teardownPlate();
    window.removeEventListener('mousemove', this._move);
    if(this._plMove) removeEventListener('pointermove', this._plMove);
    if(this._plRaf) cancelAnimationFrame(this._plRaf);
    if(this._probeRaf) cancelAnimationFrame(this._probeRaf);
    if(this._travelRaf) cancelAnimationFrame(this._travelRaf);
    if(this._pRaf) cancelAnimationFrame(this._pRaf);
    if(this._stageEl){ this._stageEl.removeEventListener('wheel', this._wheel); this._stageEl.removeEventListener('touchstart', this._tStart); this._stageEl.removeEventListener('touchmove', this._tMove); this._stageEl.removeEventListener('touchend', this._tEnd); }
    if(this._key) window.removeEventListener('keydown', this._key);
    if(this._onResize) window.removeEventListener('resize', this._onResize);
    if(this._nav) document.removeEventListener('click', this._nav);
    if(this._wipeEl){ this._wipeEl.remove(); this._wipeEl = null; }
    if(this._fleckWrap){ this._fleckWrap.remove(); this._fleckWrap = null; }
    if(this._kick){ document.removeEventListener('pointerdown', this._kick); document.removeEventListener('keydown', this._kick); }
    this._ambientOff();
    this._teardownThree();
    this._teardownSamurai();
    if(this._cursorOff) this._cursorOff();
    if(this._actx) this._actx.close();
  }
  renderVals(){
    const v = this._renderVals();
    v.projects = v.projects.map(p => Object.assign({}, p, { stack: String(p.stack || '').replace(/ · /g, '\u00A0· '), stackItems: (a => a.length > 3 ? a.slice(0, 2).concat('+' + (a.length - 2)) : a)(String(p.stack || '').split(' · ').filter(Boolean)) }));
    v.heroStack = (v.skillsShipped || []).slice(0, 6);
    v.houseLive = !!v.house3d && this.state.sceneGo;
    v.socialsContact = (v.socials || []).filter(l => !/r[ée]sum[ée]|^email$/i.test(l.label));
    v.demos = v.projects.map(p => ({ title: p.title, stack: p.stack, shot: p.shot, live: !!p.demo, soon: !p.demo, line: 'Add expenses, push a budget over its limit, watch every number update.', open: () => this._qlPick('ledger') }));
    { const norm = s => String(s).toLowerCase().replace(/[^a-z+#]/g, ''), ship = (v.skillsShipped || []).map(norm);
      v.skillGroups = (v.skillGroups || []).map(g => ({ label: g.label, items: g.items.filter(s => { const x = norm(s); return !ship.some(y => y === x || y.indexOf(x) === 0 || x.indexOf(y) === 0); }) })).filter(g => g.items.length); }
    v.demoCount = v.demos.filter(d => d.live).length + ' live';
    v.qlLauncher = this.state.ql && !this.state.qlApp; v.qlInApp = this.state.ql && !!this.state.qlApp;
    v.qlCrumb = this.state.qlApp ? 'Quiet Ledger' : 'Demos';
    v.qlHome = () => this._qlHome();
    v.deskBeacon = this.deskBeacon; v.openDesk = () => { if(!this._modal()) this._openDemo(false, null); };
    v.projects = v.projects.map(p => Object.assign({}, p, { openDemo: () => this._openDemo(false, 'ledger') }));
    v.quickProjects = v.projects.map(p => Object.assign({}, p, { open: () => this._closeQuick(() => { this._backToQuick = true; this._openCase(p.i, null); }), openDemoQ: () => this._closeQuick(() => { this._backToQuick = true; this._openDemo(true, 'ledger'); }) }));
    v.openDemoNudge = () => this._openDemo(false, null);
    Object.assign(v, this._qlVals());
    return v;
  }
  _renderVals(){
    const cases = [
      {
        num: '01', slotBig: 'case1', shotBig: './shots/ql-phone-reports.webp', device: true, noDevice: false, title: 'Quiet Ledger', stack: 'React Native · Expo · TypeScript · Supabase · TanStack Query · RevenueCat', stackList: ['React Native','Expo','TypeScript','Supabase','TanStack Query','RevenueCat'],
        role: 'Solo — design, build, ship', period: 'Jun — Oct 2026', status: 'In App Review',
        problemLead: 'Most budgeting apps want your bank login, your attention, or both.', problem: 'Quiet Ledger is for people who just want to know “can I spend this today?” You log entries yourself; budgets, recurring bills and savings goals live in one quiet screen behind Face ID.',
        stats: [{ v: '~11K', k: 'lines of TypeScript, built solo' }, { v: '6/6', k: 'Postgres tables behind row-level security' }, { v: '0', k: 'bank logins or ads' }, { v: '2', k: 'native layouts — iPhone and iPad' }],
        hasTldr: true,
        tldr: [
          { n: '01', h: 'Built solo, end to end —', t: 'design, React Native app, Supabase backend, subscriptions.' },
          { n: '02', h: 'Submitted to Apple —', t: 'in App Review now, on iPhone and iPad.' },
          { n: '03', h: 'Secure by default —', t: 'every table row-locked, so users only ever see their own data.' }
        ],
        decisions: [
          { h: 'One number up front.', t: 'What’s left to spend today: monthly budget ÷ days remaining, recomputed on every entry.' },
          { h: 'Manual entry over bank sync.', t: 'No third-party credentials to store, nothing to break when a bank changes its API.' },
          { h: 'Atomic money moves.', t: 'Transfers run as Postgres functions, so a dropped connection can’t leave half a write.' },
          { h: 'Row-level security everywhere.', t: 'One user can never read another’s ledger, even with a leaked key.' }
        ],
        outcomeLead: 'Feature-complete and in Apple App Review.', outcome: 'Built with RevenueCat subscriptions, PDF/CSV export and a full account-deletion flow for App Store compliance.',
        learned: 'Shipping is mostly not code: the Paid Apps agreement, subscription metadata and signed QA held up the launch more than any bug.',
        links: [{ label: 'GitHub', href: 'https://github.com/Johnny-1211' }]
      },
      {
        num: '02', slotBig: 'case2', shotBig: './shots/fc-plan-dark.webp', device: true, noDevice: false, title: 'Focus Coach', stack: 'Swift 6 · SwiftUI · EventKit · Screen Time API · StoreKit 2 · On-device AI', stackList: ['Swift 6','SwiftUI','EventKit','Screen Time API','StoreKit 2','On-device AI'],
        role: 'Solo — design and build', period: '2026 — now', status: 'In development · TestFlight testing',
        hasTldr: true,
        tldr: [
          { n: '01', h: 'Calendar meets app blocker —', t: 'plans focus blocks in the gaps between meetings, then pauses distracting apps during them.' },
          { n: '02', h: 'Zero setup after day one —', t: 'commit the plan once; blocking starts and stops on its own.' },
          { n: '03', h: 'Private by design —', t: 'runs entirely on the phone. App Store label: “Data Not Collected”.' }
        ],
        stats: [{ v: '~6K', k: 'lines of Swift 6, built solo' }, { v: '61', k: 'unit tests on the planning core' }, { v: '0', k: 'servers, accounts or analytics' }, { v: '3', k: 'focus blocks planned around meetings' }],
        problemLead: 'The gaps between meetings are where real work should happen — and exactly where the phone takes over.', problem: 'Calendar tools like Reclaim and Clockwise protect that time on paper but can’t stop the scrolling. App blockers like Opal and one sec stop the scrolling but don’t know your calendar, so their schedules are wrong as soon as the day changes. Focus Coach does both.',
        decisions: [
          { h: 'Read the calendar, don’t replace it.', t: 'EventKit finds the free windows each weekday; nothing to import or sync.' },
          { h: 'Commit once, then hands off.', t: 'DeviceActivity schedules each block, and ManagedSettings shields the chosen apps only while it runs.' },
          { h: 'On-device only.', t: 'No backend means no account, no data to leak, and nothing to keep running.' },
          { h: 'A testable core.', t: 'Block sizing, meeting buffers and re-planning live in a separate Swift module with 61 unit tests, no UI needed.' }
        ],
        outcomeLead: 'Core loop built and in TestFlight testing.', outcome: 'StoreKit 2 subscription with a free trial, and a one-command TestFlight upload.',
        learned: 'Apple’s Screen Time APIs are powerful but tightly sandboxed — most of the design work was deciding what the app is allowed to know.',
        links: [{ label: 'GitHub', href: 'https://github.com/Johnny-1211' }]
      }

    ];
    return {
      soundOn: this.state.sound,
      soundLabel: this.state.sound ? 'Sound · On' : 'Sound · Off',
      soundDot: this.state.sound ? '#E0674F' : 'rgba(243,236,221,0.3)',
      soundWaveOp: this.state.sound ? 1 : 0, soundMuteOp: this.state.sound ? 0 : 0.7,
      openDeskDemo: () => { if(!this._modal()) this._openDemo(false, null); },
      toggleSound: () => {
        const on = !this.state.sound;
        this.setState({ sound: on });
        try { localStorage.setItem('jt_sound', on ? 'on' : 'off'); } catch(e){}
        if(on){ this._flute(); this._ambientOn(); } else this._ambientOff();
      },
      heroWord: this.props.heroWord || 'RONIN',
      house3d: (this.props.house3d ?? true) && !this._lite() && !(this.state.rec && this._recBoot),
      houseStill: (this.props.house3d ?? true) && this._lite(),
      loadLive: () => { try { localStorage.setItem('jt_live3d', '1'); } catch(e){} this.setState({ live3d: true }); },
      quickWrap: this.quickWrap,
      stillSrc: './assets/house-still-' + this._skyKey() + '.jpg',
      cycleSky: () => this._cycleSky(),
      skyLabel: (() => { const o = this.state.sky || this.props.skyMode || 'auto', N = { dawn: 'Dawn', noon: 'Day', dusk: 'Dusk', night: 'Night' }; return o === 'auto' ? 'Local · ' + N[this._skyAuto()] : N[o]; })(),
      skyGlyph: { dawn: '◒', noon: '○', dusk: '◐', night: '●' }[this._skyKey()],
      skySun: this._skyKey() === 'noon', skyRise: this._skyKey() === 'dawn' || this._skyKey() === 'dusk', skyMoon: this._skyKey() === 'night',
      copyLabel: this.state.copied ? 'Copied ✓' : 'Copy',
      copyStatus: this.state.copied ? 'Email address copied' : '',
      copyEmail: () => {
        const done = () => { this.setState({ copied: true }); clearTimeout(this._cpT); this._cpT = setTimeout(() => this.setState({ copied: false }), 1800); };
        const fb = () => { const ta = document.createElement('textarea'); ta.value = 'tamtingyuen@gmail.com'; ta.style.cssText = 'position:fixed;opacity:0'; document.body.appendChild(ta); ta.select(); try { document.execCommand('copy'); } catch(e){} ta.remove(); done(); };
        if(navigator.clipboard && navigator.clipboard.writeText) navigator.clipboard.writeText('tamtingyuen@gmail.com').then(done, fb); else fb();
      },
      quickOpen: this.state.quick,
      openQuick: () => this._openQuick(),
      closeQuick: () => this._closeQuick(),
      quickFacts: [
        { k: 'Status', v: 'Available full-time · replies within a day' },
        { k: 'Phone', v: '437-662-3588' },
        { k: 'Base', v: 'Toronto, ON or Hong Kong — open to either' },
        { k: 'Education', v: 'BSc (Hons) Computer Science, HKMU · Postgrad Mobile App Dev, George Brown — Dean’s List' },
        { k: 'Before code', v: 'Warehouse Supervisor at Hactl (2018–20) · Peer tutor at HKMU' }
      ],
      houseDrift: (this.props.houseDrift ?? true) ? 'true' : 'false',
      petalDrift: this.props.petalDrift ?? true,
      cursorRing: this.cursorRing, cursorDot: this.cursorDot,
      curtain: this.curtain, reel: this.reel, deepLayer: this.deepLayer,
      fogLayer: this.fogLayer, sunLayer: this.sunLayer,
      heroObj: this.heroObj, heroCanvas: this.heroCanvas, samuraiInner: this.samuraiInner, gleam: this.gleam,
      plateWrap: this.plateWrap, plateDot: this.plateDot, leak: this.leak,
      statFps: this.statFps, statMesh: this.statMesh, statTri: this.statTri, statCall: this.statCall,
      showMonogram: (this.props.heroObject || 'none') === 'monogram',
      showPlate: false,
      progressFill: this.progressFill, track: this.track,
      progressKnob: this.progressKnob, posNum: this.posNum,
      sunCore: this.sunCore, skyTint: this.skyTint, emberWrap: this.emberWrap,
      curtainMark: this.curtainMark, curtainLine: this.curtainLine, curtainEnso: this.curtainEnso, curtainBar: this.curtainBar, curtainSkip: this.curtainSkip,
      caseWrap: this.caseWrap,
      caseOpen: this.state.caseIdx !== null,
      cs: cases[this.state.caseIdx == null ? 0 : this.state.caseIdx],
      ledgerHave: ['Four years of deliberate practice', 'Two degrees, two continents', 'Builds weekly, writes decisions down', 'Native iOS and Android, then React Native'],
      ledgerLack: ['No industry role yet', 'No production traffic behind me', 'No on-call experience', 'No team larger than a class project'],
      chapters: [
        { i: 0, num: '01', label: 'Opening' },
        { i: 1, num: '02', label: 'Work' },
        { i: 2, num: '03', label: 'Path' },
        { i: 3, num: '04', label: 'Proof' },
        { i: 4, num: '05', label: 'Contact' }
      ],
      projects: [
        { i: 0, demo: true, repo: 'https://github.com/Johnny-1211', num: '01', slot: 'work1', shot: './shots/ql-phone-dashboard-v2.webp', shotL: './shots/ql-phone-budgets.webp', shotR: './shots/ql-phone-reports.webp', device: true, noDevice: false, title: 'Quiet Ledger', stack: 'React Native · TypeScript · Supabase', lift: '0px', chip: 'In App Review', result: 'Submitted to the App Store — iPhone + iPad', blurb: 'Answers one question — can I spend this today? — with no bank login and no ads. Designed, built and shipped solo.', stats: [{ v: '~11K', k: 'lines of TypeScript' }, { v: '6/6', k: 'tables row-locked' }, { v: '0', k: 'bank logins needed' }] },
        { i: 1, repo: 'https://github.com/Johnny-1211', num: '02', slot: 'work2', shot: './shots/fc-focus-dark.webp', shotL: './shots/fc-plan-dark.webp', shotR: './shots/fc-apps-dark.webp', device: true, noDevice: false, chip: 'TestFlight testing', result: 'Live on TestFlight — 100% on-device', title: 'Focus Coach', stack: 'Swift · SwiftUI · Screen Time API', lift: '20px', blurb: 'Reads your calendar, plans focus blocks between meetings, and pauses distracting apps during them — automatically.', stats: [{ v: '~6K', k: 'lines of Swift' }, { v: '61', k: 'unit tests on the core' }, { v: '0', k: 'servers or accounts' }] }
      ],
      skills: ['Swift', 'SwiftUI', 'Kotlin', 'Jetpack Compose', 'React Native', 'JavaScript', 'React', 'Node', 'Firebase', 'SQL', 'Git', 'Scrum'],
      skillsShipped: ['Swift 6', 'SwiftUI', 'StoreKit 2', 'React Native', 'TypeScript', 'Expo', 'Supabase', 'PostgreSQL', 'TanStack Query', 'RevenueCat'],
      skillGroups: [
        { label: 'Languages', items: ['Swift', 'TypeScript', 'JavaScript', 'Python', 'Java', 'Kotlin', 'SQL'] },
        { label: 'Web & backend', items: ['React', 'Node.js', 'REST APIs', 'PostgreSQL', 'Firebase', 'Google Cloud'] },
        { label: 'Workflow', items: ['Git', 'CI/CD', 'Unit testing', 'Code review', 'Agile/Scrum', 'Claude Code', 'Copilot'] }
      ],
      education: [
        { span: 'SEP 2023 — AUG 2024', school: 'George Brown College', award: 'Postgraduate Certificate — Mobile Application Development & Strategy · Dean’s Honour List, Fall 2023 & Winter 2024', place: 'Toronto, ON · Canada' },
        { span: 'SEP 2020 — AUG 2023', school: 'Hong Kong Metropolitan University', award: 'BSc (Hons) Computer Science · Dean’s Honour List, Fall 2021', place: 'Hong Kong SAR' }
      ],
      certs: [
        { tag: 'Certification', title: 'Scrum Fundamentals', issuer: 'SCRUMstudy Canada', year: '2024' },
        { tag: 'Postgraduate', title: 'Mobile App Dev & Strategy', issuer: 'George Brown College, Toronto', year: '2024' },
        { tag: 'Degree', title: 'BSc (Hons) Computer Science', issuer: 'Hong Kong Metropolitan University', year: '2023' }
      ],
      socials: [
        { label: 'GitHub', href: 'https://github.com/Johnny-1211' },
        { label: 'LinkedIn', href: 'https://www.linkedin.com/in/johnny-tam-b9374a246/' },
        { label: 'Email', href: 'mailto:tamtingyuen@gmail.com' },
        { label: 'Résumé', href: './Johnny-Tam-Resume.pdf' }
      ]
    };
  }
}

Component.defaultProps = {
  "house3d": true,
  "houseDrift": true,
  "heroWord": "RONIN",
  "petalDrift": true,
  "depthOfField": true,
  "skyMode": "auto",
  "heroObject": "none",
  "heroMaterial": "urushi",
  "heroColor": "#C4402C",
  "heroBloom": true,
  "liteMode": "auto"
};