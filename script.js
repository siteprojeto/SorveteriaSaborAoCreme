
/* =========================================
   SORVETERIA SABOR AO CREME
   JAVASCRIPT
   ========================================= */

document.addEventListener("DOMContentLoaded", () => {

  /* =========================================
     1. CONFIGURAÇÕES DA SORVETERIA
     ========================================= */

  const CONFIG = {
    // Preencha quando o número oficial for confirmado.
    // Formato: 55 + DDD + número, somente números.
    whatsapp: "",

    instagram: "https://www.instagram.com/saboraocreme0218/",

    // Confirme se este é o perfil oficial antes de publicar.
    facebook: "",

    endereco:
      "Avenida Antônio Raminelli, 475 - Parque Residencial Ana Rosa, Cambé - PR, 86183-392"
  };


  /* =========================================
     2. ELEMENTOS DO SITE
     ========================================= */

  const menuToggle = document.querySelector(".menu-toggle");
  const navigation = document.querySelector(".navigation");

  const navLinks = document.querySelectorAll(
    ".navigation a, .footer-nav a"
  );

  const yearElement = document.querySelector("#current-year");
  const whatsappElements = document.querySelectorAll(
    "[data-whatsapp], .whatsapp-float"
  );

  const instagramElements = document.querySelectorAll(
    "[data-instagram]"
  );

  const facebookElements = document.querySelectorAll(
    "[data-facebook]"
  );


  /* =========================================
     3. ANO AUTOMÁTICO NO RODAPÉ
     ========================================= */

  if (yearElement) {
    yearElement.textContent = new Date().getFullYear();
  }


  /* =========================================
     4. MENU RESPONSIVO
     ========================================= */

  function closeMenu() {
    if (!menuToggle || !navigation) return;

    navigation.classList.remove("is-open");

    menuToggle.setAttribute("aria-expanded", "false");
    menuToggle.setAttribute("aria-label", "Abrir menu");
  }

  if (menuToggle && navigation) {

    menuToggle.setAttribute("aria-expanded", "false");
    menuToggle.setAttribute("aria-label", "Abrir menu");

    menuToggle.addEventListener("click", () => {
      const isOpen = navigation.classList.toggle("is-open");

      menuToggle.setAttribute(
        "aria-expanded",
        String(isOpen)
      );

      menuToggle.setAttribute(
        "aria-label",
        isOpen ? "Fechar menu" : "Abrir menu"
      );
    });

    // Fecha o menu ao selecionar uma seção.
    navigation.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", closeMenu);
    });

    // Fecha o menu ao pressionar Escape.
    document.addEventListener("keydown", (event) => {
      if (event.key === "Escape") {
        closeMenu();
      }
    });

    // Fecha o menu quando a tela muda para computador.
    window.addEventListener("resize", () => {
      if (window.innerWidth > 820) {
        closeMenu();
      }
    });

    // Fecha o menu ao clicar fora dele.
    document.addEventListener("click", (event) => {
      const clickedInsideMenu = navigation.contains(event.target);
      const clickedToggle = menuToggle.contains(event.target);

      if (!clickedInsideMenu && !clickedToggle) {
        closeMenu();
      }
    });
  }


  /* =========================================
     5. ROLAGEM SUAVE
     ========================================= */

  navLinks.forEach((link) => {
    link.addEventListener("click", (event) => {
      const href = link.getAttribute("href");

      if (!href || !href.startsWith("#")) return;

      const target = document.querySelector(href);

      if (!target) return;

      event.preventDefault();

      target.scrollIntoView({
        behavior: window.matchMedia(
          "(prefers-reduced-motion: reduce)"
        ).matches ? "auto" : "smooth",
        block: "start"
      });

      // Atualiza a seção na URL.
      history.replaceState(null, "", href);
    });
  });


  /* =========================================
     6. CONFIGURAÇÃO DO WHATSAPP
     ========================================= */

  function configureWhatsApp() {
    const phone = String(CONFIG.whatsapp).replace(/\D/g, "");

    whatsappElements.forEach((element) => {

      if (!phone) {
        // Não deixa um link "#" fingir que funciona.
        element.setAttribute("href", "#");

        element.addEventListener("click", (event) => {
          event.preventDefault();

          alert(
            "O WhatsApp da sorveteria ainda precisa ser configurado. " +
            "Adicione o número oficial no arquivo script.js."
          );
        });

        return;
      }

      const message = encodeURIComponent(
        "Olá! Gostaria de saber mais sobre a Sorveteria Sabor Ao Creme."
      );

      element.href =
        `https://wa.me/${phone}?text=${message}`;

      element.target = "_blank";
      element.rel = "noopener noreferrer";
    });
  }

  configureWhatsApp();


  /* =========================================
     7. INSTAGRAM
     ========================================= */

  instagramElements.forEach((element) => {
    element.href = CONFIG.instagram;
    element.target = "_blank";
    element.rel = "noopener noreferrer";
  });


  /* =========================================
     8. FACEBOOK
     ========================================= */

  facebookElements.forEach((element) => {
    if (!CONFIG.facebook) {
      element.addEventListener("click", (event) => {
        event.preventDefault();

        alert(
          "Adicione o link oficial do Facebook no arquivo script.js."
        );
      });

      return;
    }

    element.href = CONFIG.facebook;
    element.target = "_blank";
    element.rel = "noopener noreferrer";
  });


  /* =========================================
     9. BOTÕES DE LOCALIZAÇÃO
     ========================================= */

  const mapsURL =
    "https://www.google.com/maps/search/?api=1&query=" +
    encodeURIComponent(CONFIG.endereco);

  document.querySelectorAll("[data-maps]").forEach((element) => {
    element.href = mapsURL;
    element.target = "_blank";
    element.rel = "noopener noreferrer";
  });


  /* =========================================
     10. IMPEDE LINKS VAZIOS
     ========================================= */

  document.querySelectorAll('a[href="#"]').forEach((link) => {

    // Links com funcionalidades próprias são tratados acima.
    if (
      link.hasAttribute("data-whatsapp") ||
      link.hasAttribute("data-facebook")
    ) {
      return;
    }

    link.addEventListener("click", (event) => {
      event.preventDefault();
    });
  });


  /* =========================================
     11. ANO E FUNCIONALIDADES FINALIZADOS
     ========================================= */

  console.log(
    "Sorveteria Sabor Ao Creme: JavaScript carregado."
  );

});
        
