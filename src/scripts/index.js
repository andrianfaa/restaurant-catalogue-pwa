/* eslint-disable import/order */
/* eslint-disable no-unused-vars */
/* eslint-disable import/no-extraneous-dependencies */
import 'regenerator-runtime/runtime';
import './component';
import '../styles/root.scss';
import swRegister from './utils/swRegister';
import App from './views/app';
import 'lazysizes';
import 'lazysizes/plugins/parent-fit/ls.parent-fit';

const app = new App({
    button: document.querySelector('.navbar__toggle'),
    drawer: document.querySelector('.navbar__menu'),
    menuDrawer: document.querySelector('.navbar__menu-list'),
    content: document.getElementById('root'),
});

window.addEventListener('load', () => {
    swRegister();
    app.renderPage();
});

window.addEventListener('hashchange', () => {
    app.renderPage();
});
