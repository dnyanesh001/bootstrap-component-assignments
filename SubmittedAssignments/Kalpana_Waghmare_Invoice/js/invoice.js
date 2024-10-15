class InvoiceComponent extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: "open" });
        this.config = {
            backgroundDiv: "invoice-wrapper",
            backgroundClass: "invoice-background",
            rectTop1: "rect-top-1",
            rectTop2: "rect-top-2",
            rectTop3: "rect-top-3",
            rectTop4: "rect-top-4",
            rectTop5: "rect-top-5",
            rectBottom1: "rect-bottom-1",
            rectBottom2: "rect-bottom-2",
            rectBottom3: "rect-bottom-3",
            rectBottom4: "rect-bottom-4",
            contentClass: "invoice-content",
            titleClass: "invoice-title",
            headerClass: "invoice-header",
            logoClass: "invoice-header-logo",
            detailsClass: "invoice-details",
            addressClass: "org-address",
            detailsHeaderClass: "details-header",
            tableClass: "content-table",
            tableHeaderClass: "content-header",
            totalClass: "total-amount",
            bankDetailsClass: "bank-details",
            termsClass: "terms",
            footerClass: "invoice-footer"
        };



        this.data = {
            companyName: "Tata Technologies",
            gstNo: "27AAKCS1234H1Z5",
            title: "Tax Invoice",

            invoiceNumber: "INV-123456",
            invoiceDate: "2023-10-01",
            dueDate: "2023-10-15",
            poNumber: "PO-456789",
            logo: "./Images/Logo.png",
            companyAddress: [
                "City: Pune",
                "State: Maharashtra",
                "Country: India",
                "Pincode: 411018",
                "Mobile: 9999999999",
                "Email: Swipe@getswipe.in",
                "Website: www.getswipe.in"
            ],
            customer: {
                billing: {
                    name: "Natarajan Chandrasekaran",
                    address: [
                        "Survey 115/1, RK Lane, Fursungi",
                        "Hadpasar, Pune",
                        "City: Nanakramguda",
                        "State: TELANGANA",
                        "Country: INDIA",
                        "Pincode: 500032",
                        "Email: natrajan@gmail.com",
                        "Ph: 9999999999",
                    ],
                },
                shipping: {
                    name: "Natarajan Chandrasekaran",
                    address: [
                        "Survey 115/1, ISB Rd, Financial District",
                        "Gachibowli, Nanakramguda",
                        "City: Nanakramguda",
                        "State: TELANGANA",
                        "Country: INDIA",
                        "Pincode: 500032",
                        "Email: natrajan@gmail.com",
                        "Ph: 9999999999",
                    ],
                },
            },
            items: [
                {
                    item: "Tata Nexon",
                    hsn: "87038070",
                    rate: "8,05,000.00",
                    qty: 1,
                    taxableValue: "8,05,000.00",
                    taxAmount: "1,44,900.00 (18%)",
                    amount: "9,49,900.00",
                },
                {
                    item: "Car accessories Kit",
                    hsn: "87089900",
                    rate: "2,117.80",
                    qty: 1,
                    taxableValue: "2,117.80",
                    taxAmount: "381.20 (18%)",
                    amount: "2,499.00",
                },
                {
                    item: "Tata Nexon",
                    hsn: "87038070",
                    rate: "8,05,000.00",
                    qty: 1,
                    taxableValue: "8,05,000.00",
                    taxAmount: "1,44,900.00 (18%)",
                    amount: "9,49,900.00",
                },
                {
                    item: "Car accessories Kit",
                    hsn: "87089900",
                    rate: "2,117.80",
                    qty: 1,
                    taxableValue: "2,117.80",
                    taxAmount: "381.20 (18%)",
                    amount: "2,499.00",
                },

            ],
            bankDetails: {
                bank: "YES BANK",
                account: "66789999922445",
                ifsc: "YESB0BNA567",
                branch: "Kodihalli",

            },
            terms: [
                "Goods once sold cannot be taken back or exchanged.",
                "We are not the manufacturers; the company will stand for warranty as per their terms and conditions.",
            ],
            totalAmountInWords:
                "INR Nine Lakh, Fifty-Two Thousand, Three Hundred And Ninety-Nine Rupees Only.",
        };

        this.render();
    }

    createElement(tag, className, html) {
        const element = document.createElement(tag);
        if (className) element.className = className;
        if (html) element.innerHTML = html;
        if (html === '<strong>Billing Address:</strong>' || html === '<strong>Shipping Address:</strong>')
            element.style.marginBottom = '5mm';
        return element;
    }

    createTableHeaderCell(text) {
        const th = this.createElement("th", null, text);
        return th;
    }

    createTableCell(text) {
        const td = this.createElement("td", null, text);
        return td;
    }

    render() {
        const wrapper = this.createElement("div", this.config.backgroundDiv);

        const backgroundDiv = this.createElement("div", this.config.backgroundClass);
        backgroundDiv.appendChild(this.createElement("div", this.config.rectTop1));
        backgroundDiv.appendChild(this.createElement("div", this.config.rectTop2));
        backgroundDiv.appendChild(this.createElement("div", this.config.rectTop3));
        backgroundDiv.appendChild(this.createElement("div", this.config.rectTop4));
        backgroundDiv.appendChild(this.createElement("div", this.config.rectTop5));
        backgroundDiv.appendChild(this.createElement("div", this.config.rectBottom1));
        backgroundDiv.appendChild(this.createElement("div", this.config.rectBottom2));
        backgroundDiv.appendChild(this.createElement("div", this.config.rectBottom3));
        backgroundDiv.appendChild(this.createElement("div", this.config.rectBottom4));
        wrapper.appendChild(backgroundDiv);

        const invoiceContent = this.createElement("div", this.config.contentClass);

        // Invoice Title
        const invoiceTitle = this.createElement("h1", this.config.titleClass, this.data.title);
        invoiceContent.appendChild(invoiceTitle);

        // Invoice Header
        const invoiceHeader = this.createElement("div", this.config.headerClass);
        const logo = this.createElement("img", this.config.logoClass);
        logo.src = this.data.logo;
        logo.alt = "Logo";
        invoiceHeader.appendChild(logo);

        const detailsDiv = this.createElement("div", this.config.detailsClass);
        detailsDiv.appendChild(this.createElement("div", "invoice-no", `<strong>Invoice #:</strong> ${this.data.invoiceNumber}`));
        detailsDiv.appendChild(this.createElement("div", "invoice-date", `<strong>Invoice Date:</strong> ${this.data.invoiceDate}`));
        detailsDiv.appendChild(this.createElement("div", "invoice-due-date", `<strong>Due Date:</strong> ${this.data.dueDate}`));
        detailsDiv.appendChild(this.createElement("div", "invoice-po-number", `<strong>PO Number:</strong> ${this.data.poNumber}`));
        invoiceHeader.appendChild(detailsDiv);


        // Company Details
        const companyDetailsDiv = this.createElement("div", "invoice-company-details");
        companyDetailsDiv.appendChild(this.createElement("div", "org-name", this.data.companyName));
        companyDetailsDiv.appendChild(this.createElement("div", "org-gst-no", this.data.gstNo));

        const orgAddressDiv = this.createElement("div", this.config.addressClass);
        this.data.companyAddress.forEach((line) => {
            orgAddressDiv.appendChild(this.createElement("p", null, line));
        });
        companyDetailsDiv.appendChild(orgAddressDiv);
        invoiceHeader.appendChild(companyDetailsDiv);
        invoiceContent.appendChild(invoiceHeader);

        // Customer Details
        const customerDetailsSection = this.createElement("div", "customer-details-section");
        const billingSection = this.createElement("div", "billing-address-section");
        billingSection.appendChild(this.createElement("div", this.config.detailsHeaderClass, "<strong>Billing Address:</strong>"));
        const billingAddressDiv = this.createElement("div", "details-cell party-billing-address");
        billingAddressDiv.appendChild(this.createElement("div", "party-name", this.data.customer.billing.name));
        this.data.customer.billing.address.forEach((line) => {
            billingAddressDiv.appendChild(this.createElement("p", null, line));
        });
        billingSection.appendChild(billingAddressDiv);
        customerDetailsSection.appendChild(billingSection);

        const shippingSection = this.createElement("div", "shipping-address-section");
        shippingSection.appendChild(this.createElement("div", this.config.detailsHeaderClass, "<strong>Shipping Address:</strong>"));
        const shippingAddressDiv = this.createElement("div", "details-cell party-shipping-address");
        shippingAddressDiv.appendChild(this.createElement("div", "party-name", this.data.customer.shipping.name));
        this.data.customer.shipping.address.forEach((line) => {
            shippingAddressDiv.appendChild(this.createElement("p", null, line));
        });
        shippingSection.appendChild(shippingAddressDiv);
        customerDetailsSection.appendChild(shippingSection);

        invoiceContent.appendChild(customerDetailsSection);

        // Items Table Section
        const items = this.createElement("div", "items");
        const table = this.createElement("table", this.config.tableClass);

        const thead = this.createElement("thead");
        const headerRow = this.createElement("tr");

        // Declare and collect all unique keys from the items array
        const allKeys = new Set();
        this.data.items.forEach((item) => {
            Object.keys(item).forEach((key) => {
                allKeys.add(key);
            });
        });

        // Create table header
        allKeys.forEach((key) => {
            headerRow.appendChild(this.createTableHeaderCell(key.charAt(0).toUpperCase() + key.slice(1)));
        });

        thead.appendChild(headerRow);
        table.appendChild(thead);

        // Create table body
        const tbody = this.createElement("tbody");
        this.data.items.forEach((item) => {
            const row = this.createElement("tr");

            allKeys.forEach((key) => {
                row.appendChild(this.createTableCell(item[key] || ""));
            });

            tbody.appendChild(row);
        });


        table.appendChild(tbody);

        items.appendChild(table);
        invoiceContent.appendChild(items);

        // Total Amount
        const totalDiv = this.createElement("div", this.config.totalClass);
        totalDiv.appendChild(this.createElement("div", null, `Total Amount in Words: ${this.data.totalAmountInWords}`));
        invoiceContent.appendChild(totalDiv);


        // Bank Details
        const bankDetailsDiv = this.createElement("div", this.config.bankDetailsClass);
        bankDetailsDiv.appendChild(this.createElement("div", null, `Bank: ${this.data.bankDetails.bank}`));
        bankDetailsDiv.appendChild(this.createElement("div", null, `Account: ${this.data.bankDetails.account}`));
        bankDetailsDiv.appendChild(this.createElement("div", null, `IFSC: ${this.data.bankDetails.ifsc}`));
        bankDetailsDiv.appendChild(this.createElement("div", null, `Branch: ${this.data.bankDetails.branch}`));
        invoiceContent.appendChild(bankDetailsDiv);

        // Terms
        const termsDiv = this.createElement("div", this.config.termsClass);
        termsDiv.appendChild(this.createElement("div", this.config.detailsHeaderClass, "Terms:"));
        this.data.terms.forEach((term) => {
            termsDiv.appendChild(this.createElement("div", null, term));
        });
        invoiceContent.appendChild(termsDiv);

        // Footer
        const footerDiv = this.createElement("div", this.config.footerClass);
        
        // Create the image element for the QR code
        const qrImage = this.createElement("img", null);
        qrImage.src = "./Images/QR_code.png"; // Adjust the path as necessary
        qrImage.alt = "QR Code"; // Set an appropriate alt text
        qrImage.style.width = "100px"; // Optional: Set width or height as needed
        qrImage.style.height = "auto"; // Maintain aspect ratio

        // Append the QR image to the footerDiv
        footerDiv.appendChild(qrImage);

        footerDiv.appendChild(this.createElement("div", null, `Date: ${this.data.invoiceDate}`));
        footerDiv.appendChild(this.createElement("div", null, `Authorized Signature: ____________________`));

        

        invoiceContent.appendChild(footerDiv);

        wrapper.appendChild(invoiceContent);
        this.shadowRoot.appendChild(wrapper);

        this.loadStyles();
    }

    loadStyles() {
        const styleSheet = document.createElement("link");
        styleSheet.rel = "stylesheet";
        styleSheet.href = "./css/style.css"; // Make sure this path is correct based on your project structure
        this.shadowRoot.appendChild(styleSheet);
    }
}

// Define the custom element
customElements.define("invoice-component", InvoiceComponent);
