/* eslint-disable consistent-return */
import axios, { get } from 'axios';
import API_ENDPOINT from '../globals/api-endpoint';
import CONFIG from '../globals/config';

class RestaurantDBSource {
    static async getRestaurants() {
        try {
            const restaurants = await get(API_ENDPOINT.LIST);

            if (restaurants.status === 200) {
                return restaurants.data;
            }
        } catch (error) {
            return error;
        }
    }

    static async getDetailRestaurant(id) {
        try {
            const restaurant = await get(API_ENDPOINT.DETAIL(id));

            if (restaurant.status === 200) {
                return restaurant.data;
            }
        } catch (error) {
            return error;
        }
    }

    static async submitReview(review) {
        try {
            const response = await axios({
                method: 'POST',
                url: `${CONFIG.BASE_URL}review`,
                data: review,
            });

            if (response.status === 200) {
                return response.data;
            }
        } catch (error) {
            return error;
        }
    }
}

export default RestaurantDBSource;
