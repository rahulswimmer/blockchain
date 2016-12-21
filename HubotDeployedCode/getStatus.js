//Commands:
//get status of {INVOICEIDENTIFIER} - retrieves status of an invoice
var common = require("./commonscript.js");
var web3 = common.web3(common.node1);
module.exports = function(robot){
    robot.hear(/(get status) of (.*?)$/i, function(msg){
var primary;
var invoiceIdentifier =msg.matc[2];

var mapperContractAbi = common.mapperContractAbi;
var mapperContractAddress = common.mapperContractAddress;
var nullAddress = common.nullAddress;
var passwordPrimaryAccount = common.passwordPrimaryAccount;
var invoiceNotFound = common.invoiceNotFound;

var mappercontract = web3.eth.contract(mapperContractAbi).at(mapperContractAddress,function(error, result){
    if(!error){
        mappercontract = result;
        mappercontract.getInvoiceContractAddress.call(invoiceIdentifier, function(error, result){
            if(!error){
                if(result == nullAddress){
                   msg.send("Invoice not found");
                }
                else{
                    invoiceContractAddress = result;
                    msg.send("Invoice found: "+result);
                    web3.eth.getAccounts(function(error, result){
                        if(!error){
                            var invoiceContractAbi = common.invoiceContractAbi;
                            primary = result[0];
                            web3.eth.contract(invoiceContractAbi).at(invoiceContractAddress, function(error, result){
                                if(!error){
                                    var invoices = result;
                                    web3.personal.unlockAccount(primary, passwordPrimaryAccount, function(error, result){
                                        if(!error){
                                            invoices.getStatus.call({from:primary,gas:300000},function(error, result){
                                                if(!error){
                                                    var iv = result;
													msg.send(web3.toAscii(iv).replace(/\u0000/g, ''));
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
