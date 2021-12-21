class Loading extends HTMLElement {
    connectedCallback() {
        this.render();
    }

    render() {
        this.innerHTML = `
            <div class="loading-container">
                <div class="loading-spinner"></div>
            </div>
        `;
    }
}

customElements.define('loading-component', Loading);
