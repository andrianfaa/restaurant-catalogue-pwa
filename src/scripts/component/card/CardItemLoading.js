class CardItemLoading extends HTMLElement {
    connectedCallback() {
        this.render();
    }

    render() {
        this.innerHTML = `
            <div class="card-item-loading">
                <div class="card-item-loading__image"></div>
                <div class="card-item-loading__content">
                    <div class="card-item-loading__title"></div>
                    <div class="card-item-loading__desc"></div>
                    <div class="card-item-loading__desc"></div>
                    <div class="card-item-loading__desc"></div>
                    <div class="card-item-loading__cta"></div>
                </div>
            </div>
        `;
    }
}

customElements.define('card-item-loading', CardItemLoading);
