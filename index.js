let words = [];
const par = document.querySelector("#paragraph");
const parRus = document.querySelector("#paragraph-rus");

fetch("./russian.txt")
  .then((response) => {
    renderLoading(true); // Показываем сообщение о загрузке перед началом загрузки
    return response.arrayBuffer();
  })
  .then((buffer) => {
    const decoder = new TextDecoder("windows-1251");
    const text = decoder.decode(buffer);
    words = text.split(/\s+/);
    console.log(words);
    renderLoading(false); // Скрываем сообщение о загрузке после завершения загрузки
  })
  .catch((error) => {
    renderLoading(false); // Скрываем сообщение о загрузке в случае ошибки
    console.error("Ошибка при загрузке файла:", error);
  });

function changeText() {
  if (words.length > 0) {
    const num = getRandomInt(0, 99);
    const wordFirst = getRandomWord(0, 765732);
    const wordSecond = getRandomWord(765732, 1531464);
    const specSymbol = getRandomSpecialSymbol();
    parRus.textContent = generateText(num, wordFirst, wordSecond, specSymbol);
    par.textContent = generateText(
      num,
      transliterate(wordFirst),
      transliterate(wordSecond),
      specSymbol
    );
  } else {
    par.textContent = "Загрузка словаря...";
  }
}

function getRandomWord(start, end) {
  return words[getRandomInt(start, end)];
}

function generateText(num, word1, word2, symbol) {
  return `${num}${capitalizeFirstLetter(word1)}${capitalizeFirstLetter(
    word2
  )}${symbol}`;
}

function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function transliterate(word) {
  const russianLetters = "абвгдеёжзийклмнопрстуфхцчшщъыьэюя";
  const englishTransliteration = {
    а: "a",
    б: "b",
    в: "v",
    г: "g",
    д: "d",
    е: "e",
    ё: "yo",
    ж: "zh",
    з: "z",
    и: "i",
    й: "y",
    к: "k",
    л: "l",
    м: "m",
    н: "n",
    о: "o",
    п: "p",
    р: "r",
    с: "s",
    т: "t",
    у: "u",
    ф: "f",
    х: "h",
    ц: "ts",
    ч: "ch",
    ш: "sh",
    щ: "sch",
    ъ: "",
    ы: "y",
    ь: "'",
    э: "e",
    ю: "yu",
    я: "ya",
  };

  return word
    .split("")
    .map((letter, index) => {
      const lowerCaseLetter = letter.toLowerCase();
      if (russianLetters.includes(lowerCaseLetter)) {
        const transliteratedLetter = englishTransliteration[lowerCaseLetter];
        return index === 0
          ? transliteratedLetter.toUpperCase()
          : transliteratedLetter;
      }
      return letter;
    })
    .join("");
}

function getRandomSpecialSymbol() {
  const specialSymbols = "!@#$%&*()-_=+?";
  const randomIndex = Math.floor(Math.random() * specialSymbols.length);
  return specialSymbols[randomIndex];
}

function capitalizeFirstLetter(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

// Функция для отображения сообщения о загрузке
const renderLoading = (isLoading) => {
  if (isLoading) {
    par.textContent = "Загрузка словаря...";
    // parRus.textContent = "Загрузка словаря...";
  } else {
    par.textContent = ""; // Очищаем сообщение
    parRus.textContent = ""; // Очищаем сообщение
  }
};

const btn = document.querySelector("#btn");
btn.addEventListener("click", changeText);
