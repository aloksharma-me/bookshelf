(() => {
  const $ = (s, el = document) => el.querySelector(s);
  const $$ = (s, el = document) => [...el.querySelectorAll(s)];
  const store = {
    get(k) { try { return localStorage.getItem(k); } catch { return null; } },
    set(k, v) { try { localStorage.setItem(k, v); } catch {} },
  };
  // ---------- theme toggle ----------
  const root = document.documentElement;
  const toggle = $('.theme-toggle');
  const systemDark = matchMedia('(prefers-color-scheme: dark)');
  const applyTheme = (theme) => {
    root.dataset.theme = theme;
    const label = `Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`;
    toggle?.setAttribute('aria-label', label);
    toggle?.setAttribute('title', label);
  };
  applyTheme(root.dataset.theme || (systemDark.matches ? 'dark' : 'light'));
  toggle?.addEventListener('click', () => {
    const next = root.dataset.theme === 'dark' ? 'light' : 'dark';
    applyTheme(next);
    store.set('theme', next);
  });
  // Follow the system until the reader picks a theme themselves.
  systemDark.addEventListener('change', (e) => { if (!store.get('theme')) applyTheme(e.matches ? 'dark' : 'light'); });

  const byTitle = (a, b) => a.dataset.title.localeCompare(b.dataset.title);
  const sorters = {
    cat: null, // original DOM order
    title: byTitle,
    author: (a, b) => a.dataset.author.localeCompare(b.dataset.author) || byTitle(a, b),
    count: (a, b) => b.dataset.count - a.dataset.count,
    date: (a, b) => (b.dataset.date || '0').localeCompare(a.dataset.date || '0'),
  };

  // ---------- home: shelf ----------
  const shelf = $('.shelf');
  if (shelf) {
    const spines = $$('.spine', shelf);
    const caption = $('.shelf-caption');
    const fallback = caption.innerHTML;
    const show = (s) => {
      caption.innerHTML = '';
      const t = document.createElement('strong');
      t.textContent = s.dataset.label;
      const m = document.createElement('span');
      m.className = 'cap-meta';
      m.textContent = `${s.dataset.author} · ${Number(s.dataset.count).toLocaleString()} highlights`;
      caption.append(t, m);
    };
    spines.forEach((s) => {
      s.addEventListener('mouseenter', () => show(s));
      s.addEventListener('focus', () => show(s));
    });
    shelf.addEventListener('mouseleave', () => { caption.innerHTML = fallback; });

    // Arrange (FLIP so spines slide into place)
    const arrange = (key) => {
      const first = new Map(spines.map((s) => [s, s.getBoundingClientRect()]));
      const order = sorters[key] ? [...spines].sort(sorters[key]) : spines;
      order.forEach((s) => shelf.appendChild(s));
      if (matchMedia('(prefers-reduced-motion: reduce)').matches) return;
      spines.forEach((s) => {
        const a = first.get(s), b = s.getBoundingClientRect();
        const dx = a.left - b.left, dy = a.top - b.top;
        if (!dx && !dy) return;
        s.animate([{ transform: `translate(${dx}px, ${dy}px)` }, { transform: 'translate(0,0)' }],
          { duration: 520, easing: 'cubic-bezier(.2,.8,.2,1)' });
      });
    };
    const arrangeBtns = $$('.arrange button');
    arrangeBtns.forEach((btn) => btn.addEventListener('click', () => {
      arrangeBtns.forEach((b) => b.setAttribute('aria-pressed', String(b === btn)));
      arrange(btn.dataset.sort);
      store.set('shelf-sort', btn.dataset.sort);
    }));
    const saved = store.get('shelf-sort');
    if (saved && saved !== 'cat') arrangeBtns.find((b) => b.dataset.sort === saved)?.click();

    // Category legend filter
    const legend = $$('.legend button');
    legend.forEach((btn) => btn.addEventListener('click', () => {
      const on = btn.getAttribute('aria-pressed') !== 'true';
      legend.forEach((b) => b.setAttribute('aria-pressed', String(on && b === btn)));
      shelf.classList.toggle('has-filter', on);
      spines.forEach((s) => s.classList.toggle('on', on && s.dataset.cat === btn.dataset.cat));
    }));
  }

  // ---------- home: from the margins ----------
  const pool = window.MARGIN_POOL;
  if (pool?.length) {
    const text = $('#mq-text'), link = $('#mq-link'), book = $('#mq-book'), author = $('#mq-author');
    let last = -1;
    const next = (animate) => {
      let i;
      do { i = Math.floor(Math.random() * pool.length); } while (pool.length > 1 && i === last);
      last = i;
      const q = pool[i];
      const apply = () => {
        text.textContent = q.t;
        book.textContent = q.b;
        author.textContent = `— ${q.a}`;
        link.href = `books/${q.s}/index.html`;
        link.style.setProperty('--c', q.c);
        text.classList.remove('fading');
      };
      if (animate) { text.classList.add('fading'); setTimeout(apply, 300); } else apply();
    };
    next(false);
    $('#mq-next').addEventListener('click', () => next(true));
  }

  // ---------- list ----------
  const rowsEl = $('.rows');
  if (rowsEl) {
    const rows = $$('.row', rowsEl);
    const q = $('#list-q'), count = $('#list-count'), empty = $('.list .empty');
    let cat = '';
    const filter = () => {
      const needle = q.value.trim().toLowerCase();
      let n = 0;
      rows.forEach((r) => {
        const show = (!cat || r.dataset.cat === cat) && (!needle || r.dataset.search.includes(needle));
        r.hidden = !show;
        n += show;
      });
      count.textContent = n;
      empty.hidden = n > 0;
    };
    q.addEventListener('input', filter);
    const chips = $$('.chips button');
    chips.forEach((btn) => btn.addEventListener('click', () => {
      chips.forEach((b) => b.setAttribute('aria-pressed', String(b === btn)));
      cat = btn.dataset.cat;
      filter();
    }));

    const heads = $$('.thead button');
    let current = 'title', dir = 1;
    heads.forEach((h) => h.addEventListener('click', () => {
      const key = h.dataset.sort;
      dir = key === current ? -dir : 1;
      current = key;
      heads.forEach((x) => { x.classList.toggle('is-sorted', x === h); x.removeAttribute('aria-sort'); });
      // "count" and "date" sort descending first, so flip the reported direction for them
      const natural = key === 'count' || key === 'date' ? 'descending' : 'ascending';
      h.setAttribute('aria-sort', dir === 1 ? natural : natural === 'ascending' ? 'descending' : 'ascending');
      [...rows].sort((a, b) => sorters[key](a, b) * dir).forEach((r) => rowsEl.appendChild(r));
    }));
    document.addEventListener('keydown', (e) => {
      if (e.key === '/' && document.activeElement !== q) { e.preventDefault(); q.focus(); }
    });
  }

  // ---------- notes ----------
  const prose = $('.prose');
  if (prose) {
    // Active chapter in the TOC
    const links = $$('.toc a');
    const targets = links.map((a) => document.getElementById(decodeURIComponent(a.hash.slice(1)))).filter(Boolean);
    if (targets.length) {
      const setActive = () => {
        let cur = targets[0];
        for (const t of targets) if (t.getBoundingClientRect().top < 120) cur = t;
        links.forEach((a) => a.classList.toggle('active', a.hash === `#${cur.id}`));
        const active = links.find((a) => a.classList.contains('active'));
        const toc = $('.toc');
        if (active && toc.scrollHeight > toc.clientHeight && getComputedStyle(toc).position === 'sticky') {
          const r = active.getBoundingClientRect(), tr = toc.getBoundingClientRect();
          if (r.top < tr.top + 40 || r.bottom > tr.bottom - 40) toc.scrollTop += r.top - tr.top - tr.height / 3;
        }
      };
      let raf = 0;
      addEventListener('scroll', () => { cancelAnimationFrame(raf); raf = requestAnimationFrame(setActive); }, { passive: true });
      setActive();
    }
    if (matchMedia('(max-width: 900px)').matches) $('.toc details')?.removeAttribute('open');

    // Search within highlights
    const input = $('#notes-q');
    const items = $$('.hl', prose);
    const heads = $$('.nh', prose);
    const shown = $('#notes-shown');
    const empty = $('.prose .empty');
    const originals = new Map(items.map((el) => [el, el.innerHTML]));
    const escRe = (s) => s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    let t = 0;
    input?.addEventListener('input', () => {
      clearTimeout(t);
      t = setTimeout(() => {
        const needle = input.value.trim();
        const re = needle && new RegExp(escRe(needle), 'gi');
        let n = 0;
        items.forEach((el) => {
          el.innerHTML = originals.get(el);
          const hit = !needle || el.textContent.toLowerCase().includes(needle.toLowerCase());
          el.classList.toggle('hidden', !hit);
          if (hit) n++;
          if (hit && re) highlightText(el, re);
        });
        // Hide headings with nothing visible beneath them (until the next heading of same/higher rank)
        heads.forEach((h, i) => {
          if (!needle) { h.classList.remove('hidden'); return; }
          const rank = rankOf(h);
          let el = h.nextElementSibling, any = false;
          while (el && !(el.classList.contains('nh') && rankOf(el) <= rank)) {
            if (!el.classList.contains('nh') && (el.matches('.hl:not(.hidden)') || el.querySelector?.('.hl:not(.hidden)'))) { any = true; break; }
            el = el.nextElementSibling;
          }
          h.classList.toggle('hidden', !any);
        });
        shown.textContent = needle ? `${n.toLocaleString()} of ${items.length.toLocaleString()}` : items.length.toLocaleString();
        empty.hidden = n > 0;
      }, 120);
    });
    const rankOf = (h) => (h.classList.contains('nh-part') ? -1 : Number((h.className.match(/nh-(\d)/) || [0, 9])[1]));
    function highlightText(root, re) {
      const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT);
      const nodes = [];
      while (walker.nextNode()) nodes.push(walker.currentNode);
      nodes.forEach((node) => {
        const s = node.nodeValue;
        re.lastIndex = 0;
        if (!re.test(s)) return;
        const frag = document.createDocumentFragment();
        let lastIdx = 0;
        s.replace(re, (m, idx) => {
          frag.append(s.slice(lastIdx, idx));
          const mark = document.createElement('mark');
          mark.className = 'q';
          mark.textContent = m;
          frag.append(mark);
          lastIdx = idx + m.length;
        });
        frag.append(s.slice(lastIdx));
        node.replaceWith(frag);
      });
    }
  }
})();
