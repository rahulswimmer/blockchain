//Commands:
//register {INVOICEIDENTIFIER} to {INVOICECONTRACTADDRESS} - adds/registers invoice generated with given invoice identifier to invoice contract address
var common = require("./commonscript.js");
var web3 = common.web3(common.node1);
module.exports = function(robot){
    robot.hear(/(register) (.*?) to (.*?)$/i, function(msg){
var invoiceIdentifier = msg.match[2];
var invoiceContractAddress = msg.match[3];
var mapperContractAddress = common.mapperContractAddress;
var nullAddress = common.nullAddress;
var passwordPrimaryAccount = common.passwordPrimaryAccount;
var mapperContractAbi = common.mapperContractAbi;

var mappercontract = web3.eth.contract(mapperContractAbi).at(mapperContractAddress, function(error, result){
  if(!error){
    mappercontract = result;
    web3.eth.getAccounts(function(error, result){
       if(!error){
           primary = result[0];
           web3.personal.unlockAccount(primary, passwordPrimaryAccount, function(error, result){
             if(!error){
                         mappercontract.checkInvoice(invoiceIdentifier, function(error, result){
                             if(result == true){
                                msg.send("Invoice already exists");
                             }else{
                         mappercontract.addInvoice(invoiceIdentifier, invoiceContractAddress, {from:primary, gas:300000},function(error, result){
                            if(!error){
                               console.log("Transaction address is "+result);
				               console.log("Waiting  to be mined...");
                            }else{
                                console.error(error);
                             }
                         });
                        }
                    });
             }else{
                 console.error(error);
             }
           });
       } 
    });
  }else{
      console.error(error);
  }
});
});
}