export default function decorate(block) {
  const rows = [...block.querySelectorAll(':scope > div')];
  const nav = document.createElement('nav');
  nav.setAttribute('aria-label', 'Breadcrumb');

  const ol = document.createElement('ol');
  ol.className = 'breadcrumb-list';

  const homeLi = document.createElement('li');
  homeLi.className = 'breadcrumb-item';
  const homeLink = document.createElement('a');
  homeLink.href = '/';
  homeLink.textContent = 'Home';
  homeLi.append(homeLink);
  ol.append(homeLi);

  rows.forEach((row, i) => {
    const [labelCell, hrefCell] = row.children;
    const li = document.createElement('li');
    li.className = 'breadcrumb-item';

    const isLast = i === rows.length - 1;
    if (isLast) {
      // Last crumb = current page, not a link
      li.setAttribute('aria-current', 'page');
      li.textContent = labelCell.textContent.trim();
    } else {
      const a = document.createElement('a');
      a.href = hrefCell ? hrefCell.textContent.trim() : '#';
      a.textContent = labelCell.textContent.trim();
      li.append(a);
    }
    ol.append(li);
  });

  nav.append(ol);
  block.textContent = '';
  block.append(nav);
}