var mappercontractContract = web3.eth.contract([{"constant":false,"inputs":[{"name":"invoiceIdentifier","type":"bytes32"},{"name":"invoiceContract","type":"address"}],"name":"addInvoice","outputs":[{"name":"","type":"bool"}],"payable":false,"type":"function"},{"constant":true,"inputs":[],"name":"getAllInvoices","outputs":[{"name":"invoices","type":"bytes32[]"}],"payable":false,"type":"function"},{"constant":true,"inputs":[],"name":"getInvoiceCount","outputs":[{"name":"","type":"uint256"}],"payable":false,"type":"function"},{"constant":true,"inputs":[{"name":"","type":"uint256"}],"name":"invoiceIndex","outputs":[{"name":"","type":"bytes32"}],"payable":false,"type":"function"},{"constant":true,"inputs":[{"name":"invoiceIdentifier","type":"bytes32"}],"name":"checkInvoice","outputs":[{"name":"","type":"bool"}],"payable":false,"type":"function"},{"constant":true,"inputs":[{"name":"","type":"bytes32"}],"name":"invoiceContracts","outputs":[{"name":"","type":"address"}],"payable":false,"type":"function"},{"constant":true,"inputs":[{"name":"sellerName","type":"string"},{"name":"buyerName","type":"string"},{"name":"invoiceNumber","type":"bytes32"}],"name":"checkInvoiceExists","outputs":[{"name":"","type":"bool"}],"payable":false,"type":"function"},{"constant":true,"inputs":[{"name":"invoiceIdentifier","type":"bytes32"}],"name":"getInvoiceContractAddress","outputs":[{"name":"addr","type":"address"}],"payable":false,"type":"function"}]);
var mappercontract = mappercontractContract.new(
   {
     from: web3.eth.accounts[0], 
     data: '60606040526105fa806100126000396000f36060604052361561008a576000357c0100000000000000000000000000000000000000000000000000000000900480635579f25c1461008f578063570bdad6146100cb5780637d6a59ed1461012757806390f892701461014f5780639fb90ee114610184578063ce2962fd146101b7578063e701c0d6146101fe578063facd90be146102bf5761008a565b610002565b34610002576100b36004808035906020019091908035906020019091905050610306565b60405180821515815260200191505060405180910390f35b34610002576100dd60048050506103c1565b60405180806020018281038252838181518152602001915080519060200190602002808383829060006004602084601f0104600302600f01f1509050019250505060405180910390f35b34610002576101396004805050610467565b6040518082815260200191505060405180910390f35b346100025761016a6004808035906020019091905050610479565b604051808260001916815260200191505060405180910390f35b346100025761019f6004808035906020019091905050610494565b60405180821515815260200191505060405180910390f35b34610002576101d260048080359060200190919050506104f9565b604051808273ffffffffffffffffffffffffffffffffffffffff16815260200191505060405180910390f35b34610002576102a76004808035906020019082018035906020019191908080601f016020809104026020016040519081016040528093929190818152602001838380828437820191505050505050909091908035906020019082018035906020019191908080601f016020809104026020016040519081016040528093929190818152602001838380828437820191505050505050909091908035906020019091905050610531565b60405180821515815260200191505060405180910390f35b34610002576102da60048080359060200190919050506105b3565b604051808273ffffffffffffffffffffffffffffffffffffffff16815260200191505060405180910390f35b60006001151561031584610494565b1515141561032657600090506103bb565b81600060005060008560001916815260200190815260200160002060006101000a81548173ffffffffffffffffffffffffffffffffffffffff02191690836c0100000000000000000000000090810204021790555082600160005060006002600050548152602001908152602001600020600050819055506002600081815054809291906001019190505550600190506103bb565b92915050565b602060405190810160405280600081526020015060006002600050546040518059106103ea5750595b908082528060200260200182016040528015610401575b5091508150600090505b600260005054811015610462576001600050600082815260200190815260200160002060005054828281518110156100025790602001906020020190600019169081815260200150505b808060010191505061040b565b5b5090565b60006002600050549050610476565b90565b60016000506020528060005260406000206000915090505481565b60006000600090505b6002600050548110156104ea57826000191660016000506000838152602001908152602001600020600050546000191614156104dc57600191506104f3565b5b808060010191505061049d565b600091506104f3565b50919050565b600060005060205280600052604060002060009150909054906101000a900473ffffffffffffffffffffffffffffffffffffffff1681565b60006000848484604051808480519060200190808383829060006004602084601f0104600302600f01f1509050018380519060200190808383829060006004602084601f0104600302600f01f150905001826000191681526020019350505050604051809103902090506105a481610494565b91506105ab565b509392505050565b6000600060005060008360001916815260200190815260200160002060009054906101000a900473ffffffffffffffffffffffffffffffffffffffff16905080505b91905056', 
     gas: 4700000
   }, function (e, contract){
    console.log(e, contract);
    if (typeof contract.address !== 'undefined') {
         console.log('Contract mined! address: ' + contract.address + ' transactionHash: ' + contract.transactionHash);
    }
 })