import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

const form = document
  .querySelector('.snackbar-form')
  .addEventListener('submit', e => {
    e.preventDefault();

    const delay = Number(e.target.elements.delay.value);
    const state = e.target.elements.state.value;

    createPromise(delay, state)
      .then(delay => {
        iziToast.success({
          title: 'OK',
          message: `Fulfilled promise in ${delay}ms`,
          position: 'topRight',
          titleColor: '#fff',
          messageColor: '#fff',
          backgroundColor: '#59a10d',
          progressBarColor: '#b5ea7c',
        });
      })
      .catch(delay => {
        iziToast.error({
          title: 'Error',
          message: `Rejected promise in ${delay}ms`,
          position: 'topRight',
          titleColor: '#fff',
          messageColor: '#fff',
          backgroundColor: '#ef4040',
          progressBarColor: '#ffbebe',
        });
      });
  });

function createPromise(delay, state) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (state === 'fulfilled') {
        resolve(delay);
      } else {
        reject(delay);
      }
    }, delay);
  });
}
