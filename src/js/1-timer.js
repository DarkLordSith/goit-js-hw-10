import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

const startBtn = document.querySelector('button[data-start]');
const daysEl = document.querySelector('span[data-days]');
const hoursEl = document.querySelector('span[data-hours]');
const minutesEl = document.querySelector('span[data-minutes]');
const secondsEl = document.querySelector('span[data-seconds]');
const dataPicker = document.querySelector('#datetime-picker');

let countdownInterval = null;
let selectedDate = null;
startBtn.disabled = true;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    selectedDate = selectedDates[0];
    if (selectedDate <= new Date()) {
      iziToast.error({
        message: 'Please choose a date in the future',
        position: 'topRight',
      });
      startBtn.disabled = true;
    } else {
      startBtn.disabled = false;
    }
  },
};

flatpickr(dataPicker, options);

startBtn.addEventListener('click', () => {
  startCountdown();
  startBtn.disabled = true;
  dataPicker.disabled = true;
});

function startCountdown() {
  countdownInterval = setInterval(() => {
    const timeRemaining = selectedDate - new Date();

    if (timeRemaining <= 0) {
      clearInterval(countdownInterval);
      iziToast.success({ message: 'Countdown finished', position: 'topRight' });
      updateTimer(0);
      startBtn.disabled = true;
      dataPicker.disabled = false;
      return;
    }
    updateTimer(timeRemaining);
  }, 1000);
}

function updateTimer(time) {
  const { days, hours, minutes, seconds } = convertMs(time);
  daysEl.textContent = addLeadingZero(days);
  hoursEl.textContent = addLeadingZero(hours);
  minutesEl.textContent = addLeadingZero(minutes);
  secondsEl.textContent = addLeadingZero(seconds);
}

function convertMs(ms) {
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  const days = Math.floor(ms / day);
  const hours = Math.floor((ms % day) / hour);
  const minutes = Math.floor(((ms % day) % hour) / minute);
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}

function addLeadingZero(value) {
  return String(value).padStart(2, '0');
}
