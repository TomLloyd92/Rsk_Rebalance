pragma solidity ^0.4.17;

contract AMMFactory
{
    //Array of deployed AMMs
    address[] public deployedAMM;
    
    
    function createAMM(string description, string token, string tokenAddress, address powpegAddress) public
    {
        //Create new AMM
        address newAMM = new AMM(msg.sender, description, token, tokenAddress, powpegAddress);
        deployedAMM.push(newAMM);
    }
    
    //Get All AMMs
    function getDeployedAMMs() public view returns(address[])
    {
        return deployedAMM;
    }
}

contract AMM
{
    
    string public functionCalled;
    
    struct BalanceAccount
    {
        string description;
        string token;
        string tokenAddress;
        address powpegAddress;
    }
    
    BalanceAccount public balanceStruct;
    address public manager;
    
    //Modifier for manager control ONLY
    modifier restricted()
    {
        require(msg.sender == manager);
        _;
    }
    
    function AMM(address creator, string description, string token, string tokenAddress, address powpegAddress) public payable
    {
        //Assigned manager of contract
        manager = creator;
        
        //Create the new Balance
        balanceStruct = BalanceAccount({
            description: description,
            token: token,
            tokenAddress: tokenAddress,
            powpegAddress: powpegAddress
        });
    }
    
    function rebalance(uint amount) public restricted
    {
        balanceStruct.powpegAddress.transfer(amount);
    }
    
    function changePowpegAddress(address newPowpegAddress) public restricted
    {
        balanceStruct.powpegAddress = newPowpegAddress;
    }
    
    function cashOut(uint amount ) public restricted
    {
        manager.transfer(amount);
    }
    
    function getSummary() public view returns(string, string, string, address, address, uint)
    {
        return(
         balanceStruct.description,
            balanceStruct.token,
            balanceStruct.tokenAddress,
            balanceStruct.powpegAddress,
            manager,
            this.balance
        );
    }
    
    function() public payable
    {
        functionCalled = 'fallback';
    }
    
}