/* eslint-disable max-len */
/* eslint-disable no-undef */
const assert = require('assert');

Feature('Liking Restaurant');

Before(({ I }) => {
    I.amOnPage('/#/favorite');
});

Scenario('showing empty favorite restaurant', async ({ I }) => {
    I.seeElement('h1');
    I.seeElement('img');

    I.see('Kamu belum menambahkan restoran favorit', 'p');
});

Scenario('liking one restaurant', async ({ I }) => {
    I.seeElement('img');
    I.see('Kamu belum menambahkan restoran favorit', 'p');

    I.amOnPage('/#/restaurant');

    I.seeElement('.card-item__content a');

    const firstRestaurantLink = locate('.card-item__content a').at(5);
    const firstRestaurantTitle = await I.grabTextFrom(locate('.card-item__title').at(5));

    I.click(firstRestaurantLink);

    I.seeElement('#favButtonContainer');

    I.click('button#notFavoriteButton');

    I.amOnPage('/#/favorite');
    I.seeElement('.card-item');

    const likedRestaurantTitle = await I.grabTextFrom('.card-item__title');

    assert.strictEqual(firstRestaurantTitle, likedRestaurantTitle);
});

Scenario('search one restaurant then like the restaurant', async ({ I }) => {
    I.seeElement('img');
    I.see('Kamu belum menambahkan restoran favorit', 'p');

    I.amOnPage('/');

    I.seeElement('.hero__search-input');

    const query = 'Fairy Cafe';

    I.fillField('.hero__search-input', query);
    I.pressKey('Enter');

    I.seeElement('.card-item__content a');

    const firstRestaurantLink = locate('.card-item__content a').first();
    const firstRestaurantTitle = await I.grabTextFrom(locate('.card-item__title').first());

    I.click(firstRestaurantLink);

    I.seeElement('button');

    const likeButton = locate('button#notFavoriteButton');

    I.click(likeButton);

    I.amOnPage('/#/favorite');
    I.seeElement('.card-item');

    const likedRestaurantTitle = await I.grabTextFrom(locate('.card-item__title').first());

    assert.strictEqual(firstRestaurantTitle, likedRestaurantTitle);
});

Scenario('search for a restaurant then like the restaurant, after successfully liking, click cancel like', async ({ I }) => {
    I.seeElement('img');
    I.see('Kamu belum menambahkan restoran favorit', 'p');

    I.amOnPage('/');

    I.seeElement('.hero__search-input');

    const query = 'Ampiran Kota';

    I.fillField('.hero__search-input', query);
    I.pressKey('Enter');

    I.seeElement('.card-item__content a');

    const firstRestaurantLink = locate('.card-item__content a').first();
    const firstRestaurantTitle = await I.grabTextFrom(locate('.card-item__title').first());

    I.click(firstRestaurantLink);

    I.seeElement('button');

    const likeButton = locate('button#notFavoriteButton');

    I.click(likeButton);

    I.amOnPage('/#/favorite');
    I.seeElement('.card-item');

    const firstLikedRestaurantLink = locate('.card-item__content a').first();
    const firstLikedRestaurantTitle = await I.grabTextFrom(locate('.card-item__title').first());

    I.click(firstLikedRestaurantLink);

    I.seeElement('button');

    const unlikeButton = locate('button#favoriteButton');

    I.click(unlikeButton);

    I.amOnPage('/#/favorite');

    I.seeElement('img');
    I.see('Kamu belum menambahkan restoran favorit', 'p');

    assert.strictEqual(firstRestaurantTitle, firstLikedRestaurantTitle);
});
