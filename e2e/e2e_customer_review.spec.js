/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
const assert = require('assert');

Feature('Customer Review');

Before(({ I }) => {
    I.amOnPage('/#/favorite');
});

Scenario('showing a review', async ({ I }) => {
    I.amOnPage('/');
    I.see('Restaurant Catalogue', 'h1');
    I.seeElement('.card-item');
    I.click(locate('.card-item__content a').first());
    I.seeElement('.detail__review-item');
});

Scenario('add new review', async ({ I }) => {
    I.amOnPage('/');
    I.see('Restaurant Catalogue', 'h1');

    I.click(locate('.card-item__content a').at(4));

    I.seeElement('form#reviewForm');

    const name = 'John Doe';
    const review = 'This restaurant is awesome!';

    I.fillField('input[name="name"]', name);
    I.fillField('input[name="review"]', review);

    I.see('Submit', 'button[type="submit"]');
    I.click('button[type="submit"]');

    assert.strictEqual(await I.grabTextFrom(locate('p#name').first()), name);
});
