/**
 * Functions to create and modify the sidebar.
 * createSidebar()   : Finds every header on the current page and places them in the sidebar
 * setSidebarWidth() : Updates the CSS with the sidebar's width according to the page width
 */

export function createSidebar() {
  const headings = document.querySelectorAll('h1, h2, h3, h4, h5, h6');
  const sidebar = document.createElement('div');
  const sidebarContent = document.createElement('div');
  const sidebarList = document.createElement('ul');

  sidebar.classList.add('sidebar');
  sidebarContent.classList.add('sidebar-content');
  sidebar.appendChild(sidebarContent);
  sidebarContent.appendChild(sidebarList);

  let lastLevel = 0;
  let lastList = sidebarList;

  for (let i = 0; i < headings.length; i++) {
    const heading = headings[i];
    const level = parseInt(heading.tagName[1]);

    if (level > lastLevel) {
      const newList = document.createElement('ul');
      lastList.appendChild(newList);
      lastList = newList;
    } else if (level < lastLevel) {
      for (let j = level; j < lastLevel; j++) {
        lastList = lastList.parentElement.parentElement;
      }
    }

    const listItem = document.createElement('li');
    const link = document.createElement('a');
    let fontSize = '';

    switch (level) {
      case 1:
        link.style.fontWeight = 'bold';
        link.style.textDecoration = 'underline';
        fontSize = '1.6em';
        break;
      case 2:
        link.style.fontWeight = 'bold';
        fontSize = '1.4em';
        break;
      case 3:
        fontSize = '1.2em';
        break;
      case 4:
        link.style.marginLeft = '10px';
        fontSize = '1em';
        break;
      case 5:
        link.style.marginLeft = '20px';
        fontSize = '0.9em';
        break;
      case 6:
        link.style.marginLeft = '30px';
        fontSize = '0.8em';
        break;
    }

    link.textContent = heading.textContent;
    link.href = '#' + heading.id;
    link.style.fontSize = fontSize;
    listItem.appendChild(link);
    lastList.appendChild(listItem);

    lastLevel = level;
  }

  const col3Div = document.querySelector('.col-3');
  col3Div.appendChild(sidebar);
}

export function setSidebarWidth() {
  const sidebar = document.querySelector('.sidebar');
  const sidebarContent = sidebar.querySelector('.sidebar-content');
  const col3 = document.querySelector('.col-3');
  const col9 = document.querySelector('.col-9');

  const maxWidth = window.innerWidth * 0.20;
  const contentWidth = sidebarContent.scrollWidth;
  const sidebarWidth = Math.min(maxWidth, contentWidth, 200);

  sidebar.style.width = `${sidebarWidth}px`;
  sidebarContent.style.width = `${sidebarWidth}px`;
  col3.style.width = `calc(4% + ${sidebarWidth}px)`;
  col9.style.width = `calc(96% - ${sidebarWidth}px)`;
}
