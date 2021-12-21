class LoadingError extends HTMLElement {
    connectedCallback() {
        this.render();
    }

    render() {
        this.innerHTML = `
            <div class="loading-error">
                <div class="loading-error__content">
                    <img 
                        src="media/illustrations/something-when-wrong.svg" 
                        alt="Something when wrong" 
                        class="loading-error__illustration"
                    />
                    <h1>Oops!</h1>
                    <p>Something went wrong, please try again later.</p>
                </div>
            </div>
        `;
    }
}

customElements.define('loading-error', LoadingError);
