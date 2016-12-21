var common = require("./commonscript.js");
var web3 = common.web3(common.node1);

var invoiceIdentifier = "0x79807c6b27484d4d9d58d10a52716d127adc450b65b4cef175757400b01eabce";
var invoiceContractAddress = "0x87ea0f3286fd083a784288406d1f659509e53aa8";
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
                 console.log("Account is unlocked");
                         mappercontract.checkInvoice(invoiceIdentifier, function(error, result){
                             if(result == true){
                                 console.log("Invoice already exists");
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

