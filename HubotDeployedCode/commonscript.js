exports.web3 = function(node1) {
    var web3_extended = require('web3_extended');

    var hostname = "http://127.0.0.1:8000";
    var options = {
        host: hostname,
        personal: true,
        admin: true,
        debug: false
    };
    var web3 = web3_extended.create(options);
    return web3;
}

exports.nullAddress = "0x0000000000000000000000000000000000000000";
exports.invoiceNotFound =" Invoice not found";
exports.transactionNotMinedMessage = "Transaction is not mined yet.";
exports.transactionMinedMessage = "Transaction is mined.";

exports.displayInvoiceDetails = function(web3,iv){
    var out = "Invoice number: " + web3.toDecimal(iv[0].replace(/[0]+$/, ''));
    var dt = new Date(iv[1]*1000);
    out = out + "\n" + "Date of Invoice: " + dt.toUTCString();
    out = out + "\n" + "Seller: " + iv[2];
    out = out + "\n" + "Buyer: " + iv[3];
    out = out + "\n" + "Financer: " + iv[4];
    out = out + "\n" + "Amount due: " +iv[5];
    out = out + "\n" + "Discount percentage offered by Financer: " + iv[6];
    var dt2 = new Date(iv[7]*1000);
    out = out + "\n" + "Date of Payment from Financer to Seller: " + dt2.toUTCString();
    out = out + "\n" + "Amount paid by Buyer to Financer : " + iv[8];
    var dt3 = new Date(iv[8]*1000);
    out = out + "\n" + "Date of Payment from Buyer to Financer: " +dt3.toUTCString() ;
    out = out + "\n" + "Amount paid by Buyer to Financer : " + iv[10];
    out = out + "\n" + "Status: " + web3.toAscii(iv[11]).replace(/\u0000/g, '');
    return out;
}

exports.mapperContractAbi =[{"constant":false,"inputs":[{"name":"invoiceIdentifier","type":"bytes32"},{"name":"invoiceContract","type":"address"}],"name":"addInvoice","outputs":[{"name":"","type":"bool"}],"payable":false,"type":"function"},{"constant":true,"inputs":[],"name":"getAllInvoices","outputs":[{"name":"invoices","type":"bytes32[]"}],"payable":false,"type":"function"},{"constant":true,"inputs":[],"name":"getInvoiceCount","outputs":[{"name":"","type":"uint256"}],"payable":false,"type":"function"},{"constant":true,"inputs":[{"name":"","type":"uint256"}],"name":"invoiceIndex","outputs":[{"name":"","type":"bytes32"}],"payable":false,"type":"function"},{"constant":true,"inputs":[{"name":"invoiceIdentifier","type":"bytes32"}],"name":"checkInvoice","outputs":[{"name":"","type":"bool"}],"payable":false,"type":"function"},{"constant":true,"inputs":[{"name":"","type":"bytes32"}],"name":"invoiceContracts","outputs":[{"name":"","type":"address"}],"payable":false,"type":"function"},{"constant":true,"inputs":[{"name":"sellerName","type":"string"},{"name":"buyerName","type":"string"},{"name":"invoiceNumber","type":"bytes32"}],"name":"checkInvoiceExists","outputs":[{"name":"","type":"bool"}],"payable":false,"type":"function"},{"constant":true,"inputs":[{"name":"invoiceIdentifier","type":"bytes32"}],"name":"getInvoiceContractAddress","outputs":[{"name":"addr","type":"address"}],"payable":false,"type":"function"}];

exports.mapperContractAddress = "0x0b3e3490e0fdd372cf9d6fd0327714f2884bad22";

exports.invoiceContractData = '0x6060604052604051610b57380380610b57833981016040528080519060200190919080518201919060200180518201919060200180519060200190919050505b83600060005081905550426004600050819055508260016000509080519060200190828054600181600116156101000203166002900490600052602060002090601f016020900481019282601f106100a257805160ff19168380011785556100d3565b828001600101855582156100d3579182015b828111156100d25782518260005055916020019190600101906100b4565b5b5090506100fe91906100e0565b808211156100fa57600081815060009055506001016100e0565b5090565b50508160026000509080519060200190828054600181600116156101000203166002900490600052602060002090601f016020900481019282601f1061014f57805160ff1916838001178555610180565b82800160010185558215610180579182015b8281111561017f578251826000505591602001919060010190610161565b5b5090506101ab919061018d565b808211156101a7576000818150600090555060010161018d565b5090565b5050806005600050819055506001600050600260005060006000505460405180848054600181600116156101000203166002900480156102225780601f10610200576101008083540402835291820191610222565b820191906000526020600020905b81548152906001019060200180831161020e575b50508380546001816001161561010002031660029004801561027b5780601f1061025957610100808354040283529182019161027b565b820191906000526020600020905b815481529060010190602001808311610267575b50508260001916815260200193505050506040518091039020600c600050819055507f4f50454e00000000000000000000000000000000000000000000000000000000600b600050819055505b5050505061087d806102da6000396000f36060604052361561008a576000357c0100000000000000000000000000000000000000000000000000000000900480634e69d5601461008f5780636227853c146100bb5780638509acda1461013e5780638a59eb561461017a5780638da5cb5b146101af578063aa23e03d146101ed578063db23d4f814610219578063e56806131461039e5761008a565b610002565b34610002576100a160048050506103ca565b604051808260001916815260200191505060405180910390f35b34610002576101266004808035906020019091908035906020019082018035906020019191908080601f0160208091040260200160405190810160405280939291908181526020018383808284378201915050505050509090919080359060200190919050506103dc565b60405180821515815260200191505060405180910390f35b34610002576101626004808035906020019091908035906020019091905050610535565b60405180821515815260200191505060405180910390f35b34610002576101956004808035906020019091905050610584565b604051808260001916815260200191505060405180910390f35b34610002576101c16004805050610596565b604051808273ffffffffffffffffffffffffffffffffffffffff16815260200191505060405180910390f35b34610002576101ff60048050506105bc565b604051808260001916815260200191505060405180910390f35b346100025761022b60048050506105ce565b604051808d6000191681526020018c81526020018060200180602001806020018b81526020018a81526020018981526020018881526020018781526020018681526020018560001916815260200184810384528e8181518152602001915080519060200190808383829060006004602084601f0104600302600f01f150905090810190601f1680156102d15780820380516001836020036101000a031916815260200191505b5084810383528d8181518152602001915080519060200190808383829060006004602084601f0104600302600f01f150905090810190601f16801561032a5780820380516001836020036101000a031916815260200191505b5084810382528c8181518152602001915080519060200190808383829060006004602084601f0104600302600f01f150905090810190601f1680156103835780820380516001836020036101000a031916815260200191505b509f5050505050505050505050505050505060405180910390f35b34610002576103b0600480505061086b565b604051808260001916815260200191505060405180910390f35b6000600b6000505490506103d9565b90565b60007f4f50454e00000000000000000000000000000000000000000000000000000000600b60005054600019161415610524578260036000509080519060200190828054600181600116156101000203166002900490600052602060002090601f016020900481019282601f1061045e57805160ff191683800117855561048f565b8280016001018555821561048f579182015b8281111561048e578251826000505591602001919060010190610470565b5b5090506104ba919061049c565b808211156104b6576000818150600090555060010161049c565b5090565b50508160076000508190555060648260640360056000505402811561000257046008600050819055507f46494e414e434544000000000000000000000000000000000000000000000000600b60005081905550426006600050819055506001905061052e5661052d565b6000905061052e565b5b9392505050565b60004260096000508190555081600a600050819055507f434f4d504c455445000000000000000000000000000000000000000000000000600b600050819055506001905061057e565b92915050565b600081600b600050819055505b919050565b600d60009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1681565b6000600c6000505490506105cb565b90565b6000600060206040519081016040528060008152602001506020604051908101604052806000815260200150602060405190810160405280600081526020015060006000600060006000600060006000600050549b508b506004600050549a508a5060016000508054600181600116156101000203166002900480601f0160208091040260200160405190810160405280929190818152602001828054600181600116156101000203166002900480156106c95780601f1061069e576101008083540402835291602001916106c9565b820191906000526020600020905b8154815290600101906020018083116106ac57829003601f168201915b50505050509950895060026000508054600181600116156101000203166002900480601f01602080910402602001604051908101604052809291908181526020018280546001816001161561010002031660029004801561076b5780601f106107405761010080835404028352916020019161076b565b820191906000526020600020905b81548152906001019060200180831161074e57829003601f168201915b50505050509850885060056000505496508650600b600050549050805060036000508054600181600116156101000203166002900480601f0160208091040260200160405190810160405280929190818152602001828054600181600116156101000203166002900480156108215780601f106107f657610100808354040283529160200191610821565b820191906000526020600020905b81548152906001019060200180831161080457829003601f168201915b50505050509750875060076000505495508550600660005054945084506008600050549350835060096000505492508250600a60005054915081505b909192939495969798999a9b565b6000600060005054905061087a565b9056';

exports.invoiceContractAbi =[{"constant":true,"inputs":[],"name":"getStatus","outputs":[{"name":"","type":"bytes32"}],"payable":false,"type":"function"},{"constant":false,"inputs":[{"name":"invoiceIdentifier","type":"bytes32"},{"name":"finName","type":"string"},{"name":"discByF","type":"uint256"}],"name":"invoiceFinanced","outputs":[{"name":"","type":"bool"}],"payable":false,"type":"function"},{"constant":false,"inputs":[{"name":"invoiceIdentifier","type":"bytes32"},{"name":"amtBtoF","type":"uint256"}],"name":"invoicePaidByBuyer","outputs":[{"name":"","type":"bool"}],"payable":false,"type":"function"},{"constant":false,"inputs":[{"name":"stat","type":"bytes32"}],"name":"updateStatus","outputs":[{"name":"","type":"bytes32"}],"payable":false,"type":"function"},{"constant":true,"inputs":[],"name":"owner","outputs":[{"name":"","type":"address"}],"payable":false,"type":"function"},{"constant":true,"inputs":[],"name":"getIdentifier","outputs":[{"name":"","type":"bytes32"}],"payable":false,"type":"function"},{"constant":true,"inputs":[],"name":"getInvoiceDetails","outputs":[{"name":"invoiceNo","type":"bytes32"},{"name":"doi","type":"uint256"},{"name":"selNm","type":"string"},{"name":"buyNm","type":"string"},{"name":"finNm","type":"string"},{"name":"amtDue","type":"uint256"},{"name":"discByf","type":"uint256"},{"name":"dofs","type":"uint256"},{"name":"apfs","type":"uint256"},{"name":"dobf","type":"uint256"},{"name":"apbf","type":"uint256"},{"name":"stat","type":"bytes32"}],"payable":false,"type":"function"},{"constant":true,"inputs":[],"name":"getInvoiceNo","outputs":[{"name":"","type":"bytes32"}],"payable":false,"type":"function"},{"inputs":[{"name":"invoiceNo","type":"bytes32"},{"name":"selNm","type":"string"},{"name":"buyNm","type":"string"},{"name":"amtDue","type":"uint256"}],"type":"constructor"}];
                              
exports.passwordPrimaryAccount = "Account1";

