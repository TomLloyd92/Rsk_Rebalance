const HDWalletProvider = require ('truffle-hdwallet-provider');
const Web3 = require('web3');
const compiledFactory = require('./build/AMMFactory.json');

const provider = new HDWalletProvider(
    //Mnumonic
    //RSK
    'vacuum pudding solve cage despair patient goat lucky false iron adult capable dawn goose tobacco',
    
    //'obtain hidden remind brick earth meadow lady chunk certain inhale ability correct',
    //RSK public test node link
    'https://public-node.testnet.rsk.co/'
);

const web3 = new Web3(provider);

//Function so we can use async
const deploy = async() =>
{
    const accounts = await web3.eth.getAccounts();

    console.log('Attempting to deployed from account ' + accounts[0])  ;

    const result = await new web3.eth.Contract(JSON.parse(compiledFactory.interface)).deploy({data: compiledFactory.bytecode }).send({from: accounts[0], gas: '6800000'});

    //Console log the interface
    console.log(compiledFactory.interface);


    //Print Address that the contract is deployed to
    console.log('Contract Deployed to: ', result.options.address );
};

deploy();