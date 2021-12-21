class NoResultFound extends HTMLElement {
    connectedCallback() {
        this.render();
    }

    render() {
        this.innerHTML = `
            <div class="no-result-found">
                <img src="media/illustrations/no-results-found.svg" alt="No result found">
                <p>No result found</p>
            </div>
        `;
    }
}

customElements.define('no-result-found', NoResultFound);
