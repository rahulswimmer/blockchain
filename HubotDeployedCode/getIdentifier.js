//Commands:
//get invoice identifier of {INVOICEADDRESS} - retrieves identifier of an invoice
var common = require("./commonscript.js");
var web3 = common.web3(common.node1);
module.exports = function(robot){
    robot.hear(/(get invoice identifier) of (.*?)$/i, function(msg){
var invoiceContractAddress=msg.match[2];
var primary;
var invoiceContractAbi = common.invoiceContractAbi;

var nullAddress = common.nullAddress;
var passwordPrimaryAccount = common.passwordPrimaryAccount;
var invoiceNotFound = common.invoiceNotFound;

var invoicecontract=web3.eth.contract(invoiceContractAbi).at(invoiceContractAddress,function(error, result){
    if(!error){
       invoicecontract = result;
        web3.eth.getAccounts(function(error, result){
            primary = result[0];
            web3.personal.unlockAccount(primary, passwordPrimaryAccount, function(error, result){
                if(!error){
                    invoicecontract.getIdentifier.call( function(error, result){
                        if(!error){
                            out = result;
                            msg.send(out);
                        }else{
                            console.error(error);
                        }
                    });
                }else{
                    console.error(error);
                }
            });
        });
    }else{
        console.error(error);
    }
});
});
}



