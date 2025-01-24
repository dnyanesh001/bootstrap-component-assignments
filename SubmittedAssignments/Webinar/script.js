class EnglishWorkshopComponent extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    this.shadowRoot.innerHTML = `
      <style>
        .bg-primary { background-color: #007bff; color: white; padding: 20px; text-align: center; }
        .bg-light { background-color: #f8f9fa; }
        .bg-dark { background-color: #343a40; color: white; text-align: center; padding: 20px; }
        .fomo-heading { background-color: #ffefd5; padding: 20px; text-align: center; border-radius: 10px; }
        .btn { display: inline-block; padding: 10px 20px; margin: 10px; border: none; cursor: pointer; font-size: 18px; }
        .btn-warning { background-color: #ffc107; color: black; }
        .btn-warning:hover { background-color: #e0a800; }
        .btn-info { background-color: #17a2b8; color: white; }
        .btn-info:hover { background-color: #117a8b; }
      </style>
      <header class="bg-primary">
        <h1>📢 Join Our FREE English Communication Workshop! 🎉</h1>
        <p>Learn English by doing, with exciting enactments and group activities!</p>
        <button class="btn btn-warning" id="register-btn">Register Now 📲</button>
      </header>
      <section class="fomo-heading">
        <h2 class="text-danger">⏳ Only 40 Seats Available! Register Before 28th January 2025!</h2>
        <p class="fw-bold">Don't miss this golden opportunity to improve your English communication skills absolutely FREE!</p>
        <button class="btn btn-warning" id="register-btn">Register Now 📲</button>
      </section>
      <section>
        <h3 class="text-primary">Workshop Details</h3>
        <ul>
          <li>📅 <strong>Date:</strong> 30th January 2025</li>
          <li>⏳ <strong>Time:</strong> 11:00 AM</li>
          <li>🕒 <strong>Duration:</strong> 3 Hours</li>
          <li>🏫 <strong>By:</strong> DY Patil English Department</li>
          <li>📍 <strong>Location:</strong> SwayamGuru TechLok</li>
        </ul>
        <button class="btn btn-warning" id="register-btn">Register Now 📲</button>
      </section>
      <section class="bg-light text-center">
        <h3>🎯 Ready to Improve Your English Communication?</h3>
        <p>Seize this opportunity to boost your confidence and language skills in a fun and interactive way!</p>
        <button class="btn btn-warning" id="register-btn">Register Now 📲</button>
        <button class="btn btn-info" onclick="contactWhatsApp()">WhatsApp: 8999417889 📲</button>
      </section>
      <footer class="bg-dark">
        <p>📞 For more information, contact us at +91 8999417889</p>
        <small>© 2025 DY Patil English Department. All Rights Reserved.</small>
      </footer>
    `;

    this.shadowRoot.getElementById('register-btn').addEventListener('click', () => this.registerNow());
  }

  connectedCallback() {
    this.updateData();
  }

  static get observedAttributes() {
    return ['data'];
  }

  attributeChangedCallback(name, oldValue, newValue) {
    if (name === 'data') {
      this.updateData();
    }
  }

  updateData() {
    const rawData = this.getAttribute('data');
    try {
      this.data = JSON.parse(rawData);
      console.log('Received data:', this.data);
    } catch (error) {
      console.error('Invalid JSON data:', rawData);
    }
  }

  registerNow() {
    if(this.data && this.data.UserDetails && this.data.UserDetails.id){
        let customEvent = new CustomEvent('submit', {
            bubbles: true,
            cancelable: true,
            detail: {
                data: {
                    dataModel: 'participants',
                    data: {participantId:this.data.UserDetails.id,appointmentId:"abc"},
                },
            },
        });
        this.dispatchEvent(customEvent);
    }
    else{
        let customEvent = new CustomEvent('redirect', {
            bubbles: true,
            cancelable: true,
            detail: {
                data: {
                    isExternalRedirect: true,
                    redirectUrl:"http://localhost:4200/auth/quick-register?redirect=/w/67931dc7c233a75cbff31f5a/free-english-workshop"
                },
            },
        });
        this.dispatchEvent(customEvent);
    }
  }
}

customElements.define('english-workshop-component', EnglishWorkshopComponent);
