//Commands:
//get invoice details of {INVOICEIDENTIFIER} - retrieves details of an invoice.
var common = require("./commonscript.js");
var web3 = common.web3(common.node1);
var primary;
module.exports = function(robot){
    robot.hear(/(get invoice details|details) of (.*?)$/i, function(msg){
var invoiceIdentifier = msg.match[2];
var web3 = common.web3(common.invoiceNode);
var mapperContractAbi = common.mapperContractAbi;

var mapperContractAddress = common.mapperContractAddress;
var nullAddress = common.nullAddress;
var passwordPrimaryAccount = common.passwordPrimaryAccount;
var mappercontract = web3.eth.contract(mapperContractAbi).at(mapperContractAddress,function(error, result){
    if(!error){
        mappercontract = result;
        mappercontract.getInvoiceContractAddress.call(invoiceIdentifier, function(error, result){
            if(!error){
                if(result == nullAddress){
                    console.log("Invoice not found");
                }
                else{
                    invoiceContractAddress = result;
                    console.log("Invoice found: "+result);
                    web3.eth.getAccounts(function(error, result){
                        if(!error){
                            var invoiceContractAbi =common.invoiceContractAbi; 
                            primary = result[0];
                            web3.eth.contract(invoiceContractAbi).at(invoiceContractAddress, function(error, result){
                                if(!error){
                                    var invoices = result;
                                    web3.personal.unlockAccount(primary, passwordPrimaryAccount, function(error, result){
                                        if(!error){
                                           
                                            invoices.getInvoiceDetails.call({from:primary,gas:300000},function(error, result){
                                                if(!error){
                                                    var iv = result;
                                                    var out =common.displayInvoiceDetails(web3,iv);
													console.log(out);
                                                }else{
                                                    console.log(error);
                                                }
                                            });
                                        }else{
                                            console.error(error);
                                        }
                                    });
                                }else{
                                    console.error(error);
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
