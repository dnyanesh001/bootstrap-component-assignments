class CardComponent extends HTMLElement {
    static observedAttributes = ["config", "data"];

    defaultConfig = {
        cardContainerClass: "row p-5 bg-primary text-white",
        colClass: "col-lg-3",
        cardBodyClass: "card-body",
        iconClass: "bi fs-1 border border-3 rounded-circle p-3 text-center position-absolute top-25",
        titleClass: "card-title fs-1 text-center",
        textClass: "card-text fs-5 pb-5 text-center"
    };

    defaultData = {
        cards: {
            card1: {
                title: "3468",
                description: "Hospital Rooms",
                icon: "bi bi-house-door"
            },
            card2: {
                title: "557",
                description: "Specialist Doctors",
                icon: "bi bi-person"
            },
            card3: {
                title: "899",
                description: "Happy Patients",
                icon: "bi bi-emoji-smile"
            },
            card4: {
                title: "32",
                description: "Year of Experience",
                icon: "bi bi-calendar3"
            }
        }
    }
        animateNumbers(element, endValue) {
            const duration = 2000;
            const start = 0;
            const end = parseInt(endValue);
            
            let current = start;
            const increment = (end - start) / (duration / 16);
            const timer = setInterval(() => {
                current += increment;
                element.textContent = Math.round(current);
                if (current >= end) {
                    element.textContent = end;
                    clearInterval(timer);
                }
            }, 16);
        

    };

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
            if (name === "config" && typeof newValue === "string") {
                this.config = Object.assign(this.config, JSON.parse(newValue));
            }
            if (name === "data" && typeof newValue === "string") {
                this.data = JSON.parse(newValue);
            }
        } catch (e) {
            console.log(e);
        }

        this.renderComponent();
    }

    renderComponent() {
        this.innerHTML = "";

        const style = document.createElement("style");
        style.textContent = `
            @import url("https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css");
            @import url("https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.1/font/bootstrap-icons.css");

            .hover-active {
                transform: scale(1.2);
                background-color: #ffffff;
                color: #0d6efd;
                transition: all 0.3s ease;
            }
        `;
        this.appendChild(style);

        const wrapperElm = this.createElement("div", this.config.cardContainerClass);

        Object.values(this.data.cards).forEach(item => {
            const col = this.createElement("div", this.config.colClass);
            const cardBody = this.createElement("div", this.config.cardBodyClass);
            const iconElement = this.createElement("i", this.config.iconClass);

            cardBody.addEventListener("mouseenter", () => {
                iconElement.classList.add("hover-active");
            });

            cardBody.addEventListener("mouseout", () => {
                iconElement.classList.remove("hover-active");
            });

            iconElement.className = this.config.iconClass + " " + item.icon;
            cardBody.appendChild(iconElement);

            const title = this.createElement("h5", this.config.titleClass, item.title,"0");
            const description = this.createElement("p", this.config.textClass, item.description);

            cardBody.appendChild(title);
            requestAnimationFrame(() => {
                this.animateNumbers(title, item.title);
            });

            if (item.subTitle) {
                const subTitle = this.createElement("h6", this.config.subTitleClass, item.subTitle);
                cardBody.appendChild(subTitle);
            }
            cardBody.appendChild(description);
            col.appendChild(cardBody);
            wrapperElm.appendChild(col);
        });

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

customElements.define("card-component", CardComponent);

if (!window.customElementsList) window.customElementsList = [];
window.customElementsList.push({ component: "card-component", componentClass: CardComponent });