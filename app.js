/* ==========================================================================
   Flowgen - Enterprise SaaS JavaScript Application
   Pure WhatsApp Chat Text Animations & Dynamic Meeting Card Sync
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
  initPageTransitions();
  initHeader();
  initSlidingHeaderPill();
  initServicesDropdown();
  initBillingToggle();
  initCounters();
  initHeroWhatsAppAnimation();
  initWhatsAppSimulator();
  initFAQAccordion();
  initSampleProjectModal();
  initContactForm();
});

/* Smooth SPA-Style Page Slide Transitions */
function initPageTransitions() {
  // Trigger slide-in entrance on DOM load
  requestAnimationFrame(() => {
    document.body.classList.add('page-loaded');
  });

  // Intercept internal link clicks for smooth slide-out transition
  document.addEventListener('click', (e) => {
    const link = e.target.closest('a[href]');
    if (!link) return;

    const href = link.getAttribute('href');
    if (!href || href.startsWith('#') || href.startsWith('javascript:') || href.startsWith('mailto:') || href.startsWith('tel:') || link.getAttribute('target') === '_blank') {
      return;
    }

    // Only intercept local HTML page navigation
    if (href.endsWith('.html') || href === '/' || href.startsWith('./') || !href.includes('://')) {
      e.preventDefault();
      document.body.classList.remove('page-loaded');
      document.body.classList.add('page-exiting');

      setTimeout(() => {
        window.location.href = href;
      }, 280);
    }
  });
}

/* Services Mega Menu Mobile & Click Interactivity */
function initServicesDropdown() {
  const serviceNavLinks = document.querySelectorAll('.nav-item');
  serviceNavLinks.forEach(item => {
    const link = item.querySelector('.nav-link');
    const mega = item.querySelector('.mega-menu');
    if (link && mega) {
      link.addEventListener('click', (e) => {
        if (window.innerWidth <= 1024) {
          e.preventDefault();
          const isVisible = mega.style.display === 'block';
          mega.style.display = isVisible ? 'none' : 'block';
          mega.style.opacity = isVisible ? '0' : '1';
          mega.style.pointerEvents = isVisible ? 'none' : 'auto';
          mega.style.transform = isVisible ? 'translateX(-50%) translateY(14px) scale(0.98)' : 'translateX(-50%) translateY(6px) scale(1)';
        }
      });
    }
  });
}

/* Header Scroll & Mobile Interactivity */
function initHeader() {
  const headerWrap = document.querySelector('.header-sticky-wrap');
  const mobileToggle = document.querySelector('.mobile-toggle');
  const navLinks = document.querySelector('.nav-links');

  if (headerWrap) {
    window.addEventListener('scroll', () => {
      if (window.scrollY > 30) {
        headerWrap.classList.add('scrolled');
      } else {
        headerWrap.classList.remove('scrolled');
      }
    });
  }

  if (mobileToggle && navLinks) {
    mobileToggle.addEventListener('click', () => {
      const isOpen = navLinks.style.display === 'flex';
      navLinks.style.display = isOpen ? 'none' : 'flex';
      if (!isOpen) {
        navLinks.style.flexDirection = 'column';
        navLinks.style.position = 'absolute';
        navLinks.style.top = '100%';
        navLinks.style.left = '0';
        navLinks.style.width = '100%';
        navLinks.style.background = '#ffffff';
        navLinks.style.padding = '20px';
        navLinks.style.boxShadow = '0 10px 30px rgba(0,0,0,0.1)';
      }
    });
  }
}

/* Dynamic Sliding Header Indicator Pill */
function initSlidingHeaderPill() {
  const navContainer = document.querySelector('.nav-links');
  if (!navContainer) return;

  let indicator = navContainer.querySelector('.nav-active-indicator');
  if (!indicator) {
    indicator = document.createElement('div');
    indicator.className = 'nav-active-indicator';
    navContainer.prepend(indicator);
  }

  const items = navContainer.querySelectorAll('.nav-link');
  const activeItem = navContainer.querySelector('.nav-link.active-pill');

  function movePillTo(element) {
    if (!element) {
      indicator.style.opacity = '0';
      return;
    }
    const rect = element.getBoundingClientRect();
    const parentRect = navContainer.getBoundingClientRect();
    
    indicator.style.opacity = '1';
    indicator.style.width = `${rect.width}px`;
    indicator.style.left = `${rect.left - parentRect.left}px`;
  }

  if (activeItem) {
    navContainer.classList.add('has-active');
    setTimeout(() => movePillTo(activeItem), 50);
  } else {
    indicator.style.opacity = '0';
  }

  items.forEach(item => {
    item.addEventListener('mouseenter', () => movePillTo(item));
  });

  navContainer.addEventListener('mouseleave', () => {
    if (activeItem) {
      movePillTo(activeItem);
    } else {
      indicator.style.opacity = '0';
    }
  });
}

/* Interactive Monthly / Annual Billing Toggle */
function initBillingToggle() {
  const btnMonthly = document.getElementById('toggle-monthly');
  const btnAnnual = document.getElementById('toggle-annual');
  if (!btnMonthly || !btnAnnual) return;

  const priceElements = document.querySelectorAll('.price-val');
  const savingNotes = document.querySelectorAll('.billing-saving-note');

  btnMonthly.addEventListener('click', () => {
    btnMonthly.classList.add('active');
    btnAnnual.classList.remove('active');

    priceElements.forEach(el => {
      const val = el.getAttribute('data-monthly');
      if (val) el.textContent = val;
    });

    if (savingNotes[0]) savingNotes[0].textContent = '';
    if (savingNotes[1]) savingNotes[1].textContent = '';
  });

  btnAnnual.addEventListener('click', () => {
    btnAnnual.classList.add('active');
    btnMonthly.classList.remove('active');

    priceElements.forEach(el => {
      const val = el.getAttribute('data-annual');
      if (val) el.textContent = val;
    });

    if (savingNotes[0]) savingNotes[0].textContent = 'Billed annually - save ₹5,400/year';
    if (savingNotes[1]) savingNotes[1].textContent = 'Billed annually - save ₹9,000/year';
  });
}

/* Animated Counters */
function initCounters() {
  const statNumbers = document.querySelectorAll('.stat-number');
  let animated = false;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting && !animated) {
        animated = true;
        statNumbers.forEach(stat => {
          const target = parseInt(stat.getAttribute('data-target') || '50', 10);
          let current = 0;
          const step = Math.ceil(target / 40);
          const timer = setInterval(() => {
            current += step;
            if (current >= target) {
              stat.textContent = target + (stat.getAttribute('data-suffix') || '+');
              clearInterval(timer);
            } else {
              stat.textContent = current + (stat.getAttribute('data-suffix') || '+');
            }
          }, 30);
        });
      }
    });
  }, { threshold: 0.5 });

  const heroStats = document.querySelector('.hero-stats');
  if (heroStats) observer.observe(heroStats);
}

/* PURE WHATSAPP CHAT TEXT ENGINE & DYNAMIC MEETING CARD SYNC */
function initHeroWhatsAppAnimation() {
  const chatBody = document.getElementById('hero-chat-body');
  const meetingCard = document.querySelector('.right-floating-card');
  const meetingBadge = document.getElementById('meeting-badge');
  const meetingPerson = document.getElementById('meeting-person');
  const meetingTime = document.getElementById('meeting-time');

  if (!chatBody) return;

  function updateMeetingCard(badgeText, badgeStyle, person, time, isGlowing) {
    if (meetingBadge) {
      meetingBadge.textContent = badgeText;
      meetingBadge.style.cssText = badgeStyle;
    }
    if (meetingPerson) meetingPerson.textContent = person;
    if (meetingTime) meetingTime.textContent = time;

    if (meetingCard) {
      if (isGlowing) meetingCard.classList.add('active-glow');
      else meetingCard.classList.remove('active-glow');
    }
  }

  function runChatSequence() {
    chatBody.innerHTML = '<div class="wa-date-divider">Today</div>';
    
    // Initial State: Pending Meeting
    updateMeetingCard('Pending', 'background:#fef3c7; color:#b45309;', 'Alex Morgan', 'Awaiting Slot...', false);

    // Step 1: Typing indicator
    showTypingIndicator(chatBody, () => {
      // Step 2: Message 1 (AI)
      appendMessage(chatBody, 'incoming', 'Hi Alex, we\'d love to help you get started.', '10:30 AM');

      setTimeout(() => {
        // Step 3: Message 2 (User)
        appendMessage(chatBody, 'outgoing', 'Hey! I\'d like to know more.', '10:31 AM');

        setTimeout(() => {
          // Step 4: Typing indicator
          showTypingIndicator(chatBody, () => {
            // Step 5: Message 3 (AI direct question without extra panel)
            appendMessage(chatBody, 'incoming', 'We help businesses grow 3x with WhatsApp campaigns. Would you like to book a demo?', '10:31 AM');
            updateMeetingCard('Scheduling...', 'background:#eff6ff; color:#2563eb;', 'Alex Morgan', 'Selecting Slot...', false);

            setTimeout(() => {
              // Step 6: Message 4 (User confirmation)
              appendMessage(chatBody, 'outgoing', 'Yes, I\'d like to book a demo!', '10:32 AM');

              setTimeout(() => {
                // Step 7: Typing indicator
                showTypingIndicator(chatBody, () => {
                  // Step 8: Message 5 (AI final confirmation)
                  appendMessage(chatBody, 'incoming', 'Awesome! I\'ve scheduled your demo for tomorrow at 2:00 PM.', '10:32 AM');
                  
                  // Step 9: Dynamically CONFIRM & GLOW the Right Side Meeting Card!
                  updateMeetingCard('Confirmed', 'background:#dcfce7; color:#15803d;', 'Alex Morgan', 'Tomorrow · 2:00 PM', true);

                  // Loop after 7 seconds
                  setTimeout(runChatSequence, 7000);
                });
              }, 1200);
            }, 1400);
          });
        }, 1400);
      }, 1200);
    });
  }

  function showTypingIndicator(container, callback) {
    const typingElem = document.createElement('div');
    typingElem.className = 'typing-indicator-box';
    typingElem.innerHTML = `
      <div class="typing-dot"></div>
      <div class="typing-dot"></div>
      <div class="typing-dot"></div>
    `;
    container.appendChild(typingElem);
    container.scrollTo({ top: container.scrollHeight, behavior: 'smooth' });

    setTimeout(() => {
      if (typingElem.parentNode) container.removeChild(typingElem);
      if (callback) callback();
    }, 1100);
  }

  function appendMessage(container, type, htmlContent, time) {
    const bubble = document.createElement('div');
    const isOutgoing = type === 'outgoing';
    bubble.className = `wa-card-bubble ${isOutgoing ? 'wa-outgoing' : 'wa-incoming'}`;
    
    const ticks = isOutgoing ? '<i class="fa-solid fa-check-double" style="color:var(--wa-tick-blue); font-size:0.7rem; margin-left:4px;"></i>' : '';
    
    bubble.innerHTML = `
      ${htmlContent}
      <div style="font-size:0.65rem; color:var(--wa-time-color); text-align:right; margin-top:3px; display:flex; align-items:center; justify-content:flex-end;">
        ${time} ${ticks}
      </div>
    `;
    container.appendChild(bubble);
    container.scrollTo({ top: container.scrollHeight, behavior: 'smooth' });
    return bubble;
  }

  runChatSequence();
}

/* Secondary Section WhatsApp Simulator */
function initWhatsAppSimulator() {
  const container = document.getElementById('wa-messages');
  if (!container) return;

  const script = [
    { sender: 'user', text: 'Hi! Do you have table availability for tonight at 8 PM?' },
    { sender: 'ai', text: 'Hello! 👋 Flowgen AI assistant here. Yes, 2 tables available for 8:00 PM tonight. Would you like indoor or terrace seating?' },
    { sender: 'user', text: 'Terrace for 4 people please!' },
    { sender: 'ai', text: 'Great choice! 🍽️ Reservation confirmed for 4 guests on the Terrace at 8:00 PM under your phone number. Details sent to kitchen!' },
    { sender: 'user', text: 'Awesome, thanks!' }
  ];

  let currentIndex = 0;

  function renderNextMessage() {
    if (currentIndex >= script.length) {
      setTimeout(() => {
        container.innerHTML = '';
        currentIndex = 0;
        renderNextMessage();
      }, 4000);
      return;
    }

    const msg = script[currentIndex];
    const bubble = document.createElement('div');
    bubble.className = `wa-bubble ${msg.sender === 'user' ? 'bubble-user' : 'bubble-ai'}`;
    
    const time = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    bubble.innerHTML = `
      <div>${msg.text}</div>
      <div style="font-size:0.65rem; color:rgba(255,255,255,0.6); text-align:right; margin-top:4px;">${time}</div>
    `;

    container.appendChild(bubble);
    container.scrollTo({ top: container.scrollHeight, behavior: 'smooth' });

    currentIndex++;
    setTimeout(renderNextMessage, msg.sender === 'user' ? 1800 : 2500);
  }

  renderNextMessage();
}

/* FAQ Accordion */
function initFAQAccordion() {
  const faqItems = document.querySelectorAll('.faq-item');

  faqItems.forEach(item => {
    const questionBtn = item.querySelector('.faq-question');
    if (!questionBtn) return;
    questionBtn.addEventListener('click', () => {
      const isActive = item.classList.contains('active');
      faqItems.forEach(i => i.classList.remove('active'));
      if (!isActive) {
        item.classList.add('active');
      }
    });
  });
}

/* Sample Projects Modals */
const sampleProjectData = {
  1: {
    title: 'Restaurant Website Showcase',
    type: 'Restaurant Concept',
    description: 'Online menu, table reservation booking form, gallery, customer reviews, WhatsApp button, and delivery info.',
    contentHtml: `
      <div style="background:#f8fafc; padding:20px; border-radius:12px; border:1px solid #e2e8f0;">
        <h4 style="font-size:1.1rem; font-weight:800; margin-bottom:12px;">Sample Restaurant Interface</h4>
        <div style="display:grid; grid-template-columns:1fr 1fr; gap:12px; margin-bottom:16px;">
          <div style="background:#fff; padding:12px; border-radius:8px; border:1px solid #e2e8f0;">
            <div style="font-weight:700;">🍕 Artisan Truffle Pizza</div>
            <div style="font-weight:800; color:#2563eb; margin-top:4px;">$18.00</div>
          </div>
          <div style="background:#fff; padding:12px; border-radius:8px; border:1px solid #e2e8f0;">
            <div style="font-weight:700;">🍷 Pasta Carbonara</div>
            <div style="font-weight:800; color:#2563eb; margin-top:4px;">$22.00</div>
          </div>
        </div>
        <button onclick="showToast('Sample Table Reservation submitted! (Demonstration Only)')" class="btn btn-primary btn-sm" style="width:100%;">
          Simulate Table Reservation 📅
        </button>
      </div>
    `
  },
  2: {
    title: 'Clinic Website & Appointment System',
    type: 'Clinic Concept',
    description: 'Appointment booking, doctor profiles, departments, contact, emergency information.',
    contentHtml: `
      <div style="background:#f8fafc; padding:20px; border-radius:12px; border:1px solid #e2e8f0;">
        <h4 style="font-size:1.1rem; font-weight:800; margin-bottom:12px;">HealthCare Plus Clinic Portal</h4>
        <div style="background:#fff; padding:12px; border-radius:8px; border:1px solid #e2e8f0; margin-bottom:14px;">
          <div style="font-weight:700;">Dr. Sarah Jenkins, MD</div>
          <div style="font-size:0.8rem; color:#64748b;">Cardiology Specialist</div>
          <div style="margin-top:4px; font-size:0.8rem; color:#10b981;">● Next Available: Today at 3:30 PM</div>
        </div>
        <button onclick="showToast('Appointment slot selected! (Demonstration Only)')" class="btn btn-primary btn-sm" style="width:100%;">
          Simulate Booking Appointment
        </button>
      </div>
    `
  },
  3: {
    title: 'Gym Website & Interactive BMI Calculator',
    type: 'Gym Concept',
    description: 'Membership plans, trainer profiles, class schedule, and a live working interactive BMI calculator.',
    contentHtml: `
      <div style="background:#f8fafc; padding:20px; border-radius:12px; border:1px solid #e2e8f0;">
        <h4 style="font-size:1.1rem; font-weight:800; margin-bottom:12px;">Interactive Fitness Tool: Live BMI Calculator</h4>
        <div style="display:grid; grid-template-columns:1fr 1fr; gap:10px; margin-bottom:12px;">
          <div>
            <label style="font-size:0.8rem; font-weight:700;">Height (cm)</label>
            <input type="number" id="bmi-height" value="175" style="width:100%; padding:8px; border-radius:6px; border:1px solid #cbd5e1;">
          </div>
          <div>
            <label style="font-size:0.8rem; font-weight:700;">Weight (kg)</label>
            <input type="number" id="bmi-weight" value="70" style="width:100%; padding:8px; border-radius:6px; border:1px solid #cbd5e1;">
          </div>
        </div>
        <button onclick="calculateBMI()" class="btn btn-primary btn-sm" style="width:100%;">
          Calculate BMI Score 🏋️‍♂️
        </button>
        <div id="bmi-output" style="display:none; margin-top:14px; padding:10px; background:#fff; text-align:center; font-weight:800; border-radius:6px; color:#2563eb;"></div>
      </div>
    `
  }
};

function initSampleProjectModal() {
  const modalOverlay = document.getElementById('project-modal');
  const modalTitle = document.getElementById('modal-title');
  const modalType = document.getElementById('modal-type');
  const modalDesc = document.getElementById('modal-desc');
  const modalBody = document.getElementById('modal-body-content');
  const closeBtn = document.querySelector('.modal-close');

  if (!modalOverlay) return;

  document.querySelectorAll('.open-sample-modal').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const id = btn.getAttribute('data-project-id');
      const data = sampleProjectData[id];
      if (!data) return;

      modalTitle.textContent = data.title;
      modalType.textContent = data.type;
      modalDesc.textContent = data.description;
      modalBody.innerHTML = data.contentHtml;

      modalOverlay.classList.add('active');
    });
  });

  if (closeBtn) closeBtn.addEventListener('click', () => modalOverlay.classList.remove('active'));
  modalOverlay.addEventListener('click', (e) => {
    if (e.target === modalOverlay) modalOverlay.classList.remove('active');
  });
}

window.calculateBMI = function() {
  const height = parseFloat(document.getElementById('bmi-height').value) / 100;
  const weight = parseFloat(document.getElementById('bmi-weight').value);
  const output = document.getElementById('bmi-output');
  if (!height || !weight) return;
  const bmi = (weight / (height * height)).toFixed(1);
  let category = '';
  if (bmi < 18.5) category = 'Underweight';
  else if (bmi < 25) category = 'Normal weight ✅';
  else if (bmi < 30) category = 'Overweight';
  else category = 'Obese';

  output.style.display = 'block';
  output.innerHTML = `Your BMI Score: <strong>${bmi}</strong> (${category})`;
};

/* Contact Form & Book a Demo Handler */
function initContactForm() {
  const form = document.getElementById('contact-form');
  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      showToast('Thank you! Your demo request has been received.');
      form.reset();
    });
  }

  // Handle Book a Demo smooth scroll on Homepage
  document.querySelectorAll('a[href="contact.html"]').forEach(btn => {
    btn.addEventListener('click', (e) => {
      if (window.location.pathname.endsWith('index.html') || window.location.pathname === '/' || window.location.pathname.endsWith('/')) {
        const targetForm = document.getElementById('contact-form');
        if (targetForm) {
          e.preventDefault();
          targetForm.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
      }
    });
  });
}

window.showToast = function(msg) {
  let toast = document.getElementById('toast-notification');
  let toastMsg = document.getElementById('toast-message');

  if (!toast) {
    toast = document.createElement('div');
    toast.id = 'toast-notification';
    toast.className = 'toast';
    toast.innerHTML = '<i class="fa-solid fa-circle-check" style="color:#25d366; margin-right:8px;"></i><span id="toast-message"></span>';
    document.body.appendChild(toast);
    toastMsg = toast.querySelector('#toast-message');
  }

  if (toastMsg) toastMsg.textContent = msg;
  toast.classList.add('active');
  setTimeout(() => toast.classList.remove('active'), 4000);
};
