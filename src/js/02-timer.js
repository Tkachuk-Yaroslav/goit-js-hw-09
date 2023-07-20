// Описаний в документації
import flatpickr from "flatpickr";
// Додатковий імпорт стилів
import "flatpickr/dist/flatpickr.min.css";
import Notiflix from "notiflix";
import 'notiflix/dist/notiflix-3.2.6.min.css'

const daysEl = document.querySelector('.value[data-days]');
const hoursEl = document.querySelector('.value[data-hours]');
const minutesEl = document.querySelector('.value[data-minutes]');
const secondsEl = document.querySelector('.value[data-seconds]');
const startBtn = document.querySelector('button[data-start]');
const myInput = document.querySelector('#datetime-picker');
let timerId = null;

startBtn.setAttribute('disabled', true);

function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = Math.floor(ms / day);
  // Remaining hours
  const hours = Math.floor((ms % day) / hour);
  // Remaining minutes
  const minutes = Math.floor(((ms % day) % hour) / minute);
  // Remaining seconds
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}

const addLeadingZero = value => String(value).padStart(2, 0);

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    if (selectedDates[0] < new Date()) {
      // alert('Please choose a date in the future');
      Notiflix.Notify.failure('Please choose a date in the future');
      return;
    }
    startBtn.removeAttribute('disabled');

    const showTimer = () => {
      const now = new Date();
      localStorage.setItem('selectedData', selectedDates[0]);
      const selectData = new Date(localStorage.getItem('selectedData'));

      if (!selectData) return;

      const diff = selectData - now;
      const { days, hours, minutes, seconds } = convertMs(diff);
      daysEl.textContent = addLeadingZero(days);
      hoursEl.textContent = addLeadingZero(hours);
      minutesEl.textContent = addLeadingZero(minutes);
      secondsEl.textContent = addLeadingZero(seconds);

      if (
        daysEl.textContent === '00' &&
        hoursEl.textContent === '00' &&
        minutesEl.textContent === '00' &&
        secondsEl.textContent === '00'
      ) {
        clearInterval(timerId);
      }
    };
    const onClick = () => {
      if (timerId) {
        clearInterval(timerId);
      }
      showTimer();
      timerId = setInterval(showTimer, 1000);
    };
    startBtn.addEventListener('click', onClick);
    // console.log(convertMs(2000)); // {days: 0, hours: 0, minutes: 0, seconds: 2}
    // console.log(convertMs(140000)); // {days: 0, hours: 0, minutes: 2, seconds: 20}
    // console.log(convertMs(24140000)); // {days: 0, hours: 6 minutes: 42, seconds: 20}  
  }
}
flatpickr('#datetime-picker', { ...options });