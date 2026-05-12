export default function decorate(block) {
  const img = block.querySelector('img');
  if (img) {
    img.loading = 'eager';
    img.fetchpriority = 'high'; 
  }

  const rows = [...block.children];
  rows.forEach((row) => {
    row.classList.add('hero-content');
  });
}