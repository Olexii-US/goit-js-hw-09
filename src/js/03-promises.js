import { Notify } from 'notiflix/build/notiflix-notify-aio';

function createPromise(position, delay) {
  const shouldResolve = Math.random() > 0.3;

  const promise = new Promise((resolve, reject) => {
    setTimeout(() => {
      if (shouldResolve) {
        resolve({ position, delay}) 
    // Fulfill
      } else {
        reject({ position, delay}) 
    // Reject
        }
    }, delay); 
  });
  return promise
}
const formDataSend = {};

const formRef = document.querySelector('.form')

formRef.addEventListener("submit", handleSubmit)

function handleSubmit(evt) {
  evt.preventDefault();
  const submitFormData = new FormData(evt.currentTarget)
    submitFormData.forEach((value, name) => {
        formDataSend[name] = value;        
    });  
  
  const delay = Number(formDataSend.delay)
  const formStep = Number(formDataSend.step)
  const formAmount = Number(formDataSend.amount)

  for (let position = 1; position <= formAmount; position += 1){
    if (position === 1) {
          createPromise(position, delay)
            .then(({ position, delay }) => {
              Notify.success(`✅ Fulfilled promise ${position} in ${delay}ms`);
            // console.log(`✅ Fulfilled promise ${position} in ${delay}ms`);
            })
            .catch(({ position, delay }) => {
              Notify.failure(`❌ Rejected promise ${position} in ${delay}ms`);
              // console.log(`❌ Rejected promise ${position} in ${delay}ms`);
            });
      } else {
            createPromise(position, delay + ((position - 1) * formStep))
              .then(({ position, delay }) => {
                Notify.success(`✅ Fulfilled promise ${position} in ${delay}ms`);
              // console.log(`✅ Fulfilled promise ${position} in ${delay}ms`);
            })
              .catch(({ position, delay }) => {
              Notify.failure(`❌ Rejected promise ${position} in ${delay}ms`);
              // console.log(`❌ Rejected promise ${position} in ${delay}ms`);
            });
    }
  }
  // evt.currentTarget.reset();
}
