export default function decorate(block) {
  const rows = [...block.querySelectorAll(':scope > div')];

  const grid = document.createElement('div');
  grid.classList.add('category-grid__grid');

  rows.forEach((row) => {
    const cols = [...row.querySelectorAll(':scope > div')];

    cols.forEach((col) => {
      const card = document.createElement('a');
      card.classList.add('category-grid__card');

      const picture = col.querySelector('picture, img');
      const link = col.querySelector('a');
      if (link) card.href = link.href;

      // Find label: any text-bearing element that has no picture/img inside
      // Also check <strong> inside <p> (EDS sometimes bolds the label)
      // Replace the label-finding logic with this:
let labelText = '';
const allEls = [...col.querySelectorAll('p, h1, h2, h3, h4, h5, h6')];
for (const el of allEls) {
  // Extract only text nodes (ignoring picture/img children)
  const text = [...el.childNodes]
    .filter((n) => n.nodeType === Node.TEXT_NODE)
    .map((n) => n.textContent.trim())
    .filter(Boolean)
    .join('');
  if (text) {
    labelText = text;
    break;
  }
}

      // Fallback: check direct text nodes in the col
      if (!labelText) {
        labelText = [...col.childNodes]
          .filter((n) => n.nodeType === Node.TEXT_NODE && n.textContent.trim())
          .map((n) => n.textContent.trim())
          .join('');
      }

      console.log('labelText:', labelText, '| col HTML:', col.innerHTML); // debug — remove after fix

      const label = document.createElement('span');
      label.classList.add('category-grid__label');
      label.textContent = labelText;

      const imgWrap = document.createElement('div');
      imgWrap.classList.add('category-grid__img-wrap');
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