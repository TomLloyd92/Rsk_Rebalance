import { extend } from "jquery";
import React, {Component} from"react";
import { Form, Button, Input, Message } from "semantic-ui-react";
import Layout from "../../components/Layouts";
import factory from '../../ethereum/factory';
import web3 from "../../ethereum/web3";
import {Link, Router} from '../../routes'

class CampaignNew extends Component
{

    state = {
        desciption:'',
        token:'',
        tokenAddress:'',
        powPegAdress:'',
        errorMessage:'',
        loading: false
    };

    onSubmit = async (event) =>
    {
        event.preventDefault();

        this.setState({loading: true, errorMessage:''});

        try{
            const accounts = await web3.eth.getAccounts();
            await factory.methods.createAMM(this.state.desciption, this.state.token, this.state.tokenAddress, this.state.powPegAdress)
            .send({
                from: accounts[0]
            });
            Router.pushRoute('/');
        }
        catch(err)
        {
            this.setState({errorMessage: err.message});
        }

        this.setState({loading: false});
    };

    render(){
        return (
            <Layout>
            <h3>Create an AMM</h3>
            <Form onSubmit={this.onSubmit} error={!!this.state.errorMessage}>
                <Form.Field>
                    <label> Description </label>
                    <Input 
                        value = {this.state.desciption}
                        onChange={event => this.setState({desciption: event.target.value})}
                    />
                </Form.Field>
                <Form.Field>
                    <label> Token </label>
                    <Input 
                        value = {this.state.token}
                        onChange={event => this.setState({token: event.target.value})}
                    />
                </Form.Field>
                <Form.Field>
                    <label> Token Address </label>
                    <Input 
                        value = {this.state.tokenAddress}
                        onChange={event => this.setState({tokenAddress: event.target.value})}
                    />
                </Form.Field>
                <Form.Field>
                    <label> Powpeg Address </label>
                    <Input 
                        value = {this.state.powPegAdress}
                        onChange={event => this.setState({powPegAdress: event.target.value})}
                    />
                </Form.Field>
                
                    
                    <Message error header="Oops" content={this.state.errorMessage} />
                    <Button loading={this.state.loading} primary> Create </Button>
            </Form>
            </Layout>
        );
    }
}

export default CampaignNew;