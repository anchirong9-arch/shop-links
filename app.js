/* 짤 & 꿀템 — products.json 을 읽어 카드로 그린다.
   새 상품은 products.json 맨 위에 한 덩어리만 추가하면 된다. */
(function () {
  const listEl = document.getElementById('list');
  const chipsEl = document.getElementById('chips');
  const stateEl = document.getElementById('state');
  const input = document.getElementById('q');
  const clearBtn = document.getElementById('clear');

  let products = [];
  let activeCat = '전체';

  const won = (n) => Number(n).toLocaleString('ko-KR') + '원';
  const esc = (s) => String(s).replace(/[&<>"']/g, (c) => ({
    '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;'
  }[c]));

  const ARROW = '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M13.2 5.3 11.8 6.7l4.3 4.3H3v2h13.1l-4.3 4.3 1.4 1.4L20 12z"/></svg>';

  function card(p) {
    const off = p.listPrice && p.listPrice > p.price
      ? '<s>' + won(p.listPrice) + '</s><span class="off">' + Math.floor((1 - p.price / p.listPrice) * 100) + '%</span>'
      : '';
    const img = p.image
      ? '<img src="' + esc(p.image) + '" alt="' + esc(p.name) + '" loading="lazy" decoding="async" width="84" height="84">'
      : '<span class="ph" aria-hidden="true">🛍️</span>';
    return '' +
      '<a class="card" href="' + esc(p.url) + '" target="_blank" rel="sponsored nofollow noopener">' +
        '<div class="thumb">' + img + '</div>' +
        '<div class="body">' +
          (p.tag ? '<span class="tag">' + esc(p.tag) + '</span>' : '') +
          '<p class="name">' + esc(p.name) + '</p>' +
          '<div class="price"><b>' + won(p.price) + '</b>' + off + '</div>' +
        '</div>' +
        '<span class="cta">쿠팡에서 보기' + ARROW + '</span>' +
      '</a>';
  }

  function categories() {
    const seen = [];
    products.forEach((p) => {
      if (p.category && seen.indexOf(p.category) === -1) seen.push(p.category);
    });
    return ['전체'].concat(seen);
  }

  function renderChips() {
    chipsEl.innerHTML = categories().map((c) =>
      '<button class="chip" type="button" aria-pressed="' + (c === activeCat) + '" data-cat="' + esc(c) + '">' + esc(c) + '</button>'
    ).join('');
  }

  function matches(p, q) {
    if (activeCat !== '전체' && p.category !== activeCat) return false;
    if (!q) return true;
    const hay = [p.name, p.tag, p.category, p.keywords].filter(Boolean).join(' ').toLowerCase();
    return hay.indexOf(q) !== -1;
  }

  function render() {
    const q = input.value.trim().toLowerCase();
    const shown = products.filter((p) => matches(p, q));
    clearBtn.hidden = !q;

    listEl.innerHTML = shown.map(card).join('');
    listEl.hidden = shown.length === 0;

    if (!products.length) {
      stateEl.hidden = false;
      stateEl.textContent = '상품 목록을 불러오지 못했어요. 잠시 후 새로고침해 주세요.';
    } else if (!shown.length) {
      stateEl.hidden = false;
      stateEl.textContent = '“' + q + '”에 맞는 상품이 없어요. 다른 키워드로 찾아봐 주세요.';
    } else {
      stateEl.hidden = true;
    }
  }

  chipsEl.addEventListener('click', (e) => {
    const btn = e.target.closest('.chip');
    if (!btn) return;
    activeCat = btn.dataset.cat;
    chipsEl.querySelectorAll('.chip').forEach((b) => {
      b.setAttribute('aria-pressed', String(b.dataset.cat === activeCat));
    });
    render();
    btn.scrollIntoView({ block: 'nearest', inline: 'center', behavior: 'smooth' });
  });

  let t = null;
  input.addEventListener('input', () => {
    clearTimeout(t);
    t = setTimeout(render, 80);
  });

  clearBtn.addEventListener('click', () => {
    input.value = '';
    input.focus();
    render();
  });

  // 캐시에 걸린 예전 목록이 보이지 않도록 매번 새로 받는다.
  fetch('products.json?t=' + Date.now(), { cache: 'no-store' })
    .then((r) => { if (!r.ok) throw new Error('HTTP ' + r.status); return r.json(); })
    .then((data) => {
      products = Array.isArray(data) ? data : [];
      renderChips();
      render();
    })
    .catch(() => {
      products = [];
      renderChips();
      listEl.innerHTML = '';
      listEl.hidden = true;
      stateEl.hidden = false;
      stateEl.textContent = '상품 목록을 불러오지 못했어요. 잠시 후 새로고침해 주세요.';
    });
})();
