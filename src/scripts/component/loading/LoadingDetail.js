class LoadingDetailRestaurant extends HTMLElement {
    connectedCallback() {
        this.render();
    }

    render() {
        this.innerHTML = `
        <div class="container">
            <div class="loading-detail__image">
                <div></div>
            </div>
            <div class="loading-detail__content">
                <h1></h1>
                <div class="loading-detail__description">
                    <p></p>
                    <p></p>
                    <p></p>
                </div>

                <div class="loading-detail__flex">
                    <div class="loading-detail__menu">
                        <div class="loading-detail__menu-list">
                            <div class="loading-detail__menu-item">
                                <div></div>
                            </div>
                            <div class="loading-detail__menu-item">
                                <div></div>
                            </div>
                        </div>
                    </div>
                    <div class="loading-detail__review">
                        <h2></h2>

                        <div class="loading-detail__review-list">
                            <div class="loading-detail__review-item">
                                <div id="photo"></div>
                                <div id="review">
                                    <p></p>
                                    <p></p>
                                    <p></p>
                                </div>
                            </div>
                            <div class="loading-detail__review-item">
                                <div id="photo"></div>
                                <div id="review">
                                    <p></p>
                                    <p></p>
                                    <p></p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        `;
    }
}

customElements.define('loading-detail', LoadingDetailRestaurant);
