// Mobile navigation toggle
document.addEventListener("DOMContentLoaded", function () {
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
});
