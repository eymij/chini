document.addEventListener("DOMContentLoaded", () => {
  const overlay = document.getElementById("start-overlay");
  const music = document.getElementById("bg-music");

  const startApp = () => {
    if (music) {
      music.play().catch((e) => console.warn("Audio play failed:", e));
    }
    overlay.style.display = "none";
    document.removeEventListener("click", startApp);
  };

  document.addEventListener("click", startApp);
});

function createHeart() {
  const heart = document.createElement("div");
  heart.className = "floating-heart";
  heart.style.left = Math.random() * 100 + "vw";
  heart.style.animationDuration = 2 + Math.random() * 3 + "s"; // 2–5s
  document.getElementById("heart-container").appendChild(heart);

  setTimeout(() => {
    heart.remove();
  }, 5000);
}

setInterval(createHeart, 500);

/** floating and add music */
document.addEventListener("DOMContentLoaded", () => {
  const bgMusic = document.getElementById("bg-music");
  const extraMusic = document.getElementById("extra-music");
  const trigger = document.getElementById("trigger-extra");

  const overlay = document.getElementById("start-overlay");

  const startApp = () => {
    fadeAudio(bgMusic, 0.5, 1, 1000); // fade in slowly
    bgMusic.play().catch(err => console.warn("BG music failed to play", err));
    overlay.style.display = "none";
    document.removeEventListener("click", startApp);
  };

  document.addEventListener("click", startApp);

  trigger.addEventListener("click", () => {
    if (!extraMusic.paused) return;

    // Floating emojis!
    for (let i = 0; i < 15; i++) {
      createEmoji();
    }

    // Fade out BG music
    fadeAudio(bgMusic, 1, 0, 1000);
    setTimeout(() => bgMusic.pause(), 1000);

    // Play extra music
    extraMusic.currentTime = 0;
    extraMusic.volume = 0;
    extraMusic.play().then(() => {
      fadeAudio(extraMusic, 0, 1, 1000);
    });

    // On end, fade back to BG music
    extraMusic.addEventListener("ended", () => {
      fadeAudio(extraMusic, 1, 0, 1000);
      extraMusic.pause();
      bgMusic.volume = 0;
      bgMusic.play().then(() => fadeAudio(bgMusic, 0, 1, 1000));
    }, { once: true });
  });

  // Fading helper
  function fadeAudio(audio, from, to, duration) {
    const stepTime = 50;
    const steps = duration / stepTime;
    let currentStep = 0;
    const volumeStep = (to - from) / steps;

    audio.volume = from;
    const fadeInterval = setInterval(() => {
      currentStep++;
      audio.volume = Math.min(Math.max(0, audio.volume + volumeStep), 1);
      if (currentStep >= steps) clearInterval(fadeInterval);
    }, stepTime);
  }

  // Floating emoji creator
  function createEmoji() {
    const emojiList = ["😎", "😛", "🤸", "🍩", "🦟"];
    const emoji = document.createElement("div");
    emoji.className = "floating-emoji";
    emoji.innerText = emojiList[Math.floor(Math.random() * emojiList.length)];
    emoji.style.left = Math.random() * 100 + "vw";
    emoji.style.animationDuration = 5 + Math.random() * 10 + "s";
    document.body.appendChild(emoji);

    setTimeout(() => emoji.remove(), 5000);
  }
});

/*rate*/

