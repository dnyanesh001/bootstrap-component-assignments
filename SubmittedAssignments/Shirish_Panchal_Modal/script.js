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
            openModalBtn.addEventListener('click', () => {
                this.querySelector('.modal').style.display = 'block';
                document.body.classList.add(this.config.modalOpenClass);
            });
        }

        // Attach event listener to close modal (header and footer close buttons)
        const closeModalBtns = this.querySelectorAll('.close');
        closeModalBtns.forEach(closeBtn => {
            closeBtn.addEventListener('click', () => {
                this.querySelector('.modal').style.display = 'none';
                document.body.classList.remove(this.config.modalOpenClass);
            });
        });
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
            </tr>
        `;

        // Populate table rows
        this.data.tableData.forEach(function(student) {
            const tr = document.createElement('tr');
            tr.innerHTML = `
                <td>` + student.name + `</td>
                <td>` + student.age + `</td>
                <td>` + student.qualification + `</td>
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
