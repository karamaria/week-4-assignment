// get the form & message container
const form = document.getElementById('guestbook-form');
const messagesContainer = document.getElementById('messages-container');

// function to fetch messages
async function fetchMessages() {
  try {
    const response = await fetch('http://localhost:3000/messages'); // send request to the server
    if (response.ok) {
      const messages = await response.json();
      messages.forEach(displayMessage); // display each message
    } 
  } catch (error) {
    console.error('Error fetching messages:', error);
  }
}

// function to display a message
function displayMessage(message) {
  const messageElement = document.createElement('div');
  messageElement.classList.add('message');
  messageElement.innerHTML = `
    <h3>${message.name}</h3>
    <p>${message.message}</p>
    <small>Posted on: ${new Date(message.created_at).toLocaleString()}</small>
  `;
  messagesContainer.appendChild(messageElement);
}

// function to send new messages
form.addEventListener('submit', async (event) => {
  event.preventDefault();

  const name = document.getElementById('name').value;
  const message = document.getElementById('message').value;

  try {
    const response = await fetch('http://localhost:3000/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ name, message }), // send data to the server
    });

    if (response.ok) {
      const newMessage = await response.json();
      displayMessage(newMessage);
    }
  } catch (error) {
    console.error('Error posting message:', error);
  }
});

fetchMessages();