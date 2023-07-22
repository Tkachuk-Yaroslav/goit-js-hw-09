import Notiflix from "notiflix";
import 'notiflix/dist/notiflix-3.2.6.min.css'


//Напиши скрипт, який на момент сабміту форми викликає функцію 
//createPromise(position, delay) стільки разів, скільки ввели в 
//поле amount.Під час кожного виклику передай їй номер промісу
//(position), що створюється, і затримку, враховуючи першу 
//затримку(delay), введену користувачем, і крок(step).
const formEl = document.querySelector(".form");
const dilayInputEl = document.querySelector('input[name="delay"]');
const stepInputEl = document.querySelector('input[name="step"]');
const amountInputEl = document.querySelector('input[name="amount"]');
let dilay = null;
let step = null;
let amount = null;
// console.log(formEl);

function onFormSubmit(event) {
  //заборонив перезагрузку
  event.preventDefault();

  //знайшов введені значення
  dilay = Number(dilayInputEl.value); 
  step = Number(stepInputEl.value); 
  amount = Number(amountInputEl.value); 
  // console.log(dilay);
  // console.log(step);
  // console.log(amount);

  //перевіряю на введення некоректних даних
  if (dilay < 0 || step < 0 || amount <= 0) {
    Notiflix.Notify.failure(`Please enter a correct value`);
    return;
  }

  //роблю цикл який створює проміси
  for (let i = 1; i <= amount; i += 1) {
    //початкова позиція 1
    let position = i;
    createPromise(position, dilay)
      //обробка позитивного результату
      .then(({ position, dilay }) => {
        Notiflix.Notify.success(`Fulfilled promise ${position} in ${dilay}ms`);
      })
      //обробка негативного результату
      .catch(({ position, dilay }) => {
        Notiflix.Notify.failure(`Rejected promise ${position} in ${dilay}ms`);
      });
    //оновлюю ділей
    dilay += step;
  }
  //очистка форми
  formEl.reset();
}

formEl.addEventListener("submit", onFormSubmit);

function createPromise(position, dilay) {
  //функція повертає проміс
  return new Promise((resolve, reject) => {
    const shouldResolve = Math.random() > 0.3;

    setTimeout(() => {
      if (shouldResolve) {
        resolve({ position, dilay });
      }

      reject({ position, dilay });
    }, dilay);
  });
}
