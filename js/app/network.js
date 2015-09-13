window.onload = function() {
    if (typeof(Storage) !== "undefined") {
        // Code for localStorage/sessionStorage.
        if (localStorage.getItem("hostname") !== "" && localStorage.getItem("port") !== "") {
            hostname = localStorage.getItem('hostname');
            port = localStorage.getItem('port');
            if (!isObjectEmpty(__("hostname")) && !isObjectEmpty(__("port"))) {
                __('hostname').value = hostname;
                __('port').value = port;
            }
        }
    } else {
        // Sorry! No Web Storage support..
        __("cError").innerHTML = "no localStorage support! Please switch to a modern your browser";
    }
    // connect to local geth instance 
    if (hostname !== null && hostname !== "" && port !== null && port !== "") {
        connect(hostname, port, function(result) {});
    }

    // check connection
    checkConnectionOnce(function(result) {
        if (!result) {}
        __("cStatus").innerHTML = result;
    });
};

var checkConnectionOnce = function(cb) {
    var status = web3.isConnected();
    cb(status);
};


var __ = function(id) {
    return document.getElementById(id);
};