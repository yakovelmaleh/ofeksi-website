const config = window.SITE_CONFIG;

const icons = {
  home: `<svg viewBox="0 0 32 32" aria-hidden="true"><path d="m4 14 12-9 12 9v13H4Z"/><path d="M12 27v-8h8v8"/></svg>`,
  chart: `<svg viewBox="0 0 32 32" aria-hidden="true"><path d="M5 27V15M13 27V9M21 27V17M29 27V5"/><path d="M3 27h27"/></svg>`,
  message: `<svg viewBox="0 0 32 32" aria-hidden="true"><path d="M27 21a4 4 0 0 1-4 4H12l-7 4V9a4 4 0 0 1 4-4h14a4 4 0 0 1 4 4Z"/><path d="M10 12h12M10 17h8"/></svg>`
};

document.querySelector("#services-grid").innerHTML = config.services.map((service) => `
  <article class="service-card reveal">
    <div class="service-icon">${icons[service.icon]}</div>
    <div class="service-eyebrow">${service.eyebrow}</div>
    <h3>${service.title}</h3>
    <p>${service.text}</p>
    <ul>${service.points.map((point) => `<li>${point}</li>`).join("")}</ul>
  </article>
`).join("");

document.querySelector("#process-grid").innerHTML = config.process.map((step) => `
  <article class="process-step reveal">
    <div class="step-number">${step.number}</div>
    <h3>${step.title}</h3>
    <p>${step.text}</p>
  </article>
`).join("");

document.querySelector("#reviews-grid").innerHTML = config.testimonials.map((review) => `
  <article class="review-card reveal">
    <div class="review-quote">״</div>
    <div class="review-highlight">${review.highlight}</div>
    <p>${review.text}</p>
    <div class="review-author">${review.name}<span>★★★★★</span></div>
  </article>
`).join("");

const header = document.querySelector(".site-header");
const menuButton = document.querySelector(".menu-toggle");
const nav = document.querySelector(".main-nav");

const updateHeader = () => header.classList.toggle("scrolled", window.scrollY > 20);
updateHeader();
window.addEventListener("scroll", updateHeader, { passive: true });

menuButton.addEventListener("click", () => {
  const open = menuButton.getAttribute("aria-expanded") === "true";
  menuButton.setAttribute("aria-expanded", String(!open));
  nav.classList.toggle("open", !open);
  document.body.classList.toggle("menu-open", !open);
});

nav.querySelectorAll("a").forEach((link) => link.addEventListener("click", () => {
  menuButton.setAttribute("aria-expanded", "false");
  nav.classList.remove("open");
  document.body.classList.remove("menu-open");
}));

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("visible");
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });

document.querySelectorAll(".reveal").forEach((element) => observer.observe(element));

const loan = document.querySelector("#loan");
const years = document.querySelector("#years");
const rate = document.querySelector("#rate");
const loanOutput = document.querySelector("#loan-output");
const yearsOutput = document.querySelector("#years-output");
const rateOutput = document.querySelector("#rate-output");
const monthlyOutput = document.querySelector("#monthly-payment");
const totalOutput = document.querySelector("#total-payment");
const money = new Intl.NumberFormat("he-IL", { maximumFractionDigits: 0 });

function updateRangeBackground(input) {
  const value = ((input.value - input.min) / (input.max - input.min)) * 100;
  input.style.background = `linear-gradient(to left, var(--teal) ${value}%, #d9e5e5 ${value}%)`;
}

function updateCalculator() {
  const principal = Number(loan.value);
  const months = Number(years.value) * 12;
  const monthlyRate = Number(rate.value) / 100 / 12;
  const payment = monthlyRate === 0
    ? principal / months
    : principal * monthlyRate * Math.pow(1 + monthlyRate, months) / (Math.pow(1 + monthlyRate, months) - 1);
  const total = payment * months;

  loanOutput.value = `${money.format(principal)} ₪`;
  yearsOutput.value = `${years.value} שנים`;
  rateOutput.value = `${Number(rate.value).toFixed(1)}%`;
  monthlyOutput.textContent = `${money.format(payment)} ₪`;
  totalOutput.textContent = `סה״כ החזר משוער: ${money.format(total)} ₪`;
  [loan, years, rate].forEach(updateRangeBackground);
}

[loan, years, rate].forEach((input) => input.addEventListener("input", updateCalculator));
updateCalculator();

document.querySelector("#lead-form").addEventListener("submit", (event) => {
  event.preventDefault();
  const data = new FormData(event.currentTarget);
  const message = [
    `היי אמיל, שמי ${data.get("name")}.`,
    `אני מתעניין/ת בנושא: ${data.get("service")}.`,
    `הטלפון שלי: ${data.get("phone")}.`,
    "אשמח לשיחת היכרות."
  ].join("\n");
  window.open(`https://wa.me/${config.contact.whatsapp}?text=${encodeURIComponent(message)}`, "_blank", "noopener,noreferrer");
});

document.querySelector("#year").textContent = new Date().getFullYear();
