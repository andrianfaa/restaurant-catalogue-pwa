/* eslint-disable no-underscore-dangle */
const DrawerInitiator = {
    init({ button, drawer, menuDrawer }) {
        this._button = button;
        this._drawer = drawer;
        this._menuDrawer = menuDrawer;

        button.addEventListener('click', (event) => {
            this._toggleDrawer(event);
        });

        drawer.addEventListener('click', (event) => {
            this._closeDrawer(event);
        });

        menuDrawer.addEventListener('click', (event) => event.stopPropagation());
    },

    _toggleDrawer(event) {
        event.target.classList.add('open');
        this._drawer.classList.add('open');
    },

    _closeDrawer(event) {
        event.stopPropagation();
        this._drawer.classList.remove('open');
        this._button.classList.remove('open');
    },
};

export default DrawerInitiator;
