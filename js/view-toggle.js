document.querySelectorAll('.ViewToggle').forEach(toggle => {
  const btns = toggle.querySelectorAll('.ViewToggle-btn');

  btns.forEach(btn => {
    btn.addEventListener('click', () => {
      btns.forEach(b => b.classList.remove('is-active'));
      btn.classList.add('is-active');
      toggle.dispatchEvent(new CustomEvent('viewchange', {
        bubbles: true,
        detail: { view: btn.dataset.view }
      }));
    });
  });
});
