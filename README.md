# blockchain
Blockchain a concept in short (my version of how i see it):

Blockchain is a new technology which implements de centralized based applications, to be more specific, distributed ledger implementation.
Its a network of interconnecting nodes. Here nodes can refer to an individual, organisation , group, etc. 
These nodes perform transactions and fulfill their business needs. Here, there is no central authority, via which the transactions are authenticated or commited. So, nodes present in the network reach a consensus and validate a transaction. There are more terminologies that need to be understood before diving deep in its implementation.

Important terminologies:

Ledger: Its a log of transactions. Any transaction performed, it's entry is made in ledger.
Distributed ledger: Everyone in the network has a copy of the same global legder and after each transaction, the same ledger is updated. So consistency of the ledger is maintained and is transparent. 

Miner: Miner means the node or individual that validates the transaction. This transaction is then added in a chain type fashion where previous transaction's hash is stored in the next transaction.

Gas: Any transaction that changes or updates the state of the structure requires gas to do so. Its just a numerical figure  that needs to be passed while operation. Eg: While withdrawing money from an account, money will be deducted and balance is changed (so state is changed), so we pass gas (can be any number like 3000,300000). Its analogous to a car that needs gas so that it can move forward (change its state).

Public and Private blockchain: In public blockchain you join a network which is public or transparent to everyone. Here you make real world transactions. In private blockchain network, you create your own network and create your own currency (ether). Used for development and test purpose.

Smart contracts: The business logic of any application is written in a smart contract. It's like a class in java.

Softwares used:

Solidity: Its a smart contract language. You write code in solidity, compile it using online browser and save this compiled code as js file and run on terminal.
Ethereum: Its a blockchain framework used to create robust de centralized based application. Ethereum has a command line tool called go-eth that we use for creating our private blockchain network.
NodeJS: Compiled solidity code is wrapped in nodeJS and then executed on terminal.
Hubot Script: Gives libraries to input data,viz: robot hear function.
Slack: Interactive chat based tool used to execute transactions.

Implementation:
I have implemented my application on Windows 7 (64 bits) system.
Step 1: 
-> Create a separate folder in any drive (for my eg i chose C drive) named "blockchain". So all the files related to it will be stored in this folder for the sake of convenience.
-> Install go-eth from the link provided below:
  https://www.ethereum.org/cli
-> After installing it, save the "geth.exe" in the blockchain named folder.

Step 2:
Now we will create a private blockchain network and create a node and some accounts for it.
In the blockchain folder, create a folder named "node1". In this folder all the data for node1 will be stored.

Step 3:
Open command prompt and change directory to "C:\blockchain\node1"
Now we have to initialize our node so we create a Custom Genesis file which contains all the intialization parameters for our node, call it genesis.json and looks something like this:

{
    "nonce": "0x0000000000000042",
    
    "timestamp": "0x0",
    
    "parentHash": "0x0000000000000000000000000000000000000000000000000000000000000000",
    
    "extraData": "0x0",
    
    "gasLimit": "0x8000000",
    
    "difficulty": "0x400",
    
    "mixhash": "0x0000000000000000000000000000000000000000000000000000000000000000",
    
    "coinbase": "0x3333333333333333333333333333333333333333",
    
    "alloc": {

    }
    
}
Don't think twice and copy paste this code in a file named "genesis.json" and save it in your node1 folder.
Now the initial state of the node is ready,so we need ethereum to identify this node, so we type in the command prompt the following command:

-> geth init "node1/genesis.json "

press enter and you get the following output saying that space has been allocated to you.

> I0130 15:00:27.029961 ethdb/database.go:83] Alloted 16MB cache and 16 file handles to C:\Users\Rahul13615\AppData\Roaming\Ethereum\chaindata
I0130 15:00:27.504961 core/genesis.go:92] Genesis block already in chain. Writing canonical number
I0130 15:00:27.506961 cmd/geth/main.go:299] successfully wrote genesis block and/or chain rule set: 6650a0ac6c5e805475e7ca48eae5df0e32a2147a154bb2222731c770ddb5c158

Step 4:

So now your node has been initialized and now needs to join the private blockchain network or create one.
Following is the command to start the server or join the network:

-> geth --identity "node1" --ipcdisable --rpc --rpcport "8000" --rpccorsdomain "*" --datadir "C:\blockchain\node1" --port "30303" --nodiscover --ipcapi "admin,db,eth,debug,miner,net,shh,txpool,personal,web3" --rpcapi "db,eth,net,web3,personal,admin" --autodag -verbosity 6 --networkid 100 --nat "any" 

Press enter and you'll see records and files being synced. Now leave/minimize this command prompt. This terminal needs to run for our code to execute.

Step 5:
Open another command prompt and change directory to "C:\blockchain" and type the following:
-> geth attach

press enter and it will show you a javascript console. This is the console from where we execute our smart contracts, update transactions, check status, etc. For test purpose type: geth --version.

Step 6: 
Set an etherbase account. It is basically account of the miner. So first create an account using following command:
->  personal.newAccount("Account1")

It will ask for passphrase (password). So type one and remember it, because we are gonna need it a lot of times.
Now type the following and it should show you list of accounts (they will show the address of the account in hex form):
-> eth.accounts

Now  if this is the first account you made on this node then it is stored on index 0. So you can retrieve your account like this:

-> primary = eth.accounts[0]

Now primary contains your account address.

Now set the etherbase account like this:
-> web3.miner.setEtherbase(primary)

So the account "primary" is the miner.

To check balance, type: 
-> eth.getBalance(primary) or web3.fromWei(eth.getBalance(primary),"Account1")

So this is how you set your private blockchain network. Further implementation details will be updated soon.
