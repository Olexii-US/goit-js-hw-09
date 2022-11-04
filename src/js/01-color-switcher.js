function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}

const refs = {
    startButton: document.querySelector("button[data-start]"),
    stopButton: document.querySelector("button[data-stop]")
}

refs.startButton.addEventListener('click', onColorChange) 
refs.stopButton.addEventListener('click', stopColorChange) 
let timerId = null;
refs.stopButton.setAttribute('disabled', '')

function onColorChange() {
    timerId = setInterval(() => {
        document.body.style.backgroundColor = getRandomHexColor()
    }, 1000);

    refs.startButton.toggleAttribute('disabled')
    refs.stopButton.toggleAttribute('disabled')
    
    // refs.startButton.setAttribute('disabled', '')
    // refs.stopButton.removeAttribute('disabled', '')
}

function stopColorChange() {
    clearInterval(timerId)

    refs.startButton.toggleAttribute('disabled')
    refs.stopButton.toggleAttribute('disabled')
    // refs.stopButton.setAttribute('disabled', '')
    // refs.startButton.removeAttribute('disabled', '')
}

