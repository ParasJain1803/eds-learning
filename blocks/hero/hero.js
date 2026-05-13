export default function decorate(block) {
  const textCell = block.querySelector(':scope > div > div:first-child');
  const imageCell = block.querySelector(':scope > div > div:last-child');
  const picture = imageCell ? imageCell.querySelector('picture') : null;
  const img = picture ? picture.querySelector('img') : null;

  img.loading = 'eager';
  img.fetchpriority = 'high';

  if (picture) {
    picture.classList.add('hero-bg-image');
    block.prepend(picture);
  }

  // Remove the now-empty image cell
  if (imageCell) {
    imageCell.remove();
  }

  if (textCell) {
    textCell.classList.add('hero-text');

    const heading = textCell.querySelector('h1, h2, h3');
    if (heading) heading.classList.add('hero-title');

    const para = textCell.querySelector('p');
    if (para) para.classList.add('hero-description');
  }
}
