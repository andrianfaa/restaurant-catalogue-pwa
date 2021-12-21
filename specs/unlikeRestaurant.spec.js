/* eslint-disable no-undef */
import * as TestFactories from './helpers/testFactories';
import RestaurantFavoriteDB from '../src/scripts/data/RestaurantFavoriteDB';

describe('Uniking A Movie', () => {
    const addFavoriteButtonContainer = () => {
        document.body.innerHTML = '<div id="favoriteButtonContainer"></div>';
    };

    beforeEach(async () => {
        addFavoriteButtonContainer();
        await RestaurantFavoriteDB.putRestaurant({ id: 1 });
    });

    afterEach(async () => {
        await RestaurantFavoriteDB.deleteRestaurant(1);
    });

    it('should display unlike widget when the restaurant has been liked', async () => {
        await TestFactories.createFavoriteButtonPresenterWithRestaurant({ id: 1 });

        expect(document.querySelector('[aria-label="unlike this restaurant"]')).toBeTruthy();
    });

    it('should not display like widget when the restaurant has been liked', async () => {
        await TestFactories.createFavoriteButtonPresenterWithRestaurant({ id: 1 });

        expect(document.querySelector('[aria-label="like this restaurant"]')).toBeFalsy();
    });

    it('should be able to remove liked restaurant from the list', async () => {
        await TestFactories.createFavoriteButtonPresenterWithRestaurant({ id: 1 });

        document.querySelector('[aria-label="unlike this restaurant"]').dispatchEvent(new Event('click'));

        const restaurant = await RestaurantFavoriteDB.getAllRestaurants();

        expect(restaurant).toEqual([]);

        RestaurantFavoriteDB.deleteRestaurant(1);
    });

    it('should not throw error if the unliked movie is not in the list', async () => {
        await TestFactories.createFavoriteButtonPresenterWithRestaurant({ id: 1 });

        await RestaurantFavoriteDB.deleteRestaurant(1);

        document.querySelector('[aria-label="unlike this restaurant"]').dispatchEvent(new Event('click'));

        expect(await RestaurantFavoriteDB.getAllRestaurants()).toEqual([]);
    });
});
