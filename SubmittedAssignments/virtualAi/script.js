

class VirtualAssistant extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });

    // Default configuration
    this.defaultConfig = {
      assistantClass: "bg-white shadow rounded-3",
      chatClass: "bg-light border-start overflow-auto",
      logoClass: "mb-3 p-2",
      videoClass: "w-100 mb-3 bg-dark rounded",
      micButtonClass: "btn btn-primary rounded-5 d-flex align-items-center justify-content-center mb-2",
      cameraButtonClass: "btn btn-primary rounded-5",
      chatBubbleUserClass: "bg-info text-white",
      chatBubbleAIClass: "bg-secondary text-white",
      micIcon: "mic.svg", // Default mic icon
    };

    // Default data
    this.defaultData = {
      name: "Assistant",
      title: "Virtual Assistant",
      logo: "logo.jpg", // Default logo
    };
  }

  connectedCallback() {
    // Merge user config with defaults
    const userConfig = JSON.parse(this.getAttribute("config") || "{}");
    const config = { ...this.defaultConfig, ...userConfig };

    const name = this.getAttribute("data-name") || this.defaultData.name;
    const title = this.getAttribute("data-title") || this.defaultData.title;
    const logo = this.getAttribute("data-logo") || this.defaultData.logo;

    // Add Bootstrap stylesheet to shadow DOM
    const bootstrapLink = document.createElement("link");
    bootstrapLink.rel = "stylesheet";
    bootstrapLink.href = "https://cdn.jsdelivr.net/npm/bootstrap@5.3.0-alpha3/dist/css/bootstrap.min.css";

    // Append stylesheet to shadow root
    this.shadowRoot.appendChild(bootstrapLink);

    // Render the component
    this.createComponent(name, title, config, logo);
    this.addEventListeners(config);
  }

  createComponent(name, title, config) {
// Root container
const container = document.createElement("div");
container.classList.add("d-flex", "flex-row", "vh-100", "bg-light");

// Assistant Section
const assistant = document.createElement("div");
assistant.className = config.assistantClass;
assistant.style.maxWidth = "600px";
assistant.style.margin = "auto";
assistant.style.display = "flex";
assistant.style.flexDirection = "column";
assistant.style.alignItems = "center"; // Align items to the center horizontally

// Logo
const logo = document.createElement("img");
logo.src = "logo.jpg";
logo.alt = "logo";
logo.className = config.logoClass;
logo.style.width = "100px";
assistant.appendChild(logo);

// Video Feed
const videoFeed = document.createElement("video");
videoFeed.id = "video-feed";
videoFeed.autoplay = true;
videoFeed.muted = true;
videoFeed.className = config.videoClass;
videoFeed.style.maxWidth = "400px";
videoFeed.style.height = "250px";
videoFeed.style.display = "none";
assistant.appendChild(videoFeed);

// Title
const titleElement = document.createElement("h1");
titleElement.classList.add("fs-4", "text-dark", "mb-3", "text-center");
titleElement.innerHTML = `I'm <span id="name">${name}</span>, Your <span id="va">${title}</span>`;
assistant.appendChild(titleElement);

// Button Wrapper for Centering
const buttonWrapper = document.createElement("div");
buttonWrapper.style.display = "flex";
buttonWrapper.style.flexDirection = "column";
buttonWrapper.style.alignItems = "center";
buttonWrapper.style.justifyContent = "center";
buttonWrapper.style.width = "100%";
buttonWrapper.style.marginTop = "1rem";

// Mic Button
const micButton = document.createElement("button");
micButton.id = "btn-mic";
micButton.className = config.micButtonClass;

const micIcon = document.createElement("img");
micIcon.src = "mic.svg";
micIcon.alt = "mic";
micIcon.style.width = "20px";
micIcon.classList.add("me-2");
micButton.appendChild(micIcon);

const micText = document.createElement("span");
micText.textContent = "Start Mic";
micButton.appendChild(micText);
buttonWrapper.appendChild(micButton);

// Camera Button
const cameraButton = document.createElement("button");
cameraButton.id = "btn-camera";
cameraButton.className = config.cameraButtonClass;
cameraButton.textContent = "Allow Camera";
buttonWrapper.appendChild(cameraButton);

// Append buttonWrapper to assistant
assistant.appendChild(buttonWrapper);

// Chat Section
const chatSection = document.createElement("div");
chatSection.id = "chat-section";
chatSection.className = config.chatClass;
chatSection.style.width = "350px";
chatSection.style.height = "100vh";
chatSection.style.padding = "1rem";
chatSection.style.overflowY = "auto";

// Append sections to the root container
container.appendChild(assistant);
container.appendChild(chatSection);

// Append the container to the shadow DOM
this.shadowRoot.appendChild(container);
}

  addEventListeners(config) {
    const shadow = this.shadowRoot;
    const btnMic = shadow.querySelector("#btn-mic");
    const btnCamera = shadow.querySelector("#btn-camera");
    const videoFeed = shadow.querySelector("#video-feed");
    const chatSection = shadow.querySelector("#chat-section");

    let isMicOn = false;
    let isCameraOn = false;

    const addChatMessage = (message, isAI = false) => {
      const chatMessage = document.createElement("div");
      chatMessage.classList.add("d-flex", "mb-3", isAI ? "justify-content-end" : "justify-content-start");

      const bubble = document.createElement("div");
      bubble.className = `p-2 rounded-pill fs-6 ${isAI ? config.chatBubbleAIClass : config.chatBubbleUserClass}`;
      bubble.textContent = message;

      chatMessage.appendChild(bubble);
      chatSection.appendChild(chatMessage);

      chatSection.scrollTop = chatSection.scrollHeight;
    };

    const speak = (text) => {
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = "en-US";
      window.speechSynthesis.speak(utterance);
    };

    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    const recognition = new SpeechRecognition();

    recognition.onresult = (event) => {
const transcript = event.results[0][0].transcript.toLowerCase();
addChatMessage(transcript);

let reply = "";
if (transcript.includes("hello")) {
reply = "Hi there! How can I assist you today?";
} else if (transcript.includes("who is mahesh")) {
reply = "Mahesh is a software developer at Apnasite. He is skilled in multiple technologies and a valuable member of the team!";
} else if (transcript.includes("who is kapil")) {
reply = "majya kaka ch office hay";
}
else if (transcript.includes("time")) {
reply = `The current time is ${new Date().toLocaleTimeString()}.`;
} else {
reply = `I don't understand "${transcript}". Please try again.`;
}

addChatMessage(reply, true);
speak(reply);
};


    btnMic.addEventListener("click", () => {
      isMicOn = !isMicOn;
      if (isMicOn) {
        btnMic.querySelector("span").textContent = "Mic Off";
        recognition.start();
      } else {
        btnMic.querySelector("span").textContent = "Start Mic";
        recognition.stop();
      }
    });

    btnCamera.addEventListener("click", () => {
      isCameraOn = !isCameraOn;

      if (isCameraOn) {
        navigator.mediaDevices
          .getUserMedia({ video: true })
          .then((stream) => {
            videoFeed.srcObject = stream;
            videoFeed.style.display = "block";
            btnCamera.textContent = "Camera Off";
          })
          .catch((err) => {
            console.error("Camera access denied:", err);
            alert("Unable to access camera.");
          });
      } else {
        const tracks = videoFeed.srcObject?.getTracks();
        tracks?.forEach((track) => track.stop());
        videoFeed.style.display = "none";
        btnCamera.textContent = "Allow Camera";
      }
    });
  }
}

customElements.define("virtual-assistant", VirtualAssistant);
