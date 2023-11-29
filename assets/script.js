// Pexel API
apiKey = 'le2A6ZGlRehlD4SAz7n3jYlKeXWLWCLnwTzKHbxu6JLZXV8ItBJEtfXV';
const submit = document.getElementById("submitBtn")
const imgContainer = document.getElementById("imgcontainer")
let soloImage = document.getElementById("solo-image");

let dataImage = localStorage.getItem("imgData");
console.log(dataImage);
soloImage.src = dataImage

//modal for pexel search
document.addEventListener('DOMContentLoaded', () => {
  // Functions to open and close a modal
  function openModal($el) {
    $el.classList.add('is-active');
  }

  function closeModal($el) {
    $el.classList.remove('is-active');
  }

  function closeAllModals() {
    (document.querySelectorAll('.modal') || []).forEach(($modal) => {
      closeModal($modal);
    });
  }

  // Add a click event on buttons to open a specific modal
  (document.querySelectorAll('.js-modal-trigger') || []).forEach(($trigger) => {
    const modal = $trigger.dataset.target;
    const $target = document.getElementById(modal);

    $trigger.addEventListener('click', () => {
      openModal($target);
    });
  });

  // Add a click event on various child elements to close the parent modal
  (document.querySelectorAll('.modal-background, .modal-close, .modal-card-head .delete, .modal-card-foot .button') || []).forEach(($close) => {
    const $target = $close.closest('.modal');

    $close.addEventListener('click', () => {
      closeModal($target);
    });
  });

  // Add a keyboard event to close all modals
  document.addEventListener('keydown', (event) => {
    if (event.code === 'Escape') {
      closeAllModals();
    }
  });
});

submit.addEventListener("click", getImg)

function getImg(e) {
  e.preventDefault();

  const searchstring = document.getElementById("pexelimg").value
  if (searchstring === "") return;

  const apiUrl = 'https://api.pexels.com/v1/search?query=' + searchstring + '&per_page=8';
  console.log(searchstring);
  // console.log(apiURL);
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
        img.src = photo.src.tiny
        img.alt = photo.alt
        imgContainer.appendChild(img)
        
        //click to add photo to solo-image on main page
        img.addEventListener("click", changeImage)

        function changeImage(e) {
          console.log(e.target);
          soloImage.src=photo.src.medium;
          console.log(soloImage.src);

          //save image to local storage as base64
          // imgData = convertBase64(soloImage);
          localStorage.setItem("imgData", photo.src.medium);

          // function convertBase64(img) {
          //   let canvas = document.createElement("canvas");
          //   canvas.width = img.width;
          //   canvas.height = img.height;
          //   let ctx = canvas.getContext("2d");
          //   ctx.drawImage(img, 0, 0);
          //   let dataURL = canvas.toDataURL("image/png");
          //   return dataURL.replace(/^data:image\/(png|jpg);base64,/,"");
          // }
        }
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


// clock widget

let time = document.getElementById('time')
let day = document.getElementById('day')
let monthYear = document.getElementById('monthly')

function getTime(params) {
  let timeCalc = dayjs().format('HH:mm');
  time.textContent = timeCalc;
}

function getDay(params) {
  let dayCalc = dayjs().format("dddd");
  day.textContent = dayCalc;
}

function getMonthYear(params) {
  let monthYearCalc = dayjs().format('MMM D, YYYY');
  monthYear.textContent = monthYearCalc;
}

getTime();
getDay();
getMonthYear();

// to do list
let taskList = document.getElementById("task_list")
let addButton = document.getElementById("task_add")
let clearButton = document.getElementById("clear_task")

// add new list item

// function newTask(params) {
//   let li = document.createElement("li");
//   let inputValue = document.getElementById("task_input").value;
//   let listText = 
// }