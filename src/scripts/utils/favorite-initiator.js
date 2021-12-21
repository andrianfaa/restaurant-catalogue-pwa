/* eslint-disable no-unused-expressions */
/* eslint-disable no-param-reassign */
/* eslint-disable no-underscore-dangle */
import RestaurantFavoriteDB from '../data/RestaurantFavoriteDB';
import { createFavoriteButton, createFavoriteDarkButton } from '../views/template/FavoriteButton';

const FavoriteButtonInitiator = {
    async init({ FavoriteButtonContainer, restaurant = {} }) {
        this._favoriteButtonContainer = FavoriteButtonContainer;
        this._restaurant = restaurant;

        await this._renderButton(FavoriteButtonContainer);
    },

    async _renderButton() {
        const { id } = this._restaurant;

        if (await this._isRestaurantExist(id)) {
            this._renderAlreadyLiked();
        } else {
            this._renderLike();
        }
    },

    async _isRestaurantExist(id) {
        const restaurant = await RestaurantFavoriteDB.getRestaurant(id);
        return !!restaurant;
    },

    _renderAlreadyLiked() {
        this._favoriteButtonContainer.innerHTML = createFavoriteButton();

        const favoriteButton = document.querySelector('#favoriteButton');

        favoriteButton.addEventListener('click', async () => {
            await RestaurantFavoriteDB.deleteRestaurant(this._restaurant.id);
            this._renderButton();
        });
    },

    _renderLike() {
        this._favoriteButtonContainer.innerHTML = createFavoriteDarkButton();

        const favoriteDarkButton = document.querySelector('#notFavoriteButton');
        favoriteDarkButton.addEventListener('click', async () => {
            await RestaurantFavoriteDB.putRestaurant(this._restaurant);
            this._renderButton();
        });
    },
};

export default FavoriteButtonInitiator;
