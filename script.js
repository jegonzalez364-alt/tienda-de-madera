/* ==========================================================================
   GLOBAL MDT - INTERACTIVE LANDING PAGE SCRIPT
   Handles Hero Gallery Carousel, Catalog filtering, WhatsApp Quote Builder, & Lightbox
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
  // Mobile Nav Toggle
  const mobileToggle = document.getElementById('mobileToggle');
  const navMenu = document.getElementById('navMenu');

  if (mobileToggle && navMenu) {
    mobileToggle.addEventListener('click', () => {
      navMenu.style.display = navMenu.style.display === 'flex' ? 'none' : 'flex';
    });
  }

  // ==========================================
  // HERO CAROUSEL GALLERY SLIDER (UN-CROPPED)
  // ==========================================
  const sliderImages = [
    {
      src: "assets/hero-banner-1.jpg",
      title: "Corte de Alto Nivel & Enchape PVC",
      subtitle: "Maquinaria Industrial KOT - +60 Sucursales"
    },
    {
      src: "assets/hero-banner-2.jpg",
      title: "Enchape Automático de Cantos PVC",
      subtitle: "Tecnología de última generación para tableros MDF y Melamina"
    },
    {
      src: "assets/sdasdasdasdasda.jpeg",
      title: "Piezas Listas para Armar",
      subtitle: "Corte y Enchape a la medida con entrega rápida nacional"
    },
    {
      src: "assets/WhatsApp Image 2026-07-24 at 10.59.23 AM.jpeg",
      title: "Producción Moderna para Proyectos Exigentes",
      subtitle: "Optimizamos tu despiece al milímetro"
    },
    {
      src: "assets/WhatsApp Image 2026-07-24 at 10.56.19 AM (47).jpeg",
      title: "Gran Variedad de Melaminas y Tapacantos",
      subtitle: "Tonos amaderados, texturizados y unicolores"
    },
    {
      src: "assets/WhatsApp Image 2026-07-24 at 10.56.19 AM (48).jpeg",
      title: "Catálogo Completo de Insumos para Carpintería",
      subtitle: "Envíos directos a todo el país"
    }
  ];

  const sliderTrack = document.getElementById('heroSliderTrack');
  const sliderDots = document.getElementById('sliderDots');
  const prevBtn = document.getElementById('sliderPrev');
  const nextBtn = document.getElementById('sliderNext');

  let currentSlideIndex = 0;
  let autoSlideTimer = null;

  function initHeroSlider() {
    if (!sliderTrack || !sliderDots) return;

    sliderTrack.innerHTML = sliderImages.map((img, idx) => `
      <div class="hero-slide" data-index="${idx}">
        <img src="${img.src}" alt="${img.title}" class="hero-banner-img" style="cursor: pointer;" title="Haz clic para ampliar">
      </div>
    `).join('');

    sliderDots.innerHTML = sliderImages.map((_, idx) => `
      <div class="slider-dot ${idx === 0 ? 'active' : ''}" data-index="${idx}"></div>
    `).join('');

    // Click to zoom slide image in modal
    document.querySelectorAll('.hero-banner-img').forEach((slideImg, idx) => {
      slideImg.addEventListener('click', () => {
        const item = sliderImages[idx];
        openModal({
          name: item.title,
          image: item.src,
          description: item.subtitle,
          specs: "Imagen del Catálogo Oficial GLOBAL MDT | Resoluci\u00f3n Completa Sin Cortes"
        });
      });
    });

    startAutoSlide();
  }

  function goToSlide(index) {
    if (index < 0) index = sliderImages.length - 1;
    if (index >= sliderImages.length) index = 0;

    currentSlideIndex = index;
    if (sliderTrack) {
      sliderTrack.style.transform = `translateX(-${currentSlideIndex * 100}%)`;
    }

    document.querySelectorAll('.slider-dot').forEach((dot, idx) => {
      dot.classList.toggle('active', idx === currentSlideIndex);
    });
  }

  function startAutoSlide() {
    stopAutoSlide();
    autoSlideTimer = setInterval(() => {
      goToSlide(currentSlideIndex + 1);
    }, 4500);
  }

  function stopAutoSlide() {
    if (autoSlideTimer) clearInterval(autoSlideTimer);
  }

  if (prevBtn) {
    prevBtn.addEventListener('click', () => {
      goToSlide(currentSlideIndex - 1);
      startAutoSlide();
    });
  }

  if (nextBtn) {
    nextBtn.addEventListener('click', () => {
      goToSlide(currentSlideIndex + 1);
      startAutoSlide();
    });
  }

  if (sliderDots) {
    sliderDots.addEventListener('click', (e) => {
      if (e.target.classList.contains('slider-dot')) {
        const idx = parseInt(e.target.dataset.index);
        goToSlide(idx);
        startAutoSlide();
      }
    });
  }

  initHeroSlider();

  // ==========================================
  // CATALOG DATA DEFINITION
  // ==========================================
  const catalogData = [
    {
      id: 1,
      name: "Corte de Alto Nivel KOT - MDF & Melamina",
      category: "servicios",
      image: "assets/hero-banner-1.jpg",
      description: "Servicio de corte con tecnología computarizada KOT. Precisión milimétrica y acabados limpios sin astillamiento.",
      specs: "Formatos hasta 2.44m x 1.83m | Espesores de 9mm a 36mm"
    },
    {
      id: 2,
      name: "Enchape Automático PVC de Alta Resistencia",
      category: "enchape",
      image: "assets/hero-banner-2.jpg",
      description: "Enchapadora industrial con sellado térmico y perfilado de cantos en PVC de 0.4mm, 1mm y 2mm.",
      specs: "Pegado PUR termo-resistente | Protección contra humedad"
    },
    {
      id: 3,
      name: "Piezas Listas para Armar - Despiece CNC",
      category: "servicios",
      image: "assets/sdasdasdasdasda.jpeg",
      description: "Entrega de módulos despachados con cantos enchapados y perforaciones marcadas para montaje exprés.",
      specs: "Optimización por software de corte | Etiquetado por pieza"
    },
    {
      id: 4,
      name: "Producción Moderna para Proyectos Exigentes",
      category: "servicios",
      image: "assets/WhatsApp Image 2026-07-24 at 10.59.23 AM.jpeg",
      description: "Soluciones industriales para arquitectura de interiores, cocinas integrales, clósets y mobiliario comercial.",
      specs: "Garantía de acabado perfecto | Capacidad para alta demanda"
    },
    {
      id: 5,
      name: "Tapacanto PVC Tono Madera Caoba Premium",
      category: "enchape",
      image: "assets/WhatsApp Image 2026-07-24 at 10.56.19 AM (1).jpeg",
      description: "Rollos de tapacanto PVC con textura y vetas naturales para acabados sofisticados.",
      specs: "Anchos: 19mm, 22mm, 45mm | Rollos de 100m y 200m"
    },
    {
      id: 6,
      name: "Lámina Melamina Roble Catedral 18mm",
      category: "melamina",
      image: "assets/WhatsApp Image 2026-07-24 at 10.56.19 AM (13).jpeg",
      description: "Tablero aglomerado recubierto con papel melamínico de alta densidad y textura sincronizada.",
      specs: "Resistencia al rayado | Calibre 18mm | Formato estándar"
    },
    {
      id: 7,
      name: "Lámina Melamina Blanco Absoluto Sólido",
      category: "melamina",
      image: "assets/WhatsApp Image 2026-07-24 at 10.56.19 AM (14).jpeg",
      description: "Melamina blanca mate de alto impacto, ideal para interiores de gabinetes y closets.",
      specs: "Superficie de fácil limpieza | Calibres 15mm y 18mm"
    },
    {
      id: 8,
      name: "Tablero MDF Crudo de Alta Densidad",
      category: "mdf",
      image: "assets/WhatsApp Image 2026-07-24 at 10.56.19 AM (15).jpeg",
      description: "Fibra de madera prensada uniforme para ruteado CNC, lacado y molduras.",
      specs: "Excelente maquinabilidad | Espesores: 5.5mm, 9mm, 12mm, 15mm, 18mm"
    },
    {
      id: 9,
      name: "Rollo Enchape PVC Veta Nogal Oscuro",
      category: "enchape",
      image: "assets/WhatsApp Image 2026-07-24 at 10.56.19 AM (16).jpeg",
      description: "Canto flexible de PVC auto-adherible industrialmente con acabado madera noble.",
      specs: "Grosor 1mm | Resistencia UV e impactos"
    },
    {
      id: 10,
      name: "Melamina Gris Humo Texturizada",
      category: "melamina",
      image: "assets/WhatsApp Image 2026-07-24 at 10.56.19 AM (17).jpeg",
      description: "Tono moderno neutro para mobiliario de oficina y cocina vanguardista.",
      specs: "Antihuella | 18mm grosor"
    }
  ];

  // Render Catalog Items
  const catalogGrid = document.getElementById('catalogGrid');
  const searchInput = document.getElementById('catalogSearchInput');
  const filterBtns = document.querySelectorAll('.filter-btn');

  function renderCatalog(items) {
    if (!catalogGrid) return;
    catalogGrid.innerHTML = items.map(item => `
      <div class="catalog-item" data-id="${item.id}" data-category="${item.category}">
        <div class="item-image-wrap">
          <img src="${item.image}" alt="${item.name}" loading="lazy" />
          <span class="item-category-tag">${item.category}</span>
        </div>
        <div class="item-content">
          <h3 class="item-title">${item.name}</h3>
          <p class="item-desc">${item.description}</p>
          <div class="item-footer">
            <button class="item-action-btn view-details-btn">
              Ver Detalles <i class="fas fa-search-plus"></i>
            </button>
            <a href="https://wa.me/573108511257?text=Hola%20GLOBAL%20MDT,%20me%20interesa%20cotizar:%20${encodeURIComponent(item.name)}" target="_blank" class="item-action-btn" style="color: var(--whatsapp-green);">
              <i class="fab fa-whatsapp"></i> Cotizar
            </a>
          </div>
        </div>
      </div>
    `).join('');

    // Reattach modal click handlers
    document.querySelectorAll('.catalog-item').forEach(card => {
      card.addEventListener('click', (e) => {
        if (!e.target.closest('a')) {
          const id = parseInt(card.dataset.id);
          const product = catalogData.find(p => p.id === id);
          if (product) openModal(product);
        }
      });
    });
  }

  renderCatalog(catalogData);

  // Filter Catalog by Category
  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const cat = btn.dataset.filter;
      if (cat === 'all') {
        renderCatalog(catalogData);
      } else {
        renderCatalog(catalogData.filter(i => i.category === cat));
      }
    });
  });

  // Search Filter
  if (searchInput) {
    searchInput.addEventListener('input', (e) => {
      const term = e.target.value.toLowerCase();
      const filtered = catalogData.filter(i => 
        i.name.toLowerCase().includes(term) || 
        i.description.toLowerCase().includes(term) ||
        i.category.toLowerCase().includes(term)
      );
      renderCatalog(filtered);
    });
  }

  // Lightbox Modal Handling
  const modalOverlay = document.getElementById('modalOverlay');
  const modalImg = document.getElementById('modalImg');
  const modalTitle = document.getElementById('modalTitle');
  const modalDesc = document.getElementById('modalDesc');
  const modalSpecs = document.getElementById('modalSpecs');
  const modalWhatsappLink = document.getElementById('modalWhatsappLink');
  const modalClose = document.getElementById('modalClose');

  function openModal(product) {
    if (!modalOverlay) return;
    modalImg.src = product.image;
    modalTitle.textContent = product.name;
    modalDesc.textContent = product.description;
    modalSpecs.textContent = product.specs;
    modalWhatsappLink.href = `https://wa.me/573108511257?text=Hola%20GLOBAL%20MDT,%20solicito%20informaci%C3%B3n%20y%20cotizaci%C3%B3n%20sobre:%20${encodeURIComponent(product.name)}`;
    modalOverlay.classList.add('active');
  }

  if (modalClose) {
    modalClose.addEventListener('click', () => {
      modalOverlay.classList.remove('active');
    });
  }

  if (modalOverlay) {
    modalOverlay.addEventListener('click', (e) => {
      if (e.target === modalOverlay) {
        modalOverlay.classList.remove('active');
      }
    });
  }

  // Interactive Quote Calculator
  const calcMaterial = document.getElementById('calcMaterial');
  const calcThickness = document.getElementById('calcThickness');
  const calcEdge = document.getElementById('calcEdge');
  const calcQuantity = document.getElementById('calcQuantity');
  const calcTotalDisplay = document.getElementById('calcTotalDisplay');
  const calcSummaryDetails = document.getElementById('calcSummaryDetails');
  const calcWhatsappBtn = document.getElementById('calcWhatsappBtn');

  function updateCalculator() {
    if (!calcMaterial || !calcThickness || !calcEdge || !calcQuantity) return;

    const mat = calcMaterial.options[calcMaterial.selectedIndex].text;
    const thickness = calcThickness.value;
    const edge = calcEdge.options[calcEdge.selectedIndex].text;
    const qty = parseInt(calcQuantity.value) || 1;

    let basePricePerSheet = 120000;
    if (calcMaterial.value === 'melamina-wood') basePricePerSheet = 175000;
    if (calcMaterial.value === 'melamina-color') basePricePerSheet = 160000;
    if (calcMaterial.value === 'mdf-18') basePricePerSheet = 135000;

    let edgeCostPerSheet = 25000;
    if (calcEdge.value === '2-largos') edgeCostPerSheet = 15000;
    if (calcEdge.value === 'sin-enchape') edgeCostPerSheet = 0;

    const totalEstimate = (basePricePerSheet + edgeCostPerSheet) * qty;

    calcTotalDisplay.textContent = `$${totalEstimate.toLocaleString('es-CO')} COP approx.`;
    calcSummaryDetails.innerHTML = `
      <strong>Material:</strong> ${mat} (${thickness})<br>
      <strong>Enchape:</strong> ${edge}<br>
      <strong>Cantidad:</strong> ${qty} lámina(s)<br>
      <em>Incluye optimización de corte de alto nivel en máquina KOT</em>
    `;

    const textMsg = `Hola GLOBAL MDT 👋, me gustaría solicitar una cotización con los siguientes datos:\n- Material: ${mat} (${thickness})\n- Enchape PVC: ${edge}\n- Cantidad: ${qty} láminas\n- Estimado aproximado: $${totalEstimate.toLocaleString('es-CO')} COP.\n\nPor favor confirmar disponibilidad y sucursal de despacho.`;

    calcWhatsappBtn.href = `https://wa.me/573108511257?text=${encodeURIComponent(textMsg)}`;
  }

  [calcMaterial, calcThickness, calcEdge, calcQuantity].forEach(input => {
    if (input) input.addEventListener('change', updateCalculator);
    if (input) input.addEventListener('input', updateCalculator);
  });

  updateCalculator();
});
