import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";
import { Notify } from 'notiflix/build/notiflix-notify-aio';

const refs = {
  input: document.querySelector("#datetime-picker"),
  button: document.querySelector('button[data-start]'),
  days: document.querySelector('span[data-days]'),
  hours: document.querySelector('span[data-hours]'),
  minutes: document.querySelector('span[data-minutes]'),
  seconds: document.querySelector('span[data-seconds]')
}
refs.button.setAttribute('disabled', '')

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    const selectedTime = selectedDates[0].getTime();

    if (selectedTime < Date.now()) {
      return Notify.failure("Please choose a date in the future")
    }
    refs.button.removeAttribute('disabled')
    onButtonClick(selectedTime)
  },
};

flatpickr(refs.input, options);

function onButtonClick(selectTime) {
  refs.button.addEventListener('click', () => {
    refs.button.setAttribute('disabled', '')

    const timerId = setInterval(() => {      
      if (selectTime <= Date.now()) {
        Notify.success("The countdown is over ")
        return clearInterval(timerId)
      } 
      const timerSeconds = selectTime - Date.now();
      const renderTime = convertMs(timerSeconds)
      updateTimer(renderTime)
    }, 1000)  
    ///// for  Notiflix  //////
    timerDuration(selectTime)
})
}
function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = addLeadingZero(Math.floor(ms / day));
  // Remaining hours
  const hours = addLeadingZero(Math.floor((ms % day) / hour));
  // Remaining minutes
  const minutes = addLeadingZero(Math.floor(((ms % day) % hour) / minute));
  // Remaining seconds
  const seconds = addLeadingZero(Math.floor((((ms % day) % hour) % minute) / second));

  return { days, hours, minutes, seconds };
}

function addLeadingZero(value) {
  return String(value).padStart(2, '0')
}

function updateTimer({ days, hours, minutes, seconds }) {
  refs.days.textContent = `${days}`;
  refs.hours.textContent = `${hours}`;
  refs.minutes.textContent = `${minutes}`;
  refs.seconds.textContent = `${seconds}`;
}

//////////////////  for  Notiflix //////////////////////

function timerDuration(selectTime) {
  const duration = selectTime - Date.now()
  const timerDuration = convertMs(duration)
  return timerDurationMarkup(timerDuration)
}

function timerDurationMarkup({ days, hours, minutes, seconds }) {
  Notify.info(`You set the timer for ${days} days, ${hours} hours, ${minutes} minutes, ${seconds} seconds!`)
}