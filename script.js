const bubbleContainer = document.querySelector(".bg-bubbles");
const revealElements = document.querySelectorAll(".reveal");
const tiltCards = document.querySelectorAll(".tilt");
const introDialog = document.getElementById("intro-dialog");
const playIntroBtn = document.getElementById("play-intro");
const dialogCloseBtn = document.querySelector(".dialog-close");

const createBubbles = (count = 28) => {
  if (!bubbleContainer) return;
  for (let i = 0; i < count; i++) {
    const bubble = document.createElement("span");
    const size = Math.random() * 40 + 10;
    bubble.style.left = `${Math.random() * 100}%`;
    bubble.style.width = `${size}px`;
    bubble.style.height = `${size}px`;
    bubble.style.animationDuration = `${10 + Math.random() * 12}s`;
    bubble.style.animationDelay = `${Math.random() * 6}s`;
    bubbleContainer.appendChild(bubble);
  }
};

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        observer.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.2 }
);

const attachTilt = () => {
  tiltCards.forEach((card) => {
    card.addEventListener("mousemove", (event) => {
      const rect = card.getBoundingClientRect();
      const offsetX = event.clientX - rect.left;
      const offsetY = event.clientY - rect.top;
      const rotateX = ((offsetY - rect.height / 2) / rect.height) * -10;
      const rotateY = ((offsetX - rect.width / 2) / rect.width) * 10;
      card.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-4px)`;
    });

    card.addEventListener("mouseleave", () => {
      card.style.transform = "rotateX(0deg) rotateY(0deg)";
    });
  });
};

const initDialog = () => {
  if (!introDialog) return;
  playIntroBtn?.addEventListener("click", () => introDialog.showModal());
  dialogCloseBtn?.addEventListener("click", () => introDialog.close());
  introDialog.addEventListener("click", (event) => {
    if (event.target === introDialog) introDialog.close();
  });
};

const attachParallax = () => {
  const hero = document.querySelector(".hero");
  if (!hero) return;
  hero.addEventListener("pointermove", (event) => {
    const rect = hero.getBoundingClientRect();
    const offsetX = (event.clientX - rect.left) / rect.width - 0.5;
    const offsetY = (event.clientY - rect.top) / rect.height - 0.5;
    hero.style.setProperty("--shadow-x", `${offsetX * 30}px`);
    hero.style.setProperty("--shadow-y", `${offsetY * 30}px`);
  });
};

revealElements.forEach((element) => observer.observe(element));
createBubbles();
attachTilt();
attachParallax();
initDialog();

