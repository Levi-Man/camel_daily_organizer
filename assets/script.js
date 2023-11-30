// Pexel API
apiKey = 'le2A6ZGlRehlD4SAz7n3jYlKeXWLWCLnwTzKHbxu6JLZXV8ItBJEtfXV';
const submit = document.getElementById("submitBtn")
const imgContainer = document.getElementById("imgcontainer")

// Journal entry variable declarations
var journalForm = document.querySelector("#journal-form");
var greatfull1 = document.querySelector("#greatfull1");
var greatfull2 = document.querySelector("#greatfull2");
var greatfull3 = document.querySelector("#greatfull3");
var goalsl1 = document.querySelector("#goalsl1");
var goalsl2 = document.querySelector("#goalsl2");
var goalsl3 = document.querySelector("#goalsl3");
var logMyJournal = document.querySelector("#log-my-journal");
var myJournal = {
  greatfull: [],
  goals: []
};




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
  console.log(apiURL);
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

//* add new list item

//function newTask(params) {
// let li = document.createElement("li");
// let inputValue = document.getElementById("task_input").value;
// let listText = 
//}

function initMyJournal() {
  var storedMyJournal = JSON.parse(localStorage.getItem("myJournal"));
  if (storedMyJournal !== null && (storedMyJournal.greatfull.length > 0 || storedMyJournal.goals.length > 0)) {
    myJournal = storedMyJournal;
  }
  renderMyJournal();
}

function storeMyJournal() {
  localStorage.setItem("myJournal", JSON.stringify(myJournal));
}

function renderMyJournal() {
  greatfull1.value = myJournal.greatfull[0] || "";
  greatfull2.value = myJournal.greatfull[1] || "";
  greatfull3.value = myJournal.greatfull[2] || "";
  goalsl1.value = myJournal.goals[0] || "";
  goalsl2.value = myJournal.goals[1] || "";
  goalsl3.value = myJournal.goals[2] || "";
}

journalForm.addEventListener("submit", function (event) {
  event.preventDefault();

  myJournal.greatfull.push(greatfull1.value);
  myJournal.greatfull.push(greatfull2.value);
  myJournal.greatfull.push(greatfull3.value);
  myJournal.goals.push(goalsl1.value);
  myJournal.goals.push(goalsl2.value);
  myJournal.goals.push(goalsl3.value);
  storeMyJournal();
  renderMyJournal();
});

function myJournalSubmit(triggerEvent) {
    myJournal.greatfull[0] = greatfull1.value;
    myJournal.greatfull[1] = greatfull2.value;
    myJournal.greatfull[2] = greatfull3.value;
    myJournal.goals[0] = goalsl1.value;
    myJournal.goals[1] = goalsl2.value;
    myJournal.goals[2] = goalsl3.value;
    storeMyJournal();
    renderMyJournal();
};

journalForm.addEventListener("submit", function(event){
  event.preventDefault();
  myJournalSubmit(event);
});

journalForm.addEventListener("keydown", function(event){
  if(event.code == "Enter") {
    event.preventDefault();
    myJournalSubmit(event);
  } 
});

initMyJournal();