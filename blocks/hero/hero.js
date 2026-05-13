export default function decorate(block) {
  const picture = block.querySelector('picture');
  const img = block.querySelector('img');

  // Eager load for LCP
  if (img) {
    img.loading = 'eager';
    img.fetchpriority = 'high';
  }

  // Move picture to block root as background
  if (picture) {
    picture.classList.add('hero-bg-image');
    block.insertBefore(picture, block.firstChild);
  }

  // Add classes for CSS targeting
  const textCell = block.querySelector(':scope > div > div:first-child');
  if (textCell) {
    textCell.classList.add('hero-text');
    const title = textCell.querySelector('h1, h2, h3, strong');
    if (title) title.classList.add('hero-title');
    const desc = textCell.querySelector('p');
    if (desc) desc.classList.add('hero-description');
  }
}
