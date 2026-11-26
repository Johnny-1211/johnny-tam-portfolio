import { Fragment } from 'react';
import { css, list, text } from './template.jsx';

export default function PortfolioView(v) {
  return (
    <div className="sc-host">
      <div style={{"background":"#0F0C09","color":"#F3ECDD","fontFamily":"'Zen Kaku Gothic New',Helvetica,sans-serif","WebkitFontSmoothing":"antialiased","position":"relative"}}>
        {' '}
        <div ref={v.curtain} style={{"position":"fixed","inset":"0","zIndex":"400","background":"#0B0906","pointerEvents":"none","display":"flex","flexDirection":"column","alignItems":"center","justifyContent":"center","gap":"16px"}}>
          <div style={{"position":"relative","display":"flex","alignItems":"center","justifyContent":"center","width":"clamp(150px,18vw,220px)","aspectRatio":"1"}}>
            <svg viewBox="0 0 100 100" aria-hidden="true" style={{"position":"absolute","inset":"0","width":"100%","height":"100%","overflow":"visible","transform":"rotate(-104deg)"}}>
              <circle ref={v.curtainEnso} cx="50" cy="50" r="46" fill="none" stroke="#B7301F" strokeWidth="2.6" strokeLinecap="round" pathLength="100" strokeDasharray="92 100" strokeDashoffset="92" />
            </svg>
            <span ref={v.curtainMark} style={{"fontFamily":"'Shippori Mincho B1',serif","fontWeight":"800","fontSize":"clamp(30px,5vw,64px)","letterSpacing":"0.05em","color":"rgba(243,236,221,0.9)","textTransform":"uppercase","position":"relative"}}>
              浪人
            </span>
          </div>
          <span ref={v.curtainLine} style={{"fontFamily":"'JetBrains Mono',monospace","fontSize":"10px","letterSpacing":"0.22em","textTransform":"uppercase","color":"rgba(243,236,221,0.62)"}} />
          <button type="button" ref={v.curtainSkip} style={{"position":"absolute","right":"clamp(20px,4vw,48px)","bottom":"clamp(20px,4vh,40px)","pointerEvents":"auto","display":"flex","alignItems":"center","gap":"10px","minHeight":"44px","padding":"0 16px","background":"transparent","border":"1px solid rgba(243,236,221,0.3)","color":"rgba(243,236,221,0.86)","fontFamily":"'JetBrains Mono',monospace","fontSize":"10.5px","letterSpacing":"0.2em","textTransform":"uppercase","cursor":"pointer"}} className="scp0">
            {"Skip intro "}
            <span style={{"color":"#E0674F"}}>
              →
            </span>
          </button>
          <div style={{"position":"relative","width":"140px","height":"1px","background":"rgba(243,236,221,0.16)","overflow":"hidden"}}>
            <div ref={v.curtainBar} style={{"position":"absolute","inset":"0","background":"#E0674F","transform":"scaleX(0)","transformOrigin":"left"}} />
          </div>
        </div>
        {' '}
        <div aria-hidden="true" style={{"position":"fixed","inset":"0","zIndex":"300","pointerEvents":"none","background":"radial-gradient(118% 92% at 50% 46%,rgba(0,0,0,0) 38%,rgba(0,0,0,0.18) 78%,rgba(0,0,0,0.4) 100%)"}} />
        {' '}
        <div aria-hidden="true" style={{"position":"fixed","left":"-60%","top":"-60%","width":"220%","height":"220%","zIndex":"301","pointerEvents":"none","opacity":"0.055","mixBlendMode":"overlay","backgroundImage":"url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='220' height='220'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.82' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='220' height='220' filter='url(%23n)'/%3E%3C/svg%3E\")"}} className={"grain"} />
        {' '}
        <div data-g="cursor" ref={v.cursorRing} aria-hidden="true" style={{"position":"fixed","left":"0","top":"0","zIndex":"320","pointerEvents":"none","width":"38px","height":"38px","margin":"-19px 0 0 -19px","border":"1px solid rgba(243,236,221,0.42)","borderRadius":"50%","opacity":"0","transition":"width .3s cubic-bezier(.2,.7,.2,1),height .3s cubic-bezier(.2,.7,.2,1),margin .3s cubic-bezier(.2,.7,.2,1),border-color .3s ease,background .3s ease,opacity .3s ease","display":"flex","alignItems":"center","justifyContent":"center","fontFamily":"'JetBrains Mono',monospace","fontSize":"8px","letterSpacing":"0.16em","textTransform":"uppercase","color":"transparent","overflow":"hidden","whiteSpace":"nowrap"}} />
        {' '}
        <div data-g="cursordot" ref={v.cursorDot} aria-hidden="true" style={{"position":"fixed","left":"0","top":"0","zIndex":"321","pointerEvents":"none","width":"4px","height":"4px","margin":"-2px 0 0 -2px","borderRadius":"50%","background":"#E0674F","opacity":"0","transition":"opacity .3s ease"}} />
        {' '}
        <div data-g="track" ref={v.track} style={{"position":"relative"}}>
          {' '}
          <div data-g="stage" style={{"position":"relative","height":"100vh","overflow":"hidden"}}>
            {' '}
            <div data-g="house3d" style={{"position":"absolute","inset":"0","zIndex":"1","pointerEvents":"none","overflow":"hidden"}}>
              {' '}
              {v.house3d ? (
                <>
                  {' '}
                  <div aria-hidden="true" style={css("position:absolute;inset:0;background-image:url(" + (v.stillSrc ?? '') + ");background-size:cover;background-position:38% 50%;background-color:#0B0906")} />
                  {' '}
                  {v.houseLive ? (
                    <>
                      {' '}
                      <div className="sc-host-x" style={{ display: 'contents' }}>
                        <house-scene tone={"dusk"} drift={v.houseDrift} />
                      </div>
                      {' '}
                    </>
                  ) : null}
                  {' '}
                </>
              ) : null}
              {' '}
              {v.houseStill ? (
                <>
                  {' '}
                  <div aria-hidden="true" style={css("position:absolute;inset:0;background-image:url(" + (v.stillSrc ?? '') + ");background-size:cover;background-position:38% 50%")} className={"kb"} />
                  {' '}
                </>
              ) : null}
              {' '}
            </div>
            {' '}
            <div data-g="vscrim" style={{"position":"absolute","inset":"0","zIndex":"2","pointerEvents":"none","background":"linear-gradient(180deg,rgba(11,9,6,0.5) 0%,rgba(11,9,6,0.1) 24%,rgba(11,9,6,0.12) 64%,rgba(11,9,6,0.48) 100%)","WebkitMaskImage":"radial-gradient(13vh 14vh at 9% 88%,transparent 0%,rgba(0,0,0,0.42) 42%,#000 80%)","maskImage":"radial-gradient(13vh 14vh at 9% 88%,transparent 0%,rgba(0,0,0,0.42) 42%,#000 80%)"}} />
            {' '}
            <div data-g="vscrim" style={{"position":"absolute","inset":"0","zIndex":"2","pointerEvents":"none","background":"linear-gradient(90deg,rgba(11,9,6,0.44) 0%,rgba(11,9,6,0.14) 40%,rgba(11,9,6,0) 72%,rgba(11,9,6,0.08) 100%)","WebkitMaskImage":"radial-gradient(13vh 14vh at 9% 88%,transparent 0%,rgba(0,0,0,0.42) 42%,#000 80%)","maskImage":"radial-gradient(13vh 14vh at 9% 88%,transparent 0%,rgba(0,0,0,0.42) 42%,#000 80%)"}} />
            {' '}
            {' '}
            <div data-g="leak" ref={v.leak} style={{"position":"absolute","inset":"0","zIndex":"3","pointerEvents":"none","mixBlendMode":"screen","background":"radial-gradient(11vh 12vh at 9% 88%,rgba(255,186,116,0.34) 0%,rgba(226,116,66,0.15) 40%,rgba(226,116,66,0) 74%)"}} />
            {' '}
            <div style={{"position":"absolute","inset":"0","zIndex":"210","pointerEvents":"none","opacity":"0.35","mixBlendMode":"overlay","backgroundImage":"url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='240' height='240'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3CfeColorMatrix type='saturate' values='0'/%3E%3C/filter%3E%3Crect width='240' height='240' filter='url(%23n)' opacity='0.34'/%3E%3C/svg%3E\")"}} />
            {' '}
            <div data-g="vscrim" style={{"position":"absolute","inset":"0","zIndex":"9","pointerEvents":"none","background":"radial-gradient(130% 120% at 62% 42%,rgba(15,12,9,0) 56%,rgba(11,9,6,0.32) 100%)"}} />
            {' '}
            <div data-g="vscrim" ref={v.skyTint} style={{"position":"absolute","inset":"0","zIndex":"10","pointerEvents":"none","mixBlendMode":"soft-light","transition":"background 1.4s ease"}} />
            {' '}
            <header data-g="hdr" style={{"position":"absolute","top":"0","left":"0","right":"0","zIndex":"120","display":"grid","gridTemplateColumns":"minmax(0,auto) minmax(0,1fr) auto","alignItems":"center","gap":"20px","padding":"16px 30px","background":"linear-gradient(180deg,rgba(11,9,6,0.92) 0%,rgba(11,9,6,0.82) 62%,rgba(11,9,6,0.58) 86%,rgba(11,9,6,0) 100%)","backdropFilter":"blur(8px)","color":"#F3ECDD"}}>
              <a href="#" data-goto="0" style={{"display":"flex","alignItems":"center","gap":"11px","color":"#F3ECDD"}}>
                <svg viewBox="0 0 64 64" width="28" height="28" style={{"display":"block","flex":"none","overflow":"visible"}}>
                  {' '}
                  <circle cx="32" cy="32" r="30.2" fill="none" stroke="currentColor" strokeWidth="2.4" />
                  {' '}
                  <circle cx="32" cy="32" r="24" fill="none" stroke="currentColor" strokeWidth="1.01" opacity="0.55" />
                  {' '}
                  <g fill="currentColor">
                    {' '}
                    <path d="M32,9 Q38.6,21 32,30.6 Q25.4,21 32,9 Z" />
                    {' '}
                    <path d="M32,9 Q38.6,21 32,30.6 Q25.4,21 32,9 Z" transform="rotate(90 32 32)" />
                    {' '}
                    <path d="M32,9 Q38.6,21 32,30.6 Q25.4,21 32,9 Z" transform="rotate(180 32 32)" />
                    {' '}
                    <path d="M32,9 Q38.6,21 32,30.6 Q25.4,21 32,9 Z" transform="rotate(270 32 32)" />
                    {' '}
                    <circle cx="32" cy="32" r="3.3" />
                    {' '}
                  </g>
                  {' '}
                </svg>
                <span data-g="brand" style={{"display":"flex","alignItems":"baseline","gap":"9px","fontFamily":"'Shippori Mincho B1',serif","fontWeight":"800","fontSize":"18px","letterSpacing":"0.05em","textTransform":"uppercase"}}>
                  JOHNNY TAM
                  <span style={{"fontFamily":"'JetBrains Mono',monospace","fontWeight":"400","fontSize":"9px","letterSpacing":"0.2em","color":"rgba(243,236,221,0.66)"}} title="浪人 — Ronin: a samurai without a master. Open to the right team.">
                    SOFTWARE ENGINEER
                  </span>
                </span>
              </a>
              <nav data-g="hnav" style={{"display":"flex","gap":"4px","justifyContent":"center","fontFamily":"'JetBrains Mono',monospace","fontSize":"10px","letterSpacing":"0.14em","textTransform":"uppercase"}}>
                <button type="button" onClick={v.openQuick} aria-haspopup="dialog" style={{"display":"flex","alignItems":"center","gap":"8px","padding":"8px 12px","background":"transparent","border":"none","cursor":"pointer","font":"inherit","letterSpacing":"inherit","textTransform":"inherit","color":"#F3ECDD"}} className="scp1">
                  <span style={{"color":"#E0674F"}}>
                    ◷
                  </span>
                  {" Recruiter mode"}
                </button>
                <a href="./Johnny-Tam-Resume.pdf" download="" style={{"display":"flex","alignItems":"center","gap":"8px","padding":"8px 12px","color":"rgba(243,236,221,0.7)"}} className="scp2">
                  {"Résumé "}
                  <span style={{"color":"#E0674F"}}>
                    ↓
                  </span>
                </a>
              </nav>
              <div style={{"display":"flex","alignItems":"center","gap":"12px","justifySelf":"end"}}>
                <button type="button" data-tip={"Time of day · " + (v.skyLabel ?? '')} onClick={v.cycleSky} aria-label={"Time of day: " + (v.skyLabel ?? '') + ". Click to change."} style={{"position":"relative","display":"flex","alignItems":"center","justifyContent":"center","width":"38px","height":"38px","padding":"0","background":"transparent","border":"1px solid rgba(243,236,221,0.24)","cursor":"pointer","color":"rgba(243,236,221,0.82)"}} className="scp3">
                  {v.skySun ? (
                    <>
                      <svg viewBox="0 0 24 24" width="17" height="17" fill="none" stroke="#E0674F" strokeWidth="1.6" strokeLinecap="round" aria-hidden="true" style={{"display":"block"}}>
                        <circle cx="12" cy="12" r="4" />
                        <path d="M12 2.5v2.2M12 19.3v2.2M2.5 12h2.2M19.3 12h2.2M5.3 5.3l1.6 1.6M17.1 17.1l1.6 1.6M5.3 18.7l1.6-1.6M17.1 6.9l1.6-1.6" />
                      </svg>
                    </>
                  ) : null}
                  {v.skyRise ? (
                    <>
                      <svg viewBox="0 0 24 24" width="17" height="17" fill="none" stroke="#E0674F" strokeWidth="1.6" strokeLinecap="round" aria-hidden="true" style={{"display":"block"}}>
                        <path d="M7 17a5 5 0 0 1 10 0" />
                        <path d="M3 17h18M7 21h10M12 5.5v2.5M5.6 9.6l1.5 1.5M18.4 9.6l-1.5 1.5" />
                      </svg>
                    </>
                  ) : null}
                  {v.skyMoon ? (
                    <>
                      <svg viewBox="0 0 24 24" width="17" height="17" fill="none" stroke="#E0674F" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" style={{"display":"block"}}>
                        <path d="M20 14.5A8 8 0 1 1 9.5 4a6.5 6.5 0 0 0 10.5 10.5z" />
                      </svg>
                    </>
                  ) : null}
                </button>
                <button type="button" data-tip={v.soundLabel} onClick={v.toggleSound} aria-pressed={v.soundOn} aria-label="Traditional sound" style={{"position":"relative","display":"flex","alignItems":"center","justifyContent":"center","width":"38px","height":"38px","padding":"0","background":"transparent","border":"1px solid rgba(243,236,221,0.24)","cursor":"pointer","color":"rgba(243,236,221,0.82)"}} className="scp3">
                  <svg viewBox="0 0 24 24" width="17" height="17" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" style={{"display":"block"}}>
                    <path d="M4 9.5h3.5L12 6v12l-4.5-3.5H4z" />
                    <path d="M15.5 9.5a3.6 3.6 0 0 1 0 5M18 7a7 7 0 0 1 0 10" stroke="#E0674F" style={css("opacity:" + (v.soundWaveOp ?? '') + ";transition:opacity .3s ease")} />
                    <path d="M15.5 9.5l5 5M20.5 9.5l-5 5" style={css("opacity:" + (v.soundMuteOp ?? '') + ";transition:opacity .3s ease")} />
                  </svg>
                </button>
                <a data-g="hire" href="#" data-goto="4" style={{"fontFamily":"'JetBrains Mono',monospace","fontSize":"10px","letterSpacing":"0.13em","textTransform":"uppercase","background":"#B7301F","color":"#F5F0E3","padding":"10px 17px","fontWeight":"500"}} className="scp4">
                  Hire me
                </a>
              </div>
            </header>
            {' '}
            <nav data-g="hkeys" aria-label="House objects" style={{"position":"absolute","left":"30px","top":"72px","zIndex":"121","display":"flex","flexWrap":"wrap","alignItems":"center","gap":"8px","padding":"10px 12px","background":"rgba(11,9,6,0.92)","border":"1px solid rgba(243,236,221,0.22)","fontFamily":"'JetBrains Mono',monospace","fontSize":"11px","letterSpacing":"0.12em","textTransform":"uppercase"}}>
              <span style={{"color":"rgba(243,236,221,0.66)","paddingRight":"4px"}}>
                家 House objects
              </span>
              <button type="button" onClick={v.cycleSky} style={{"display":"flex","alignItems":"center","minHeight":"36px","padding":"0 12px","background":"transparent","border":"1px solid rgba(243,236,221,0.3)","cursor":"pointer","font":"inherit","letterSpacing":"inherit","textTransform":"inherit","color":"#F3ECDD"}}>
                Lantern · time of day
              </button>
              <button type="button" data-goto="2" style={{"display":"flex","alignItems":"center","minHeight":"36px","padding":"0 12px","background":"transparent","border":"1px solid rgba(243,236,221,0.3)","cursor":"pointer","font":"inherit","letterSpacing":"inherit","textTransform":"inherit","color":"#F3ECDD"}}>
                Bookshelf · skills
              </button>
              <button type="button" onClick={v.openDeskDemo} aria-haspopup="dialog" style={{"display":"flex","alignItems":"center","minHeight":"36px","padding":"0 12px","background":"transparent","border":"1px solid rgba(243,236,221,0.3)","cursor":"pointer","font":"inherit","letterSpacing":"inherit","textTransform":"inherit","color":"#F3ECDD"}}>
                Laptop · live demo
              </button>
              <button type="button" data-goto="4" style={{"display":"flex","alignItems":"center","minHeight":"36px","padding":"0 12px","background":"transparent","border":"1px solid rgba(243,236,221,0.3)","cursor":"pointer","font":"inherit","letterSpacing":"inherit","textTransform":"inherit","color":"#F3ECDD"}}>
                Letter · contact
              </button>
            </nav>
            {' '}
            {' '}
            <div data-g="deep" ref={v.deepLayer} style={{"position":"absolute","inset":"0","zIndex":"2","pointerEvents":"none","willChange":"transform"}}>
              {' '}
              <div ref={v.fogLayer} style={{"position":"absolute","inset":"-12% -8%","opacity":"0.34","willChange":"transform"}}>
                {' '}
                <svg viewBox="0 0 1200 820" preserveAspectRatio="xMidYMid slice" style={{"width":"100%","height":"100%","display":"block"}}>
                  {' '}
                  <defs>
                    <filter id="fog1" x="-30%" y="-30%" width="160%" height="160%">
                      <feTurbulence type="fractalNoise" baseFrequency="0.0015 0.0032" numOctaves="5" seed="14" result="f" />
                      <feColorMatrix in="f" type="matrix" values="0 0 0 0 0.11  0 0 0 0 0.10  0 0 0 0 0.08  0 0 0 0.85 0" />
                    </filter>
                  </defs>
                  {' '}
                  <rect width="1200" height="820" filter="url(#fog1)" />
                  {' '}
                </svg>
                {' '}
              </div>
              {' '}
              <div ref={v.heroObj} style={{"position":"absolute","right":"2%","top":"0","width":"min(64vw,940px)","height":"100vh","willChange":"transform","perspective":"1500px","perspectiveOrigin":"58% 42%"}}>
                {' '}
                {v.showMonogram ? (
                  <>
                    {' '}
                    <canvas ref={v.heroCanvas} style={{"position":"absolute","inset":"0","width":"100%","height":"100%","display":"block"}} />
                    {' '}
                  </>
                ) : null}
                {' '}
              </div>
              {' '}
            </div>
            {' '}
            {v.petalDrift ? (
              <>
                {' '}
                <div style={{"position":"absolute","inset":"0","zIndex":"8","pointerEvents":"none","overflow":"hidden"}}>
                  {' '}
                  <span style={{"left":"8%","animationDuration":"22s","animationDelay":"0s"}} className={"pt"} />
                  {' '}
                  <span style={{"left":"24%","width":"8px","height":"8px","animationDuration":"27s","animationDelay":"6s"}} className={"pt"} />
                  {' '}
                  <span style={{"left":"44%","width":"13px","height":"13px","animationDuration":"18s","animationDelay":"3s"}} className={"pt"} />
                  {' '}
                  <span style={{"left":"63%","width":"9px","height":"9px","animationDuration":"25s","animationDelay":"11s"}} className={"pt"} />
                  {' '}
                  <span style={{"left":"82%","width":"12px","height":"12px","animationDuration":"20s","animationDelay":"8s"}} className={"pt"} />
                  {' '}
                  <span style={{"left":"93%","width":"10px","height":"10px","animationDuration":"24s","animationDelay":"15s"}} className={"pt"} />
                  {' '}
                </div>
                {' '}
              </>
            ) : null}
            {' '}
            <div ref={v.emberWrap} style={{"position":"absolute","inset":"0","zIndex":"8","pointerEvents":"none","overflow":"hidden","transition":"opacity 1.6s ease"}}>
              {' '}
              <span style={{"left":"58%","--dx":"-34px","animationDuration":"6.4s","animationDelay":"0s"}} className={"em"} />
              {' '}
              <span style={{"left":"65%","width":"4px","height":"4px","--dx":"22px","animationDuration":"7.8s","animationDelay":"1.6s"}} className={"em"} />
              {' '}
              <span style={{"left":"71%","width":"6px","height":"6px","--dx":"-18px","animationDuration":"5.9s","animationDelay":"3.1s"}} className={"em"} />
              {' '}
              <span style={{"left":"77%","width":"4px","height":"4px","--dx":"30px","animationDuration":"8.6s","animationDelay":"0.8s"}} className={"em"} />
              {' '}
              <span style={{"left":"83%","width":"5px","height":"5px","--dx":"-26px","animationDuration":"6.9s","animationDelay":"4.2s"}} className={"em"} />
              {' '}
              <span style={{"left":"62%","width":"3px","height":"3px","--dx":"14px","animationDuration":"9.2s","animationDelay":"2.4s"}} className={"em"} />
              {' '}
              <span style={{"left":"74%","width":"4px","height":"4px","--dx":"-20px","animationDuration":"7.2s","animationDelay":"5.5s"}} className={"em"} />
              {' '}
            </div>
            {' '}
            {' '}
            <div data-g="reel" ref={v.reel} style={{"position":"absolute","inset":"0","zIndex":"15","display":"flex","width":"500vw","height":"100vh","willChange":"transform"}}>
              <section data-g="panel" data-panel="" data-chapter="0" tabIndex="-1" aria-label="Chapter one — Opening" style={{"position":"relative","width":"100vw","height":"100vh","flex":"none","overflow":"hidden","display":"flex","alignItems":"center","padding":"100px clamp(30px,6vw,110px) 96px","paddingLeft":"clamp(82px,10vw,150px)"}}>
                <div style={{"position":"absolute","inset":"0","display":"flex","alignItems":"center","justifyContent":"center","pointerEvents":"none","zIndex":"1"}}>
                  <span data-word="" data-op="0.04" style={{"fontFamily":"'Shippori Mincho B1',serif","fontWeight":"800","fontSize":"min(46vh,440px)","lineHeight":"0.78","letterSpacing":"0.02em","color":"rgba(243,236,221,0.04)","WebkitTextStroke":"1px rgba(243,236,221,0.06)","textTransform":"uppercase","whiteSpace":"nowrap"}}>
                    {text(v.heroWord)}
                  </span>
                </div>
                <div data-g="markv" style={{"position":"absolute","left":"clamp(18px,3vw,44px)","top":"50%","transform":"translateY(-50%)","display":"flex","flexDirection":"column","alignItems":"center","gap":"14px","zIndex":"4"}}>
                  <span style={{"fontFamily":"'Shippori Mincho B1',serif","fontSize":"34px","color":"rgba(243,236,221,0.66)"}}>
                    序
                  </span>
                  <span style={{"width":"1px","height":"70px","background":"rgba(243,236,221,0.25)"}} />
                  <span style={{"writingMode":"vertical-rl","fontFamily":"'JetBrains Mono',monospace","fontSize":"10px","letterSpacing":"0.3em","color":"rgba(243,236,221,0.78)","textTransform":"uppercase"}}>
                    Opening
                  </span>
                  <span data-room="" style={{"writingMode":"vertical-rl","fontFamily":"'JetBrains Mono',monospace","fontSize":"11px","letterSpacing":"0.22em","color":"rgba(243,236,221,0.66)","textTransform":"uppercase"}}>
                    門 · The gate
                  </span>
                </div>
                <div aria-hidden="true" style={{"position":"absolute","left":"0","top":"0","bottom":"0","width":"min(74%,980px)","pointerEvents":"none","zIndex":"2","background":"radial-gradient(112% 74% at 6% 46%,rgba(8,6,4,0.95) 0%,rgba(8,6,4,0.78) 34%,rgba(8,6,4,0.4) 62%,rgba(8,6,4,0) 88%)"}} />
                <div aria-hidden="true" style={{"position":"absolute","right":"0","top":"0","bottom":"0","width":"46%","pointerEvents":"none","zIndex":"2","background":"radial-gradient(58% 52% at 74% 58%,rgba(224,103,79,0.09) 0%,rgba(11,9,6,0) 72%)"}} />
                <div data-g="onow" style={{"position":"absolute","right":"clamp(30px,6vw,110px)","top":"100px","bottom":"96px","zIndex":"5","justifyContent":"center","display":"flex","flexDirection":"column","gap":"22px","paddingLeft":"22px","borderLeft":"1px solid rgba(243,236,221,0.22)","textAlign":"left","maxWidth":"250px"}}>
                  <div style={{"display":"flex","flexDirection":"column","gap":"6px"}}>
                    <span style={{"fontFamily":"'JetBrains Mono',monospace","fontSize":"8.5px","letterSpacing":"0.22em","textTransform":"uppercase","color":"rgba(243,236,221,0.66)"}}>
                      現在 — Now
                    </span>
                    <span style={{"fontFamily":"'Shippori Mincho B1',serif","fontWeight":"600","fontSize":"18px","lineHeight":"1.32","color":"rgba(243,236,221,0.92)","textWrap":"pretty"}}>
                      Quiet Ledger in App Review — open to full-time roles
                    </span>
                  </div>
                  <div data-g="ohouse" style={{"display":"flex","flexDirection":"column","gap":"6px"}}>
                    <span style={{"fontFamily":"'JetBrains Mono',monospace","fontSize":"8.5px","letterSpacing":"0.22em","textTransform":"uppercase","color":"rgba(243,236,221,0.66)"}}>
                      家 — The house
                    </span>
                    <span style={{"fontSize":"13px","lineHeight":"1.45","color":"rgba(243,236,221,0.82)"}}>
                      It responds. Try the lantern, the bookshelf, the laptop.
                    </span>
                  </div>
                  <div style={{"display":"flex","alignItems":"center","gap":"9px","paddingTop":"4px"}}>
                    <span style={{"width":"6px","height":"6px","borderRadius":"50%","background":"#7FBF6A","boxShadow":"0 0 9px rgba(127,191,106,0.8)","display":"block","animation":"pulse 2.6s ease-in-out infinite"}} />
                    <span style={{"fontFamily":"'JetBrains Mono',monospace","fontSize":"9px","letterSpacing":"0.16em","textTransform":"uppercase","color":"rgba(243,236,221,0.8)"}}>
                      Available full-time
                    </span>
                  </div>
                </div>
                <div data-g="ocol" data-fit="" style={{"position":"relative","zIndex":"5","maxWidth":"640px","display":"flex","flexDirection":"column","gap":"18px"}}>
                  <div data-anim="" style={{"display":"flex","alignItems":"center","gap":"12px","fontFamily":"'JetBrains Mono',monospace","fontSize":"10px","letterSpacing":"0.2em","textTransform":"uppercase","color":"rgba(243,236,221,0.66)"}}>
                    <span style={{"width":"34px","height":"1px","background":"#E0674F","display":"block"}} />
                    Mobile · web · backend — Toronto · Hong Kong
                  </div>
                  <h1 data-g="oh1" style={{"margin":"0","fontFamily":"'Shippori Mincho B1',serif","fontWeight":"800","textTransform":"uppercase","fontSize":"clamp(36px,4.8vw,80px)","lineHeight":"0.94","letterSpacing":"-0.005em"}}>
                    {' '}
                    <span data-anim="" style={{"display":"block"}}>
                      SOFTWARE
                    </span>
                    {' '}
                    <span data-anim="" style={{"display":"block"}}>
                      ENGINEER.
                    </span>
                    {' '}
                    <span data-anim="" style={{"display":"block","color":"#E0674F"}}>
                      TWO APPS,
                    </span>
                    {' '}
                    <span data-anim="" style={{"display":"block","color":"#E0674F"}}>
                      built solo.
                    </span>
                    {' '}
                  </h1>
                  <p data-anim="" data-g="olede" style={{"margin":"0","fontSize":"15px","lineHeight":"1.72","maxWidth":"420px","color":"rgba(243,236,221,0.76)","textWrap":"pretty"}}>
                    Honours computer science in Hong Kong. Postgraduate mobile development in Toronto. Four years of deliberate practice — looking for the first team worth building for, in Toronto or Hong Kong.
                  </p>
                  <div data-anim="" data-g="ostack" style={{"display":"flex","flexWrap":"wrap","gap":"6px"}}>
                    {list(v.heroStack).map((s, i) => (
                      <Fragment key={i}>
                        <span style={{"fontFamily":"'JetBrains Mono',monospace","fontSize":"11px","letterSpacing":"0.08em","textTransform":"uppercase","border":"1px solid rgba(243,236,221,0.3)","background":"rgba(11,9,6,0.5)","padding":"5px 9px","color":"rgba(243,236,221,0.9)"}}>
                          {text(s)}
                        </span>
                      </Fragment>
                    ))}
                  </div>
                  <div data-anim="" style={{"display":"flex","gap":"10px","flexWrap":"wrap"}}>
                    <a href="#" data-goto="1" style={{"background":"#B7301F","color":"#F5F0E3","padding":"15px 25px","fontSize":"15px","fontWeight":"500"}} className="scp4">
                      See the work →
                    </a>
                    <a href="#" data-goto="4" style={{"border":"1px solid rgba(243,236,221,0.34)","padding":"15px 23px","fontSize":"15px","color":"#F3ECDD"}} className="scp5">
                      Contact
                    </a>
                  </div>
                  <div data-anim="" data-g="oquick" style={{"display":"flex","flexWrap":"wrap","gap":"6px 22px","fontFamily":"'JetBrains Mono',monospace","fontSize":"11px","letterSpacing":"0.14em","textTransform":"uppercase"}}>
                    <button type="button" onClick={v.openQuick} aria-haspopup="dialog" style={{"display":"flex","alignItems":"center","gap":"7px","padding":"6px 0","background":"transparent","border":"none","borderBottom":"1px solid rgba(243,236,221,0.3)","cursor":"pointer","font":"inherit","letterSpacing":"inherit","textTransform":"inherit","color":"#F3ECDD"}} className="scp1">
                      {"Recruiter mode "}
                      <span style={{"color":"#E0674F"}}>
                        ◷
                      </span>
                    </button>
                    <a data-g="oresume" href="./Johnny-Tam-Resume.pdf" download="" style={{"display":"flex","alignItems":"center","gap":"7px","padding":"6px 0","color":"#F3ECDD","borderBottom":"1px solid rgba(243,236,221,0.3)"}} className="scp1">
                      {"Résumé PDF "}
                      <span style={{"color":"#E0674F"}}>
                        ↓
                      </span>
                    </a>
                    {v.houseStill ? (
                      <>
                        <button type="button" onClick={v.loadLive} title="This device got a still image to save battery" style={{"display":"flex","alignItems":"center","gap":"7px","padding":"6px 0","background":"transparent","border":"none","borderBottom":"1px dashed rgba(243,236,221,0.4)","cursor":"pointer","font":"inherit","letterSpacing":"inherit","textTransform":"inherit","color":"rgba(243,236,221,0.86)"}} className="scp1">
                          {"Load live 3D "}
                          <span style={{"color":"#E0674F"}}>
                            ↻
                          </span>
                        </button>
                      </>
                    ) : null}
                  </div>
                  <div data-anim="" data-g="ostats" style={{"display":"grid","gridTemplateColumns":"auto auto","gap":"9px clamp(24px,3vw,46px)","paddingTop":"15px","borderTop":"1px solid rgba(243,236,221,0.2)","width":"fit-content"}}>
                    <span style={{"fontFamily":"'JetBrains Mono',monospace","fontSize":"8.5px","letterSpacing":"0.17em","textTransform":"uppercase","color":"rgba(243,236,221,0.66)"}}>
                      What I have
                    </span>
                    <span style={{"fontFamily":"'JetBrains Mono',monospace","fontSize":"8.5px","letterSpacing":"0.17em","textTransform":"uppercase","color":"rgba(243,236,221,0.78)"}}>
                      What I don’t — yet
                    </span>
                    <div style={{"display":"flex","flexDirection":"column","gap":"6px"}}>
                      {list(v.ledgerHave).map((h, i) => (
                        <Fragment key={i}>
                          <span style={{"fontSize":"13px","lineHeight":"1.35","color":"rgba(243,236,221,0.82)"}}>
                            {text(h)}
                          </span>
                        </Fragment>
                      ))}
                    </div>
                    <div style={{"display":"flex","flexDirection":"column","gap":"6px"}}>
                      {list(v.ledgerLack).map((l, i) => (
                        <Fragment key={i}>
                          <span style={{"fontSize":"13px","lineHeight":"1.35","color":"rgba(243,236,221,0.78)"}}>
                            {text(l)}
                          </span>
                        </Fragment>
                      ))}
                    </div>
                  </div>
                </div>
                <div data-g="ohint" style={{"position":"absolute","right":"clamp(30px,6vw,110px)","bottom":"96px","zIndex":"6","display":"flex","alignItems":"center","gap":"11px","fontFamily":"'JetBrains Mono',monospace","fontSize":"10px","letterSpacing":"0.22em","textTransform":"uppercase","color":"rgba(243,236,221,0.6)"}} className={"hint"}>
                  Scroll to travel
                  <span style={{"fontSize":"15px"}}>
                    →
                  </span>
                </div>
              </section>
              <section data-g="panel" data-panel="" data-chapter="1" tabIndex="-1" aria-label="Chapter two — Selected work" style={{"position":"relative","width":"100vw","height":"100vh","flex":"none","overflow":"hidden","display":"flex","alignItems":"center","padding":"100px clamp(30px,6vw,96px) 132px","paddingLeft":"clamp(82px,10vw,150px)"}}>
                <div data-g="wscrim" style={{"position":"absolute","inset":"0","pointerEvents":"none","zIndex":"1","background":"linear-gradient(90deg,rgba(11,9,6,0.66) 0%,rgba(11,9,6,0.3) 44%,rgba(11,9,6,0.58) 100%),radial-gradient(120% 70% at 50% 62%,rgba(11,9,6,0.36) 0%,rgba(11,9,6,0) 76%)"}} />
                <div style={{"position":"absolute","inset":"0","display":"flex","alignItems":"center","justifyContent":"flex-start","paddingLeft":"clamp(30px,5vw,90px)","pointerEvents":"none","zIndex":"2"}}>
                  <span data-word="" data-op="0.04" style={{"fontFamily":"'Shippori Mincho B1',serif","fontWeight":"800","fontSize":"min(46vh,440px)","lineHeight":"0.78","letterSpacing":"0.02em","color":"rgba(243,236,221,0.04)","WebkitTextStroke":"1px rgba(243,236,221,0.06)","textTransform":"uppercase","whiteSpace":"nowrap"}}>
                    WORK
                  </span>
                </div>
                <div data-g="markv" style={{"position":"absolute","left":"clamp(18px,3vw,44px)","top":"50%","transform":"translateY(-50%)","display":"flex","flexDirection":"column","alignItems":"center","gap":"14px","zIndex":"4"}}>
                  <span style={{"fontFamily":"'Shippori Mincho B1',serif","fontSize":"34px","color":"rgba(243,236,221,0.66)"}}>
                    壱
                  </span>
                  <span style={{"width":"1px","height":"70px","background":"rgba(243,236,221,0.25)"}} />
                  <span style={{"writingMode":"vertical-rl","fontFamily":"'JetBrains Mono',monospace","fontSize":"10px","letterSpacing":"0.3em","color":"rgba(243,236,221,0.78)","textTransform":"uppercase"}}>
                    Selected work
                  </span>
                  <span data-room="" style={{"writingMode":"vertical-rl","fontFamily":"'JetBrains Mono',monospace","fontSize":"11px","letterSpacing":"0.22em","color":"rgba(243,236,221,0.66)","textTransform":"uppercase"}}>
                    書斎 · The study
                  </span>
                </div>
                <div data-fit="" style={{"position":"relative","zIndex":"5","width":"100%","display":"flex","flexDirection":"column","gap":"26px"}}>
                  <div data-anim="" style={{"display":"flex","alignItems":"baseline","gap":"16px","flexWrap":"wrap"}}>
                    <span style={{"fontFamily":"'Shippori Mincho B1',serif","fontWeight":"800","fontSize":"clamp(34px,5vw,74px)","lineHeight":"0.92","textTransform":"uppercase","letterSpacing":"-0.012em"}}>
                      Selected work
                    </span>
                    <span style={{"fontSize":"13px","color":"rgba(243,236,221,0.78)","maxWidth":"360px","textWrap":"pretty","padding":"5px 11px","background":"rgba(11,9,6,0.62)","backdropFilter":"blur(3px)"}}>
                      Two iOS apps, built solo — design to App Store submission.
                    </span>
                  </div>
                  <div data-g="wgrid" style={{"display":"grid","gridTemplateColumns":"repeat(2,minmax(0,1fr))","gap":"32px","maxWidth":"1120px"}}>
                    {list(v.projects).map((p, i) => (
                      <Fragment key={i}>
                        <div data-anim="" data-wipe="" data-card="" data-lift="0px" style={{"--lift":"0px","--hy":"0px","display":"flex","flexDirection":"column","gap":"13px","height":"100%","transform":"translateY(calc(var(--lift) + var(--hy)))","transition":"opacity .4s ease,filter .4s ease,transform .5s cubic-bezier(.2,.7,.2,1)"}}>
                          <div data-g="wframe" data-case={p?.i} role="button" tabIndex="0" aria-haspopup="dialog" aria-label={(p?.title ?? '') + " — open case study"} style={{"position":"relative","aspectRatio":"5/4","maxHeight":"min(52vh,500px)","overflow":"hidden","border":"1px solid rgba(243,236,221,0.16)","background":"#17130F","cursor":"pointer","transition":"transform .45s cubic-bezier(.2,.7,.2,1),border-color .45s ease,rotate .3s cubic-bezier(.2,.7,.2,1)"}} className="scp6">
                            {' '}
                            <div data-shot="" style={{"position":"absolute","inset":"0","transition":"transform .6s cubic-bezier(.2,.7,.2,1)","willChange":"transform"}}>
                              {' '}
                              {p?.noDevice ? (
                                <>
                                  {' '}
                                  <img src={p?.shot} alt="" style={{ display: 'block', width: '100%', height: '100%', objectFit: 'cover' }} />
                                  {' '}
                                </>
                              ) : null}
                              {' '}
                              {p?.device ? (
                                <>
                                  {' '}
                                  <div style={{"position":"absolute","inset":"0","background":"radial-gradient(90% 65% at 50% 56%,#33261a 0%,#17120d 58%,#0b0906 100%)"}}>
                                    {' '}
                                    <div data-glow="" style={{"position":"absolute","left":"50%","top":"54%","width":"78%","height":"62%","borderRadius":"50%","background":"radial-gradient(closest-side,rgba(243,236,221,0.42),rgba(243,236,221,0))","transform":"translate(-50%,-50%) scale(0.6)","opacity":"0","transition":"opacity 1.1s ease,transform 1.5s cubic-bezier(.2,.7,.2,1)"}} />
                                    {' '}
                                    <div data-side="l" style={{"position":"absolute","left":"50%","top":"15%","bottom":"13%","aspectRatio":"1320/2698","transform":"translateX(-50%) scale(0.86)","opacity":"0","transition":"opacity .7s ease,transform 1.2s cubic-bezier(.2,.8,.2,1)"}}>
                                      {' '}
                                      <div role="img" aria-label="Budgets screen" style={css("width:100%;height:100%;background-image:url(" + (p?.shotL ?? '') + ");background-size:cover;background-position:top;border-radius:7%/3.4%;filter:brightness(0.62) saturate(0.85);box-shadow:0 20px 40px rgba(0,0,0,0.6),0 0 0 1px rgba(243,236,221,0.1)")} />
                                      {' '}
                                    </div>
                                    {' '}
                                    <div data-side="r" style={{"position":"absolute","left":"50%","top":"15%","bottom":"13%","aspectRatio":"1320/2698","transform":"translateX(-50%) scale(0.86)","opacity":"0","transition":"opacity .7s ease,transform 1.2s cubic-bezier(.2,.8,.2,1)"}}>
                                      {' '}
                                      <div role="img" aria-label="Reports screen" style={css("width:100%;height:100%;background-image:url(" + (p?.shotR ?? '') + ");background-size:cover;background-position:top;border-radius:7%/3.4%;filter:brightness(0.62) saturate(0.85);box-shadow:0 20px 40px rgba(0,0,0,0.6),0 0 0 1px rgba(243,236,221,0.1)")} />
                                      {' '}
                                    </div>
                                    {' '}
                                    <div data-dev="" style={{"position":"absolute","left":"50%","top":"7%","bottom":"7%","aspectRatio":"1320/2698","transform":"translate(-50%,28px) scale(0.93)","opacity":"0","filter":"blur(8px)","transition":"opacity .8s ease,transform 1.15s cubic-bezier(.2,.8,.2,1),filter .9s ease"}}>
                                      {' '}
                                      <div role="img" aria-label={(p?.title ?? '') + " app screen"} style={css("width:100%;height:100%;background-image:url(" + (p?.shot ?? '') + ");background-size:cover;background-position:top;border-radius:7%/3.4%;box-shadow:0 26px 50px rgba(0,0,0,0.65),0 0 0 1px rgba(243,236,221,0.12)")} />
                                      {' '}
                                      <div style={{"position":"absolute","inset":"0","overflow":"hidden","borderRadius":"7%/3.4%","pointerEvents":"none"}}>
                                        {' '}
                                        <div data-sheen="" style={{"position":"absolute","top":"-10%","bottom":"-10%","left":"0","width":"45%","transform":"translateX(-160%) skewX(-14deg)","background":"linear-gradient(90deg,rgba(255,240,215,0),rgba(255,240,215,0.2),rgba(255,240,215,0))"}} />
                                        {' '}
                                      </div>
                                      {' '}
                                    </div>
                                    {' '}
                                  </div>
                                  {' '}
                                </>
                              ) : null}
                              {' '}
                            </div>
                            {' '}
                            <div data-blade="" style={{"position":"absolute","left":"-6%","right":"-6%","top":"0","height":"1px","opacity":"0","pointerEvents":"none","background":"linear-gradient(90deg,rgba(224,103,79,0) 0%,#E0674F 38%,#F3ECDD 52%,#E0674F 66%,rgba(224,103,79,0) 100%)","boxShadow":"0 0 14px rgba(224,103,79,0.75)"}} />
                            {' '}
                            <div data-shoji="" aria-hidden="true" style={{"position":"absolute","inset":"0","zIndex":"2","pointerEvents":"none","display":"grid","gridTemplateColumns":"1fr 1fr"}}>
                              <div data-leaf="l" style={{"position":"relative","height":"100%","background":"linear-gradient(90deg,#3a2716 3px,rgba(0,0,0,0) 3px) 0 0/33.34% 100%,linear-gradient(#3a2716 3px,rgba(0,0,0,0) 3px) 0 0/100% 16.67%,radial-gradient(110% 70% at 50% 58%,rgba(255,206,138,0.55) 0%,rgba(255,190,110,0) 72%),#D8C9A6","boxShadow":"inset 0 0 0 6px #2e1f13,inset 0 0 40px rgba(60,36,16,0.35)","transition":"transform 1s cubic-bezier(.66,0,.2,1)","willChange":"transform"}}>
                                {' '}
                                <span style={{"position":"absolute","top":"50%","right":"10px","width":"6px","height":"30px","marginTop":"-15px","borderRadius":"3px","background":"#2e1f13","boxShadow":"inset 0 1px 2px rgba(0,0,0,0.6)"}} />
                                {' '}
                              </div>
                              <div data-leaf="r" style={{"position":"relative","height":"100%","background":"linear-gradient(90deg,#3a2716 3px,rgba(0,0,0,0) 3px) 0 0/33.34% 100%,linear-gradient(#3a2716 3px,rgba(0,0,0,0) 3px) 0 0/100% 16.67%,radial-gradient(110% 70% at 50% 58%,rgba(255,206,138,0.55) 0%,rgba(255,190,110,0) 72%),#D8C9A6","boxShadow":"inset 0 0 0 6px #2e1f13,inset 0 0 40px rgba(60,36,16,0.35)","transition":"transform 1s cubic-bezier(.66,0,.2,1)","willChange":"transform"}}>
                                {' '}
                                <span style={{"position":"absolute","top":"50%","left":"10px","width":"6px","height":"30px","marginTop":"-15px","borderRadius":"3px","background":"#2e1f13","boxShadow":"inset 0 1px 2px rgba(0,0,0,0.6)"}} />
                                {' '}
                              </div>
                              <span data-hanko="" style={{"position":"absolute","left":"50%","bottom":"16%","transform":"translateX(-50%)","display":"flex","alignItems":"center","justifyContent":"center","width":"34px","height":"34px","background":"#B7301F","color":"#F3ECDD","fontFamily":"'Shippori Mincho B1',serif","fontWeight":"800","fontSize":"15px","boxShadow":"0 0 0 2px #D8C9A6,0 0 0 3px #B7301F","transition":"opacity .4s ease"}}>
                                {text(p?.num)}
                              </span>
                            </div>
                            {' '}
                            <span style={{"position":"absolute","right":"12px","top":"11px","zIndex":"3","display":"block","padding":"3px 7px","background":"rgba(11,9,6,0.72)","fontFamily":"'JetBrains Mono',monospace","fontSize":"10px","letterSpacing":"0.1em","color":"rgba(243,236,221,0.8)","pointerEvents":"none"}}>
                              {text(p?.num)}
                            </span>
                            {' '}
                          </div>
                          <div data-cap="" style={{"display":"flex","flexDirection":"column","gap":"9px","flex":"1","minHeight":"0","transition":"transform .5s cubic-bezier(.2,.7,.2,1)"}}>
                            {p?.chip ? (
                              <>
                                <span data-g="wchip" style={{"alignSelf":"flex-start","display":"flex","alignItems":"center","gap":"7px","padding":"4px 9px","border":"1px solid rgba(243,236,221,0.55)","background":"rgba(243,236,221,0.1)","fontFamily":"'JetBrains Mono',monospace","fontSize":"11px","letterSpacing":"0.08em","textTransform":"uppercase","color":"#F3ECDD"}}>
                                  <span style={{"width":"6px","height":"6px","borderRadius":"50%","background":"#E0674F","boxShadow":"0 0 8px #E0674F"}} />
                                  {text(p?.chip)}
                                  {"\n                    "}
                                </span>
                              </>
                            ) : null}
                            <div data-g="wtitle" style={{"fontFamily":"'Shippori Mincho B1',serif","fontWeight":"700","fontSize":"clamp(17px,1.7vw,22px)","lineHeight":"1.1","textTransform":"uppercase","overflowWrap":"anywhere"}}>
                              {text(p?.title)}
                            </div>
                            <div data-g="wstack" style={{"display":"flex","flexWrap":"wrap","gap":"5px","fontFamily":"'JetBrains Mono',monospace","fontSize":"9px","letterSpacing":"0.1em","lineHeight":"1","textTransform":"uppercase","color":"rgba(243,236,221,0.92)"}}>
                              {list(p?.stackItems).map((s, i) => (
                                <Fragment key={i}>
                                  <span data-stk="" style={{"display":"inline-flex","alignItems":"center","padding":"5px 7px","whiteSpace":"nowrap","border":"1px solid rgba(243,236,221,0.26)","background":"rgba(11,9,6,0.62)","transition":"color .35s ease,text-shadow .35s ease,border-color .35s ease"}}>
                                    {text(s)}
                                  </span>
                                </Fragment>
                              ))}
                            </div>
                            {p?.result ? (
                              <>
                                <div data-g="wresult" style={{"display":"flex","alignItems":"baseline","gap":"8px","fontFamily":"'Shippori Mincho B1',serif","fontWeight":"700","fontSize":"clamp(15px,1.35vw,18px)","lineHeight":"1.25","color":"#F3ECDD","textWrap":"balance"}}>
                                  <span aria-hidden="true" style={{"color":"#E0674F","fontSize":"0.9em"}}>
                                    →
                                  </span>
                                  <span>
                                    {text(p?.result)}
                                  </span>
                                </div>
                              </>
                            ) : null}
                            <p data-g="wblurb" style={{"margin":"0","fontSize":"13px","lineHeight":"1.62","color":"rgba(243,236,221,0.78)","textWrap":"pretty"}}>
                              {text(p?.blurb)}
                            </p>
                            <div data-g="wstats" style={{"display":"grid","gridTemplateColumns":"repeat(3,minmax(0,1fr))","gap":"10px"}}>
                              {list(p?.stats).map((s, i) => (
                                <Fragment key={i}>
                                  <div style={{"display":"flex","flexDirection":"column","gap":"3px","paddingTop":"8px","borderTop":"1px solid rgba(243,236,221,0.2)"}}>
                                    <span style={{"fontFamily":"'Shippori Mincho B1',serif","fontWeight":"800","fontSize":"clamp(20px,1.9vw,26px)","lineHeight":"1","color":"#F3ECDD"}}>
                                      {text(s?.v)}
                                    </span>
                                    <span style={{"fontFamily":"'JetBrains Mono',monospace","fontSize":"11px","letterSpacing":"0.04em","lineHeight":"1.35","color":"rgba(243,236,221,0.72)"}}>
                                      {text(s?.k)}
                                    </span>
                                  </div>
                                </Fragment>
                              ))}
                            </div>
                            <div style={{"display":"flex","flexWrap":"nowrap","alignItems":"center","gap":"8px"}}>
                              {p?.demo ? (
                                <>
                                  <button type="button" onClick={p?.openDemo} aria-haspopup="dialog" style={{"flex":"1 1 0","minWidth":"0","justifyContent":"center","display":"flex","alignItems":"center","gap":"6px","minHeight":"36px","padding":"0 8px","whiteSpace":"nowrap","border":"1px solid rgba(243,236,221,0.6)","background":"rgba(243,236,221,0.12)","cursor":"pointer","fontFamily":"'JetBrains Mono',monospace","fontSize":"9.5px","letterSpacing":"0.08em","textTransform":"uppercase","color":"#F3ECDD"}} className="scp7">
                                    ▶︎ Demo
                                  </button>
                                </>
                              ) : null}
                              <a href={p?.repo} target="_blank" rel="noopener" aria-label={(p?.title ?? '') + " on GitHub"} style={{"flex":"1 1 0","minWidth":"0","justifyContent":"center","display":"flex","alignItems":"center","gap":"6px","background":"rgba(11,9,6,0.55)","minHeight":"36px","padding":"0 10px","whiteSpace":"nowrap","border":"1px solid rgba(243,236,221,0.3)","fontFamily":"'JetBrains Mono',monospace","fontSize":"9.5px","letterSpacing":"0.1em","textTransform":"uppercase","color":"rgba(243,236,221,0.85)"}} className="scp0">
                                GitHub ↗︎
                              </a>
                            </div>
                            <button type="button" data-case={p?.i} aria-haspopup="dialog" style={{"marginTop":"auto","display":"flex","alignItems":"center","justifyContent":"space-between","gap":"10px","width":"100%","background":"transparent","border":"none","borderTop":"1px solid rgba(243,236,221,0.18)","padding":"11px 0 0","cursor":"pointer","fontFamily":"'JetBrains Mono',monospace","fontSize":"9.5px","letterSpacing":"0.16em","textTransform":"uppercase","color":"rgba(243,236,221,0.9)","textShadow":"0 1px 6px rgba(11,9,6,0.95),0 0 2px rgba(11,9,6,0.9)","transition":"color .3s ease,border-color .3s ease"}} className="scp8">
                              Read case study
                              <span style={{"fontSize":"13px"}}>
                                →
                              </span>
                            </button>
                          </div>
                        </div>
                      </Fragment>
                    ))}
                  </div>
                </div>
              </section>
              <section data-g="panel" data-panel="" data-chapter="2" tabIndex="-1" aria-label="Chapter three — The path" style={{"position":"relative","width":"100vw","height":"100vh","flex":"none","overflow":"hidden","display":"flex","alignItems":"center","padding":"100px clamp(30px,6vw,96px) 96px","paddingLeft":"clamp(82px,10vw,150px)"}}>
                <div data-g="pscrim" style={{"position":"absolute","inset":"0","pointerEvents":"none","zIndex":"1","background":"linear-gradient(90deg,rgba(11,9,6,0.8) 0%,rgba(11,9,6,0.42) 46%,rgba(11,9,6,0.68) 72%,rgba(11,9,6,0.82) 100%)"}} />
                <div style={{"position":"absolute","inset":"0","display":"flex","alignItems":"center","justifyContent":"flex-end","paddingRight":"clamp(30px,5vw,90px)","pointerEvents":"none","zIndex":"1"}}>
                  <span data-word="" data-op="0.04" style={{"fontFamily":"'Shippori Mincho B1',serif","fontWeight":"800","fontSize":"min(46vh,440px)","lineHeight":"0.78","letterSpacing":"0.02em","color":"rgba(243,236,221,0.04)","WebkitTextStroke":"1px rgba(243,236,221,0.06)","textTransform":"uppercase","whiteSpace":"nowrap"}}>
                    PATH
                  </span>
                </div>
                <div data-g="markv" style={{"position":"absolute","left":"clamp(18px,3vw,44px)","top":"50%","transform":"translateY(-50%)","display":"flex","flexDirection":"column","alignItems":"center","gap":"14px","zIndex":"4"}}>
                  <span style={{"fontFamily":"'Shippori Mincho B1',serif","fontSize":"34px","color":"rgba(243,236,221,0.66)"}}>
                    弐
                  </span>
                  <span style={{"width":"1px","height":"70px","background":"rgba(243,236,221,0.25)"}} />
                  <span style={{"writingMode":"vertical-rl","fontFamily":"'JetBrains Mono',monospace","fontSize":"10px","letterSpacing":"0.3em","color":"rgba(243,236,221,0.78)","textTransform":"uppercase"}}>
                    The path
                  </span>
                  <span data-room="" style={{"writingMode":"vertical-rl","fontFamily":"'JetBrains Mono',monospace","fontSize":"11px","letterSpacing":"0.22em","color":"rgba(243,236,221,0.66)","textTransform":"uppercase"}}>
                    庭 · The garden
                  </span>
                </div>
                <div data-g="pathgrid" data-fit="" style={{"position":"relative","zIndex":"5","width":"100%","display":"grid","gridTemplateColumns":"minmax(0,1.15fr) minmax(0,1fr)","gap":"clamp(30px,5vw,80px)","alignItems":"center"}}>
                  <div style={{"display":"flex","flexDirection":"column","gap":"26px"}}>
                    <p data-anim="" data-g="pathh" style={{"margin":"0","fontFamily":"'Shippori Mincho B1',serif","fontWeight":"600","fontSize":"clamp(26px,3.1vw,46px)","lineHeight":"1.28","letterSpacing":"-0.005em","textWrap":"pretty"}}>
                      {"Two degrees, two countries, "}
                      <em style={{"fontStyle":"normal","color":"#E0674F"}}>
                        two apps built and submitted solo
                      </em>
                      {" — plus three years as a warehouse supervisor at Hactl before I wrote a line of code."}
                    </p>
                    <div data-anim="" style={{"display":"flex","flexDirection":"column","gap":"10px"}}>
                      <div style={{"display":"flex","flexDirection":"column","gap":"8px","padding":"10px 12px","border":"1px solid rgba(243,236,221,0.22)","background":"rgba(11,9,6,0.4)"}}>
                        <div style={{"display":"flex","flexWrap":"wrap","alignItems":"baseline","justifyContent":"space-between","gap":"6px 14px"}}>
                          <span style={{"fontFamily":"'JetBrains Mono',monospace","fontSize":"11px","letterSpacing":"0.18em","textTransform":"uppercase","color":"rgba(243,236,221,0.66)"}}>
                            {"Built & submitted with"}
                          </span>
                          <span data-g="skwhere" style={{"fontFamily":"'JetBrains Mono',monospace","fontSize":"11px","letterSpacing":"0.06em","color":"rgba(243,236,221,0.7)"}}>
                            {"in Quiet Ledger & Focus Coach"}
                          </span>
                        </div>
                        <div style={{"display":"flex","flexWrap":"wrap","gap":"6px"}}>
                          {list(v.skillsShipped).map((s, i) => (
                            <Fragment key={i}>
                              <span style={{"fontFamily":"'JetBrains Mono',monospace","fontSize":"11px","fontWeight":"600","letterSpacing":"0.08em","textTransform":"uppercase","border":"1px solid rgba(243,236,221,0.5)","background":"rgba(243,236,221,0.06)","padding":"6px 10px","color":"#F3ECDD"}}>
                                {text(s)}
                              </span>
                            </Fragment>
                          ))}
                        </div>
                      </div>
                      <div data-g="skgroups" style={{"display":"flex","flexWrap":"wrap","alignItems":"center","gap":"6px 14px"}}>
                        {list(v.skillGroups).map((g, i) => (
                          <Fragment key={i}>
                            <div style={{"display":"flex","flexWrap":"wrap","alignItems":"center","gap":"5px"}}>
                              <span data-g="sklabel" style={{"fontFamily":"'JetBrains Mono',monospace","fontSize":"11px","letterSpacing":"0.12em","textTransform":"uppercase","color":"rgba(243,236,221,0.6)","marginRight":"3px"}}>
                                {text(g?.label)}
                              </span>
                              {list(g?.items).map((s, i) => (
                                <Fragment key={i}>
                                  <span style={{"fontFamily":"'JetBrains Mono',monospace","fontSize":"11px","letterSpacing":"0.06em","textTransform":"uppercase","border":"1px solid rgba(243,236,221,0.24)","padding":"4px 8px","color":"rgba(243,236,221,0.78)"}}>
                                    {text(s)}
                                  </span>
                                </Fragment>
                              ))}
                            </div>
                          </Fragment>
                        ))}
                      </div>
                    </div>
                  </div>
                  <div style={{"display":"flex","flexDirection":"column","padding":"0 16px","border":"1px solid rgba(243,236,221,0.22)","background":"rgba(11,9,6,0.58)","backdropFilter":"blur(5px)"}}>
                    {list(v.education).map((e, i) => (
                      <Fragment key={i}>
                        <div data-anim="" data-g="edrow" style={{"display":"flex","flexDirection":"column","gap":"8px","padding":"22px 4px","borderBottom":"1px solid rgba(243,236,221,0.14)","transition":"background .3s ease"}} className="scp9">
                          <span style={{"fontFamily":"'JetBrains Mono',monospace","fontSize":"10px","letterSpacing":"0.09em","color":"rgba(243,236,221,0.86)"}}>
                            {text(e?.span)}
                          </span>
                          <span style={{"fontFamily":"'Shippori Mincho B1',serif","fontWeight":"700","fontSize":"clamp(19px,5.2vw,24px)","lineHeight":"1.14","textTransform":"uppercase","overflowWrap":"anywhere","textWrap":"balance"}}>
                            {text(e?.school)}
                          </span>
                          <span style={{"fontSize":"13px","color":"rgba(243,236,221,0.9)"}}>
                            {text(e?.award)}
                          </span>
                          <span style={{"fontFamily":"'JetBrains Mono',monospace","fontSize":"10px","letterSpacing":"0.08em","textTransform":"uppercase","color":"rgba(243,236,221,0.86)"}}>
                            {text(e?.place)}
                          </span>
                        </div>
                      </Fragment>
                    ))}
                  </div>
                </div>
              </section>
              <section data-g="panel" data-panel="" data-chapter="3" tabIndex="-1" aria-label="Chapter four — Proof" style={{"position":"relative","width":"100vw","height":"100vh","flex":"none","overflow":"hidden","display":"flex","alignItems":"center","padding":"100px clamp(30px,6vw,96px) 96px","paddingLeft":"clamp(82px,10vw,150px)"}}>
                <div aria-hidden="true" style={{"position":"absolute","inset":"0","pointerEvents":"none","zIndex":"1","background":"linear-gradient(180deg,rgba(11,9,6,0.72) 0%,rgba(11,9,6,0.5) 42%,rgba(11,9,6,0.2) 100%)"}} />
                <div style={{"position":"absolute","inset":"0","display":"flex","alignItems":"center","justifyContent":"center","pointerEvents":"none","zIndex":"1"}}>
                  <span data-word="" data-op="0.04" style={{"fontFamily":"'Shippori Mincho B1',serif","fontWeight":"800","fontSize":"min(46vh,440px)","lineHeight":"0.78","letterSpacing":"0.02em","color":"rgba(243,236,221,0.04)","WebkitTextStroke":"1px rgba(243,236,221,0.06)","textTransform":"uppercase","whiteSpace":"nowrap"}}>
                    PROOF
                  </span>
                </div>
                <div data-g="markv" style={{"position":"absolute","left":"clamp(18px,3vw,44px)","top":"50%","transform":"translateY(-50%)","display":"flex","flexDirection":"column","alignItems":"center","gap":"14px","zIndex":"4"}}>
                  <span style={{"fontFamily":"'Shippori Mincho B1',serif","fontSize":"34px","color":"rgba(243,236,221,0.66)"}}>
                    参
                  </span>
                  <span style={{"width":"1px","height":"70px","background":"rgba(243,236,221,0.25)"}} />
                  <span style={{"writingMode":"vertical-rl","fontFamily":"'JetBrains Mono',monospace","fontSize":"10px","letterSpacing":"0.3em","color":"rgba(243,236,221,0.78)","textTransform":"uppercase"}}>
                    Credentials
                  </span>
                  <span data-room="" style={{"writingMode":"vertical-rl","fontFamily":"'JetBrains Mono',monospace","fontSize":"11px","letterSpacing":"0.22em","color":"rgba(243,236,221,0.66)","textTransform":"uppercase"}}>
                    屋根 · The roofline
                  </span>
                </div>
                <div data-fit="" style={{"position":"relative","zIndex":"5","width":"100%","display":"flex","flexDirection":"column","gap":"26px"}}>
                  <div data-anim="" style={{"fontFamily":"'Shippori Mincho B1',serif","fontWeight":"800","fontSize":"clamp(34px,5vw,74px)","lineHeight":"0.92","textTransform":"uppercase","letterSpacing":"-0.012em","textShadow":"0 2px 18px rgba(11,9,6,0.85)"}}>
                    {"Verified & formal"}
                  </div>
                  <div data-g="certgrid" style={{"display":"grid","gridTemplateColumns":"repeat(3,minmax(0,1fr))","gap":"20px"}}>
                    {list(v.certs).map((c, i) => (
                      <Fragment key={i}>
                        <div data-anim="" data-cert="" style={{"position":"relative","border":"1px solid rgba(243,236,221,0.22)","padding":"26px","display":"flex","flexDirection":"column","gap":"20px","justifyContent":"space-between","minHeight":"230px","background":"rgba(23,19,15,0.72)","backdropFilter":"blur(4px)","boxShadow":"inset 0 0 0 1px rgba(199,154,78,0.28)","transition":"transform .35s ease,border-color .35s ease"}} className="scpa">
                          <div style={{"display":"flex","justifyContent":"space-between","alignItems":"flex-start","gap":"12px","fontFamily":"'JetBrains Mono',monospace","fontSize":"9.5px","letterSpacing":"0.14em","textTransform":"uppercase","color":"rgba(243,236,221,0.6)"}}>
                            <span>
                              {text(c?.tag)}
                            </span>
                            <span>
                              {text(c?.year)}
                            </span>
                          </div>
                          <span style={{"fontFamily":"'Shippori Mincho B1',serif","fontWeight":"700","fontSize":"clamp(19px,2vw,26px)","lineHeight":"1.14","textTransform":"uppercase","overflowWrap":"anywhere","hyphens":"auto"}}>
                            {text(c?.title)}
                          </span>
                          <div data-cert-row="" style={{"position":"relative","borderTop":"1px solid rgba(243,236,221,0.24)","padding":"14px 52px 0 0","minHeight":"40px","display":"flex","alignItems":"center","color":"rgba(243,236,221,0.66)","fontSize":"13px"}}>
                            {text(c?.issuer)}
                          </div>
                        </div>
                      </Fragment>
                    ))}
                  </div>
                </div>
              </section>
              <section data-g="panel" data-panel="" data-chapter="4" tabIndex="-1" aria-label="Chapter five — Contact" style={{"position":"relative","width":"100vw","height":"100vh","flex":"none","overflow":"hidden","display":"flex","alignItems":"center","padding":"100px clamp(30px,6vw,110px) 96px","paddingLeft":"clamp(82px,10vw,150px)"}}>
                <div aria-hidden="true" style={{"position":"absolute","inset":"0","pointerEvents":"none","zIndex":"1","background":"linear-gradient(90deg,rgba(11,9,6,0.84) 0%,rgba(11,9,6,0.6) 46%,rgba(11,9,6,0.18) 78%,rgba(11,9,6,0.3) 100%)"}} />
                <div style={{"position":"absolute","inset":"0","display":"flex","alignItems":"center","justifyContent":"flex-end","paddingRight":"clamp(30px,5vw,90px)","pointerEvents":"none","zIndex":"1"}}>
                  <span data-word="" data-op="0.04" style={{"fontFamily":"'Shippori Mincho B1',serif","fontWeight":"800","fontSize":"min(40vh,360px)","lineHeight":"0.78","letterSpacing":"0.04em","color":"rgba(243,236,221,0.04)","textTransform":"uppercase","whiteSpace":"nowrap"}}>
                    仕事
                  </span>
                </div>
                <div data-g="markv" style={{"position":"absolute","left":"clamp(18px,3vw,44px)","top":"50%","transform":"translateY(-50%)","display":"flex","flexDirection":"column","alignItems":"center","gap":"14px","zIndex":"4"}}>
                  <span style={{"fontFamily":"'Shippori Mincho B1',serif","fontSize":"34px","color":"rgba(243,236,221,0.66)"}}>
                    結
                  </span>
                  <span style={{"width":"1px","height":"70px","background":"rgba(243,236,221,0.25)"}} />
                  <span style={{"writingMode":"vertical-rl","fontFamily":"'JetBrains Mono',monospace","fontSize":"10px","letterSpacing":"0.3em","color":"rgba(243,236,221,0.78)","textTransform":"uppercase"}}>
                    Contact
                  </span>
                  <span data-room="" style={{"writingMode":"vertical-rl","fontFamily":"'JetBrains Mono',monospace","fontSize":"11px","letterSpacing":"0.22em","color":"rgba(243,236,221,0.66)","textTransform":"uppercase"}}>
                    提灯 · The lantern
                  </span>
                </div>
                <div data-fit="" style={{"position":"relative","zIndex":"5","maxWidth":"840px","display":"flex","flexDirection":"column","gap":"30px"}}>
                  <div data-anim="" style={{"display":"flex","alignItems":"center","gap":"11px","fontFamily":"'JetBrains Mono',monospace","fontSize":"10px","letterSpacing":"0.2em","textTransform":"uppercase","color":"rgba(243,236,221,0.66)"}}>
                    <span style={{"width":"6px","height":"6px","borderRadius":"50%","background":"#B7301F","display":"block","animation":"pulse 2.2s ease-in-out infinite"}} />
                    Available full-time — Toronto or Hong Kong
                  </div>
                  <a data-anim="" href="mailto:tamtingyuen@gmail.com?subject=Software%20engineer%20role" data-g="lwt" style={{"display":"block","fontFamily":"'Shippori Mincho B1',serif","fontWeight":"800","fontSize":"clamp(44px,8vw,128px)","lineHeight":"0.96","textTransform":"uppercase","letterSpacing":"-0.008em"}} className="scp1">
                    <span data-cw="" style={{"display":"inline-block"}}>
                      LET’S
                    </span>
                    {' '}
                    <span data-cw="" style={{"display":"inline-block"}}>
                      WORK
                    </span>
                    <br />
                    <span data-cw="" style={{"display":"inline-block"}}>
                      TOGETHER
                    </span>
                    {' '}
                    <span data-cw="" style={{"display":"inline-block"}}>
                      <span data-carrow="" style={{"display":"inline-block","transition":"transform .45s cubic-bezier(.2,.8,.2,1)"}}>
                        →
                      </span>
                    </span>
                  </a>
                  <div data-anim="" style={{"display":"flex","flexWrap":"wrap","gap":"14px","alignItems":"center"}}>
                    <a href="./Johnny-Tam-Resume.pdf" download="" style={{"display":"flex","alignItems":"center","gap":"8px","minHeight":"44px","border":"1px solid rgba(243,236,221,0.4)","background":"rgba(11,9,6,0.55)","color":"#F3ECDD","padding":"0 18px","fontFamily":"'JetBrains Mono',monospace","fontSize":"11px","letterSpacing":"0.14em","textTransform":"uppercase"}} className="scp3">
                      Résumé · PDF ↓
                    </a>
                    <div style={{"display":"flex","alignItems":"center","gap":"10px"}}>
                      <a href="mailto:tamtingyuen@gmail.com" style={{"fontFamily":"'Shippori Mincho B1',serif","fontWeight":"600","fontSize":"22px","letterSpacing":"0.01em","color":"#F3ECDD","textDecoration":"underline","textDecorationColor":"rgba(243,236,221,0.3)","textUnderlineOffset":"6px","textDecorationThickness":"1px"}} className="scpb">
                        tamtingyuen@gmail.com
                      </a>
                      <button type="button" onClick={v.copyEmail} aria-label="Copy email address" style={{"display":"flex","alignItems":"center","gap":"6px","minHeight":"36px","padding":"0 11px","background":"rgba(11,9,6,0.82)","backdropFilter":"blur(4px)","border":"1px solid rgba(243,236,221,0.4)","cursor":"pointer","fontFamily":"'JetBrains Mono',monospace","fontSize":"10px","letterSpacing":"0.12em","textTransform":"uppercase","color":"#F3ECDD"}} className="scp0">
                        {text(v.copyLabel)}
                      </button>
                      <span role="status" aria-live="polite" style={{"position":"absolute","width":"1px","height":"1px","overflow":"hidden","clip":"rect(0 0 0 0)"}}>
                        {text(v.copyStatus)}
                      </span>
                    </div>
                  </div>
                  <div data-anim="" data-g="socials" style={{"display":"flex","flexWrap":"wrap","gap":"22px","paddingTop":"22px","borderTop":"1px solid rgba(243,236,221,0.2)","fontFamily":"'JetBrains Mono',monospace","fontSize":"11px","letterSpacing":"0.1em","textTransform":"uppercase","color":"rgba(243,236,221,0.72)"}}>
                    {list(v.socialsContact).map((l, i) => (
                      <Fragment key={i}>
                        <a href={l?.href} target="_blank" rel="noopener" style={{"color":"rgba(243,236,221,0.8)"}} className="scp1">
                          {text(l?.label)}
                          {" ↗︎"}
                        </a>
                      </Fragment>
                    ))}
                  </div>
                  <div data-anim="" style={{"marginTop":"12px","fontFamily":"'JetBrains Mono',monospace","fontSize":"9.5px","letterSpacing":"0.12em","textTransform":"uppercase","color":"rgba(243,236,221,0.78)"}}>
                    {"© 2026 Johnny Tam · House built procedurally in three.js — no 3D models · "}
                    <a href="#" data-goto="0" style={{"color":"rgba(243,236,221,0.78)"}} className="scp1">
                      Back to opening ↑
                    </a>
                  </div>
                </div>
              </section>
            </div>
            {' '}
            <div data-g="filmstrip" style={{"position":"absolute","left":"0","right":"0","bottom":"0","zIndex":"110","background":"linear-gradient(0deg,rgba(11,9,6,0.82) 0%,rgba(11,9,6,0) 100%)","paddingTop":"20px"}}>
              {' '}
              <div ref={v.progressFill} style={{"position":"absolute","left":"0","top":"19px","height":"4px","width":"0%","background":"linear-gradient(90deg,rgba(183,48,31,0.55) 0%,#B7301F 76%,#E0674F 100%)","boxShadow":"0 0 14px rgba(183,48,31,0.75)"}} />
              {' '}
              <div ref={v.progressKnob} style={{"position":"absolute","left":"0","top":"15px","width":"2px","height":"12px","background":"#F3ECDD","boxShadow":"0 0 10px rgba(243,236,221,0.8)","transform":"translateX(-1px)"}} />
              {' '}
              <div style={{"position":"absolute","right":"clamp(24px,5vw,78px)","bottom":"calc(100% - 4px)","display":"none","alignItems":"baseline","gap":"5px","fontFamily":"'JetBrains Mono',monospace","letterSpacing":"0.14em","paddingBottom":"9px"}}>
                {' '}
                <span ref={v.posNum} style={{"fontSize":"13px","color":"#F3ECDD"}}>
                  01
                </span>
                {' '}
                <span style={{"fontSize":"10px","color":"rgba(243,236,221,0.66)"}}>
                  / 05
                </span>
                {' '}
              </div>
              {' '}
              <div style={{"display":"grid","gridTemplateColumns":"repeat(5,1fr)","borderTop":"1px solid rgba(243,236,221,0.2)"}}>
                {list(v.chapters).map((c, i) => (
                  <Fragment key={i}>
                    <button type="button" data-cell={c?.i} data-goto={c?.i} style={{"position":"relative","display":"flex","flexDirection":"column","gap":"4px","padding":"11px 20px 13px","background":"transparent","border":"none","borderRight":"1px solid rgba(243,236,221,0.08)","cursor":"pointer","textAlign":"left","color":"rgba(243,236,221,0.66)","transition":"color .35s ease,background .35s ease"}} className="scpc">
                      <span data-cellbar="" style={{"position":"absolute","left":"0","right":"0","top":"0","height":"2px","background":"#E0674F","transform":"scaleX(0)","transformOrigin":"left","transition":"transform .45s cubic-bezier(.2,.7,.2,1)"}} />
                      <span data-cellnum="" style={{"fontFamily":"'Shippori Mincho B1',serif","fontWeight":"700","fontSize":"22px","lineHeight":"1","transition":"color .35s ease,opacity .35s ease"}}>
                        {text(c?.num)}
                      </span>
                      <span style={{"fontFamily":"'JetBrains Mono',monospace","fontSize":"8.5px","letterSpacing":"0.18em","textTransform":"uppercase"}}>
                        {text(c?.label)}
                      </span>
                    </button>
                  </Fragment>
                ))}
              </div>
              {' '}
            </div>
            {' '}
          </div>
          {' '}
        </div>
        {' '}
        {v.qlOpen ? (
          <>
            {' '}
            <div ref={v.qlWrap} data-g="qlwrap" role="dialog" aria-modal="true" aria-labelledby="ql-title" style={{"position":"fixed","inset":"0","zIndex":"272","background":"radial-gradient(70% 80% at 62% 50%,#16221F 0%,#0B0906 70%)","color":"#F3ECDD","display":"flex","alignItems":"center","justifyContent":"center","gap":"clamp(28px,5vw,80px)","padding":"clamp(66px,7.4vh,86px) clamp(32px,4.6vw,66px) clamp(30px,3.6vh,42px)","overflow":"hidden"}}>
              <div data-g="qlbez" aria-hidden="true" style={{"position":"absolute","inset":"0","zIndex":"5","pointerEvents":"none","border":"clamp(10px,1.3vw,16px) solid #121212","borderRadius":"clamp(16px,1.8vw,26px)","boxShadow":"0 0 0 60px #121212,inset 0 0 0 1px rgba(255,255,255,0.07),inset 0 0 60px rgba(0,0,0,0.55)"}}>
                <span style={{"position":"absolute","left":"50%","top":"calc(clamp(10px,1.3vw,16px) / -2 - 3px)","width":"6px","height":"6px","marginLeft":"-3px","borderRadius":"50%","background":"#2A2D30","boxShadow":"inset 0 0 0 1.5px #3A3E43"}} />
              </div>
              <div data-g="qlbar" style={{"position":"absolute","left":"0","right":"0","top":"0","zIndex":"6","display":"flex","alignItems":"center","justifyContent":"space-between","gap":"12px","padding":"calc(clamp(10px,1.3vw,16px) + 8px) calc(clamp(10px,1.3vw,16px) + 14px) 0","fontFamily":"'JetBrains Mono',monospace","fontSize":"11px","letterSpacing":"0.14em","textTransform":"uppercase","color":"rgba(243,236,221,0.72)"}}>
                <span style={{"display":"flex","alignItems":"center","gap":"9px","minWidth":"0"}}>
                  <span style={{"flex":"none","width":"7px","height":"7px","borderRadius":"50%","background":"#83BEB0","boxShadow":"0 0 8px #83BEB0"}} />
                  Johnny’s desk
                  <span style={{"color":"rgba(243,236,221,0.66)"}}>
                    /
                  </span>
                  <span style={{"color":"#F3ECDD"}}>
                    {text(v.qlCrumb)}
                  </span>
                </span>
                <button type="button" data-qlclose="1" onClick={v.closeDemo} style={{"display":"flex","alignItems":"center","gap":"10px","minHeight":"38px","background":"rgba(11,9,6,0.4)","border":"1px solid rgba(243,236,221,0.26)","padding":"0 14px","cursor":"pointer","font":"inherit","letterSpacing":"inherit","textTransform":"inherit","color":"#F3ECDD"}} className="scp5">
                  Leave desk
                  <span style={{"color":"rgba(243,236,221,0.66)"}}>
                    esc
                  </span>
                </button>
              </div>
              {v.qlLauncher ? (
                <>
                  <div data-qv="" style={{"position":"relative","width":"min(100%,940px)","display":"flex","flexDirection":"column","gap":"clamp(18px,2.6vh,30px)"}}>
                    <div style={{"display":"flex","flexDirection":"column","gap":"10px"}}>
                      <span style={{"fontFamily":"'JetBrains Mono',monospace","fontSize":"11px","letterSpacing":"0.2em","textTransform":"uppercase","color":"rgba(243,236,221,0.66)"}}>
                        {"~/demos · "}
                        {text(v.demoCount)}
                      </span>
                      <h2 id="ql-title" style={{"margin":"0","fontFamily":"'Shippori Mincho B1',serif","fontWeight":"800","fontSize":"clamp(34px,4.4vw,60px)","lineHeight":"0.95","textTransform":"uppercase"}}>
                        Live demos
                      </h2>
                      <p style={{"margin":"0","maxWidth":"52ch","fontSize":"15px","lineHeight":"1.6","color":"rgba(243,236,221,0.8)","textWrap":"pretty"}}>
                        Working builds that run right here in your browser. Pick one to start.
                      </p>
                    </div>
                    <div style={{"display":"grid","gridTemplateColumns":"repeat(auto-fill,minmax(min(100%,280px),1fr))","gap":"14px"}}>
                      {list(v.demos).map((d, i) => (
                        <Fragment key={i}>
                          {d?.live ? (
                            <>
                              <button type="button" onClick={d?.open} aria-label={"Run the " + (d?.title ?? '') + " demo"} style={{"display":"grid","gridTemplateColumns":"76px minmax(0,1fr)","gap":"18px","alignItems":"start","padding":"16px","textAlign":"left","background":"rgba(131,190,176,0.06)","border":"1px solid rgba(131,190,176,0.42)","cursor":"pointer","font":"inherit","color":"#F3ECDD"}} className="scpd">
                                <div aria-hidden="true" style={css("width:76px;aspect-ratio:1320/2698;background-image:url(" + (d?.shot ?? '') + ");background-size:cover;background-position:top;border-radius:10px;box-shadow:0 0 0 1px rgba(243,236,221,0.14)")} />
                                <span style={{"display":"flex","flexDirection":"column","gap":"9px","minWidth":"0"}}>
                                  <span style={{"fontFamily":"'Shippori Mincho B1',serif","fontWeight":"700","fontSize":"22px","lineHeight":"1.1","textTransform":"uppercase"}}>
                                    {text(d?.title)}
                                  </span>
                                  <span style={{"fontFamily":"'JetBrains Mono',monospace","fontSize":"11px","letterSpacing":"0.08em","textTransform":"uppercase","color":"rgba(243,236,221,0.66)"}}>
                                    {text(d?.stack)}
                                  </span>
                                  <span style={{"fontSize":"14px","lineHeight":"1.5","color":"rgba(243,236,221,0.8)","textWrap":"pretty"}}>
                                    {text(d?.line)}
                                  </span>
                                  <span style={{"display":"flex","alignItems":"center","gap":"8px","marginTop":"4px","fontFamily":"'JetBrains Mono',monospace","fontSize":"11px","letterSpacing":"0.14em","textTransform":"uppercase","color":"#A9D6CB"}}>
                                    ▶︎ Run demo
                                  </span>
                                </span>
                              </button>
                            </>
                          ) : null}
                          {d?.soon ? (
                            <>
                              <div style={{"display":"grid","gridTemplateColumns":"76px minmax(0,1fr)","gap":"18px","alignItems":"start","padding":"16px","border":"1px dashed rgba(243,236,221,0.22)","color":"rgba(243,236,221,0.75)"}}>
                                <div aria-hidden="true" style={css("width:76px;aspect-ratio:1320/2698;background-image:url(" + (d?.shot ?? '') + ");background-size:cover;background-position:top;border-radius:10px;opacity:0.55;filter:grayscale(0.6)")} />
                                <span style={{"display":"flex","flexDirection":"column","gap":"9px","minWidth":"0"}}>
                                  <span style={{"fontFamily":"'Shippori Mincho B1',serif","fontWeight":"700","fontSize":"22px","lineHeight":"1.1","textTransform":"uppercase"}}>
                                    {text(d?.title)}
                                  </span>
                                  <span style={{"fontFamily":"'JetBrains Mono',monospace","fontSize":"11px","letterSpacing":"0.08em","textTransform":"uppercase","color":"rgba(224,150,127,0.85)"}}>
                                    {text(d?.stack)}
                                  </span>
                                  <span style={{"display":"flex","alignItems":"center","gap":"8px","marginTop":"4px","fontFamily":"'JetBrains Mono',monospace","fontSize":"11px","letterSpacing":"0.14em","textTransform":"uppercase","color":"rgba(243,236,221,0.6)"}}>
                                    Demo coming soon
                                  </span>
                                </span>
                              </div>
                            </>
                          ) : null}
                        </Fragment>
                      ))}
                    </div>
                  </div>
                </>
              ) : null}
              {v.qlInApp ? (
                <>
                  <div data-g="qlside" data-qv="" style={{"display":"flex","flexDirection":"column","gap":"18px","maxWidth":"340px"}}>
                    <span style={{"fontFamily":"'JetBrains Mono',monospace","fontSize":"11px","letterSpacing":"0.2em","textTransform":"uppercase","color":"rgba(243,236,221,0.66)"}}>
                      01 · Interactive demo
                    </span>
                    <h2 id="ql-title" style={{"margin":"0","fontFamily":"'Shippori Mincho B1',serif","fontWeight":"800","fontSize":"clamp(34px,4vw,54px)","lineHeight":"0.95","textTransform":"uppercase"}}>
                      Quiet Ledger
                    </h2>
                    <p data-g="qlhelp" style={{"margin":"0","fontSize":"15px","lineHeight":"1.6","color":"rgba(243,236,221,0.82)","textWrap":"pretty"}}>
                      {"A working copy of the app’s core loop. Add an expense and watch "}
                      <strong style={{"color":"#F3ECDD","fontWeight":"500"}}>
                        left to spend
                      </strong>
                      , the daily allowance and the budget bars update.
                    </p>
                    <div data-g="qlhelp" style={{"display":"flex","flexDirection":"column","gap":"8px","fontFamily":"'JetBrains Mono',monospace","fontSize":"11px","letterSpacing":"0.08em","textTransform":"uppercase","color":"rgba(243,236,221,0.7)"}}>
                      <span>
                        ① Tap “Add transaction”
                      </span>
                      <span>
                        {"② Push Food & Dining over its limit"}
                      </span>
                      <span>
                        ③ Delete it in Transactions
                      </span>
                    </div>
                    <span style={{"alignSelf":"flex-start","padding":"5px 9px","border":"1px dashed rgba(243,236,221,0.32)","fontFamily":"'JetBrains Mono',monospace","fontSize":"10.5px","letterSpacing":"0.08em","textTransform":"uppercase","color":"rgba(243,236,221,0.72)"}}>
                      Demo data · not the production app
                    </span>
                    <div style={{"display":"flex","flexWrap":"wrap","gap":"10px"}}>
                      <button type="button" onClick={v.qlHome} style={{"display":"flex","alignItems":"center","gap":"10px","minHeight":"44px","background":"transparent","border":"1px solid rgba(243,236,221,0.3)","padding":"0 16px","cursor":"pointer","fontFamily":"'JetBrains Mono',monospace","fontSize":"11px","letterSpacing":"0.16em","textTransform":"uppercase","color":"#F3ECDD"}} className="scp5">
                        ← All demos
                      </button>
                      <button type="button" onClick={v.qlReset} style={{"display":"flex","alignItems":"center","minHeight":"44px","background":"transparent","border":"none","padding":"0 6px","cursor":"pointer","fontFamily":"'JetBrains Mono',monospace","fontSize":"11px","letterSpacing":"0.16em","textTransform":"uppercase","color":"rgba(243,236,221,0.7)"}} className="scp1">
                        Reset demo ↺
                      </button>
                    </div>
                  </div>
                  <div data-g="qlframe" data-qv="" style={{"position":"relative","flex":"none","width":"390px","height":"830px","borderRadius":"50px","border":"9px solid #1C1C1C","boxShadow":"0 0 0 1px rgba(243,236,221,0.14),0 40px 90px rgba(0,0,0,0.65),0 0 120px rgba(132,189,177,0.12)","background":"#111716","overflow":"hidden","fontFamily":"-apple-system,'SF Pro Text','Inter',system-ui,'Segoe UI',sans-serif","color":"#EEF3F1"}}>
                    {' '}
                    <div ref={v.qlScroll} data-qlscreen="" style={{"position":"absolute","inset":"0","overflowY":"auto","overscrollBehavior":"contain","scrollbarWidth":"none","padding":"22px 18px 118px","display":"flex","flexDirection":"column","gap":"14px"}}>
                      {v.qlIsLedger ? (
                        <>
                          <div style={{"display":"flex","alignItems":"flex-start","justifyContent":"space-between","gap":"10px","padding":"2px 0 8px"}}>
                            <span style={{"display":"flex","flexDirection":"column","gap":"6px"}}>
                              <span style={{"fontSize":"11px","fontWeight":"500","letterSpacing":"0.18em","textTransform":"uppercase","color":"#A3AFAB"}}>
                                Your ledger
                              </span>
                              <span style={{"fontSize":"23px","fontWeight":"700","letterSpacing":"-0.01em"}}>
                                Good to see you, Pro
                              </span>
                            </span>
                            <button type="button" onClick={v.qlGoProfile} aria-label="Profile" style={{"display":"flex","alignItems":"center","justifyContent":"center","width":"48px","height":"48px","border":"none","borderRadius":"16px","background":"#1F2826","color":"#EEF3F1","cursor":"pointer"}}>
                              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                                <circle cx="12" cy="8" r="4" />
                                <path d="M4.5 20.5c1.2-3.6 4-5.5 7.5-5.5s6.3 1.9 7.5 5.5" />
                              </svg>
                            </button>
                          </div>
                          <div style={{"background":"#1A2120","border":"1px solid #2B3533","borderRadius":"22px","overflow":"hidden"}}>
                            {' '}
                            <div style={{"display":"flex","flexDirection":"column","gap":"10px","padding":"20px 20px 18px"}}>
                              <span style={{"fontSize":"10.5px","fontWeight":"500","letterSpacing":"0.18em","textTransform":"uppercase","color":"#A3AFAB"}}>
                                {text(v.qlMonthUp)}
                                {" · Income − spending"}
                              </span>
                              <span style={{"fontFamily":"'JetBrains Mono',monospace","fontWeight":"700","letterSpacing":"-0.01em","fontSize":"35px","lineHeight":"1"}}>
                                {text(v.qlNet)}
                              </span>
                            </div>
                            {' '}
                            <div style={{"display":"grid","gridTemplateColumns":"1fr 1fr","borderTop":"1px solid #2B3533"}}>
                              <div style={{"display":"flex","flexDirection":"column","gap":"6px","padding":"14px 18px","borderRight":"1px solid #2B3533"}}>
                                <span style={{"fontSize":"10.5px","fontWeight":"500","letterSpacing":"0.18em","textTransform":"uppercase","color":"#A3AFAB"}}>
                                  Income
                                </span>
                                <span style={{"fontFamily":"'JetBrains Mono',monospace","fontWeight":"700","letterSpacing":"-0.01em","fontSize":"17px"}}>
                                  {text(v.qlIncome)}
                                </span>
                              </div>
                              <div style={{"display":"flex","flexDirection":"column","gap":"6px","padding":"14px 18px"}}>
                                <span style={{"fontSize":"10.5px","fontWeight":"500","letterSpacing":"0.18em","textTransform":"uppercase","color":"#A3AFAB"}}>
                                  Spending
                                </span>
                                <span style={{"fontFamily":"'JetBrains Mono',monospace","fontWeight":"700","letterSpacing":"-0.01em","fontSize":"17px"}}>
                                  {text(v.qlSpend)}
                                </span>
                              </div>
                            </div>
                            {' '}
                          </div>
                          <span style={{"padding":"0 4px","fontSize":"12.5px","fontWeight":"500","marginTop":"-4px"}}>
                            {"All-time balance "}
                            {text(v.qlAllTime)}
                          </span>
                          <button type="button" onClick={v.qlGoBudgets} style={{"background":"#1A2120","border":"1px solid #2B3533","borderRadius":"22px","display":"flex","flexDirection":"column","gap":"12px","padding":"18px 20px","textAlign":"left","cursor":"pointer","color":"inherit","fontFamily":"inherit"}}>
                            <span style={{"fontSize":"10.5px","fontWeight":"500","letterSpacing":"0.18em","textTransform":"uppercase","color":"#A3AFAB"}}>
                              Left to spend
                            </span>
                            <span style={{"display":"flex","alignItems":"center","justifyContent":"space-between","gap":"8px","width":"100%"}}>
                              <span style={css("font-family:'JetBrains Mono',monospace;font-weight:700;letter-spacing:-0.01em;font-size:20px;color:" + (v.qlLeftCol ?? ''))}>
                                {text(v.qlLeft)}
                              </span>
                              <span style={{"display":"flex","alignItems":"center","gap":"6px","fontSize":"12.5px","fontWeight":"500"}}>
                                <span style={{"whiteSpace":"nowrap"}}>
                                  {text(v.qlPerDay)}
                                  {"/day · "}
                                  {text(v.qlDays)}
                                  {" days left"}
                                </span>
                                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                                  <path d="M9 5l7 7-7 7" />
                                </svg>
                              </span>
                            </span>
                            <span style={{"display":"block","width":"100%","height":"6px","borderRadius":"3px","background":"#25302D","overflow":"hidden"}}>
                              <span style={css("display:block;height:100%;width:" + (v.qlUsedPct ?? '') + ";border-radius:3px;background:" + (v.qlLeftBar ?? '') + ";transition:width .6s cubic-bezier(.2,.8,.2,1),background .3s ease")} />
                            </span>
                          </button>
                          <button type="button" onClick={v.qlOpenSheet} style={{"display":"flex","alignItems":"center","justifyContent":"center","gap":"12px","minHeight":"56px","border":"none","borderRadius":"20px","background":"#84BDB1","color":"#F4F8F6","fontFamily":"inherit","fontSize":"16.5px","fontWeight":"600","cursor":"pointer"}} className="scpe">
                            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                              <path d="M12 5v14M5 12h14" />
                            </svg>
                            Add transaction
                          </button>
                          <div style={{"display":"flex","alignItems":"flex-end","justifyContent":"space-between","gap":"10px","padding":"14px 0 12px","borderBottom":"1px solid #2B3533"}}>
                            <span style={{"display":"flex","flexDirection":"column","gap":"5px"}}>
                              <span style={{"fontSize":"11px","fontWeight":"500","letterSpacing":"0.18em","textTransform":"uppercase","color":"#A3AFAB"}}>
                                Keep an eye on
                              </span>
                              <span style={{"fontSize":"19px","fontWeight":"600"}}>
                                Coming up
                              </span>
                            </span>
                          </div>
                          <div style={{"background":"#1A2120","border":"1px solid #2B3533","borderRadius":"22px","display":"flex","flexDirection":"column","padding":"0 18px"}}>
                            <div style={{"display":"grid","gridTemplateColumns":"42px minmax(0,1fr) 20px","alignItems":"center","gap":"14px","padding":"16px 0","borderBottom":"1px solid #2B3533"}}>
                              <span style={{"display":"flex","alignItems":"center","justifyContent":"center","width":"42px","height":"42px","borderRadius":"13px","background":"#1F2826","color":"#84BDB1"}}>
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                                  <path d="M4 9h13l-3-3M20 15H7l3 3" />
                                </svg>
                              </span>
                              <span style={{"display":"flex","flexDirection":"column","gap":"3px"}}>
                                <span style={{"fontSize":"15px","fontWeight":"600"}}>
                                  Recurring
                                </span>
                                <span style={{"fontSize":"14px"}}>
                                  1 active
                                </span>
                              </span>
                              <span style={{"color":"#A3AFAB"}}>
                                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                                  <path d="M9 5l7 7-7 7" />
                                </svg>
                              </span>
                            </div>
                            <div style={{"display":"flex","justifyContent":"space-between","gap":"10px","padding":"14px 0 16px","fontSize":"14.5px"}}>
                              <span>
                                Housing
                              </span>
                              <span style={{"fontFamily":"'JetBrains Mono',monospace","fontWeight":"700"}}>
                                −US$1,350.00
                              </span>
                            </div>
                          </div>
                          <div style={{"background":"#1A2120","border":"1px solid #2B3533","borderRadius":"22px","display":"flex","flexDirection":"column","gap":"14px","padding":"16px 18px"}}>
                            <div style={{"display":"grid","gridTemplateColumns":"42px minmax(0,1fr) 20px","alignItems":"center","gap":"14px"}}>
                              <span style={{"display":"flex","alignItems":"center","justifyContent":"center","width":"42px","height":"42px","borderRadius":"13px","background":"#1F2826","color":"#84BDB1"}}>
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                                  <path d="M6 21V4M6 4h11l-2 4 2 4H6" />
                                </svg>
                              </span>
                              <span style={{"display":"flex","flexDirection":"column","gap":"3px"}}>
                                <span style={{"fontSize":"15px","fontWeight":"600"}}>
                                  Trip
                                </span>
                                <span style={{"fontSize":"14px"}}>
                                  US$0.00 of US$5,000.00
                                </span>
                              </span>
                              <span style={{"color":"#A3AFAB"}}>
                                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                                  <path d="M9 5l7 7-7 7" />
                                </svg>
                              </span>
                            </div>
                            <span style={{"display":"block","height":"6px","borderRadius":"3px","background":"#25302D"}} />
                          </div>
                          <div style={{"display":"flex","alignItems":"flex-end","justifyContent":"space-between","gap":"10px","padding":"14px 0 12px","borderBottom":"1px solid #2B3533"}}>
                            <span style={{"display":"flex","flexDirection":"column","gap":"5px"}}>
                              <span style={{"fontSize":"11px","fontWeight":"500","letterSpacing":"0.18em","textTransform":"uppercase","color":"#A3AFAB"}}>
                                Latest entries
                              </span>
                              <span style={{"fontSize":"19px","fontWeight":"600"}}>
                                Recent activity
                              </span>
                            </span>
                            <button type="button" onClick={v.qlGoTx} style={{"border":"none","background":"transparent","color":"#EEF3F1","fontFamily":"inherit","fontSize":"14.5px","fontWeight":"500","cursor":"pointer","padding":"6px 2px"}}>
                              View ledger
                            </button>
                          </div>
                          <div style={{"background":"#1A2120","border":"1px solid #2B3533","borderRadius":"22px","display":"flex","flexDirection":"column","padding":"2px 16px"}}>
                            {list(v.qlLatest).map((t, i) => (
                              <Fragment key={i}>
                                <div style={{"display":"grid","gridTemplateColumns":"40px minmax(0,1fr) auto","alignItems":"center","gap":"12px","padding":"12px 0","borderBottom":"1px solid #242D2B"}}>
                                  <span style={css("display:flex;align-items:center;justify-content:center;width:40px;height:40px;border-radius:12px;background:" + (t?.ibg ?? '') + ";color:" + (t?.tint ?? '') + ";font-family:'JetBrains Mono',monospace;font-size:13px;font-weight:700")}>
                                    {text(t?.glyph)}
                                  </span>
                                  <span style={{"display":"flex","flexDirection":"column","gap":"2px","minWidth":"0"}}>
                                    <span style={{"fontSize":"15px","fontWeight":"500","overflow":"hidden","textOverflow":"ellipsis","whiteSpace":"nowrap"}}>
                                      {text(t?.n)}
                                    </span>
                                    <span style={{"fontSize":"12.5px","color":"#A3AFAB"}}>
                                      {text(t?.catLabel)}
                                      {" · "}
                                      {text(t?.d)}
                                    </span>
                                  </span>
                                  <span style={css("font-family:'JetBrains Mono',monospace;font-size:14px;font-weight:700;color:" + (t?.col ?? ''))}>
                                    {text(t?.amtStr)}
                                  </span>
                                </div>
                              </Fragment>
                            ))}
                          </div>
                        </>
                      ) : null}
                      {v.qlIsTx ? (
                        <>
                          <div style={{"display":"flex","alignItems":"flex-start","justifyContent":"space-between","gap":"10px","padding":"2px 0 8px"}}>
                            <span style={{"display":"flex","flexDirection":"column","gap":"6px"}}>
                              <span style={{"fontSize":"11px","fontWeight":"500","letterSpacing":"0.18em","textTransform":"uppercase","color":"#A3AFAB"}}>
                                {text(v.qlCount)}
                                {" entries"}
                              </span>
                              <span style={{"fontSize":"23px","fontWeight":"700","letterSpacing":"-0.01em"}}>
                                Transactions
                              </span>
                            </span>
                            <button type="button" onClick={v.qlOpenSheet} aria-label="Add transaction" style={{"display":"flex","alignItems":"center","justifyContent":"center","width":"48px","height":"48px","border":"1.5px solid #84BDB1","borderRadius":"16px","background":"transparent","color":"#84BDB1","cursor":"pointer"}}>
                              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                                <path d="M12 5v14M5 12h14" />
                              </svg>
                            </button>
                          </div>
                          <div style={{"display":"grid","gridTemplateColumns":"44px 1fr 44px","alignItems":"center","padding":"8px 0","borderTop":"1px solid #2B3533","borderBottom":"1px solid #2B3533","background":"#141A19"}}>
                            <button type="button" onClick={v.qlSoon} aria-label="Previous period" style={{"display":"flex","alignItems":"center","justifyContent":"center","height":"44px","border":"none","background":"transparent","color":"#EEF3F1","cursor":"pointer"}}>
                              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                                <path d="M15 5l-7 7 7 7" />
                              </svg>
                            </button>
                            <span style={{"display":"flex","flexDirection":"column","alignItems":"center","gap":"3px"}}>
                              <span style={{"fontSize":"10px","fontWeight":"500","letterSpacing":"0.18em","textTransform":"uppercase","color":"#A3AFAB"}}>
                                Period
                              </span>
                              <span style={{"fontSize":"16.5px","fontWeight":"500"}}>
                                {text(v.qlMonth)}
                              </span>
                            </span>
                            <button type="button" onClick={v.qlSoon} aria-label="Next period" style={{"display":"flex","alignItems":"center","justifyContent":"center","height":"44px","border":"none","background":"transparent","color":"#A3AFAB","cursor":"pointer"}}>
                              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                                <path d="M9 5l7 7-7 7" />
                              </svg>
                            </button>
                          </div>
                          <div style={{"background":"#1A2120","border":"1px solid #2B3533","borderRadius":"22px","display":"flex","flexDirection":"column","padding":"2px 16px"}}>
                            {list(v.qlAll).map((t, i) => (
                              <Fragment key={i}>
                                <div style={{"display":"grid","gridTemplateColumns":"40px minmax(0,1fr) auto 32px","alignItems":"center","gap":"8px","padding":"12px 0","borderBottom":"1px solid #242D2B"}}>
                                  <span style={css("display:flex;align-items:center;justify-content:center;width:40px;height:40px;border-radius:12px;background:" + (t?.ibg ?? '') + ";color:" + (t?.tint ?? '') + ";font-family:'JetBrains Mono',monospace;font-size:13px;font-weight:700")}>
                                    {text(t?.glyph)}
                                  </span>
                                  <span style={{"display":"flex","flexDirection":"column","gap":"2px","minWidth":"0"}}>
                                    <span style={{"fontSize":"15px","fontWeight":"500","overflow":"hidden","textOverflow":"ellipsis","whiteSpace":"nowrap"}}>
                                      {text(t?.n)}
                                    </span>
                                    <span style={{"fontSize":"12.5px","color":"#A3AFAB"}}>
                                      {text(t?.catLabel)}
                                      {" · "}
                                      {text(t?.d)}
                                    </span>
                                  </span>
                                  <span style={css("font-family:'JetBrains Mono',monospace;font-size:14px;font-weight:700;color:" + (t?.col ?? ''))}>
                                    {text(t?.amtStr)}
                                  </span>
                                  <button type="button" onClick={t?.del} aria-label={"Delete " + (t?.n ?? '')} style={{"display":"flex","alignItems":"center","justifyContent":"center","width":"32px","height":"40px","border":"none","borderRadius":"10px","background":"transparent","color":"#E07A6E","cursor":"pointer"}} className="scpf">
                                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                                      <path d="M4 7h16M9 7V4h6v3M6.5 7l1 13h9l1-13M10 11v6M14 11v6" />
                                    </svg>
                                  </button>
                                </div>
                              </Fragment>
                            ))}
                          </div>
                        </>
                      ) : null}
                      {v.qlIsReports ? (
                        <>
                          <div style={{"display":"flex","alignItems":"flex-start","justifyContent":"space-between","gap":"10px","padding":"2px 0 8px"}}>
                            <span style={{"display":"flex","flexDirection":"column","gap":"6px"}}>
                              <span style={{"fontSize":"11px","fontWeight":"500","letterSpacing":"0.18em","textTransform":"uppercase","color":"#A3AFAB"}}>
                                Insights ledger
                              </span>
                              <span style={{"fontSize":"23px","fontWeight":"700","letterSpacing":"-0.01em"}}>
                                Reports
                              </span>
                            </span>
                            <span style={{"display":"flex","gap":"8px"}}>
                              <button type="button" onClick={v.qlSoon} style={{"minHeight":"44px","padding":"0 14px","border":"1px solid #2B3533","borderRadius":"16px","background":"#151B1A","color":"#EEF3F1","fontFamily":"inherit","fontSize":"14px","fontWeight":"500","cursor":"pointer"}}>
                                CSV
                              </button>
                              <button type="button" onClick={v.qlSoon} style={{"minHeight":"44px","padding":"0 16px","border":"none","borderRadius":"16px","background":"#84BDB1","color":"#F4F8F6","fontFamily":"inherit","fontSize":"14px","fontWeight":"500","cursor":"pointer"}}>
                                PDF
                              </button>
                            </span>
                          </div>
                          <div style={{"background":"#1A2120","border":"1px solid #2B3533","borderRadius":"22px","display":"flex","flexDirection":"column","gap":"12px","padding":"18px 16px 16px"}}>
                            <span style={{"display":"flex","flexDirection":"column","gap":"6px","paddingBottom":"12px","borderBottom":"1px solid #2B3533"}}>
                              <span style={{"fontSize":"10.5px","fontWeight":"500","letterSpacing":"0.18em","textTransform":"uppercase","color":"#A3AFAB"}}>
                                Reporting period
                              </span>
                              <span style={{"fontSize":"16px","fontWeight":"500"}}>
                                Monthly view
                              </span>
                            </span>
                            <div style={{"display":"grid","gridTemplateColumns":"1fr 1fr","padding":"3px","border":"1px solid #2B3533","borderRadius":"16px","background":"#1E2725"}}>
                              <span style={{"display":"flex","alignItems":"center","justifyContent":"center","minHeight":"38px","borderRadius":"13px","background":"#151B1A","fontSize":"13.5px","fontWeight":"500"}}>
                                Month
                              </span>
                              <span style={{"display":"flex","alignItems":"center","justifyContent":"center","minHeight":"38px","fontSize":"13.5px","color":"#A3AFAB"}}>
                                Date range
                              </span>
                            </div>
                            <div style={{"display":"grid","gridTemplateColumns":"44px 1fr 44px","alignItems":"center","padding":"8px 0","borderTop":"1px solid #2B3533","borderBottom":"1px solid #2B3533","background":"#141A19"}}>
                              <button type="button" onClick={v.qlSoon} aria-label="Previous period" style={{"display":"flex","alignItems":"center","justifyContent":"center","height":"44px","border":"none","background":"transparent","color":"#EEF3F1","cursor":"pointer"}}>
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                                  <path d="M15 5l-7 7 7 7" />
                                </svg>
                              </button>
                              <span style={{"display":"flex","flexDirection":"column","alignItems":"center","gap":"3px"}}>
                                <span style={{"fontSize":"10px","fontWeight":"500","letterSpacing":"0.18em","textTransform":"uppercase","color":"#A3AFAB"}}>
                                  Period
                                </span>
                                <span style={{"fontSize":"16.5px","fontWeight":"500"}}>
                                  {text(v.qlMonth)}
                                </span>
                              </span>
                              <button type="button" onClick={v.qlSoon} aria-label="Next period" style={{"display":"flex","alignItems":"center","justifyContent":"center","height":"44px","border":"none","background":"transparent","color":"#A3AFAB","cursor":"pointer"}}>
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                                  <path d="M9 5l7 7-7 7" />
                                </svg>
                              </button>
                            </div>
                          </div>
                          <div style={{"display":"flex","alignItems":"flex-end","justifyContent":"space-between","gap":"10px","padding":"14px 0 12px","borderBottom":"1px solid #2B3533"}}>
                            <span style={{"display":"flex","flexDirection":"column","gap":"5px"}}>
                              <span style={{"fontSize":"11px","fontWeight":"500","letterSpacing":"0.18em","textTransform":"uppercase","color":"#A3AFAB"}}>
                                Period balance
                              </span>
                              <span style={{"fontSize":"19px","fontWeight":"600"}}>
                                At a glance
                              </span>
                            </span>
                          </div>
                          <div style={{"background":"#1A2120","border":"1px solid #2B3533","borderRadius":"22px","overflow":"hidden"}}>
                            {' '}
                            <div style={{"display":"flex","flexDirection":"column","gap":"10px","padding":"22px 20px 18px"}}>
                              <span style={{"fontSize":"10.5px","fontWeight":"500","letterSpacing":"0.18em","textTransform":"uppercase","color":"#A3AFAB"}}>
                                Net retained
                              </span>
                              <span style={{"fontFamily":"'JetBrains Mono',monospace","fontWeight":"700","letterSpacing":"-0.01em","fontSize":"32px","color":"#84BDB1"}}>
                                {text(v.qlNet)}
                              </span>
                            </div>
                            {' '}
                            <div style={{"display":"grid","gridTemplateColumns":"1fr 1fr","borderTop":"1px solid #2B3533"}}>
                              <div style={{"display":"flex","flexDirection":"column","gap":"6px","padding":"16px 20px","borderRight":"1px solid #2B3533"}}>
                                <span style={{"fontSize":"10.5px","fontWeight":"500","letterSpacing":"0.18em","textTransform":"uppercase","color":"#A3AFAB"}}>
                                  Income
                                </span>
                                <span style={{"fontFamily":"'JetBrains Mono',monospace","fontWeight":"700","letterSpacing":"-0.01em","fontSize":"17px","color":"#84BDB1"}}>
                                  {text(v.qlIncomeK)}
                                </span>
                              </div>
                              <div style={{"display":"flex","flexDirection":"column","gap":"6px","padding":"16px 20px"}}>
                                <span style={{"fontSize":"10.5px","fontWeight":"500","letterSpacing":"0.18em","textTransform":"uppercase","color":"#A3AFAB"}}>
                                  Expense
                                </span>
                                <span style={{"fontFamily":"'JetBrains Mono',monospace","fontWeight":"700","letterSpacing":"-0.01em","fontSize":"17px","color":"#E07A6E"}}>
                                  {text(v.qlSpendK)}
                                </span>
                              </div>
                            </div>
                            {' '}
                          </div>
                          <div style={{"display":"flex","alignItems":"flex-end","justifyContent":"space-between","gap":"10px","padding":"14px 0 12px","borderBottom":"1px solid #2B3533"}}>
                            <span style={{"display":"flex","flexDirection":"column","gap":"5px"}}>
                              <span style={{"fontSize":"11px","fontWeight":"500","letterSpacing":"0.18em","textTransform":"uppercase","color":"#A3AFAB"}}>
                                {text(v.qlYear)}
                              </span>
                              <span style={{"fontSize":"19px","fontWeight":"600"}}>
                                Year in review
                              </span>
                            </span>
                          </div>
                          <div style={{"background":"#1A2120","border":"1px solid #2B3533","borderRadius":"22px","display":"flex","flexDirection":"column","gap":"14px","padding":"18px 16px"}}>
                            <div style={{"display":"grid","gridTemplateColumns":"repeat(3,minmax(0,1fr))","gap":"8px","paddingBottom":"14px","borderBottom":"1px solid #2B3533"}}>
                              <span style={{"display":"flex","flexDirection":"column","gap":"5px"}}>
                                <span style={{"fontSize":"10px","fontWeight":"500","letterSpacing":"0.18em","textTransform":"uppercase","color":"#A3AFAB"}}>
                                  Saved
                                </span>
                                <span style={{"fontFamily":"'JetBrains Mono',monospace","fontWeight":"700","letterSpacing":"-0.01em","fontSize":"15px","color":"#84BDB1"}}>
                                  {text(v.qlYSaved)}
                                </span>
                              </span>
                              <span style={{"display":"flex","flexDirection":"column","gap":"5px"}}>
                                <span style={{"fontSize":"10px","fontWeight":"500","letterSpacing":"0.18em","textTransform":"uppercase","color":"#A3AFAB"}}>
                                  Income
                                </span>
                                <span style={{"fontFamily":"'JetBrains Mono',monospace","fontWeight":"700","letterSpacing":"-0.01em","fontSize":"15px"}}>
                                  {text(v.qlYIncome)}
                                </span>
                              </span>
                              <span style={{"display":"flex","flexDirection":"column","gap":"5px"}}>
                                <span style={{"fontSize":"10px","fontWeight":"500","letterSpacing":"0.18em","textTransform":"uppercase","color":"#A3AFAB"}}>
                                  Expenses
                                </span>
                                <span style={{"fontFamily":"'JetBrains Mono',monospace","fontWeight":"700","letterSpacing":"-0.01em","fontSize":"15px"}}>
                                  {text(v.qlYExp)}
                                </span>
                              </span>
                            </div>
                            <span style={{"fontSize":"10.5px","fontWeight":"500","letterSpacing":"0.18em","textTransform":"uppercase","color":"#A3AFAB"}}>
                              Top spending categories
                            </span>
                            {list(v.qlTop).map((c, i) => (
                              <Fragment key={i}>
                                <div style={{"display":"flex","justifyContent":"space-between","gap":"10px","fontSize":"14.5px","fontWeight":"500"}}>
                                  <span>
                                    {text(c?.label)}
                                  </span>
                                  <span style={{"fontFamily":"'JetBrains Mono',monospace","fontWeight":"700"}}>
                                    {text(c?.v)}
                                  </span>
                                </div>
                              </Fragment>
                            ))}
                          </div>
                        </>
                      ) : null}
                      {v.qlIsBudgets ? (
                        <>
                          <div style={{"display":"flex","alignItems":"flex-start","justifyContent":"space-between","gap":"10px","padding":"2px 0 8px"}}>
                            <span style={{"display":"flex","flexDirection":"column","gap":"6px"}}>
                              <span style={{"fontSize":"11px","fontWeight":"500","letterSpacing":"0.18em","textTransform":"uppercase","color":"#A3AFAB"}}>
                                Monthly allocation
                              </span>
                              <span style={{"fontSize":"23px","fontWeight":"700","letterSpacing":"-0.01em"}}>
                                Budgets
                              </span>
                            </span>
                            <button type="button" onClick={v.qlSoon} aria-label="New allocation" style={{"display":"flex","alignItems":"center","justifyContent":"center","width":"48px","height":"48px","border":"1.5px solid #84BDB1","borderRadius":"16px","background":"transparent","color":"#84BDB1","cursor":"pointer"}}>
                              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                                <path d="M12 5v14M5 12h14" />
                              </svg>
                            </button>
                          </div>
                          <div style={{"display":"grid","gridTemplateColumns":"44px 1fr 44px","alignItems":"center","padding":"8px 0","borderTop":"1px solid #2B3533","borderBottom":"1px solid #2B3533","background":"#141A19"}}>
                            <button type="button" onClick={v.qlSoon} aria-label="Previous period" style={{"display":"flex","alignItems":"center","justifyContent":"center","height":"44px","border":"none","background":"transparent","color":"#EEF3F1","cursor":"pointer"}}>
                              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                                <path d="M15 5l-7 7 7 7" />
                              </svg>
                            </button>
                            <span style={{"display":"flex","flexDirection":"column","alignItems":"center","gap":"3px"}}>
                              <span style={{"fontSize":"10px","fontWeight":"500","letterSpacing":"0.18em","textTransform":"uppercase","color":"#A3AFAB"}}>
                                Period
                              </span>
                              <span style={{"fontSize":"16.5px","fontWeight":"500"}}>
                                {text(v.qlMonth)}
                              </span>
                            </span>
                            <button type="button" onClick={v.qlSoon} aria-label="Next period" style={{"display":"flex","alignItems":"center","justifyContent":"center","height":"44px","border":"none","background":"transparent","color":"#A3AFAB","cursor":"pointer"}}>
                              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                                <path d="M9 5l7 7-7 7" />
                              </svg>
                            </button>
                          </div>
                          <div style={{"display":"flex","alignItems":"flex-end","justifyContent":"space-between","gap":"10px","padding":"14px 0 12px","borderBottom":"1px solid #2B3533"}}>
                            <span style={{"display":"flex","flexDirection":"column","gap":"5px"}}>
                              <span style={{"fontSize":"11px","fontWeight":"500","letterSpacing":"0.18em","textTransform":"uppercase","color":"#A3AFAB"}}>
                                Monthly position
                              </span>
                              <span style={{"fontSize":"19px","fontWeight":"600"}}>
                                Allocation summary
                              </span>
                            </span>
                          </div>
                          <div style={{"background":"#1A2120","border":"1px solid #2B3533","borderRadius":"22px","overflow":"hidden"}}>
                            {' '}
                            <div style={{"display":"flex","flexDirection":"column","gap":"14px","padding":"24px 22px 20px"}}>
                              <span style={{"fontSize":"10.5px","fontWeight":"500","letterSpacing":"0.18em","textTransform":"uppercase","color":"#A3AFAB"}}>
                                Available to spend
                              </span>
                              <span style={css("font-family:'JetBrains Mono',monospace;font-weight:700;letter-spacing:-0.01em;font-size:32px;color:" + (v.qlAvailCol ?? ''))}>
                                {text(v.qlLeft)}
                              </span>
                              <span style={{"display":"block","height":"7px","borderRadius":"4px","background":"#25302D","overflow":"hidden"}}>
                                <span style={css("display:block;height:100%;width:" + (v.qlUsedPct ?? '') + ";border-radius:4px;background:" + (v.qlLeftBar ?? '') + ";transition:width .6s cubic-bezier(.2,.8,.2,1)")} />
                              </span>
                            </div>
                            {' '}
                            <div style={{"display":"grid","gridTemplateColumns":"1fr 1fr","borderTop":"1px solid #2B3533","margin":"0 16px"}}>
                              <div style={{"display":"flex","flexDirection":"column","gap":"6px","padding":"16px 12px","borderRight":"1px solid #2B3533"}}>
                                <span style={{"fontSize":"10.5px","fontWeight":"500","letterSpacing":"0.18em","textTransform":"uppercase","color":"#A3AFAB"}}>
                                  Allocated
                                </span>
                                <span style={{"fontFamily":"'JetBrains Mono',monospace","fontWeight":"700","letterSpacing":"-0.01em","fontSize":"16px"}}>
                                  {text(v.qlAlloc)}
                                </span>
                              </div>
                              <div style={{"display":"flex","flexDirection":"column","gap":"6px","padding":"16px 14px"}}>
                                <span style={{"fontSize":"10.5px","fontWeight":"500","letterSpacing":"0.18em","textTransform":"uppercase","color":"#A3AFAB"}}>
                                  Spent
                                </span>
                                <span style={{"fontFamily":"'JetBrains Mono',monospace","fontWeight":"700","letterSpacing":"-0.01em","fontSize":"16px"}}>
                                  {text(v.qlBSpent)}
                                </span>
                              </div>
                            </div>
                            {' '}
                          </div>
                          <div style={{"display":"flex","alignItems":"flex-end","justifyContent":"space-between","gap":"10px","padding":"14px 0 12px","borderBottom":"1px solid #2B3533"}}>
                            <span style={{"display":"flex","flexDirection":"column","gap":"5px"}}>
                              <span style={{"fontSize":"11px","fontWeight":"500","letterSpacing":"0.18em","textTransform":"uppercase","color":"#A3AFAB"}}>
                                {text(v.qlAllocCount)}
                              </span>
                              <span style={{"fontSize":"19px","fontWeight":"600"}}>
                                Category ledger
                              </span>
                            </span>
                            <button type="button" onClick={v.qlSoon} style={{"display":"flex","alignItems":"center","gap":"8px","border":"none","background":"transparent","color":"#EEF3F1","fontFamily":"inherit","fontSize":"14.5px","fontWeight":"500","cursor":"pointer","padding":"6px 4px"}}>
                              <span style={{"color":"#84BDB1","display":"flex"}}>
                                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                                  <path d="M12 5v14M5 12h14" />
                                </svg>
                              </span>
                              Add
                            </button>
                          </div>
                          {list(v.qlBudgets).map((b, i) => (
                            <Fragment key={i}>
                              <div style={{"background":"#1A2120","border":"1px solid #2B3533","borderRadius":"22px","display":"flex","flexDirection":"column","padding":"16px 16px 18px"}}>
                                <div style={{"display":"grid","gridTemplateColumns":"42px minmax(0,1fr) auto","alignItems":"center","gap":"12px","paddingBottom":"14px","borderBottom":"1px solid #2B3533"}}>
                                  <span style={{"display":"flex","alignItems":"center","justifyContent":"center","width":"42px","height":"42px","borderRadius":"12px","background":"#2E2220","border":"1px solid #3D2C29","color":"#E07A6E","fontFamily":"'JetBrains Mono',monospace","fontSize":"14px","fontWeight":"700"}}>
                                    {text(b?.glyph)}
                                  </span>
                                  <span style={{"display":"flex","flexDirection":"column","gap":"3px"}}>
                                    <span style={{"fontSize":"16px","fontWeight":"600"}}>
                                      {text(b?.label)}
                                    </span>
                                    <span style={{"fontSize":"10px","fontWeight":"500","letterSpacing":"0.18em","textTransform":"uppercase","color":"#A3AFAB"}}>
                                      Monthly limit
                                    </span>
                                  </span>
                                  <span style={{"display":"flex","gap":"2px"}}>
                                    <button type="button" onClick={v.qlSoon} aria-label="Edit" style={{"width":"36px","height":"40px","border":"none","background":"transparent","color":"#EEF3F1","cursor":"pointer"}}>
                                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                                        <path d="M4 20l4-1L19 8l-3-3L5 16z" />
                                      </svg>
                                    </button>
                                    <button type="button" onClick={v.qlSoon} aria-label="Delete" style={{"width":"36px","height":"40px","border":"none","background":"transparent","color":"#E07A6E","cursor":"pointer"}}>
                                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                                        <path d="M4 7h16M9 7V4h6v3M6.5 7l1 13h9l1-13M10 11v6M14 11v6" />
                                      </svg>
                                    </button>
                                  </span>
                                </div>
                                <div style={{"display":"grid","gridTemplateColumns":"1fr 1fr","gap":"10px","padding":"14px 0","borderBottom":"1px solid #2B3533"}}>
                                  <span style={{"display":"flex","flexDirection":"column","gap":"5px"}}>
                                    <span style={{"fontSize":"10px","fontWeight":"500","letterSpacing":"0.18em","textTransform":"uppercase","color":"#A3AFAB"}}>
                                      Spent
                                    </span>
                                    <span style={{"fontFamily":"'JetBrains Mono',monospace","fontWeight":"700","letterSpacing":"-0.01em","fontSize":"16px"}}>
                                      {text(b?.spentStr)}
                                    </span>
                                  </span>
                                  <span style={{"display":"flex","flexDirection":"column","gap":"5px"}}>
                                    <span style={{"fontSize":"10px","fontWeight":"500","letterSpacing":"0.18em","textTransform":"uppercase","color":"#A3AFAB"}}>
                                      {text(b?.remLabel)}
                                    </span>
                                    <span style={css("font-family:'JetBrains Mono',monospace;font-weight:700;letter-spacing:-0.01em;font-size:16px;color:" + (b?.col ?? ''))}>
                                      {text(b?.remStr)}
                                    </span>
                                  </span>
                                </div>
                                <div style={{"display":"flex","justifyContent":"space-between","padding":"14px 0 10px","fontSize":"12.5px"}}>
                                  <span>
                                    {text(b?.pctStr)}
                                    {" used"}
                                  </span>
                                  <span style={{"fontFamily":"'JetBrains Mono',monospace","fontWeight":"700"}}>
                                    {text(b?.limitStr)}
                                  </span>
                                </div>
                                <span style={{"display":"block","height":"7px","borderRadius":"4px","background":"#25302D","overflow":"hidden"}}>
                                  <span style={css("display:block;height:100%;width:" + (b?.barW ?? '') + ";border-radius:4px;background:" + (b?.col ?? '') + ";transition:width .6s cubic-bezier(.2,.8,.2,1),background .3s ease")} />
                                </span>
                              </div>
                            </Fragment>
                          ))}
                        </>
                      ) : null}
                      {v.qlIsProfile ? (
                        <>
                          <div style={{"display":"flex","alignItems":"flex-start","justifyContent":"space-between","gap":"10px","padding":"2px 0 8px"}}>
                            <span style={{"display":"flex","flexDirection":"column","gap":"6px"}}>
                              <span style={{"fontSize":"11px","fontWeight":"500","letterSpacing":"0.18em","textTransform":"uppercase","color":"#A3AFAB"}}>
                                Account
                              </span>
                              <span style={{"fontSize":"23px","fontWeight":"700","letterSpacing":"-0.01em"}}>
                                Profile
                              </span>
                            </span>
                          </div>
                          <div style={{"background":"#1A2120","border":"1px solid #2B3533","borderRadius":"22px","display":"grid","gridTemplateColumns":"52px minmax(0,1fr)","alignItems":"center","gap":"14px","padding":"18px"}}>
                            <span style={{"display":"flex","alignItems":"center","justifyContent":"center","width":"52px","height":"52px","borderRadius":"16px","background":"#1F2826","color":"#84BDB1"}}>
                              <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                                <circle cx="12" cy="8" r="4" />
                                <path d="M4.5 20.5c1.2-3.6 4-5.5 7.5-5.5s6.3 1.9 7.5 5.5" />
                              </svg>
                            </span>
                            <span style={{"display":"flex","flexDirection":"column","gap":"3px"}}>
                              <span style={{"fontSize":"17px","fontWeight":"600"}}>
                                Pro
                              </span>
                              <span style={{"fontSize":"13px","color":"#A3AFAB"}}>
                                demo@quietledger.app
                              </span>
                            </span>
                          </div>
                          <div style={{"background":"#1A2120","border":"1px solid #2B3533","borderRadius":"22px","display":"flex","flexDirection":"column","padding":"0 18px"}}>
                            <div style={{"display":"flex","justifyContent":"space-between","padding":"15px 0","borderBottom":"1px solid #2B3533","fontSize":"14.5px"}}>
                              <span>
                                Currency
                              </span>
                              <span style={{"fontFamily":"'JetBrains Mono',monospace","fontWeight":"700"}}>
                                USD
                              </span>
                            </div>
                            <div style={{"display":"flex","justifyContent":"space-between","padding":"15px 0","borderBottom":"1px solid #2B3533","fontSize":"14.5px"}}>
                              <span>
                                Month starts on
                              </span>
                              <span>
                                1st
                              </span>
                            </div>
                            <div style={{"display":"flex","justifyContent":"space-between","padding":"15px 0","fontSize":"14.5px"}}>
                              <span>
                                Bank connection
                              </span>
                              <span style={{"color":"#A3AFAB"}}>
                                None — by design
                              </span>
                            </div>
                          </div>
                        </>
                      ) : null}
                    </div>
                    {' '}
                    <div style={{"position":"absolute","left":"10px","right":"10px","bottom":"12px","display":"grid","gridTemplateColumns":"repeat(5,1fr)","gap":"2px","padding":"5px","borderRadius":"32px","background":"rgba(26,33,32,0.9)","border":"1px solid #333D3B","boxShadow":"0 10px 30px rgba(0,0,0,0.45)","backdropFilter":"blur(14px)","WebkitBackdropFilter":"blur(14px)"}}>
                      <button type="button" onClick={v.qlNav?.ledger?.pick} aria-pressed={v.qlNav?.ledger?.on} style={css("display:flex;flex-direction:column;align-items:center;justify-content:center;gap:3px;min-height:58px;border:none;border-radius:26px;background:" + (v.qlNav?.ledger?.bg ?? '') + ";color:" + (v.qlNav?.ledger?.col ?? '') + ";font-family:inherit;font-size:11px;font-weight:500;cursor:pointer;padding:0")}>
                        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                          <path d="M6 3.5h11.5v14H7.5A1.5 1.5 0 0 0 6 19z" />
                          <path d="M6 19a1.5 1.5 0 0 0 1.5 1.5h10v-3" />
                        </svg>
                        <span>
                          Ledger
                        </span>
                      </button>
                      <button type="button" onClick={v.qlNav?.tx?.pick} aria-pressed={v.qlNav?.tx?.on} style={css("display:flex;flex-direction:column;align-items:center;justify-content:center;gap:3px;min-height:58px;border:none;border-radius:26px;background:" + (v.qlNav?.tx?.bg ?? '') + ";color:" + (v.qlNav?.tx?.col ?? '') + ";font-family:inherit;font-size:11px;font-weight:500;cursor:pointer;padding:0")}>
                        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                          <path d="M9 6h11M9 12h11M9 18h11" />
                          <circle cx="4.5" cy="6" r="0.6" />
                          <circle cx="4.5" cy="12" r="0.6" />
                          <circle cx="4.5" cy="18" r="0.6" />
                        </svg>
                        <span>
                          Transactions
                        </span>
                      </button>
                      <button type="button" onClick={v.qlNav?.reports?.pick} aria-pressed={v.qlNav?.reports?.on} style={css("display:flex;flex-direction:column;align-items:center;justify-content:center;gap:3px;min-height:58px;border:none;border-radius:26px;background:" + (v.qlNav?.reports?.bg ?? '') + ";color:" + (v.qlNav?.reports?.col ?? '') + ";font-family:inherit;font-size:11px;font-weight:500;cursor:pointer;padding:0")}>
                        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                          <rect x="3.5" y="11" width="4.5" height="9" rx="1" />
                          <rect x="9.75" y="5" width="4.5" height="15" rx="1" />
                          <rect x="16" y="8" width="4.5" height="12" rx="1" />
                        </svg>
                        <span>
                          Reports
                        </span>
                      </button>
                      <button type="button" onClick={v.qlNav?.budgets?.pick} aria-pressed={v.qlNav?.budgets?.on} style={css("display:flex;flex-direction:column;align-items:center;justify-content:center;gap:3px;min-height:58px;border:none;border-radius:26px;background:" + (v.qlNav?.budgets?.bg ?? '') + ";color:" + (v.qlNav?.budgets?.col ?? '') + ";font-family:inherit;font-size:11px;font-weight:500;cursor:pointer;padding:0")}>
                        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                          <rect x="5" y="4" width="14" height="17" rx="2" />
                          <path d="M9 4V3h6v1M9 10h6M9 14h4" />
                        </svg>
                        <span>
                          Budgets
                        </span>
                      </button>
                      <button type="button" onClick={v.qlNav?.profile?.pick} aria-pressed={v.qlNav?.profile?.on} style={css("display:flex;flex-direction:column;align-items:center;justify-content:center;gap:3px;min-height:58px;border:none;border-radius:26px;background:" + (v.qlNav?.profile?.bg ?? '') + ";color:" + (v.qlNav?.profile?.col ?? '') + ";font-family:inherit;font-size:11px;font-weight:500;cursor:pointer;padding:0")}>
                        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                          <circle cx="12" cy="12" r="3" />
                          <path d="M12 3.5l1.6 2.2 2.7-.6.6 2.7 2.2 1.6-1.2 2.6 1.2 2.6-2.2 1.6-.6 2.7-2.7-.6L12 20.5l-1.6-2.2-2.7.6-.6-2.7-2.2-1.6L6.1 12 4.9 9.4l2.2-1.6.6-2.7 2.7.6z" />
                        </svg>
                        <span>
                          Profile
                        </span>
                      </button>
                    </div>
                    {' '}
                    {v.qlToast ? (
                      <>
                        {' '}
                        <div role="status" style={{"position":"absolute","left":"50%","top":"16px","transform":"translateX(-50%)","padding":"10px 15px","borderRadius":"14px","background":"#84BDB1","color":"#0F1513","fontSize":"13px","fontWeight":"600","whiteSpace":"nowrap","boxShadow":"0 10px 30px rgba(0,0,0,0.4)"}}>
                          {text(v.qlToast)}
                        </div>
                        {' '}
                      </>
                    ) : null}
                    {' '}
                    {v.qlSheet ? (
                      <>
                        {' '}
                        <div onClick={v.qlCloseSheet} style={{"position":"absolute","inset":"0","background":"rgba(5,8,7,0.62)"}} />
                        {' '}
                        <form onSubmit={v.qlSave} style={{"position":"absolute","left":"0","right":"0","bottom":"0","display":"flex","flexDirection":"column","gap":"14px","padding":"12px 18px 24px","borderRadius":"30px 30px 0 0","background":"#161D1C","borderTop":"1px solid #2B3533"}}>
                          <span style={{"alignSelf":"center","width":"38px","height":"5px","borderRadius":"3px","background":"#3A4542"}} />
                          <div style={{"display":"flex","alignItems":"center","justifyContent":"space-between"}}>
                            <span style={{"display":"flex","flexDirection":"column","gap":"4px"}}>
                              <span style={{"fontSize":"10px","fontWeight":"500","letterSpacing":"0.18em","textTransform":"uppercase","color":"#A3AFAB"}}>
                                New entry
                              </span>
                              <span style={{"fontSize":"19px","fontWeight":"700"}}>
                                Add transaction
                              </span>
                            </span>
                            <button type="button" onClick={v.qlCloseSheet} aria-label="Close" style={{"width":"40px","height":"40px","border":"none","borderRadius":"13px","background":"#1F2826","color":"#EEF3F1","fontSize":"18px","cursor":"pointer"}}>
                              ×
                            </button>
                          </div>
                          <label style={{"display":"flex","flexDirection":"column","gap":"6px"}}>
                            <span style={{"fontSize":"10px","fontWeight":"500","letterSpacing":"0.18em","textTransform":"uppercase","color":"#A3AFAB"}}>
                              Amount (US$)
                            </span>
                            <input ref={v.qlAmtRef} value={v.qlAmt ?? ''} onChange={v.qlOnAmt} inputMode="decimal" placeholder="0.00" style={css("min-height:54px;padding:0 16px;border-radius:16px;border:1px solid " + (v.qlAmtBorder ?? '') + ";background:#111716;color:#EEF3F1;font-family:'JetBrains Mono',monospace;font-weight:700;font-size:22px;outline:none")} />
                          </label>
                          <div style={{"display":"flex","flexDirection":"column","gap":"6px"}}>
                            <span style={{"fontSize":"10px","fontWeight":"500","letterSpacing":"0.18em","textTransform":"uppercase","color":"#A3AFAB"}}>
                              Category
                            </span>
                            <div style={{"display":"flex","flexWrap":"wrap","gap":"6px"}}>
                              {list(v.qlCats).map((c, i) => (
                                <Fragment key={i}>
                                  <button type="button" onClick={c?.pick} aria-pressed={c?.on} style={css("min-height:40px;padding:0 13px;border-radius:13px;border:1px solid " + (c?.bd ?? '') + ";background:" + (c?.bg ?? '') + ";color:" + (c?.col ?? '') + ";font-family:inherit;font-size:13px;font-weight:500;cursor:pointer")}>
                                    {text(c?.label)}
                                  </button>
                                </Fragment>
                              ))}
                            </div>
                          </div>
                          <label style={{"display":"flex","flexDirection":"column","gap":"6px"}}>
                            <span style={{"fontSize":"10px","fontWeight":"500","letterSpacing":"0.18em","textTransform":"uppercase","color":"#A3AFAB"}}>
                              Note
                            </span>
                            <input value={v.qlNote ?? ''} onChange={v.qlOnNote} placeholder={v.qlNoteHint} maxLength="28" style={{"minHeight":"48px","padding":"0 16px","borderRadius":"16px","border":"1px solid #2B3533","background":"#111716","color":"#EEF3F1","fontFamily":"inherit","fontSize":"15px","outline":"none"}} />
                          </label>
                          <button type="submit" style={{"minHeight":"54px","border":"none","borderRadius":"18px","background":"#84BDB1","color":"#F4F8F6","fontFamily":"inherit","fontSize":"16.5px","fontWeight":"600","cursor":"pointer"}}>
                            Save
                          </button>
                        </form>
                        {' '}
                      </>
                    ) : null}
                    {' '}
                  </div>
                </>
              ) : null}
            </div>
            {' '}
          </>
        ) : null}
        {' '}
        {v.quickOpen ? (
          <>
            {' '}
            <div ref={v.quickWrap} role="dialog" aria-modal="true" aria-labelledby="qv-title" style={{"position":"fixed","inset":"0","zIndex":"270","background":"#0B0906","color":"#F3ECDD","overflowY":"auto","overscrollBehavior":"contain","WebkitOverflowScrolling":"touch"}}>
              {' '}
              <div style={{"position":"relative","maxWidth":"1080px","margin":"0 auto","padding":"clamp(18px,3vw,40px) clamp(20px,4vw,56px) 56px","display":"flex","flexDirection":"column","gap":"clamp(24px,3.4vw,40px)"}}>
                <div data-qv="" style={{"display":"flex","alignItems":"center","justifyContent":"space-between","gap":"16px","paddingBottom":"14px","borderBottom":"1px solid rgba(243,236,221,0.2)"}}>
                  <div style={{"display":"flex","flexDirection":"column","gap":"5px","minWidth":"0"}}>
                    <span style={{"display":"flex","alignItems":"center","gap":"10px","fontFamily":"'JetBrains Mono',monospace","fontSize":"11px","letterSpacing":"0.2em","textTransform":"uppercase","color":"rgba(243,236,221,0.66)"}}>
                      <span aria-hidden="true" style={{"display":"flex","alignItems":"center","justifyContent":"flex-end","width":"30px","height":"16px","padding":"2px","borderRadius":"9px","background":"#B7301F","boxSizing":"border-box"}}>
                        <span style={{"width":"12px","height":"12px","borderRadius":"50%","background":"#F3ECDD"}} />
                      </span>
                      Recruiter mode · on
                    </span>
                    <span style={{"fontSize":"13px","lineHeight":"1.4","color":"rgba(243,236,221,0.66)"}}>
                      Everything in one page. Remembered on this device.
                    </span>
                  </div>
                  <button type="button" data-quickclose="1" onClick={v.closeQuick} style={{"display":"flex","alignItems":"center","gap":"10px","minHeight":"44px","background":"transparent","border":"1px solid rgba(243,236,221,0.26)","padding":"0 14px","cursor":"pointer","fontFamily":"'JetBrains Mono',monospace","fontSize":"11px","letterSpacing":"0.16em","textTransform":"uppercase","color":"rgba(243,236,221,0.8)"}} className="scp3">
                    Full experience →
                    <span style={{"color":"rgba(243,236,221,0.6)"}}>
                      esc
                    </span>
                  </button>
                </div>
                <div data-qv="" style={{"display":"grid","gridTemplateColumns":"repeat(auto-fit,minmax(min(100%,320px),1fr))","gap":"clamp(22px,4vw,56px)","alignItems":"end"}}>
                  <div style={{"display":"flex","flexDirection":"column","gap":"14px"}}>
                    <h2 id="qv-title" style={{"margin":"0","fontFamily":"'Shippori Mincho B1',serif","fontWeight":"800","fontSize":"clamp(40px,6vw,76px)","lineHeight":"0.92","textTransform":"uppercase","letterSpacing":"-0.005em"}}>
                      Johnny Tam
                    </h2>
                    <span style={{"fontSize":"17px","lineHeight":"1.45","color":"#F3ECDD","textWrap":"pretty"}}>
                      {"Software engineer — mobile, web & backend. Two apps designed and built solo — one in App Review, one in TestFlight."}
                    </span>
                  </div>
                  <div style={{"display":"flex","flexDirection":"column","borderTop":"1px solid rgba(243,236,221,0.2)"}}>
                    {list(v.quickFacts).map((f, i) => (
                      <Fragment key={i}>
                        <div style={{"display":"grid","gridTemplateColumns":"96px minmax(0,1fr)","gap":"14px","padding":"10px 0","borderBottom":"1px solid rgba(243,236,221,0.14)","fontSize":"14px","lineHeight":"1.45"}}>
                          <span style={{"fontFamily":"'JetBrains Mono',monospace","fontSize":"11px","letterSpacing":"0.14em","textTransform":"uppercase","color":"rgba(243,236,221,0.62)","paddingTop":"2px"}}>
                            {text(f?.k)}
                          </span>
                          <span style={{"color":"rgba(243,236,221,0.9)"}}>
                            {text(f?.v)}
                          </span>
                        </div>
                      </Fragment>
                    ))}
                  </div>
                </div>
                <div data-qv="" style={{"display":"flex","flexWrap":"wrap","gap":"10px"}}>
                  <a href="./Johnny-Tam-Resume.pdf" download="" style={{"display":"inline-flex","alignItems":"center","minHeight":"48px","background":"#B7301F","color":"#F5F0E3","padding":"0 24px","fontSize":"14px","fontWeight":"500"}} className="scp4">
                    Download résumé (PDF) ↓
                  </a>
                  <a href="mailto:tamtingyuen@gmail.com?subject=Software%20engineer%20role" style={{"display":"inline-flex","alignItems":"center","minHeight":"48px","border":"1px solid rgba(243,236,221,0.34)","padding":"0 20px","fontSize":"14px","color":"#F3ECDD"}} className="scp5">
                    Email
                  </a>
                  <a href="https://github.com/Johnny-1211" target="_blank" rel="noopener" style={{"display":"inline-flex","alignItems":"center","minHeight":"48px","border":"1px solid rgba(243,236,221,0.34)","padding":"0 20px","fontSize":"14px","color":"#F3ECDD"}} className="scp5">
                    GitHub ↗︎
                  </a>
                  <a href="https://www.linkedin.com/in/johnny-tam-b9374a246/" target="_blank" rel="noopener" style={{"display":"inline-flex","alignItems":"center","minHeight":"48px","border":"1px solid rgba(243,236,221,0.34)","padding":"0 20px","fontSize":"14px","color":"#F3ECDD"}} className="scp5">
                    LinkedIn ↗︎
                  </a>
                </div>
                <div data-qv="" style={{"display":"flex","flexDirection":"column","gap":"14px"}}>
                  <span style={{"fontFamily":"'JetBrains Mono',monospace","fontSize":"11px","letterSpacing":"0.2em","textTransform":"uppercase","color":"rgba(243,236,221,0.66)"}}>
                    Selected work
                  </span>
                  <div style={{"display":"grid","gridTemplateColumns":"repeat(auto-fit,minmax(min(100%,400px),1fr))","gap":"16px"}}>
                    {list(v.quickProjects).map((p, i) => (
                      <Fragment key={i}>
                        <div style={{"display":"grid","gridTemplateColumns":"88px minmax(0,1fr)","gap":"18px","padding":"18px","border":"1px solid rgba(243,236,221,0.18)","background":"rgba(243,236,221,0.03)"}}>
                          <div role="img" aria-label={(p?.title ?? '') + " app screen"} style={css("width:88px;aspect-ratio:1320/2698;background-image:url(" + (p?.shot ?? '') + ");background-size:cover;background-position:top;border-radius:10px;box-shadow:0 0 0 1px rgba(243,236,221,0.14)")} />
                          <div style={{"display":"flex","flexDirection":"column","gap":"9px","minWidth":"0"}}>
                            <div style={{"display":"flex","flexWrap":"wrap","alignItems":"center","gap":"8px 12px"}}>
                              <span style={{"fontFamily":"'Shippori Mincho B1',serif","fontWeight":"700","fontSize":"22px","lineHeight":"1.1","textTransform":"uppercase"}}>
                                {text(p?.title)}
                              </span>
                              <span style={{"display":"flex","alignItems":"center","gap":"6px","padding":"3px 8px","border":"1px solid rgba(131,190,176,0.55)","background":"rgba(131,190,176,0.1)","fontFamily":"'JetBrains Mono',monospace","fontSize":"11px","letterSpacing":"0.06em","textTransform":"uppercase","color":"#A9D6CB"}}>
                                <span style={{"width":"6px","height":"6px","borderRadius":"50%","background":"#83BEB0"}} />
                                {text(p?.chip)}
                              </span>
                            </div>
                            <span style={{"fontFamily":"'JetBrains Mono',monospace","fontSize":"11px","letterSpacing":"0.08em","textTransform":"uppercase","color":"rgba(243,236,221,0.66)"}}>
                              {text(p?.stack)}
                            </span>
                            <p style={{"margin":"0","fontSize":"14px","lineHeight":"1.58","color":"rgba(243,236,221,0.8)","textWrap":"pretty"}}>
                              {text(p?.blurb)}
                            </p>
                            <div style={{"display":"grid","gridTemplateColumns":"repeat(3,minmax(0,1fr))","gap":"10px"}}>
                              {list(p?.stats).map((s, i) => (
                                <Fragment key={i}>
                                  <div style={{"display":"flex","flexDirection":"column","gap":"3px","paddingTop":"7px","borderTop":"1px solid rgba(224,103,79,0.45)"}}>
                                    <span style={{"fontFamily":"'Shippori Mincho B1',serif","fontWeight":"800","fontSize":"22px","lineHeight":"1"}}>
                                      {text(s?.v)}
                                    </span>
                                    <span style={{"fontSize":"12px","lineHeight":"1.35","color":"rgba(243,236,221,0.72)"}}>
                                      {text(s?.k)}
                                    </span>
                                  </div>
                                </Fragment>
                              ))}
                            </div>
                            {p?.demo ? (
                              <>
                                <button type="button" onClick={p?.openDemoQ} style={{"alignSelf":"flex-start","display":"flex","alignItems":"center","gap":"8px","minHeight":"40px","padding":"0 12px","border":"1px solid rgba(131,190,176,0.6)","background":"rgba(131,190,176,0.12)","cursor":"pointer","fontFamily":"'JetBrains Mono',monospace","fontSize":"11px","letterSpacing":"0.14em","textTransform":"uppercase","color":"#A9D6CB"}} className="scpg">
                                  ▶︎ Try it live
                                </button>
                              </>
                            ) : null}
                            <button type="button" onClick={p?.open} style={{"alignSelf":"flex-start","display":"flex","alignItems":"center","gap":"8px","minHeight":"44px","background":"transparent","border":"none","padding":"0","cursor":"pointer","fontFamily":"'JetBrains Mono',monospace","fontSize":"11px","letterSpacing":"0.14em","textTransform":"uppercase","color":"rgba(243,236,221,0.66)"}} className="scp2">
                              Read the case study →
                            </button>
                          </div>
                        </div>
                      </Fragment>
                    ))}
                  </div>
                </div>
                <div data-qv="" style={{"display":"flex","flexDirection":"column","gap":"10px"}}>
                  <span style={{"fontFamily":"'JetBrains Mono',monospace","fontSize":"11px","letterSpacing":"0.2em","textTransform":"uppercase","color":"rgba(243,236,221,0.66)"}}>
                    Built with
                  </span>
                  <div style={{"display":"flex","flexWrap":"wrap","gap":"6px"}}>
                    {list(v.skillsShipped).map((s, i) => (
                      <Fragment key={i}>
                        <span style={{"fontFamily":"'JetBrains Mono',monospace","fontSize":"12px","fontWeight":"600","letterSpacing":"0.06em","textTransform":"uppercase","border":"1px solid #E0674F","background":"rgba(183,48,31,0.22)","padding":"6px 10px","color":"#F3ECDD"}}>
                          {text(s)}
                        </span>
                      </Fragment>
                    ))}
                  </div>
                </div>
              </div>
              {' '}
            </div>
            {' '}
          </>
        ) : null}
        {' '}
        {v.caseOpen ? (
          <>
            {' '}
            <div ref={v.caseWrap} data-g="case" role="dialog" aria-modal="true" aria-labelledby="cs-title" style={{"position":"fixed","inset":"0","zIndex":"250","background":"#0B0906","color":"#F3ECDD","display":"flex","flexDirection":"column","gap":"clamp(16px,2.2vw,28px)","padding":"clamp(22px,3.2vw,50px) clamp(24px,5vw,78px) clamp(20px,2.6vw,40px)","overflow":"hidden"}}>
              <div style={{"position":"absolute","right":"0","top":"0","width":"54%","height":"74%","pointerEvents":"none","background":"radial-gradient(56% 58% at 76% 24%,rgba(183,48,31,0.26) 0%,rgba(11,9,6,0) 74%)"}} />
              <div style={{"position":"relative","display":"flex","alignItems":"center","justifyContent":"space-between","gap":"20px","paddingBottom":"clamp(12px,1.6vw,18px)","borderBottom":"1px solid rgba(243,236,221,0.2)"}}>
                <div style={{"display":"flex","alignItems":"baseline","gap":"16px","flexWrap":"wrap","fontFamily":"'JetBrains Mono',monospace","fontSize":"10px","letterSpacing":"0.18em","textTransform":"uppercase","color":"rgba(243,236,221,0.66)"}}>
                  <span style={{"color":"#E0674F"}}>
                    {"Case "}
                    {text(v.cs?.num)}
                  </span>
                </div>
                <button type="button" data-caseclose="1" data-g="csclose" style={{"display":"flex","alignItems":"center","gap":"10px","background":"transparent","border":"1px solid rgba(243,236,221,0.26)","padding":"9px 14px","cursor":"pointer","fontFamily":"'JetBrains Mono',monospace","fontSize":"9.5px","letterSpacing":"0.16em","textTransform":"uppercase","color":"rgba(243,236,221,0.66)"}} className="scp3">
                  Close ✕
                  <span style={{"color":"rgba(243,236,221,0.6)","border":"1px solid rgba(243,236,221,0.26)","padding":"2px 5px","fontSize":"9px"}}>
                    esc
                  </span>
                </button>
              </div>
              <div data-g="csgrid" style={{"position":"relative","flex":"1","minHeight":"0","display":"grid","gridTemplateColumns":"minmax(0,0.84fr) minmax(0,1.16fr)","gap":"clamp(24px,3.6vw,60px)"}}>
                <div data-cs="" style={{"position":"relative","minHeight":"0","display":"flex","flexDirection":"column","gap":"14px"}}>
                  <div style={{"position":"relative","flex":"1","minHeight":"180px","border":"1px solid rgba(243,236,221,0.18)","background":"#17130F","overflow":"hidden"}}>
                    {' '}
                    {v.cs?.noDevice ? (
                      <>
                        {' '}
                        <img src={v.cs?.shotBig} alt="" style={{ display: 'block', width: '100%', height: '100%', objectFit: 'cover' }} />
                        {' '}
                      </>
                    ) : null}
                    {' '}
                    {v.cs?.device ? (
                      <>
                        {' '}
                        <div style={{"position":"absolute","inset":"0","display":"flex","alignItems":"center","justifyContent":"center","padding":"5% 6%","background":"radial-gradient(70% 70% at 50% 55%,#33261a 0%,#17120d 60%,#0b0906 100%)"}}>
                          <div data-cs="" role="img" aria-label={(v.cs?.title ?? '') + " reports screen"} style={css("height:100%;aspect-ratio:1320/2698;max-width:100%;background-image:url(" + (v.cs?.shotBig ?? '') + ");background-size:cover;background-position:top;border-radius:16px;box-shadow:0 26px 50px rgba(0,0,0,0.65),0 0 0 1px rgba(243,236,221,0.12)")} />
                        </div>
                        {' '}
                      </>
                    ) : null}
                    {' '}
                  </div>
                  <div style={{"display":"grid","gridTemplateColumns":"repeat(3,minmax(0,1fr))","gap":"14px","paddingTop":"4px","borderTop":"1px solid rgba(243,236,221,0.16)"}}>
                    <div style={{"display":"flex","flexDirection":"column","gap":"5px"}}>
                      <span style={{"fontFamily":"'JetBrains Mono',monospace","fontSize":"8.5px","letterSpacing":"0.16em","textTransform":"uppercase","color":"rgba(243,236,221,0.64)"}}>
                        Role
                      </span>
                      <span style={{"fontSize":"12px","lineHeight":"1.4","color":"rgba(243,236,221,0.8)"}}>
                        {text(v.cs?.role)}
                      </span>
                    </div>
                    <div style={{"display":"flex","flexDirection":"column","gap":"5px"}}>
                      <span style={{"fontFamily":"'JetBrains Mono',monospace","fontSize":"8.5px","letterSpacing":"0.16em","textTransform":"uppercase","color":"rgba(243,236,221,0.64)"}}>
                        Period
                      </span>
                      <span style={{"fontSize":"12px","lineHeight":"1.4","color":"rgba(243,236,221,0.8)"}}>
                        {text(v.cs?.period)}
                      </span>
                    </div>
                    <div style={{"display":"flex","flexDirection":"column","gap":"5px"}}>
                      <span style={{"fontFamily":"'JetBrains Mono',monospace","fontSize":"8.5px","letterSpacing":"0.16em","textTransform":"uppercase","color":"rgba(243,236,221,0.64)"}}>
                        Status
                      </span>
                      <span style={{"display":"flex","alignItems":"center","gap":"7px","fontSize":"12px","fontWeight":"600","lineHeight":"1.4","color":"#A9D6CB"}}>
                        <span style={{"flex":"none","width":"6px","height":"6px","borderRadius":"50%","background":"#83BEB0","boxShadow":"0 0 8px #83BEB0"}} />
                        {text(v.cs?.status)}
                      </span>
                    </div>
                  </div>
                </div>
                <div data-csscroll="1" style={{"minHeight":"0","overflowY":"auto","paddingRight":"12px","display":"flex","flexDirection":"column","gap":"clamp(15px,1.9vw,24px)"}}>
                  <h2 id="cs-title" data-cs="" style={{"margin":"0","fontFamily":"'Shippori Mincho B1',serif","fontWeight":"800","fontSize":"clamp(28px,3.4vw,54px)","lineHeight":"1.02","textTransform":"uppercase","letterSpacing":"-0.006em"}}>
                    {text(v.cs?.title)}
                  </h2>
                  <div data-cs="" style={{"display":"flex","flexWrap":"wrap","alignItems":"center","gap":"7px"}}>
                    <span style={{"fontFamily":"'JetBrains Mono',monospace","fontSize":"11px","letterSpacing":"0.16em","textTransform":"uppercase","color":"rgba(243,236,221,0.66)","marginRight":"4px"}}>
                      Built with
                    </span>
                    {list(v.cs?.stackList).map((s, i) => (
                      <Fragment key={i}>
                        <span style={{"fontFamily":"'JetBrains Mono',monospace","fontSize":"12px","fontWeight":"600","letterSpacing":"0.06em","textTransform":"uppercase","border":"1px solid #E0674F","background":"rgba(183,48,31,0.22)","padding":"6px 11px","color":"#F3ECDD"}}>
                          {text(s)}
                        </span>
                      </Fragment>
                    ))}
                  </div>
                  {v.cs?.hasTldr ? (
                    <>
                      <div data-cs="" style={{"display":"flex","flexDirection":"column","gap":"10px","padding":"16px 18px","background":"rgba(243,236,221,0.05)","border":"1px solid rgba(243,236,221,0.14)"}}>
                        <span style={{"fontFamily":"'JetBrains Mono',monospace","fontSize":"11px","letterSpacing":"0.2em","textTransform":"uppercase","color":"rgba(243,236,221,0.66)"}}>
                          In 10 seconds
                        </span>
                        {list(v.cs?.tldr).map((t, i) => (
                          <Fragment key={i}>
                            <div style={{"display":"grid","gridTemplateColumns":"auto minmax(0,1fr)","gap":"12px","alignItems":"baseline","fontSize":"15px","lineHeight":"1.5","textWrap":"pretty"}}>
                              <span style={{"fontFamily":"'JetBrains Mono',monospace","fontSize":"11px","color":"rgba(243,236,221,0.66)"}}>
                                {text(t?.n)}
                              </span>
                              <span style={{"color":"rgba(243,236,221,0.78)"}}>
                                <strong style={{"fontWeight":"700","color":"#F3ECDD"}}>
                                  {text(t?.h)}
                                </strong>
                                {" "}
                                {text(t?.t)}
                              </span>
                            </div>
                          </Fragment>
                        ))}
                      </div>
                    </>
                  ) : null}
                  <div data-cs="" style={{"display":"grid","gridTemplateColumns":"repeat(auto-fit,minmax(120px,1fr))","gap":"16px"}}>
                    {list(v.cs?.stats).map((s, i) => (
                      <Fragment key={i}>
                        <div style={{"display":"flex","flexDirection":"column","gap":"6px","paddingTop":"12px","borderTop":"2px solid #B7301F"}}>
                          <span style={{"fontFamily":"'Shippori Mincho B1',serif","fontWeight":"800","fontSize":"clamp(30px,3vw,44px)","lineHeight":"1","color":"#F3ECDD"}}>
                            {text(s?.v)}
                          </span>
                          <span style={{"fontSize":"12.5px","lineHeight":"1.45","color":"rgba(243,236,221,0.74)","textWrap":"pretty"}}>
                            {text(s?.k)}
                          </span>
                        </div>
                      </Fragment>
                    ))}
                  </div>
                  <p data-cs="" style={{"margin":"0","fontSize":"15px","lineHeight":"1.74","color":"rgba(243,236,221,0.74)","maxWidth":"58ch","textWrap":"pretty"}}>
                    <strong style={{"fontWeight":"700","color":"#F3ECDD","background":"linear-gradient(transparent 62%,rgba(183,48,31,0.55) 62%,rgba(183,48,31,0.55) 92%,transparent 92%)"}}>
                      {text(v.cs?.problemLead)}
                    </strong>
                    {" "}
                    {text(v.cs?.problem)}
                  </p>
                  <div data-cs="" style={{"display":"flex","flexDirection":"column","gap":"13px"}}>
                    <span style={{"fontFamily":"'JetBrains Mono',monospace","fontSize":"9px","letterSpacing":"0.2em","textTransform":"uppercase","color":"rgba(243,236,221,0.66)"}}>
                      Decisions
                    </span>
                    {list(v.cs?.decisions).map((d, i) => (
                      <Fragment key={i}>
                        <div style={{"display":"grid","gridTemplateColumns":"auto minmax(0,1fr)","gap":"14px","alignItems":"start","paddingBottom":"13px","borderBottom":"1px solid rgba(243,236,221,0.13)"}}>
                          <span style={{"width":"6px","height":"6px","background":"#B7301F","display":"block","marginTop":"7px"}} />
                          <span style={{"fontSize":"13.5px","lineHeight":"1.62","color":"rgba(243,236,221,0.76)","textWrap":"pretty"}}>
                            <strong style={{"fontWeight":"700","color":"#F3ECDD"}}>
                              {text(d?.h)}
                            </strong>
                            {" "}
                            {text(d?.t)}
                          </span>
                        </div>
                      </Fragment>
                    ))}
                  </div>
                  <div data-cs="" style={{"display":"grid","gridTemplateColumns":"repeat(2,minmax(0,1fr))","gap":"clamp(18px,2.4vw,32px)"}}>
                    <div style={{"display":"flex","flexDirection":"column","gap":"9px"}}>
                      <span style={{"fontFamily":"'JetBrains Mono',monospace","fontSize":"9px","letterSpacing":"0.2em","textTransform":"uppercase","color":"rgba(243,236,221,0.64)"}}>
                        Outcome
                      </span>
                      <span style={{"fontSize":"13.5px","lineHeight":"1.62","color":"rgba(243,236,221,0.78)","textWrap":"pretty"}}>
                        <strong style={{"fontWeight":"700","color":"#F3ECDD","background":"linear-gradient(transparent 62%,rgba(183,48,31,0.55) 62%,rgba(183,48,31,0.55) 92%,transparent 92%)"}}>
                          {text(v.cs?.outcomeLead)}
                        </strong>
                        {" "}
                        {text(v.cs?.outcome)}
                      </span>
                    </div>
                    <div style={{"display":"flex","flexDirection":"column","gap":"9px"}}>
                      <span style={{"fontFamily":"'JetBrains Mono',monospace","fontSize":"9px","letterSpacing":"0.2em","textTransform":"uppercase","color":"rgba(243,236,221,0.64)"}}>
                        What I’d do differently
                      </span>
                      <span style={{"fontSize":"15px","lineHeight":"1.5","color":"rgba(243,236,221,0.72)","textWrap":"pretty"}}>
                        {text(v.cs?.learned)}
                      </span>
                    </div>
                  </div>
                  <div data-cshint="" aria-hidden="true" style={{"position":"sticky","bottom":"0","flex":"none","marginTop":"-30px","height":"64px","display":"flex","alignItems":"flex-end","justifyContent":"center","paddingBottom":"6px","pointerEvents":"none","background":"linear-gradient(180deg,rgba(14,11,8,0) 0%,rgba(14,11,8,0.92) 62%,#0E0B08 100%)","fontFamily":"'JetBrains Mono',monospace","fontSize":"10px","letterSpacing":"0.18em","textTransform":"uppercase","color":"rgba(243,236,221,0.78)","transition":"opacity .35s ease"}}>
                    Scroll ↓
                  </div>
                </div>
              </div>
              <div data-cs="" style={{"position":"relative","display":"flex","flexWrap":"wrap","alignItems":"center","gap":"12px 22px","paddingTop":"clamp(12px,1.6vw,18px)","borderTop":"1px solid rgba(243,236,221,0.2)","fontFamily":"'JetBrains Mono',monospace","fontSize":"10px","letterSpacing":"0.13em","textTransform":"uppercase"}}>
                {list(v.cs?.links).map((k, i) => (
                  <Fragment key={i}>
                    <a href={k?.href} target="_blank" rel="noopener" style={{"color":"rgba(243,236,221,0.74)"}} className="scp1">
                      {text(k?.label)}
                      {" ↗︎"}
                    </a>
                  </Fragment>
                ))}
                <span style={{"marginLeft":"auto","color":"rgba(243,236,221,0.6)"}}>
                  Esc to close
                </span>
              </div>
            </div>
            {' '}
          </>
        ) : null}
      </div>
    </div>
  );
}
