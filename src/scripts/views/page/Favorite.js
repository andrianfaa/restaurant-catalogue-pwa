/* eslint-disable no-underscore-dangle */
import RestaurantFavoriteDB from '../../data/RestaurantFavoriteDB';

const FavoritePage = {
    async render() {
        return `
            <div class="content container" id="content" tabindex="0">
                <h1>Restoran favorit kamu</h1>
                <div class="card-container" id="listRestaurant">
                    <card-item-loading></card-item-loading>
                    <card-item-loading></card-item-loading>
                    <card-item-loading></card-item-loading>
                </div>
            </div>
        `;
    },

    async afterRender() {
        const restaurants = await RestaurantFavoriteDB.getAllRestaurants();
        const listContainer = document.getElementById('listRestaurant');

        listContainer.innerHTML = '';

        if (restaurants.length > 0) {
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
        } else {
            this._renderEmpty();
        }
    },

    async _renderEmpty() {
        const listContainer = document.getElementById('listRestaurant');

        listContainer.innerHTML = `
            <div class="card-item__empty">
                <img src="media/illustrations/match-not-found.svg" alt="No Match Found">
                <p>Kamu belum menambahkan restoran favorit</p>
            </div>
        `;
    },
};

export default FavoritePage;
