export default function decorate(block) {
  const img = block.querySelector('img');
  if (img) {
    img.loading = 'eager';
    img.fetchpriority = 'high'; 
  }

  const rows = [...block.children];
  rows.forEach((row, index) => {
    row.classList.add('hero-content');
    row.classList.add(index === 0 ? 'hero-text' : 'hero-media');
  });

  if (rows.length === 1) {
    rows[0].classList.add('hero-full');
  }
}