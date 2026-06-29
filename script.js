/* ═══════════════════════════════════════
   NAVIGATION
═══════════════════════════════════════ */
const navLinks  = document.querySelectorAll('.nav-link');
const allPages  = document.querySelectorAll('.page');
const navMenu   = document.getElementById('navMenu');
const navToggle = document.getElementById('navToggle');

function showPage(pageId) {
  allPages.forEach(p => p.classList.remove('active'));
  navLinks.forEach(l => l.classList.remove('active'));

  const target = document.getElementById('page-' + pageId);
  if (target) target.classList.add('active');

  const link = document.querySelector(`.nav-link[data-page="${pageId}"]`);
  if (link) link.classList.add('active');

  window.scrollTo({ top: 0, behavior: 'smooth' });
  navMenu.classList.remove('open');
  navToggle.classList.remove('open');

  // Trigger scroll animations for the new page
  setTimeout(checkAnimations, 100);
}

navLinks.forEach(link => {
  link.addEventListener('click', e => {
    e.preventDefault();
    showPage(link.dataset.page);
  });
});

navToggle.addEventListener('click', () => {
  navMenu.classList.toggle('open');
  navToggle.classList.toggle('open');
});

// Elevate navbar on scroll
window.addEventListener('scroll', () => {
  document.getElementById('navbar').style.boxShadow =
    window.scrollY > 40
      ? '0 4px 36px rgba(196,100,122,.2)'
      : '0 2px 24px rgba(196,100,122,.12)';
});

/* ═══════════════════════════════════════
   COUNTDOWN TIMER
═══════════════════════════════════════ */
const WEDDING_DATE = new Date('2026-11-28T18:00:00');

function pad(n) { return String(n).padStart(2, '0'); }

function updateCountdown() {
  const diff = WEDDING_DATE - Date.now();

  if (diff <= 0) {
    document.getElementById('countdown').innerHTML =
      '<p style="font-family:\'Dancing Script\',cursive;font-size:1.6rem;color:var(--pink-dark)">¡Hoy es el gran día! 🎉</p>';
    return;
  }

  const d = Math.floor(diff / 86400000);
  const h = Math.floor((diff % 86400000) / 3600000);
  const m = Math.floor((diff % 3600000)  / 60000);
  const s = Math.floor((diff % 60000)    / 1000);

  document.getElementById('cd-days').textContent    = pad(d);
  document.getElementById('cd-hours').textContent   = pad(h);
  document.getElementById('cd-minutes').textContent = pad(m);
  document.getElementById('cd-seconds').textContent = pad(s);
}

updateCountdown();
setInterval(updateCountdown, 1000);

/* ═══════════════════════════════════════
   HISTORIA – CHAPTERS
═══════════════════════════════════════ */
const CHAPTERS = [
  {
    num:   'Capítulo I',
    year:  '1999',
    emoji: '✨',
    img:   'img/historia/cap-1.jpg',
    title: 'El Comienzo',
    text:  'Nos conocimos por primera vez en el colegio. Desde muy pequeños, no imaginábamos que ese primer día de clases marcaría el inicio de una amistad que, con el tiempo, se haría cada vez más fuerte.'
  },
  {
    num:   'Capítulo II',
    year:  '2003-2016',
    emoji: '⭐',
    img:   'img/historia/cap-2.jpg',
    title: 'Los Mejores Amigos',
    text:  'Compartimos años de colegio, risas en los recreos, secretos, aventuras y esa complicidad que no se encuentra fácilmente. Crecimos juntos, siendo testigos de nuestras propias historias y acompañándonos en cada etapa. En ese entonces no lo sabíamos, pero todo ese tiempo estábamos preparando el terreno para algo mucho más grande.'
  },
  {
    num:   'Capítulo III',
    year:  '2017',
    emoji: '🩷',
    img:   'img/historia/cap-3.jpg',
    title: 'Algo más que amistad',
    text:  'Lo que durante tantos años fue una amistad extraordinaria se transformó en algo aún más especial. Con la misma naturalidad con la que fuimos amigos, comenzamos nuestra historia de amor. No fue una sorpresa para nosotros; fue simplemente el siguiente capítulo de una historia que, sin saberlo, llevábamos escribiendo desde siempre.'
  },
  {
    num:   'Capítulo IV',
    year:  '2021',
    emoji: '🏡',
    img:   'img/historia/cap-4.jpg',
    title: 'El Hogar que Construimos',
    text:  'Después de años juntos, dimos el paso que transformó nuestra relación en una vida compartida. Cambiarnos de casa y comenzar a vivir juntos fue toda una experiencia: aprender a organizar nuestros espacios, decorar según nuestros gustos y descubrir que incluso esas pequeñas discusiones eran parte de construir un hogar. Han sido cinco años compartiendo el mismo espacio, conociéndonos en profundidad y aprendiendo el uno del otro de una manera que pocos tienen el privilegio de experimentar.'
  },
  {
    num:   'Capítulo V',
    year:  '2022',
    emoji: '🐕',
    img:   'img/historia/cap-5.jpg',
    title: 'La Familia Crece',
    text:  'Todo buen hogar necesita cuatro patas y mucho pelo. Así llegó el tercer integrante de nuestra familia: una perrita que, desde el primer día, encontró su lugar en el sofá, en la cama y, sobre todo, en nuestros corazones. Asumimos el desafío y la responsabilidad de cuidar por siempre a nuestra querida Nala, porque, si algo dice mucho de una pareja, es la forma en que cuidan juntos a alguien que depende completamente de ellos.'
  },
  {
    num:   'Capítulo VI',
    year:  '2026',
    emoji: '💍',
    img:   'img/historia/cap-6.jpg',
    title: 'La Propuesta',
    text:  'Después de muchos años, nuestra historia llega a uno de sus momentos más esperados. Este 28 de noviembre de 2026, vamos a prometernos aquello que ya nos hemos demostrado a lo largo de la vida: que nos elegimos el uno al otro, hoy y siempre. Y aunque aquí parece terminar este cuento, en realidad es solo el comienzo de un nuevo capítulo, el más importante: nuestra vida juntos. Gracias por acompañarnos y ser parte de nuestra historia'
  }
];

let currentChapter = 0;

function renderChapter(index, direction) {
  const card = document.getElementById('chapterCard');
  const ch   = CHAPTERS[index];

  card.style.opacity = '0';
  card.style.transform = direction === 'next'
    ? 'translateX(30px)'
    : 'translateX(-30px)';

  setTimeout(() => {
    card.innerHTML = `
      <div class="ch-layout">
        <div class="ch-content">
          <div class="ch-meta">
            <span class="ch-num">${ch.num}</span>
            <span class="ch-year-tag">${ch.year}</span>
          </div>
          <h3 class="ch-title">${ch.title}</h3>
          <p class="ch-text">${ch.text}</p>
        </div>
        <div class="ch-photo-wrap">
          <img class="ch-photo" src="${ch.img}" alt="${ch.title}" loading="lazy"
            onerror="this.style.display='none';this.parentElement.classList.add('ch-photo-err')">
          <div class="ch-photo-badge">${ch.emoji}</div>
        </div>
      </div>
    `;
    card.style.transition = 'opacity 0.3s ease, transform 0.3s ease';
    card.style.opacity  = '1';
    card.style.transform = 'translateX(0)';
  }, 200);

  document.getElementById('chapterLabel').textContent =
    `${index + 1} / ${CHAPTERS.length}`;
  document.getElementById('prevChapter').disabled = index === 0;
  document.getElementById('nextChapter').disabled = index === CHAPTERS.length - 1;

  document.querySelectorAll('.ch-dot').forEach((dot, i) =>
    dot.classList.toggle('active', i === index)
  );
}

function buildDots() {
  const container = document.getElementById('chDots');
  container.innerHTML = CHAPTERS.map((_, i) =>
    `<div class="ch-dot${i === 0 ? ' active' : ''}" data-i="${i}" role="button" aria-label="Capítulo ${i + 1}"></div>`
  ).join('');

  container.querySelectorAll('.ch-dot').forEach(dot => {
    dot.addEventListener('click', () => {
      const i = parseInt(dot.dataset.i);
      const dir = i > currentChapter ? 'next' : 'prev';
      currentChapter = i;
      renderChapter(currentChapter, dir);
    });
  });
}

document.getElementById('prevChapter').addEventListener('click', () => {
  if (currentChapter > 0) {
    currentChapter--;
    renderChapter(currentChapter, 'prev');
  }
});

document.getElementById('nextChapter').addEventListener('click', () => {
  if (currentChapter < CHAPTERS.length - 1) {
    currentChapter++;
    renderChapter(currentChapter, 'next');
  }
});

buildDots();
renderChapter(0, 'next');

/* Keyboard navigation for chapters */
document.addEventListener('keydown', e => {
  const hist = document.getElementById('page-historia');
  if (!hist.classList.contains('active')) return;
  if (e.key === 'ArrowRight' && currentChapter < CHAPTERS.length - 1) {
    currentChapter++;
    renderChapter(currentChapter, 'next');
  } else if (e.key === 'ArrowLeft' && currentChapter > 0) {
    currentChapter--;
    renderChapter(currentChapter, 'prev');
  }
});

/* ═══════════════════════════════════════
   COPY TO CLIPBOARD
═══════════════════════════════════════ */
function showToast(msg) {
  const toast = document.getElementById('toast');
  toast.textContent = msg;
  toast.classList.add('show');
  setTimeout(() => toast.classList.remove('show'), 2800);
}

document.querySelectorAll('.copy-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    const text = btn.dataset.copy;
    if (!text) return;
    navigator.clipboard.writeText(text)
      .then(() => showToast('¡Copiado al portapapeles! ✓'))
      .catch(() => {
        /* Fallback for non-secure contexts */
        const el = document.createElement('textarea');
        el.value = text;
        el.style.position = 'fixed';
        el.style.opacity  = '0';
        document.body.appendChild(el);
        el.select();
        document.execCommand('copy');
        document.body.removeChild(el);
        showToast('¡Copiado! ✓');
      });
  });
});

/* ═══════════════════════════════════════
   SCROLL ANIMATIONS (IntersectionObserver)
═══════════════════════════════════════ */
const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });

function checkAnimations() {
  document.querySelectorAll('.animate-on-scroll:not(.visible)').forEach(el => {
    observer.observe(el);
  });
}

checkAnimations();

/* ═══════════════════════════════════════
   SWATCHES – show name tooltip on hover
═══════════════════════════════════════ */
document.querySelectorAll('.swatch').forEach(sw => {
  sw.setAttribute('title', sw.dataset.name || '');
});

/* ═══════════════════════════════════════
   NALA (HOME) – click to chat
═══════════════════════════════════════ */
const nalaHomeImg    = document.getElementById('nalaHomeImg');
const nalaHomeBubble = document.getElementById('nalaHomeBubble');
const nalaHomeHint   = document.getElementById('nalaHomeHint');

if (nalaHomeImg && nalaHomeBubble) {
  /* Once the entrance pop-in finishes, hand off to the idle pulse
     so it keeps hinting that it's clickable. */
  nalaHomeImg.addEventListener('animationend', e => {
    if (e.animationName === 'nalaPopIn') {
      nalaHomeImg.closest('.nala-pop-wrap')?.classList.add('nala-settled');
    }
  });

  const NALA_MESSAGES = [
    '¡Los espero con todo! 🐾',
    '¿Ya tienes tu outfit listo? 👗',
    '¡No olvides confirmar tu asistencia! 💌',
    '¡Si quieres me puedes regalar unos huesitos! 🦴',
    '¡Faltan pocos días! 🎉'
  ];
  let nalaMsgIndex = 0;

  nalaHomeImg.addEventListener('click', () => {
    nalaHomeHint?.classList.add('nala-hint--hidden');

    nalaMsgIndex = (nalaMsgIndex + 1) % NALA_MESSAGES.length;
    nalaHomeBubble.textContent = NALA_MESSAGES[nalaMsgIndex];

    nalaHomeImg.classList.add('nala-wiggle');
    nalaHomeBubble.classList.add('nala-bubble-pop');

    /* Restart the animations via inline style (highest specificity),
       so re-clicking never falls back to the entrance keyframes. */
    nalaHomeImg.style.animation = 'none';
    nalaHomeBubble.style.animation = 'none';
    requestAnimationFrame(() => {
      nalaHomeImg.style.animation = '';
      nalaHomeBubble.style.animation = '';
    });
  });
}
