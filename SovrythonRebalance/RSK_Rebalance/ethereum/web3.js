import Web3 from "web3";
 
//Create variable web3
let web3;

//Check if window isnt define and web3 is not injected
if (typeof window !== "undefined" && typeof window.ethereum !== "undefined") {
  // We are in the browser and metamask is running.
  window.ethereum.request({ method: "eth_requestAccounts" });
  //Assign web3
  web3 = new Web3(window.ethereum);
} else {
  // No meta mask
  const provider = new Web3.providers.HttpProvider(
      //Conect to the rinkby testnet
    //'https://rinkeby.infura.io/v3/74262c0a23484a4298c08c3dcb919a35'
    'https://public-node.testnet.rsk.co/'

  );
  //Assign web3
  web3 = new Web3(provider);
}
 
export default web3;