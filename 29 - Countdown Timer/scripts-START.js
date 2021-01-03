let countdown;

const timerDisplay = document.querySelector('.display__time-left');
const endTime = document.querySelector('.display__end-time');
const buttons = document.querySelectorAll('[data-time]')


const timer = (seconds) => {
    clearInterval(countdown)
    const now = Date.now()
    const then = now + seconds * 1000
    displayEndTime(then)
    displayTimeLeft(seconds)


    countdown = setInterval(() => {
        let secondsLeft = Math.round((then - Date.now()) / 1000)
        if (secondsLeft < 1){
            clearInterval(countdown)
        } 
        displayTimeLeft(secondsLeft)
    }, 1000)
}

const displayTimeLeft = (seconds) => {
    const minutes = Math.floor(seconds / 60)
    const remainderSeconds = seconds % 60;
    const display = `${minutes}:${remainderSeconds < 10 ? '0' : ''}${remainderSeconds}`
    document.title = display;
    timerDisplay.textContent = display;
}

const displayEndTime = (timestamp) => {
    const end = new Date(timestamp);
    const endHours = end.getHours();
    const endMinutes = end.getMinutes();
    const endDisplay = `${endHours > 12 ? endHours - 12 : endHours}:${endMinutes < 10 ? "0" + endMinutes: endMinutes}`
    endTime.textContent = `Be back at ${endDisplay}`
}

const startTimer = (e) => {
    const seconds = parseInt(e.target.dataset.time);
    timer(seconds)
}

buttons.forEach(button => button.addEventListener('click', startTimer))

document.customForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const mins = e.target.minutes.value
    timer(mins*60)
    e.target.reset();
})