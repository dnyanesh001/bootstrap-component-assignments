class ListComponent extends HTMLElement {
    static observedAttributes = ["config", "data"];

    defaultConfig = {
        listClass: "list-group",
        listItemClass: "list-group-item list-group-item-action d-flex justify-content-between align-items-start",
        checkboxClass: "form-check-input me-1",
        showCheckbox: true,
        numbered: true,
        horizontal: false,
        flush: false,
        badge: true 
    };

    defaultData = [
        {"heading": "First checkbox", "subheading": "This is the first item", "badge": "1", "context": "success", "active": false, "disabled": false, "showBadge": true, "href": "https://www.youtube.com/"},
        {"heading": "Second checkbox", "subheading": "This is the second item", "badge": "2", "context": "warning", "active": false, "disabled": false, "showBadge": true, "href": "https://getbootstrap.com/docs/5.0/customize/components/"},
        {"heading": "Third checkbox", "subheading": "This is the third item", "badge": "3", "context": "danger", "active": false, "disabled": false, "showBadge": true, "href": "#"},
        {"heading": "Fourth checkbox", "subheading": "This is the fourth item", "badge": "4", "context": "info", "active": false, "disabled": false, "showBadge": true, "href": "#"},
        {"heading": "Fifth checkbox", "subheading": "This is the fifth item", "badge": "5", "context": "primary", "active": false, "disabled": true, "showBadge": true, "href": "#"},
        
    ];

    data = [];
    config = {};

    constructor() {
        super();
        this.data = [...this.defaultData];
        this.config = { ...this.defaultConfig };
    }

    connectedCallback() {
        this.renderComponent();
    }

    attributeChangedCallback(name, oldValue, newValue) {
        try {
            if (name === 'config' && typeof newValue === 'string') {
                this.config = { ...this.config, ...JSON.parse(newValue) };
            }
            if (name === 'data' && typeof newValue === 'string') {
                this.data = JSON.parse(newValue);
            }
        } catch (e) {
            console.error(e);
        }

        this.renderComponent();
    }

    renderComponent() {
        this.innerHTML = '';

        const listClasses = [
            this.config.listClass,
            this.config.horizontal ? "list-group-horizontal" : "",
            this.config.flush ? "list-group-flush" : ""
        ].join(" ").trim();

        const list = this.createElement('div', listClasses);

        for (let i = 0; i < this.data.length; i++) {
            const item = this.data[i];

            const listItemClass = `
                ${this.config.listItemClass} 
                ${item.context ? `bg-${item.context} text-black` : ''} 
                ${item.active ? 'active' : ''} 
                ${item.disabled ? 'disabled' : ''}
            `.trim();
            const listItem = this.createElement('a', listItemClass);

            if (item.href && !item.disabled) {
                listItem.href = item.href;
                listItem.setAttribute('role', 'button');
            } else {
                listItem.setAttribute('tabindex', '-1');
                listItem.setAttribute('aria-disabled', item.disabled);
                listItem.addEventListener('click', (e) => {
                    if (item.disabled) {
                        e.preventDefault();
                    } else {
                        item.active = !item.active;
                        this.renderComponent(); 
                    }
                });
            }

           
            if (this.config.numbered) {
                const number = document.createElement('span');
                number.className = "me-2"; 
                number.textContent = i + 1; 
                listItem.prepend(number);
            }

            if (this.config.showCheckbox) {
                const checkbox = document.createElement('input');
                checkbox.className = this.config.checkboxClass;
                checkbox.type = 'checkbox';
                checkbox.checked = item.active;
                checkbox.disabled = item.disabled; 

                checkbox.addEventListener('change', () => {
                    if (!item.disabled) {
                        item.active = checkbox.checked;
                        this.renderComponent(); 
                    }
                });

                listItem.appendChild(checkbox);
            }

            const textContainer = document.createElement('div');
            textContainer.className = "flex-grow-1"; 
            textContainer.appendChild(document.createTextNode(item.heading));

            if (item.subheading) {
                const subheading = document.createElement('small');
                subheading.className = "form-text text-muted"; 
                subheading.textContent = item.subheading;
                textContainer.appendChild(subheading);
            }

            listItem.appendChild(textContainer);

            
            if (item.showBadge) {
                const badge = document.createElement('span');
                badge.className = `badge bg-primary rounded-pill ${this.config.badge }`; 
                badge.textContent = item.badge;
                listItem.appendChild(badge);
            }

            list.appendChild(listItem);
        }

        this.appendChild(list);
    }

    createElement(tag, className) {
        const elm = document.createElement(tag);
        elm.className = className;
        return elm;
    }
}

customElements.define('list-component', ListComponent);
