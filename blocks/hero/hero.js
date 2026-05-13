export default function decorate(block) {
  
  console.log('HERO BLOCK HTML:', block.innerHTML);

  const rows = block.querySelectorAll(':scope > div');
  console.log('Number of rows:', rows.length);

  rows.forEach((row, i) => {
    console.log(`Row ${i} cells:`, row.children.length, row.innerHTML);
  });

  const firstRow = block.querySelector(':scope > div');
  if (!firstRow) return;

  const cells = firstRow.querySelectorAll(':scope > div');
  console.log('Cells found:', cells.length);

  let textCell = null;
  let imageCell = null;

  cells.forEach((cell) => {
    if (cell.querySelector('picture, img')) {
      imageCell = cell;
    } else {
      textCell = cell;
    }
  });

  console.log('textCell:', textCell);
  console.log('imageCell:', imageCell);

  const picture = imageCell ? imageCell.querySelector('picture') : null;
  const img = block.querySelector('img');

  if (img) {
    img.loading = 'eager';
    img.fetchpriority = 'high';
    console.log('Image set to eager');
  }

  if (picture) {
    picture.classList.add('hero-bg-image');
    block.insertBefore(picture, block.firstChild);
    console.log('Picture moved to block root');
  }

  if (imageCell) {
    imageCell.remove();
  }

  if (textCell) {
    textCell.classList.add('hero-text');

    const title = textCell.querySelector('h1, h2, h3, strong');
    if (title) {
      title.classList.add('hero-title');
      console.log('Title found:', title.textContent);
    }

    const paras = textCell.querySelectorAll('p');
    paras.forEach((p) => p.classList.add('hero-description'));
  }

  if (firstRow) {
    firstRow.classList.add('hero-inner');
  }
}