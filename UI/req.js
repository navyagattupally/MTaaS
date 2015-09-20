
var req;
var url;
var latitude;
var longitude;

window.onload=function(){
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(showPosition);
    } else { 
        x.innerHTML = "Geolocation is not supported by this browser.";
    }
}

function showPosition(position) {
  latitude=position.coords.latitude;
  longitude=position.coords.longitude;
    alert("Latitude: " + position.coords.latitude + 
    "  Longitude: " + position.coords.longitude); 
}

function sendAJAX(args)
{
    $.ajax({
            type: "POST",
            data: args,
            url: "http://localhost:3000/resourceRequest", 
            success: function(output, status, xhr) {
              alert(xhr.getResponseHeader('Location'));              
            },
            error: function(output) {
              $('.sysMsg').html(output);
            }
        }); 
}

function sendAJAXReq(args)
{
    $.ajax({
            type: "POST",
            data: args,
            url: "http://localhost:3000/resourceRequest", 
            success: function(output, status, xhr) {
              alert(xhr.getResponseHeader('Location'));              
            },
            error: function(output) {
              $('.sysMsg').html(output);
            }
        }); 
}

function sendRequests()
{
  
  var quantity=document.getElementById('quantity').value;
  var duration=document.getElementById('duration').value; 
  var mobile_os=document.getElementById('mobile_os').value;
  var ram=document.getElementById('ram').value;
  var disk=document.getElementById('disk').value;
  var CPU=document.getElementById('CPU').value;
  var requestCount=document.getElementById('reqCount').value;
  var args="quantity="+quantity+"&duration="+duration+"&mobile_os="+mobile_os+"&ram="+ram+"&disk="+disk+"&CPU="+CPU+"&latitude="+latitude+"&longitude="+longitude;
  
}


function randomizedRequestArgs(){

  var quantity = Math.floor((Math.random() * 10) + 1);
  (document.getElementById('quantity').value) = quantity;

  var duration = Math.floor((Math.random() * 10) + 1);
  (document.getElementById('duration').value) = duration;
  

  var randInt = Math.floor((Math.random() * 10));

  var os_choice = ["Android 4.0.0","Android 4.0.4","Android 4.1.1","Android 4.1.2","Android 4.1.3","Android 4.1.4","Android 4.1.5","Android 4.2.2","Android 4.2.4","Android 4.3.4"];
  var mobile_os = os_choice[randInt];
  

  (document.getElementById('mobile_os').value) = mobile_os;
  
  var ram_choice = ["256","512","1024","2048","4096"];
  
  var ram = ram_choice[Math.floor((Math.random() * 4))];
  

  (document.getElementById('ram').value) = ram;

  var disk_choice = ["256","1024","2048","4096","8192"];
  var disk = disk_choice[Math.floor((Math.random() * 4))];
  (document.getElementById('disk').value) = disk;
  
  var CPU_choice = ["Single 2GHz","Single 3GHz","Dual 1.2 GHz","Dual 1.4 GHz","Quad 1.2 GHz"];
  var CPU = CPU_choice[Math.floor((Math.random() * 4))];
  (document.getElementById('CPU').value) = CPU;

  var args = "quantity="+quantity+"&duration="+duration+"&mobile_os="+mobile_os+" &ram="+ram+"&disk="+disk+"&CPU="+CPU+"&latitude="+latitude+"&longitude="+longitude;

  return args;

}


