
let tablink;
chrome.extension.onConnect.addListener(function(port) {
      port.onMessage.addListener(function(msg) {//recieving msg from popu
           if (msg == "give me url"){
              chrome.tabs.query({'active': true, 'lastFocusedWindow': true}, function (tabs) {
                tablink = tabs[0].url; //getting the url
              port.postMessage(tablink); // sending the url to the popu.js
              });
            }
            else if(msg == "goBack"){
              chrome.tabs.goBack();
            }
            else if(msg == "reportNP"){
              if(window.confirm("Are you sure you want to report this site as not phishing?\nand countinue?")){
                const Http = new XMLHttpRequest();
                chrome.tabs.query({'active': true, 'lastFocusedWindow': true}, function (tabs) {
                  var tabU = tabs[0].url;
                  msgA = tabU.split(":");
                  var url;
                  if(msgA[0] == "https"){
                      url ='https://utttu2.pythonanywhere.com/report/'+ tabU + "0";
                  }   
                  else{
                      url='http://utttu2.pythonanywhere.com/report/'+ tabU + "0";
                  }
                
                Http.open("GET", url);
                Http.send();
                Http.onreadystatechange=(e)=>{
                  if(Http.responseText[0] == "s"){
                    port.postMessage("SReport");
                  }
                  else{
                    port.postMessage("FReport");
                  }
                }
              });
            }
            else{
              port.postMessage("FReport");
            }
          }
            else if(msg == "reportP"){
              const Http = new XMLHttpRequest();
              chrome.tabs.query({'active': true, 'lastFocusedWindow': true}, function (tabs) {
                var tabU = tabs[0].url;
                msgA = tabU.split(":");
                var url;
                if(msgA[0] == "https"){
                    url ='https://utttu2.pythonanywhere.com/report/'+ tabU + "1";
                }   
                else{
                    url='http://utttu2.pythonanywhere.com/report/'+ tabU + "1";
                }
              
              Http.open("GET", url);
              Http.send();
              Http.onreadystatechange=(e)=>{
                if(Http.responseText[0] == "s"){
                  port.postMessage("SReport");
                }
                else{
                  port.postMessage("FReport");
                }
              }
            });
          }
          else if(msg == "Continue"){
            if(window.confirm("Are you sure you want to continue?")){
              port.postMessage("Continue");
            }
            else{
              chrome.browserAction.setIcon({
                path: {
                  "16": "c3-16.png",
                  "32": "c3-32.png"
                },
              });
            }
          }
          else if(msg == "Phishing"){
            chrome.browserAction.setIcon({
              path: {
                "16": "c3-16.png",
                "32": "c3-32.png"
              },
            });
          }
          else if(msg == "Legit"){
            chrome.browserAction.setIcon({
              path: {
                "16": "c2-16.png",
                "32": "c2-32.png"
              },
            });
          }
      });
 });

 
