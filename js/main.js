// Mobile navigation toggle
document.addEventListener("DOMContentLoaded", function () {
  // Initialize AOS (Animate on Scroll)
  if (typeof AOS !== "undefined") {
    AOS.init({
      duration: 800,
      once: false,
      offset: 100,
    });
  } else {
    // Fallback wenn AOS nicht verfügbar ist:
    // Elemente sichtbar machen, die normalerweise durch AOS animiert werden
    document.querySelectorAll("[data-aos]").forEach(function (el) {
      el.style.opacity = "1";
      el.style.transform = "none";
    });
  }

  const mobileMenuButton = document.getElementById("mobile-menu-button");
  const closeMobileMenuButton = document.getElementById("close-mobile-menu");
  const mobileNav = document.getElementById("mobile-nav");

  if (mobileMenuButton && mobileNav) {
    mobileMenuButton.addEventListener("click", function () {
      mobileNav.classList.toggle("hidden");
      document.body.classList.toggle("overflow-hidden");
    });
  }

  // Close mobile menu when clicking the X button
  if (closeMobileMenuButton && mobileNav) {
    closeMobileMenuButton.addEventListener("click", function () {
      mobileNav.classList.add("hidden");
      document.body.classList.remove("overflow-hidden");
    });
  }

  // Close mobile nav when clicking on links
  const mobileNavLinks = document.querySelectorAll(".mobile-nav-link");
  mobileNavLinks.forEach((link) => {
    link.addEventListener("click", function () {
      mobileNav.classList.add("hidden");
      document.body.classList.remove("overflow-hidden");
    });
  });

  // Kontaktformular Button Smooth-Scroll
  const contactFormButton = document.getElementById("contact-form-button");
  if (contactFormButton) {
    contactFormButton.addEventListener("click", function () {
      const formElement = document.getElementById("kontakt-formular");
      if (formElement) {
        formElement.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });

        // Optional: Highlight-Effekt für das Formular
        formElement.classList.add("highlight-form");
        setTimeout(() => {
          formElement.classList.remove("highlight-form");
        }, 1500);
      }
    });
  }

  // Add smooth scrolling for anchor links
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault();

      const targetId = this.getAttribute("href");
      if (targetId !== "#") {
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
          window.scrollTo({
            top: targetElement.offsetTop - 80, // Adjust for header height
            behavior: "smooth",
          });
        }
      }
    });
  });

  // Scroll to top button
  const scrollTopBtn = document.getElementById("scroll-top");
  if (scrollTopBtn) {
    window.addEventListener("scroll", function () {
      if (window.pageYOffset > 300) {
        scrollTopBtn.classList.add("active");
      } else {
        scrollTopBtn.classList.remove("active");
      }
    });

    scrollTopBtn.addEventListener("click", function () {
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    });
  }

  // Bildergalerie Modal Funktionalität
  const galleryItems = document.querySelectorAll(".gallery-item");
  const modal = document.getElementById("gallery-modal");
  const modalImage = document.getElementById("modal-image");
  const modalClose = document.getElementById("modal-close");

  if (galleryItems.length > 0 && modal && modalImage) {
    galleryItems.forEach((item) => {
      item.addEventListener("click", function () {
        const imgSrc = this.querySelector("img").getAttribute("src");
        const imgAlt = this.querySelector("img").getAttribute("alt");

        modalImage.setAttribute("src", imgSrc);
        modalImage.setAttribute("alt", imgAlt);

        modal.classList.add("active");
        document.body.classList.add("overflow-hidden");
      });
    });

    // Schließen des Modals
    if (modalClose) {
      modalClose.addEventListener("click", function () {
        modal.classList.remove("active");
        document.body.classList.remove("overflow-hidden");
      });
    }

    // Schließen des Modals durch Klick außerhalb des Bildes
    modal.addEventListener("click", function (e) {
      if (e.target === modal) {
        modal.classList.remove("active");
        document.body.classList.remove("overflow-hidden");
      }
    });

    // Schließen des Modals mit Escape-Taste
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape" && modal.classList.contains("active")) {
        modal.classList.remove("active");
        document.body.classList.remove("overflow-hidden");
      }
    });
  }

  // FAQ Toggle Functionality
  const faqToggles = document.querySelectorAll(".faq-toggle");
  if (faqToggles.length > 0) {
    faqToggles.forEach((toggle) => {
      toggle.addEventListener("click", () => {
        const faqItem = toggle.closest("div");
        const content = faqItem.querySelector(".faq-content");
        const icon = toggle.querySelector("i");

        // Toggle the active state
        content.classList.toggle("hidden");
        content.classList.toggle("open");

        // Rotate the icon
        if (icon) {
          if (content.classList.contains("open")) {
            icon.style.transform = "rotate(180deg)";
          } else {
            icon.style.transform = "rotate(0)";
          }
        }
      });
    });
  }

  // Process Steps Interactive Effects
  const processSteps = document.querySelectorAll(".process-step");

  if (processSteps.length > 0) {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("active");
            entry.target.style.opacity = "1";
          }
        });
      },
      { threshold: 0.5 }
    );

    processSteps.forEach((step, index) => {
      // Add slight staggered delay for hover effect
      step.addEventListener("mouseenter", () => {
        const icon = step.querySelector(".process-icon");
        if (icon) {
          icon.style.transform = "scale(1.1) translateY(-5px)";
          icon.style.boxShadow = "0 15px 25px -5px rgba(255, 0, 0, 0.4)";
        }
      });

      step.addEventListener("mouseleave", () => {
        const icon = step.querySelector(".process-icon");
        if (icon) {
          icon.style.transform = "";
          icon.style.boxShadow = "";
        }
      });

      // Set initial opacity
      step.style.opacity = "0.4";
      step.style.transition = "opacity 0.5s ease, transform 0.3s ease";

      // Add to the observer
      observer.observe(step);
    });
  }
});
