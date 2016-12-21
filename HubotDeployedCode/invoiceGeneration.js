var common = require("./commonscript.js");
var web3 = common.web3(common.node1);
//Commands:
//create invoice contract for seller {INVOICENO} {SELLERNAME} {BUYERNAME} {AMOUNTDUE} - generates an invoice with the given attributes
module.exports = function(robot){
    robot.hear(/(create invoice contract) for (seller) (.*?) (.*?) (.*?) (.*?)$/i, function(msg){
var primary;
var invoiceNo = msg.match[3];
var sellerName = msg.match[4];
var buyerName =msg.match[5];
var dateOfInvoice = "";
var amount = msg.match[6];
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
                                msg.send("Gas required: "+gasRequired);
                                web3.eth.contract(invoiceContractAbi).new(
                                     paramInvoiceNumber,
                                     paramSellerName,
                                     paramBuyerName,
                                     paramAmount,
                                     {from:primary,data:invoiceContractData,gas:gasRequired},
                                        function(e, contract){
                                            if(typeof contract.address !== 'undefined'){
								            msg.send("Contract address : "+contract.address);
                                            msg.send("Mined!");
                                            }else{
								                msg.send("Waiting to be mined");
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
});
}
