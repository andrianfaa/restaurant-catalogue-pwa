/* eslint-disable no-undef */
import * as TestFactories from './helpers/testFactories';
import RestaurantFavoriteDB from '../src/scripts/data/RestaurantFavoriteDB';

describe('Liking A Restaurant', () => {
    const addSomeElement = () => {
        document.body.innerHTML += '<div id="favoriteButtonContainer"></div>';
    };

    beforeEach(() => addSomeElement());

    it('should show the like button when the movie has not been liked before', async () => {
        await TestFactories.createFavoriteButtonPresenterWithRestaurant({ id: 1 });

        expect(document.querySelector('[aria-label="like this restaurant"]')).toBeTruthy();
    });

    it('should not show the unlike button when the movie has not been liked before', async () => {
        await TestFactories.createFavoriteButtonPresenterWithRestaurant({ id: 1 });

        expect(document.querySelector('[aria-label="unlike this restaurant"]')).toBeFalsy();
    });

    it('should be able to like the restaurant', async () => {
        await TestFactories.createFavoriteButtonPresenterWithRestaurant({ id: 1 });

        document.querySelector('#notFavoriteButton').dispatchEvent(new Event('click'));

        const restaurant = await RestaurantFavoriteDB.getRestaurant(1);

        expect(restaurant).toEqual({ id: 1 });

        RestaurantFavoriteDB.deleteRestaurant(1);
    });

    it('should not add a restaurant again when its already liked', async () => {
        await TestFactories.createFavoriteButtonPresenterWithRestaurant({ id: 1 });
        await RestaurantFavoriteDB.putRestaurant({ id: 1 });

        document.querySelector('#notFavoriteButton').dispatchEvent(new Event('click'));

        expect(await RestaurantFavoriteDB.getAllRestaurants()).toEqual([{ id: 1 }]);

        RestaurantFavoriteDB.deleteRestaurant(1);
    });

    it('should not add a restaurant when it has no id', async () => {
        await TestFactories.createFavoriteButtonPresenterWithRestaurant({});

        document.querySelector('#notFavoriteButton').dispatchEvent(new Event('click'));

        expect(await RestaurantFavoriteDB.getAllRestaurants()).toEqual([]);
    });
});
