//creating class for generaring web element using HTMLElement tag 
//FormComponent class inherits HTMLElement class 
class FormComponent extends HTMLElement {
    static observedAttributes = ["formData", "formConfig"];
        // Default configuration and data
        //providing default config class properties used for bootstrap designs.
        defaultConfig = {                                       
            "formStructure": "col-lg-6 col-md-12 col-12 m-5",
            "formF": "form",
            "inputStructure": "col-lg-6 col-md-6 col-12",
            "inputClass": "form-control mb-3",
            "textStructure": "col-12",
            "textareaClass": "form-control",
            "buttonClass": "btn btn-primary m-5"
        };
        // providing default data as attribute names and their properties
        defaultData = [
            {
                "name": "name",
                "type": "text",
                "placeholder": "Name",
                "required": true
            },
            {
                "name": "gender",
                "type": "text",
                "placeholder": "gender"
            },
            {
                "name": "email",
                "type": "email",
                "placeholder": "Email",
                "required": true
            },
            {
                "name": "phone",
                "type": "text",
                "placeholder": "Phone",
                "required": true
            },
            {
                "name": "department",
                "type": "select",
                "options": [
                    {
                        "value": 1,
                        "text": "Cardiac Clinic"
                    },
                    {
                        "value": 2,
                        "text": "Neurology"
                    },
                    {
                        "value": 3,
                        "text": "Dentistry"
                    },
                    {
                        "value": 4,
                        "text": "Gastroenterology"
                    }
                ],
                "placeholder": "Department",
                "required": false
            },
            {
                "name": "doctor",
                "type": "select",
                "options": [
                    {
                        "value": 1,
                        "text": "Dr. Akther Hossain"
                    },
                    {
                        "value": 2,
                        "text": "Dr. Dery Alex"
                    },
                    {
                        "value": 3,
                        "text": "Dr. Jovis Karon"
                    }
                ],
                "placeholder": "Doctor",
                "required": false
            },
           
            {
                "name": "message",
                "type": "textarea",
                "rows": "6",
                "cols": "12",
                "placeholder": "Write Your Message Here.....",
                "required": false
            },
            {
                "type": "submit",
            },
        ];
        //generating data and config variable haivng type objects
        data = {};
        config = {};
        constructor() {
            super();
            // Copy default data and config to instance properties
            this.data = [ ...this.defaultData ];
            this.config = { ...this.defaultConfig };
        }

    connectedCallback() {
        this.renderComponent();
    }

    attributeChangedCallback(name, newValue) {
        try {
            if (name === "formConfig" && typeof newValue === "string") {
                // Fixed typo: object.assign should be Object.assign
                this.config = Object.assign(...this.config, ...JSON.parse(newValue));
            }
            if (name === "formData" && typeof newValue === "string") {
                // Fixed typo: object.assign should be Object.assign
                this.data = Object.assign({}, this.data, ...JSON.parse(newValue));
            }
        } catch (e) {
            console.error(e);
        }
        this.renderComponent();
    }

    renderComponent() {
        // Ensure the shadow DOM is attached
        if (!this.shadowRoot) {
            this.attachShadow({ mode: 'open' });
        }
        const style = document.createElement("style");
        style.textContent = `@import url("https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css");`;

        // Clear the previous content
        this.shadowRoot.innerHTML = "";
        this.shadowRoot.appendChild(style)
        const formD = document.createElement("div");
        formD.className = this.config.formStructure;
        const form = document.createElement("form");
        form.className = this.config.formF;
        const row = document.createElement("div");
        row.className = "row";
        formD.appendChild(form);
        form.appendChild(row);

        this.data.forEach(field => {
            const inputStr = document.createElement("div");
            if (field.type === "textarea"){
                inputStr.className = this.config.textStructure;
            } else {
                inputStr.className = this.config.inputStructure;
            }
            
            let inputElement; // Declare inputElement here to avoid reference errors
            if (field.type === "select") {
                inputElement = document.createElement("select");
                inputElement.className = this.config.inputClass;
                field.options.forEach(option => {
                    const optionElement = document.createElement("option");
                    optionElement.value = option.value;
                    optionElement.text = option.text;
                    inputElement.appendChild(optionElement);
                });
            } else if (field.type === "textarea") {
                inputElement = document.createElement("textarea");
                inputElement.className = this.config.textareaClass;
                inputElement.rows = field.rows; // Make sure to set the rows attribute
                inputElement.cols= field.cols;
            }  else if (field.type === "submit") {
                inputElement = document.createElement("button");
                inputElement.textContent = "Book an Appointment";
                inputElement.className = this.config.buttonClass;
            }
            else {
                inputElement = document.createElement("input");
                inputElement.type = field.type;
                inputElement.className = this.config.inputClass;
            }

            inputElement.name = field.name;
            inputElement.placeholder = field.placeholder;
            
            if (field.required) {
                inputElement.required = true;
            }

            inputStr.appendChild(inputElement);
            row.appendChild(inputStr);

            const paragraph = document.createElement("p");
            paragraph.textContent = "(we will confirm by text message)";
        });

        this.shadowRoot.appendChild(formD);
    }
}

customElements.define('form-component', FormComponent);
