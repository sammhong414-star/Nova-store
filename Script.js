const searchInput = document.getElementById("searchInput");
const apps = document.querySelectorAll(".app-card");

function filterApps(query) {
  const q = query.toLowerCase().trim();

  apps.forEach(app => {
    const name = (app.dataset.name + " " + app.dataset.category).toLowerCase();
    app.hidden = !name.includes(q);
  });
}

searchInput.addEventListener("input", () => {
  filterApps(searchInput.value);
});

document.querySelectorAll("[data-search]").forEach(button => {
  button.addEventListener("click", () => {
    searchInput.value = button.dataset.search;
    filterApps(button.dataset.search);
  });
});

const toast = document.getElementById("toast");

function showToast(message) {
  toast.textContent = message;
  toast.classList.add("show");

  setTimeout(() => {
    toast.classList.remove("show");
  }, 2600);
}

document.querySelectorAll("[data-app]").forEach(button => {
  button.addEventListener("click", () => {
    showToast(button.dataset.app + " is a sample listing. Downloads are coming later.");
  });
});

document.getElementById("themeGlow").addEventListener("click", () => {
  document.body.classList.toggle("extra-glow");
});

document.getElementById("menuBtn").addEventListener("click", () => {
  document.querySelector(".desktop-nav").classList.toggle("menu-open");
});

const ideaForm = document.getElementById("ideaForm");
const ideaList = document.getElementById("ideaList");

document.querySelectorAll("[data-vote]").forEach(button => {
  button.addEventListener("click", () => {
    const count = button.querySelector("b");
    count.textContent = Number(count.textContent) + 1;
    button.disabled = true;
  });
});

ideaForm.addEventListener("submit", event => {
  event.preventDefault();

  const title = document.getElementById("ideaTitle").value.trim();
  const category = document.getElementById("ideaCategory").value;
  const description = document.getElementById("ideaDescription").value.trim();

  if (!title || !category || !description) return;

  const card = document.createElement("article");
  card.className = "idea-card";

  const heading = document.createElement("h4");
  heading.textContent = title;

  const paragraph = document.createElement("p");
  paragraph.textContent = description;

  const label = document.createElement("span");
  label.className = "idea-category";
  label.textContent = category.toUpperCase();

  card.append(label, heading, paragraph);
  ideaList.prepend(card);

  ideaForm.reset();

  document.getElementById("ideaFeedback").textContent =
    "Your idea has been added to this local preview!";
});
