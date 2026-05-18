export default function decorate(block) {
  // Get all rows from the authored table
  const rows = [...block.querySelectorAll(':scope > div')];

  // Build new grid wrapper
  const grid = document.createElement('div');
  grid.classList.add('dell__grid');

  rows.forEach((row) => {
    const cols = [...row.querySelectorAll(':scope > div')];

    cols.forEach((col) => {
      const card = document.createElement('a');
      card.classList.add('dell__card');

      // First <p> that contains only text → category title
      // First <picture>/<img> → the category image
      const picture = col.querySelector('picture, img');
      const titleEl = [...col.querySelectorAll('p, h1, h2, h3, h4, h5, h6')]
        .find((el) => el.textContent.trim() && !el.querySelector('picture, img'));

      // Pull out any link wrapping the image or an explicit <a>
      const link = col.querySelector('a');
      if (link) card.href = link.href;

      // Title
      const label = document.createElement('span');
      label.classList.add('dell__label');
      label.textContent = titleEl ? titleEl.textContent.trim() : '';

      // Image wrapper
      const imgWrap = document.createElement('div');
      imgWrap.classList.add('dell__img-wrap');
      if (picture) {
        imgWrap.append(picture.cloneNode(true));
      }

      card.append(label, imgWrap);
      grid.append(card);
    });
  });

  block.textContent = '';
  block.append(grid);
}