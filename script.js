(() => {
  const $ = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => [...r.querySelectorAll(s)];
  const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ---------- Content (edit me) ---------- */
  const projects = [
    { t: 'Nebula Dash', d: 'Real-time analytics dashboard with live WebSocket streams and sub-100ms updates.', tags: ['TypeScript', 'React', 'WebSockets'], cat: 'web', i: '🌌', url: 'https://github.com/the-night-coder' },
    { t: 'Lunar CLI', d: 'A blazing-fast command line toolkit that automates dev workflows and scaffolding.', tags: ['Go', 'CLI', 'DX'], cat: 'tool', i: '🌙', url: 'https://github.com/the-night-coder' },
    { t: 'Insomnia AI', d: 'Chat assistant that summarises long documents and answers questions with citations.', tags: ['Python', 'LLM', 'RAG'], cat: 'ai', i: '🧠', url: 'https://github.com/the-night-coder' },
    { t: 'Orbit UI', d: 'Accessible, themeable component library with zero-runtime styling.', tags: ['CSS', 'A11y', 'Design System'], cat: 'web', i: '🪐', url: 'https://github.com/the-night-coder' },
    { t: 'Comet Deploy', d: 'One-command deploys to the edge with automatic previews for every branch.', tags: ['Node', 'Docker', 'CI/CD'], cat: 'tool', i: '☄️', url: 'https://github.com/the-night-coder' },
    { t: 'Stargazer', d: 'Vision model pipeline that tags and searches thousands of photos on-device.', tags: ['Python', 'ML', 'Edge'], cat: 'ai', i: '🔭', url: 'https://github.com/the-night-coder' },
  ];
  const skills = [
    ['JS/TS', 95], ['React', 90], ['Node', 88], ['Python', 82], ['CSS', 92], ['SQL', 80], ['Docker', 78], ['Go', 65],
  ];
  const typedWords = ['clean code.', 'fast interfaces.', 'resilient APIs.', 'tools people love.', 'things at 2 AM.'];

  /* ---------- Misc ---------- */
  $('#year').textContent = new Date().getFullYear();
  const toast = msg => { const t = $('#toast'); t.textContent = msg; t.classList.add('show'); clearTimeout(t._h); t._h = setTimeout(() => t.classList.remove('show'), 2200); };
  const tick = () => { $('#clock').textContent = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }); };
  tick(); setInterval(tick, 15000);

  /* ---------- Starfield with shooting stars, reacts to mouse ---------- */
  const cv = $('#sky'), ctx = cv.getContext('2d');
  let W, H, stars = [], shooters = [], mx = 0, my = 0, scrollY = 0;
  const resize = () => {
    const dpr = Math.min(devicePixelRatio || 1, 2);
    W = cv.width = innerWidth * dpr; H = cv.height = innerHeight * dpr; ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    W /= dpr; H /= dpr;
    stars = Array.from({ length: Math.min(220, Math.floor(W * H / 7000)) }, () => ({
      x: Math.random() * W, y: Math.random() * H, z: Math.random() * 0.9 + 0.1, p: Math.random() * 6.28,
    }));
  };
  addEventListener('resize', resize); resize();
  addEventListener('pointermove', e => { mx = e.clientX / innerWidth - 0.5; my = e.clientY / innerHeight - 0.5; });
  const frame = t => {
    ctx.clearRect(0, 0, W, H);
    const dawn = document.body.classList.contains('dawn');
    for (const s of stars) {
      const x = ((s.x - mx * 40 * s.z) % W + W) % W;
      const y = ((s.y - my * 40 * s.z - scrollY * 0.15 * s.z) % H + H) % H;
      const a = 0.35 + 0.65 * Math.abs(Math.sin(t / 1100 + s.p));
      ctx.fillStyle = dawn ? `rgba(255,140,60,${a * 0.5})` : `rgba(210,220,255,${a})`;
      ctx.beginPath(); ctx.arc(x, y, s.z * 1.5, 0, 6.283); ctx.fill();
    }
    if (!dawn && Math.random() < 0.006) shooters.push({ x: Math.random() * W, y: Math.random() * H * 0.4, l: 0 });
    shooters = shooters.filter(s => s.l < 60);
    for (const s of shooters) {
      s.x += 11; s.y += 5; s.l++;
      const g = ctx.createLinearGradient(s.x, s.y, s.x - 90, s.y - 40);
      g.addColorStop(0, 'rgba(255,255,255,.9)'); g.addColorStop(1, 'transparent');
      ctx.strokeStyle = g; ctx.lineWidth = 2; ctx.beginPath(); ctx.moveTo(s.x, s.y); ctx.lineTo(s.x - 90, s.y - 40); ctx.stroke();
    }
    if (!reduce) requestAnimationFrame(frame);
  };
  frame(0);

  /* ---------- Cursor, progress, magnetic buttons ---------- */
  const cur = $('.cursor');
  addEventListener('pointermove', e => {
    cur.style.opacity = 1; cur.style.left = e.clientX + 'px'; cur.style.top = e.clientY + 'px';
    cur.classList.toggle('hover', !!e.target.closest('a,button,.card,input'));
  });
  addEventListener('scroll', () => {
    scrollY = window.scrollY;
    $('.progress').style.width = (scrollY / (document.documentElement.scrollHeight - innerHeight) * 100) + '%';
  }, { passive: true });
  $$('.magnetic').forEach(el => {
    el.addEventListener('pointermove', e => {
      const r = el.getBoundingClientRect();
      el.style.transform = `translate(${(e.clientX - r.left - r.width / 2) * 0.25}px,${(e.clientY - r.top - r.height / 2) * 0.35}px)`;
    });
    el.addEventListener('pointerleave', () => (el.style.transform = ''));
  });

  /* ---------- Typewriter ---------- */
  (() => {
    const el = $('#typed'); let w = 0, c = 0, del = false;
    if (reduce) { el.textContent = typedWords[0]; return; }
    const step = () => {
      const word = typedWords[w];
      el.textContent = word.slice(0, c);
      if (!del && c === word.length) { del = true; return setTimeout(step, 1400); }
      if (del && c === 0) { del = false; w = (w + 1) % typedWords.length; }
      c += del ? -1 : 1;
      setTimeout(step, del ? 35 : 75);
    };
    step();
  })();

  /* ---------- Reveal + counters + skill bars ---------- */
  const countUp = el => {
    const end = +el.dataset.count, t0 = performance.now();
    const run = t => { const p = Math.min((t - t0) / 1400, 1); el.textContent = Math.round(end * (1 - Math.pow(1 - p, 3))); if (p < 1) requestAnimationFrame(run); };
    requestAnimationFrame(run);
  };
  const io = new IntersectionObserver(es => es.forEach(e => {
    if (!e.isIntersecting) return;
    e.target.classList.add('in');
    $$('[data-count]', e.target).forEach(countUp);
    $$('.bar i', e.target).forEach(b => (b.style.width = b.dataset.w + '%'));
    io.unobserve(e.target);
  }), { threshold: 0.15 });
  const observe = () => $$('.reveal').forEach(el => io.observe(el));

  /* ---------- Project cards with 3D tilt + spotlight ---------- */
  const cards = $('#cards');
  cards.innerHTML = projects.map(p => `
    <article class="card reveal" data-cat="${p.cat}">
      <div class="ico">${p.i}</div><h3>${p.t}</h3><p>${p.d}</p>
      <div class="tags">${p.tags.map(t => `<span>${t}</span>`).join('')}</div>
      <a class="go" href="${p.url}" target="_blank" rel="noopener">View project ↗</a>
    </article>`).join('');
  $$('.card').forEach(c => {
    c.addEventListener('pointermove', e => {
      const r = c.getBoundingClientRect(), x = (e.clientX - r.left) / r.width, y = (e.clientY - r.top) / r.height;
      c.style.setProperty('--mx', x * 100 + '%'); c.style.setProperty('--my', y * 100 + '%');
      if (!reduce) c.style.transform = `rotateY(${(x - .5) * 10}deg) rotateX(${(.5 - y) * 10}deg) translateZ(6px)`;
    });
    c.addEventListener('pointerleave', () => (c.style.transform = ''));
  });
  $$('.chip').forEach(ch => ch.addEventListener('click', () => {
    $$('.chip').forEach(x => x.classList.toggle('active', x === ch));
    $$('.card').forEach(c => c.classList.toggle('hide', ch.dataset.f !== 'all' && c.dataset.cat !== ch.dataset.f));
  }));

  /* ---------- Skills: orbit + bars ---------- */
  const orbit = $('#orbit');
  [0, 1, 2].forEach(r => {
    const ring = document.createElement('div');
    ring.className = 'ring';
    const inset = 8 + r * 15, dur = 28 + r * 14;
    ring.style.cssText = `inset:${inset}%;animation-duration:${dur}s;${r % 2 ? 'animation-direction:reverse' : ''}`;
    const mine = skills.filter((_, i) => i % 3 === r);
    mine.forEach(([n], i) => {
      const a = (i / mine.length) * 6.283, pl = document.createElement('div');
      pl.className = 'planet'; pl.textContent = n;
      pl.style.cssText = `transform:translate(${Math.cos(a) * 50 * 4.2}%,${Math.sin(a) * 50 * 4.2}%) ;`;
      pl.style.left = 50 + Math.cos(a) * 50 + '%'; pl.style.top = 50 + Math.sin(a) * 50 + '%'; pl.style.transform = '';
      pl.style.animation = `spin ${dur}s linear infinite ${r % 2 ? '' : 'reverse'}`;
      ring.appendChild(pl);
    });
    orbit.appendChild(ring);
  });
  $('#skill-list').innerHTML = skills.map(([n, v]) =>
    `<li><div class="row"><span>${n}</span><span>${v}%</span></div><div class="bar"><i data-w="${v}"></i></div></li>`).join('');
  $('#skill-list').classList.add('reveal');
  observe();

  /* ---------- Interactive terminal ---------- */
  const body = $('#term-body'), input = $('#term-cmd');
  const out = (html, cls = 'o') => { body.insertAdjacentHTML('beforeend', `<div class="${cls}">${html}</div>`); body.scrollTop = body.scrollHeight; };
  const toggleTheme = () => { document.body.classList.toggle('dawn'); const d = document.body.classList.contains('dawn'); $('meta[name=theme-color]').content = d ? '#fff7ee' : '#07080f'; return d; };
  const go = id => { document.getElementById(id)?.scrollIntoView({ behavior: reduce ? 'auto' : 'smooth' }); };
  const cmds = {
    help: () => 'commands: <span class="h">whoami, skills, projects, contact, theme, matrix, clear, sudo</span>',
    whoami: () => 'The Night Coder — engineer who ships best after midnight. ☕🌙',
    skills: () => skills.map(([n, v]) => n + ' ' + '█'.repeat(v / 10) + '░'.repeat(10 - v / 10)).join('\n'),
    projects: () => { go('work'); return projects.map(p => `${p.i} ${p.t} — ${p.d}`).join('\n'); },
    contact: () => { go('contact'); return 'itsmesreekanthkr@gmail.com'; },
    theme: () => `switched to ${toggleTheme() ? 'dawn ☀️' : 'night 🌙'} mode`,
    matrix: () => { document.body.classList.toggle('party'); return 'reality.exe toggled'; },
    clear: () => { body.innerHTML = ''; return null; },
    sudo: () => 'nice try. you are not in the sudoers file. this incident will be reported 😉',
    ls: () => 'about/  work/  stack/  journey/  contact/',
  };
  out('Welcome! Type <span class="h">help</span> to see what I can do.');
  $('#term-form').addEventListener('submit', e => {
    e.preventDefault();
    const v = input.value.trim(); input.value = ''; if (!v) return;
    out(`<span class="p">❯</span> ${v.replace(/[<>&]/g, '')}`, '');
    const fn = cmds[v.toLowerCase()];
    const r = fn ? fn() : `command not found: ${v.replace(/[<>&]/g, '')}. try <span class="h">help</span>`;
    if (r !== null) out(r);
  });

  /* ---------- Command palette ---------- */
  const pal = $('#palette'), pin = $('#pal-input'), plist = $('#pal-list');
  const actions = [
    ['Go to About', 'g a', () => go('about')], ['Go to Work', 'g w', () => go('work')],
    ['Go to Stack', 'g s', () => go('skills')], ['Go to Journey', 'g j', () => go('journey')],
    ['Go to Contact', 'g c', () => go('contact')],
    ['Toggle night / dawn theme', 't', () => toast(toggleTheme() ? 'Good morning ☀️' : 'Back to the night 🌙')],
    ['Copy email', 'e', copyEmail], ['Open GitHub', 'h', () => open('https://github.com/the-night-coder', '_blank')],
  ];
  let sel = 0, shown = actions;
  const render = () => {
    plist.innerHTML = shown.map((a, i) => `<li class="${i === sel ? 'sel' : ''}" data-i="${i}">${a[0]}<small>${a[1]}</small></li>`).join('') || '<li>No results</li>';
  };
  const openPal = () => { pal.hidden = false; pin.value = ''; shown = actions; sel = 0; render(); pin.focus(); };
  const closePal = () => (pal.hidden = true);
  const runSel = () => { const a = shown[sel]; if (a) { closePal(); a[2](); } };
  pin.addEventListener('input', () => { shown = actions.filter(a => a[0].toLowerCase().includes(pin.value.toLowerCase())); sel = 0; render(); });
  pin.addEventListener('keydown', e => {
    if (e.key === 'ArrowDown') { sel = (sel + 1) % shown.length; render(); e.preventDefault(); }
    if (e.key === 'ArrowUp') { sel = (sel - 1 + shown.length) % shown.length; render(); e.preventDefault(); }
    if (e.key === 'Enter') runSel();
  });
  plist.addEventListener('click', e => { const li = e.target.closest('li[data-i]'); if (li) { sel = +li.dataset.i; runSel(); } });
  pal.addEventListener('click', e => { if (e.target === pal) closePal(); });
  $('#palette-btn').addEventListener('click', openPal);
  addEventListener('keydown', e => {
    if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') { e.preventDefault(); pal.hidden ? openPal() : closePal(); }
    if (e.key === 'Escape') closePal();
  });

  /* ---------- Copy email + easter eggs ---------- */
  function copyEmail() {
    navigator.clipboard?.writeText('itsmesreekanthkr@gmail.com').then(() => toast('Email copied ✨'), () => toast('Copy failed — select it manually'));
  }
  $('#copy').addEventListener('click', copyEmail);
  const konami = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a'];
  let ki = 0;
  addEventListener('keydown', e => {
    ki = e.key.toLowerCase() === konami[ki].toLowerCase() ? ki + 1 : 0;
    if (ki === konami.length) { ki = 0; document.body.classList.toggle('party'); toast('🎉 Party mode unlocked'); }
  });
  $('#konami-hint').addEventListener('click', () => toast('↑ ↑ ↓ ↓ ← → ← → B A'));
})();
