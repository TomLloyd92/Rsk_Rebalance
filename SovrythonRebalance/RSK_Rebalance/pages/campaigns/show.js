import { extend } from "jquery";
import React, {Component} from "react";
import { Card, Grid, Button } from "semantic-ui-react";
import Layout from '../../components/Layouts';
import AMM from '../../ethereum/AMM'
import web3 from '../../ethereum/web3'
import {Link} from '../../routes';

class CampaignShow extends Component
{
    static async getInitialProps(props)
    {
        //Address of the campaign we are currently on
        const amm = AMM(props.query.address);

        const summary = await amm.methods.getSummary().call();

        //Pass each var from the contract
        return{
            address: props.query.address,
            description: summary[0],
            token: summary[1],
            tokenAddress: summary[2],
            powpegAddress: summary[3],
            manager: summary[4],
            balance: summary[5]
        };
    }

    renderCards()
    {
        const{
            address,
            description,
            token,
            tokenAddress,
            powpegAddress,
            manager,
            balance

        } = this.props;

        const items = [
            // {
            //     header: 'AMM Address',
            //     meta: address,
            //     description: 'Recive funds to this contract at this address',
            //     style: {overflowWrap: 'break-word'}
            // },
            // {
            //     header: 'Manager Address',
            //     meta: manager,
            //     description: '',
            //     style: {overflowWrap: 'break-word'}
            // },
            {
                header: 'Description',
                meta: description,
                description: '',
                style: {overflowWrap: 'break-word'}
            },
            {
                header: 'Token Ticker',
                meta: token,
                description: '',
                style: {overflowWrap: 'break-word'}
            },
            {
                header: token + ' Address',
                meta: tokenAddress,
                description: '',
                style: {overflowWrap: 'break-word'}
            },
            {
                header: 'Bridge Address',
                meta: powpegAddress,
                description: 'WARNING: THIS IS THE ADDRESS REBALANCE WILL TRANSFER',
                style: {overflowWrap: 'break-word'}
            },
            // {
            //     header: 'Funds',
            //     meta: token + ' ' + web3.utils.fromWei(balance, 'ether'),
            //     description: '',
            //     style: {overflowWrap: 'break-word'}
            // }
        ]

        return <Card.Group items={items}/>;
    };

    render()
    {
        return(
            <Layout>
            <h3> AMM Deshboard </h3>
            <Grid>
                <Grid.Row>
                <Grid.Column>
                    {this.renderCards()}
                   
                </Grid.Column>
                </Grid.Row>

                <Grid.Column>
                <Grid.Row>
                <Link route={`/campaigns/${this.props.address}/rebalance`}>
                        <a> 
                            <Button primary> View Rebalance Sheet </Button>
                        </a>
                        
                    </Link>
                </Grid.Row>
                </Grid.Column>
            </Grid>
            </Layout>
        )
    }
}

export default CampaignShow