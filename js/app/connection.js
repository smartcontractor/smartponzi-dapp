var connect = function(_hostname, _port) {
    if (hostname !== null && hostname !== "" && port !== null && port !== ""){
        web3.setProvider(new web3.providers.HttpProvider('http://' + _hostname + ':' + _port), function(err, result) {});
    }
};

var onClickConnect = function(_hostname, _port) {
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

var deployContract = function(address, abi, cb) {
    cb(web3.eth.contract(abi).at(address));
};


var checkConnectionOnce = function(cb) {
    var status = web3.isConnected();
    cb(status);
};

var checkConnection = function() {
    var status = web3.isConnected();
    __("cStatus").innerHTML = status;

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