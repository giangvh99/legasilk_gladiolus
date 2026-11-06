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
      // format: "placeholder:form.name_placeholder;title:form.submit"
      const pairs = attrConfig.split(';');
      pairs.forEach((pair) => {
        const [attr, key] = pair.split(':');
        if (attr && key && dict[key.trim()]) {
          el.setAttribute(attr.trim(), dict[key.trim()]);
        }
      });
    });

    // Update active state in lesson cards & tips
    updateActiveLessonUI();
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
  // 2. INTERACTIVE VIDEO TUTORIAL HUB
  // ----------------------------------------------------
  const lessonsData = [
    {
      id: 1,
      numKey: "lesson1.num",
      titleKey: "lesson1.title",
      durationKey: "lesson1.duration",
      descKey: "lesson1.desc",
      tipKey: "lesson1.tip",
      thumb: "assets/images/video-thumb-1.svg",
      color: "#FF3366",
      youtubeId: "dQw4w9WgXcQ", // Replaceable with real ID
      steps: [
        { vi: "Mở hộp và kiểm tra khung dệt gỗ", en: "Unbox and check the wooden loom frame" },
        { vi: "Buộc nút số 8 ở răng lược đầu tiên", en: "Tie figure-8 knot at the first peg" },
        { vi: "Mắc đều 9 sợi dọc từ trên xuống dưới", en: "Warp 9 vertical strings evenly top to bottom" },
        { vi: "Căng chỉnh độ căng vừa vặn ngón tay", en: "Check thread tension with gentle finger tap" }
      ]
    },
    {
      id: 2,
      numKey: "lesson2.num",
      titleKey: "lesson2.title",
      durationKey: "lesson2.duration",
      descKey: "lesson2.desc",
      tipKey: "lesson2.tip",
      thumb: "assets/images/video-thumb-2.svg",
      color: "#00D2B4",
      youtubeId: "dQw4w9WgXcQ",
      steps: [
        { vi: "Quấn sợi tơ ngũ sắc vào con thoi gỗ", en: "Wind rainbow silk thread onto shuttle" },
        { vi: "Luồn thoi: đè sợi 1, luồn sợi 2 (xen kẽ)", en: "Pass shuttle: over 1, under 1 rhythm" },
        { vi: "Để cong hình cầu vồng nhỏ rồi kéo nhẹ", en: "Leave a rainbow arc before gentle pull" },
        { vi: "Dùng lược dệt gạt đều khít các hàng tơ", en: "Tap rows tight and neat with wooden comb" }
      ]
    },
    {
      id: 3,
      numKey: "lesson3.num",
      titleKey: "lesson3.title",
      durationKey: "lesson3.duration",
      descKey: "lesson3.desc",
      tipKey: "lesson3.tip",
      thumb: "assets/images/video-thumb-3.svg",
      color: "#FFB703",
      youtubeId: "dQw4w9WgXcQ",
      steps: [
        { vi: "Cắt chỉ cũ chừa lại 3cm giấu mối", en: "Cut old thread leaving 3cm tail to tuck" },
        { vi: "Nối màu tơ mới (Đỏ Ruby, Vàng Óng)", en: "Introduce new silk color (Ruby Red, Golden Silk)" },
        { vi: "Dệt quả trám đối xứng truyền thống", en: "Weave symmetric diamond folk patterns" },
        { vi: "Kiểm tra hai mép dệt không bị co rút", en: "Ensure bookmark edges stay straight" }
      ]
    },
    {
      id: 4,
      numKey: "lesson4.num",
      titleKey: "lesson4.title",
      durationKey: "lesson4.duration",
      descKey: "lesson4.desc",
      tipKey: "lesson4.tip",
      thumb: "assets/images/video-thumb-4.svg",
      color: "#8338EC",
      youtubeId: "dQw4w9WgXcQ",
      steps: [
        { vi: "Dệt thêm 2 hàng khóa đuôi chắc chắn", en: "Weave 2 lock rows at the bottom" },
        { vi: "Cắt và tháo sợi kẹp ra khỏi khung gỗ", en: "Carefully unhook warp loops from pegs" },
        { vi: "Thắt nút vương miện tạo tua rua lụa", en: "Tie crown knots for flowing silk tassels" },
        { vi: "Xỏ hạt gỗ trang trí & kẹp vào trang sách", en: "Thread lucky wooden bead & insert into book" }
      ]
    }
  ];

  let currentLessonIndex = 0;
  let isPlaying = false;
  let playbackSeconds = 0;
  let playbackInterval = null;
  let playbackSpeed = 1.0;

  const currentLessonNumEl = document.getElementById('currentLessonNum');
  const currentLessonTitleEl = document.getElementById('currentLessonTitle');
  const currentLessonDescEl = document.getElementById('currentLessonDesc');
  const currentLessonTipEl = document.getElementById('currentLessonTip');
  const currentLessonStepsList = document.getElementById('currentLessonStepsList');
  const videoPlayBtn = document.getElementById('videoPlayBtn');
  const videoPlayIcon = document.getElementById('videoPlayIcon');
  const videoTimecodeEl = document.getElementById('videoTimecode');
  const videoProgressBar = document.getElementById('videoProgressBar');
  const videoSpeedBtn = document.getElementById('videoSpeedBtn');
  const videoCanvas = document.getElementById('videoSimulatorCanvas');
  const videoThumbOverlay = document.getElementById('videoThumbOverlay');
  const videoCanvasCtx = videoCanvas ? videoCanvas.getContext('2d') : null;

  function formatTime(sec) {
    const m = Math.floor(sec / 60);
    const s = Math.floor(sec % 60);
    return `${m < 10 ? '0' : ''}${m}:${s < 10 ? '0' : ''}${s}`;
  }

  function updateActiveLessonUI() {
    const lesson = lessonsData[currentLessonIndex];
    const dict = translations[currentLang] || translations.vi;

    if (currentLessonNumEl) currentLessonNumEl.textContent = dict[lesson.numKey];
    if (currentLessonTitleEl) currentLessonTitleEl.textContent = dict[lesson.titleKey];
    if (currentLessonDescEl) currentLessonDescEl.textContent = dict[lesson.descKey];
    if (currentLessonTipEl) currentLessonTipEl.textContent = dict[lesson.tipKey];

    // Update steps
    if (currentLessonStepsList) {
      currentLessonStepsList.innerHTML = '';
      lesson.steps.forEach((step, idx) => {
        const li = document.createElement('li');
        li.className = 'step-item';
        li.innerHTML = `
          <span class="step-badge" style="background-color: ${lesson.color}">${idx + 1}</span>
          <span class="step-text">${currentLang === 'vi' ? step.vi : step.en}</span>
        `;
        currentLessonStepsList.appendChild(li);
      });
    }

    // Update active highlight in cards list
    document.querySelectorAll('.lesson-card').forEach((card, idx) => {
      if (idx === currentLessonIndex) {
        card.classList.add('active');
      } else {
        card.classList.remove('active');
      }
    });

    // Reset simulator animation state
    playbackSeconds = 0;
    updateProgressUI();
  }

  function updateProgressUI() {
    const totalSec = 270; // 04:30 base for mock
    if (videoTimecodeEl) {
      videoTimecodeEl.textContent = `${formatTime(playbackSeconds)} / ${formatTime(totalSec)}`;
    }
    if (videoProgressBar) {
      const pct = Math.min(100, (playbackSeconds / totalSec) * 100);
      videoProgressBar.style.width = `${pct}%`;
    }
  }

  // Interactive Weaving Animation on Canvas
  let shuttleX = 40;
  let shuttleDirection = 1;
  let weaveRows = 8;

  function drawWeavingSimulation() {
    if (!videoCanvasCtx || !videoCanvas) return;
    const w = videoCanvas.width;
    const h = videoCanvas.height;

    // Background Loom Wood Screen
    videoCanvasCtx.fillStyle = '#FFF8F0';
    videoCanvasCtx.fillRect(0, 0, w, h);

    // Frame Borders
    videoCanvasCtx.lineWidth = 14;
    videoCanvasCtx.strokeStyle = '#D4A373';
    videoCanvasCtx.strokeRect(7, 7, w - 14, h - 14);

    // Vertical Warp Strings (9 lines)
    videoCanvasCtx.lineWidth = 3;
    videoCanvasCtx.strokeStyle = '#C5B49E';
    const warpCount = 9;
    const spacing = (w - 120) / (warpCount - 1);
    const warpXCoords = [];

    for (let i = 0; i < warpCount; i++) {
      const x = 60 + i * spacing;
      warpXCoords.push(x);
      videoCanvasCtx.beginPath();
      videoCanvasCtx.moveTo(x, 20);
      videoCanvasCtx.lineTo(x, h - 20);
      videoCanvasCtx.stroke();
    }

    // Woven Rows (Building up from bottom)
    const lesson = lessonsData[currentLessonIndex];
    const rowColors = ['#FF3366', '#FF9900', '#FFD166', '#06D6A0', '#118AB2', '#8338EC', lesson.color];

    for (let r = 0; r < weaveRows; r++) {
      const y = h - 45 - r * 14;
      videoCanvasCtx.fillStyle = rowColors[r % rowColors.length];
      videoCanvasCtx.beginPath();
      videoCanvasCtx.roundRect(50, y, w - 100, 10, 4);
      videoCanvasCtx.fill();

      // Weft cross stitches texture
      videoCanvasCtx.strokeStyle = '#FFFFFF';
      videoCanvasCtx.lineWidth = 1.5;
      warpXCoords.forEach((wx, i) => {
        if ((r + i) % 2 === 0) {
          videoCanvasCtx.beginPath();
          videoCanvasCtx.moveTo(wx - 4, y + 2);
          videoCanvasCtx.lineTo(wx + 4, y + 8);
          videoCanvasCtx.stroke();
        }
      });
    }

    // Active Shuttle Animation
    const activeY = h - 55 - weaveRows * 14;
    if (isPlaying) {
      shuttleX += shuttleDirection * (3.5 * playbackSpeed);
      if (shuttleX > w - 110) {
        shuttleDirection = -1;
        weaveRows = (weaveRows + 1) % 18;
      } else if (shuttleX < 50) {
        shuttleDirection = 1;
        weaveRows = (weaveRows + 1) % 18;
      }
    }

    // Draw Wooden Shuttle
    videoCanvasCtx.fillStyle = '#ECC695';
    videoCanvasCtx.strokeStyle = '#8C5329';
    videoCanvasCtx.lineWidth = 2.5;
    videoCanvasCtx.beginPath();
    videoCanvasCtx.ellipse(shuttleX + 30, activeY, 32, 12, 0, 0, Math.PI * 2);
    videoCanvasCtx.fill();
    videoCanvasCtx.stroke();

    // Silk Thread from Shuttle
    videoCanvasCtx.fillStyle = lesson.color;
    videoCanvasCtx.beginPath();
    videoCanvasCtx.ellipse(shuttleX + 30, activeY, 14, 6, 0, 0, Math.PI * 2);
    videoCanvasCtx.fill();

    // Trailing silk thread
    videoCanvasCtx.strokeStyle = lesson.color;
    videoCanvasCtx.lineWidth = 3;
    videoCanvasCtx.beginPath();
    videoCanvasCtx.moveTo(shuttleX + 15, activeY);
    videoCanvasCtx.quadraticCurveTo(shuttleX - 25, activeY + (shuttleDirection > 0 ? 15 : -15), 50, activeY);
    videoCanvasCtx.stroke();

    // Watermark overlay
    videoCanvasCtx.fillStyle = 'rgba(43, 45, 66, 0.4)';
    videoCanvasCtx.font = 'bold 12px Quicksand, sans-serif';
    videoCanvasCtx.fillText(`LEGASILK • ${lesson.numKey.toUpperCase()}`, 25, 30);
  }

  function startAnimationLoop() {
    function loop() {
      drawWeavingSimulation();
      requestAnimationFrame(loop);
    }
    requestAnimationFrame(loop);
  }

  function togglePlayVideo() {
    isPlaying = !isPlaying;
    if (isPlaying) {
      if (videoPlayIcon) videoPlayIcon.textContent = '⏸';
      if (videoThumbOverlay) videoThumbOverlay.style.opacity = '0';
      if (videoThumbOverlay) videoThumbOverlay.style.pointerEvents = 'none';

      playbackInterval = setInterval(() => {
        playbackSeconds += 1 * playbackSpeed;
        if (playbackSeconds > 270) {
          playbackSeconds = 0;
        }
        updateProgressUI();
      }, 1000);
    } else {
      if (videoPlayIcon) videoPlayIcon.textContent = '▶';
      clearInterval(playbackInterval);
    }
  }

  if (videoPlayBtn) {
    videoPlayBtn.addEventListener('click', togglePlayVideo);
  }

  if (videoThumbOverlay) {
    videoThumbOverlay.addEventListener('click', togglePlayVideo);
  }

  if (videoSpeedBtn) {
    const speeds = [1.0, 1.25, 1.5, 0.75];
    let speedIdx = 0;
    videoSpeedBtn.addEventListener('click', () => {
      speedIdx = (speedIdx + 1) % speeds.length;
      playbackSpeed = speeds[speedIdx];
      videoSpeedBtn.textContent = `${playbackSpeed}x`;
    });
  }

  // Click on lesson cards to switch lessons
  document.querySelectorAll('.lesson-card').forEach((card, idx) => {
    card.addEventListener('click', () => {
      currentLessonIndex = idx;
      updateActiveLessonUI();
      if (!isPlaying) {
        togglePlayVideo();
      }
    });
  });

  // Init canvas animation
  if (videoCanvas) {
    startAnimationLoop();
  }

  // ----------------------------------------------------
  // 3. LIVE BULK PRICING CALCULATOR
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
  // 4. CONTACT & PRE-ORDER FORM SIMULATION
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
  // 5. QUICK GUIDE PRINTABLE MODAL
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
  // 6. FAQ ACCORDION
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
  // 7. MOBILE MENU TOGGLE
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
  // 8. ACTIVE SCROLLSPY
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
  updateActiveLessonUI();
  updatePriceCalculation();
});
