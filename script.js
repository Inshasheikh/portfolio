function doPost(e) {
  var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
  
  var data = JSON.parse(e.postData.contents);
  
  sheet.appendRow([
    new Date(),
    data.name,
    data.email,
    data.phone,
    data.message
  ]);
  
  return ContentService
    .createTextOutput(JSON.stringify({result: "success"}))
    .setMimeType(ContentService.MimeType.JSON);
}



/* Current - Already good */
.contact-section {
    padding: 100px 5%;
    background: linear-gradient(135deg, #0f0c29 0%, #1a1a3e 50%, #0f0c29 100%);
}


// Add this JavaScript to create bubbles
function createBubble() {
    const bubble = document.createElement('div');
    bubble.classList.add('bubble');
    const size = Math.random() * 100 + 50;
    bubble.style.width = size + 'px';
    bubble.style.height = size + 'px';
    bubble.style.left = Math.random() * 100 + '%';
    bubble.style.animationDuration = Math.random() * 5 + 3 + 's';
    bubble.style.animationDelay = Math.random() * 2 + 's';
    document.body.appendChild(bubble);
    
    setTimeout(() => {
        bubble.remove();
    }, 8000);
}

setInterval(createBubble, 800);
