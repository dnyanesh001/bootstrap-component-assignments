 class VirtualAssistant extends HTMLElement { 
  static get observedAttributes() {
    return ["config", "data"];
  }

  constructor() {
    super();
    this.config = { ...this.defaultConfig };
    this.data = { ...this.defaultData };
    this.currentQuestionIndex = 0;
    console.log('constructor', this.data);
  }

  defaultConfig = {
    assistantClass: "bg-dark shadow rounded-3",
    chatClass: "bg-light border-start overflow-auto",
    logoClass: "mb-3 p-2",
    videoClass: "w-100 mb-3 bg-danger rounded",
    micButtonClass: "btn btn-primary rounded-5 d-flex align-items-center justify-content-center mb-2",
    answerMicButtonClass: "btn btn-success rounded-5 d-flex align-items-center justify-content-center mt-2",
    cameraButtonClass: "btn btn-primary rounded-5",
    chatBubbleUserClass: "bg-info text-white",
    chatBubbleAIClass: "bg-danger text-white",
    micIcon: "mic.svg",
  };

  defaultData = {
    name: "Assistant",
    title: "Virtual Assistant",
    logo: "logo.jpg",
    Questions: [
      { id: 1, question: "What is your age?" },
      { id: 2, question: "How old are you?" },
      { id: 3, question: "Where are you from?" },
      { id: 4, question: "What is your favorite color?" },
      { id: 5, question: "What is your hobby?" }
    ]
  };

  connectedCallback() {
    this.renderComponent();
    this.addEventListeners();
    this.askQuestion();
  }

  attributeChangedCallback(name, oldValue, newValue) {
    if (name === "config") {
      try {
        const userConfig = JSON.parse(newValue);
        this.config = { ...this.defaultConfig, ...userConfig };
      } catch (e) {
        console.error("Invalid config JSON:", e);
      }
    } else if (name === "data") {
      try {
        const userData = JSON.parse(newValue);
        this.data = { ...this.defaultData, ...userData };
        console.log("attributeChangedCallback", this.data);
      } catch (e) {
        console.error("Invalid data JSON:", e);
      }
    }

    this.renderComponent();
  }

  renderComponent() {
    this.innerHTML = '';  // Clear the existing content

    const container = document.createElement("div");
    container.classList.add("d-flex", "flex-row", "vh-100", "bg-light");

    const assistant = document.createElement("div");
    assistant.className = this.config.assistantClass;
    assistant.style.maxWidth = "600px";
    assistant.style.margin = "auto";
    assistant.style.display = "flex";
    assistant.style.flexDirection = "column";
    assistant.style.alignItems = "center";

    // Add Video Element
    this.videoElement = document.createElement("video");
    this.videoElement.className = this.config.videoClass;
    this.videoElement.setAttribute("autoplay", "");
    this.videoElement.setAttribute("playsinline", "");
    assistant.appendChild(this.videoElement);

    const micButton = document.createElement("button");
    micButton.id = "btn-mic";
    micButton.className = this.config.micButtonClass;
    micButton.textContent = "Question Mic";
    assistant.appendChild(micButton);

    const answerMicButton = document.createElement("button");
    answerMicButton.id = "btn-answer-mic";
    answerMicButton.className = this.config.answerMicButtonClass;
    answerMicButton.textContent = "Answer Mic";
    assistant.appendChild(answerMicButton);

    const chatSection = document.createElement("div");
    chatSection.id = "chat-section";
    chatSection.className = this.config.chatClass;
    chatSection.style.width = "350px";
    chatSection.style.height = "100vh";
    chatSection.style.padding = "1rem";
    chatSection.style.overflowY = "auto";

    container.appendChild(assistant);
    container.appendChild(chatSection);
    this.appendChild(container);
}


  addEventListeners() {
    const btnMic = this.querySelector("#btn-mic");
    const btnAnswerMic = this.querySelector("#btn-answer-mic");
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    const recognition = new SpeechRecognition();
    const answerRecognition = new SpeechRecognition();

    recognition.onresult = (event) => {
      const transcript = event.results[0][0].transcript.toLowerCase();
      this.addChatMessage(transcript, false);
      this.handleUserQuestion(transcript);
    };

    answerRecognition.onresult = (event) => {
      const transcript = event.results[0][0].transcript;
      this.addChatMessage(`User: ${transcript}`, false);
      // this.speak(transcript);
    };
    answerRecognition.onresult = (event) => {
      const transcript = event.results[0][0].transcript;
      this.addChatMessage(`User: ${transcript}`, false);
      this.speak(transcript);

      const questionObj = this.data.Questions[this.currentQuestionIndex - 1] ; 
      if(questionObj){
        console.log(transcript);
        questionObj.answer = transcript;
        
        const customeEvent = (new CustomEvent("submit", {
          bubbles: true,
          cancelable: true,
          detail: {
           data:questionObj,datamodel:'test-quetions'
          }
        }))
        console.log("questionObj", questionObj)
        this.dispatchEvent(customeEvent);

      }

      // Ask the next question after user answers
      setTimeout(() => {
        this.askQuestion();
      }, 1000); // Add a small delay for better interaction
    };

    btnMic.addEventListener("click", () => recognition.start());
    btnAnswerMic.addEventListener("click", () => answerRecognition.start());
  }

  handleUserQuestion(question) {
    let reply = "";
    if (question.includes("name")) reply = "My name is Assistant.";
    else if (question.includes("old")) reply = "I am a virtual assistant, so I don't have an age.";
    else if (question.includes("from")) reply = "I exist in the digital world.";
    else if (question.includes("color")) reply = "I like all colors, but I'm particularly fond of blue.";
    else if (question.includes("hobby")) reply = "My hobby is helping you!";
    else reply = "I'm sorry, I don't understand that question.";
    
    this.addChatMessage(`Assistant: ${reply}`, true);
    this.speak(reply);
  }

  addChatMessage(message, isAI = false) {
    const chatSection = this.querySelector("#chat-section");
    const chatMessage = document.createElement("div");
    chatMessage.classList.add("d-flex", "mb-3", isAI ? "justify-content-end" : "justify-content-start");

    const bubble = document.createElement("div");
    bubble.className = `p-2 rounded-pill fs-6 ${isAI ? this.config.chatBubbleAIClass : this.config.chatBubbleUserClass}`;
    bubble.textContent = message;

    chatMessage.appendChild(bubble);
    chatSection.appendChild(chatMessage);
    chatSection.scrollTop = chatSection.scrollHeight;
  }

  speak(text) {
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = "en-US";
    window.speechSynthesis.speak(utterance);
  }
  

  

  askQuestion() {
    if (this.currentQuestionIndex === 0) {
        this.startCamera(); // Start the camera when the interview begins
    }
    
    const questionObj = this.data.Questions[this.currentQuestionIndex];
    if (!questionObj) return;
    
    const assistantMessage = `Assistant: ${questionObj.question}`;
    this.currentQuestionIndex++;
    this.addChatMessage(assistantMessage, true);
    this.speak(questionObj.question);
}
startCamera() {
  if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
      navigator.mediaDevices.getUserMedia({ video: true })
          .then(stream => {
              this.videoElement.srcObject = stream;
              this.cameraStream = stream;
          })
          .catch(error => {
              console.error("Error accessing camera:", error);
          });
  }
}

stopCamera() {
  if (this.cameraStream) {
      this.cameraStream.getTracks().forEach(track => track.stop());
  }
}


}



customElements.define("virtual-assistant", VirtualAssistant);
