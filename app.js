const quotes = [
  { text: "The future depends on what you do today.", author: "Mahatma Gandhi" },
  { text: "It always seems impossible until it is done.", author: "Nelson Mandela" },
  { text: "Success is the sum of small efforts repeated day in and day out.", author: "Robert Collier" },
  { text: "What you seek is seeking you.", author: "Rumi" },
  { text: "Be yourself; everyone else is already taken.", author: "Oscar Wilde" },
  { text: "The only way to do great work is to love what you do.", author: "Steve Jobs" },
  { text: "Believe you can and you're halfway there.", author: "Theodore Roosevelt" },
  { text: "Life is what happens while you're busy making other plans.", author: "John Lennon" },
  { text: "The secret of getting ahead is getting started.", author: "Mark Twain" },
  { text: "In the middle of difficulty lies opportunity.", author: "Albert Einstein" }
];

const quoteCard = document.querySelector(".quote-card");
const quoteText = document.getElementById("quoteText");
const quoteAuthor = document.getElementById("quoteAuthor");
const newQuoteButton = document.getElementById("newQuoteButton");
const copyButton = document.getElementById("copyButton");
const copyLabel = document.getElementById("copyLabel");
const themeButton = document.getElementById("themeButton");
const quoteCount = document.getElementById("quoteCount");

let currentIndex = 0;
let displayCount = 1;

function renderQuote(index) {
  quoteText.textContent = quotes[index].text;
  quoteAuthor.textContent = quotes[index].author;
}

function showNextQuote() {
  quoteCard.classList.add("changing");
  window.setTimeout(() => {
    let nextIndex;
    do {
      nextIndex = Math.floor(Math.random() * quotes.length);
    } while (nextIndex === currentIndex && quotes.length > 1);

    currentIndex = nextIndex;
    displayCount += 1;
    renderQuote(currentIndex);
    quoteCount.textContent = `No. ${displayCount}`;
    quoteCard.classList.remove("changing");
  }, 180);
}

async function copyQuote() {
  const text = `"${quotes[currentIndex].text}" — ${quotes[currentIndex].author}`;
  try {
    await navigator.clipboard.writeText(text);
    copyLabel.textContent = "Copied";
  } catch {
    copyLabel.textContent = "Copy failed";
  }
  window.setTimeout(() => {
    copyLabel.textContent = "Copy";
  }, 1800);
}

function toggleTheme() {
  document.body.classList.toggle("dark");
  const isDark = document.body.classList.contains("dark");
  localStorage.setItem("quote-theme", isDark ? "dark" : "light");
  themeButton.setAttribute("aria-label", isDark ? "Switch to light mode" : "Switch to dark mode");
}

newQuoteButton.addEventListener("click", showNextQuote);
copyButton.addEventListener("click", copyQuote);
themeButton.addEventListener("click", toggleTheme);

if (localStorage.getItem("quote-theme") === "dark") {
  document.body.classList.add("dark");
  themeButton.setAttribute("aria-label", "Switch to light mode");
}

renderQuote(currentIndex);
