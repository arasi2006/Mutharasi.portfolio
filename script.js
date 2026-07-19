/* ---------- LOADER ---------- */
window.addEventListener('load', () => {
  setTimeout(() => document.getElementById('loader').classList.add('done'), 700);
});

/* ---------- HEADER SCROLL STATE ---------- */
const header = document.getElementById('siteHeader');
const backToTop = document.getElementById('backToTop');
window.addEventListener('scroll', () => {
  const y = window.scrollY;
  header.classList.toggle('scrolled', y > 40);
  backToTop.classList.toggle('show', y > 600);
});
backToTop.addEventListener('click', () => window.scrollTo({top:0, behavior:'smooth'}));

/* ---------- MOBILE NAV ---------- */
const burger = document.getElementById('burger');
const navLinks = document.getElementById('navLinks');
burger.addEventListener('click', () => navLinks.classList.toggle('open'));
navLinks.querySelectorAll('a').forEach(a => a.addEventListener('click', () => navLinks.classList.remove('open')));

/* ---------- THEME TOGGLE ---------- */
const themeToggle = document.getElementById('themeToggle');
const themeIcon = document.getElementById('themeIcon');
function setTheme(t){
  document.documentElement.setAttribute('data-theme', t);
  themeIcon.innerHTML = t === 'light'
    ? '<path stroke-linecap="round" stroke-linejoin="round" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"/>'
    : '<path stroke-linecap="round" stroke-linejoin="round" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.36 6.36l-.7-.7M6.34 6.34l-.7-.7m12.02 0l-.7.7M6.34 17.66l-.7.7M12 8a4 4 0 100 8 4 4 0 000-8z"/>';
}
setTheme('dark');
themeToggle.addEventListener('click', () => {
  const cur = document.documentElement.getAttribute('data-theme');
  setTheme(cur === 'light' ? 'dark' : 'light');
});

/* ---------- CUSTOM CURSOR ---------- */
const dot = document.getElementById('cursorDot');
const ring = document.getElementById('cursorRing');
const coord = document.getElementById('cursorCoord');
let mx=0, my=0, rx=0, ry=0;
window.addEventListener('mousemove', e => {
  mx = e.clientX; my = e.clientY;
  dot.style.left = mx+'px'; dot.style.top = my+'px';
  coord.style.left = mx+'px'; coord.style.top = my+'px';
  coord.textContent = 'x:'+mx+' y:'+my;
});
(function loopCursor(){
  rx += (mx-rx)*0.16; ry += (my-ry)*0.16;
  ring.style.left = rx+'px'; ring.style.top = ry+'px';
  requestAnimationFrame(loopCursor);
})();
document.querySelectorAll('a, button, .btn, .project-card, .chip, .tool-card, .glass').forEach(el => {
  el.addEventListener('mouseenter', () => ring.classList.add('active'));
  el.addEventListener('mouseleave', () => ring.classList.remove('active'));
});

/* ---------- TYPING EFFECT ---------- */
const roles = ["UI/UX Designer", "Frontend Developer", "CSE Student"];
const roleEl = document.getElementById('typedRole');
let ri=0, ci=0, deleting=false;
function typeLoop(){
  const word = roles[ri];
  if(!deleting){
    ci++; roleEl.textContent = word.slice(0,ci);
    if(ci === word.length){ deleting = true; setTimeout(typeLoop, 1400); return; }
  } else {
    ci--; roleEl.textContent = word.slice(0,ci);
    if(ci === 0){ deleting = false; ri = (ri+1)%roles.length; }
  }
  setTimeout(typeLoop, deleting ? 45 : 85);
}
typeLoop();

/* ---------- SCROLL REVEAL ---------- */
const revealEls = document.querySelectorAll('.reveal');
const io = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if(entry.isIntersecting){
      entry.target.classList.add('in');
      // animate skill bars within
      entry.target.querySelectorAll('.bar-fill').forEach(bar => {
        bar.style.width = bar.dataset.fill + '%';
      });
      // animate stat counters
      entry.target.querySelectorAll('[data-count]').forEach(el => animateCount(el));
      io.unobserve(entry.target);
    }
  });
}, { threshold: 0.18 });
revealEls.forEach(el => io.observe(el));

function animateCount(el){
  const target = parseInt(el.dataset.count, 10);
  let cur = 0;
  const step = Math.max(1, Math.round(target/30));
  const t = setInterval(() => {
    cur += step;
    if(cur >= target){ cur = target; clearInterval(t); }
    el.textContent = cur;
  }, 40);
}

/* ---------- CONTACT FORM (static demo) ---------- */
const form = document.getElementById('contactForm');
const note = document.getElementById('formNote');
form.addEventListener('submit', (e) => {
  e.preventDefault();
  note.textContent = 'Thanks! This is a static demo, so nothing was sent — connect a backend to enable real delivery.';
  note.style.color = 'var(--green)';
  form.reset();
});

/* ---------- RESUME BUTTON ---------- */
document.getElementById('resumeBtn').addEventListener('click', (e) => {
  e.preventDefault();
  alert('Add your resume file and link this button to it (e.g. resume.pdf) to enable downloads.');
});

/* ---------- PARTICLE BACKGROUND ---------- */
const canvas = document.getElementById('particles');
const ctx = canvas.getContext('2d');
let particles = [];
function resizeCanvas(){
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}
resizeCanvas();
window.addEventListener('resize', resizeCanvas);
const COUNT = window.innerWidth < 700 ? 32 : 60;
function initParticles(){
  particles = Array.from({length: COUNT}, () => ({
    x: Math.random()*canvas.width,
    y: Math.random()*canvas.height,
    r: Math.random()*1.6 + 0.6,
    vx: (Math.random()-0.5)*0.25,
    vy: (Math.random()-0.5)*0.25,
    c: Math.random() > 0.5 ? '240,168,2' : '78,175,1'
  }));
}
initParticles();
function drawParticles(){
  ctx.clearRect(0,0,canvas.width, canvas.height);
  particles.forEach(p => {
    p.x += p.vx; p.y += p.vy;
    if(p.x < 0) p.x = canvas.width; if(p.x > canvas.width) p.x = 0;
    if(p.y < 0) p.y = canvas.height; if(p.y > canvas.height) p.y = 0;
    ctx.beginPath();
    ctx.arc(p.x, p.y, p.r, 0, Math.PI*2);
    ctx.fillStyle = `rgba(${p.c},0.5)`;
    ctx.fill();
  });
  requestAnimationFrame(drawParticles);
}
drawParticles();
