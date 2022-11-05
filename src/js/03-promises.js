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

const refs = {
  form: document.querySelector('.form'),
  // delayInput: document.querySelector("[name=delay]"),
  // stepInput: document.querySelector("[name=step]"),
  // amountInput: document.querySelector("[name=amount]"),
  // button: document.querySelector('button')
}
refs.form.addEventListener("submit", handleSubmit)

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

        // if (i === 1) {
        //   createPromise(i, formDelay)
        //   console.log(formDelay)
        // } else {
        //   createPromise(i, formDelay + ((i-1) * formStep))
        //   console.log(formDelay + ((i-1) * formStep))
        // }
    
    if (position === 1) {
          createPromise(position, delay)
            .then(({ position, delay }) => {
            console.log(`✅ Fulfilled promise ${position} in ${delay}ms`);
            })
            .catch(({ position, delay }) => {
              console.log(`❌ Rejected promise ${position} in ${delay}ms`);
            });
      } else {
            createPromise(position, delay + ((position - 1) * formStep))
              .then(({ position, delay }) => {
              console.log(`✅ Fulfilled promise ${position} in ${delay}ms`);
            })
            .catch(({ position, delay }) => {
              console.log(`❌ Rejected promise ${position} in ${delay}ms`);
            });
        
          // console.log(delay + ((position - 1) * formStep))
    }
  }
}
