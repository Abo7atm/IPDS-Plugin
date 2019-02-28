console.log("background start");


let tablink;
chrome.extension.onConnect.addListener(function(port) {
      console.log("Connected .....");
      port.onMessage.addListener(function(msg) {
           console.log("message recieved" + msg); //recieving msg from popu
           chrome.tabs.query({'active': true, 'lastFocusedWindow': true}, function (tabs) {
             tablink = tabs[0].url; //getting the url
          //   console.log(tabs);
          //   console.log(tablink);
           port.postMessage(tablink); // sending the url to the popu.js
         });
      });
 });
