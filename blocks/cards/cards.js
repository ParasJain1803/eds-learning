import { createOptimizedPicture } from '../../scripts/aem.js';

export default function decorate(block) {
  const ul = document.createElement('ul');
  [...block.children].forEach((row) => {
    const li = document.createElement('li');
    li.innerHTML = row.innerHTML;
    // Optimize card images — NOT eager (below fold)
    li.querySelectorAll('img').forEach((img) => {
      img.closest('picture').replaceWith(
        createOptimizedPicture(img.src, img.alt, false, [{ width: '750' }])
      );
    });
    ul.append(li);
  });
  block.textContent = '';
  block.append(ul);
}