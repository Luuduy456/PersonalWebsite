const toggleBtn = document.getElementById('theme-toggle');
const body = document.body;
const icon= document.getElementById('toggle-icon');
//Load the save theme
if (localStorage.getItem('theme') === 'dark') {
  body.classList.add('dark-mode');
  icon.textContent='🌙';
}
  toggleBtn.addEventListener('click', () => {
  body.classList.toggle('dark-mode');

  if (body.classList.contains('dark-theme')) {
    icon.textContent ='🌙';
    localStorage.setItem('theme', 'dark');
  } else {icon.textContent ='🌞';
    localStorage.setItem('theme',  'light');
  }
});

async function loadPost() {
  const res = await fetch('Data/posts.json');
  const posts = await res.json()
  const loadContainer= document.getElementById("post-list");

  posts.array.forEach(post => {
    const article = document.createElement('article');
    article.innerHTML =`
    <h2>${post.title}</h2>
    <p><em>${post.date}</em></p>
    <p>${post.sumary}</p>`;
    loadContainer.appendChild(article);
  });
}
document.addEventListener('DOMContentLoaded', loadPost)