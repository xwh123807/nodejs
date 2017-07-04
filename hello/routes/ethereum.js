/**
 * Created by xiangwanhong on 2017/7/4.
 */

var Web3 = require('web3');
var express = require('express');
var router = express.Router();

if (typeof web3 !== 'undefined') {
    web3 = new Web3(web3.currentProvider);
} else {
    // set the provider you want from Web3.providers
    web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));
}

/* GET home page. */

router.get('/', function (req, res, next) {
    var result = {
        version: {
            // api: web3.version.api,
            // node: web3.version.node,
            // network: web3.version.network,
            // ethereum: web3.version.ethereum,
            // whisper: web3.version.whisper
        },
        isConnected: web3.isConnected(),
        eth: {
            defaultAccount: web3.eth.defaultAccount,
            accounts: web3.eth.accounts,
            blockNumber: web3.eth.blockNumber,
            balance: [],
            mining: web3.eth.mining,
            gasPrice: web3.eth.gasPrice,
            coinbase: web3.eth.coinbase
        }
    };
    result.eth.accounts.forEach(account => {
        const balance = {account: account, balance: web3.eth.getBalance(account)};
        result.eth.balance.push(balance);
    });
    if (result.eth.blockNumber){
        result[result.eth.blockNumber] = web3.eth.getBlock(result.eth.blockNumber);
    }
    res.send(result);
});

router.get('/accounts', function (req, res, next) {
    console.info('web3');
    var accounts = web3.eth.accounts;
    res.send(accounts);
});

router.get('/blockNumber', (req, res, next) => {
    var number = web3.eth.blockNumber;
    res.send(number);
});


router.get('/block', (req, res, next) => {

});

router.get('/block/:blockNumber', (req, res, next) => {
    const blockNumber = req.params.blockNumber;
    res.send(web3.eth.getBlock(blockNumber));
});

router.post('/accounts', (req, res, next) => {

});

module.exports = router;