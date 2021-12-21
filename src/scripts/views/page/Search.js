/* eslint-disable max-len */
/* eslint-disable no-underscore-dangle */
import { get } from 'axios';
import UrlParser from '../../routes/urlParser';
import API_ENDPOINT from '../../globals/api-endpoint';

const SearchPage = {
    async render() {
        return `
            <div class="content container" id="content" tabindex="0">
                <div class="search-group">
                    <input type="search" id="search-input" placeholder="Cari restaurant...">
                    <button type="button" id="search-button">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                        </svg>
                    </button>
                </div>
                <h1>Hasil pencarian</h1>
                <div id="listRestaurant" class="card-container"></div>
            </div>
        `;
    },

    async afterRender() {
        this._renderLoading();
        const url = UrlParser.parseActiveUrlWithoutCombiner();

        const searchInput = document.querySelector('#search-input');
        const searchButton = document.querySelector('#search-button');
        const search = async () => {
            window.location.hash = `#/search/${searchInput.value}`;
        };

        searchButton.addEventListener('click', search);
        searchInput.addEventListener('change', search);
        searchInput.value = url.id;

        const response = await get(API_ENDPOINT.SEARCH(url.id));

        if (response.status === 200 && response.data.founded > 0) {
            this._renderPage(response.data.restaurants);
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
        listContainer.innerHTML = '<no-result-found></no-result-found>';
    },
};

export default SearchPage;
