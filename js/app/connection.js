var connect = function(_hostname, _port) {
    if (hostname !== null && hostname !== "" && port !== null && port !== ""){
        web3.setProvider(new web3.providers.HttpProvider('http://' + _hostname + ':' + _port), function(err, result) {});
    }
};

var onClickConnect = function(_hostname, _port) {
    __("cStatus").innerHTML = " ... connecting"
    if (typeof(Storage) !== "undefined") {
        // Code for localStorage/sessionStorage.
        localStorage.setItem("hostname", _hostname);
        localStorage.setItem("port", _port);
    } else {
        // Sorry! No Web Storage support..
        __("cError").innerHTML = "no localStorage support! Please switch to a modern your browser";
    }
    web3.setProvider(new web3.providers.HttpProvider('http://' + _hostname + ':' + _port), function(err, result) {});
};


var checkConnection = function() {
    var status = web3.isConnected();
    __("cStatus").innerHTML = status;
    hideElement("cStatus");

};

var hideElement = function(id) {
    setTimeout(function() {
        var ele = __(id);
        ele.innerHTML = "";
    }, 5000);
};

var isObjectEmpty = function(obj) {
    for (var name in obj) {
        return false;
    }
    return true;
};

var __ = function(id) {
    return document.getElementById(id);
};

// check connection every 5 seconds in the background
setInterval(checkConnection, 10000);