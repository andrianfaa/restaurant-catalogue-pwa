/* eslint-disable no-prototype-builtins */
/* eslint-disable consistent-return */
import { openDB } from 'idb';
import CONFIG from '../globals/config';

const { DATABASE_NAME, DATABASE_VERSION, DATABASE_STORE_NAME } = CONFIG;

const dbPromise = openDB(DATABASE_NAME, DATABASE_VERSION, {
    upgrade(database) {
        database.createObjectStore(DATABASE_STORE_NAME, { keyPath: 'id' });
    },
});

const RestaurantFavoriteDB = {
    async getRestaurant(id) {
        if (!id) {
            return;
        }

        return (await dbPromise).get(DATABASE_STORE_NAME, id);
    },

    async getAllRestaurants() {
        return (await dbPromise).getAll(DATABASE_STORE_NAME);
    },

    async putRestaurant(restaurant) {
        if (!restaurant.hasOwnProperty('id')) {
            return;
        }

        return (await dbPromise).put(DATABASE_STORE_NAME, restaurant);
    },

    async deleteRestaurant(id) {
        return (await dbPromise).delete(DATABASE_STORE_NAME, id);
    },
};

export default RestaurantFavoriteDB;
