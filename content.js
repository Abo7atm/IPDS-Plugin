var portb = chrome.extension.connect({
    name: "Background comms"
});
let i;
let predL = 0
let bar = document.getElementById("Ibar");
let logo = document.getElementById("logo");
let predict =0;
let msgA;
portb.postMessage("give me url"); // sending to Background
portb.onMessage.addListener(function(msg) {
    if(msg[0] != "h"){
        if (msg[0] == "S"){
            var SLin = document.getElementById("Lin");
                SLin.innerHTML = "";
                SLin.style.cssText = 'color: white;text-align: left;font-size: 16px;font-weight: bold;'
                SLin.appendChild(document.createTextNode("The site has been reported"));
                SLin.removeEventListener("click",reportNP);
                document.getElementById("elems").removeChild(document.getElementById("Lin"));
                document.getElementById("elems").appendChild(SLin);
                document.body.removeChild(document.getElementById('Phish'));
                document.body.removeChild(document.getElementById('elems'));          
        }
        else if(msg[0] == "F"){
            var SLin = document.getElementById("Lin");
                SLin.innerHTML = "";
                SLin.style.cssText = 'color: white;text-align: left;font-size: 16px;'
                SLin.appendChild(document.createTextNode("Couldn't report, try again later"));
                SLin.removeEventListener("click",reportNP);
        }
        else if(msg[0] == "C"){
            document.body.removeChild(document.getElementById('Phish'));
            document.body.removeChild(document.getElementById('elems'));
        }
    }
    else{// recieving url of current page
        console.log("link = " + msg);
        const Http = new XMLHttpRequest();
        msgA = msg.split(":");
        var url;
        if(msgA[0] == "https"){
            url ='https://utttu2.pythonanywhere.com/url/'+ msg;
        }   
        else{
            url='http://utttu2.pythonanywhere.com/url/'+ msg;
        }
        Http.open("GET", url);
        Http.send();
        Http.onreadystatechange=(e)=>{
            predict = Http.responseText[1];
                if(predict > predL){ //check if phishing
                    if(document.getElementById("Phish") == null){
                        var bg = document.createElement('div');
                        bg.style.cssText = 'position:fixed;width:100%;height:100%;opacity:0.94;z-index:1100;background:red;top:0px;left:0px;border-radius: 16px;';
                        bg.setAttribute("id","Phish");
                        elems = document.createElement('div');
                        elems.style.cssText = 'position:fixed;width:50%;height:50%;opacity:1;z-index:1500;top:0px;right:0px;bottom:0px;left:0px;margin:auto auto;border-radius: 12px;';
                        elems.setAttribute("align", "center");
                        elems.setAttribute("color","white");
                        elems.setAttribute("id","elems");
                        var Text = document.createElement("p"); //message
                        Text.appendChild(document.createTextNode("Phishing website!"));
                        Text.style.cssText = 'color: white;font-family: courier;text-align: left;font-size: 20px;padding: 10px 0px 0px 20px;font-weight: bold;'
                        elems.appendChild(Text);
                        var Text = document.createElement("p"); //message
                        Text.appendChild(document.createTextNode("" + msg + " is detected to be a Phishing website!"));
                        Text.style.cssText = 'color: white;text-align: left;font-size: 16px;padding: 0px 10px 0px 10px;'
                        var scp = document.createElement("script");
                        scp.setAttribute("type","text/javascript")
                        var BBack = document.createElement("button");
                        BBack.style.cssText = 'background-color: white;border : 1px solid gray;display: inline-block;border-radius: 8px; color: green;padding: 8px 16px;text-align: center;text-decoration: none;display: inline-block;font-size: 16px;margin: 4px 80px 2px ;cursor: pointer;font-weight: bold;'
                        BBack.appendChild(document.createTextNode("Back to safety"));
                        BBack.addEventListener("click",goBack);
                        elems.appendChild(Text);
                        elems.appendChild(BBack);
                        elems.appendChild(scp);
                        scp = document.createElement("script");
                        scp.setAttribute("type","text/javascript")
                        scp.appendChild(document.createTextNode("function reportNP(){portb.postMessage('give me url');portb.onMessage.addListener(function(msg) {console.log('message recieved ' + msg); Http = new XMLHttpRequest();var msgA = msg.split(':');var url; if(msgA[0] == 'https'){url ='https://utttu2.pythonanywhere.com/report/'+ msg + 0;} else{url='http://utttu2.pythonanywhere.com/report/'+ msg + 0;}Http.open('GET', url);Http.send();var x = document.getElementById('Phish'); while(x!=null){document.body.removeChild(x);x=document.getElementById('Phish');}}"));
                        elems.appendChild(scp);
                        var conti = document.createElement("REP");
                        conti.style.cssText = 'color: white;text-align: left;font-size: 16px;text-decoration: underline;cursor: pointer;'
                        conti.appendChild(document.createTextNode("report as not phishing!"));
                        conti.setAttribute("id","Lin");
                        elems.appendChild(conti);
                        conti.addEventListener("click",reportNP);
                        conti= document.createElement('p');
                        conti.style.cssText = 'color: white;text-align: left;font-size: 16px;padding: 0px 10px'
                        conti.appendChild(document.createTextNode("I understand the risk and want to "));
                        var C = document.createElement("Con");
                        C.style.cssText = 'color: white;text-align: left;font-size: 16px;text-decoration: underline;cursor: pointer;'
                        C.appendChild(document.createTextNode("Visit the website"));
                        C.addEventListener("click",CRisk);
                        conti.appendChild(C);
                        elems.appendChild(conti);
                        portb.postMessage("Phishing");
                        document.body.appendChild(bg);
                        document.body.appendChild(elems);
                }
            }
            else{
                portb.postMessage("Legit");
            }
        }
    }
});

function CRisk(){
        portb.postMessage("Continue");
}

function reportNP(){
    portb.postMessage("reportNP");
}

function goBack(){
    portb.postMessage("goBack");
}
