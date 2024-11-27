class AccordionComponent extends HTMLElement {
    static observedAttributes = ["config", "data"];
  
    defaultConfig = {
      animation: true,
      isOpen: false,
      closeOthers: true,
      isFlush: false,
      bgColor: '#f8f9fa',
      alternateBg: '#ffffff',
      elementClasses: 'border rounded',
 
    };
    
    defaultData = {
      heading: "My Custom Accordion sgr",
      subHeading: "Additional Information sfrs",
      description: "Here is a custom accordion built using Web Components and Bootstrap seer.",
      links: [{label: "Gmail", url: "https://mail.google.com/"},
        {label: "GitHub", url: "https://github.com/"}],
      accordionData: [
        {
          heading: "Accordion Item 1 sfs",
          body: "This is the content of the first accordion item sfss.",
          table: [
            {srNo: 1, name: "Adarsh Ovhal", email: "adarshovhal@gmail.com"},
            {srNo: 2, name: "Shirish Panchal", email: "shirish@gmail.com"}
          ]
        },
        {
          heading: "Accordion Item 2",
          body: "This is the content of the second accordion item."
        }
      ]
    };
  
    config = {};
    data = {};
  
    constructor() {
      super();
      this.config = { ...this.defaultConfig };
      this.data = { ...this.defaultData };
    }
  
    connectedCallback() {
      this.renderComponent();
    }
  
    attributeChangedCallback(name, oldValue, newValue) {
      if (name === 'config' && typeof newValue === 'string') {
        try {
          this.config = Object.assign(this.config, JSON.parse(newValue));
        } catch (e) {
          console.error("Invalid JSON for config");
        }
      }
  
      if (name === 'data' && typeof newValue === 'string') {
        try {
          this.data = Object.assign(this.data, JSON.parse(newValue));
        } catch (e) {
          console.error("Invalid JSON for data");
        }
      }
  
      this.renderComponent();
    }
  
    renderComponent() {
      
      this.innerHTML = '';
  
      const header = document.createElement('h1');
      header.textContent = this.data.heading;
      this.appendChild(header);
  
      const subHeader = document.createElement('h3');
      subHeader.textContent = this.data.subHeading;
      this.appendChild(subHeader);
  
      const description = document.createElement('p');
      description.textContent = this.data.description;
      this.appendChild(description);
  
      const linkContainer = document.createElement('div');
      linkContainer.className = 'mb-3';
      
      this.data.links.forEach((link) => {
        const anchor = document.createElement('a');
        anchor.href = link.url;
        anchor.textContent = link.label;
        anchor.className = 'me-2';
        linkContainer.appendChild(anchor);
      });
      
      this.appendChild(linkContainer);
  
      const accordion = document.createElement('div');
      accordion.className = 'accordion';

      if (this.config.isFlush) {
        accordion.classList.add('accordion-flush');
      }
      accordion.id = 'customAccordion';
  
      this.data.accordionData.forEach((item, index) => {
        const card = document.createElement('div');
        card.className = 'accordion-item ' + this.config.elementClasses;
        card.style.backgroundColor = index % 2 === 0 ? this.config.bgColor : this.config.alternateBg;
  
        const cardHeader = document.createElement('h2');
        cardHeader.className = 'accordion-header';
        cardHeader.id = 'heading-' + index;
  
        const button = document.createElement('button');
        button.className = 'accordion-button';
        if (!this.config.isOpen) {
          button.classList.add('collapsed');
        }
        button.type = 'button';
        button.setAttribute('data-bs-toggle', 'collapse');
        button.setAttribute('data-bs-target', '#collapse-' + index); 
        button.setAttribute('aria-expanded', this.config.isOpen);
        button.textContent = item.heading;
  
        cardHeader.appendChild(button);
        card.appendChild(cardHeader);
  
        const collapse = document.createElement('div');
        collapse.className = 'accordion-collapse collapse';
        if (this.config.isOpen) {
          collapse.classList.add('show');
        }
        collapse.id = 'collapse-' + index;
        collapse.setAttribute('aria-labelledby', 'heading-' + index);
        collapse.setAttribute('data-bs-parent', this.config.closeOthers ? '#customAccordion' : ''); 

        if (this.config.animation) {
        collapse.style.transition = (`max-height`, this.config.animationDuration, this.config.animationTiming);
        collapse.style.backgroundColor = 'lightblue';  
        collapse.style.overflow = 'hidden';  
        }
  
        const cardBody = document.createElement('div');
        cardBody.className = 'accordion-body';
  
        const bodyText = document.createElement('p');
        bodyText.textContent = item.body;
        cardBody.appendChild(bodyText);
  
        if (item.table) {
        const table = this.createTable(item.table);
        cardBody.appendChild(table);
        }
  
        collapse.appendChild(cardBody);
        card.appendChild(collapse);
        accordion.appendChild(card);
      });
  
      this.appendChild(accordion);
    }
  
    createTable(tableData) {
      const table = document.createElement('table');
      table.className = 'table table-striped';
  
      const thead = document.createElement('thead');
      const trHead = document.createElement('tr');
      
      const th1 = document.createElement('th');
      th1.textContent = 'No.'; 
      

      const th2 = document.createElement('th');
      th2.textContent = 'Name';
      
      
      const th3 = document.createElement('th');
      th3.textContent = 'Email';
      
  
      trHead.appendChild(th1);
      trHead.appendChild(th2);
      trHead.appendChild(th3);
      thead.appendChild(trHead);
      table.appendChild(thead);
  
      const tbody = document.createElement('tbody');
      tableData.forEach((row) => {
        const trBody = document.createElement('tr');
  
        const td1 = document.createElement('td');
        td1.textContent = row.srNo;
  
        const td2 = document.createElement('td');
        td2.textContent = row.name;
  
        const td3 = document.createElement('td');
        td3.textContent = row.email;
  
        trBody.appendChild(td1);
        trBody.appendChild(td2);
        trBody.appendChild(td3);
        tbody.appendChild(trBody);
      });
  
      table.appendChild(tbody);
      return table;
    }
  }
  
  customElements.define('accordion-component', AccordionComponent);
  
  if (!window.customElementsList) window.customElementsList = [];
  window.customElementsList.push({ component: 'accordion-component', componentClass: AccordionComponent });
  
