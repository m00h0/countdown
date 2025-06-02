const inputContainer = document.getElementById('input-container');
const countdownForm = document.getElementById('countdownForm');
const dateEl = document.getElementById('date-picker');
const countdownEl = document.getElementById('countdown');
const countdownElTitle = document.getElementById('countdown-title');
const countdownBtn = document.getElementById('countdown-button');
const tomeElement = document.querySelectorAll('span');

let countdownTitle = '';
let countdownDate = '';
let countdownValue = Date;

const second = 1000;
const minute = second * 60;
const hour =  minute * 60;
const day = hour * 24;

// set the date input to today's date

const today = new Date().toISOString().split('T')[0];
dateEl.setAttribute('min', today);

function updateDom() {
  const now = new Date().getTime();
  const distance = countdownValue - now;
  console.log('Distance:', distance);

  const days = Math.floor(distance / day);
  const hours = Math.floor((distance % day) / hour);
  const minutes = Math.floor((distance % hour) / minute);
  const seconds = Math.floor((distance % minute) / second);
  console.log('Days:', days, 'Hours:', hours, 'Minutes:', minutes, 'Seconds:', seconds);

  // Update the DOM elements with the countdown values
  countdownElTitle.textContent = `${countdownTitle}`;
  tomeElement[0].textContent = `${days}`;
  tomeElement[1].textContent = `${hours}`;
  tomeElement[2].textContent = `${minutes}`;
  tomeElement[3].textContent = `${seconds}`;
  // Hide input container
  inputContainer.hidden = true;
  // Show countdown
  countdownEl.hidden = false;
}
// take value from the date input and set it to the countdownDate variable
function updateCountdown(e) {
  e.preventDefault();
  countdownTitle = e.srcElement[0].value;
  countdownDate = e.srcElement[1].value;
  console.log('Countdown Title:', countdownTitle);
//   get the current date and time
  countdownValue = new Date(countdownDate).getTime();
  console.log('Countdown Value:', countdownValue);
  updateDom();
}

// Function to update the countdown
countdownForm.addEventListener('submit', updateCountdown);