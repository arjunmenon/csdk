const {Button, TextView, ui} = require('tabris');

let button = new Button({
  centerX: 0, top: 100,
  text: 'Show message'
}).appendTo(ui.contentView);

let textView = new TextView({
  centerX: 0, top: [button, 50],
  font: '24px'
}).appendTo(ui.contentView);

button.on('select', () => {
  textView.text = checkConnection();
});

function checkConnection() {
    var networkState = navigator.connection.type;
 
    var states = {};
    states[Connection.UNKNOWN]  = 'Unknown connection';
    states[Connection.ETHERNET] = 'Ethernet connection';
    states[Connection.WIFI]     = 'WiFi connection';
    states[Connection.CELL_2G]  = 'Cell 2G connection';
    states[Connection.CELL_3G]  = 'Cell 3G connection';
    states[Connection.CELL_4G]  = 'Cell 4G connection';
    states[Connection.CELL]     = 'Cell generic connection';
    states[Connection.NONE]     = 'No network connection';
 
    return 'Connection type: ' + states[networkState];
}
 
checkConnection();

cordova.plugins.diagnostic.isWifiAvailable(function(available){
    console.log("WiFi is " + (available ? "available" : "not available"));
}, function(error){
    console.error("The following error occurred: "+error);
});
cordova.plugins.diagnostic.isLocationAvailable(function(available){
    console.log("Location is " + (available ? "available" : "not available"));
}, function(error){
    console.error("The following error occurred: "+error);
});


var serviceType = "ssdp:all";
   
var success = function(devices) {
    console.log(JSON.stringify(devices));
}

var failure = function() {
    alert("Error calling Service Discovery Plugin");
}

serviceDiscovery.getNetworkServices(serviceType, success, failure);


fetch('http://192.168.1.6:49152/description.xml')
    .then(response => response.text())
    .then((bodyText) => {
        // now you have the response body you can parse
        console.log("This fetch request worked!");
        // console.log(bodyText);
        var results = new xmldoc.XmlDocument(bodyText);
        // console.log("Parsed: \n%s", results.toString({trimmed:true, compressed:true}));
        var URLBase = results.childNamed("URLBase");
        console.log("URLBase is :"+URLBase.val)

        var spec = results.childNamed("specVersion");
        var major = spec.valueWithPath("major");
        console.log("Spec is :"+major)

        var device = results.childNamed("device");
        var deviceType = device.valueWithPath("deviceType");
        var friendlyName = device.valueWithPath("friendlyName");
        console.log("Spec is :"+deviceType);
        console.log("Spec is :"+friendlyName);
        

    }).catch((err) => {
        console.log("OKAY.THERE IS AN ERROR");
        console.log(err);
});


var UA = "UPnP/1.0, UPNPClient/0.0.1";
var contentType = "text/xml; charset=\"utf-8\"";
var postData= "<s:Envelope s:encodingStyle=\"http://schemas.xmlsoap.org/soap/encoding/\" xmlns:s=\"http://schemas.xmlsoap.org/soap/envelope/\">" +
        "<s:Body>" + "<u:GetVolume xmlns:u=\"urn:schemas-upnp-org:service:RenderingControl:1\">"+
        "<InstanceID>0</InstanceID>"+
        "<Channel>Master</Channel>"+
        "</u:GetVolume>" + 
        "</s:Body>" +
        "</s:Envelope>";
var pdl = postData.length;

var xmlHTTP = new tabris.XMLHttpRequest();
xmlHTTP.onreadystatechange = function() {
  if(xmlHTTP.readyState === xmlHTTP.DONE) {
    if(xmlHTTP.status === 200) {
        console.log(xmlHTTP.responseText)

    } else {
        console.log("not OK: " + xmlHTTP.statusText)
    }
  }
};