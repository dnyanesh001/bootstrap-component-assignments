class CardComponent extends HTMLElement {
    static observedAttributes = ["config", "data"];

    defaultConfig = {
        cardContainerClass: "card",
        cardBodyClass: "card-body",
        imageClass: "card-img-top",
        titleClass: "card-title",
        textClass: "card-text"
    };

    defaultData = {
        title: "Sample Card Title",
        subTitle: "Sample Card Sub Title",
        description: "This is a sample description for the card component.",
        image: "https://via.placeholder.com/150"
    };

    data = {};
    config = {};

    constructor() {
        super();
        this.data = { ...this.defaultData };
        this.config = { ...this.defaultConfig };
    }

    connectedCallback() {
        this.renderComponent();
    }

    attributeChangedCallback(name, oldValue, newValue) {
        try {
            if (name === 'config' && typeof newValue === 'string') {
                this.config = Object.assign(this.config, JSON.parse(newValue));
            }
            if (name === 'data' && typeof newValue === 'string') {
                this.data = Object.assign(this.data, JSON.parse(newValue));
            }
        } catch (e) {
            console.log(e);
        }

        this.renderComponent();
    }

    renderComponent() {
        this.innerHTML = '';
        const wrapperElm = this.createElement('div', this.config.cardContainerClass);

        if (this.data.image) {
            const img = this.createElement('img', this.config.imageClass);
            img.src = this.data.image;
            wrapperElm.appendChild(img);
        }

        const cardBody = this.createElement('div', this.config.cardBodyClass);
        const title = this.createElement('h5', this.config.titleClass, this.data.title);
        const description = this.createElement('p', this.config.textClass, this.data.description);
        
        cardBody.appendChild(title);
        if (this.data.subTitle) {
            const subTitle = this.createElement('h6', this.config.subTitleClass, this.data.subTitle);
            cardBody.appendChild(subTitle);
        }
        cardBody.appendChild(description);
        wrapperElm.appendChild(cardBody);
        this.appendChild(wrapperElm);
    }

    createElement(tag, className, content) {
        const elm = document.createElement(tag);
        elm.className = className;
        if (content) {
            elm.innerHTML = content;
        }
        return elm;
    }
}

customElements.define('card-component', CardComponent);

if (!window.customElementsList) window.customElementsList = [];
window.customElementsList.push({ component: 'card-component', componentClass: CardComponent });
