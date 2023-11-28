let quoteContainer = document.getElementById("quote-text");
let authorContainer = document.getElementById("author-name")
let x = Math.floor(Math.random() * 16);

fetch("https://type.fit/api/quotes")
  .then(function(response) {
    return response.json();
  })
  .then(function(data) {
    console.log(data);
  let ranQuote=data[x].text;
  let ranAuthor=data[x].author;
    let myArray = ranAuthor.split(",");



  quoteContainer.textContent=ranQuote;
  authorContainer.textContent=myArray[0];

  });