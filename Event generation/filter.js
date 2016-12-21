var invoiceAbi = invoiceContractAbi;
var invoiceAddress = invoiceContractAddressAddress;
var invoiceInterface = web3.eth.contract(invoiceAbi).at(invoiceAddress);
var invoiceEvent = invoiceInterface.invoiceFinanced({}, { fromBlock: 15971, toBlock: 'latest' });
var i = 0;

invoiceEvent.watch(function (error, result) {
    console.log(i++ + ": " + JSON.stringify(result));
});