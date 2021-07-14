import React, { Component } from 'react';
import { Card, Button } from 'semantic-ui-react';
import factory from '../ethereum/factory';
import Layout from '../components/Layouts';
import {Link} from '../routes';
import axios from 'axios';


class CampaignIndex extends Component
{
    
    //Next
    static async getInitialProps()
    {
        const  campaigns = await factory.methods.getDeployedAMMs().call();
        //let wallet  = await test();

        return {campaigns };
    }

    renderAMMs()
    {
        //Assign all properties to the card in each campaign 
        const items = this.props.campaigns.map(address => {
                return{ 
                    header: address,
                    description: (
                    <Link route={`/campaigns/${address}`}>
                    <a>Click for AMM dashboard</a>
                    </Link>
                    ),
                    fluid: true
                };
            });

        return <Card.Group items={items} />;
    }

    render()
    {
        return(
        <Layout>
            <div>
            <h3>Open AMMs</h3>
            <Link route ="/campaigns/new">
                <a>
                    <Button 
                        floated = "right"
                        content = "Create AMM"
                        icon = "add circle"
                        primary={true}
                    />
                </a>
            </Link>
            {this.renderAMMs()}
            </div>
            <div>TEST AMMOUNT : {} </div>
        </Layout>
        )
    }
}

export default CampaignIndex;

