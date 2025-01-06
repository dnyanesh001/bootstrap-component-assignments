class ModalComponent extends HTMLElement {
    static observedAttributes = ["config", "data"];

    defaultConfig = {
        modalContainerClass: "modal",
        modalDialogClass: "modal-dialog",
        modalContentClass: "modal-content",
        modalHeaderClass: "modal-header",
        modalTitleClass: "modal-title",
        modalBodyClass: "modal-body",
        modalFooterClass: "modal-footer",
        closeButtonClass: "close",
        backdropClass: "modal-backdrop fade show",
        modalOpenClass: "modal-open",
    };

    defaultData = {
        title: "Default Modal Title",
        tableData: [ {"name": "John Doe", "age": 25, "qualification": "B.Sc", "email": "john@example.com"},
            {"name": "Jane Smith", "age": 28, "qualification": "M.A", "email": "jane@example.com"},],
        galleryImages: [ {"src": "https://via.placeholder.com/100", "alt": "Sample Image 1"}],
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
        this.addEventListeners();
    }

    attributeChangedCallback(name, oldValue, newValue) {
        try {
            if (name === "config" && typeof newValue === "string") {
                this.config = Object.assign(this.config, JSON.parse(newValue));
            }
            if (name === "data" && typeof newValue === "string") {
                this.data = Object.assign(this.data, JSON.parse(newValue));
            }
        } catch (error) {
            console.error("Error parsing attributes:", error);
        }

        this.renderComponent();
    }

    renderComponent() {
        this.innerHTML = "";
        const modalContainer = this.createElement("div", this.config.modalContainerClass);
        modalContainer.style.display = "none";

        const modalDialog = this.createElement("div", this.config.modalDialogClass);
        const modalContent = this.createElement("div", this.config.modalContentClass);

        modalContent.appendChild(this.renderHeader());
        modalContent.appendChild(this.renderBody());
        modalContent.appendChild(this.renderFooter());

        modalDialog.appendChild(modalContent);
        modalContainer.appendChild(modalDialog);
        this.appendChild(modalContainer);
    }

    renderHeader() {
        const modalHeader = this.createElement("div", this.config.modalHeaderClass);
        const modalTitle = this.createElement("h5", this.config.modalTitleClass, this.data.title);
        const closeButton = this.createElement("button", this.config.closeButtonClass, "×");
        closeButton.setAttribute("aria-label", "Close");

        modalHeader.appendChild(modalTitle);
        modalHeader.appendChild(closeButton);
        return modalHeader;
    }

    renderBody() {
        const modalBody = this.createElement("div", this.config.modalBodyClass);
        modalBody.appendChild(this.renderTable());
        modalBody.appendChild(this.renderGallery());
        modalBody.appendChild(this.renderForm());
        return modalBody;
    }

    renderFooter() {
        const modalFooter = this.createElement("div", this.config.modalFooterClass);
        const closeBtn = this.createElement("button", "btn btn-secondary close", "Close");
        const submitBtn = this.createElement("button", "btn btn-primary submit-btn", "Submit");

        modalFooter.appendChild(closeBtn);
        modalFooter.appendChild(submitBtn);
        return modalFooter;
    }

    renderTable() {
        const table = this.createElement("table", "table table-bordered");
        const thead = this.createTableHeader();
        const tbody = this.createElement("tbody");

        this.data.tableData.forEach((row) => {
            const tr = this.createElement("tr");
            Object.values(row).forEach((cell) => {
                const td = this.createElement("td", "", cell);
                tr.appendChild(td);
            });
            tbody.appendChild(tr);
        });

        table.appendChild(thead);
        table.appendChild(tbody);
        return table;
    }
    createTableHeader() { // This code is used for dyanamic Field adding from outside the componets
        const thead = this.createElement("thead");
        const tr = this.createElement("tr");
        const headers = Object.keys(this.data.tableData[0] || {});
    
        headers.forEach((header) => {
            const th = this.createElement("th", "", header.charAt(0).toUpperCase() + header.slice(1));
            tr.appendChild(th);
        });
    
        thead.appendChild(tr);
        return thead;
    }
    renderGallery() {
        const gallery = this.createElement("div", "gallery-grid d-flex justify-content-around");
        this.data.galleryImages.forEach((image) => {
            const img = this.createElement("img", "img-thumbnail");
            img.src = image.src;
            img.alt = image.alt;
            gallery.appendChild(img);
        });
        return gallery;
    }

    renderForm() {
        const form = this.createElement("form", "");
        form.id = "studentForm";

        form.appendChild(this.createField("Name", "name", "text"));
        form.appendChild(this.createField("Age", "age", "number"));
        form.appendChild(this.createField("Email", "email", "email"));

        return form;
    }

    createField(labelText, id, type) {
        const div = this.createElement("div", "mb-3");
        const label = this.createElement("label", "form-label", labelText);
        label.setAttribute("for", id);

        const input = this.createElement("input", "form-control");
        input.type = type;
        input.id = id;
        input.required = true;

        div.appendChild(label);
        div.appendChild(input);
        return div;
    }

    createElement(tag, className, content = "") {
        const element = document.createElement(tag);
        if (className) element.className = className;
        if (content) element.textContent = content;
        return element;
    }

    addEventListeners() {
        this.addEventListener("click", (e) => {
            if (e.target.classList.contains("close")) this.hideModal();
            if (e.target.classList.contains("submit-btn")) this.handleSubmit();
        });

        document.addEventListener("keydown", (e) => {
            if (e.key === "Escape") this.hideModal();
        });
    }

    showModal() {
        const modal = this.querySelector(`.${this.config.modalContainerClass}`);
        modal.style.display = "block";
        document.body.classList.add(this.config.modalOpenClass);
        this.createBackdrop();
    }

    hideModal() {
        const modal = this.querySelector(`.${this.config.modalContainerClass}`);
        modal.style.display = "none";
        document.body.classList.remove(this.config.modalOpenClass);
        this.removeBackdrop();
    }

    createBackdrop() {
        this.backdrop = this.createElement("div", this.config.backdropClass);
        document.body.appendChild(this.backdrop);
    }

    removeBackdrop() {
        if (this.backdrop) {
            this.backdrop.remove();
            this.backdrop = null;
        }
    }

    handleSubmit() {
        const form = this.querySelector("#studentForm");
        if (form.checkValidity()) {
            alert("Form submitted successfully!");
            this.hideModal();
        } else {
            form.reportValidity();
        }
    }
}

customElements.define("modal-component", ModalComponent);

if (!window.customElementsList) window.customElementsList = [];
window.customElementsList.push({ component: "modal-component", componentClass: ModalComponent });
