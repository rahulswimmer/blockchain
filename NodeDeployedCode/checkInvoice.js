var common = require("./commonscript.js");
var web3 = common.web3(common.node1);

var invoiceIdentifier = "be2cdecd51ff347c5b04aadeec2698096979bc7bbdc2b462c80e0c31b5f31c09";
var invoiceContractAbi = common.invoiceContractAbi;
var mapperContractAbi = common.mapperContractAbi;
var mapperContractAddress = common.mapperContractAddress;
var nullAddress = common.nullAddress;
var passwordPrimaryAccount = common.passwordPrimaryAccount;
var invoiceNotFound = common.invoiceNotFound;

var mappercontract = web3.eth.contract(mapperContractAbi).at(mapperContractAddress, function(error, result){
   if(!error){
       mappercontract = result;
       mappercontract.checkInvoice.call(invoiceIdentifier, function(error, result){
           if(!error){
            console.log(result);     
           }else{
               console.error(error);
           }
       });
   }else{
       console.error(error);
   }
});