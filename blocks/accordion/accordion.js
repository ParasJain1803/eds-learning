export default function decorate(block) {
  [...block.querySelectorAll(':scope > div')].forEach((row) => {
    const [question, answer] = row.children;

    // Build the toggle button
    const btn = document.createElement('button');
    btn.className = 'accordion-trigger';
    btn.setAttribute('aria-expanded', 'false');
    btn.innerHTML = question.innerHTML;

    const panel = document.createElement('div');
    panel.className = 'accordion-panel';
    panel.setAttribute('hidden', '');
    panel.innerHTML = answer.innerHTML;

    btn.addEventListener('click', () => {
      const open = btn.getAttribute('aria-expanded') === 'true';
      btn.setAttribute('aria-expanded', String(!open));
      panel.toggleAttribute('hidden', open);
    });

    row.textContent = '';
    row.append(btn, panel);
  });
}