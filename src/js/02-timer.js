import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";

const refs = {
    input: document.querySelector("#datetime-picker")
}

console.log(refs.input)

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
      console.log(selectedDates[0]);

  },
};
flatpickr(refs.input, options);









// function getData(callback) {
//     console.log(selectedDates)

// }

// getData(options.onClose.bind(options))

// // console.log(options.onClose.bind(options))

