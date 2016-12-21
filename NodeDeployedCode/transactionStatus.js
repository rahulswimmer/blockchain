//Commands:
//  status of transaction <TRANSACTION HASH> -provides mining status of transaction for the provided transaction hash number.

var common = require("./commonscript.js");
var web3 = common.web3(common.invoiceNode);

module.exports = function(robot) {
    robot.hear(/(status of transaction) (.*?)$/i, function(msg) {
        var transactionHash = msg.match[2];
        web3.eth.getTransaction(transactionHash, function(error, result) {
            var txNotMinedMsg = common.transactionNotMinedMessage;
            var txMinedMsg = common.transactionMinedMessage;
            if (!error) {
                console.log(result);
                if (!result.blockNumber) {
                    msg.send(txNotMinedMsg);
                } else {
                    msg.send(txMinedMsg);
                }

            } else {
                console.log(error);
            }
        });
    });
}