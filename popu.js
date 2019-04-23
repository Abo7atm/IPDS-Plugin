
var portb = chrome.extension.connect({
     name: "Background comms"
});
let P = false;
let NP=false;
let predL = 0;
let predict =0;
let Rep = document.getElementById("Rep");
var Tex = document.getElementById('def');
 portb.postMessage("give me url"); // sending to Background
portb.onMessage.addListener(function(msg) {
     console.log("message recieved " + msg); // recieving url of current page
     if(msg[0] != "h"){
          Tex.style.cssText = "color: white;font-family: courier;font-weight: normal;font-size: 14px;margin-top: 70px;text-align: center;";
          if(msg == "SReport"){
               Tex.innerHTML = "the site has been successfully reported.";
          }
          else if(msg == "FReport"){
               Tex.innerHTML = "couldn't report, Try again later."
          }
          Rep.style.cssText = "visibility:hidden;"
     }
     else{
          const Http = new XMLHttpRequest();
          const url='http://utttu2.pythonanywhere.com/url/'+ msg;
          Http.open("GET", url);
          Http.send();
          Http.onreadystatechange=(e)=>{
               predict = Http.responseText[1];

               if(predict > predL){
                    bg = document.getElementById("backG");
                    bg.style.cssText = "width: 350px;border: 1px solid rgb(0, 8, 0);background-image: url('backsDanger.png');background-size: 350px 149px;background-repeat: no-repeat;background-color: #27616F;border-radius: 8px;visibility:visible;";
                    Tex.innerHTML = "Detected Phishing website!";
                    Rep.innerHTML = "report as not phishing"
                    Rep.style.cssText = "background-color: red;border: none; border-radius: 8px;color: white; padding: 0px 0px;text-align: center;text-decoration: underline;display: inline-block;font-size: 16px;margin: 4px 80px 2px;cursor: pointer;font-weight: normal;visibility: visible;";
                    Rep.addEventListener("click",reportNP);
               }
               else if(predict != undefined){
                    bg = document.getElementById("backG");
                    bg.style.cssText = "width: 350px;border: 1px solid rgb(0, 8, 0);background-image: url('backs.png');background-size: 350px 149px;background-repeat: no-repeat;background-color: #27616F;border-radius: 8px;visibility:visible;";
                    Tex.innerHTML = "This website is Safe";
                    Rep.innerHTML = "report as phishing"
                    Rep.style.cssText = "background-color: red;border: none; border-radius: 8px;color: white;padding 10px 10px;text-align: center;text-decoration: none;display: inline-block;font-size: 16px;margin: 4px 80px 2px;cursor: pointer;font-weight: normal;visibility: visible;";
                    Rep.addEventListener("click",reportP);
               }
          }
     }     
});

function reportP(){
     if(!P){
          P = true;
          portb.postMessage("reportP");
     }
}

function reportNP(){
     if(!NP){
          NP = true;
          portb.postMessage("reportNP");
     }
}


