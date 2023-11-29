let quoteContainer = document.getElementById("quote-text");
let authorContainer = document.getElementById("author-name")
let newRandom = document.getElementById('new-random');
let loadQuote = localStorage.getItem("quote");
let loadAuthor = localStorage.getItem("author");

quoteContainer.textContent = loadQuote;
authorContainer.textContent = loadAuthor;

function randomQuote() {
  fetch("https://type.fit/api/quotes")
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      console.log(data);
      let x = Math.floor(Math.random() * data.length);
      let ranQuote = data[x].text;
      let ranAuthor = data[x].author;
      let myArray = ranAuthor.split(",");
      quoteContainer.textContent = ranQuote;
      authorContainer.textContent = myArray[0];
      localStorage.setItem("quote", ranQuote);
      localStorage.setItem("author", myArray[0]);
    });
}

newRandom.addEventListener('click', randomQuote);