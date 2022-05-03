import {lotteryContract,ticketContract,coinContract,multicallContract} from './contracts';
import {ethers} from "ethers";

// const testnet = `https://mainnet.infura.io/v3/0c5409f01bb944168d3bb4b03a674f15`;

const testnet = `https://rpcapi.fantom.network/`;
// const testnet = "wss://rough-long-pond.matic.quiknode.pro/01a9046869df5462fd704ed75fafd477f014e12b/";
const provider = new ethers.providers.JsonRpcProvider(testnet);
const LotteryContract = new ethers.Contract(lotteryContract.kovan,lotteryContract.abi,provider);
const TicketContract = new ethers.Contract(ticketContract.kovan,ticketContract.abi,provider);
const CoinContract = new ethers.Contract(coinContract.kovan,coinContract.abi,provider);
const MultiContract = new ethers.Contract(multicallContract.kovan,multicallContract.abi,provider);
const CoinDecimals= coinContract.decimals;
export {LotteryContract,TicketContract,CoinContract,CoinDecimals,MultiContract};
