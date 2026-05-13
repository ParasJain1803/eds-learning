export default function decorate(block) {
  const rows = [...block.querySelectorAll(':scope > div')];

  // Build the nav element
  const nav = document.createElement('nav');
  nav.setAttribute('aria-label', 'Breadcrumb');

  const ol = document.createElement('ol');
  ol.className = 'breadcrumb-list';

  // Always add Home as the first crumb (links to homepage)
  const homeLi = document.createElement('li');
  homeLi.className = 'breadcrumb-item';
  const homeLink = document.createElement('a');
  homeLink.href = '/';
  homeLink.textContent = 'Home';
  homeLi.append(homeLink);
  ol.append(homeLi);

  // Add each authored row — last row = current page (no link)
  rows.forEach((row, i) => {
    const cells = row.querySelectorAll(':scope > div');
    const labelCell = cells[0];
    const hrefCell = cells[1];

    if (!labelCell || !labelCell.textContent.trim()) return;

    const label = labelCell.textContent.trim();
    const href = hrefCell ? hrefCell.textContent.trim() : '';
    const isLast = i === rows.length - 1;

    const li = document.createElement('li');
    li.className = 'breadcrumb-item';

    if (isLast || !href) {
      // Current page — not a link
      li.setAttribute('aria-current', 'page');
      li.textContent = label;
    } else {
      // Intermediate crumb — make it a link
      const a = document.createElement('a');
      a.href = href;
      a.textContent = label;
      li.append(a);
    }

    ol.append(li);
  });

  nav.append(ol);
  block.textContent = '';
  block.append(nav);
}
