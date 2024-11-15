const nav = document.querySelector(".nav"),
  searchIcon = document.querySelector("#searchIcon"),
  navOpenBtn = document.querySelector(".nav-open-btn"),
  navCloseBtn = document.querySelector(".nav-close-btn");

searchIcon.addEventListener("click", () => {
  nav.classList.toggle("open-search");
  nav.classList.remove("open-nav");
  if (nav.classList.contains("open-search")) {
    return searchIcon.classList.replace("uil-search", "uil-times");
  }
  searchIcon.classList.replace("uil-times", "uil-search");
});

navOpenBtn.addEventListener("click", () => {
  nav.classList.add("open-nav");
  nav.classList.remove("open-search");
  searchIcon.classList.replace("uil-times", "uil-search");
});

navCloseBtn.addEventListener("click", () => {
  nav.classList.remove("open-nav");
});
