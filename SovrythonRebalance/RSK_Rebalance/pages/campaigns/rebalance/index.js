import { extend } from 'jquery';
import React, { Component } from 'react';
import Layout from '../../../components/Layouts';
import {Button, Table} from 'semantic-ui-react'
import {Link, Router} from '../../../routes'
import AMM from '../../../ethereum/AMM';
import RebalanceRow from '../../../components/RebalanceRow';
import web3 from '../../../ethereum/web3';
import Iframe from 'react-iframe';

class RequestIndex extends Component
{

    getAccountBalance()
    {

        const num = 1;

          return num;
    }

     static async getInitialProps(props)
    {
        const {address} = props.query;
        const amm = AMM(address);
        
        //User Accounts
        const accounts = await web3.eth.getAccounts();
        console.log(accounts[0]);

        //Balance
        let stonks = await web3.eth.getBalance(accounts[0]);

        console.log(stonks);
        const summary = await amm.methods.getSummary().call();

        
        const rebalance = {
            address: props.query.address,
            description: summary[0],
            token: summary[1],
            tokenAddress: summary[2],
            powpegAddress: summary[3],
            manager: summary[4],
            balance: stonks,
            BTCbalance: 0.01
        }

        const urlstring =`https://live.blockcypher.com/widget/btc-testnet/${summary[2]}/balance/`
        return{
            rebalance, urlstring
        };
    }


    renderRow()
    {
        return <RebalanceRow 
        address =  {this.props.rebalance.address}
        description = {this.props.rebalance.description}
        token = {this.props.rebalance.token}
        tokenAddress = {this.props.rebalance.tokenAddress}
        powpegAddress = {this.props.rebalance.powpegAddress}
        manager = {this.props.rebalance.manager}
        balance = {this.props.rebalance.balance}
        BTCbalance= {this.props.rebalance.BTCbalance}
        />
    }

    render(){
        const {Header, Row, HeaderCell, Body} = Table;
        return(
        <Layout>
            <h3>Rebalance List</h3>
            < Table celled inverted>
                <Header>
                    <Row>
                        <HeaderCell>Your Balance</HeaderCell>
                        <HeaderCell>{this.props.rebalance.token} Address</HeaderCell>
                        <HeaderCell>{this.props.rebalance.token} Balance</HeaderCell>
                        <HeaderCell>Bridge Address</HeaderCell>
                        <HeaderCell>Balance as %</HeaderCell>
                        <HeaderCell>Rebalance</HeaderCell>
                    </Row>
                </Header>
                { <Body>{this.renderRow()}</Body> }
            </Table>

            <h3>BTC Account Details</h3>
            <Iframe 
            url = {this.props.urlstring}
            width="380px"
            height="130px"
            id="myId"
            className="myClassname"
            display="initial"
            position="relative" ></Iframe>    

        </Layout>
    )};
}

export default RequestIndex;