class CardComponent extends HTMLElement {
    static observedAttributes = ["config", "data"];

    defaultConfig = {
        cardContainerClass: "card",
        cardBodyClass: "card-body",
        imageClass: "card-img-top",
        titleClass: "card-title",
        subTitleClass:"card-subtitle  my-3",
        textClass: "card-text",
        buttonClass :"btn btn-warning",
        linkClass : "card-link"
    };

    defaultData = {
        title: "Sample Card Title",
        subTitle: "Sample Card Sub Title",
        description: "This is a sample description for the card component.",
        image: "https://via.placeholder.com/150",
        button : "Click Me!",
        link : "https://www.google.com/, Google it"
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
    
    //check if user has provided some data 
    updateData(){
        const updatedData = JSON.parse(this.getAttribute('data'));
        this.data = updatedData || this.defaultData;
        console.log(this.data);
    }

    renderComponent() {
        this.innerHTML = '';
        const wrapperElm = this.createElement('div', this.config.cardContainerClass);

        const wrapperElmWidth = getComputedStyle(wrapperElm).width !='auto'? getComputedStyle(wrapperElm).width.trim() : '300px';
        wrapperElm.style.width = `${parseInt(wrapperElmWidth)}px`;
        this.style.display = 'inline-block'

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

        if (this.data.button) {
            const button = this.createElement('button', this.config.buttonClass, this.data.button);
            cardBody.appendChild(button);
        }
        if (this.data.link) {
            console.log(this.data.link);
            const linkContent = this.data.link;
            const linkContSeparated = linkContent.split(",");
        
            if (linkContSeparated.length == 2) {
                const url = linkContSeparated[0].trim(); 
                const linkText = linkContSeparated[1].trim(); 
        
                const link = this.createElement('a', this.config.linkClass, linkText);
                link.href = url; // Set the href to the URL
                link.target = '_blank';
                link.style.display = 'block';
                link.style.margin = '0.7rem 0';
                cardBody.appendChild(link);
            } else {
                console.error("Link data is not formatted correctly.");
            }
        }
        
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
