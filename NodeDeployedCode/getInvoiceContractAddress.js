var common = require("./commonscript.js");
var web3 = common.web3(common.node1);
//var invoiceContractAddress="0x03953724629edeeb28f12ec9ce32750e8ac626af";
var primary;
var invoiceIdentifier = "0x2cca349aafc2f7586f7b6f4c432ff8033efa7605ed38a5adaf0415bf00c3a5be";
var invoiceContractAbi = common.invoiceContractAbi;
var mapperContractAbi = common.mapperContractAbi;
var mapperContractAddress = common.mapperContractAddress;
var nullAddress = common.nullAddress;
var passwordPrimaryAccount = common.passwordPrimaryAccount;
var invoiceNotFound = common.invoiceNotFound;

var mappercontract=web3.eth.contract(mapperContractAbi).at(mapperContractAddress,function(error, result){
    if(!error){
        mappercontract = result;
        mappercontract.getInvoiceContractAddress.call(invoiceIdentifier,{from:primary,gas:300000},function(error, result){
            if(!error){
                out = result;
                //console.log("Hey");
                console.log(out);
                
                //msg.send(out);
            }else{
                console.error(error);
            }
        });
        
    }else{
        console.error(error);
    }
});