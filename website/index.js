const generate = function(isID) {
    let result = "";
    
    let endIndex = 0;
    if(isID) {
        endIndex = 7;
    } else {
        endIndex = 53;
    }
    
    for(let i = 0; i <= endIndex; i++) {
        let rand = Math.floor(Math.random() * 256);
        if(rand <= 16) {
            rand = "0" + rand.toString(16);
        }
        
        result += rand.toString(16);
    }
    
    if((isID && result.length > 16) || (!isID && result.length > 108)) {
        result = result.slice(0, result.length - 1);
    }
    
    return result;
}

const setValue = function() {
    let id = document.getElementById("namespace_id");
    let data = document.getElementById("namespace_data");
    
    id.value = generate(true);
    data.value = generate(false);
}

const submitTX = function() {
    let id = document.getElementById("namespace_id");
    let data = document.getElementById("namespace_data");
    
    let address = document.getElementById("server_ip");
    let port = document.getElementById("port");
    
    if(
        (id.value == "" || id.value.length != 16) ||
        (data.value == "" || data.value.length != 108) ||
        (address.value == "") ||
        (port.value == "" || isNaN(parseInt(port.value)))
    ) {
        alert("Some fields are not populated, or are populated incorrectly!\nThere're some constraints here:\n-> ID value must have a length of 16 (so, 8 bytes if converted to bytes);\n-> data value must have a length of 108 (so, 54 bytes);\n-> server IP must be of a correct format (***.***.***.*** or domain.name);\n-> port value should be of a numerical value.");
        
        return;
    }
    
    ws = new WebSocket("ws://" + address.value + ":" + port.value);
    ws.onopen = (event) => {
        ws.send(JSON.stringify({
            id: id.value,
            data: data.value
        }));
        document.getElementById("generate").style.display = document.getElementById("submit").style.display = "none";
        document.getElementById("progress-bar").style.display = "block";
    };
    
    ws.onmessage = (event) => {
        document.getElementById("generate").style.display = document.getElementById("submit").style.display = "inline-block";
        document.getElementById("progress-bar").style.display = "none";
        
        showResult(event.data);
        ws.close();
    };
    
    ws.onerror = (event) => {
        alert("An error occured while attempting to connect to ws://" + address.value + ":" + port.value + "!\nMake sure you launched the WebSocket server application & you opened / forwarded the ports on your router.");
    };
}

const showResult = function(result) {
    let ret_data = result.split("\"");
    
    jQuery(function($) {
        let newTab = window.open();
        newTab.location.href = "https://testnet.mintscan.io/celestia-incentivized-testnet/txs/" + ret_data[1];
        return false;
    });
    
    let id = document.getElementById("namespace_id");
    let data = document.getElementById("namespace_data");
    
    let address = document.getElementById("server_ip");
    let port = document.getElementById("port");
    
    id.value = data.value = address.value = port.value = "";
}
