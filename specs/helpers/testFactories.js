/* eslint-disable import/prefer-default-export */
import FavoriteButtonInitiator from '../../src/scripts/utils/favorite-initiator';

const createFavoriteButtonPresenterWithRestaurant = async (restaurant) => {
    await FavoriteButtonInitiator.init({
        FavoriteButtonContainer: document.getElementById('favoriteButtonContainer'),
        restaurant,
    });
};

export {
    createFavoriteButtonPresenterWithRestaurant,
};
