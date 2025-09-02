const chatForm = document.getElementById('chat-form');
const chatInput = document.getElementById('chat-input');
const chatWindow = document.getElementById('chat-window');
const avatar = document.getElementById('avatar');
const optionButtons = document.querySelectorAll('.chat-options button');

let confirmed = false;
let isTyping = false;
let hoveredOption = "";

// Avatar GIFs
const gifs = {
  idle: "./states/idle.gif",
  typing: "./states/typing.gif",
  confirm: "./states/confirm_2.png",
  "Document analysis": "./states/hover.png",
  "Data analysis": "./states/hover.png",
  "Bid library": "./states/hover.png"
};

// Helper to update avatar based on state
function updateAvatar() {
  if (confirmed) {
    avatar.src = gifs.confirm;
  } else if (isTyping) {
    avatar.src = gifs.typing;
  } else if (hoveredOption && gifs[hoveredOption]) {
    avatar.src = gifs[hoveredOption];
  } else {
    avatar.src = gifs.idle;
  }
}

// Handle form submit
chatForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const message = chatInput.value.trim();
  if (!message) return;

  addMessage(message, "user");
  chatInput.value = "";
  isTyping = false;
  confirmed = true;
  updateAvatar();

  setTimeout(() => {
    confirmed = false;
    updateAvatar();
  }, 1500);
});

// Add message to chat
function addMessage(text, sender) {
  const msgDiv = document.createElement('div');
  msgDiv.className = `message ${sender}`;
  msgDiv.textContent = text;
  chatWindow.appendChild(msgDiv);
  chatWindow.scrollTop = chatWindow.scrollHeight;
}

// Handle option clicks
optionButtons.forEach(btn => {
  btn.addEventListener('click', () => {
    const option = btn.dataset.option;
    addMessage(option, "user");
    confirmed = true;
    updateAvatar();
    setTimeout(() => {
      confirmed = false;
      updateAvatar();
    }, 1500);
  });

  btn.addEventListener('mouseenter', () => {
    hoveredOption = btn.dataset.option;
    updateAvatar();
  });

  btn.addEventListener('mouseleave', () => {
    hoveredOption = "";
    updateAvatar();
  });
});

// Update typing state
chatInput.addEventListener('input', () => {
  isTyping = chatInput.value.length > 0;
  updateAvatar();
});
