import web3 from './web3'
import AMM from './build/AMM.json'

export default (address) =>
{
    return new web3.eth.Contract(
        JSON.parse(AMM.interface),
        address
    );
};