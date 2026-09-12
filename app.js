const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });

document.querySelectorAll('.reveal').forEach(el => observer.observe(el));

if (!reduced) {
  const evidence = [...document.querySelectorAll('[data-scramble]')];
  window.setInterval(() => {
    const target = evidence[Math.floor(Math.random() * evidence.length)];
    if (!target) return;
    target.classList.add('scramble');
    window.setTimeout(() => target.classList.remove('scramble'), 520);
  }, 4200);

  const title = document.querySelector('.glitch');
  window.addEventListener('pointermove', event => {
    const x = (event.clientX / window.innerWidth - .5) * 3;
    const y = (event.clientY / window.innerHeight - .5) * 2;
    title.style.textShadow = `${3 + x}px ${y}px #7a3436, ${-3 - x}px ${-y}px #1f5b5d`;
  }, { passive: true });
}
