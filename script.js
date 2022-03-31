const wordElement = document.getElementById("word"),
  wrongLettersElement = document.getElementById("wrong-letters"),
  playAgainButton = document.getElementById("play-button"),
  popup = document.getElementById("popup-container"),
  notification = document.getElementById("notification-container"),
  finalMessage = document.getElementById("final-message"),
  finalMessageRevealWord = document.getElementById("final-message-reveal-word"),
  figureParts = document.querySelectorAll(".figure-part"),
  words = [
    "rome",
    "stockholm",
    "paris",
    "asmara",
    "kristianstad",
    "zagreb",
    "oslo",
    "copenhagen",
    "amesterdam",
  ],
  correctLetters = [],
  wrongLetters = [];

let selectedWord = words[Math.floor(Math.random() * words.length)];

function showHiddenWord() {
  wordElement.innerHTML = `
  ${selectedWord
    .split("")
    .map(
      (letter) => `<span class="letter">
  ${correctLetters.includes(letter) ? letter : ""}</span> `
    )
    .join("")}`;

  const innerWord = wordElement.innerText.replace(/\n/g, "");

  if (innerWord === selectedWord) {
    finalMessage.innerText = "Hurray, You've Won! 🏅🏆";
    popup.style.display = "flex";
  }
}

function updateWrongLettersElement() {
  wrongLettersElement.innerHTML = `
  ${wrongLetters.length > 0 ? "<p>Wrong</p>" : ""}
  ${wrongLetters.map((letter) => `<span>${letter}</span>`)}
  `;

  figureParts.forEach((part, index) => {
    const errors = wrongLetters.length;
    if (index < errors) {
      part.style.display = "block";
    } else {
      part.style.display = "none";
    }
  });

  if (wrongLetters.length === figureParts.length) {
    finalMessage.innerText = "YOU LOST! 💀⚰️";
    finalMessageRevealWord.innerText = `...the word was: ${selectedWord}`;
    popup.style.display = "flex";
  }
}

function showNotification() {
  notification.classList.add("show");

  setTimeout(() => {
    notification.classList.remove("show");
  }, 1500);
}

window.addEventListener("keydown", (e) => {
  // keycode: [65, 90] = [a, z]
  if (e.keyCode >= 65 && e.keyCode <= 90) {
    const letter = e.key;

    if (selectedWord.includes(letter)) {
      if (!correctLetters.includes(letter)) {
        correctLetters.push(letter);
        showHiddenWord();
      } else {
        showNotification();
      }
    } else {
      if (!wrongLetters.includes(letter)) {
        wrongLetters.push(letter);
        updateWrongLettersElement();
      } else {
        showNotification();
      }
    }
  }
});

playAgainButton.addEventListener("click", () => {
  correctLetters.splice(0);
  wrongLetters.splice(0);

  selectedWord = words[Math.floor(Math.random() * words.length)];
  showHiddenWord();
  updateWrongLettersElement();
  popup.style.display = "none";
});

showHiddenWord();
