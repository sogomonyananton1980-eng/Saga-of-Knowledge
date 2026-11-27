// Интерактивность главной страницы Saga of Knowledge
document.addEventListener("DOMContentLoaded", () => {
  const heroArt = document.querySelector("#hero-art");
  const cppObject = document.querySelector(".cpp-object");
  const menuToggle = document.querySelector(".menu-toggle");
  const nav = document.querySelector(".main-nav");
  const tiltCards = document.querySelectorAll(".tilt-card");
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  // Параллакс 3D-композиции: объект мягко реагирует на положение курсора.
  if (heroArt && cppObject && !reduceMotion && window.matchMedia("(pointer: fine)").matches) {
    heroArt.addEventListener("pointermove", (event) => {
      const rect = heroArt.getBoundingClientRect();
      const x = (event.clientX - rect.left) / rect.width - 0.5;
      const y = (event.clientY - rect.top) / rect.height - 0.5;
      cppObject.style.transform =
        `translate(calc(-50% + ${x * 13}px), calc(-50% + ${y * 13}px)) rotate(${y * -13 - 12}deg) rotateY(${x * 22 - 20}deg)`;
    });

    heroArt.addEventListener("pointerleave", () => {
      cppObject.style.transform = "translate(-50%, -50%) rotate(-12deg) rotateY(-20deg)";
    });
  }

  // Небольшой наклон карточек при наведении на устройствах с мышью.
  if (!reduceMotion && window.matchMedia("(pointer: fine)").matches) {
    tiltCards.forEach((card) => {
      card.addEventListener("pointermove", (event) => {
        const rect = card.getBoundingClientRect();
        const x = (event.clientX - rect.left) / rect.width - 0.5;
        const y = (event.clientY - rect.top) / rect.height - 0.5;
        card.style.transform = `perspective(800px) rotateX(${-y * 4}deg) rotateY(${x * 4}deg) translateY(-2px)`;
      });
      card.addEventListener("pointerleave", () => {
        card.style.transform = "";
      });
    });
  }

  // Мобильное меню.
  if (menuToggle && nav) {
    menuToggle.addEventListener("click", () => {
      const isOpen = nav.classList.toggle("open");
      menuToggle.setAttribute("aria-expanded", String(isOpen));
    });
    nav.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", () => {
        nav.classList.remove("open");
        menuToggle.setAttribute("aria-expanded", "false");
      });
    });
  }

  // Подсветка активного пункта меню в зависимости от прокрутки.
  const sections = document.querySelectorAll("main section[id]");
  const navLinks = document.querySelectorAll(".main-nav a");
  if ("IntersectionObserver" in window) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          navLinks.forEach((link) => {
            link.classList.toggle("active", link.getAttribute("href") === `#${entry.target.id}`);
          });
        }
      });
    }, { rootMargin: "-35% 0px -55% 0px" });
    sections.forEach((section) => observer.observe(section));
  }

  console.log("Saga of Knowledge: интерфейс загружен.");
});
