console.log("hi");

var portb = chrome.extension.connect({
     name: "Background comms"
});
let i;
let bar = document.getElementById("Ibar");
let logo = document.getElementById("logo");
let predict =0
 portb.postMessage("give me url"); // sending to Background
portb.onMessage.addListener(function(msg) {
     console.log("message recieved " + msg); // recieving url of current page
     const Http = new XMLHttpRequest();
     const url='http://utttu2.pythonanywhere.com/url/'+ msg;
     Http.open("GET", url);
     Http.send();
     Http.onreadystatechange=(e)=>{
          console.log(Http.responseText)
          predict = Http.responseText;
          console.log(predict)
          document.getElementById('def').innerHTML = "This is the prediction results "+ predict;
          // if(predict=="1"){
          //      i='xr';
          //      document.getElementById(i).innerHTML = "This is a Phishing URL, be careful";
          // }
          // else if(predict=="0") {
          //      i='xg';
          //      document.getElementById(i).innerHTML = "Everything looks safe";
          // }
}
     // predict = Http.responseText;//Math.floor(Math.random()*100) //prediction stage
     // console.log(predict)
     // if(predict=="1"){
     //    i='xr';
     //    document.getElementById(i).innerHTML = "This is a Phishing URL, be careful";
     // }
     // else {
     //   i='xg';
     //  document.getElementById(i).innerHTML = "Everything looks safe";
     
    // }
     // let M = document.getElementById(i);
     // M.innerHTML = "Everything looks safe";
     // M.innerHTML = "This is a Phishing URL, be careful";
   //  document.getElementById('y').innerHTML=msg;
     var W = 0;
     // var In = setInterval(move, 10);
    
     // function move(){
     //      if(W == 60){
     //            bar.style.backgroundColor = "red";
     //           // document.body.style.backgroundColor = "red";
     //           // document.border = "1px solid red";
     //            document.getElementById("bar").style.border = "1px solid white";
     //           // logo.src = "danger.png";
     //           M.innerHTML = "This is a Phishing URL, be careful";
     //           // ="this is "+predict+"% a pishing url";
     //      }
     //      if (W >= predict)
     //           clearInterval(In);
     //      else{
     //           W++;
     //           bar.style.width = W + '%';
     //      }
     // }
     
});

