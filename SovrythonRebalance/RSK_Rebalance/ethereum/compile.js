const path = require('path');
const solc = require('solc');
const fs = require('fs-extra');
const { debug } = require('console');
const { debuglog } = require('util');

const buildPath = path.resolve(__dirname, 'build');
fs.removeSync(buildPath);

const campaignPath = path.resolve(__dirname, 'contracts', 'AMM.sol');

const source = fs.readFileSync(campaignPath, 'utf8');

const output = solc.compile(source,1).contracts;

debuglog(output)

function resolveAfter2Seconds() {
    return new Promise(resolve => {
      setTimeout(() => {
        resolve('resolved');
      }, 2000);
    });
  }

resolveAfter2Seconds();

fs.ensureDirSync(buildPath);

for(let contract in output)
{
   fs.outputJsonSync(path.resolve(buildPath, contract.replace(':','') + '.json'),
   output[contract]
   );
}