//Console log to make sure Content Script is running. 
console.log('Content Script is Running');

//Typescript interface for Indexable Types. Message from App.
interface MessageFromApp {
  data: {
    action: string;
  }
}

// listen for message from npm package
window.addEventListener('message', (msg: MessageFromApp) => {
  // filter the incoming msg.data
  if (msg.data.action === 'npmToContent') {
    console.log('TreeGraph from npm: ', msg.data);
    // send the message to the chrome - backgroundScript
    // Stringify object to be sent to BackgroundScript; If Object is directly sent. 
    // Background script isn't able to read the message
    chrome.runtime.sendMessage({
      action: 'ContentToBackground', 
      payload: JSON.stringify(msg.data)
    });
  }
});
