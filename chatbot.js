// chatbot.js: Universal chatbot widget injection/logic for Nunua App
(function () {
    // --- Modal HTML as a template string ---
    const chatbotHTML = `
      <div class="chatbot-box" id="chatbot-box" style="display:none; position: fixed; left: 20px; bottom: 70px; z-index: 2001; max-width: 350px; min-width: 270px; background: #fff; border-radius: 10px; box-shadow: 0 4px 16px rgba(0,0,0,0.13);">
        <div class="chatbot-header" style="padding: 10px 14px; background: #0178bd; color: #fff; border-radius: 10px 10px 0 0; display: flex; align-items: center; justify-content: space-between;">
          <h4 style="margin:0; font-size: 1.06em;">Nunua Chat Assistant</h4>
          <span id="chatbot-close" style="cursor:pointer; font-size:1.7em; line-height:1;">&times;</span>
        </div>
        <div class="chatbot-messages" id="chatbot-messages" style="min-height:80px; max-height:220px; overflow-y:auto; padding: 10px; background: #f3f8fc; font-size: 0.98em;"><div class="bot-message">Hi! How can I help you today?</div></div>
        <div class="chatbot-quick-replies" id="chatbot-quick-replies" style="border-top: 1px solid #e5e5e5; padding: 8px; background: #eef6fb;">
          <button data-message="Track my order">Track Order</button>
          <button data-message="Return an item">Return Item</button>
          <button data-message="Show me deals">View Deals</button>
        </div>
        <div class="chatbot-input" style="display:flex; padding:8px; gap:6px;border-top:1px solid #e1e1e1; background:#f9fbfc; border-radius:0 0 10px 10px;">
          <input type="text" id="chatbot-input" placeholder="Type your message..." style="flex:1; padding:7px 10px; border:1px solid #ccc; border-radius:4px; font-size:1em;" />
          <button id="chatbot-send" style="background:#007bff; color:white; border:none; border-radius:4px; padding:0 14px;">Send</button>
        </div>
      </div>
    `;
  
    // --- Inject only once per page ---
    if (!document.getElementById('chatbot-box')) {
      document.body.insertAdjacentHTML('beforeend', chatbotHTML);
    }
    const chatbotBox = document.getElementById('chatbot-box');
  
    // --- Find or create the Chat button (floating bottom left) ---
    let chatBtn = document.getElementById('live-chat');
    if (!chatBtn) {
      chatBtn = document.createElement('button');
      chatBtn.id = 'live-chat';
      chatBtn.type = 'button';
      chatBtn.textContent = 'Chat';
      chatBtn.title = 'Live Chat';
      chatBtn.style.cssText = 'position:fixed; left: 20px; bottom: 20px; background:#17a2b8;color:white;padding:10px 15px;border-radius:20px; font-size:1em; z-index:2002;box-shadow:0 2px 5px rgba(0,0,0,0.2);';
      document.body.appendChild(chatBtn);
    }
  
    // --- Modal open/close logic ---
    chatBtn.addEventListener('click', () => {
      chatbotBox.style.display = 'block';
    });
    chatbotBox.querySelector('#chatbot-close').addEventListener('click', () => {
      chatbotBox.style.display = 'none';
    });
  
    // --- Messaging logic ---
    const input = chatbotBox.querySelector('#chatbot-input');
    const sendBtn = chatbotBox.querySelector('#chatbot-send');
    const messages = chatbotBox.querySelector('#chatbot-messages');
  
    function appendMessage(msg, sender) {
      const div = document.createElement('div');
      div.className = sender === 'user' ? 'user-message' : 'bot-message';
      div.style.margin = '6px 0';
      div.style.background = sender === 'user' ? '#e1f2ff' : '';
      div.style.padding = sender === 'user' ? '7px 11px' : '';
      div.style.borderRadius = sender === 'user' ? '10px 10px 0 10px' : '8px';
      div.textContent = msg;
      messages.appendChild(div);
      messages.scrollTop = messages.scrollHeight;
    }
  
    function simulateBotResponse(msg) {
      setTimeout(() => {
        let res = '';
        const lower = msg.toLowerCase();
        if (lower.includes('track')) {
          res = 'Please enter your order number and we’ll check it.';
        } else if (lower.includes('return')) {
          res = 'Sure! Returns are accepted within 14 days. Would you like to start a return?';
        } else if (lower.includes('deal')) {
          res = 'Here are some of our best deals right now!';
          appendMessage(res, 'bot');
          showDeals();
          return;
        } else {
          res = 'I’m here to help with orders, returns, and deals. Try one of the quick options above.';
        }
        appendMessage(res, 'bot');
      }, 700);
    }
  
    function showDeals() {
      const deals = [
        { name: 'Wireless Headphones', price: '$39.99', img: 'https://images.pexels.com/photos/374870/pexels-photo-374870.jpeg?auto=compress&cs=tinysrgb&w=300', id: 1 },
        { name: "Men's Sneakers", price: '$59.99', img: 'https://images.pexels.com/photos/2529148/pexels-photo-2529148.jpeg?auto=compress&cs=tinysrgb&w=300', id: 10 }
      ];
      deals.forEach(prod => {
        const html = `<div class="product-suggestion"><img src="${prod.img}" alt="${prod.name}"><h5>${prod.name}</h5><p><strong>${prod.price}</strong></p><button class="chatbot-view-deal" data-product-id="${prod.id}">View</button></div>`;
        const tmp = document.createElement('div');
        tmp.innerHTML = html;
        messages.appendChild(tmp.firstChild);
      });
      messages.scrollTop = messages.scrollHeight;
      // Attach a delegated event listener for any .chatbot-view-deal
      messages.querySelectorAll('.chatbot-view-deal').forEach(btn => {
        btn.addEventListener('click', function(e) {
          const prodId = this.getAttribute('data-product-id');
          // Optionally close chatbot
          chatbotBox.style.display = 'none';
          // Try to open Quick View modal if present on the page
          const quickBtn = document.querySelector(`.quick-view-btn[data-id='${prodId}']`);
          if (quickBtn) {
            quickBtn.click();
          } else {
            // fallback: scroll to product if not found
            const prodCard = document.querySelector(`.product-card .add-to-cart-btn[data-id='${prodId}']`);
            if (prodCard) prodCard.scrollIntoView({behavior:'smooth'});
          }
        });
      });
    }
  
    function sendUserMessage() {
      const msg = input.value.trim();
      if (!msg) return;
      appendMessage(msg, 'user');
      input.value = '';
      simulateBotResponse(msg);
    }
  
    sendBtn.addEventListener('click', sendUserMessage);
    input.addEventListener('keypress', e => { if (e.key === 'Enter') sendUserMessage(); });
  
    // Quick replies
    chatbotBox.querySelector('#chatbot-quick-replies').addEventListener('click', (e) => {
      if (e.target.tagName === 'BUTTON') {
        const msg = e.target.getAttribute('data-message') || e.target.textContent;
        appendMessage(msg, 'user');
        simulateBotResponse(msg);
      }
    });
  
  })();
  