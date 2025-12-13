document.addEventListener("DOMContentLoaded", () => {
  // =========================================
  // TRANSFORMACIÓN BOT / ALTERNO (ficha derecha)
  // =========================================
  const transformacionTabs = document.querySelectorAll(".transformacion-tab");

  transformacionTabs.forEach((tab) => {
    tab.addEventListener("click", () => {
      const modoSeleccionado = tab.dataset.modo;
      const ficha = tab.closest(".personaje-ficha");
      if (!ficha || !modoSeleccionado) return;

      ficha.querySelectorAll(".transformacion-tab").forEach((t) => {
        t.classList.remove("activo");
        t.setAttribute("aria-selected", "false");
      });

      tab.classList.add("activo");
      tab.setAttribute("aria-selected", "true");

      ficha.querySelectorAll(".personaje-avatar").forEach((fig) => {
        const isActive = fig.dataset.modo === modoSeleccionado;
        fig.classList.toggle("activo", isActive);
      });
    });
  });

  // =========================================
  // LIGHTBOX (Ficha + Habilidades + Galería)
  // =========================================
  const lightbox = document.getElementById("lightbox");
  const lightboxImg = document.getElementById("lightboxImg");
  const lightboxCaption = document.getElementById("lightboxCaption");

  // Si no existe el lightbox en esta página, no hacemos nada (evita errores)
  if (!lightbox || !lightboxImg || !lightboxCaption) return;

  const zoomableImages = document.querySelectorAll(
    ".personaje-ficha .personaje-avatar img, .personaje-media-grid img, #galeria img"
  );

  let lastFocusEl = null;

  function openLightbox(img) {
    if (!img) return;

    lastFocusEl = document.activeElement;

    const src = img.getAttribute("src");
    const alt = img.getAttribute("alt") || "Imagen ampliada";

    lightboxImg.src = src;
    lightboxImg.alt = alt;

    const figure = img.closest("figure");
    const cap = figure ? figure.querySelector("figcaption") : null;
    const capText = cap ? cap.textContent.trim() : alt;

    lightboxCaption.textContent = capText;

    lightbox.classList.add("is-open");
    lightbox.setAttribute("aria-hidden", "false");
    document.body.style.overflow = "hidden";
  }

  function closeLightbox() {
    lightbox.classList.remove("is-open");
    lightbox.setAttribute("aria-hidden", "true");

    // Limpieza (evita “flash”)
    lightboxImg.src = "";
    lightboxImg.alt = "";
    lightboxCaption.textContent = "";

    document.body.style.overflow = "";

    // Devolver foco
    if (lastFocusEl && typeof lastFocusEl.focus === "function") {
      lastFocusEl.focus();
    }
    lastFocusEl = null;
  }

  // Abrir al click (y accesible por teclado si haces las imágenes focusables)
  zoomableImages.forEach((img) => {
    img.addEventListener("click", () => openLightbox(img));
  });

  // Cerrar por backdrop o botón
  lightbox.addEventListener("click", (e) => {
    if (e.target && e.target.hasAttribute("data-lightbox-close")) {
      closeLightbox();
    }
  });

  // Cerrar con ESC
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && lightbox.classList.contains("is-open")) {
      closeLightbox();
    }
  });
});