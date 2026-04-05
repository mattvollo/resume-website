(() => {
  const year = new Date().getFullYear();
  const footer = document.querySelector('.footer');
  if (footer && !footer.dataset.injected) {
    const span = document.createElement('span');
    span.textContent = String(year);
    footer.appendChild(span);
    footer.dataset.injected = 'true';
  }
})();
