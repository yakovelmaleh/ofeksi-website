const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
const finePointer = window.matchMedia("(pointer: fine)");
const portrait = document.querySelector(".portrait-card");

if (portrait && finePointer.matches && !reducedMotion.matches) {
  let frame;
  let targetX = 0;
  let targetY = 0;
  let currentX = 0;
  let currentY = 0;

  function renderTilt() {
    currentX += (targetX - currentX) * 0.14;
    currentY += (targetY - currentY) * 0.14;
    portrait.style.transform = `rotateX(${currentY}deg) rotateY(${currentX}deg)`;

    if (Math.abs(targetX - currentX) > 0.01 || Math.abs(targetY - currentY) > 0.01) {
      frame = requestAnimationFrame(renderTilt);
    }
  }

  portrait.addEventListener("pointermove", (event) => {
    const bounds = portrait.getBoundingClientRect();
    const x = (event.clientX - bounds.left) / bounds.width - 0.5;
    const y = (event.clientY - bounds.top) / bounds.height - 0.5;
    targetX = x * -4;
    targetY = y * 4;
    cancelAnimationFrame(frame);
    frame = requestAnimationFrame(renderTilt);
  });

  portrait.addEventListener("pointerleave", () => {
    targetX = 0;
    targetY = 0;
    cancelAnimationFrame(frame);
    frame = requestAnimationFrame(renderTilt);
  });
}

document.querySelectorAll(".button, .menu-toggle, .whatsapp-float").forEach((control) => {
  control.addEventListener("pointerdown", (event) => {
    if (control.setPointerCapture) {
      control.setPointerCapture(event.pointerId);
    }
    control.dataset.pressed = "true";
  });

  const release = () => delete control.dataset.pressed;
  control.addEventListener("pointerup", release);
  control.addEventListener("pointercancel", release);
});
