var common = require("./commonscript.js");
var web3 = common.web3(common.node1);

var primary;
var invoiceNo = 16757;
var sellerName = "Siddharth";
var buyerName ="Varun";
var dateOfInvoice = "";
var amount = 345000;
var status = "OPEN";

var mapperContractAddress = common.mapperContractAddress;
var nullAddress = common.nullAddress;
var passwordPrimaryAccount = common.passwordPrimaryAccount;
var invoiceContractAbi = common.invoiceContractAbi;
var invoiceContractData = common.invoiceContractData;

web3.eth.getAccounts(function(error, result){
    if(!error){
        var mapperContractAbi = common.mapperContractAbi;
        primary = result[0];
        var mappercontract = web3.eth.contract(mapperContractAbi).at(mapperContractAddress, function(error, result){
            if(!error){
                mappercontract = result;
                web3.personal.unlockAccount(primary, passwordPrimaryAccount, function(error, result){
                    if(!error){
                        var paramInvoiceNumber = invoiceNo;
                        var paramDateOfInvoice = dateOfInvoice;
                        var paramSellerName = sellerName;
                        var paramBuyerName = buyerName;
                        var paramAmount = amount;
                        var paramStatus = status;
                        
                        console.log("estimating gas price...");
                        web3.eth.estimateGas({data:invoiceContractData}, function(error, result){
                            if(!error){
                                var gasRequired = result + 3000000;
                                console.log("Gas required: "+gasRequired);
                                web3.eth.contract(invoiceContractAbi).new(
                                     paramInvoiceNumber,
                                     paramSellerName,
                                     paramBuyerName,
                                     paramAmount,
                                     {from:primary,data:invoiceContractData,gas:gasRequired},
                                        function(e, contract){
                                            if(typeof contract.address !== 'undefined'){
								            console.log("Contract address : "+contract.address);
                                            console.log("Mined!");
                                            }else{
								                console.log("Waiting to be mined");
                                                        }
                                        });
                            }else{
                                console.error(error);
                            }
                        });
                    }else{
                        console.error(error);
                    }
                })
            }else{
                console.error(error);
            }
        });
    }else{
        console.error(error);
    }
});
