chrome.runtime.sendMessage({
  from:    'content',
  subject: 'showPageAction'
});
// Listen for messages from the popup
chrome.runtime.onMessage.addListener(function (msg, sender, response) {
  // First, validate the message's structure
  if ((msg.from === 'popup') && (msg.subject === 'images')) {
    // Collect the necessary data
    var images = document.images;
    var imageSources = [];
    for (var i = 0; i < images.length; i++){
      imageSources.push({link: images[i].src});
    }
    // Directly respond to the sender (popup),
    // through the specified callback */
    response(imageSources);
  }
});
