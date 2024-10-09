class ModalComponent extends HTMLElement {
    static observedAttributes = ["config", "data"];

    defaultConfig = {
        modalClass: "modal",
        modalDialogClass: "modal-dialog",
        modalContentClass: "modal-content",
        modalHeaderClass: "modal-header",
        modalTitleClass: "modal-title",
        modalBodyClass: "modal-body",
        modalFooterClass: "modal-footer",
        closeButtonClass: "close",
        modalOpenClass: "modal-open"
    };

    defaultData = {
        title: "Default Modal Title",
        tableData: [],
        galleryImages: []
    };

    data = {};
    config = {};
    backdrop = null; // To handle backdrop

    constructor() {
        super();
        this.data = { ...this.defaultData };
        this.config = { ...this.defaultConfig };
    }

    connectedCallback() {
        this.renderComponent();

        // Attach event listener to open modal
        const openModalBtn = document.getElementById('openModal');
        if (openModalBtn) {
            openModalBtn.addEventListener('click', () => this.showModal());
        }

        // Attach event listener to close modal (header and footer close buttons)
        const closeModalBtns = this.querySelectorAll('.close');
        closeModalBtns.forEach(closeBtn => {
            closeBtn.addEventListener('click', () => this.hideModal());
        });

        // Add key loop event listener
        document.addEventListener('keydown', (event) => this.handleKeyLoop(event));
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

    handleKeyLoop(event) {
        const key = event.key;

        // Define data to be passed based on key press
        let newData = null;
        if (key === '1') {
            newData = {
                title: "Student Information - Group 1",
                tableData: [
                    { name: "Student A", age: 20, qualification: "B.Com", email: "a@gmail.com" },
                    { name: "Student B", age: 22, qualification: "B.Sc", email: "b@gmail.com" }
                ],
                galleryImages: [
                    { src: "https://via.placeholder.com/100", alt: "Group 1 Image 1" },
                    { src: "https://via.placeholder.com/100", alt: "Group 1 Image 2" }
                ]
            };
        } else if (key === '2') {
            newData = {
                title: "Student Information - Group 2",
                tableData: [
                    { name: "Student C", age: 23, qualification: "M.Sc", email: "c@gmail.com" },
                    { name: "Student D", age: 24, qualification: "M.A", email: "d@gmail.com" }
                ],
                galleryImages: [
                    { src: "https://via.placeholder.com/100", alt: "Group 2 Image 1" },
                    { src: "https://via.placeholder.com/100", alt: "Group 2 Image 2" }
                ]
            };
        } else if (key === '3') {
            newData = {
                title: "Student Information - Group 3",
                tableData: [
                    { name: "Student E", age: 21, qualification: "B.A", email: "e@gmail.com" },
                    { name: "Student F", age: 22, qualification: "B.Sc", email: "f@gmail.com" }
                ],
                galleryImages: [
                    { src: "https://via.placeholder.com/100", alt: "Group 3 Image 1" },
                    { src: "https://via.placeholder.com/100", alt: "Group 3 Image 2" }
                ]
            };
        }

        // If new data is defined, update the component's data attribute
        if (newData) {
            this.setAttribute('data', JSON.stringify(newData));
        }
    }

    renderComponent() {
        this.innerHTML = '';

        // Modal Wrapper
        const modalWrapper = this.createElement('div', this.config.modalClass);
        modalWrapper.style.display = 'none'; // Initially hidden

        const modalDialog = this.createElement('div', this.config.modalDialogClass);
        const modalContent = this.createElement('div', this.config.modalContentClass);

        // Modal Header
        const modalHeader = this.createElement('div', this.config.modalHeaderClass);
        const modalTitle = this.createElement('h5', this.config.modalTitleClass, this.data.title);
        const closeBtn = this.createElement('button', this.config.closeButtonClass, '&times;');
        closeBtn.setAttribute('type', 'button');

        modalHeader.appendChild(modalTitle);
        modalHeader.appendChild(closeBtn);

        // Modal Body with Student Table and Gallery Grid
        const modalBody = this.createElement('div', this.config.modalBodyClass);

        // Student Table
        const table = this.createElement('table', 'table table-bordered');
        const thead = this.createElement('thead');
        const tbody = this.createElement('tbody');

        thead.innerHTML = `
            <tr>
                <th>Name</th>
                <th>Age</th>
                <th>Qualification</th>
                <th>Email</th>
            </tr>
        `;

        // Populate table rows
        this.data.tableData.forEach(function(student) {
            const tr = document.createElement('tr');
            tr.innerHTML = `
                <td>${student.name}</td>
                <td>${student.age}</td>
                <td>${student.qualification}</td>
                <td>${student.email}</td>
            `;
            tbody.appendChild(tr);
        });

        table.appendChild(thead);
        table.appendChild(tbody);
        modalBody.appendChild(table);

        // Gallery Grid
        const galleryGrid = this.createElement('div', 'gallery-grid');

        this.data.galleryImages.forEach(function(image) {
            const img = this.createElement('img');
            img.setAttribute('src', image.src);
            img.setAttribute('alt', image.alt);
            galleryGrid.appendChild(img);
        }.bind(this));

        modalBody.appendChild(galleryGrid);

        // Modal Footer
        const modalFooter = this.createElement('div', this.config.modalFooterClass);
        const footerCloseBtn = this.createElement('button', 'btn btn-secondary close', 'Close');
        footerCloseBtn.setAttribute('type', 'button');

        modalFooter.appendChild(footerCloseBtn);

        // Append everything to modal content
        modalContent.appendChild(modalHeader);
        modalContent.appendChild(modalBody);
        modalContent.appendChild(modalFooter);

        // Final modal structure
        modalDialog.appendChild(modalContent);
        modalWrapper.appendChild(modalDialog);
        this.appendChild(modalWrapper);
    }

    showModal() {
        this.querySelector('.modal').style.display = 'block';
        document.body.classList.add(this.config.modalOpenClass);

        // Create backdrop
        this.backdrop = document.createElement('div');
        this.backdrop.className = 'modal-backdrop fade show';
        document.body.appendChild(this.backdrop);
    }

    hideModal() {
        this.querySelector('.modal').style.display = 'none';
        document.body.classList.remove(this.config.modalOpenClass);

        if (this.backdrop) {
            this.backdrop.remove();
            this.backdrop = null;
        }
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

customElements.define('modal-component', ModalComponent);
