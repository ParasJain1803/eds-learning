export default function decorate(block) {
  // Find the picture/image inside the block
  const picture = block.querySelector('picture');

  if (picture) {
    // Move picture out of its cell — place it directly in block as bg layer
    block.prepend(picture);

    // Eager load the hero image for LCP
    const img = picture.querySelector('img');
    if (img) {
      img.loading = 'eager';
      img.fetchpriority = 'high';
    }

    // Remove the now-empty image cell
    const emptyCell = [...block.querySelectorAll(':scope > div > div')].find(
      (div) => div.childElementCount === 0 || (!div.textContent.trim() && !div.querySelector('picture'))
    );
    if (emptyCell) emptyCell.remove();

    // Remove empty row if it has no children left
    [...block.querySelectorAll(':scope > div')].forEach((row) => {
      if (!row.hasChildNodes() || row.innerHTML.trim() === '') row.remove();
    });
  }
}