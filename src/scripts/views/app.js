/* eslint-disable no-console */
/* eslint-disable class-methods-use-this */
/* eslint-disable no-underscore-dangle */
import DrawerInitiator from '../utils/drawer-initiator';
import UrlParser from '../routes/urlParser';
import Routes from '../routes/routes';

class App {
    constructor({
        button, drawer, menuDrawer, content,
    }) {
        this.button = button;
        this.drawer = drawer;
        this.menuDrawer = menuDrawer;
        this.content = content;

        this._initAppShell();
    }

    _initAppShell() {
        console.log('App shell initialized');

        DrawerInitiator.init({
            button: this.button,
            drawer: this.drawer,
            menuDrawer: this.menuDrawer,
        });
    }

    async renderPage() {
        const url = UrlParser.parseActiveUrlWithCombiner();
        const page = Routes[url];

        this.content.innerHTML = await page.render();

        await page.afterRender();

        const skipToContent = document.getElementById('skipToContent');
        const content = document.getElementById('content');

        skipToContent.addEventListener('click', (event) => {
            event.preventDefault();
            content.focus();
        });
    }
}

export default App;
