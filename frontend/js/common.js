function initLayout() {
  requireAuth();
  const user = getUser();

  const dateChip = document.getElementById("topbar-date");
  if (dateChip) {
    const d = new Date();
    dateChip.textContent = d.toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric" });
  }

  const adminName = document.getElementById("admin-name");
  const adminShop = document.getElementById("admin-shop");
  const adminInitial = document.getElementById("admin-initial");
  const shopNameEls = document.querySelectorAll(".shop-name-slot");

  if (user) {
    if (adminName) adminName.textContent = user.display_name || "Admin";
    if (adminShop) adminShop.textContent = user.shop_name || "The Jojan";
    if (adminInitial) adminInitial.textContent = (user.display_name || "A").charAt(0).toUpperCase();
    shopNameEls.forEach(el => { el.textContent = user.shop_name || "The Jojan"; });
  }

  const logoutLinks = document.querySelectorAll(".js-logout");
  logoutLinks.forEach(link => {
    link.addEventListener("click", (e) => {
      e.preventDefault();
      doLogout();
    });
  });

  const menuBtn = document.getElementById("mobile-menu-btn");
  const appShell = document.getElementById("app-shell");
  if (menuBtn && appShell) {
    menuBtn.addEventListener("click", () => {
      appShell.classList.toggle("sidebar-open");
    });
    appShell.addEventListener("click", (e) => {
      if (appShell.classList.contains("sidebar-open") && !e.target.closest(".sidebar") && !e.target.closest("#mobile-menu-btn")) {
        appShell.classList.remove("sidebar-open");
      }
    });
  }
}

document.addEventListener("DOMContentLoaded", initLayout);
