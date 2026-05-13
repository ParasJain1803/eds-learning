import { createOptimizedPicture } from '../../scripts/aem.js';

export default function decorate(block) {
  const ul = document.createElement('ul');
  [...block.children].forEach((row) => {
    const li = document.createElement('li');
    li.append(...row.cloneNode(true).childNodes);
    li.querySelectorAll('img').forEach((img) => {
      img.closest('picture').replaceWith(
        createOptimizedPicture(img.src, img.alt, false, [{ width: '750' }])
      );
    });
    ul.append(li);
  });
  block.replaceChildren(ul);
}