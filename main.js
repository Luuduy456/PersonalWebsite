// Theme toggle logic
const toggleBtn = document.getElementById("theme-toggle");
const body = document.body;
const icon = document.getElementById("toggle-icon");

if (localStorage.getItem("theme") === "dark") {
  body.classList.add("dark-mode");
  icon.textContent = "🌙";
}
toggleBtn.addEventListener("click", () => {
  body.classList.toggle("dark-mode");
  if (body.classList.contains("dark-mode")) {
    icon.textContent = "🌙";
    localStorage.setItem("theme", "dark");
  } else {
    icon.textContent = "🌞";
    localStorage.setItem("theme", "light");
  }
});

// Blog posts data
const posts = [
  {
    title: "My First Post",
    date: "June 29th 2025",
    sumary: "This is my first post on this blog. Hope you enjoy it!",
    tags: ["introduction", "welcome"],
    links: [
      { text: "Read more", url: "post1.html" },
    
    ],
  },
  {
    title: "Learning JavaScript",
    date: "July 5th 2025",
    sumary: "JavaScript is a versatile programming language.",
    tags: ["JavaScript", "programming"],
    links: [
      { text: "Read more", url: "post2.html" },
      { text: "View code", url: "https://github.com/username/repo/blob/main/post2.js" }],
  },
];

// Render posts to the DOM
function renderPosts(postArray = posts) {
  const postContainer = document.getElementById("post-list");
  postContainer.innerHTML = "";
  postArray.forEach((post) => {
    const article = document.createElement("article");
    const tagHtml = post.tags
      .map((tag) => `<span class="tag" data-tag="${tag}">${tag}</span>`)
      .join(" ");
    const linksHtml = post.links
      ? post.links
          .map(
            (link) => `<a href="${link.url}" class="post-link">${link.text}</a>`
          )
          .join(" ")
      : "";
    article.innerHTML = `<h2>${post.title}</h2>
    <p><em>${post.date}</em></p>
    <p>${post.sumary}</p>
    <div class="tags">${tagHtml}</div>
     <div class="post-links">${linksHtml}</div>`;
    postContainer.appendChild(article);
  });
  enableTagFiltering();
}

// Enable tag filtering on click
function enableTagFiltering() {
  const allTags = document.querySelectorAll(".tag");
  allTags.forEach((tag) => {
    tag.addEventListener("click", () => {
      const tagName = tag.dataset.tag;
      const filtered = posts.filter((post) => post.tags.includes(tagName));
      renderPosts(filtered);
    });
  });
}

// Search by tag
const searchBtn = document.getElementById("search-button");
const searchInput = document.getElementById("tag-search");
searchBtn.addEventListener("click", () => {
  const tagName = searchInput.value.trim().toLowerCase();
  if (!tagName) return;
  const filtered = posts.filter((post) =>
    post.tags.some((tag) => tag.toLowerCase() === tagName)
  );
  renderPosts(filtered);
});
searchInput.addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    searchBtn.click();
  }
});

// Initial render
document.addEventListener("DOMContentLoaded", function () {
  if (typeof renderPosts === "function") {
    renderPosts();
  }
});
