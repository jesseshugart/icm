/* ============================================================
   FieldCard — Custom Select Logic + GSAP Animations
   Depends on: GSAP (CDN or local)
   ============================================================ */
 document.addEventListener("DOMContentLoaded", (event) => {
  gsap.registerPlugin(ScrollTrigger,SplitText)
  // gsap code here!

      // Initialize Lenis
      const lenis = new Lenis();
 
      gsap.ticker.add((time) => {
          lenis.raf(time * 1000);
      })
     
      gsap.ticker.lagSmoothing(0);
   });


class FieldCard {
  constructor(el) {
    this.card    = el;
    this.trigger = el.querySelector('.FieldCard-trigger');
    this.panel   = el.querySelector('.FieldCard-panel');
    this.valueEl = el.querySelector('.FieldCard-value');
    this.chevron = el.querySelector('.FieldCard-chevron');
    this.options = el.querySelectorAll('.FieldCard-option');
    this.isOpen  = false;

    this._injectChecks();
    this._bindEvents();
  }

  _bindEvents() {
    this.trigger.addEventListener('mousedown', e => this._ripple(e));
    this.trigger.addEventListener('click', () => this.toggle());

    this.options.forEach(opt => {
      opt.addEventListener('click', () => this._select(opt));
    });

    document.addEventListener('click', e => {
      if (!this.card.contains(e.target)) this.close();
    });

    document.addEventListener('keydown', e => {
      if (e.key === 'Escape') this.close();
      if (e.key === 'Tab' && this.isOpen) this.close();
    });
  }

  toggle() {
    this.isOpen ? this.close() : this.open();
  }

  open() {
    this.isOpen = true;
    this.card.classList.add('is-open');
    this.trigger.setAttribute('aria-expanded', 'true');

    // Measure before animating so GSAP starts from the correct position
    this.panel.style.display = 'block';
    this.panel.style.visibility = 'hidden';

    const triggerRect = this.trigger.getBoundingClientRect();
    const panelHeight = this.panel.offsetHeight;
    const spaceBelow  = window.innerHeight - triggerRect.bottom;
    const flipUp      = spaceBelow < panelHeight + 8;

    this.panel.style.visibility = '';
    this.panel.classList.toggle('FieldCard-panel--above', flipUp);

    gsap.fromTo(this.panel,
      { opacity: 0, scaleY: 1, y: flipUp ? 10 : -10 },
      { opacity: 1, scaleY: 1, y: flipUp ? -4 : 4, duration: 0.6, ease: 'expo.out' }
    );

    this._toggleChevron(true);
  }

  close() {
    if (!this.isOpen) return;
    this.isOpen = false;
    this.card.classList.remove('is-open');
    this.trigger.setAttribute('aria-expanded', 'false');

    gsap.to(this.panel, {
      opacity: 0,
      scaleY: 0.92,
      y: -4,
      duration: 0.16,
      ease: 'hop',
      onComplete: () => {
        this.panel.style.display = 'none';
        this.panel.classList.remove('FieldCard-panel--above');
      }
    });

    this._toggleChevron(false);
  }

  _toggleChevron(isOpen) {
    this.chevron.classList.toggle('chevron--up',   isOpen);
    this.chevron.classList.toggle('chevron--down', !isOpen);
  }

  _injectChecks() {
    const svg = `<svg width="13" height="13" viewBox="0 0 13 13" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M2 6.5L5 9.5L11 3.5" stroke="#3d7ef5" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"/>
    </svg>`;
    this.options.forEach(opt => {
      const check = document.createElement('span');
      check.className = 'FieldCard-check';
      check.innerHTML = svg;
      opt.appendChild(check);
    });
  }

  _ripple(e) {
    const btn = this.trigger;
    const rect = btn.getBoundingClientRect();
    const size = Math.max(btn.offsetWidth, btn.offsetHeight) * 2;
    const x = e.clientX - rect.left - size / 2;
    const y = e.clientY - rect.top  - size / 2;

    const ripple = document.createElement('span');
    ripple.className = 'FieldCard-ripple';
    ripple.style.cssText = `width:${size}px;height:${size}px;left:${x}px;top:${y}px`;
    btn.appendChild(ripple);

    gsap.fromTo(ripple,
      { scale: 0, opacity: 1 },
      { scale: 1, opacity: 0, duration: 1, ease: 'expo.out',
        onComplete: () => ripple.remove() }
    );
  }

  _select(option) {
    // fade out any existing checkmark
    this.options.forEach(o => {
      gsap.to(o.querySelector('.FieldCard-check'), { opacity: 0, scale: 0.7, duration: 0.1 });
      o.classList.remove('is-selected');
      o.setAttribute('aria-selected', 'false');
    });

    option.classList.add('is-selected');
    option.setAttribute('aria-selected', 'true');

    // fade + pop the new checkmark in
    gsap.fromTo(option.querySelector('.FieldCard-check'),
      { opacity: 0, scale: 0.5 },
      { opacity: 1, scale: 1, duration: 0.26, ease: 'back.out(2)' }
    );

    // delay close so checkmark is visible before panel dismisses
    gsap.delayedCall(0.42, () => {
      this.valueEl.textContent = option.childNodes[0].textContent.trim();
      gsap.fromTo(this.valueEl,
        { opacity: 0.4 },
        { opacity: 1, duration: 0.2, ease: 'power2.out' }
      );
      this.close();
    });
  }
}

// Auto-init all .FieldCard elements on the page
document.querySelectorAll('.FieldCard').forEach(el => new FieldCard(el));
