class CardComponent extends HTMLElement {
    static observedAttributes = ["config", "data"];

    defaultConfig = {
        cardContainerClass: "card my-3",
        cardBodyClass: "card-body",
        imageClass: "card-img-top",
        titleClass: "card-title",
        subTitleClass: "card-subtitle my-3",
        textClass: "card-text",
        buttonClass: "btn btn-warning",
        linkClass: "card-link"
    };

    defaultData = {
        title: "Sample Card Title",
        subTitle: "Sample Card Sub Title",
        description: "This is a sample description for the card component.",
        image: "https://via.placeholder.com/150",
        button: "Click Me!",
        link: "https://www.google.com, Google it",
        showImage: true,    // New property for image visibility
        showTitle: true,     // New property for title visibility
        showSubTitle: true,  // New property for subtitle visibility
        showDescription: true,// New property for description visibility
        showButton: true,    // New property for button visibility
        showLink: true       // New property for link visibility
    };

    data = {};
    config = {};

    constructor() {
        super();
        this.data = { ...this.defaultData };
        this.config = { ...this.defaultConfig };
    }

    connectedCallback() {
        this.updateData();
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

    updateData() {
        const updatedData = JSON.parse(this.getAttribute('data'));
        this.data = updatedData || this.defaultData;
        console.log(this.data);
    }

    renderComponent() {
        this.innerHTML = '';
        this.className = this.config.cardContainerClass;

        const wrapperElmWidth = getComputedStyle(this).width !== 'auto' ? getComputedStyle(this).width.trim() : '300px';
        this.style.width = `${parseInt(wrapperElmWidth)}px`;
        this.style.display = 'inline-block';

        if (this.data.showImage && this.data.image) {
            const img = this.createElement('img', this.config.imageClass);
            img.src = this.data.image;
            this.appendChild(img);
        }

        const cardBody = this.createElement('div', this.config.cardBodyClass);
        
        if (this.data.showTitle) {
            const title = this.createElement('h5', this.config.titleClass, this.data.title);
            cardBody.appendChild(title);
        }
        
        if (this.data.showSubTitle && this.data.subTitle) {
            const subTitle = this.createElement('h6', this.config.subTitleClass, this.data.subTitle);
            cardBody.appendChild(subTitle);
        }

        if (this.data.showDescription) {
            const description = this.createElement('p', this.config.textClass, this.data.description);
            cardBody.appendChild(description);
        }

        if (this.data.showButton && this.data.button) {
            const button = this.createElement('button', this.config.buttonClass, this.data.button);
            cardBody.appendChild(button);
        }
        
        if (this.data.showLink && this.data.link) {
            console.log(this.data.link);
            const linkContent = this.data.link;
            const linkContSeparated = linkContent.split(",");

            if (linkContSeparated.length === 2) {
                const url = linkContSeparated[0].trim();
                const linkText = linkContSeparated[1].trim();

                const link = this.createElement('a', this.config.linkClass, linkText);
                link.href = url;
                link.target = '_blank';
                link.style.display = 'block';
                link.style.margin = '0.7rem 0';
                cardBody.appendChild(link);
            } else {
                console.error("Link data is not formatted correctly.");
            }
        }

        this.appendChild(cardBody);
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
