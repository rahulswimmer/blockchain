//Commands:
// update status of invoice {INVOICEIDENTIFIER} to {NEWSTATUS} - returns invoice contract address with INVOICENO

var common = require("./commonscript.js");
var web3 = common.web3(common.node1);
var invoiceIdentifier ="0x290decd9548b62a8d60345a988386fc84ba6bc95484008f6362f93160ef3e563" ;
var invoiceContractAddress="0xda672b1b1827eab57e9600bb1d906838153c17b7";
var primary;
var invoiceNo = 1007;
var newStatus = 'Financed';
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
                    msg.send(invoiceNotFound);
                    console.log("Invoice not found");
                }
                else{
                    invoiceContractAddress = result;
                    //console.log("Invoice found: "+result);
                    msg.send("Invoice found: "+result);
                    web3.eth.getAccounts(function(error, result){
                        if(!error){
                            var invoiceContractAbi = common.invoiceContractAbi;
                            primary = result[0];
                            web3.eth.contract(invoiceContractAbi).at(invoiceContractAddress, function(error, result){
                                if(!error){
                                    var invoices = result;
                                    //console.log(invoices);
                                    //console.log(primary);
                                    //console.log(passwordPrimaryAccount);
                                    web3.personal.unlockAccount(primary, passwordPrimaryAccount, function(error, result){
                                        if(!error){
                                           
                                            //console.log(invoices.address);
                                            
                                            //console.log(invoices.abi);
                                            invoices.updateStatus(newStatus,{from:primary,gas:300000}, function(error, result){
                                                if(!error){
                                                   //console.log("Transaction address is "+result);
													//console.log("Waiting  to be mined");
												    msg.send("Transaction address is "+result);
													msg.send("Waiting  to be mined");
                        
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
