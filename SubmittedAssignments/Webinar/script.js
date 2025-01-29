class EnglishWorkshopComponent extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    this.shadowRoot.innerHTML = `
      <style>
    @import url('https://stackpath.bootstrapcdn.com/bootstrap/4.5.2/css/bootstrap.min.css');
    .fomo-heading {
        background-color: #ffefd5;
        padding: 20px;
        text-align: center;
        border-radius: 10px;
    }
    .cta-btn {
        background-color: #007bff;
        color: white;
        font-weight: bold;
    }
    .cta-btn:hover {
        background-color: #0056b3;
    }
</style>

<!-- Header Section -->
<header class="bg-primary text-white text-center py-5">
    <div class="container">
        <h1 class="display-4">📢 Soft Skills Workshop by Dr. D. Y. Patil ACS College, Pimpri</h1>
        <p class="lead">An exclusive workshop for Maha Mission Education and Career Council graduates!</p>
        <button class="btn btn-warning" id="register-btn">Register Now 📲</button>
    </div>
</header>

<!-- FOMO Section -->
<section class="fomo-heading my-5">
    <div class="container">
        <h2 class="text-danger">⏳ Only 40 Seats Available! Register Before 28th January 2025!</h2>
        <p class="fw-bold">Don't miss this opportunity to boost your soft skills absolutely FREE!</p>
        <button class="btn btn-warning" id="register-btn">Register Now 📲</button>
    </div>
</section>

<!-- Workshop Details Section -->
<section class="container my-5">
    <div class="row align-items-center">
        <div class="col-md-6 mb-4">
            <h3 class="text-primary">Workshop Details</h3>
            <ul class="list-group">
                <li class="list-group-item">📅 <strong>Date:</strong> 30th January 2025</li>
                <li class="list-group-item">⏳ <strong>Time:</strong> 11:00 AM</li>
                <li class="list-group-item">🕒 <strong>Duration:</strong> 3 Hours</li>
                <li class="list-group-item">🏫 <strong>By:</strong> Department of English, Dr. D. Y. Patil ACS College</li>
                <li class="list-group-item">📍 <strong>Location:</strong> SwayamGuru TechLok</li>
            </ul>
            <button class="btn btn-warning" id="register-btn">Register Now 📲</button>
        </div>
        <div class="col-md-6 text-center">
            <img src="https://apnaguru.in/api/download/apnaguru.in/.%20Tushar%20/4d44b43a-8519-48f5-9243-2ed122acd29d.webp" alt="Workshop" class="img-fluid rounded">
        </div>
    </div>
</section>

<!-- Purpose of the Workshop -->
<section class="container my-5">
    <h3 class="text-center text-primary">Purpose of the Workshop</h3>
    <p class="text-center">This interactive workshop aims to equip participants with essential soft skills necessary to thrive in academic and professional settings.</p>
</section>

<!-- Key Features and Benefits -->
<section class="container my-5">
    <h3 class="text-center text-primary">Key Features and Benefits</h3>
    <ul class="list-group">
        <li class="list-group-item">✅ Enhanced Employability: Develop communication, teamwork, and creative thinking skills.</li>
        <li class="list-group-item">✅ Practical Insights: Activities simulating real-world scenarios.</li>
        <li class="list-group-item">✅ Engaging Sessions: Interactive and fun activities for active participation.</li>
        <li class="list-group-item">✅ Improved Confidence: Gain the ability to present yourself effectively.</li>
    </ul>
</section>

<!-- Activities Overview -->
<section class="container my-5">
    <h3 class="text-center text-primary">Activities Overview</h3>
    <ul class="list-group">
        <li class="list-group-item">🎭 <strong>Skit on Interview and Workplace Communication:</strong> A dramatized performance focusing on interview preparation and workplace communication.</li>
        <li class="list-group-item">📄 <strong>Session on Resume Writing:</strong> Learn how to craft a compelling, professional resume.</li>
        <li class="list-group-item">🔤 <strong>Object Guessing for Vocabulary Improvement:</strong> A fun activity to enhance vocabulary through word clues.</li>
        <li class="list-group-item">📖 <strong>Continue the Story:</strong> A storytelling exercise to boost creativity and teamwork.</li>
        <li class="list-group-item">🗣 <strong>Chinese Whispers:</strong> A game to improve listening skills and clarity in communication.</li>
    </ul>
</section>

<!-- Call-to-Action Section -->
<section class="bg-light py-5">
    <div class="container text-center">
        <h3 class="mb-4">🎯 Ready to Improve Your Soft Skills?</h3>
        <p class="mb-4">Seize this opportunity to gain confidence and essential professional skills. Limited seats available—act fast!</p>
        <button class="btn btn-warning" id="register-btn">Register Now 📲</button>
        <a href="https://wa.me/918999417889" class="btn btn-lg btn-info">WhatsApp: 8999417889 📲</a>
    </div>
</section>

<!-- Footer Section -->
<footer class="bg-dark text-white py-4">
    <div class="container text-center">
        <p class="mb-0">📞 For more information, contact us at +91 8999417889</p>
    </div>
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
                    data: {participantId:this.data.UserDetails.id,appointmentId:"67932ffbcd0aef70d2a1c654"},
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
                    redirectUrl:"https://apnaguru.in/auth/quick-register?redirect=/w/67931dc7c233a75cbff31f5a/free-english-workshop&source=EnglishMasterClass&showMessage=true&leadCategory=Service&leadType=MasterClass&module=LMS&placement=hero"
                },
            },
        });
        this.dispatchEvent(customEvent);
    }
  }
}

customElements.define('english-workshop-component', EnglishWorkshopComponent);
