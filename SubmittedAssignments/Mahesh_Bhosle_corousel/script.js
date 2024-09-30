class CarouselElement extends HTMLElement {
    static get observedAttributes() {
        return ["config", "data"];
    }

    defaultConfig = {
        "carouselClass": "carousel slide carousel-dark",
        "innerClass": "carousel-inner",
        "itemClass": "carousel-item",
        "imgClass": "d-block w-100 ratio ratio-21x9",
        "prevButtonClass": "carousel-control-prev",
        "nextButtonClass": "carousel-control-next",
        "prevIconClass": "carousel-control-prev-icon",
        "nextIconClass": "carousel-control-next-icon",
        "buttonTextClass": "visually-hidden", // Use Bootstrap's visually-hidden class
        "indicatorClass": "carousel-indicators",
        "indicatorItemClass": "carousel-indicator",
        "activeClass": "active",
        "ride": "carousel", // 
        "touch": true,
        "slide": true,  // New option for enabling/disabling slide
        "captionClass": "carousel-caption d-none d-md-block mb-4",
        "captionTitleClass": "carousel-title h1 text-danger text-uppercase text-decoration-none",
        "captionSubTitleClass": "carousel-subtitle h3 text-muted",
        "captionTextClass": "carousel-text fs-4 fw-normal",
        "buttonContainerClass": "carousel-button-container",
        "buttonClass": "btn btn-primary rounded-pill ms-2",
        "indicators": true,
        "captions": true,
        "buttons": true
    };

    defaultData = [
        {
            src: "https://via.placeholder.com/800x400?text=First+Slide",
            alt: "First Slide",
            caption: {
                title: "Journey Through the Unknown",
                subtitle: "Explore the Unseen",
                text: "Some representative placeholder content for the first slide.",
                titleLink: "https://example.com/first"
            }
        },
        {
            src: "https://via.placeholder.com/800x400?text=Second+Slide",
            alt: "Second Slide",
            caption: {
                title: "Whispers of the Horizon",
                subtitle: "Look Beyond",
                text: "Some representative placeholder content for the second slide.",
                titleLink: "https://example.com/second"
            }
        }
    ];

    constructor() {
        super();
        this.config = { ...this.defaultConfig };
        this.data = [...this.defaultData];
    }

    connectedCallback() {
        this.renderComponent();
    }

    attributeChangedCallback(name, oldValue, newValue) {
        if (name === 'config') {
            try {
                const userConfig = JSON.parse(newValue);
                this.config = { ...this.defaultConfig, ...userConfig };
            } catch (e) {
                console.error("Invalid config JSON:", e);
            }
        } else if (name === 'data') {
            try {
                const userData = JSON.parse(newValue);
                this.data = Array.isArray(userData) ? userData : this.defaultData;
            } catch (e) {
                console.error("Invalid data JSON:", e);
            }
        }

        this.renderComponent();
    }

    renderComponent() {
        this.innerHTML = '';  // Clear content before rendering

        let carouselElm = this.createDivElement(this.config.carouselClass);
        
        carouselElm.setAttribute('data-bs-ride', this.config.ride);
        carouselElm.setAttribute('data-bs-touch', this.config.touch);
        carouselElm.id = "customCarousel";

          // Disable slide if slide is set to false
          if (!this.config.slide) {
            carouselElm.setAttribute('data-bs-interval', 'false');
        }

        if (this.config.indicators) {
            let indicatorContainer = this.createDivElement(this.config.indicatorClass);
            this.data.forEach((_, index) => {
                let indicator = this.createIndicator(index);
                indicatorContainer.appendChild(indicator);
            });
            carouselElm.appendChild(indicatorContainer);
        }

        let innerElm = this.createDivElement(this.config.innerClass);
        this.data.forEach((item, index) => {
            let itemElm = this.createDivElement(this.config.itemClass);
            if (index === 0) itemElm.classList.add(this.config.activeClass);

            let imgElm = this.createImgElement(item.src, item.alt);
            itemElm.appendChild(imgElm);

            if (this.config.captions && item.caption) {
                let captionElm = this.createCaptionElement(
                    item.caption.title,
                    item.caption.subtitle,
                    item.caption.text,
                    item.caption.titleLink,
                    this.config.buttons ? item.buttons : []
                );
                itemElm.appendChild(captionElm);
            }

            innerElm.appendChild(itemElm);
        });

        carouselElm.appendChild(innerElm);

        let prevButton = this.createControlButton('prev', this.config.prevButtonClass, this.config.prevIconClass, "Previous");
        let nextButton = this.createControlButton('next', this.config.nextButtonClass, this.config.nextIconClass, "Next");

        prevButton.setAttribute("data-bs-target", "#customCarousel");
        nextButton.setAttribute("data-bs-target", "#customCarousel");

        carouselElm.appendChild(prevButton);
        carouselElm.appendChild(nextButton);

        this.appendChild(carouselElm);
    }

    createDivElement(className) {
        let elm = document.createElement('div');
        elm.className = className;
        return elm;
    }

    createImgElement(src, alt) {
        let img = document.createElement('img');
        img.className = this.config.imgClass;
        img.src = src;
        img.alt = alt;
        return img;
    }

    createIndicator(index) {
        let indicator = document.createElement('button');
        indicator.type = 'button';
        indicator.setAttribute('data-bs-target', '#customCarousel');
        indicator.setAttribute('data-bs-slide-to', index.toString());
        if (index === 0) indicator.classList.add(this.config.activeClass);
        return indicator;
    }

    createCaptionElement(title, subtitle, text, titleLink, buttons) {
        let captionElm = this.createDivElement(this.config.captionClass);

        let titleElm = document.createElement('h1');
        let titleLinkElm = document.createElement('a');
        titleLinkElm.innerText = title;
        titleLinkElm.href = titleLink;
        titleLinkElm.className = this.config.captionTitleClass;
        titleElm.appendChild(titleLinkElm);

        let subTitleElm = document.createElement("h3");
        subTitleElm.innerText = subtitle;
        subTitleElm.className = this.config.captionSubTitleClass;

        let textElm = document.createElement('p');
        textElm.innerText = text;
        textElm.className = this.config.captionTextClass;

        captionElm.appendChild(titleElm);
        captionElm.appendChild(subTitleElm);
        captionElm.appendChild(textElm);

        if (Array.isArray(buttons) && buttons.length > 0) {
            let buttonContainerElm = this.createDivElement(this.config.buttonContainerClass);
            buttons.forEach(button => {
                let buttonElm = document.createElement('a');
                buttonElm.href = button.link;
                buttonElm.innerText = button.text;
                buttonElm.className = button.class || this.config.buttonClass;
                buttonContainerElm.appendChild(buttonElm);
            });
            captionElm.appendChild(buttonContainerElm);
        }

        return captionElm;
    }

    createControlButton(direction, buttonClass, iconClass, buttonText) {
        let buttonElm = document.createElement('button');
        buttonElm.className = buttonClass; // e.g., carousel-control-prev or carousel-control-next
        buttonElm.type = "button";
        buttonElm.setAttribute('data-bs-slide', direction);

        let iconElm = document.createElement('span');
        iconElm.className = iconClass; // e.g., carousel-control-prev-icon
        iconElm.setAttribute('aria-hidden', 'true');

        let textElm = document.createElement('span');
        textElm.className = "visually-hidden"; // Using Bootstrap's class to hide visually
        textElm.innerText = buttonText; // Use innerText for proper text rendering

        buttonElm.appendChild(iconElm);
        buttonElm.appendChild(textElm);
        return buttonElm;
    }
}

customElements.define("carousel-element", CarouselElement);



if (!window.customElementsList) window.customElementsList = [];
window.customElementsList.push({ component: 'carousel-element', componentClass: CarouselElement });

