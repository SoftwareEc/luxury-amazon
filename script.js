const header = document.getElementById("header");
const menuBtn = document.getElementById("menuBtn");
const nav = document.getElementById("nav");
const navLinks = document.querySelectorAll(".nav a");
const revealElements = document.querySelectorAll(
  ".reveal, .location-info, .fake-map, .whatsapp-card, .newsletter-grid > div, .newsletter form"
);

window.addEventListener("scroll", () => {
  header.classList.toggle("scrolled", window.scrollY > 40);
});

menuBtn.addEventListener("click", () => {
  nav.classList.toggle("open");
  menuBtn.textContent = nav.classList.contains("open") ? "×" : "☰";
});

navLinks.forEach(link => {
  link.addEventListener("click", () => {
    nav.classList.remove("open");
    menuBtn.textContent = "☰";
  });
});

const revealOnScroll = () => {
  revealElements.forEach(element => {
    const elementTop = element.getBoundingClientRect().top;
    const windowHeight = window.innerHeight;

    if (elementTop < windowHeight - 90) {
      element.classList.add("show");
    }
  });
};

window.addEventListener("scroll", revealOnScroll);
window.addEventListener("load", revealOnScroll);

navLinks.forEach(link => {
  link.addEventListener("click", () => {
    navLinks.forEach(item => item.classList.remove("active"));
    link.classList.add("active");
  });
});

const sections = document.querySelectorAll("section[id]");

window.addEventListener("scroll", () => {
  let currentSection = "";

  sections.forEach(section => {
    const sectionTop = section.offsetTop - 130;

    if (window.scrollY >= sectionTop) {
      currentSection = section.getAttribute("id");
    }
  });

  navLinks.forEach(link => {
    link.classList.remove("active");

    if (link.getAttribute("href") === `#${currentSection}`) {
      link.classList.add("active");
    }
  });
});

const cards = document.querySelectorAll(
  ".lodge-card, .experience-card, .gallery-grid img"
);

cards.forEach(card => {
  card.addEventListener("mousemove", e => {
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const rotateX = ((y / rect.height) - 0.5) * -6;
    const rotateY = ((x / rect.width) - 0.5) * 6;

    card.style.transform = `perspective(900px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-6px)`;
  });

  card.addEventListener("mouseleave", () => {
    card.style.transform = "";
  });
});

const newsletterForm = document.querySelector(".newsletter form");

if (newsletterForm) {
  newsletterForm.addEventListener("submit", e => {
    e.preventDefault();

    const input = newsletterForm.querySelector("input");

    if (!input.value.trim()) {
      input.focus();
      return;
    }

    const button = newsletterForm.querySelector("button");
    const originalText = button.textContent;

    button.textContent = "Enviado ✓";
    input.value = "";

    setTimeout(() => {
      button.textContent = originalText;
    }, 2200);
  });
}