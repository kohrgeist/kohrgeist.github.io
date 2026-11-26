// The whole site as React components, rendered to static HTML at build time (build.mjs).
// No React runs in the browser: the page's motion comes from the taste-skill kit in public/assets.
import { CONTENT, LINKS } from './content.js';

/* ------------------------------------------------------------------ small shared pieces */

const Arrow = () => (
  <svg className="m-arrow" viewBox="0 0 12 12" aria-hidden="true">
    <path className="m-arrow__stem" d="M1 6h8" />
    <path className="m-arrow__head" d="M4.5 2.5 8 6l-3.5 3.5" />
  </svg>
);

const Chev = () => (
  <svg className="chev" viewBox="0 0 12 12" aria-hidden="true">
    <path d="M3 4.5l3 3 3-3" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const Logo = ({ big }) => (
  <a className="nav__logo" href="#top">
    <span className="mark mark--initial" aria-hidden="true">M</span>Marcos Pereira{big ? null : null}
  </a>
);

// the main action, word for word everywhere it appears (nav, hero, close)
const MainButton = ({ t, cls = '' }) => (
  <a className={`btn btn--primary ${cls}`.trim()} href={LINKS.linkedin} rel="me">
    {t.main}
    <Arrow />
  </a>
);

const Icon = ({ d, ...p }) => (
  <svg className="ui-icon" viewBox="0 0 16 16" aria-hidden="true" {...p}>
    {d.map((x, i) => <path key={i} d={x} />)}
  </svg>
);

/* ------------------------------------------------------------------ nav (nav-mega) */

function Nav({ t, base }) {
  const n = t.nav;
  return (
    <header className="nav">
      <div className="wrap nav__bar">
        <a className="skip-link" href="#top">{t.skip}</a>
        <Logo />
        <nav className="nav__links" aria-label="Main">
          <div className="nav__item">
            <a className="nav__link" href="#projects">{n.projects} <Chev /></a>
            <div className="nav__menu">
              <div className="wrap grid">
                {n.groups.map((g) => (
                  <div className="menu-col span-3" key={g.label}>
                    <p className="t-label">{g.label}</p>
                    {g.items.map((it) => (
                      <a href={it.href} key={it.name}>{it.name}<span>{it.line}</span></a>
                    ))}
                  </div>
                ))}
                <a className="menu-card span-3 start-10" href="#fca">
                  <div className="panel menu-card__panel">
                    <img className="frame__img" src={`${base}img/fca-pipeline.webp`} alt={n.card.alt} loading="lazy" />
                  </div>
                  <span className="t-card">{n.card.title}</span>
                  <span className="t-small muted">{n.card.line}</span>
                </a>
              </div>
            </div>
          </div>
          <div className="nav__item"><a className="nav__link" href="#principle">{n.approach}</a></div>
          <div className="nav__item"><a className="nav__link" href="#stack">{n.stack}</a></div>
          <div className="nav__item"><a className="nav__link" href="#questions">{n.questions}</a></div>
          <div className="nav__item"><a className="nav__link" href={t.other.href === '../' ? base : `${base}${t.other.href}`} hrefLang={t.lang === 'en' ? 'pt-BR' : 'en'} lang={t.lang === 'en' ? 'pt-BR' : 'en'}>{t.other.label}</a></div>
        </nav>
        <div className="nav__actions">
          <MainButton t={t} />
        </div>
        <button className="nav__toggle" type="button" aria-expanded="false" aria-label={t.menu}>
          <svg width="18" height="18" viewBox="0 0 18 18" aria-hidden="true"><path d="M2 5h14M2 13h14" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" /></svg>
        </button>
      </div>
    </header>
  );
}

/* ------------------------------------------------------------------ hero (triptych) */

function Hero({ t, base }) {
  const h = t.hero;
  return (
    <section className="hero hero--triptych" data-enter aria-labelledby="hero-h">
      <div className="wrap">
        <div className="hero-text grid hero__grid">
          <div className="span-3">
            <h1 id="hero-h">{h.h1}</h1>
            <p className="hero__lead">{h.lead}</p>
          </div>
          <div className="ly-collage span-6 start-4" role="img" aria-label={h.collageAlt} data-visual data-fx="grain-gradient" data-fx-seed="2611" data-fx-params='{"speed":0.35,"grain":0.5,"calm":0.35}'>
            {/* set 1: FCA Board */}
            <div className="ly-collage__set is-on">
              <div className="ly-piece pc-shot" style={{ left: '4%', top: '6%', width: '76%', height: '42%' }}>
                <img src={`${base}img/fca-noir.webp`} srcSet={`${base}img/fca-noir-720.webp 720w, ${base}img/fca-noir.webp 1440w`} sizes="(max-width: 639px) 260px, 480px" alt="" width="1440" height="900" fetchpriority="high" />
              </div>
              <div className="ly-piece pc-late" style={{ left: '4%', top: '54%', width: '33%' }}>
                <span className="pc-tag">{h.late.tag}</span>
                <b><i>{h.late.ref}</i> {h.late.title}</b>
                <small>{h.late.wait}</small>
              </div>
              <div className="ly-piece pc-focus" style={{ left: '41%', top: '54%', width: '55%', height: '42%' }}>
                <span className="pc-lbl">{h.focus.title}</span>
                {h.focus.rows.map(([ref, title, due]) => (
                  <div className="pc-row" key={ref}><i>{ref}</i><b>{title}</b><small>{due}</small></div>
                ))}
              </div>
            </div>
            {/* set 2: Shenzhen Scrolls API */}
            <div className="ly-collage__set" aria-hidden="true">
              <div className="ly-piece pc-code" style={{ left: '4%', top: '6%', width: '60%' }}>
                <span className="pc-lbl">policies/authz.rego</span>
                <pre>
                  <code>
                    <span className="k">package</span> shenzhen.authz{'\n\n'}
                    <span className="k">default</span> allow := <span className="n">false</span>{'\n\n'}
                    allow <span className="k">if</span> {'{'}{'\n'}
                    {'  '}permitido{'\n'}
                    {'  '}<span className="f">count</span>(deny) == <span className="n">0</span>{'\n'}
                    {'}'}
                  </code>
                </pre>
              </div>
              <div className="ly-piece pc-json" style={{ left: '50%', top: '24%', width: '46%' }}>
                <span className="pc-lbl">decision</span>
                <pre>
                  <code>
                    {'{\n  '}<span className="s">"allow"</span>: <span className="n">false</span>,{'\n  '}
                    <span className="s">"deny"</span>: [{'\n    '}
                    <span className="s">"capítulo premium sem data de liberação: exclusivo para assinantes"</span>{'\n  ]\n}'}
                  </code>
                </pre>
              </div>
              <div className="ly-piece pc-tests" style={{ left: '28%', top: '66%', width: '68%', height: '30%' }}>
                <span className="pc-lbl">{h.tests.title}</span>
                {h.tests.rows.map(([cmd, res]) => (
                  <div className="pc-row" key={cmd}><code>$ {cmd}</code><b><span className="ok" aria-hidden="true">✓</span>{res}</b></div>
                ))}
              </div>
            </div>
            {/* set 3: Aeon and LiderOps */}
            <div className="ly-collage__set" aria-hidden="true">
              <div className="ly-piece pc-rec" style={{ left: '4%', top: '6%', width: '52%' }}>
                <span className="pc-lbl"><span className="pc-dot" />{h.rec.label}<em>{h.rec.time}</em></span>
                <span className="pc-wave">{[5, 9, 14, 8, 18, 11, 22, 15, 9, 19, 12, 7, 13, 20, 14, 8, 16, 10, 6, 12].map((v, i) => <i key={i} style={{ '--h': v }} />)}</span>
                <p>Vamos revisar a carteira de novembro antes da reunião.</p>
              </div>
              <div className="ly-piece pc-enrich" style={{ left: '60%', top: '10%', width: '36%' }}>
                <span className="pc-lbl">{h.enrich.title}</span>
                {h.enrich.rows.map(([name, city]) => (
                  <div className="pc-row" key={name}><b>{name}</b><small>{city}</small><span className="pc-ok">{h.enrich.tag}</span></div>
                ))}
              </div>
              <div className="ly-piece pc-mail" style={{ left: '20%', top: '56%', width: '76%', height: '40%' }}>
                <span className="pc-lbl">{h.mail.label}</span>
                <b>{h.mail.subject}</b>
                <p>{h.mail.body}</p>
              </div>
            </div>
          </div>
          <div className="span-3 start-10 hero__cta"><MainButton t={t} /></div>
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ app-frame: FCA Board */

function FcaFrame({ t }) {
  const f = t.fca;
  const d = f.doc;
  const stCls = { open: '', work: '', done: 'is-done', late: 'is-you' };
  return (
    <section className="section" id="fca" aria-labelledby="fca-h">
      <div className="wrap">
        <div className="grid grid--top">
          <h2 className="span-6" id="fca-h">{f.h2}</h2>
          <div className="span-6 start-7 stack-4">
            <p className="fca__p">{f.p}</p>
            <a className="link" href={LINKS.fcaDownload}>{f.link}</a>
          </div>
        </div>
        <div className="ui app fill" role="img" aria-label={f.alt} data-ui-pause-host>
          <div className="app__pane app__pane--list">
            <div className="ui ui-panel ui-win" data-ui="window" data-open="Open" data-work={f.st.work} data-done={f.st.done}>
              <div className="ui-win__bar">
                <span className="ui-dots" aria-hidden="true"><i /><i /><i /></span>
                <span className="ui-win__crumb">{f.crumb} <i>/</i> <b>{f.crumbB}</b></span>
                <span className="ui-spacer" />
                <span className="ui-win__search" aria-hidden="true"><Icon d={['M7 2.5a4.5 4.5 0 1 0 0 9 4.5 4.5 0 0 0 0-9Z', 'm10.5 10.5 3 3']} /><span className="ui-win__ph">{f.search}</span><span className="ui-kbd">/</span></span>
              </div>
              <div className="ui-win__body">
                <nav className="ui-win__side" aria-hidden="true">
                  {f.nav.map(([label, n], i) => (
                    <span className={`ui-win__nav${i === 0 ? ' is-on' : ''}`} key={label}>
                      <Icon d={[['M2.5 4h11M2.5 8h11M2.5 12h7'], ['M8 2.5l1.6 3.4 3.7.4-2.8 2.5.8 3.7L8 10.6l-3.3 1.9.8-3.7-2.8-2.5 3.7-.4Z'], ['M8 2.5a5.5 5.5 0 1 0 0 11 5.5 5.5 0 0 0 0-11Z', 'M8 5v3l2 1.5'], ['m3.5 8.4 2.8 2.8 6.2-6.4']][i]} />
                      {label}{n ? <em>{n}</em> : null}
                    </span>
                  ))}
                  <span className="ui-win__label">{f.views}</span>
                  {f.streams.map((s) => <span className="ui-win__nav" key={s}><span className="ui-win__hash">#</span>{s}</span>)}
                </nav>
                <div className="ui-win__main">
                  <div className="ui-win__cols" aria-hidden="true">{f.cols.map((c) => <span key={c}>{c}</span>)}</div>
                  <ul className="ui-win__rows">
                    {f.rows.map(([ini, who, sub, st, due, tone], i) => (
                      <li className={`ui-win__row${i === 0 ? ' is-sel' : ''}`} data-row key={sub}>
                        <span className="ui-avatar" data-tone={tone}>{ini}</span>
                        <span className="ui-win__who">{who}</span>
                        <span className="ui-win__sub">{sub}</span>
                        <span className={`ui-win__st ${stCls[st]}`.trim()} data-st>{f.st[st]}</span>
                        <span className="ui-win__age">{due}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
          <div className="app__pane app__pane--open" data-ui-loop>
            <div className="ui ui-doc" data-ui="doc">
              <article className="ui-doc__page">
                <div className="ui-doc__label">{d.label}</div>
                <div className="ui-doc__title">{d.title}</div>
                <div className="ui-doc__text"><b>{d.what[0]}.</b> {d.what[1]}<mark className="ui-doc__mark is-on">{d.what[2]}</mark>{d.what[3]}</div>
                <div className="ui-doc__text"><b>{d.why[0]}.</b> {d.why[1]}</div>
                <div className="ui-doc__text"><b>{d.how[0]}.</b> {d.how[1]}<mark className="ui-doc__mark" data-kind={d.mark2.kind} data-msg={d.mark2.msg} data-where={d.mark2.where}>{d.how[2]}</mark>{d.how[3]}</div>
                <div className="ui-doc__text"><b>{d.where[0]}.</b> {d.where[1]}</div>
                <div className="ui-doc__text"><b>{d.next[0]}.</b> {d.next[1]}</div>
              </article>
              <aside className="ui-doc__note ui-panel is-on" aria-live="polite">
                <div className="ui-doc__kind"><span className="ui-doc__dot" /><span data-doc-kind>{d.note.kind}</span></div>
                <div className="ui-doc__msg" data-doc-msg>{d.note.msg}</div>
                <div className="ui-doc__where" data-doc-where>{d.note.where}</div>
              </aside>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ the statement moment (letters-assemble) */

function Statement({ t, base }) {
  const s = t.statement;
  return (
    <section className="section bg-ruled" id="principle" data-moment="letters-assemble" data-moment-opts='{"spread": 1}' aria-labelledby="principle-h">
      <div className="wrap">
        <h2 className="mo-la__type" id="principle-h">{s.h2}</h2>
        <div className="grid grid--top statement__row">
          <p className="mo-la__sub span-6">{s.sub}</p>
          <div className="frame statement__art span-6 start-7">
            <img src={`${base}img/cathedral.png`} alt={s.art} width="768" height="256" loading="lazy" />
          </div>
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ features-2x2: four more projects */

const CARD_PALETTE = '{"bg":"#ec4252","surface":"#ff8a93","ink":"#6e1420","muted":"#8a1c2a","accent":"#ffb020","accentInk":"#0b0607"}';

function Card({ id, href, title, text, children, seed }) {
  return (
    <a className="card card--row span-6" href={href} id={id}>
      <h3>{title}</h3>
      <p>{text}</p>
      <div className="panel panel--flush" data-fx="grain-gradient" data-fx-seed={seed} data-fx-palette={CARD_PALETTE} data-fx-params='{"drift":0}'>{children}</div>
    </a>
  );
}

function Projects({ t }) {
  const p = t.projects;
  const tm = p.term;
  return (
    <section className="section g2" id="projects" aria-labelledby="projects-h">
      <div className="wrap">
        <div className="group">
          <div className="section-head">
            <h2 id="projects-h">{p.h2} <span className="muted">{p.h2b}</span></h2>
          </div>
          <div className="grid">
            <Card id="shenzhen" href={LINKS.shenzhen} title={p.shenzhen.h3} text={p.shenzhen.p} seed="31">
              <div className="stage" role="img" aria-label={p.shenzhen.alt}>
                <div className="at-rise fit" style={{ '--fit-max': '440px', '--ax': 'max(24px, 50% - 220px)', '--ay': '40px', '--ay-sm': '24px' }} data-ui-loop>
                  <div className="ui ui-panel ui-term" data-ui="terminal-run">
                    <div className="ui-term__head">
                      <span className="ui-dots" aria-hidden="true"><i /><i /><i /></span>
                      <span className="ui-term__title">{tm.title}</span>
                      <span className="ui-meta">zsh</span>
                      <span className="ui-spacer" />
                      <span className="ui-chip ui-chip--plain ui-term__branch"><svg viewBox="0 0 16 16" aria-hidden="true" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="5" cy="3.5" r="1.5" /><circle cx="5" cy="12.5" r="1.5" /><circle cx="11" cy="5.5" r="1.5" /><path d="M5 5v6M11 7c0 2.6-6 1.8-6 4" /></svg>main</span>
                    </div>
                    <div className="ui-term__screen" data-term-screen>
                      <div className="ui-term__track" data-term-track>
                        <div className="ui-term__ln ui-term__cmd"><span className="ui-term__cwd">~/<span className="ui-term__up">kohrgeist/</span>shenzhen</span><span className="ui-term__sig">$</span><span className="ui-term__typed" data-term-cmd>{tm.cmd}</span></div>
                        <div className="ui-term__ln ui-term__meter" data-term-out data-term-meter><span className="ui-term__bar" style={{ '--p': 1 }}><i /></span><span className="ui-term__count" data-term-count>{tm.meter}</span></div>
                        {tm.rows.map(([file, n, time]) => (
                          <div className="ui-term__ln ui-term__log" data-term-out data-term-step key={file}>
                            <svg className="ui-term__tick" viewBox="0 0 16 16" aria-hidden="true"><path d="m3.5 8.4 2.8 2.8 6.2-6.4" /></svg>
                            <span className="ui-term__path">{file}</span><span className="ui-term__n">{n}</span><span className="ui-term__t">{time}</span>
                          </div>
                        ))}
                        <div className="ui-term__ln ui-term__gap" data-term-out aria-hidden="true" />
                        {tm.sum.map(([k, v, d]) => (
                          <div className="ui-term__ln ui-term__sum" data-term-out key={k}><span className="ui-term__key">{k}</span><span className="ui-term__val">{v}</span><span className="ui-term__dim">{d}</span></div>
                        ))}
                        <div className="ui-term__ln ui-term__done" data-term-out data-term-done><span className="ui-term__ok"><svg viewBox="0 0 16 16" aria-hidden="true"><path d="m4.5 8.3 2.4 2.4 4.6-5" /></svg></span><b>{tm.done}</b><span className="ui-term__dim">{tm.doneT}</span></div>
                        <div className="ui-term__ln ui-term__cmd" data-term-next><span className="ui-term__cwd">~/<span className="ui-term__up">kohrgeist/</span>shenzhen</span><span className="ui-term__sig">$</span><span className="ui-term__typed" /><i className="ui-term__caret" aria-hidden="true" /></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </Card>
            <Card id="liderops" href={LINKS.liderops} title={p.liderops.h3} text={p.liderops.p} seed="47">
              <div className="stage stage--fade-b" role="img" aria-label={p.liderops.alt}>
                <div className="at-rise fit to-edge" style={{ '--fit-max': '400px', '--ax': 'max(24px, 50% - 200px)', '--ay': '56px', '--ay-sm': '56px' }}>
                  <div className="ui ui-panel ui-search" data-ui="search">
                    <div className="ui-search__field">
                      <Icon d={['M7 2.5a4.5 4.5 0 1 0 0 9 4.5 4.5 0 0 0 0-9Z', 'm10.5 10.5 3 3']} />
                      <span className="ui-search__q"><span data-search-q>{p.search.q}</span><i className="ui-search__caret" /></span>
                      <kbd className="ui-search__kbd">Ctrl K</kbd>
                    </div>
                    <div className="ui-search__group">{p.search.group}</div>
                    <ul className="ui-search__list" data-search-list>
                      {p.search.rows.map(([b, rest, m], i) => (
                        <li className={`ui-search__row${i === 0 ? ' is-sel' : ''}`} key={b}>
                          <span className="ui-search__ico"><Icon d={['M2.5 13.5h11', 'M3.5 13.5V6l4-2.5v10', 'M7.5 13.5V3.5l5 2.5v7.5', 'M9.5 7.5h1M9.5 10h1']} /></span>
                          <span className="ui-search__t"><b>{b}</b>{rest}</span>
                          <span className="ui-search__m">{m}</span>
                        </li>
                      ))}
                    </ul>
                    <div className="ui-search__foot"><span><kbd>↑</kbd><kbd>↓</kbd> {p.search.foot[0]}</span><span><kbd>Enter</kbd> {p.search.foot[1]}</span></div>
                  </div>
                </div>
              </div>
            </Card>
          </div>
        </div>
        <div className="grid">
          <Card id="aeon" href={LINKS.aeon} title={p.aeon.h3} text={p.aeon.p} seed="12">
            <div className="stage stage--fade-b" role="img" aria-label={p.aeon.alt}>
              <div className="at-rise to-edge fit" style={{ '--fit-max': '264px', '--ax': 'max(24px, 50% - 132px)', '--ay': '32px', '--ay-sm': '68px' }}>
                <div className="ui ui-panel ui-voice" data-ui="voice">
                  <div className="ui-voice__top">
                    <span className="ui-chip ui-chip--ink">{p.voice.chip}</span>
                    <span className="ui-spacer" />
                    <span className="ui-voice__time" data-voice-time>12:07</span>
                  </div>
                  <div className="ui-voice__orb" data-voice-orb />
                  <div className="ui-voice__who"><span className="ui-voice__name">{p.voice.name}</span><span className="ui-voice__with">{p.voice.with}</span></div>
                  <div className="ui-voice__cap" data-voice-cap lang="pt-BR">{p.voice.cap}</div>
                  <div className="ui-voice__bar">
                    <span className="ui-voice__btn" aria-hidden="true"><svg className="ui-icon" viewBox="0 0 16 16"><rect x="6" y="2" width="4" height="8" rx="2" /><path d="M3.5 8a4.5 4.5 0 0 0 9 0M8 12.5V14" /></svg></span>
                    <span className="ui-voice__wave" aria-hidden="true">{[4, 7, 12, 9, 16, 11, 20, 14, 8, 17, 12, 6, 10, 18, 13, 7, 15, 9, 5, 11, 7, 4].map((v, i) => <i key={i} style={{ '--h': v }} />)}</span>
                    <span className="ui-voice__btn ui-voice__end" aria-hidden="true"><svg className="ui-icon" viewBox="0 0 16 16"><rect x="5" y="5" width="6" height="6" rx="1" /></svg></span>
                  </div>
                </div>
              </div>
            </div>
          </Card>
          <Card id="pipeline" href="#questions" title={p.pipeline.h3} text={p.pipeline.p} seed="64">
            <div className="stage stage--fade-b" role="img" aria-label={p.pipeline.alt}>
              <div className="at-rise fit to-edge" style={{ '--fit-max': '420px', '--ax': 'max(24px, 50% - 210px)', '--ay': '56px', '--ay-sm': '56px' }}>
                <div className="ui ui-panel ui-stat" data-ui="stat" data-from="61" data-to="68" data-suffix="%" data-ui-opts='{"fill":true}'>
                  <div className="ui-stat__head">
                    <div className="ui-stat__top">
                      <span className="ui-stat__label">{p.stat.label}</span>
                      <span className="ui-stat__range">{p.stat.range}<svg className="ui-icon" viewBox="0 0 16 16" aria-hidden="true"><path d="m4.5 6.5 3.5 3.5 3.5-3.5" /></svg></span>
                    </div>
                    <div className="ui-stat__line">
                      <span className="ui-stat__num" data-stat-num>68%</span>
                      <span className="ui-chip ui-chip--plain ui-stat__delta"><svg viewBox="0 0 12 12" aria-hidden="true"><path d="M6 9.5v-7M3 5.5l3-3 3 3" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg>{p.stat.delta}</span>
                      <span className="ui-stat__sub">{p.stat.sub}</span>
                    </div>
                  </div>
                  <div className="ui-stat__chart">
                    <svg className="ui-stat__svg" viewBox="0 0 400 120" preserveAspectRatio="none" aria-hidden="true">
                      <path className="ui-stat__grid" d="M0 30.5H400M0 60.5H400M0 90.5H400" />
                      <path className="ui-stat__cover" fillRule="evenodd" d="" />
                      <g className="ui-stat__bars">
                        {[71, 66, 75, 69, 78, 73, 82, 77, 85, 80, 88, 84, 90, 86].map((hgt, i) => (
                          <rect key={i} rx="3" x={(i * 29.14).toFixed(2)} y={(120 - hgt).toFixed(2)} width="21.14" height={hgt} />
                        ))}
                      </g>
                    </svg>
                    <div className="ui-stat__axis" aria-hidden="true">{p.stat.axis.map((a) => <span key={a}>{a}</span>)}</div>
                  </div>
                </div>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ split-text-left: the stack, as a hub diagram */

function Stack({ t }) {
  const s = t.stack;
  const spec = {
    layout: 'hub',
    alt: s.alt,
    center: { label: 'Kohrgeist' },
    spokes: [
      { label: 'React', icon: 'react' },
      { label: 'TypeScript', icon: 'typescript' },
      { label: 'Node.js', icon: 'nodejs' },
      { label: 'MySQL', icon: 'mysql' },
      { label: 'Docker', icon: 'docker' },
      { label: 'Electron', icon: 'electron' },
      { label: 'Python', icon: 'python' },
      { label: 'C++', icon: 'c-plusplus' },
    ],
  };
  return (
    <section className="section" id="stack" aria-labelledby="stack-h">
      <div className="wrap">
        <div className="grid grid--top">
          <div className="span-6 stack-5">
            <h2 id="stack-h">{s.h2}</h2>
            <p className="t-lead">{s.p}</p>
            <dl className="facts">
              {s.facts.map(([k, v]) => <div key={k}><dt>{k}</dt><dd>{v}</dd></div>)}
            </dl>
            <a className="link" href={LINKS.repos}>{s.link}</a>
          </div>
          <div className="frame frame--split span-6 start-7">
            <div className="dg" data-dg-still data-diagram={JSON.stringify(spec)} />
          </div>
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ faq */

function Faq({ t }) {
  const f = t.faq;
  return (
    <section className="section" id="questions" aria-labelledby="questions-h">
      <div className="wrap">
        <div className="grid grid--top">
          <div className="span-6 stack-4">
            <h2 id="questions-h">{f.h2}</h2>
            <p className="muted">{f.line}</p>
          </div>
          <div className="faq span-6 start-7">
            {f.items.map(([q, a]) => (
              <div className="faq__item" key={q}><h3>{q}</h3><p>{a}</p></div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ footer.closing: close-type + footer-dark */

function Closing({ t, base }) {
  const c = t.close;
  const fix = (href) => (href.startsWith('#') || href.startsWith('http') ? href : href === '../' ? base : base + href);
  return (
    <footer className="footer closing footer--dark g2m" id="contact" aria-labelledby="close-h">
      <div className="wrap">
        <div className="closing__cta close--type">
          <div className="section-head">
            <h2 id="close-h">{c.h2}</h2>
            <p className="t-small muted">{c.line}</p>
          </div>
          <MainButton t={t} cls="btn--xl btn--wide" />
        </div>
        <div className="closing__links">
          <div className="grid">
            <div className="span-4 stack-4">
              <a className="nav__logo footer__mark" href="#top"><span className="mark mark--initial" aria-hidden="true">M</span>Marcos Pereira</a>
              <p className="footer__lede">{c.lede}</p>
            </div>
            {c.cols.map((col) => (
              <div className="span-2 footer__col" key={col.h}>
                <h3>{col.h}</h3>
                <ul>{col.links.map(([label, href]) => <li key={label}><a href={fix(href)}>{label}</a></li>)}</ul>
              </div>
            ))}
          </div>
          <div className="footer__legal">
            <span>© 2026 Marcos Pereira</span>
            <span className="muted">{c.legal}</span>
          </div>
        </div>
      </div>
    </footer>
  );
}

/* ------------------------------------------------------------------ the document */

const PAGE_CSS = `
/* page CSS: only what sits inside a visual, plus one --p-h per card group (sections-library.md) */

/* hero collage pieces, sized in % of the collage, text in container units */
.ly-collage { container-type: inline-size; }
.ly-collage .ly-piece { border: 1px solid rgb(242 236 236 / .12); box-shadow: 0 1px 2px rgb(0 0 0 / .4), 0 22px 48px -22px rgb(0 0 0 / .7); background: #150d0f; color: #f2ecec; font: 400 max(13px, 1.9cqw)/1.35 var(--font-text); }
.ly-collage .pc-lbl { display: flex; align-items: center; gap: 1.4cqw; font: 500 max(13px, 1.7cqw)/1.2 var(--font-mono); color: #a8999d; }
.ly-collage .pc-lbl em { margin-left: auto; font-style: normal; color: #f2ecec; }
.ly-collage .pc-shot { padding: 0; overflow: hidden; background: #07070a; }
.ly-collage .pc-shot img { width: 100%; height: 100%; object-fit: cover; object-position: 0 0; display: block; }
.ly-collage .pc-late { padding: 3cqw; display: grid; gap: 1.6cqw; }
.pc-late .pc-tag { justify-self: start; font: 500 max(13px, 1.7cqw)/1 var(--font-text); color: #0b0607; background: #ff2b3d; padding: .9cqw 1.6cqw; border-radius: .6cqw; }
.pc-late b { font-weight: 500; } .pc-late b i, .pc-focus i { font-style: normal; font-family: var(--font-mono); color: #a8999d; margin-right: .8cqw; }
.pc-late small { color: #a8999d; font-size: max(13px, 1.7cqw); }
.ly-collage .pc-focus { padding: 3.2cqw 3.4cqw; display: grid; align-content: start; gap: 2cqw; }
.pc-focus .pc-row { display: grid; grid-template-columns: auto 1fr; gap: .4cqw 1cqw; padding-top: 1.8cqw; border-top: 1px solid rgb(242 236 236 / .1); }
.pc-focus .pc-row b { font-weight: 500; } .pc-focus .pc-row small { grid-column: 2; color: #ff8a95; font-size: max(13px, 1.7cqw); }
.ly-collage .pc-code, .ly-collage .pc-json { padding: 3cqw 3.4cqw; display: grid; gap: 1.8cqw; }
.ly-collage pre { margin: 0; white-space: pre-wrap; font: 400 max(13px, 1.8cqw)/1.5 var(--font-mono); }
.ly-collage pre .k { color: #ff6b78; } .ly-collage pre .n { color: #ffb020; } .ly-collage pre .f { color: #f2ecec; text-decoration: underline; text-decoration-color: rgb(242 236 236 / .3); } .ly-collage pre .s { color: #d8c9cc; }
.ly-collage .pc-tests { padding: 3cqw 3.4cqw 3cqw; display: grid; align-content: start; gap: 2cqw; }
.pc-tests .pc-row { display: flex; justify-content: space-between; gap: 2cqw; padding-top: 1.8cqw; border-top: 1px solid rgb(242 236 236 / .1); padding-right: 9cqw; }
.pc-tests code { font: 400 max(13px, 1.8cqw)/1.3 var(--font-mono); color: #d8c9cc; }
.pc-tests b { font-weight: 500; display: inline-flex; gap: 1cqw; } .pc-tests .ok { color: #6fd39a; }
.ly-collage .pc-rec { padding: 3cqw 3.4cqw; display: grid; gap: 2.2cqw; }
.pc-rec .pc-dot { width: 1.6cqw; height: 1.6cqw; border-radius: 50%; background: #ff2b3d; flex: none; }
.pc-rec .pc-wave { display: flex; align-items: center; gap: .7cqw; height: 6cqw; }
.pc-rec .pc-wave i { flex: 1; height: calc(var(--h) * .25cqw); background: #ff2b3d; border-radius: .4cqw; opacity: .85; }
.pc-rec p { margin: 0; font-size: max(13px, 2.1cqw); line-height: 1.4; }
.ly-collage .pc-enrich { padding: 3cqw; display: grid; gap: 1.6cqw; }
.pc-enrich .pc-row { display: grid; grid-template-columns: 1fr auto; gap: .2cqw 1.4cqw; padding-top: 1.4cqw; border-top: 1px solid rgb(242 236 236 / .1); }
.pc-enrich b { font-weight: 500; } .pc-enrich small { color: #a8999d; font-size: max(13px, 1.6cqw); grid-column: 1; }
.pc-enrich .pc-ok { grid-column: 2; grid-row: 1 / 3; align-self: center; font-size: max(13px, 1.5cqw); color: #6fd39a; }
.ly-collage .pc-mail { padding: 3.2cqw 3.6cqw; display: grid; align-content: start; gap: 1.8cqw; }
.pc-mail b { font-weight: 500; font-size: max(13px, 2.3cqw); } .pc-mail p { margin: 0; color: #d8c9cc; padding-right: 9cqw; }
@media (max-width: 1023px) { .pc-focus .pc-row:nth-of-type(n+3) { display: none; } }
/* the narrowest phones: the close's big button keeps its label on one line inside the screen */
@media (max-width: 359px) { .closing__cta .btn--xl { font-size: 16px; padding-inline: var(--s-4); } }

/* a phone: the footer's second screen keeps clear of the action bar */
@media (max-width: 639px) { .closing__links .footer__lede { display: none; } }

/* a phone: the collage keeps a fixed height, so the hero ends with the same air as the other sections */
@media (max-width: 639px) { .hero--triptych .ly-collage { flex: 0 0 auto; height: 318px; } }
@media (max-width: 639px) { .pc-focus .pc-row:nth-of-type(n+2), .pc-enrich .pc-row:nth-of-type(n+3) { display: none; } .ly-collage .pc-late small { display: none; } }

/* app-frame recipe (sections-library.md) */
.fca__p { font-size: var(--t-body); margin: 0; }
.app.ui { display: grid; grid-template-columns: minmax(0, 5fr) minmax(0, 7fr); margin-top: var(--s-7); background: var(--u-bg); border: 1px solid var(--u-border); border-radius: var(--u-r); box-shadow: var(--u-shadow); }
.app > .app__pane { position: relative; min-width: 0; min-height: 0; overflow: hidden; }
.app > .app__pane + .app__pane { border-left: 1px solid var(--u-line); }
.app > .app__pane > .ui-panel { width: 100%; border: 0; border-radius: 0; box-shadow: none; }
.app > .app__pane--open > .ui-doc { width: 100%; padding: var(--s-6) 248px var(--s-6) var(--s-6); }
.app .ui-doc__note { right: var(--s-6); top: var(--s-6); }
@media (max-width: 639px) { .app > .app__pane--open > .ui-doc { padding: var(--s-5) var(--s-5) var(--s-5) var(--s-5); } .app .ui-doc__note { position: static; width: auto; margin-top: var(--s-4); } }
.app > .app__pane::after { content: ""; position: absolute; inset: auto 0 0 0; height: 64px; background: linear-gradient(transparent, var(--u-bg)); pointer-events: none; }
@media (min-width: 1024px) and (max-width: 1279px) { .app .ui-win__side { display: none; } .app .ui-win__body { grid-template-columns: minmax(0, 1fr); } }
@media (max-width: 1023px) {
  .app.ui { grid-template-columns: minmax(0, 1fr); grid-template-rows: auto minmax(0, 1fr); }
  .app > .app__pane--list { max-height: 252px; }
  .app > .app__pane--list::after { display: none; }
  .app .ui-win__side { display: none; }
  .app .ui-win__body { grid-template-columns: minmax(0, 1fr); }
  .app > .app__pane + .app__pane { border-left: 0; border-top: 1px solid var(--u-line); }
}
@media (max-width: 639px) {
  .app.ui { grid-template-rows: minmax(0, 1fr); }
  .app > .app__pane--list { display: none; }
  .app > .app__pane + .app__pane { border-top: 0; }
}

/* the 2x2's one panel height; a tablet and a phone value so the four cards stay in two screens */
#projects .panel { --p-h: 336px; }
@media (min-width: 1024px) and (max-width: 1279px) { #projects .panel { --p-h: 220px; } }
/* the tablet keeps the 2x2 two-up, so the four cards fit one screen there */
@media (min-width: 640px) and (max-width: 1023px) {
  #projects { --h: 1; }
  #projects > .wrap { display: flex; flex-direction: column; row-gap: var(--s-5); }
  #projects .panel { --p-h: 132px; }
}
@media (max-width: 639px) { #projects .panel { --p-h: 96px; } #aeon .ui-voice__orb { display: none; } }

/* the stack's frame is shorter where it stacks under the text */
#stack .frame--split { --ratio: 104%; }
@media (min-width: 1024px) and (max-width: 1279px) { #stack .frame--split { --ratio: 130%; } }
@media (min-width: 640px) and (max-width: 1023px) { #stack .frame--split { --ratio: 56.25%; } }
@media (max-width: 639px) { #stack .frame--split { --ratio: 75%; } #stack .facts { display: none; } }

/* the two questions about FCA Board stay off the phone, so the list keeps one phone screen */
@media (max-width: 639px) { #questions .faq__item:nth-child(n+5) { display: none; } }

/* the statement's picture: the Kohrgeist cathedral, pixel art kept crisp */
.statement__row { margin-top: var(--s-7); }
.statement__row .mo-la__sub { margin-top: 0; }
.statement__art { aspect-ratio: 3 / 1; overflow: hidden; border: 1px solid rgb(255 43 61 / .28); border-radius: var(--r-lg); background: #0b0607; }
.statement__art img { display: block; width: 100%; height: 100%; object-fit: cover; image-rendering: pixelated; }
@media (max-width: 1023px) { .statement__art { margin-top: var(--s-6); } }

/* the statement's ruled ground keeps the section box (one screen, the system's padding) */
#principle.bg-ruled { --g-screen: 100svh; padding: var(--padt) 0 calc(var(--padb) + var(--bar)); }
@media (max-width: 639px) { #principle.bg-ruled { --g-screen: 100lvh; } }

/* the nav card's panel (nav-mega: 160px) */
.menu-card__panel { --p-h: 160px; overflow: hidden; }
.menu-card__panel .frame__img { width: 100%; height: 100%; object-fit: cover; object-position: 0 0; }

/* the stack facts: plain lines under the lead */
.facts { margin-bottom: 0; display: grid; gap: var(--s-3); }
.facts div { display: grid; grid-template-columns: 9rem 1fr; gap: var(--s-4); }
.facts dt { color: var(--muted); font-size: var(--t-label); font-weight: 500; padding-top: 2px; }
.facts dd { margin: 0; }

/* the neubrutal touch Marcos asked for: a hard, unblurred red offset on the linked cards when they lift */
#projects a.card { transition: box-shadow var(--dur) var(--ease), translate var(--dur) var(--ease); }
#projects a.card:hover { box-shadow: 6px 6px 0 0 rgb(255 43 61 / .55); }
`;

export default function Page({ lang, base }) {
  const t = CONTENT[lang === 'pt' ? 'pt' : 'en'];
  const a = (p) => `${base}assets/${p}`;
  const fragments = ['window', 'doc', 'search', 'voice', 'stat', 'terminal-run'];
  return (
    <html lang={t.lang} data-type="software" data-radius="sharp" data-buttons="solid" data-motion="">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover" />
        <title>{t.title}</title>
        <meta name="description" content={t.description} />
        <meta property="og:type" content="website" />
        <meta property="og:title" content={t.title} />
        <meta property="og:description" content={t.description} />
        <meta property="og:image" content={`${base}share.jpg`} />
        <meta name="twitter:card" content="summary_large_image" />
        <link rel="icon" href={`${base}favicon.svg`} type="image/svg+xml" />
        <meta name="theme-color" content="#0b0607" />
        <link rel="alternate" hrefLang={lang === 'pt' ? 'en' : 'pt-BR'} href={lang === 'pt' ? base : `${base}pt/`} />
        <meta name="site-kind" content="software" />
        <meta name="page-type" content="software" />
        <link rel="preload" href={a('fonts/instrument-sans-latin-standard-normal.woff2')} as="font" type="font/woff2" crossOrigin="" />
        <link rel="stylesheet" href={a('fonts/fonts.css')} />
        <link rel="stylesheet" href={a('system.css')} />
        <link rel="stylesheet" href={a('ui/cards.css')} />
        <link rel="stylesheet" href={a('motion/motion.css')} />
        <link rel="stylesheet" href={a('backgrounds/backgrounds.css')} />
        <link rel="stylesheet" href={a('layout/layout.css')} />
        <link rel="stylesheet" href={a('icons/icon.css')} />
        <style dangerouslySetInnerHTML={{ __html: `
:root {
  --p-bg: #0b0607; --p-surface: #140c0e; --p-ink: #f2ecec; --p-muted: #a8999d;
  --p-accent: #ff2b3d; --p-accent-ink: #0b0607; --p-action: #ff2b3d; --p-action-ink: #0b0607;
  --p-inv-bg: #f2ecec; --p-inv-surface: #dfd9d9; --p-inv-ink: #0b0607; --p-inv-muted: #585152;
  --p-inv-accent: #ff2b3d; --p-inv-accent-ink: #0b0607; --p-inv-action: #ff2b3d; --p-inv-action-ink: #0b0607;
  --font-display: "Instrument Sans", system-ui, sans-serif;
  --font-text: "Instrument Sans", system-ui, sans-serif;
  --font-mono: "DM Mono", ui-monospace, "SFMono-Regular", Menlo, Consolas, monospace;
  --display-weight: 500;
  --display-tracking: -0.028em;
  --display-tracking-xl: -0.036em;
  --display-stretch: 96%;
  --ly-scale: 1.04;
}` }} />
        <link rel="stylesheet" href={a('ui/base.css')} />
        {fragments.map((f) => <link key={f} rel="stylesheet" href={a(`ui/${f}/fragment.css`)} />)}
        <link rel="stylesheet" href={a('diagrams/diagram.css')} />
        <script dangerouslySetInnerHTML={{ __html: "document.documentElement.classList.add('m-enter');setTimeout(()=>document.documentElement.classList.add('m-enter-done'),700)" }} />
        <script src={a('backgrounds/backgrounds.js')} />
        <script dangerouslySetInnerHTML={{ __html: "document.documentElement.classList.add('mo-js');setTimeout(()=>document.documentElement.classList.add('mo-safe'),2500)" }} />
        <link rel="modulepreload" href={a('moments/moments.js')} />
        <link rel="modulepreload" href={a('moments/lib.js')} />
        <link rel="modulepreload" href={a('moments/letters-assemble/moment.js')} />
        <style dangerouslySetInnerHTML={{ __html: PAGE_CSS }} />
      </head>
      <body>
        <Nav t={t} base={base} />
        <main id="top">
          <Hero t={t} base={base} />
          <FcaFrame t={t} />
          <Statement t={t} base={base} />
          <Projects t={t} />
          <Faq t={t} />
          <Stack t={t} />
        </main>
        <Closing t={t} base={base} />
        <nav className="actionbar" aria-label={t.quick}>
          <a className="btn btn--primary" href={LINKS.linkedin} rel="me">{t.main}</a>
        </nav>
        <script type="module" src={a('system.js')} />
        <script type="module" src={a('motion/motion.js')} />
        <script type="module" src={a('layout/layout.js')} />
        <script type="module" src={a('diagrams/mount.js')} />
      </body>
    </html>
  );
}
