/**
 * Adds functionality to the website
 * - Creates header and sidebar
 * - Toggles dark mode with the dark mode button
 * - Resizes the sidebar when the page size changes
 */

import { createSidebar, setSidebarWidth } from './sidebar.js';

document.addEventListener('DOMContentLoaded', () => {
  fetch('partials/header.html')
    .then(response => response.text())
    .then(html => {
      const header = document.createElement('header');
      header.innerHTML = html;
      document.body.insertBefore(header, document.body.firstChild);

      const toggleButton = header.querySelector('#toggle-button');
      const body = document.querySelector('body');

      toggleButton.addEventListener('click', () => {
        body.classList.toggle('dark-mode');
      });

      createSidebar();

      window.addEventListener('resize', setSidebarWidth);
      setSidebarWidth();
    });
});
