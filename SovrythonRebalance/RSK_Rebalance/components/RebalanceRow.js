import React, {Component} from 'react';
import {Table, Button} from 'semantic-ui-react';
import web3 from '../ethereum/web3';
import AMM from '../ethereum/AMM';

class RebalanceRow extends Component
{
    onRebalance = async () =>
    {
        console.log(this.props.rebalancingAmount)
        //Ammount to be sent (current balance )
        var ammount = this.props.balance * ((this.getPercent()/100)/ 2 );

        //Return if BTC is higher
        if(ammount < 0)
        {
            return;
        }

        //Get current user account
        const accounts = await web3.eth.getAccounts();
        // Initiate Transaction
        await web3.eth.sendTransaction({
            from: accounts[0],
            to: this.props.powpegAddress,
            value: ammount,
            gas: 100000
        }, function(error, hash){
            console.log(error)    
        });
    };

    getPercent()
    {
        const ammountInrBTC = web3.utils.fromWei(this.props.balance, 'ether');
        const increase = ammountInrBTC - this.props.BTCbalance

        const percentIncrease = increase/ammountInrBTC * 100;

       return (percentIncrease);
    }

    render(){
        //So we dont have to type this.props
        const{
            address,
            description,
            token,
            tokenAddress,
            powpegAddress,
            manager,
            balance,
            BTCbalance
        } = this.props;
        
        //So we dont have to call table
        const {Row, Cell} = Table;
        return(
            
        <Row>
            <Cell> {web3.utils.fromWei(balance, 'ether')} </Cell>
            <Cell> {tokenAddress} </Cell>
            <Cell> {BTCbalance} </Cell>
            <Cell> {powpegAddress} </Cell>
            <Cell> {this.getPercent()} </Cell>

            <Cell>
                <Button color= "green" basic onClick={this.onRebalance}> Rebalance </Button>
            </Cell>
        </Row>
        
        )
    }
}

export default RebalanceRow;