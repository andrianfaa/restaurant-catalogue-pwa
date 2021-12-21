/* eslint-disable no-underscore-dangle */
import RestaurantDBSource from '../../data/RestaurantDBSource';

const HomePage = {
    async render() {
        return `
            <hero-section></hero-section>
            <div class="content-container container" id="content" tabindex="0">
                <h2>Restaurants</h2>
                <div id="listRestaurant" class="card-container"></div>
            </div>
        `;
    },

    async afterRender() {
        this._renderLoading();
        const restaurants = await RestaurantDBSource.getRestaurants();

        if (restaurants && restaurants.error === false) {
            this._renderPage(restaurants.restaurants);
        } else {
            this._renderError();
        }
    },

    async _renderPage(restaurants) {
        const listContainer = document.getElementById('listRestaurant');
        listContainer.innerHTML = '';

        restaurants.forEach((restaurant) => {
            listContainer.innerHTML += `<card-item 
                name="${restaurant.name}"
                picture-id="${restaurant.pictureId}"
                desc="${restaurant.description}"
                id="${restaurant.id}"
                rating="${restaurant.rating}"
                city="${restaurant.city}"
                >
            </card-item>`;
        });
    },

    async _renderLoading() {
        const listContainer = document.getElementById('listRestaurant');
        listContainer.innerHTML = `
            <card-item-loading></card-item-loading>
            <card-item-loading></card-item-loading>
            <card-item-loading></card-item-loading>
        `;
    },

    async _renderError() {
        const listContainer = document.getElementById('listRestaurant');
        listContainer.innerHTML = '<loading-error></loading-error>';
    },
};

export default HomePage;
