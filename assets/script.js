// Pexel API
apiKey = 'le2A6ZGlRehlD4SAz7n3jYlKeXWLWCLnwTzKHbxu6JLZXV8ItBJEtfXV';
const submit = document.getElementById("submitBtn")
const imgContainer = document.getElementById("imgcontainer")



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

function loadTime() {
  let time = document.getElementById('time')
  let day = document.getElementById('day')
  let monthYear = document.getElementById('monthly')

  function getTime() {
    let timeCalc = dayjs().format('HH:mm');
    time.textContent = timeCalc;
  }

  function getDay() {
    let dayCalc = dayjs().format("dddd");
    day.textContent = dayCalc;
  }

  function getMonthYear() {
    let monthYearCalc = dayjs().format('MMM D, YYYY');
    monthYear.textContent = monthYearCalc;
  }

  getTime();
  getDay();
  getMonthYear();
}

loadTime();
setInterval(loadTime, 1000);

// To Do List

let taskInput = document.getElementById('task_input')
let addButton = document.getElementById('task_add')
let taskList = document.getElementById('task_list')
let clearButton = document.getElementById('clear_button')

let tasks = []

// render tasks
function renderTasks() {
  taskList.innerHTML = "";

  // makes new task li
  for (let i = 0; i < tasks.length; i++) {
    const task = tasks[i];
    
    let li = document.createElement("li")
    li.textContent = task;
    li.classList.add("is-clickable", "notification", "is-warning", "mb-3", "p-2")
    li.setAttribute('data-index', i);

    var button = document.createElement("button");
    button.className = "delete"
    // button.setAttribute("clear_task")

    li.appendChild(button)
    taskList.appendChild(li)
  }
}

//changes color when clicked


function loadTasks() {
  // Get tasks from localStorage
  var taskStorage = JSON.parse(localStorage.getItem("tasks"));

  // updates the task array
  if (taskStorage !== null) {
    tasks = taskStorage;
  }

  renderTasks();
}

function saveTasks() {
  // Stringify and set key in localStorage to todos array
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

// adds the submitted value to the list
addButton.addEventListener("click", function(event) {
  event.preventDefault();

  var taskText = taskInput.value.trim();

  // Return from function early if submitted todoText is blank
  if (taskText === "") {
    return;
  }

  // Add new todoText to todos array, clear the input
  tasks.push(taskText);
  taskInput.value = "";

  // Store updated todos in localStorage, re-render the list
  saveTasks();
  loadTasks();
});

// Add click event delete tasks
taskList.addEventListener("click", function(event) {
  var element = event.target;

  // Checks if element is a button
  if (element.matches("button") === true) {
    // Get its data-index value and remove the todo element from the list
    var index = element.parentElement.getAttribute("data-index");
    tasks.splice(index, 1);

    // Store updated todos in localStorage, re-render the list
    saveTasks();
    renderTasks();
  }
});

clearButton.addEventListener('click', function () {
  localStorage.removeItem('tasks');
  taskList.innerHTML="";
})

loadTasks();
