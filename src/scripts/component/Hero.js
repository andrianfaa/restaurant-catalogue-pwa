/* eslint-disable no-underscore-dangle */
/* eslint-disable max-len */
class Hero extends HTMLElement {
    connectedCallback() {
        this.render();
    }

    render() {
        this.innerHTML = `
            <header class="hero">
                <div class="container">
                    <div class="hero__content">
                        <h1>Restaurant Catalogue</h1>
                        <p>Kamu lapar? haus? kamu bisa cari restaurant disekitar daerahmu atau sesuai rating</p>

                        <div class="hero__search">
                            <input type="search" class="hero__search-input" placeholder="Cari Restoran">
                            <button class="hero__search-button">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                                </svg>
                            </button>
                        </div>
                    </div>
                </div>
            </header>
        `;

        const searchInput = document.querySelector('.hero__search-input');
        const searchButton = document.querySelector('.hero__search-button');

        const search = () => {
            window.location.hash = `#/search/${searchInput.value}`;
        };

        searchButton.addEventListener('click', search);
        searchInput.addEventListener('change', search);
    }
}

customElements.define('hero-section', Hero);
