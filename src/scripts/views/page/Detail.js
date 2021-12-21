/* eslint-disable no-unused-vars */
/* eslint-disable max-len */
/* eslint-disable no-underscore-dangle */
import UrlParser from '../../routes/urlParser';
import CONFIG from '../../globals/config';
import RestaurantDBSource from '../../data/RestaurantDBSource';
import FavoriteButtonInitiator from '../../utils/favorite-initiator';

const DetailPage = {
    async render() {
        return `
            <div class="content" id="content" tabindex="0">
                <loading-detail></loading-detail>
            </div>
        `;
    },

    async afterRender() {
        const url = UrlParser.parseActiveUrlWithoutCombiner();
        this._id = url.id;
        const restaurant = await RestaurantDBSource.getDetailRestaurant(url.id);

        if (restaurant.error === false) {
            this._renderPage(restaurant.restaurant);
        } else {
            this._renderError();
        }
    },

    async _renderPage(detail) {
        const detailContainer = document.getElementById('content');

        detailContainer.innerHTML = this._renderDetail(detail);

        FavoriteButtonInitiator.init({
            FavoriteButtonContainer: document.getElementById('favButtonContainer'),
            restaurant: {
                id: detail.id,
                name: detail.name,
                description: detail.description,
                pictureId: detail.pictureId,
                city: detail.city,
                rating: detail.rating,
            },
        });

        const reviewForm = document.getElementById('reviewForm');

        reviewForm.addEventListener('submit', (event) => this._submitReview(event));
    },

    _renderCustomerReview(review) {
        return `
        <div class="detail__review-item">
            <img src="https://cdn.statically.io/avatar/shape=circle/${review.name}" alt="${review.name}">
            <div class="detail__review-item-content">
                <p id="name">${review.name}</p>
                <small>${review.date}</small>
                <p>"${review.review}"</p>
            </div>
        </div>
        `;
    },

    async _renderError() {
        const detailContainer = document.getElementById('content');

        detailContainer.innerHTML = `
            <div class="container container-flex">
                <loading-error></loading-error>    
            </div>
        `;
    },

    async _submitReview(event) {
        event.preventDefault();

        const form = event.target;

        const review = {
            name: form.name.value,
            review: form.review.value,
            id: this._id,
        };

        await RestaurantDBSource.submitReview(review);

        window.location.reload();
    },

    _renderDetail(detail) {
        const { customerReviews } = detail;
        const { drinks, foods } = detail.menus;

        customerReviews.reverse();

        return `
            <div class="container">
                <div id="favButtonContainer"></div>
                <div class="detail__image">
                    <img 
                        src="${CONFIG.BASE_IMAGE_URL.medium}${detail.pictureId}"
                        alt="${detail.name}"
                        class="detail__image"
                    />
                    <div class="detail__image-overlay">
                        <p>${detail.city}</p>
                        &nbsp;&nbsp;|&nbsp;&nbsp;
                        <p>${detail.rating}</p>
                        <svg class="card-item__rating-icon" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                        </svg>
                    </div>
                </div>
                <div class="detail__info">
                    <h1>${detail.name}</h1>
                    <p id="address">
                        <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                        </svg>
                        ${detail.address}
                    </p>
                    <p id="desc">${detail.description}</p>
                </div>
                <div class="detail__flex">
                    <div class="detail__menu">
                        <h2>Menu</h2>
                        <div class="detail__menu-list">
                            <ul class="minuman">
                                <li>Minuman</li>
                                ${drinks.map((drink) => `<li>${drink.name}</li>`).join('')}
                            </ul>
                            <ul class="makanan">
                                <li>Makanan</li>
                                ${foods.map((food) => `<li>${food.name}</li>`).join('')}
                            </ul>
                        </div>
                    </div>
                    <div class="detail__review">
                        <h2>Reviews</h2>
                        <form id="reviewForm">
                            <p>Tambahkan review kamu</p>
                            <input name="name" type="text" placeholder="Name" required>
                            <input name="review" type="text" placeholder="Review" required>
                            <button type="submit">Submit</button>
                        </form>
                        <div class="detail__review-list">
                            ${customerReviews.map((review) => this._renderCustomerReview(review)).join('')}
                        </div>
                    </div>
                </div>
            </div>
        `;
    },
};

export default DetailPage;
