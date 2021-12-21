/* eslint-disable global-require */
/* eslint-disable no-console */
const swRegister = () => {
    if ('serviceWorker' in navigator) {
        navigator.serviceWorker.register('/sw.js')
            .then((reg) => {
                console.log('Service worker registered!', reg);
            })
            .catch((err) => {
                console.log('Service worker registration failed: ', err);
            });

        navigator.serviceWorker.addEventListener('message', (event) => {
            console.log('Service worker message: ', event.data);
        });
    }
};

export default swRegister;
