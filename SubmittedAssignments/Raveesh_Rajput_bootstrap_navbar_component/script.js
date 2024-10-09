
class Navbar extends HTMLElement {
    static observedAttributes = ["config", "data"];

    defaultConfig = {
        'navbar': 'navbar navbar-expand-lg navbar-light bg-light',
        'navbodyClass': 'container-fluid',
        'brand': 'navbar-brand',
        'brandlogo': 'logo',
        'toggler': 'navbar-toggler',
        'togglerIcon': 'navbar-toggler-icon',
        'collapse': 'collapse navbar-collapse',
        'navItem': 'nav-item',
        'ulClass': 'navbar-nav',
        'navLink': {
            'default': 'nav-link',
            'active': 'nav-link active',
            'disabled': 'nav-link disabled',
            'dropdownToggle': 'nav-link dropdown-toggle',
        },
        'dropdownMenu': 'dropdown-menu',
        'dropdownItem': 'dropdown-item',
        'searchForm': 'd-flex',
        'searchInput': 'form-control me-2',
       'searchButton': 'btn btn-outline-success',
    };


    defaultData = {
        'brand': {
            'src': '/img/bird-logo.avif',
            'text': 'BRAND',
            'href': '#',
        },
        'toggler': {
            'ariaControls': 'navbarSupportedContent',
            'ariaExpanded': false,
            'ariaLabel': 'Toggle navigation',
        },
        'collapse': {
            'id': 'navbarSupportedContent',
        },
        'navItems': [
            {
                'link': {
                    'href': '#',
                    'text': 'Home',
                    'ariaCurrent': 'page',
                    'isActive': true,
                },
            },
            {
                'link': {
                    'href': '#',
                    'text': 'Link',
                },
            },
            {
                'link': {
                    'href': '#',
                    'text': 'Dropdown',
                    'isDropdown': true,
                },
                'dropdown': [
                    {
                        'href': '#',
                        'text': 'Action',
                    },
                    {
                        'href': '#',
                        'text': 'Another action',
                    },
                    {
                        'href': '#',
                        'text': 'Something else here',
                    },
                ],
            },
            {
                'link': {
                    'href': '#',
                    'text': 'Disabled',
                    'isDisabled': true,
                },
            },
        ],
        'search': {
            'inputPlaceholder': 'Search',
            'inputAriaLabel': 'Search',
            'buttonText': 'Search',
        },
    };

    data = {};
    config = {};
    constructor() {
        super();
        this.config = this.defaultConfig;
        this.data = this.defaultData;
    }

    createElement(tag, className) {
        const element = document.createElement(tag);
        if (className) {
            element.className = className;
        }
        return element;
    }

    renderComponent() {
        // Create the main navbar element
        const navbar = this.createElement('nav', this.config.navbar);

        // Create container
        const container = this.createElement('div', this.config.navbodyClass);

        // create brand logo
        const logo = this.createElement('img', this.config.brandlogo);
        logo.src = this.data.brand.src;

        // Create brand link
        const brand = this.createElement('a', this.config.brand);
        brand.href = this.data.brand.href;
        brand.textContent = this.data.brand.text;

        // Create the toggler button
        const button = this.createElement('button', this.config.toggler);
        button.type = 'button';
        button.setAttribute('data-bs-toggle', 'collapse');
        button.setAttribute('data-bs-target', `#${this.data.collapse.id}`);
        button.setAttribute('aria-controls', this.data.toggler.ariaControls);
        button.setAttribute('aria-expanded', this.data.toggler.ariaExpanded);
        button.setAttribute('aria-label', this.data.toggler.ariaLabel);

        const buttonIcon = this.createElement('span', this.config.togglerIcon);
        button.appendChild(buttonIcon);

        // Create collapsible content
        const collapse = this.createElement('div', this.config.collapse);
        collapse.id = this.data.collapse.id;

        // Create the navigation list
        const navList = this.createElement('ul', this.config.ulClass);

        // Create nav items
        this.data.navItems.forEach(item => {
            const listItem = this.createElement('li', this.config.navItem);
            const link = this.createElement('a');
            link.className = item.link.isActive
                ? this.config.navLink.active
                : this.config.navLink.default;
            link.href = item.link.href;
            link.textContent = item.link.text;

            // Handle aria attributes for active and disabled links
            if (item.link.ariaCurrent) {
                link.setAttribute('aria-current', item.link.ariaCurrent);
            }

            // Handle disabled state
            if (item.link.isDisabled) {
                link.className = this.config.navLink.disabled;
                link.setAttribute('aria-disabled', 'true');
                link.tabIndex = -1;
                link.onclick = (e) => e.preventDefault();
            }

            // Handle dropdown
            if (item.link.isDropdown) {
                link.className = this.config.navLink.dropdownToggle;
                link.setAttribute('role', 'button');
                link.setAttribute('data-bs-toggle', 'dropdown');
                link.setAttribute('aria-expanded', 'false');

                const dropdownMenu = this.createElement('ul', this.config.dropdownMenu);

                item.dropdown.forEach(dropItem => {
                    const dropdownItem = this.createElement('li');
                    const dropLink = this.createElement('a', this.config.dropdownItem);
                    dropLink.href = dropItem.href;
                    dropLink.textContent = dropItem.text;
                    dropdownItem.appendChild(dropLink);
                    dropdownMenu.appendChild(dropdownItem);
                });

                listItem.appendChild(link);
                listItem.appendChild(dropdownMenu);
            } else {
                listItem.appendChild(link);
            }

            navList.appendChild(listItem);
        });

        // Add search form
        const searchForm = this.createElement('form', this.config.searchForm);

        const searchInput = this.createElement('input', this.config.searchInput);
        searchInput.type = 'search';
        searchInput.placeholder = this.data.search.inputPlaceholder;
        searchInput.setAttribute('aria-label', this.data.search.inputAriaLabel);

        const searchButton = this.createElement('button', this.config.searchButton);
        searchButton.type = 'submit';
        searchButton.textContent = this.data.search.buttonText;

        searchForm.appendChild(searchInput);
        searchForm.appendChild(searchButton);

        // Assemble the navbar
        collapse.appendChild(navList);
        collapse.appendChild(searchForm);
        brand.appendChild(logo);
        container.appendChild(brand);
        container.appendChild(button);
        container.appendChild(collapse);
        navbar.appendChild(container);
        this.appendChild(navbar);
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
            console.error('Error parsing JSON for', name, ':', e);
        }
    }
    
}

// Define the new element
customElements.define('navbar-component', Navbar);