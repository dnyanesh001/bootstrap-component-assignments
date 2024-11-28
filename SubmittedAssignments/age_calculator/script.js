

class AgeCalculator extends HTMLElement {
    static observedAttributes = ["config", "data"];

    defaultConfig = {
        "wrapperClass": "card container py-4 col-md-3 bg-light",
        "headingClass": "text-primary border-bottom pb-2 text-center",
        "formWrapperClass": "card-body",
        "formClass": "form",
        "formGroupClass": "mb-3",
        "formLabelClass": "form-label",
        "formControlClass": "form-control",
        "resultWrapperClass": "card mt-3",
        "resultHeadingClass": "mb-3 h3",
        "resultClass": "btn btn-primary p-3 col-md-3 container text-center py-4",
        "resetButtonClass": "ms-3 btn btn-outline-danger ",

    }

    defaultData = {
        "heading": "Age Calculator",
        "dobLabel": "Date of Birth",
        "currentDateLabel": "Current Date",

    }

    data = {};
    config = {};

    constructor() {
        super();
    }

    connectedCallback() {
        console.log(this.data, this.config);
        if (this.data) {
            this.data = Object.assign(this.defaultData, this.data);
        }

        if (this.config) {
            this.config = Object.assign(this.defaultConfig, this.config);
        }

        this.renderComponent();
        // this.addEventListener('submit', (event) => {
        //     event.preventDefault();
        //     this.calculateAge();
        //     console.log(event)
        //     if (document.createEvent) {
        //         let event = document.createEvent("HTMLEvents");
        //         event.initEvent("update", true, true);
        //         event.eventName = "update";
        //         event.data = { data: this.data }
        //         this.dispatchEvent(event);
        //     }
        // })
    }


    attributeChangedCallback(name, oldValue, newValue) {

        try {
            if (name == 'config' && typeof newValue == 'string') {
                this.config = Object.assign(this.config, JSON.parse(newValue));
            }
            if (name == 'data' && typeof newValue == 'string') {
                this.data = Object.assign(this.data, JSON.parse(newValue));
            }
        } catch (e) {
            console.log(e)
        }

        this.renderComponent();
    }

    renderComponent() {
        this.innerHTML = '';
        let wrapperElm = this.divElement(this.config.wrapperClass)
        let headingElm = this.headingElement('h2', this.data.heading);
        wrapperElm.appendChild(headingElm);
        let formElm = this.formElement();
        wrapperElm.appendChild(formElm);

        let dobInput = this.datePickerElement('dob', 'dob', this.data.dobLabel);
        formElm.appendChild(dobInput);

        let currentDateInput = this.datePickerElement('currentDate', 'currentDate', this.data.currentDateLabel);
        formElm.appendChild(currentDateInput);

        let submitButton = this.buttonElement('submit', 'Calculate Age');
        formElm.appendChild(submitButton);
        let resetButton = this.buttonElement('reset', 'Reset');
        formElm.appendChild(resetButton);

        this.appendChild(wrapperElm);

        resetButton.onclick = (event) => {
            this.resetForm()
        }
    }

    // resetForm() {
    //     const dobInput = this.querySelector('#result');

    //     dobInput.innerHTML = '';
    // }

    divElement(className, content) {
        let elm = document.createElement('div');
        elm.className = className;
        if (content) {
            elm.innerHTML = content
        }
        return elm;
    }

    headingElement(heading, content) {
        let elm = document.createElement(heading);
        elm.className = this.config.headingClass;
        elm.innerHTML = content;
        return elm;
    }

    formElement() {
        let elm = document.createElement('form');
        elm.className = this.config.formClass;
        return elm;
    }

    datePickerElement(name, id, label) {
        let elm = document.createElement('div');
        elm.className = this.config.formGroupClass;
        let labelElm = this.labelElement(id, label);
        let inputElm = this.inputElement(name, id);
        inputElm.type = 'date';
        elm.appendChild(labelElm);
        elm.appendChild(inputElm);
        return elm;
    }

    inputElement(id, name) {
        let elm = document.createElement('input');
        elm.className = this.config.formControlClass;
        elm.id = id;
        elm.name = name;
        let date = new Date;
        console.log(date)
        elm.value = date.toISOString().split('T')[0]
        return elm;
    }

    labelElement(id, label) {
        let elm = document.createElement('label');
        elm.className = this.config.formLabelClass;
        elm.htmlFor = id;
        elm.innerHTML = label;
        return elm;
    }

    buttonElement(type, label) {
        let elm = document.createElement('button');
        elm.className = this.config.resultClass;
        elm.type = type;
        elm.innerHTML = label;
        return elm;
    }

    buttonElement(type, label) {
        let elm = document.createElement('button');
        elm.className = this.config.resetButtonClass;
        elm.type = type;
        elm.innerHTML = label;
        return elm;
    }

    // calculateAge() {
    //     let dobInput = this.querySelector('#dob').value;
    //     let currentDateInput = this.querySelector('#currentDate').value;

    //     // Calculate age here
    //     let ageResultEl = this.divElement(this.config.resultWrapperClass);
    //     ageResultEl.id = "result";
    //     let ageResultText = this.calculateAgeFromDate(dobInput, currentDateInput);
    //     ageResultEl.innerHTML = `<span class="${this.config.resultClass}">${ageResultText}</span>`;

    //     this.appendChild(ageResultEl);
    // }

    // calculateAgeFromDate(dob, currentDate) {
    //     const dobDate = new Date(dob);
    //     const currentDateDate = new Date(currentDate);

    //     const diffTime = Math.abs(currentDateDate - dobDate);
    //     const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    //     const years = Math.floor(diffDays / 365);
    //     const months = Math.floor((diffDays % 365) / 30);
    //     const days = Math.floor((diffDays % 365) % 30);
    //     const hours = Math.floor((diffDays % 365) % 30) * 24;
    //     const minutes = Math.floor(((diffDays % 365) % 30) * 24 * 60);
    //     const seconds = Math.floor(((diffDays % 365) % 30) * 24 * 60 * 60);

    //     return `${years} years, ${months} months, ${days} days, ${hours} hours, ${minutes} minutes, ${seconds} seconds`;
    // }

}

customElements.define('age-calculator', AgeCalculator);

if (!window.customElements) window.customElements = [];

window.customElements.push({ component: 'age-calculator', componentClass: AgeCalculator })

