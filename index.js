// Source code to interact with smart contract
//var Contract = require('web3-eth-contract');
// web3 provider with fallback for old version
window.addEventListener('load', async () => {
    // New web3 provider
    if (window.ethereum) {
        window.web3 = new Web3(ethereum);
        try {
            // ask user for permission
            await ethereum.enable();
            // user approved permission
        } catch (error) {
            // user rejected permission
            console.log('user rejected permission');
        }
    }
    // Old web3 provider
    else if (window.web3) {
        window.web3 = new Web3(web3.currentProvider);
        console.log("already connected")
        // no need to ask for permission
    }
    // No web3 provider
    else {
        console.log('No web3 provider detected');
    }
  });
  console.log (window.web3.currentProvider)
  
  // contractAddress and abi are setted after contract deploy
  /* Tentative avec un nouveau package
  // 
  // const provider = new ethers.providers.Web3Provider(window.ethereum);
  // const signer = provider.getSigner();
  // const contract = new ethers.Contract(contractAddress, XXX.abi, signer);
  */
  var contractAddress = '0xf63a8a040d98598994e9E611bD5c5BCCe49835C1';
  var abi = JSON.parse( '[{"inputs": [],"name": "enter","outputs": [],"stateMutability": "payable","type": "function"},{"inputs": [],"name": "getBalance","outputs": [{"internalType": "uint256","name": "","type": "uint256"}],"stateMutability": "view","type": "function"},{"inputs": [],"name": "getEntries","outputs": [{"internalType": "address[]","name": "","type": "address[]"}],"stateMutability": "view","type": "function"},{"inputs": [],"name": "pickWinner","outputs": [{"internalType": "address","name": "","type": "address"}],"stateMutability": "nonpayable","type": "function"}]' );
  
  //contract instance
  console.log("Definition du contrat");
  contract = new web3.eth.Contract(abi, contractAddress);
  console.log("contract.methods : ",contract.methods);
  // Accounts
  var account;
  
  web3.eth.getAccounts(function(err, accounts) {
    if (err != null) {
      alert("Error retrieving accounts.");
      return;
    }
    if (accounts.length == 0) {
      alert("No account found! Make sure the Ethereum client is configured properly.");
      return;
    }
    account = accounts[0];
    console.log('Account: ' + account);
    web3.eth.defaultAccount = account;
  });
  
  //Smart contract functions
  function enter() {
    info = $("#newInfo").val();
    contract.methods.setInfo (info).send( {from: account}).then( function(tx) {
      console.log("Transaction: ", tx);
    });
    $("#newInfo").val('');
  }
  
  function pickWinner() {
    console.log("pickWinner function : ");
    console.log(contract);
      contract.methods.pickWinner().call().then( function( info ) {
      console.log("info: ", info);
      document.getElementById('lastInfo').innerHTML = info;
    });
  }