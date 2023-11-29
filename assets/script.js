// Pexel API
apiKey = 'le2A6ZGlRehlD4SAz7n3jYlKeXWLWCLnwTzKHbxu6JLZXV8ItBJEtfXV';
const submit = document.getElementById("submitBtn")
const imgContainer = document.getElementById("imgcontainer")

submit.addEventListener("click", getImg)

function getImg(e) {
  e.preventDefault();

  const searchstring = document.getElementById("pexelimg").value
  if (searchstring === "") return;

  const apiUrl = 'https://api.pexels.com/v1/search?query=' + searchstring + '&per_page=8';
  console.log(searchstring);
  fetch(apiUrl, {
    headers: {
      Authorization: apiKey
    }
  })
    .then(response => response.json())
    .then(data => {
      // Process the data returned from the API
      console.log(data)

      const per_page = data.per_page
      const photos = data.photos

      imgContainer.innerHTML = ""
      for (let photo of photos) {
        const img = document.createElement("img")
        img.src = photo.src.medium
        img.alt = photo.alt
        imgContainer.appendChild(img)
      }

    })
    .catch(error => {

      console.error('Error fetching data:', error);
    });
}

// Quote API
  
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
