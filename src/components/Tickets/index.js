import React, { useState, useEffect } from 'react';
import { useWallet } from 'use-wallet'

import { Card } from "../Cards/card"
import { UnLockWalletCard } from "../Cards/unlockWallet"
import { LatestWinNumbercard } from "../Cards/latestWinNumber"
import { TicketInfoCard } from '../Cards/ticketInfoCard';

import { LotteryContract, CoinDecimals, MultiContract } from "../../contract";
import { ethers } from "ethers";

const Tickets = () => {
    const [winAmount, setWinAmount] = useState(10000);
    const [winNumbers, setWinNumbers] = useState([12, 1, 3, 2])
    const [winRound, setWinRound] = useState(200);
    const [winId, setWinId] = useState(0);
    const [winState, setWinState] = useState(false);

    const [userTickets, setUserTickets] = useState([]);
    const [ticketDatas, setTicketDatas] = useState([]);
    const [styledTicketDatas, setStyledTicketDatas] = useState([]);
    const wallet = useWallet();
    const [maxTicket, setMaxTicket] = useState([0, 0, 0]);

    async function getData() {
        if (wallet.status === 'connected') {

            //console.log("userTickets",userTickets);
            const provider = new ethers.providers.Web3Provider(wallet.ethereum);
            var signer = provider.getSigner();
            var Lottery = LotteryContract.connect(signer);
            var userAddress = await signer.getAddress();
            var userTickets = await Lottery.getUserInfo(userAddress);
            setUserTickets(userTickets);

            //console.log("userTickets",userTickets);
            var Multi = MultiContract.connect(signer);
            // var ticketDatas = await Multi.
            var ticketDatas = await Multi.ticketDatas(userTickets)
                .catch((err) => {
                    //console.log("err",err)
                });

            setTicketDatas(ticketDatas);
            //console.log("ticketDatasmain",ticketDatas)
        }
    }

    useEffect(() => {
        getData();
    }, [wallet.status])

    //styled data
    useEffect(() => {
        var _styledTicketDatas = [];
        // //console.log(ticketDatas);
        if (ticketDatas != [] && ticketDatas != null && ticketDatas.drawStatus != null)
            ticketDatas.drawStatus.map((data, index) => {
                if (!ticketDatas.claimStatus[index] && ticketDatas.drawStatus[index])
                    _styledTicketDatas.push([userTickets[index].toString(), ticketDatas.rewardAmounts[index].toString(), ticketDatas.ticketNumber[index]])
            });
        // //console.log(_styledTicketDatas);
        setStyledTicketDatas(_styledTicketDatas);
    }, [ticketDatas])

    //highest win
    useEffect(() => {
        if (styledTicketDatas.length == 0) {
            setMaxTicket([0, 0, 0]);
            setWinNumbers([0, 0, 0, 0]);
        }
        else {
            let maxTicket = styledTicketDatas[0];
            //console.log(maxTicket)
            for (var i = 0; i < styledTicketDatas.length; i++) {
                if (styledTicketDatas[i][1] > maxTicket[1])
                    maxTicket = styledTicketDatas[i];
            }
            setMaxTicket(maxTicket);
            if (maxTicket[1] > 0)
                setWinState(true);
            else
                setWinState(false);
            setWinAmount(ethers.utils.formatUnits(maxTicket[1], CoinDecimals));
            setWinNumbers(maxTicket[2]);
            setWinId(maxTicket[0])
            //console.log(maxTicket)
        }
    }, [styledTicketDatas])


    return (
        <div className='back-3' >
            <Card >
                <div className="bigwin-card">
                    {/* <div className = "bigwin-card-img">
              <Image src={"/image/bigwin.png"}   id="" alt="" fill="" layout="fill"/>
            </div> */}
                    {/* <span className = "x-font1-white">{winAmount} ATRI</span> */}
                </div>
            </Card>
            {winState ? <Card>
                <div className="win-info-card">
                    <div className="x-font1-yellow">
                        Congratulations
                    </div>
                    <div className="x-font2-red">
                        YOU WON TICKET ID #{winId}
                    </div>
                    <div className="x-font2-white title">
                        Your LUCKY Numbers
                    </div>
                    <LatestWinNumbercard numbers={winNumbers} />
                </div>
            </Card>
                : ""}

            <Card>
                <TicketInfoCard />
            </Card>

            <div className="space-2"></div>
            <Card>
                <UnLockWalletCard />
            </Card>
            <div className="space">
            </div>
        </div>
    )
}

export default Tickets;