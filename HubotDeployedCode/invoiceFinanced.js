var common = require("./commonscript.js");
var web3 = common.web3(common.node1);
//Commands
// invoice {INVOICEIDENTIFIER} financed by {FINANCERNAME} at {DISCOUNT RATE(%)} - event getting fired when invoice gets financed.

module.exports = function(robot){
    robot.hear(/(invoice) (.*?) (financed) by (.*?) at (.*?)$/i, function(msg){
        var invoiceIdentifier = msg.match[2];
        var financerName = msg.match[4];
        var discountRate = msg.match[5];
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
                            msg.send("Invoice not found");
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
                                                 invoices.invoiceFinanced(invoiceIdentifier, financerName, discountRate,{from:primary, gas:300000},                                                             function(error, result){
                                                    if(!error){
                                                        msg.send("Invoice is financed: "+result);
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
    });
}

