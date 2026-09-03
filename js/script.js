/**
 * GFC Restaurant - Main JavaScript
 * Location: Udayar Vilai, Kanyakumari, Tamil Nadu, India
 * Clean Vanilla JavaScript (No jQuery, No external UI frameworks)
 */

document.addEventListener('DOMContentLoaded', () => {
  initHeaderAndNav();
  initActiveNavLink();
  initScrollReveal();
  initBackToTop();
  initLightbox();
  initMenuPage();
  initGalleryPage();
  initContactForm();
  initReservationForm();
});

/* ==========================================================================
   1. STICKY HEADER & MOBILE NAVIGATION
   ========================================================================== */
function initHeaderAndNav() {
  const header = document.querySelector('.site-header');
  const hamburgerBtn = document.querySelector('.hamburger-btn');
  const mobileNav = document.querySelector('.mobile-nav');
  const mobileBackdrop = document.querySelector('.mobile-nav-backdrop');
  const mobileLinks = document.querySelectorAll('.mobile-nav-link, .mobile-nav-footer .btn');

  // Sticky header on scroll
  const handleScroll = () => {
    if (!header) return;
    // If on homepage hero, become solid after 50px; else keep solid
    const isHomepage = window.location.pathname.endsWith('/') || 
                       window.location.pathname.endsWith('/index.html') ||
                       window.location.pathname === '';
    
    if (window.scrollY > 40 || !isHomepage) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  };

  window.addEventListener('scroll', handleScroll, { passive: true });
  handleScroll(); // Initial check

  // Mobile menu toggling
  if (hamburgerBtn && mobileNav && mobileBackdrop) {
    const toggleMenu = (open) => {
      const isOpen = open !== undefined ? open : !mobileNav.classList.contains('open');
      hamburgerBtn.classList.toggle('active', isOpen);
      mobileNav.classList.toggle('open', isOpen);
      mobileBackdrop.classList.toggle('open', isOpen);
      hamburgerBtn.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
      document.body.style.overflow = isOpen ? 'hidden' : '';
    };

    hamburgerBtn.addEventListener('click', () => toggleMenu());
    mobileBackdrop.addEventListener('click', () => toggleMenu(false));

    mobileLinks.forEach(link => {
      link.addEventListener('click', () => toggleMenu(false));
    });

    // Close on Escape key
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && mobileNav.classList.contains('open')) {
        toggleMenu(false);
      }
    });
  }
}

/* ==========================================================================
   2. ACTIVE NAVIGATION LINK HIGHLIGHTER
   ========================================================================== */
function initActiveNavLink() {
  let currentPath = window.location.pathname;
  if (currentPath === '' || currentPath === '/') {
    currentPath = 'index.html';
  } else {
    currentPath = currentPath.substring(currentPath.lastIndexOf('/') + 1);
  }

  const allNavLinks = document.querySelectorAll('.nav-link, .mobile-nav-link');
  allNavLinks.forEach(link => {
    const href = link.getAttribute('href');
    if (!href) return;
    const linkPath = href.substring(href.lastIndexOf('/') + 1);

    if (linkPath === currentPath || (currentPath === '' && linkPath === 'index.html')) {
      link.classList.add('active');
    } else {
      link.classList.remove('active');
    }
  });
}

/* ==========================================================================
   3. SCROLL REVEAL ANIMATIONS (IntersectionObserver)
   ========================================================================== */
function initScrollReveal() {
  const revealElements = document.querySelectorAll('.reveal');
  if (!revealElements.length) return;

  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver((entries, obs) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('revealed');
          obs.unobserve(entry.target);
        }
      });
    }, {
      root: null,
      threshold: 0.12,
      rootMargin: '0px 0px -40px 0px'
    });

    revealElements.forEach(el => observer.observe(el));
  } else {
    // Fallback if IntersectionObserver not supported
    revealElements.forEach(el => el.classList.add('revealed'));
  }
}

/* ==========================================================================
   4. BACK TO TOP BUTTON
   ========================================================================== */
function initBackToTop() {
  const btn = document.querySelector('.back-to-top-btn');
  if (!btn) return;

  window.addEventListener('scroll', () => {
    if (window.scrollY > 380) {
      btn.classList.add('visible');
    } else {
      btn.classList.remove('visible');
    }
  }, { passive: true });

  btn.addEventListener('click', (e) => {
    e.preventDefault();
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });
}

/* ==========================================================================
   5. LIGHTBOX SYSTEM (Home & Gallery pages)
   ========================================================================== */
let lightboxItems = [];
let currentLightboxIndex = 0;

function initLightbox() {
  const modal = document.getElementById('lightboxModal');
  if (!modal) return;

  const modalImg = modal.querySelector('.lightbox-img');
  const captionEl = modal.querySelector('.lightbox-caption');
  const counterEl = modal.querySelector('.lightbox-counter');
  const closeBtn = modal.querySelector('.lightbox-btn-close');
  const prevBtn = modal.querySelector('.lightbox-btn-prev');
  const nextBtn = modal.querySelector('.lightbox-btn-next');

  // Collect all clickable gallery items
  const triggers = document.querySelectorAll('[data-lightbox-src]');
  lightboxItems = Array.from(triggers).map((el, idx) => {
    el.setAttribute('data-lightbox-index', idx);
    return {
      src: el.getAttribute('data-lightbox-src'),
      caption: el.getAttribute('data-lightbox-caption') || 'GFC Restaurant Showcase',
      tag: el.getAttribute('data-lightbox-tag') || 'Gallery'
    };
  });

  const showImage = (index) => {
    if (!lightboxItems.length) return;
    currentLightboxIndex = (index + lightboxItems.length) % lightboxItems.length;
    const item = lightboxItems[currentLightboxIndex];

    modalImg.src = item.src;
    modalImg.alt = item.caption;
    if (captionEl) captionEl.textContent = item.caption;
    if (counterEl) counterEl.textContent = `${currentLightboxIndex + 1} / ${lightboxItems.length}`;
  };

  const openLightbox = (index) => {
    showImage(index);
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
  };

  const closeLightbox = () => {
    modal.classList.remove('active');
    document.body.style.overflow = '';
  };

  triggers.forEach(el => {
    el.addEventListener('click', (e) => {
      e.preventDefault();
      const index = parseInt(el.getAttribute('data-lightbox-index'), 10) || 0;
      openLightbox(index);
    });
  });

  if (closeBtn) closeBtn.addEventListener('click', closeLightbox);
  if (prevBtn) prevBtn.addEventListener('click', () => showImage(currentLightboxIndex - 1));
  if (nextBtn) nextBtn.addEventListener('click', () => showImage(currentLightboxIndex + 1));

  // Close when clicking modal backdrop
  modal.addEventListener('click', (e) => {
    if (e.target === modal) closeLightbox();
  });

  // Keyboard navigation
  document.addEventListener('keydown', (e) => {
    if (!modal.classList.contains('active')) return;
    if (e.key === 'Escape') closeLightbox();
    if (e.key === 'ArrowLeft') showImage(currentLightboxIndex - 1);
    if (e.key === 'ArrowRight') showImage(currentLightboxIndex + 1);
  });
}

/* ==========================================================================
   6. MENU PAGE DATA & FILTERING
   Editable menu items array as specified in prompt
   ========================================================================== */
const MENU_ITEMS = [
  {
    name: "Chicken Dum Biryani",
    category: "Biryani",
    description: "Traditional slow-cooked fragrant basmati rice infused with aromatic coastal spices and tender chicken.",
    price: "₹240",
    image: "assets/images/menu-1.jpg"
  },
  {
    name: "Tandoori Chicken Skewers",
    category: "Chicken",
    description: "Succulent chicken marinated in rich yogurt and fiery Indian spices, chargrilled to smoky perfection.",
    price: "₹260",
    image: "assets/images/menu-2.jpg"
  },
  {
    name: "Crispy Fried Chicken Strips",
    category: "Chicken",
    description: "Golden, crispy-coated chicken breast strips served with house spicy garlic aioli.",
    price: "₹190",
    image: "assets/images/gallery-4.jpg"
  },
  {
    name: "GFC Signature Farmhouse Pizza",
    category: "Pizza",
    description: "Hand-stretched artisan crust topped with vine-ripened tomatoes, mozzarella, herbs, and chargrilled chicken.",
    price: "₹310",
    image: "assets/images/menu-3.jpg"
  },
  {
    name: "Spicy Peri-Peri Grill Platter",
    category: "Chicken",
    description: "Flavour-packed grilled half-chicken basted with our zesty in-house African peri-peri glaze.",
    price: "₹340",
    image: "assets/images/gallery-1.jpg"
  },
  {
    name: "Classic Chicken Shawarma Wrap",
    category: "Wraps",
    description: "Tender seasoned chicken slices rolled in toasted pita bread with garlic mayo and crisp pickles.",
    price: "₹150",
    image: "assets/images/about.jpg"
  },
  {
    name: "Paneer Tikka Roll",
    category: "Wraps",
    description: "Smoky cottage cheese cubes tossed with capsicum, mint chutney, and fresh greens wrapped in flatbread.",
    price: "₹140",
    image: "assets/images/gallery-3.jpg"
  },
  {
    name: "Loaded Cheesy French Fries",
    category: "Starters",
    description: "Crisp potato fries smothered in warm melted cheddar cheese sauce, paprika, and chopped scallions.",
    price: "₹130",
    image: "assets/images/gallery-2.jpg"
  },
  {
    name: "Crispy Fried Hot Wings",
    category: "Starters",
    description: "Crunchy double-dredged chicken wings tossed in our sweet & tangy honey barbecue sauce.",
    price: "₹180",
    image: "assets/images/gallery-4.jpg"
  },
  {
    name: "Tropical Blue Lagoon Mocktail",
    category: "Beverages",
    description: "A cool sparkling infusion of blue curaçao syrup, fresh lime juice, mint leaves, and chilled soda.",
    price: "₹110",
    image: "assets/images/gallery-5.jpg"
  },
  {
    name: "Cold Brew Coffee Frappe",
    category: "Beverages",
    description: "Rich blended espresso shaken with chilled milk, vanilla bean, and finished with whipped cream.",
    price: "₹130",
    image: "assets/images/gallery-6.jpg"
  },
  {
    name: "Sizzling Brownie with Ice Cream",
    category: "Desserts",
    description: "Decadent dark chocolate fudge brownie served on a cast-iron skillet with vanilla bean gelato.",
    price: "₹160",
    image: "assets/images/menu-1.jpg"
  }
];

function initMenuPage() {
  const container = document.getElementById('menuItemsContainer');
  const filterBtns = document.querySelectorAll('.menu-filter-btn');
  if (!container) return;

  const renderMenu = (filter = 'ALL') => {
    container.innerHTML = '';
    const filteredItems = filter === 'ALL' 
      ? MENU_ITEMS 
      : MENU_ITEMS.filter(item => item.category.toUpperCase() === filter.toUpperCase());

    if (!filteredItems.length) {
      container.innerHTML = `
        <div style="grid-column: 1 / -1; text-align: center; padding: 60px 20px; color: var(--text-muted);">
          <p style="font-size: 1.2rem; margin-bottom: 8px;">No menu items found in this category.</p>
          <p style="font-size: 0.9rem;">Check back soon as we continuously update our specials!</p>
        </div>
      `;
      return;
    }

    filteredItems.forEach(item => {
      const card = document.createElement('div');
      card.className = 'menu-card reveal revealed';
      card.innerHTML = `
        <div class="menu-card-image">
          <img src="${item.image}" alt="${item.name}" loading="lazy" referrerPolicy="no-referrer">
          <span class="menu-card-category-badge">${item.category}</span>
        </div>
        <div class="menu-card-content">
          <div class="menu-card-header">
            <h3 class="menu-card-title">${item.name}</h3>
            <span class="menu-card-price">${item.price}</span>
          </div>
          <p class="menu-card-desc">${item.description}</p>
          <div class="menu-card-footer">
            <button type="button" class="btn btn-secondary btn-sm enquiry-add-btn" data-food-name="${item.name}" data-food-price="${item.price}">
              <svg width="16" height="16" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M12 5v14M5 12h14"></path></svg>
              Enquire Dish
            </button>
            <a href="reservation.html" class="btn btn-primary btn-sm" style="padding: 8px 16px; font-size: 0.8rem;">Dine In</a>
          </div>
        </div>
      `;
      container.appendChild(card);
    });

    // Attach enquiry button listeners
    container.querySelectorAll('.enquiry-add-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const dishName = btn.getAttribute('data-food-name');
        showEnquiryToast(dishName);
      });
    });
  };

  // Initial render
  renderMenu('ALL');

  // Filter button clicks
  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const category = btn.getAttribute('data-filter') || 'ALL';
      renderMenu(category);
    });
  });
}

function showEnquiryToast(dishName) {
  let toast = document.querySelector('.enquiry-toast');
  if (!toast) {
    toast = document.createElement('div');
    toast.className = 'enquiry-toast';
    document.body.appendChild(toast);
  }

  const encodedMsg = encodeURIComponent(`Hi GFC Restaurant, I would like to enquire about ordering / availability of: ${dishName}`);
  toast.innerHTML = `
    <div class="enquiry-toast-icon">
      <svg width="22" height="22" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline></svg>
    </div>
    <div class="enquiry-toast-text">
      Selected <strong>${dishName}</strong>
    </div>
    <a href="https://wa.me/?text=${encodedMsg}" target="_blank" rel="noopener noreferrer" class="enquiry-toast-btn">
      WhatsApp Us
    </a>
  `;

  toast.classList.add('show');
  setTimeout(() => {
    toast.classList.remove('show');
  }, 4500);
}

/* ==========================================================================
   7. GALLERY PAGE FILTERING
   ========================================================================== */
function initGalleryPage() {
  const filterBtns = document.querySelectorAll('.gallery-filter-btn');
  const galleryItems = document.querySelectorAll('.gallery-page-item');
  if (!filterBtns.length || !galleryItems.length) return;

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filter = btn.getAttribute('data-gallery-filter') || 'ALL';

      galleryItems.forEach(item => {
        const itemCategory = item.getAttribute('data-gallery-cat') || '';
        if (filter === 'ALL' || itemCategory.toUpperCase() === filter.toUpperCase()) {
          item.style.display = 'block';
          item.classList.add('revealed');
        } else {
          item.style.display = 'none';
        }
      });
    });
  });
}

/* ==========================================================================
   8. CONTACT FORM VALIDATION
   ========================================================================== */
function initContactForm() {
  const form = document.getElementById('gfcContactForm');
  if (!form) return;

  const alertBox = document.getElementById('contactFormAlert');

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const nameInput = form.querySelector('#contactName');
    const phoneInput = form.querySelector('#contactPhone');
    const emailInput = form.querySelector('#contactEmail');
    const messageInput = form.querySelector('#contactMessage');

    let isValid = true;

    // Validate Name
    if (!nameInput.value.trim() || nameInput.value.trim().length < 2) {
      nameInput.classList.add('is-invalid');
      isValid = false;
    } else {
      nameInput.classList.remove('is-invalid');
    }

    // Validate Phone (10 digits approx)
    const phonePattern = /^[0-9+ -]{7,16}$/;
    if (!phoneInput.value.trim() || !phonePattern.test(phoneInput.value.trim())) {
      phoneInput.classList.add('is-invalid');
      isValid = false;
    } else {
      phoneInput.classList.remove('is-invalid');
    }

    // Validate Email
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailInput.value.trim() || !emailPattern.test(emailInput.value.trim())) {
      emailInput.classList.add('is-invalid');
      isValid = false;
    } else {
      emailInput.classList.remove('is-invalid');
    }

    // Validate Message
    if (!messageInput.value.trim() || messageInput.value.trim().length < 5) {
      messageInput.classList.add('is-invalid');
      isValid = false;
    } else {
      messageInput.classList.remove('is-invalid');
    }

    if (isValid) {
      if (alertBox) {
        alertBox.className = 'form-status-alert success';
        alertBox.innerHTML = `
          <strong>Thank you, ${nameInput.value.trim()}!</strong> Your message has been received.<br>
          Our team in Udayar Vilai will review your enquiry and get back to you shortly.<br>
          <small style="opacity: 0.85; margin-top: 4px; display: block;">(Note: This website is configured with client validation. For instant answers, please contact us directly via phone or WhatsApp).</small>
        `;
        alertBox.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
      }
      form.reset();
    } else {
      if (alertBox) {
        alertBox.className = 'form-status-alert error';
        alertBox.innerHTML = '<strong>Please correct the highlighted errors</strong> before sending your message.';
      }
    }
  });
}

/* ==========================================================================
   9. RESERVATION FORM VALIDATION
   ========================================================================== */
function initReservationForm() {
  const form = document.getElementById('gfcReservationForm');
  if (!form) return;

  const dateInput = form.querySelector('#resDate');
  const alertBox = document.getElementById('reservationAlert');

  // Prevent past dates in date picker
  if (dateInput) {
    const today = new Date().toISOString().split('T')[0];
    dateInput.setAttribute('min', today);
  }

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const nameInput = form.querySelector('#resName');
    const phoneInput = form.querySelector('#resPhone');
    const emailInput = form.querySelector('#resEmail');
    const timeInput = form.querySelector('#resTime');
    const guestsInput = form.querySelector('#resGuests');
    const seatingInput = form.querySelector('#resSeating');
    const requestsInput = form.querySelector('#resRequests');

    let isValid = true;

    // Validate Name
    if (!nameInput.value.trim() || nameInput.value.trim().length < 2) {
      nameInput.classList.add('is-invalid');
      isValid = false;
    } else {
      nameInput.classList.remove('is-invalid');
    }

    // Validate Phone
    const phonePattern = /^[0-9+ -]{7,16}$/;
    if (!phoneInput.value.trim() || !phonePattern.test(phoneInput.value.trim())) {
      phoneInput.classList.add('is-invalid');
      isValid = false;
    } else {
      phoneInput.classList.remove('is-invalid');
    }

    // Validate Email
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailInput.value.trim() || !emailPattern.test(emailInput.value.trim())) {
      emailInput.classList.add('is-invalid');
      isValid = false;
    } else {
      emailInput.classList.remove('is-invalid');
    }

    // Validate Date
    if (!dateInput.value) {
      dateInput.classList.add('is-invalid');
      isValid = false;
    } else {
      dateInput.classList.remove('is-invalid');
    }

    // Validate Time
    if (!timeInput.value) {
      timeInput.classList.add('is-invalid');
      isValid = false;
    } else {
      timeInput.classList.remove('is-invalid');
    }

    if (isValid) {
      const summaryName = nameInput.value.trim();
      const summaryDate = dateInput.value;
      const summaryTime = timeInput.value;
      const summaryGuests = guestsInput ? guestsInput.value : '2';
      const summarySeating = seatingInput ? seatingInput.value : 'Standard';

      const whatsappText = encodeURIComponent(
        `Hello GFC Restaurant, I would like to confirm my table reservation request:\n` +
        `Name: ${summaryName}\n` +
        `Date: ${summaryDate}\n` +
        `Time: ${summaryTime}\n` +
        `Guests: ${summaryGuests}\n` +
        `Seating: ${summarySeating}`
      );

      if (alertBox) {
        alertBox.className = 'form-status-alert success';
        alertBox.innerHTML = `
          <div style="font-size: 1.15rem; font-weight: 700; margin-bottom: 6px; color: #FFF;">
            Table Reservation Requested!
          </div>
          <p style="margin-bottom: 12px; line-height: 1.6;">
            Thank you <strong>${summaryName}</strong>. We have registered your reservation request for 
            <strong>${summaryGuests} guests</strong> on <strong>${summaryDate} at ${summaryTime}</strong> (${summarySeating}).
          </p>
          <div style="background: rgba(0,0,0,0.3); padding: 12px 16px; border-radius: 6px; margin-bottom: 14px; font-size: 0.88rem;">
            <strong>Important:</strong> This is a booking request. Our team at Udayar Vilai will call or message to confirm table availability.
          </div>
          <a href="https://wa.me/?text=${whatsappText}" target="_blank" rel="noopener noreferrer" class="btn btn-primary btn-sm" style="display: inline-flex;">
            Confirm Instantly via WhatsApp
          </a>
        `;
        alertBox.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
      }

      form.reset();
      if (dateInput) {
        const today = new Date().toISOString().split('T')[0];
        dateInput.setAttribute('min', today);
      }
    } else {
      if (alertBox) {
        alertBox.className = 'form-status-alert error';
        alertBox.innerHTML = '<strong>Please complete all required fields</strong> before submitting your reservation request.';
      }
    }
  });
}
