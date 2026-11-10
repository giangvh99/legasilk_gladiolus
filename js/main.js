/**
 * Legasilk - Interactive Web Experience
 * Team Gladiolus | Star Award 2026
 */

document.addEventListener('DOMContentLoaded', () => {
  // ----------------------------------------------------
  // 1. I18N (LANGUAGE SWITCHER)
  // ----------------------------------------------------
  let currentLang = localStorage.getItem('legasilk_lang') || 'vi';

  function applyLanguage(lang) {
    currentLang = lang;
    localStorage.setItem('legasilk_lang', lang);
    const dict = translations[lang] || translations.vi;

    // Translate text contents
    document.querySelectorAll('[data-i18n]').forEach((el) => {
      const key = el.getAttribute('data-i18n');
      if (dict[key]) {
        el.innerHTML = dict[key];
      }
    });

    // Translate attributes (e.g. placeholder, title)
    document.querySelectorAll('[data-i18n-attr]').forEach((el) => {
      const attrConfig = el.getAttribute('data-i18n-attr');
      const pairs = attrConfig.split(';');
      pairs.forEach((pair) => {
        const [attr, key] = pair.split(':');
        if (attr && key && dict[key.trim()]) {
          el.setAttribute(attr.trim(), dict[key.trim()]);
        }
      });
    });

    // Update price calculation display with current lang formatting
    updatePriceCalculation();
  }

  const langBtn = document.getElementById('langToggleBtn');
  if (langBtn) {
    langBtn.addEventListener('click', () => {
      const nextLang = currentLang === 'vi' ? 'en' : 'vi';
      applyLanguage(nextLang);
    });
  }

  // ----------------------------------------------------
  // 2. LIVE BULK PRICING CALCULATOR
  // ----------------------------------------------------
  const kitQtyInput = document.getElementById('kitQuantityInput');
  const discountDisplay = document.getElementById('discountDisplay');
  const totalPriceDisplay = document.getElementById('totalPriceDisplay');
  const unitPrice = 99000; // VND

  function updatePriceCalculation() {
    if (!kitQtyInput || !totalPriceDisplay || !discountDisplay) return;
    let qty = parseInt(kitQtyInput.value, 10);
    if (isNaN(qty) || qty < 1) qty = 1;

    let discountPct = 0;
    if (qty >= 50) {
      discountPct = 30;
    } else if (qty >= 30) {
      discountPct = 20;
    } else if (qty >= 20) {
      discountPct = 15;
    }

    const rawTotal = qty * unitPrice;
    const finalTotal = rawTotal * (1 - discountPct / 100);

    const formattedTotal = new Intl.NumberFormat('vi-VN').format(finalTotal);

    if (discountPct > 0) {
      discountDisplay.textContent = `-${discountPct}% (Ưu đãi đơn trường học)`;
      discountDisplay.style.color = '#00D2B4';
      discountDisplay.style.fontWeight = 'bold';
    } else {
      discountDisplay.textContent = currentLang === 'vi' ? '0% (Giá bán lẻ)' : '0% (Standard Retail)';
      discountDisplay.style.color = '#888';
      discountDisplay.style.fontWeight = 'normal';
    }

    totalPriceDisplay.textContent = `${formattedTotal} VNĐ`;
  }

  if (kitQtyInput) {
    kitQtyInput.addEventListener('input', updatePriceCalculation);
  }

  // ----------------------------------------------------
  // 3. CONTACT & PRE-ORDER FORM SIMULATION
  // ----------------------------------------------------
  const orderForm = document.getElementById('legasilkOrderForm');
  const celebrationModal = document.getElementById('celebrationModal');
  const closeCelebrationBtn = document.getElementById('closeCelebrationBtn');

  if (orderForm) {
    orderForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const submitBtn = orderForm.querySelector('button[type="submit"]');
      const originalText = submitBtn.innerHTML;

      submitBtn.disabled = true;
      submitBtn.innerHTML = currentLang === 'vi' ? 'Đang gửi thông tin... ⏳' : 'Submitting... ⏳';

      setTimeout(() => {
        submitBtn.disabled = false;
        submitBtn.innerHTML = originalText;
        orderForm.reset();
        updatePriceCalculation();

        // Show cute celebratory popup
        if (celebrationModal) {
          celebrationModal.classList.add('active');
        }
      }, 900);
    });
  }

  if (closeCelebrationBtn && celebrationModal) {
    closeCelebrationBtn.addEventListener('click', () => {
      celebrationModal.classList.remove('active');
    });
  }

  // ----------------------------------------------------
  // 4. QUICK GUIDE PRINTABLE MODAL
  // ----------------------------------------------------
  const openGuideBtn = document.getElementById('openQuickGuideBtn');
  const guideModal = document.getElementById('quickGuideModal');
  const closeGuideBtn = document.getElementById('closeQuickGuideBtn');
  const printGuideBtn = document.getElementById('printGuideBtn');

  if (openGuideBtn && guideModal) {
    openGuideBtn.addEventListener('click', () => {
      guideModal.classList.add('active');
    });
  }

  if (closeGuideBtn && guideModal) {
    closeGuideBtn.addEventListener('click', () => {
      guideModal.classList.remove('active');
    });
  }

  if (printGuideBtn) {
    printGuideBtn.addEventListener('click', () => {
      window.print();
    });
  }

  // ----------------------------------------------------
  // 5. FAQ ACCORDION
  // ----------------------------------------------------
  document.querySelectorAll('.faq-item').forEach((item) => {
    const question = item.querySelector('.faq-question');
    if (question) {
      question.addEventListener('click', () => {
        const isOpen = item.classList.contains('open');
        // Close others
        document.querySelectorAll('.faq-item').forEach((i) => i.classList.remove('open'));
        if (!isOpen) {
          item.classList.add('open');
        }
      });
    }
  });

  // ----------------------------------------------------
  // 6. MOBILE MENU TOGGLE
  // ----------------------------------------------------
  const mobileToggle = document.getElementById('mobileMenuToggle');
  const navMenu = document.getElementById('mainNavMenu');

  if (mobileToggle && navMenu) {
    mobileToggle.addEventListener('click', () => {
      navMenu.classList.toggle('open');
      mobileToggle.textContent = navMenu.classList.contains('open') ? '✕' : '☰';
    });

    // Close when clicking nav link
    navMenu.querySelectorAll('a').forEach((link) => {
      link.addEventListener('click', () => {
        navMenu.classList.remove('open');
        mobileToggle.textContent = '☰';
      });
    });
  }

  // ----------------------------------------------------
  // 7. ACTIVE SCROLLSPY
  // ----------------------------------------------------
  const sections = document.querySelectorAll('section[id]');
  window.addEventListener('scroll', () => {
    const scrollY = window.pageYOffset;
    sections.forEach((current) => {
      const sectionHeight = current.offsetHeight;
      const sectionTop = current.offsetTop - 120;
      const sectionId = current.getAttribute('id');
      const targetLink = document.querySelector(`.nav-links a[href*="${sectionId}"]`);
      if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
        if (targetLink) targetLink.classList.add('active');
      } else {
        if (targetLink) targetLink.classList.remove('active');
      }
    });
  });

  // Initialize Language & UI
  applyLanguage(currentLang);
  updatePriceCalculation();
});
