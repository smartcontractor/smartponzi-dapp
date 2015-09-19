/** 

SmartPonzi 2015 

*/

var balances = [];
var ponzi = null;
var ponziAddress = null;
var ponziInvested = null;
var ponziManager = null;
var isConnected = false;
var ponziRoi = null;
var ponziDeposits = null;

window.onload = function() {

    if (typeof(Storage) !== "undefined") {
        // Code for localStorage/sessionStorage.
        if (localStorage.getItem("hostname") !== "" && localStorage.getItem("port") !== "") {
            hostname = localStorage.getItem('hostname');
            port = localStorage.getItem('port');
            // connect to local geth instance 
            connect(hostname, port, function(result) {});            
        }
    } else {
        // Sorry! No Web Storage support..
        __("cError").innerHTML = "no localStorage support! Please switch to a modern  browser";
    }


    // check connection
    checkConnectionOnce(function(result) {
        if (!result) {}
        isConnected = result;
        __("cStatus").innerHTML = result;
    });

    __("upperCtrls").style.display = "none";

    if (isConnected) {
        deployContract("0x9e48a065af4d02257d9c9c83d78e7c06e7bf2449", abi, function(contract) {
            ponzi = contract;
            ponziAddress = ponzi.address;
            ponziManager = ponzi.manager();
            ponziRoi = ponzi.roi();
            ponziDeposits = ponzi.numDeposits();
            fetchBalances();
            generateControls();
        });
    }


};

var invest = function(amount) {
    var e = __("accountsDropdown");
    var account = e.options[e.selectedIndex].value;
    ponzi.deposit.sendTransaction({
        from: account,
        value: web3.toWei(amount, "ether"),
        gas: 1999000
    }, function(err, result) {
        if (err) {
            __("cError").innerHTML = err;
            hideElement("cError");
        } else {
            __("sSuccess").innerHTML = result;
            hideElement("sSuccess");
        }
    });
};

var withdraw = function() {
    var e = __("accountsDropdown");
    var account = e.options[e.selectedIndex].value;
    ponzi.withdraw(account, {
        from: account,
        gas: 1999000
    }, function(err, result) {
        if (err) {
            __("cError").innerHTML = err;
            hideElement("cError");
        } else {
            __("sSuccess").innerHTML = result;
            hideElement("sSuccess");
        }
    });
};

var withdrawProfit = function() {
    var e = __("accountsDropdown");
    var account = e.options[e.selectedIndex].value;
    ponzi.withdrawProfit(account, {
        from: account,
        gas: 1999000
    }, function(err, result) {
        if (err) {
            __("cError").innerHTML = err;
            hideElement("cError");
        } else {
            __("sSuccess").innerHTML = result;
            hideElement("sSuccess");
        }
    });
};

var reCalculateProfits = function() {
    var e = __("accountsDropdown");
    var account = e.options[e.selectedIndex].value;
    ponzi.reCalc(account, {
        from: account,
        gas: 1999000
    }, function(err, result) {
        if (err) {
            __("cError").innerHTML = err;
            hideElement("cError");
        } else {
            __("sSuccess").innerHTML = result;
            hideElement("sSuccess");
        }
    });
};


var fetchBalances = function() {

    __("txs").innerHTML = null;

    if (isConnected){
    var tblHeader = '<div class="row">' +
        '<span class="cell-hdr"  width="55%">' +
        'Account' +
        '</span>' +
        '<span class="cell-hdr1"  width="16%">' +
        'Currently Invested (ETH)' +
        '</span>' +
        '<span class="cell-hdr1"  width="16%">' +
        'Profit (ETH)' +
        '</span>' +
        '<span class="cell-hdr1"  width="16%">' +
        'All Profits (ETH)' +
        '</span>' +
        '<span class="cell-hdr1"  width="2%">' +
        'Elapsed (days)' +
        '</span>' +
        '</div>';

    __("txs").innerHTML = tblHeader;
     __("upperCtrls").style.display = "table-row";

    var balance = 0;
    var invested = 0;
    var cumulated = 0;
    var profits = 0;
    var elapsed = 0;
    var account = null;
    var accounts = web3.eth.accounts;

    for (var i = 0; i < accounts.length; i++) {

        account = accounts[i];

        if (account !== null) {

            var iDiv = document.createElement('div');
            iDiv.className = 'row';

            var span0 = document.createElement('span');
            span0.className = 'cell-act';
            span0.id = "a" + i;
            span0.innerHTML = account;
            iDiv.appendChild(span0);

            var span1 = document.createElement('span');
            span1.className = 'cell';
            span1.id = "i" + i;
            span1.innerHTML = invested.toFixed(8);
            iDiv.appendChild(span1);

            var span2 = document.createElement('span');
            span2.className = 'cell';
            span2.id = "p" + i;
            span2.innerHTML = profits.toFixed(8);
            iDiv.appendChild(span2);

            var span3 = document.createElement('span');
            span3.className = 'cell';
            span3.id = "c" + i;
            span3.innerHTML = cumulated.toFixed(8);
            iDiv.appendChild(span3);

            var span4 = document.createElement('span');
            span4.className = 'cell';
            span4.id = "e" + i;

            span4.innerHTML = elapsed;
            iDiv.appendChild(span4);

            __("txs").appendChild(iDiv);
            getData(account, i);

        }
    }


    }


};


var getContractAddress = function() {
    if (ponziAddress === null) {
        ponziAddress = ponzi.address;
    }
    __("cResponse").innerHTML = ponziAddress;
};

var getContractBalance = function() {
    ponziInvested = web3.eth.getBalance(ponzi.address);
    __("cResponse").innerHTML = web3.fromWei(ponziInvested, "ether").toFixed(8) + "&nbsp;ETH";
};

var getContractManager = function() {
    if (ponziManager === null) {
        ponziManager = ponzi.manager();
    }
    __("cResponse").innerHTML = ponziManager;
};


var getContractRoi = function() {
    if (ponziRoi === null) {
        ponziRoi = ponzi.roi();
    }
    __("cResponse").innerHTML = "ROI : " + ponziRoi + "&nbsp;%";
};

var getContractDeposits = function() {
    if (ponziDeposits === null) {
        ponziDeposits = ponzi.numDeposits();
    }
    __("cResponse").innerHTML = "Total : " + ponziDeposits;
};

var getData = function(account, i) {

    ponzi.getProfit(account, {
        from: account
    }, function(err, result) {
        if (err) {
            __("cError").innerHTML = err;
            hideElement("cError");
            return
        };
        var profits = web3.fromWei(result, "ether");
        __("p" + i).innerHTML = profits.toFixed(8);;
        return
    });

    ponzi.getCumulativeProfit(account, {
        from: account
    }, function(err, result) {
        if (err) {
            __("cError").innerHTML = err;
            hideElement("cError");
            return
        };
        var cumulated = web3.fromWei(result, "ether");
        __("c" + i).innerHTML = cumulated.toFixed(8);;
        return
    })

    ponzi.getBalance(account, {
        from: account
    }, function(err, result) {
        if (err) {
            __("cError").innerHTML = err;
            hideElement("cError");
            return
        };
        var balance = web3.fromWei(result, "ether");
        __("i" + i).innerHTML = balance.toFixed(8);
        return
    })

    ponzi.getDepositDelta(account, {
        from: account
    }, function(err, result) {
        if (err) {
            __("cError").innerHTML = err;
            hideElement("cError");
            return
        };
        var elapsed = result;

        if (parseInt(elapsed) > 140000000) {
            elapsed = "--";
        }else{
            elapsed = (elapsed / 86400).toFixed(6)
        }
        __("e" + i).innerHTML = elapsed;
        return
    });
};

var getBalance = function(account, cb) {
    var balance = web3.fromWei(web3.eth.getBalance(account), "ether");
    cb(account, balance);
};


var deployContract = function(address, abi, cb) {
    cb(web3.eth.contract(abi).at(address));
};

var checkConnectionOnce = function(cb) {
    var status = web3.isConnected();
    cb(status);
};

var connect = function(_hostname, _port) {
    // connect to localhost on default port
    web3.setProvider(new web3.providers.HttpProvider('http://' + _hostname + ':' + _port), function(err, result) {});
};

var generateControls = function() {


    var iDiv2 = document.createElement('div');
    iDiv2.className = 'row';

    var span2 = document.createElement('span');
    span2.className = 'cell1';
    span2.innerHTML = '<input type="text" id="iA" size="10" class="dapp-box-small"  maxlength="30" value="0.1"></input>';
    iDiv2.appendChild(span2);


    var span3 = document.createElement('span');
    span3.className = 'cell1';
    span3.innerHTML = '<input type="button" onclick=invest(__("iA").value); class="dapp-cool-button" value="Invest"></input>';
    iDiv2.appendChild(span3);

    var span4 = document.createElement('span');
    span4.className = 'cell1';
    span4.innerHTML = '<input type="button" onclick=withdraw();  class="dapp-cool-button" value="Withdraw All"></input>';
    iDiv2.appendChild(span4);

    var span5 = document.createElement('span');
    span5.className = 'cell1';
    span5.innerHTML = '<input type="button" onclick=withdrawProfit();  class="dapp-cool-button" value="Withdraw Profit"></input>';
    iDiv2.appendChild(span5);

    var span6 = document.createElement('span');
    span6.className = 'cell1';
    span6.innerHTML = '<input type="button"class="dapp-cool-button" onclick=reCalculateProfits(); value="Recalculate Profits"></input>';
    iDiv2.appendChild(span6);

    var iDiv1 = document.createElement('div');


    var selectAct = document.createElement('select');
    selectAct.id = 'accountsDropdown';

    var span1_a = document.createElement('p');
    var span2_a = document.createElement('p');

    span2_a.innerHTML = 'Choose account : ';

    var accounts = web3.eth.accounts;
    for (var i = 0; i < accounts.length; i++) {
        account = accounts[i];
        selectAct[selectAct.length] = new Option(accounts[i], accounts[i]);
    }


    span1_a.appendChild(selectAct);
    iDiv1.appendChild(span2_a);
    iDiv1.appendChild(span1_a);

    __("controls").appendChild(iDiv1);
    __("controls").appendChild(iDiv2);

};


var hideElement = function(id) {
    setTimeout(function() {
        var ele = __(id);
        ele.innerHTML = "";
    }, 5000);
};

var copyToClipboard = function(text) {
    if (text !== null && text !== "") {
        window.prompt("Copy to clipboard: Ctrl+C then Enter", text);
    }
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