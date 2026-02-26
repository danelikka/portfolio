const root = document.documentElement;
const themeBtn = document.getElementById("themeBtn");
const yearEl = document.getElementById("year");
const copyBtn = document.getElementById("copyBtn");
const mailtoLink = document.getElementById("mailtoLink");

yearEl.textContent = String(new Date().getFullYear());

function setTheme(next) {
  root.dataset.theme = next;
  localStorage.setItem("theme", next);
  themeBtn.textContent = next === "light" ? "🌞" : "🌙";
}

const saved = localStorage.getItem("theme");
if (saved === "light" || saved === "dark") setTheme(saved);
else setTheme("dark");

themeBtn.addEventListener("click", () => {
  const current = root.dataset.theme || "dark";
  setTheme(current === "dark" ? "light" : "dark");
});

copyBtn.addEventListener("click", async () => {
  const name = document.getElementById("name").value.trim();
  const email = document.getElementById("email").value.trim();
  const msg = document.getElementById("message").value.trim();

  const text =
`Ім'я: ${name || "-"}
Email: ${email || "-"}
Повідомлення:
${msg || "-"}`;

  try {
    await navigator.clipboard.writeText(text);
    copyBtn.textContent = "Скопійовано ✅";
    setTimeout(() => (copyBtn.textContent = "Скопіювати текст в буфер"), 1400);
  } catch {
    alert("Не вдалось скопіювати. Спробуй вручну 🙂");
  }

  const subject = encodeURIComponent("Hello");
  const body = encodeURIComponent(text);
  mailtoLink.href = `mailto:bogdanka1833@icloud.com?subject=${subject}&body=${body}`;
});