const axios = require('axios');
const chai = require('chai');
const expect = chai.expect;

let playerId;
let walletConfig;
//POST Register Player
let data = JSON.stringify({
    "name": "testing"
});

let registerConfig = {
    method: 'post',
    maxBodyLength: Infinity,
    url: 'http://summercamp24.ddns.net:4000/game/register-player',
    headers: {
        'Content-Type': 'application/json'
    },
    data : data
};
async function requestRegister(){
    axios.request(registerConfig)
        .then((response) => {
            console.log(JSON.stringify(response.data));

            expect(response.data).to.be.an('object').that.has.property('name');
            expect(response.data).to.be.an('object').that.has.property('id');
            expect(response.data).to.be.an('object').that.has.property('netWorth');
            playerId = response.data.id;

            walletConfig = {
                method: 'get',
                maxBodyLength: Infinity,
                url: `http://summercamp24.ddns.net:4000/game/player/${playerId}`,
                headers: { }
            };
            return 0;
        })
        .catch((error) => {
            console.log(error);
        });
}

// GET Wallet

async function requestWallet(){
    axios.request(walletConfig)
        .then((response) => {
            console.log(JSON.stringify(response.data));
        })
        .catch((error) => {
            console.log(error);
        });
        return 0;
}

async function requestLeave(){
    let data = JSON.stringify({
        "id": `${playerId}`
    });

    let config = {
        method: 'post',
        maxBodyLength: Infinity,
        url: 'http://summercamp24.ddns.net:4000/game/leave',
        headers: {
            'Content-Type': 'application/json'
        },
        data : data
    };

    axios.request(config)
        .then((response) => {
            console.log(JSON.stringify(response.data));
        })
        .catch((error) => {
            console.log(error);
        });
}
// // async function main(){
// //     await requestRegister();
// //     await requestWallet();
// //     await requestLeave();
// // }
// //
// // main();