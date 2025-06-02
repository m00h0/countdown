const inputContainer = document.getElementById('input-container');
const countdownForm = document.getElementById('countdownForm');
const dateEl = document.getElementById('date-picker');
const countdownEl = document.getElementById('countdown');

const countdownElTitle = document.getElementById('countdown-title');
const countdownBtn = document.getElementById('countdown-button');
const timeElement = document.querySelectorAll('span');

const completeEl = document.getElementById('complete');
const completeInfo = document.getElementById('complete-info');
const completeBtn = document.getElementById('complete-button');

let countdownTitle = '';
let countdownDate = '';
let countdownValue = Date;
let countdownActive;
let savedCountdown;

const second = 1000;
const minute = second * 60;
const hour = minute * 60;
const day = hour * 24;

// set the date input to today's date

const today = new Date().toISOString().split('T')[0];
dateEl.setAttribute('min', today);

function updateDom() {
  countdownActive = setInterval(() => {
    const now = new Date().getTime();
    const distance = countdownValue - now;
    const days = Math.floor(distance / day);
    const hours = Math.floor((distance % day) / hour);
    const minutes = Math.floor((distance % hour) / minute);
    const seconds = Math.floor((distance % minute) / second);
    // If the countdown has ended
    if (distance < 0) {
      clearInterval(countdownActive);
      countdownEl.hidden = true;
      completeInfo.textContent = `${countdownTitle} finished on ${countdownDate}`;
      completeEl.hidden = false;
      // Show input container again when complete
      inputContainer.hidden = false;
    } else {
      // Update the DOM elements with the countdown values
      countdownElTitle.textContent = `${countdownTitle}`;
      timeElement[0].textContent = `${days}`;
      timeElement[1].textContent = `${hours}`;
      timeElement[2].textContent = `${minutes}`;
      timeElement[3].textContent = `${seconds}`;
      // Hide input container
      inputContainer.hidden = true;
      // Show countdown
      countdownEl.hidden = false;
    }
  }, second);
}

// take value from the date input and set it to the countdownDate variable
function updateCountdown(e) {
  e.preventDefault();
  countdownTitle = e.srcElement[0].value;
  countdownDate = e.srcElement[1].value;
  savedCountdown = {
    title: countdownTitle,
    date: countdownDate,
  };
  localStorage.setItem('countdown', JSON.stringify(savedCountdown));

  if (countdownDate === '') {
    alert('Please select a date for the countdown');
  } else {
    //   get the current date and time
    countdownValue = new Date(countdownDate).getTime();
    updateDom();
  }
}

// Function to reset the countdown
function reset() {
  // Clear the countdown
  clearInterval(countdownActive);
  // Reset values
  countdownTitle = '';
  countdownDate = '';
  countdownValue = Date;
  // Hide countdown
  countdownEl.hidden = true;
  // Hide complete element
  completeEl.hidden = true;
  // Show input container
  inputContainer.hidden = false;
  // Clear the input fields
  localStorage.removeItem('countdown');
}
// Check if there's a saved countdown in localStorage
function checkLocalStorage() {
  if (localStorage.getItem('countdown')) {
    inputContainer.hidden = true;
    savedCountdown = JSON.parse(localStorage.getItem('countdown'));
    countdownTitle = savedCountdown.title;
    countdownDate = savedCountdown.date;
    countdownValue = new Date(countdownDate).getTime();
    updateDom();
  }
}

// Function to update the countdown
countdownForm.addEventListener('submit', updateCountdown);
// Reset the countdown
countdownBtn.addEventListener('click', reset);
completeBtn.addEventListener('click', reset);
// On load, check localStorage
checkLocalStorage();