var common = require("./commonscript.js");
var web3 = common.web3(common.node1);
var invoiceIdentifier ="0x79807c6b27484d4d9d58d10a52716d127adc450b65b4cef175757400b01eabce" ;
var amountPaidByBuyerToFinancer = 345000;
        var mapperContractAddress = common.mapperContractAddress;
        var nullAddress = common.nullAddress;
        var passwordPrimaryAccount = common.passwordPrimaryAccount;
        var mapperContractAbi = common.mapperContractAbi;
        
        var mappercontract = web3.eth.contract(mapperContractAbi).at(mapperContractAddress, function(error, result){
            if(!error){
                mappercontract = result;
                mappercontract.getInvoiceContractAddress.call(invoiceIdentifier, function(error, result){
                    if(!error){
                        if(result == nullAddress){
                            console.log("Invoice not found");
                        }else{
                            invoiceContractAddress = result;
                            web3.eth.getAccounts(function(error, result){
                               if(!error){
                                   invoiceContractAbi = common.invoiceContractAbi;
                                   primary = result[0];
                                   web3.eth.contract(invoiceContractAbi).at(invoiceContractAddress, function(error, result){
                                      if(!error){
                                          var invoices = result;
                                          web3.personal.unlockAccount(primary, passwordPrimaryAccount, function(error, result){
                                             if(!error){
                                                 console.log("Account is unlocked");
                                                 invoices.invoicePaidByBuyer(invoiceIdentifier, amountPaidByBuyerToFinancer,{from:primary, gas:300000},                                                             function(error, result){
                                                    if(!error){
                                                        console.log("Invoice is complete: "+result);
                                                    } else{
                                                        console.error(error);
                                                    }
                                                 });
                                             } else{
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
                    }else{
                        console.error(error);
                    }
                });
            }else{
                console.error(error);
            }                                                         
         });
/*    });
}*/

