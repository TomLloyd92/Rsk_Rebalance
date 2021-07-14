import web3 from './web3';
import AMMFactory from './build/AMMFactory.json'

const instance = new web3.eth.Contract(
    JSON.parse(AMMFactory.interface),
    '0x3983E73D1e043a6198AEE43e40f9dEB868939129'
);

export default instance;