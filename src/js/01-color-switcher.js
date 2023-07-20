//Для генерування випадкового кольору використовуй функцію getRandomHexColor.

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16).padStart(6, 0)}`;
}

//Напиши скрипт, який після натискання кнопки «Start», 
//раз на секунду змінює колір фону < body > на випадкове 
//значення, використовуючи інлайн стиль.Натисканням на 
//кнопку «Stop» зміна кольору фону повинна зупинятися.

const startBtnEl = document.querySelector("[data-start]");
console.log(startBtnEl);
const stopBtnEl = document.querySelector("[data-stop]");
console.log(stopBtnEl);
const bodyEl = document.querySelector("body");
console.log(bodyEl);

let intervslId = null;

startBtnEl.addEventListener("click", onStartClick);
function onStartClick() {
    intervslId = setInterval(() => {
        const randomBgColor = getRandomHexColor();
        document.body.style.backgroundColor = `${randomBgColor}`;
        console.log(randomBgColor);
    }, 1000);
    //Враховуй, що на кнопку «Start» можна натиснути нескінченну 
    //кількість разів.Зроби так, щоб доки зміна теми запущена, 
    //кнопка «Start» була неактивною(disabled).
    startBtnEl.setAttribute('disabled', true);
    stopBtnEl.removeAttribute('disabled', true);
}

stopBtnEl.addEventListener("click", onStopClick);
function onStopClick() {
    startBtnEl.removeAttribute('disabled', true);
    clearInterval(intervslId);
    stopBtnEl.setAttribute('disabled', true);
}